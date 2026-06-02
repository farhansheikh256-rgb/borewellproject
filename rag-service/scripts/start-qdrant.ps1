##############################################################
# Start Qdrant Standalone (No Docker Required)
#
# This script starts the Qdrant vector database from the
# local binary. Qdrant will be available at:
#   - REST API: http://localhost:6333
#   - Web UI:   http://localhost:6333/dashboard
#   - gRPC:     localhost:6334
#
# Press Ctrl+C to stop Qdrant.
##############################################################

$qdrantDir = Join-Path $PSScriptRoot "..\qdrant"
$qdrantExe = Join-Path $qdrantDir "qdrant.exe"

if (-not (Test-Path $qdrantExe)) {
    Write-Host "[ERROR] qdrant.exe not found at: $qdrantExe" -ForegroundColor Red
    Write-Host "Run the download script first or check the qdrant folder." -ForegroundColor Yellow
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Qdrant Vector Database" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  REST API:  http://localhost:6333" -ForegroundColor Green
Write-Host "  Web UI:    http://localhost:6333/dashboard" -ForegroundColor Green
Write-Host "  gRPC:      localhost:6334" -ForegroundColor Green
Write-Host ""
Write-Host "  Press Ctrl+C to stop" -ForegroundColor DarkGray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Run Qdrant from its directory so it finds the static folder
Push-Location $qdrantDir
try {
    & $qdrantExe
} finally {
    Pop-Location
}
