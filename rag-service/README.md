# 📄 RAG_Testing_3.0 — Local PDF Question-Answering System

A **100% local-first**, self-hosted RAG (Retrieval-Augmented Generation) pipeline for PDF document question-answering. Upload any PDF, ask questions in natural language, and get precise answers backed by source citations — all running on your own machine.

> **Zero cloud dependency for core functionality.** Embeddings and vector search run entirely locally via Ollama + Qdrant. Gemini API is used only for answer generation (with automatic local Ollama fallback).

---

## 📸 Screenshots

| Web UI — Chat Interface | Document Sidebar |
|---|---|
| Dark-themed chat with source citations | Drag-and-drop PDF upload with document list |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PDF RAG System                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Upload   │───▶│  PyMuPDF │───▶│  Chunk   │───▶│  Ollama  │  │
│  │   PDF     │    │ Extract  │    │ (500ch)  │    │  Embed   │  │
│  └──────────┘    └──────────┘    └──────────┘    └────┬─────┘  │
│                                                       │        │
│                                                       ▼        │
│                                                  ┌──────────┐  │
│                                                  │  Qdrant   │  │
│                                                  │  Store    │  │
│                                                  └────┬─────┘  │
│                                                       │        │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐         │        │
│  │  Answer   │◀──│  Gemini/ │◀──│  Build   │◀────────┘        │
│  │  + Cite   │   │  Ollama  │   │ Context  │                   │
│  └──────────┘    └──────────┘    └──────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Ingestion**: PDF → PyMuPDF text extraction → Chunking (500 chars, 100 overlap) → Ollama embedding (`nomic-embed-text`, 768 dims) → Qdrant vector storage
2. **Retrieval**: Question → Ollama embed → Qdrant similarity search (top 5, threshold 0.3) → Context assembly → LLM answer with source citations

---

## 🛠️ Tech Stack

| Component | Technology | Port | Purpose |
|---|---|---|---|
| **Web UI** | Flask + Vanilla HTML/CSS/JS | `3000` | Chat interface & PDF upload |
| **Embeddings** | Ollama (`nomic-embed-text`) | `11434` | Vector generation (768 dims) |
| **Vector DB** | Qdrant (standalone binary) | `6333` | Similarity search & storage |
| **LLM (Primary)** | Google Gemini 2.0 Flash | cloud | Answer generation |
| **LLM (Fallback)** | Ollama (`gemma2:2b`) | `11434` | Local fallback when Gemini is rate-limited |
| **PDF Parsing** | PyMuPDF (pymupdf) | — | Text extraction from PDFs |
| **Automation** | n8n (self-hosted) | `5678` | Webhook-based workflow pipelines |

---

## 📁 Project Structure

```
RAG_Testing_3.0/
├── .env                          # Your secrets (GEMINI_API_KEY) — gitignored
├── .env.example                  # Template for .env
├── .gitignore
├── README.md                     # This file
├── docker-compose.yml            # Docker setup (alternative to standalone)
├── server.py                     # Flask backend (Web UI + API)
│
├── static/
│   └── index.html                # Premium dark-themed chat UI
│
├── scripts/
│   ├── ingest_pdf.py             # CLI: Ingest a PDF into Qdrant
│   ├── rag_chat.py               # CLI: Ask questions via terminal
│   ├── create-qdrant-collection.ps1  # Create Qdrant collection
│   ├── setup-ollama.ps1          # Pull required Ollama models
│   ├── start-qdrant.ps1          # Start Qdrant server
│   └── test-system.ps1           # System health check
│
├── workflows/
│   ├── pdf-rag-ingestion.json    # n8n workflow: PDF ingestion
│   └── pdf-rag-chat.json         # n8n workflow: Chat retrieval
│
├── uploads/                      # Staged PDFs (gitignored contents)
└── qdrant/                       # Qdrant binary + data (gitignored)
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Windows 10/11** (tested on Windows; adaptable to Linux/macOS)
- **Python 3.10+** with pip
- **Node.js 18+** with npm (for n8n)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/chinmaypawar1000-beep/RAG_Testing_3.0.git
cd RAG_Testing_3.0
```

### Step 2: Install Python Dependencies

```bash
pip install flask flask-cors pymupdf requests
```

### Step 3: Install & Configure Ollama

Download Ollama from [https://ollama.com](https://ollama.com), then pull the required models:

```bash
# Set Ollama to listen on all interfaces (important for n8n connectivity)
set OLLAMA_HOST=0.0.0.0:11434

# Pull models
ollama pull nomic-embed-text    # Embedding model (768 dimensions)
ollama pull gemma2:2b           # Local LLM fallback
```

Or use the setup script:
```powershell
.\scripts\setup-ollama.ps1
```

### Step 4: Install & Start Qdrant

**Option A: Standalone binary (recommended)**

Download `qdrant.exe` from [Qdrant releases](https://github.com/qdrant/qdrant/releases) and place it in the `qdrant/` directory, then:

```powershell
.\scripts\start-qdrant.ps1
```

**Option B: Docker**
```bash
docker run -d -p 6333:6333 -v ./qdrant/storage:/qdrant/storage qdrant/qdrant
```

### Step 5: Create the Vector Collection

```powershell
.\scripts\create-qdrant-collection.ps1
```

Or manually:
```bash
curl -X PUT http://localhost:6333/collections/pdf_rag \
  -H "Content-Type: application/json" \
  -d '{"vectors":{"size":768,"distance":"Cosine"}}'
```

### Step 6: Set Up Your Gemini API Key

```bash
# Copy the example and add your key
cp .env.example .env
# Edit .env and set: GEMINI_API_KEY=your_actual_key_here
```

Get a free API key at [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

> **Note:** Gemini is optional. If no key is set or Gemini is rate-limited, the system automatically falls back to the local Ollama `gemma2:2b` model.

### Step 7: Install n8n (Optional — for webhook workflows)

```bash
npm install -g n8n
n8n start
```

Then import the workflows:
```bash
n8n import:workflow --input=workflows/pdf-rag-ingestion.json
n8n import:workflow --input=workflows/pdf-rag-chat.json
```

---

## ▶️ Running the System

### Quick Start (3 terminals)

```bash
# Terminal 1: Start Qdrant
.\scripts\start-qdrant.ps1
# Or: cd qdrant && .\qdrant.exe

# Terminal 2: Start Ollama
set OLLAMA_HOST=0.0.0.0:11434
ollama serve

# Terminal 3: Start Web UI
python server.py
```

Then open **http://localhost:3000** in your browser.

### Optional: Start n8n (Terminal 4)
```bash
n8n start
# Then activate workflows at http://localhost:5678
```

---

## 💡 Usage

### Web UI (Recommended)

1. Open **http://localhost:3000**
2. **Upload PDFs**: Drag-and-drop or click "Browse Files" in the sidebar
3. **Ask questions**: Type in the chat input and press Enter
4. **Filter by document**: Click a document name in the sidebar to scope answers
5. **Delete documents**: Hover over a document and click ✕

### CLI — Ingest a PDF

```bash
python scripts/ingest_pdf.py "C:\path\to\your\document.pdf"
```

Output:
```
📄 Processing: C:\path\to\your\document.pdf
✅ Extracted 2459 characters
   Preview: My friend Chungya from Pablya...
✅ Created 7 chunks
   Embedding chunk 1/7... ✅
   ...
🎉 Done! Stored 7/7 chunks
   Document ID: doc_1778372442_d
   File: document.pdf
   Total points in Qdrant: 7
```

### CLI — Ask a Question

```bash
# Ask across all documents
python scripts/rag_chat.py "What is this document about?"

# Filter to a specific file
python scripts/rag_chat.py "Explain carbon bonding" "NCERT 3.pdf"
```

### n8n Webhook — Ingest

```bash
curl -X POST "http://localhost:5678/webhook/pdf-ingest?file_path=C:/path/to/file.pdf"
```

> **Important:** n8n restricts file access to `C:\Users\<user>\.n8n-files\`. Copy PDFs there first, or use the Web UI / CLI instead.

### n8n Webhook — Chat

```bash
curl -X POST http://localhost:5678/webhook/rag-chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is this about?"}'
```

---

## 🔌 API Reference

All endpoints are served by `server.py` on **port 3000**.

### `POST /api/upload`

Upload and ingest a PDF file.

**Request:** `multipart/form-data` with field `file` (PDF)

**Response:**
```json
{
  "success": true,
  "document_id": "doc_1778372442_d",
  "file_name": "NCERT 3.pdf",
  "characters": 48230,
  "chunks_created": 123,
  "chunks_stored": 123
}
```

### `POST /api/chat`

Ask a question with RAG retrieval.

**Request:**
```json
{
  "question": "What is carbon bonding?",
  "file_filter": "NCERT 3.pdf"  // optional
}
```

**Response:**
```json
{
  "question": "What is carbon bonding?",
  "answer": "Carbon bonding refers to...",
  "sources": [
    {"file": "NCERT 3.pdf", "chunk": 5, "total": 123, "score": 0.742}
  ],
  "model": "gemini-2.0-flash",
  "chunks_retrieved": 5
}
```

### `GET /api/documents`

List all ingested documents.

**Response:**
```json
{
  "documents": [
    {
      "document_id": "doc_1778372442_d",
      "file_name": "NCERT 3.pdf",
      "uploaded_at": "2026-05-10T00:00:00Z",
      "total_chunks": 123,
      "chunks_stored": 123
    }
  ]
}
```

### `DELETE /api/documents/<doc_id>`

Delete all chunks belonging to a document.

**Response:**
```json
{"success": true, "deleted_document": "doc_1778372442_d"}
```

---

## 🤖 For AI Agents (Antigravity / Cursor / Copilot)

This section is for AI coding agents that need to understand, modify, or extend this project.

### Key Architectural Decisions

1. **Monolith Code Nodes in n8n**: The n8n workflows use single `Code` nodes that handle the entire pipeline (embed → search → answer) instead of separate HTTP Request nodes. This is because n8n's Task Runner sandboxes code execution and resolves `localhost` to IPv6 (`::1`), which Ollama/Qdrant don't listen on. Always use `127.0.0.1` explicitly.

2. **PyMuPDF over n8n Extract**: n8n's built-in "Extract from PDF" node fails on Google Docs-exported PDFs (Skia renderer with encoded fonts). PyMuPDF handles these correctly. Always use the Python `ingest_pdf.py` or `server.py` for ingestion.

3. **File Access Restrictions**: n8n v2.19+ restricts file access to `C:\Users\<user>\.n8n-files\`. The Web UI (`server.py`) has no such restriction and is the preferred ingestion method.

4. **Gemini → Ollama Fallback**: The `ask_llm()` function in `server.py` tries Gemini first. If it gets a 429 (rate limit) or any error, it automatically falls back to the local Ollama model. This is transparent to the user.

5. **Environment Variables**: The Gemini API key is loaded from `.env` via a simple file parser (no `python-dotenv` dependency). The `.env` file is gitignored.

### How to Extend

**Add a new embedding model:**
- Change `EMBED_MODEL` in `server.py` and `scripts/ingest_pdf.py`
- Re-create the Qdrant collection if the vector dimensions change (e.g., 768 → 1024)
- Re-ingest all documents

**Add a new LLM:**
- Add a new function like `ask_claude()` in `server.py`
- Add it to the `ask_llm()` fallback chain

**Add OCR for scanned PDFs:**
- Install `pytesseract` and `Pillow`
- In `extract_text()`, detect if `page.get_text()` returns empty
- Fall back to rendering the page as an image and running OCR

**Change chunk size:**
- Modify `CHUNK_SIZE` and `CHUNK_OVERLAP` in `server.py` and `scripts/ingest_pdf.py`
- Re-ingest documents after changing

### Common Issues & Fixes

| Issue | Cause | Fix |
|---|---|---|
| `ECONNREFUSED ::1:6333` | n8n resolves `localhost` to IPv6 | Use `127.0.0.1` instead of `localhost` |
| `Failed to restore binary data` | n8n Task Runner sandbox | Use monolith Code nodes, not separate nodes |
| `Text too short (length 0)` | Google Docs PDF with encoded fonts | Use PyMuPDF (`ingest_pdf.py`) instead of n8n's extractor |
| `Access to file not allowed` | n8n file access restriction | Copy files to `~/.n8n-files/` or use Web UI |
| `429 Too Many Requests` | Gemini free tier rate limit | System auto-falls back to Ollama; wait or upgrade plan |
| Ollama connection refused | Ollama not listening on all interfaces | Set `OLLAMA_HOST=0.0.0.0:11434` before starting |

### File-by-File Reference

| File | Purpose | Key Functions |
|---|---|---|
| `server.py` | Flask backend, all API endpoints | `extract_text()`, `chunk_text()`, `embed_text()`, `ask_llm()` |
| `static/index.html` | Single-file chat UI | `uploadFile()`, `sendQuestion()`, `loadDocuments()` |
| `scripts/ingest_pdf.py` | CLI PDF ingestion | `main()` — extract → chunk → embed → store |
| `scripts/rag_chat.py` | CLI question answering | `main()` — embed query → search → ask LLM |
| `workflows/pdf-rag-ingestion.json` | n8n ingestion workflow | Webhook → Read File → Extract → Code node |
| `workflows/pdf-rag-chat.json` | n8n chat workflow | Webhook → Code node (all-in-one) |

### Configuration Constants

| Constant | Default | Location | Description |
|---|---|---|---|
| `CHUNK_SIZE` | 500 | server.py, ingest_pdf.py | Characters per chunk |
| `CHUNK_OVERLAP` | 100 | server.py, ingest_pdf.py | Overlap between chunks |
| `SCORE_THRESHOLD` | 0.3 | server.py, rag_chat.py | Minimum similarity score |
| `TOP_K` | 5 | server.py, rag_chat.py | Max chunks returned |
| `EMBED_MODEL` | nomic-embed-text | all files | Ollama embedding model |
| `CHAT_MODEL` | gemma2:2b | server.py, rag_chat.py | Local LLM fallback |
| `GEMINI_MODEL` | gemini-2.0-flash | server.py | Primary cloud LLM |
| `COLLECTION` | pdf_rag | all files | Qdrant collection name |

---

## 🔒 Security Notes

- **API keys** are stored in `.env` (gitignored), never committed to the repo
- **No authentication** on the Web UI — intended for local/private use only
- **No data leaves your machine** except LLM requests to Gemini (which can be disabled by not setting `GEMINI_API_KEY`)
- To run fully offline: don't set `GEMINI_API_KEY` and the system uses only local Ollama

---

## 📝 License

MIT — Free to use, modify, and distribute.
