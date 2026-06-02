"""
RAG Chat Script - Ask questions about ingested PDFs
Uses Qdrant for retrieval and Ollama for LLM answers.

Usage: python scripts/rag_chat.py "Your question here"
"""

import os
import sys
import json
import requests
from pathlib import Path

# Load .env
_env = Path(__file__).parent.parent / ".env"
if _env.exists():
    for line in _env.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())

OLLAMA_URL = "http://localhost:11434"
QDRANT_URL = "http://localhost:6333"
COLLECTION = "pdf_rag"
EMBED_MODEL = "nomic-embed-text"
CHAT_MODEL = "gemma2:2b"
SCORE_THRESHOLD = 0.3
TOP_K = 5

SYSTEM_PROMPT = """You are a precise document assistant. You MUST answer questions ONLY using the provided context from retrieved document chunks. 
STRICT RULES:
1) NEVER use your general knowledge.
2) NEVER invent facts, names, dates, numbers, or citations.
3) If the context does not contain the answer, respond EXACTLY with: I could not find this information in the uploaded document.
4) Always mention which source file and chunk number your answer comes from.
5) Be concise and factual.
6) Quote directly from the context when possible."""


def embed_query(query):
    resp = requests.post(
        f"{OLLAMA_URL}/api/embeddings",
        json={"model": EMBED_MODEL, "prompt": query},
        timeout=60,
    )
    resp.raise_for_status()
    return resp.json()["embedding"]


def search_qdrant(embedding, file_filter=None):
    payload = {
        "vector": embedding,
        "limit": TOP_K,
        "score_threshold": SCORE_THRESHOLD,
        "with_payload": True,
        "with_vector": False,
    }
    if file_filter:
        payload["filter"] = {
            "must": [{"key": "file_name", "match": {"value": file_filter}}]
        }
    resp = requests.post(
        f"{QDRANT_URL}/collections/{COLLECTION}/points/search",
        json=payload,
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["result"]


def ask_llm(question, context, sources):
    user_msg = f"""Context from retrieved documents:

{context}

---

Question: {question}

Answer based ONLY on the above context. If the answer is not in the context, say exactly: I could not find this information in the uploaded document."""

    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not set")
    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": SYSTEM_PROMPT + "\n\n" + user_msg}]
            }
        ],
        "generationConfig": {
            "temperature": 0.1
        }
    }

    resp = requests.post(gemini_url, json=payload, timeout=120)
    resp.raise_for_status()
    return resp.json()["candidates"][0]["content"]["parts"][0]["text"]


def main():
    if len(sys.argv) < 2:
        print("Usage: python rag_chat.py \"Your question here\"")
        sys.exit(1)

    question = sys.argv[1]
    file_filter = sys.argv[2] if len(sys.argv) > 2 else None

    print(f"Question: {question}")
    if file_filter:
        print(f"Filter: {file_filter}")
    print()

    # 1. Embed the question
    print("Embedding question...", end=" ")
    embedding = embed_query(question)
    print(f"OK ({len(embedding)} dims)")

    # 2. Search Qdrant
    print("Searching Qdrant...", end=" ")
    results = search_qdrant(embedding, file_filter)
    print(f"Found {len(results)} matching chunks")

    if not results:
        print("\nAnswer: I could not find this information in the uploaded document.")
        return

    # 3. Build context
    context_parts = []
    sources = []
    for r in results:
        p = r["payload"]
        score = round(r["score"], 3)
        context_parts.append(
            f"[Source: {p['file_name']}, Chunk {p['chunk_index'] + 1}/{p['total_chunks']}, Score: {score}]\n{p['text']}"
        )
        sources.append(f"  {p['file_name']} (Chunk {p['chunk_index'] + 1}, Score: {score})")

    context = "\n\n---\n\n".join(context_parts)

    # 4. Ask LLM
    print("Asking LLM...", end=" ")
    answer = ask_llm(question, context, sources)
    print("Done!\n")

    print("=" * 60)
    print("ANSWER:")
    print("=" * 60)
    print(answer)
    print()
    print("SOURCES:")
    for s in sources:
        print(s)


if __name__ == "__main__":
    main()
