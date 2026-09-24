$ErrorActionPreference = 'Stop'

$envFile = Join-Path $PSScriptRoot '.env'

function Get-DotEnvValue([string]$key) {
    $line = Get-Content $envFile | Where-Object { $_ -match "^$key=" } | Select-Object -First 1
    if ($null -eq $line) { return $null }
    return $line.Substring($key.Length + 1)
}

$POSTGRES_USER = Get-DotEnvValue 'POSTGRES_USER'
$POSTGRES_DB   = Get-DotEnvValue 'POSTGRES_DB'

if (-not $POSTGRES_USER -or -not $POSTGRES_DB) {
    throw 'POSTGRES_USER / POSTGRES_DB not found in .env'
}

Write-Host "Truncating tables in db '$POSTGRES_DB' (user '$POSTGRES_USER')..." -ForegroundColor Yellow

docker exec 69-s1-db psql -U $POSTGRES_USER -d $POSTGRES_DB -c "TRUNCATE students, subjects, teachers RESTART IDENTITY CASCADE;"

Write-Host 'Done. database is clean - try api.http section 3 again.' -ForegroundColor Green