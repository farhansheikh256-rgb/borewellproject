"""
PDF Text Extraction + RAG Ingestion Script
Extracts text from PDF using PyMuPDF, chunks it, embeds via Ollama,
and stores vectors in Qdrant.

Usage: python scripts/ingest_pdf.py <pdf_path>
"""

import sys
import json
import time
import random
import string
import requests
import pymupdf  # PyMuPDF

OLLAMA_URL = "http://localhost:11434"
QDRANT_URL = "http://localhost:6333"
COLLECTION = "pdf_rag"
EMBED_MODEL = "nomic-embed-text"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 100


def extract_text(pdf_path):
    """Extract text from PDF using PyMuPDF."""
    doc = pymupdf.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text() + "\n"
    doc.close()
    return text.strip()


def chunk_text(text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    """Split text into overlapping chunks."""
    chunks = []
    start = 0
    idx = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        if end < len(text):
            # Try to break at sentence boundary
            last_period = text.rfind(".", start, end)
            last_newline = text.rfind("\n", start, end)
            best_break = max(last_period, last_newline)
            if best_break > start + chunk_size * 0.4:
                end = best_break + 1
        chunk = text[start:end].strip()
        if len(chunk) > 20:
            chunks.append({"text": chunk, "index": idx})
            idx += 1
        start = end - overlap
        if end >= len(text):
            break
    return chunks


def embed_text(text):
    """Generate embedding via Ollama."""
    resp = requests.post(
        f"{OLLAMA_URL}/api/embeddings",
        json={"model": EMBED_MODEL, "prompt": text},
        timeout=60,
    )
    resp.raise_for_status()
    return resp.json()["embedding"]


def upsert_to_qdrant(point_id, vector, payload):
    """Store vector in Qdrant."""
    resp = requests.put(
        f"{QDRANT_URL}/collections/{COLLECTION}/points",
        json={"points": [{"id": point_id, "vector": vector, "payload": payload}]},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()


def main():
    if len(sys.argv) < 2:
        print("Usage: python ingest_pdf.py <pdf_path>")
        sys.exit(1)

    pdf_path = sys.argv[1]
    print(f"📄 Processing: {pdf_path}")

    # 1. Extract
    text = extract_text(pdf_path)
    print(f"✅ Extracted {len(text)} characters")

    if len(text) < 30:
        print("❌ Too little text. PDF might be image-based/scanned.")
        sys.exit(1)

    # Show preview
    print(f"   Preview: {text[:200]}...")

    # 2. Chunk
    chunks = chunk_text(text)
    print(f"✅ Created {len(chunks)} chunks")

    # 3. Embed + Store
    doc_id = f"doc_{int(time.time())}_{random.choice(string.ascii_lowercase)}"
    file_name = pdf_path.split("/")[-1].split("\\")[-1]
    uploaded_at = time.strftime("%Y-%m-%dT%H:%M:%SZ")
    success = 0

    for chunk in chunks:
        try:
            print(f"   Embedding chunk {chunk['index'] + 1}/{len(chunks)}...", end=" ")
            embedding = embed_text(chunk["text"])

            # Create numeric ID
            h = hash(f"{doc_id}_{chunk['index']}") & 0x7FFFFFFF
            point_id = h + chunk["index"]

            upsert_to_qdrant(
                point_id,
                embedding,
                {
                    "text": chunk["text"],
                    "document_id": doc_id,
                    "file_name": file_name,
                    "chunk_index": chunk["index"],
                    "source": file_name,
                    "uploaded_at": uploaded_at,
                    "total_chunks": len(chunks),
                },
            )
            success += 1
            print("✅")
        except Exception as e:
            print(f"❌ {e}")

    print(f"\n🎉 Done! Stored {success}/{len(chunks)} chunks")
    print(f"   Document ID: {doc_id}")
    print(f"   File: {file_name}")

    # Verify
    info = requests.get(f"{QDRANT_URL}/collections/{COLLECTION}").json()
    print(f"   Total points in Qdrant: {info['result']['points_count']}")


if __name__ == "__main__":
    main()
