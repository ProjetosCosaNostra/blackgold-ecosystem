param(
    [string]$AssetId,
    [switch]$NoPush
)

$ErrorActionPreference = 'Stop'
$Root = 'E:\BlackGold_Ecosystem'
$JsonPath = Join-Path $Root 'docs\data\content.json'

$Data = Get-Content -LiteralPath $JsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

if (-not $AssetId) {
    Write-Host ''
    Write-Host 'Assets disponiveis:' -ForegroundColor Cyan
    foreach ($Asset in $Data.assets) {
        Write-Host " - $($Asset.id) :: $($Asset.title)"
    }
    Write-Host ''
    $AssetId = Read-Host 'Digite o AssetId que deve ficar em destaque'
}

$Found = @($Data.assets | Where-Object { $_.id -eq $AssetId })
if ($Found.Count -ne 1) {
    throw "AssetId invalido: $AssetId"
}

$Data.featured_asset_id = $AssetId
$Data.version = [int]$Data.version + 1
$Data.last_updated = Get-Date -Format 'yyyy-MM-dd'

$Json = $Data | ConvertTo-Json -Depth 20
[System.IO.File]::WriteAllText($JsonPath,$Json,(New-Object System.Text.UTF8Encoding($false)))

& git.exe -C $Root add -- 'public/data/content.json'
if ($LASTEXITCODE -ne 0) { throw 'git add falhou' }

& git.exe -C $Root commit -m "content: feature $AssetId"
if ($LASTEXITCODE -ne 0) { throw 'git commit falhou' }

if (-not $NoPush) {
    & git.exe -C $Root push origin main
    if ($LASTEXITCODE -ne 0) { throw 'git push falhou' }
}

Write-Host ''
Write-Host "DESTAQUE ALTERADO PARA: $AssetId" -ForegroundColor Green
Write-Host ''