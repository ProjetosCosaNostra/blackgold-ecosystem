param(
    [string]$Id,
    [string]$Title,
    [ValidateSet('software','app','publication','service','game','site')]
    [string]$Kind = 'software',
    [ValidateSet('live','published','launching','coming_soon')]
    [string]$Status = 'coming_soon',
    [string]$Kicker = 'NOVO ATIVO',
    [string]$Summary,
    [string]$Url = '',
    [int]$Priority = 50,
    [switch]$NoPush
)

$ErrorActionPreference = 'Stop'
$Root = 'E:\BlackGold_Ecosystem'
$JsonPath = Join-Path $Root 'public\data\content.json'

if (-not $Id) { $Id = Read-Host 'ID curto do ativo (ex: meu-novo-app)' }
if (-not $Title) { $Title = Read-Host 'Nome do ativo' }
if (-not $Summary) { $Summary = Read-Host 'Resumo do ativo' }

$Data = Get-Content -LiteralPath $JsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

if (@($Data.assets | Where-Object { $_.id -eq $Id }).Count -gt 0) {
    throw "Ja existe um ativo com ID: $Id"
}

$New = [ordered]@{
    id = $Id
    kind = $Kind
    status = $Status
    priority = $Priority
    title = $Title
    kicker = $Kicker
    summary = $Summary
    url = if ($Url) { $Url } else { $null }
    cta = if ($Url) { 'Conhecer' } else { 'Em breve' }
}

$List = New-Object System.Collections.Generic.List[object]
foreach ($Item in @($Data.assets)) { $List.Add($Item) }
$List.Add([pscustomobject]$New)

$Data.assets = $List
$Data.version = [int]$Data.version + 1
$Data.last_updated = Get-Date -Format 'yyyy-MM-dd'

$Json = $Data | ConvertTo-Json -Depth 20
[System.IO.File]::WriteAllText($JsonPath,$Json,(New-Object System.Text.UTF8Encoding($false)))

& git.exe -C $Root add -- 'public/data/content.json'
if ($LASTEXITCODE -ne 0) { throw 'git add falhou' }

& git.exe -C $Root commit -m "content: add asset $Id"
if ($LASTEXITCODE -ne 0) { throw 'git commit falhou' }

if (-not $NoPush) {
    & git.exe -C $Root push origin main
    if ($LASTEXITCODE -ne 0) { throw 'git push falhou' }
}

Write-Host ''
Write-Host "NOVO ATIVO ADICIONADO: $Title" -ForegroundColor Green
Write-Host ''