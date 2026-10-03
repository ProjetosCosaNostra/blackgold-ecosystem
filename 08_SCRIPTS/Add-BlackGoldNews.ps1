param(
    [string]$Title,
    [string]$Summary,
    [string]$Category = 'Novidade',
    [string]$AssetId = '',
    [string]$Date = (Get-Date -Format 'yyyy-MM-dd'),
    [switch]$NoPush
)

$ErrorActionPreference = 'Stop'
$Root = 'E:\BlackGold_Ecosystem'
$JsonPath = Join-Path $Root 'public\data\content.json'

if (-not $Title) { $Title = Read-Host 'Titulo da novidade' }
if (-not $Summary) { $Summary = Read-Host 'Resumo da novidade' }
if (-not $Category) { $Category = Read-Host 'Categoria' }
if (-not $AssetId) { $AssetId = Read-Host 'Asset ID relacionado (opcional)' }

$Data = Get-Content -LiteralPath $JsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

$Slug = (($Title.ToLowerInvariant() -replace '[^a-z0-9]+','-').Trim('-'))
if (-not $Slug) { $Slug = [Guid]::NewGuid().ToString('N').Substring(0,10) }

$News = [ordered]@{
    id = "news-$($Date.Replace('-',''))-$Slug"
    date = $Date
    category = $Category
    title = $Title
    summary = $Summary
    asset_id = if ($AssetId) { $AssetId } else { $null }
}

$List = New-Object System.Collections.Generic.List[object]
$List.Add([pscustomobject]$News)
foreach ($Item in @($Data.news)) { $List.Add($Item) }

$Data.news = $List
$Data.version = [int]$Data.version + 1
$Data.last_updated = $Date

$Json = $Data | ConvertTo-Json -Depth 20
[System.IO.File]::WriteAllText($JsonPath,$Json,(New-Object System.Text.UTF8Encoding($false)))

& git.exe -C $Root add -- 'public/data/content.json'
if ($LASTEXITCODE -ne 0) { throw 'git add falhou' }

& git.exe -C $Root commit -m "content: add portal news - $Title"
if ($LASTEXITCODE -ne 0) { throw 'git commit falhou' }

if (-not $NoPush) {
    & git.exe -C $Root push origin main
    if ($LASTEXITCODE -ne 0) { throw 'git push falhou' }
}

Write-Host ''
Write-Host 'NOVIDADE PUBLICADA NO PORTAL.' -ForegroundColor Green
Write-Host "Titulo: $Title"
Write-Host "Data  : $Date"
Write-Host ''