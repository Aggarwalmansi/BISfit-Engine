```
██████╗ ██╗███████╗███████╗██╗████████╗    ███████╗███╗   ██╗ ██████╗ ██╗███╗   ██╗███████╗
██╔══██╗██║██╔════╝██╔════╝██║╚══██╔══╝    ██╔════╝████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝
██████╔╝██║███████╗█████╗  ██║   ██║       █████╗  ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║█████╗
██╔══██╗██║╚════██║██╔══╝  ██║   ██║       ██╔══╝  ██║╚██╗██║██║   ██║██║██║╚██╗██║██╔══╝
██████╔╝██║███████║██║     ██║   ██║       ███████╗██║ ╚████║╚██████╔╝██║██║ ╚████║███████╗
╚═════╝ ╚═╝╚══════╝╚═╝     ╚═╝   ╚═╝       ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝
```

<div align="center">

**Retrieval-Augmented Generation System for Bureau of Indian Standards**
*SP 21 : 2005 — Summaries of Indian Standards for Building Materials*

---

![BIS](https://img.shields.io/badge/BIS-SP%2021%20%3A%202005-003580?style=for-the-badge&logoColor=white)
![Standards](https://img.shields.io/badge/IS%20Standards-580-FF6B35?style=for-the-badge)
![Chunks](https://img.shields.io/badge/Vector%20Chunks-584-2ECC71?style=for-the-badge)
![FAISS](https://img.shields.io/badge/Vector%20DB-FAISS%20384d-8E44AD?style=for-the-badge)
![Groq](https://img.shields.io/badge/LLM-Groq%20%7C%20Llama%203-F55036?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

---

🏆 **Hackathon Winner** — Built for the Indian construction and engineering community

*"Ask anything about Indian Standards for building materials — and get accurate, cited, hallucination-resistant answers in under 2 seconds."*

</div>

---

## 🏆 About This Project

**BISfit Engine** is the upgraded, production-grade evolution of BISfit — a four-layer Retrieval-Augmented Generation (RAG) system grounded entirely in **SP 21 : 2005**, the Bureau of Indian Standards handbook covering **580 Indian Standards** across **27 categories** of building materials.

India's construction sector — contributing ~9% of GDP and governed by statutory IS code compliance under the BIS Act, 2016 — has a critical access problem: the canonical reference for building material standards exists only as a dense, multi-column PDF that defeats conventional search. A site engineer verifying compressive strength requirements or a QA inspector confirming dimensional tolerances must manually search hundreds of pages, a process taking 45–90 minutes per query.

**BISfit Engine solves this entirely.** It restructures SP 21 : 2005 into 584 clean, metadata-rich semantic chunks, embeds them into a FAISS vector index, and serves grounded, cited answers through Groq's LPU-accelerated Llama models — with query reformulation, cosine re-ranking, and structured JSON output.

### What's New in the Engine Version

The original BISfit had a vanilla HTML/CSS/JS frontend. BISfit Engine upgrades it significantly:

| Area | Original BISfit | BISfit Engine |
|------|----------------|---------------|
| **Frontend** | Vanilla HTML + CSS + JS | Full TypeScript application with compiled `dist/` build |
| **API** | Served raw static files | Serves compiled `frontend/dist/` — proper production build |
| **Pipeline class** | `BISfitRAG` | `RAGPipeline` with `process_query()` interface |
| **Python version** | Unspecified | Pinned via `.python-version` |
| **Favicon** | None | `favicon.svg` served via dedicated endpoint |
| **Codebase** | Python-majority | TypeScript 58.7%, Python 30.9%, CSS 9.4% |

---

## ✅ Proven Performance

All three evaluation targets exceeded on the public benchmark (10 queries, `public_test_set.json`):

| Metric | Definition | Target | Result |
|--------|-----------|--------|--------|
| **Hit Rate @ 3** | Correct IS code appears in top-3 retrieved chunks | > 80% | ✅ **90%** |
| **MRR @ 5** | Mean Reciprocal Rank of first correct result in top-5 | > 0.70 | ✅ **0.90** |
| **Avg. Latency** | End-to-end response time per query | < 5.0 s | ✅ **1.71 s** |
| **Empty Response Rate** | Queries returning no IS code | 0% | ✅ **0%** |

```
──────────────────────────────────────
  BISfit Engine — Evaluation Results
──────────────────────────────────────
  Hit@3    :  90%     ✅  (target > 80%)
  MRR@5    :  0.900   ✅  (target > 0.7)
  Avg Lat. :  1.71s   ✅  (target < 5.0s)
  Queries  :  10
──────────────────────────────────────
```

---

## 🏗️ System Architecture

BISfit Engine runs in two fully decoupled phases:

```
╔══════════════════════════════════════════════════════════════════════════════════╗
║                        PHASE 1 — OFFLINE INGESTION (run once)                   ║
╠══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                  ║
║   BIS PDFs       parser.py        chunker.py        embedder.py      FAISS       ║
║   (SP 21)    ──▶ PyMuPDF      ──▶ 1 IS = 1 chunk ──▶ MiniLM-L6-v2 ──▶ Index    ║
║   580 stds       Section           584 chunks         384-dim          .bin       ║
║                  extractor                            vectors          + meta     ║
║                                                                                  ║
╠══════════════════════════════════════════════════════════════════════════════════╣
║                   PHASE 2 — ONLINE INFERENCE (Per Query)                         ║
║                                         ▲ Index loaded once at startup           ║
╠══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                  ║
║  User Query ──▶ Query Reform. ──▶ FAISS Search ──▶ Re-ranking ──▶ Generate ──▶  ║
║  Natural lang   Llama 3.1 8b     Top-k = 10        Cosine sim    Llama 3.3 70b  ║
║                 2 alt queries    Multi-query        De-dupl.      Narrative      ║
║                                  retrieval                        + IS codes     ║
║                                                                        │         ║
║                                                               JSON Output        ║
║                                                               + Regex Fallback   ║
║                                                               IS codes returned  ║
║                                                                                  ║
╠══════════════════════════════════════════════════════════════════════════════════╣
║                                  EVALUATION                                      ║
╠══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                  ║
║  inference.py ──▶ output.json   ──▶ eval_script.py    TARGET METRICS            ║
║  Batch runner     Results store      Hit@3 · MRR@5    ● Hit@3   > 80%           ║
║  3s sleep/query   id+stds+latency    Latency           ● MRR@5   > 0.70          ║
║                                                        ● Latency < 5s            ║
╚══════════════════════════════════════════════════════════════════════════════════╝
```

### Four-Layer Inference Pipeline

| Layer | What It Does |
|-------|-------------|
| **1 · Query Reformulation** | Llama 3.1 8b generates 2 IS-domain alternative queries in ~400 ms; original query always preserved |
| **2 · Multi-Query FAISS Search** | All 3 queries searched independently (top-10 each); results merged and deduplicated by `chunk_id` |
| **3 · Cosine Re-ranking** | Merged pool sorted by cosine score; top-5 selected; each chunk capped at 600 chars (~150 tokens) |
| **4 · Generate & Extract** | Single Llama 3.3 70b call returns narrative answer + IS codes as structured JSON; regex fallback if parse fails |

---

## 🛠️ Technology Stack

| Layer | Technology | Role |
|-------|-----------|------|
| **PDF Parsing** | PyMuPDF (`parser.py`) | Section-aware block detection; handles BIS multi-column layout |
| **Chunking** | Custom `chunker.py` | Domain-aware: 1 IS standard = 1 semantic chunk; no mid-clause splits |
| **Embeddings** | `all-MiniLM-L6-v2` (384-dim) | Fast, lightweight; strong recall on technical domain text |
| **Vector Store** | FAISS-CPU `IndexFlatIP` | Sub-millisecond similarity search; no external infrastructure |
| **Query Reformulation** | Groq · Llama 3.1 8b Instant | IS-focused query expansion in < 400 ms |
| **Answer Generation** | Groq · Llama 3.3 70b Versatile | High-quality narrative + structured IS code extraction |
| **LPU Inference** | Groq LPU hardware | 750–900 tokens/sec vs 30–60 on GPU — critical for sub-2s latency |
| **Key Rotation** | Round-robin (3 Groq keys) | 3× effective RPM headroom for batch inference |
| **API Layer** | FastAPI + Uvicorn | Async, typed REST API; serves compiled TypeScript frontend |
| **Frontend** | TypeScript (compiled to `dist/`) | Type-safe, production-grade UI with compiled asset pipeline |
| **Evaluation** | `eval_script.py` | Hit@3, MRR@5, avg latency benchmarking |

### Why Groq?

```
Standard GPU inference  ▓▓▓▓▓▓▓░░░░░░░░░░░░░   ~30–60 tokens/sec
Groq LPU                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ~750–900 tokens/sec  ⚡
```

- **Llama 3.1 8b** → query reformulation (fast, low-cost, < 400 ms per call)
- **Llama 3.3 70b** → generation (high quality, narrative + IS code extraction)
- **3-key rotation** → uninterrupted batch inference across 100+ queries

---

## 📁 Project Structure

```
BISfit-Engine/
│
├── 📁 data/
│   ├── chunk_metadata.json          ← Metadata for all 584 chunks (IS no., title, section)
│   ├── faiss_index.bin              ← Pre-built FAISS vector index (384-dim, 584 vectors)
│   ├── public_test_results.json     ← Output from evaluation inference run
│   ├── public_test_set.json         ← Benchmark queries with ground truth IS codes
│   └── rag_chunks.json              ← Full RAG dataset (one IS standard per entry)
│
├── 📁 src/
│   ├── 📁 ingestion/                ◀─ PHASE 1: Offline pipeline (run once)
│   │   ├── parser.py                ← PDF → structured per-standard text (PyMuPDF)
│   │   ├── chunker.py               ← Text → 584 IS-standard semantic chunks
│   │   └── embedder.py              ← Chunks → 384-dim vectors → FAISS index
│   │
│   └── 📁 pipeline/                 ◀─ PHASE 2: Online inference (per query)
│       ├── rag.py                   ← RAGPipeline: reform → retrieve → rerank → generate
│       └── llm_client.py            ← Groq client with 3-key round-robin rotation
│
├── 📁 frontend/                     ◀─ TypeScript application
│   └── dist/                        ← Compiled build served by FastAPI
│       ├── index.html
│       ├── favicon.svg
│       └── assets/                  ← Compiled JS + CSS bundles
│
├── api.py                           ← FastAPI server — serves RAG API + compiled frontend
├── eval_script.py                   ← Computes Hit@3, MRR@5, avg latency (unchanged)
├── inference.py                     ← Batch runner: queries public_test_set.json (unchanged)
├── presentation.pdf                 ← Project presentation deck
├── requirements.txt                 ← Python dependencies
├── .python-version                  ← Pinned Python version
├── .gitignore                       ← Covers .env, venv/, __pycache__, *.bin
└── SOLUTION.md                      ← Full architecture and design documentation
```

---

## 🧩 Chunk Schema

Every entry in `data/rag_chunks.json` follows this structure. The separation of `text_to_embed` and `content_only` is a core design decision — the IS number and title live inside the vector (enabling both exact and semantic retrieval), while only clean prose is sent to the LLM:

```json
{
  "chunk_id":       "CHUNK_0004",
  "is_number":      "IS 269 : 1989",
  "title":          "ORDINARY PORTLAND CEMENT, 33 GRADE",
  "section_number": 1,
  "section_name":   "CEMENT AND CONCRETE",
  "source":         "SP 21 : 2005",
  "publisher":      "Bureau of Indian Standards (BIS)",
  "text_to_embed":  "IS Number: IS 269 : 1989\nTitle: ORDINARY PORTLAND CEMENT...\n\n1. Scope — ...",
  "content_only":   "1. Scope — This standard covers ordinary Portland cement..."
}
```

| Field | Purpose |
|-------|---------|
| `chunk_id` | Links `rag_chunks.json` ↔ `chunk_metadata.json` ↔ FAISS index row |
| `is_number` | Keyword-exact IS code signal embedded inside the vector |
| `section_number` | Enables metadata pre-filtering before vector search |
| `text_to_embed` | Fed to `embedder.py` — metadata prefix boosts semantic recall |
| `content_only` | Fed to Llama 3.3 70b — clean prose only, maximum useful tokens |

---

## 📦 Data Source

| Field | Value |
|-------|-------|
| **Document** | SP 21 : 2005 |
| **Full Title** | Summaries of Indian Standards for Building Materials *(First Revision)* |
| **Publisher** | Bureau of Indian Standards, Manak Bhavan, New Delhi 110002 |
| **Committee** | CED 13 — Building Construction Practices Sectional Committee |
| **Standards Covered** | 580 IS standards across 27 building material categories |
| **Chunks Generated** | 584 (metadata-prefixed, one standard per chunk) |
| **Embedding Model** | `all-MiniLM-L6-v2` · 384-dimensional vectors |
| **Index File** | `data/faiss_index.bin` · IndexFlatIP with L2 normalisation · 897 KB |

### 27 BIS Sections Covered

| # | Section | # | Section |
|---|---------|---|---------|
| 1 | Cement and Concrete | 15 | Structural Steels |
| 2 | Building Limes | 16 | Light Metals and Their Alloys |
| 3 | Stones | 17 | Structural Shapes |
| 4 | Clay Products for Building | 18 | Welding Electrodes and Wires |
| 5 | Gypsum Building Materials | 19 | Threaded Fasteners and Rivets |
| 6 | Timber | 20 | Wire Ropes and Wire Products |
| 7 | Bitumen and Tar Products | 21 | Glass |
| 8 | Floor, Wall, Roof Coverings & Finishes | 22 | Fillers, Stoppers and Putties |
| 9 | Waterproofing & Damp-Proofing Materials | 23 | Thermal Insulation Materials |
| 10 | Sanitary Appliances & Water Fittings | 24 | Plastics |
| 11 | Builder's Hardware | 25 | Conductors and Cables |
| 12 | Wood Products | 26 | Wiring Accessories |
| 13 | Doors, Windows and Shutters | 27 | General |
| 14 | Concrete Reinforcement | | |

---

## 🚀 Installation

```bash
# 1. Clone the repository
git clone https://github.com/Aggarwalmansi/BISfit-Engine.git
cd BISfit-Engine

# 2. Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate           # Windows

# 3. Install all Python dependencies
pip install -r requirements.txt
```

### `requirements.txt`

```
groq>=0.9.0
faiss-cpu>=1.8.0
numpy>=1.26.0
pymupdf>=1.24.0
sentence-transformers>=3.0.0
python-dotenv>=1.0.0
tqdm>=4.66.0
fastapi>=0.111.0
uvicorn>=0.30.0
```

---

## ⚙️ Environment Setup

> ⚠️ **Complete this before running anything.** BISfit Engine uses **3 separate Groq API keys** in round-robin rotation to stay within rate limits during batch inference.

### Step 1 — Create `.env` in the project root

```bash
# ──────────────────────────────────────────────────────
#  BISfit Engine — Environment Configuration
#  ⚠️  This file is in .gitignore — NEVER commit it
# ──────────────────────────────────────────────────────

GROQ_API_KEY_1=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GROQ_API_KEY_2=gsk_yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
GROQ_API_KEY_3=gsk_zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
```

> 🔑 All three keys **must be different**. Using the same key three times defeats the rate-limit rotation entirely.

### Step 2 — Get your API keys

**[📎 Access BISfit API Keys →](https://docs.google.com/document/d/1AI26neJ9VIcLlg7ipCz2IZXJfdoCsod2B3bheHDo900/edit?usp=sharing)**

*Open the Google Doc — all three Groq API keys are provided, ready to paste into your `.env`.*

### Step 3 — How key rotation works

`src/pipeline/llm_client.py` handles this automatically on every LLM call:

```python
import os, itertools
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

_keys = [
    os.getenv("GROQ_API_KEY_1"),
    os.getenv("GROQ_API_KEY_2"),
    os.getenv("GROQ_API_KEY_3"),
]
_cycle = itertools.cycle(_keys)

def get_client() -> Groq:
    """Returns a Groq client on the next key in rotation."""
    return Groq(api_key=next(_cycle))
```

Each query uses the next key in sequence — **3× effective rate-limit headroom**, critical when `inference.py` runs 100+ queries with only a 3-second sleep between them.

---

## ▶️ Running the Pipeline

### Phase 1 — Build the FAISS Index *(one-time only)*

Run the three ingestion scripts in sequence:

```bash
# Step 1: Parse SP 21 PDF into structured section text
python -m src.ingestion.parser

# Step 2: Chunk parsed text → 584 IS-standard chunks → data/rag_chunks.json
python -m src.ingestion.chunker

# Step 3: Embed all chunks → build FAISS index → data/faiss_index.bin
python -m src.ingestion.embedder
```

Expected output after `embedder.py`:

```
Loading: all-MiniLM-L6-v2
Embedding 584 chunks... ████████████████████ 100%  [584/584]
FAISS index built — 584 vectors @ 384 dims
Saved ──▶ data/faiss_index.bin
Saved ──▶ data/chunk_metadata.json
✓ Phase 1 complete
```

> ⏱ Estimated time: ~2–4 minutes on CPU. The pre-built index is already committed to `data/` — skip this step entirely if you haven't changed the source PDF.

---

### Phase 2 — Start the Full System (API + Frontend)

```bash
source venv/bin/activate
uvicorn api:app --reload --port 8000
```

Open **http://127.0.0.1:8000** — the TypeScript UI and RAG API are both served from this single command.

**API Endpoints:**

| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/health` | `{ status, pipeline_ready }` — polled by frontend every 30s |
| `POST` | `/query` | `{ query }` → `{ response, retrieved_standards, latency_seconds }` |
| `GET` | `/` | Serves compiled `frontend/dist/index.html` |
| `GET` | `/assets/*` | Serves compiled TypeScript JS + CSS bundles |
| `GET` | `/favicon.svg` | Serves the application favicon |

---

### Single Query (Python)

```python
from src.pipeline.rag import RAGPipeline

rag = RAGPipeline(
    index_path="data/faiss_index.bin",
    metadata_path="data/chunk_metadata.json",
)

result = rag.process_query(
    "What are the compressive strength requirements for Portland cement?",
    top_k=5
)

print(result["response"])             # Narrative answer from Llama 3.3 70b
print(result["retrieved_standards"])  # e.g. ["IS 269 : 1989", "IS 455 : 1989"]
print(result["latency_seconds"])      # e.g. 1.71
```

---

## 📊 Evaluation

```bash
# Step 1: Run batch inference against the benchmark
python inference.py

# Step 2: Compute Hit@3, MRR@5, and latency
python eval_script.py
```

Results are written to `data/public_test_results.json`:

```json
{
  "id": "q_042",
  "query": "thermal insulation requirements for mineral wool",
  "predicted_standards": ["IS 8183 : 1993", "IS 3677 : 1985"],
  "latency_ms": 2341
}
```

> ℹ️ `eval_script.py` and `inference.py` import the `RAGPipeline` directly — no HTTP overhead during evaluation. The API server does not need to be running.

---

## 🔒 Security

```
.env              ← Never commit — API keys are invalidated immediately if exposed
venv/             ← Git-ignored
__pycache__/      ← Git-ignored
data/faiss_index.bin ← Git-ignored (pre-built index committed separately)
*.bin             ← Git-ignored
```

- ❌ Never commit `.env` or hardcode keys anywhere in source
- ✅ Always load via `os.getenv()` with `python-dotenv`
- ✅ Rotate keys periodically at [console.groq.com](https://console.groq.com)

---

## 👥 Who Is It For?

| User | Example Query |
|------|--------------|
| **Site Engineer** | "What are the compressive strength requirements for 53 grade OPC?" |
| **QA Inspector** | "What tests are required for hollow concrete masonry blocks?" |
| **Manufacturer** | "Which standard governs my bituminous waterproofing membrane?" |
| **Architect** | "Which IS code covers corrugated asbestos cement roofing sheets?" |
| **Contractor** | "What are the dimensional tolerances for clay bricks?" |

---

## 📄 Further Documentation

- [`SOLUTION.md`](./SOLUTION.md) — Full architecture, design decisions, pipeline detail, and evaluation methodology
- [`presentation.pdf`](./presentation.pdf) — Project presentation deck

---

<div align="center">

**Built for the Indian construction and engineering community**

*BISfit Engine is an independent RAG research tool.*
*Not affiliated with or endorsed by the Bureau of Indian Standards.*

`SP 21 : 2005` · `580 IS Standards` · `584 Semantic Chunks` · `Groq LPU` · `Llama 3` · `FAISS` · `TypeScript` · `FastAPI`

</div>