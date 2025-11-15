# Claude Desktop MCP Configuration Generator

Write-Host "[SETUP] Generating Claude Desktop MCP Configuration..." -ForegroundColor Cyan

# Read environment variables
$envPath = "C:\Users\Cedric\digital-twin-workshop\digital-twin-mcp\.env.local"

if (!(Test-Path $envPath)) {
    Write-Host "[ERROR] .env.local file not found!" -ForegroundColor Red
    Write-Host "Please create .env.local with your API keys first." -ForegroundColor Yellow
    exit 1
}

# Read .env.local
$envVars = @{}
Get-Content $envPath | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        # Remove quotes if present
        $value = $value.Trim('"')
        $envVars[$key] = $value
    }
}

# Check required variables
$required = @("UPSTASH_VECTOR_REST_URL", "UPSTASH_VECTOR_REST_TOKEN", "GROQ_API_KEY")
$missing = @()

foreach ($var in $required) {
    if (!$envVars.ContainsKey($var)) {
        $missing += $var
    }
}

if ($missing.Count -gt 0) {
    Write-Host "[ERROR] Missing required environment variables:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
    exit 1
}

# Generate config
$config = @{
    mcpServers = @{
        "digital-twin" = @{
            command = "node"
            args = @("C:\Users\Cedric\digital-twin-workshop\digital-twin-mcp\mcp-stdio-server.js")
            env = @{
                UPSTASH_VECTOR_REST_URL = $envVars["UPSTASH_VECTOR_REST_URL"]
                UPSTASH_VECTOR_REST_TOKEN = $envVars["UPSTASH_VECTOR_REST_TOKEN"]
                GROQ_API_KEY = $envVars["GROQ_API_KEY"]
            }
        }
    }
}

# Convert to JSON
$jsonConfig = $config | ConvertTo-Json -Depth 10

# Claude Desktop config path
$claudeConfigDir = "$env:APPDATA\Claude"
$claudeConfigPath = "$claudeConfigDir\claude_desktop_config.json"

# Create directory if it doesn't exist
if (!(Test-Path $claudeConfigDir)) {
    New-Item -ItemType Directory -Path $claudeConfigDir -Force | Out-Null
}

# Backup existing config
if (Test-Path $claudeConfigPath) {
    $backupPath = "$claudeConfigPath.backup"
    Copy-Item $claudeConfigPath $backupPath -Force
    Write-Host "[BACKUP] Backed up existing config to: $backupPath" -ForegroundColor Yellow
}

# Write new config
$jsonConfig | Out-File -FilePath $claudeConfigPath -Encoding UTF8

Write-Host ""
Write-Host "[SUCCESS] Successfully created Claude Desktop MCP configuration!" -ForegroundColor Green
Write-Host ""
Write-Host "Configuration file:" -ForegroundColor Cyan
Write-Host "  $claudeConfigPath" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Restart Claude Desktop completely" -ForegroundColor White
Write-Host "  2. Look for a plug icon in the input box" -ForegroundColor White
Write-Host "  3. You should see 'digital-twin' server available" -ForegroundColor White
Write-Host "  4. Ask Claude: What are Cedric's technical skills?" -ForegroundColor White
Write-Host ""
Write-Host "Available MCP Tools:" -ForegroundColor Cyan
Write-Host "  - query_digital_twin (Ask questions about professional background)" -ForegroundColor White
Write-Host "  - search_vector_db (Direct vector search)" -ForegroundColor White
Write-Host "  - get_profile_sections (Get specific profile sections)" -ForegroundColor White
