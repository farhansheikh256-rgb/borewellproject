##############################################################
# Create Qdrant Collection for PDF RAG
#
# Collection: pdf_rag
# Vector size: 768 (nomic-embed-text output dimension)
# Distance: Cosine
#
# Run AFTER docker-compose is up and Qdrant is running.
##############################################################

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Qdrant Collection Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$qdrantUrl = "http://localhost:6333"

# Check if Qdrant is running
try {
    $health = Invoke-RestMethod -Uri "$qdrantUrl/healthz" -Method Get -ErrorAction Stop
    Write-Host "[OK] Qdrant is running" -ForegroundColor Green
}
catch {
    Write-Host "[ERROR] Qdrant is not reachable at $qdrantUrl" -ForegroundColor Red
    Write-Host "Make sure Docker is running and run: docker-compose up -d" -ForegroundColor Yellow
    exit 1
}

# Check if collection already exists
try {
    $existing = Invoke-RestMethod -Uri "$qdrantUrl/collections/pdf_rag" -Method Get -ErrorAction Stop
    Write-Host "[INFO] Collection 'pdf_rag' already exists!" -ForegroundColor Yellow
    Write-Host "Skipping creation. To recreate, delete it first:" -ForegroundColor DarkGray
    Write-Host "  Invoke-RestMethod -Uri '$qdrantUrl/collections/pdf_rag' -Method Delete" -ForegroundColor DarkGray
    exit 0
}
catch {
    # Collection doesn't exist, proceed to create
}

# Create the collection
$body = @{
    vectors = @{
        size     = 768
        distance = "Cosine"
    }
} | ConvertTo-Json -Depth 5

Write-Host "Creating collection 'pdf_rag' (768 dims, Cosine)..." -ForegroundColor Yellow

try {
    $result = Invoke-RestMethod -Uri "$qdrantUrl/collections/pdf_rag" -Method Put -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "[DONE] Collection 'pdf_rag' created successfully!" -ForegroundColor Green
}
catch {
    Write-Host "[ERROR] Failed to create collection:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

# Create payload index for faster filtering
Write-Host ""
Write-Host "Creating payload indexes for metadata filtering..." -ForegroundColor Yellow

$indexes = @("file_name", "document_id", "source")
foreach ($field in $indexes) {
    $indexBody = @{
        field_name   = $field
        field_schema = "keyword"
    } | ConvertTo-Json

    try {
        Invoke-RestMethod -Uri "$qdrantUrl/collections/pdf_rag/index" -Method Put -Body $indexBody -ContentType "application/json" -ErrorAction Stop
        Write-Host "  [OK] Index on '$field'" -ForegroundColor Green
    }
    catch {
        Write-Host "  [WARN] Index on '$field' may already exist" -ForegroundColor DarkYellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Collection ready for PDF ingestion!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# Verify
Write-Host ""
Write-Host "Collection info:" -ForegroundColor White
$info = Invoke-RestMethod -Uri "$qdrantUrl/collections/pdf_rag" -Method Get
$info.result | ConvertTo-Json -Depth 5
