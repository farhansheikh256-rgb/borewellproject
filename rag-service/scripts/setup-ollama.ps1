##############################################################
# Ollama Model Setup Script
# Run this AFTER Ollama is installed and running.
#
# Models needed:
#   - nomic-embed-text  (768-dim embeddings, ~274MB)
#   - llama3.1:8b       (chat LLM, ~4.7GB)
#
# Alternative smaller models (if RAM is limited):
#   - gemma2:2b         (~1.6GB, faster but less capable)
#   - mistral           (~4.1GB, good balance)
##############################################################

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ollama Model Setup for PDF RAG" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Ollama is running
try {
    $response = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -Method Get -ErrorAction Stop
    Write-Host "[OK] Ollama is running" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Ollama is not running!" -ForegroundColor Red
    Write-Host "Please start Ollama first (open the Ollama app or run 'ollama serve')" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Pulling embedding model: nomic-embed-text ..." -ForegroundColor Yellow
ollama pull nomic-embed-text
Write-Host "[DONE] nomic-embed-text ready" -ForegroundColor Green

Write-Host ""
Write-Host "Pulling chat model: llama3.1:8b ..." -ForegroundColor Yellow
Write-Host "(This is ~4.7GB, may take a while)" -ForegroundColor DarkGray
ollama pull llama3.1:8b
Write-Host "[DONE] llama3.1:8b ready" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  All models installed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Installed models:" -ForegroundColor White
ollama list
