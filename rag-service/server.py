"""
PDF RAG Server — Flask backend for the web UI.

Endpoints:
  GET  /              → Serve the chat UI
  POST /api/upload    → Upload & ingest a PDF
  POST /api/chat      → Ask a question (RAG pipeline)
  GET  /api/documents → List ingested documents
  DELETE /api/documents/<doc_id> → Delete a document

Runs on http://localhost:3000
"""

import os
import sys
import time
import uuid
import json
import random
import string
import hashlib
import traceback
from pathlib import Path

import requests
import pymupdf
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Load .env file if present
_env_path = Path(__file__).parent / ".env"
if _env_path.exists():
    for line in _env_path.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())

# ─── Config ────────────────────────────────────────────────────────
OLLAMA_URL = "http://127.0.0.1:11434"
QDRANT_URL = "http://127.0.0.1:6333"
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_MODEL = "gemini-2.0-flash"

EMBED_MODEL = "nomic-embed-text"
CHAT_MODEL = "gemma2:2b"         # local fallback
COLLECTION = "pdf_rag"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 100
SCORE_THRESHOLD = 0.3
TOP_K = 5

UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

SYSTEM_PROMPT = (
    "You are a precise document assistant. You MUST answer questions "
    "ONLY using the provided context from retrieved document chunks.\n"
    "STRICT RULES:\n"
    "1) NEVER use your general knowledge.\n"
    "2) NEVER invent facts, names, dates, numbers, or citations.\n"
    "3) If the context does not contain the answer, respond EXACTLY with: "
    "I could not find this information in the uploaded documents.\n"
    "4) Always mention which source file and chunk number your answer comes from.\n"
    "5) Be concise and factual.\n"
    "6) Quote directly from the context when possible."
)

# ─── Flask App ─────────────────────────────────────────────────────
app = Flask(__name__, static_folder="static")
CORS(app)


# ─── Helpers ───────────────────────────────────────────────────────
def extract_text(pdf_path: str) -> str:
    doc = pymupdf.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text() + "\n"
    doc.close()
    return text.strip()


def chunk_text(text: str):
    chunks = []
    start = 0
    idx = 0
    while start < len(text):
        end = min(start + CHUNK_SIZE, len(text))
        if end < len(text):
            last_period = text.rfind(".", start, end)
            last_newline = text.rfind("\n", start, end)
            best_break = max(last_period, last_newline)
            if best_break > start + CHUNK_SIZE * 0.4:
                end = best_break + 1
        chunk = text[start:end].strip()
        if len(chunk) > 20:
            chunks.append({"text": chunk, "index": idx})
            idx += 1
        start = end - CHUNK_OVERLAP
        if end >= len(text):
            break
    return chunks


def embed_text(text: str):
    resp = requests.post(
        f"{OLLAMA_URL}/api/embeddings",
        json={"model": EMBED_MODEL, "prompt": text},
        timeout=60,
    )
    resp.raise_for_status()
    return resp.json()["embedding"]


def upsert_point(point_id, vector, payload):
    resp = requests.put(
        f"{QDRANT_URL}/collections/{COLLECTION}/points",
        json={"points": [{"id": point_id, "vector": vector, "payload": payload}]},
        timeout=30,
    )
    resp.raise_for_status()


def ask_gemini(prompt: str) -> str:
    """Call Gemini API. Returns answer or raises on failure."""
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
    )
    resp = requests.post(
        url,
        json={
            "contents": [{"role": "user", "parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0.1},
        },
        timeout=120,
    )
    resp.raise_for_status()
    return resp.json()["candidates"][0]["content"]["parts"][0]["text"]


def ask_ollama(prompt: str) -> str:
    """Call local Ollama. Always available fallback."""
    resp = requests.post(
        f"{OLLAMA_URL}/api/chat",
        json={
            "model": CHAT_MODEL,
            "stream": False,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
        },
        timeout=120,
    )
    resp.raise_for_status()
    return resp.json()["message"]["content"]


def ask_llm(prompt: str) -> tuple[str, str]:
    """Try Gemini first, fall back to Ollama. Returns (answer, model_used)."""
    try:
        answer = ask_gemini(prompt)
        return answer, "gemini-2.0-flash"
    except Exception:
        answer = ask_ollama(prompt)
        return answer, f"ollama/{CHAT_MODEL}"


# ─── Routes ────────────────────────────────────────────────────────
@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/<path:path>")
def static_files(path):
    return send_from_directory("static", path)


@app.route("/api/upload", methods=["POST"])
def upload_pdf():
    """Upload a PDF, extract text, chunk, embed, and store."""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if not file.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF files are supported"}), 400

    # Save
    safe_name = file.filename.replace(" ", "_")
    save_path = UPLOAD_DIR / safe_name
    file.save(str(save_path))

    try:
        # Extract
        text = extract_text(str(save_path))
        if len(text) < 30:
            return jsonify({"error": "Could not extract text. PDF may be image-based."}), 400

        # Chunk
        chunks = chunk_text(text)

        # Embed + Store
        doc_id = f"doc_{int(time.time())}_{random.choice(string.ascii_lowercase)}"
        uploaded_at = time.strftime("%Y-%m-%dT%H:%M:%SZ")
        stored = 0

        for chunk in chunks:
            embedding = embed_text(chunk["text"])
            h = hash(f"{doc_id}_{chunk['index']}") & 0x7FFFFFFF
            point_id = h + chunk["index"]
            upsert_point(
                point_id,
                embedding,
                {
                    "text": chunk["text"],
                    "document_id": doc_id,
                    "file_name": file.filename,
                    "chunk_index": chunk["index"],
                    "source": file.filename,
                    "uploaded_at": uploaded_at,
                    "total_chunks": len(chunks),
                },
            )
            stored += 1

        return jsonify({
            "success": True,
            "document_id": doc_id,
            "file_name": file.filename,
            "characters": len(text),
            "chunks_created": len(chunks),
            "chunks_stored": stored,
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/chat", methods=["POST"])
def chat():
    """RAG chat: embed question → search Qdrant → ask LLM."""
    data = request.get_json(force=True)
    question = (data.get("question") or "").strip()
    file_filter = data.get("file_filter")

    if len(question) < 3:
        return jsonify({"error": "Question too short (min 3 chars)"}), 400

    try:
        # 1. Embed
        embedding = embed_text(question)

        # 2. Search
        search_body = {
            "vector": embedding,
            "limit": TOP_K,
            "score_threshold": SCORE_THRESHOLD,
            "with_payload": True,
            "with_vector": False,
        }
        if file_filter:
            search_body["filter"] = {
                "must": [{"key": "file_name", "match": {"value": file_filter}}]
            }

        sr = requests.post(
            f"{QDRANT_URL}/collections/{COLLECTION}/points/search",
            json=search_body,
            timeout=30,
        )
        sr.raise_for_status()
        results = [r for r in sr.json()["result"] if r["score"] >= SCORE_THRESHOLD]

        if not results:
            return jsonify({
                "question": question,
                "answer": "I could not find this information in the uploaded documents.",
                "sources": [],
                "model": "n/a",
                "chunks_retrieved": 0,
            })

        # 3. Build context
        context_parts = []
        sources = []
        for r in results:
            p = r["payload"]
            score = round(r["score"], 3)
            context_parts.append(
                f"[Source: {p['file_name']}, Chunk {p['chunk_index']+1}/{p['total_chunks']}, "
                f"Score: {score}]\n{p['text']}"
            )
            sources.append({
                "file": p["file_name"],
                "chunk": p["chunk_index"] + 1,
                "total": p["total_chunks"],
                "score": score,
            })

        context = "\n\n---\n\n".join(context_parts)

        # 4. Ask LLM
        prompt = (
            f"{SYSTEM_PROMPT}\n\n"
            f"Context from retrieved documents:\n\n{context}\n\n---\n\n"
            f"Question: {question}\n\n"
            "Answer based ONLY on the above context."
        )
        answer, model = ask_llm(prompt)

        return jsonify({
            "question": question,
            "answer": answer,
            "sources": sources,
            "model": model,
            "chunks_retrieved": len(results),
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/documents", methods=["GET"])
def list_documents():
    """List all ingested documents (grouped by file_name)."""
    try:
        # Scroll all points to get unique documents
        scroll_resp = requests.post(
            f"{QDRANT_URL}/collections/{COLLECTION}/points/scroll",
            json={"limit": 1000, "with_payload": True, "with_vector": False},
            timeout=30,
        )
        scroll_resp.raise_for_status()
        points = scroll_resp.json()["result"]["points"]

        docs = {}
        for p in points:
            pay = p["payload"]
            doc_id = pay.get("document_id", "unknown")
            if doc_id not in docs:
                docs[doc_id] = {
                    "document_id": doc_id,
                    "file_name": pay.get("file_name", "unknown"),
                    "uploaded_at": pay.get("uploaded_at", ""),
                    "total_chunks": pay.get("total_chunks", 0),
                    "chunks_stored": 0,
                }
            docs[doc_id]["chunks_stored"] += 1

        return jsonify({"documents": list(docs.values())})

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/documents/<doc_id>", methods=["DELETE"])
def delete_document(doc_id):
    """Delete all chunks belonging to a document."""
    try:
        resp = requests.post(
            f"{QDRANT_URL}/collections/{COLLECTION}/points/delete",
            json={
                "filter": {
                    "must": [{"key": "document_id", "match": {"value": doc_id}}]
                }
            },
            timeout=30,
        )
        resp.raise_for_status()
        return jsonify({"success": True, "deleted_document": doc_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─── Main ──────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 50)
    print("  PDF RAG Server")
    print("  http://localhost:3000")
    print("=" * 50)
    app.run(host="0.0.0.0", port=3000, debug=False)
