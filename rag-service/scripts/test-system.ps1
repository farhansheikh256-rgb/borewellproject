##############################################################
# End-to-End System Health Check
# 
# Verifies that all components are running and connected:
#   1. Qdrant is reachable
#   2. Ollama is running with required models
#   3. n8n is accessible
#   4. Qdrant collection exists
#   5. Test embedding generation
##############################################################

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PDF RAG System Health Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# ── Check 1: Qdrant ──
Write-Host "[1/5] Checking Qdrant..." -ForegroundColor White
try {
    $qdrant = Invoke-RestMethod -Uri "http://localhost:6333" -Method Get -ErrorAction Stop
    Write-Host "  [OK] Qdrant v$($qdrant.version) is running" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] Qdrant is NOT reachable on port 6333" -ForegroundColor Red
    Write-Host "  Fix: docker-compose up -d" -ForegroundColor Yellow
    $allGood = $false
}

# ── Check 2: Ollama ──
Write-Host "[2/5] Checking Ollama..." -ForegroundColor White
try {
    $ollamaModels = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -Method Get -ErrorAction Stop
    Write-Host "  [OK] Ollama is running" -ForegroundColor Green
    
    $modelNames = $ollamaModels.models | ForEach-Object { $_.name }
    
    # Check for nomic-embed-text
    $hasEmbed = $modelNames | Where-Object { $_ -like "*nomic-embed-text*" }
    if ($hasEmbed) {
        Write-Host "  [OK] nomic-embed-text model found" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] nomic-embed-text NOT found" -ForegroundColor Yellow
        Write-Host "  Fix: ollama pull nomic-embed-text" -ForegroundColor Yellow
        $allGood = $false
    }
    
    # Check for a chat model
    $hasChatModel = $modelNames | Where-Object { 
        $_ -like "*llama3*" -or $_ -like "*mistral*" -or $_ -like "*gemma*" -or $_ -like "*phi*"
    }
    if ($hasChatModel) {
        Write-Host "  [OK] Chat model found: $($hasChatModel -join ', ')" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] No chat model found" -ForegroundColor Yellow
        Write-Host "  Fix: ollama pull llama3.1:8b" -ForegroundColor Yellow
        $allGood = $false
    }
} catch {
    Write-Host "  [FAIL] Ollama is NOT reachable on port 11434" -ForegroundColor Red
    Write-Host "  Fix: Start Ollama app or run 'ollama serve'" -ForegroundColor Yellow
    $allGood = $false
}

# ── Check 3: n8n ──
Write-Host "[3/5] Checking n8n..." -ForegroundColor White
try {
    $n8n = Invoke-WebRequest -Uri "http://localhost:5678" -Method Get -ErrorAction Stop -UseBasicParsing
    Write-Host "  [OK] n8n is running on port 5678" -ForegroundColor Green
} catch {
    Write-Host "  [WARN] n8n is NOT reachable on port 5678" -ForegroundColor Yellow
    Write-Host "  Fix: n8n start" -ForegroundColor Yellow
    $allGood = $false
}

# ── Check 4: Qdrant Collection ──
Write-Host "[4/5] Checking Qdrant collection 'pdf_rag'..." -ForegroundColor White
try {
    $collection = Invoke-RestMethod -Uri "http://localhost:6333/collections/pdf_rag" -Method Get -ErrorAction Stop
    $vectorCount = $collection.result.points_count
    $vectorSize = $collection.result.config.params.vectors.size
    Write-Host "  [OK] Collection 'pdf_rag' exists" -ForegroundColor Green
    Write-Host "  Vector size: $vectorSize | Points stored: $vectorCount" -ForegroundColor DarkGray
} catch {
    Write-Host "  [WARN] Collection 'pdf_rag' NOT found" -ForegroundColor Yellow
    Write-Host "  Fix: .\scripts\create-qdrant-collection.ps1" -ForegroundColor Yellow
    $allGood = $false
}

# ── Check 5: Test Embedding ──
Write-Host "[5/5] Testing embedding generation..." -ForegroundColor White
try {
    $testBody = '{"model": "nomic-embed-text", "prompt": "test embedding"}'
    $embedResult = Invoke-RestMethod -Uri "http://localhost:11434/api/embeddings" -Method Post -Body $testBody -ContentType "application/json" -ErrorAction Stop
    
    if ($embedResult.embedding -and $embedResult.embedding.Count -eq 768) {
        Write-Host "  [OK] Embedding generated (768 dimensions)" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] Embedding returned unexpected dimensions: $($embedResult.embedding.Count)" -ForegroundColor Yellow
        $allGood = $false
    }
} catch {
    Write-Host "  [FAIL] Embedding generation failed" -ForegroundColor Red
    Write-Host "  Check Ollama is running and model is pulled" -ForegroundColor Yellow
    $allGood = $false
}

# ── Summary ──
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "  ALL CHECKS PASSED! System is ready." -ForegroundColor Green
    Write-Host "" -ForegroundColor White
    Write-Host "  Next steps:" -ForegroundColor White
    Write-Host "  1. Import workflows into n8n" -ForegroundColor White
    Write-Host "  2. Activate the ingestion workflow" -ForegroundColor White
    Write-Host "  3. Upload a PDF via the form" -ForegroundColor White
    Write-Host "  4. Activate the chat workflow" -ForegroundColor White
    Write-Host "  5. Ask questions via the webhook" -ForegroundColor White
} else {
    Write-Host "  SOME CHECKS FAILED — see above for fixes" -ForegroundColor Yellow
}
Write-Host "========================================" -ForegroundColor Cyan
