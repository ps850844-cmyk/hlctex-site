$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$workbookPath = Join-Path $repoRoot "outputs\product-import\HLC_Product_Import.xlsx"
$requirementsPath = Join-Path $PSScriptRoot "requirements.txt"
$importerPath = Join-Path $PSScriptRoot "import_products.py"

if (-not (Test-Path -LiteralPath $workbookPath)) {
    throw "Product workbook not found: $workbookPath"
}

$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$pythonCommand = $null
if (Test-Path -LiteralPath $bundledPython) {
    $pythonCommand = $bundledPython
} else {
    $python = Get-Command py -ErrorAction SilentlyContinue
    if (-not $python) {
        $python = Get-Command python -ErrorAction SilentlyContinue
    }
    if ($python) {
        $pythonCommand = $python.Source
    }
}

if (-not $pythonCommand) {
    throw "Python 3 was not found. Install Python 3 or ask Codex to run the import."
}

$dependencyDir = Join-Path $PSScriptRoot ".python-deps"
New-Item -ItemType Directory -Force -Path $dependencyDir | Out-Null

$previousPythonPath = $env:PYTHONPATH
$env:PYTHONPATH = $dependencyDir
& $pythonCommand -c "import openpyxl, bs4" 2>$null
if ($LASTEXITCODE -ne 0) {
    & $pythonCommand -m pip install --quiet --disable-pip-version-check --target $dependencyDir -r $requirementsPath
    if ($LASTEXITCODE -ne 0) {
        $env:PYTHONPATH = $previousPythonPath
        throw "Dependency installation failed."
    }
}

& $pythonCommand $importerPath --workbook $workbookPath --repo $repoRoot
$env:PYTHONPATH = $previousPythonPath
if ($LASTEXITCODE -ne 0) {
    throw "Product import failed. Correct the workbook using the validation messages above."
}

Write-Host ""
Write-Host "Product pages are ready. Review the Git changes, then commit and push." -ForegroundColor Green
