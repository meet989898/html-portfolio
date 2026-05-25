param(
  [string]$DataPath = "data/projects.json",
  [string]$SchemaPath = "portfolio.schema.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Fail([string]$Message) {
  throw $Message
}

function Assert-StringArray([object]$Value, [string]$PropertyName, [string]$ProjectTitle) {
  if ($Value -isnot [System.Collections.IEnumerable] -or $Value -is [string]) {
    Fail "${ProjectTitle}: '$PropertyName' must be an array of strings."
  }

  $items = @($Value)
  if ($items.Count -eq 0) {
    Fail "${ProjectTitle}: '$PropertyName' must not be empty."
  }

  foreach ($item in $items) {
    if ($item -isnot [string] -or [string]::IsNullOrWhiteSpace($item)) {
      Fail "${ProjectTitle}: '$PropertyName' contains an empty or non-string value."
    }
  }

  return $items
}

function Assert-OptionalUrl([string]$Value, [string]$PropertyName, [string]$ProjectTitle) {
  if ([string]::IsNullOrWhiteSpace($Value)) {
    return
  }

  $uri = $null
  if (-not [System.Uri]::TryCreate($Value, [System.UriKind]::Absolute, [ref]$uri)) {
    Fail "${ProjectTitle}: '$PropertyName' must be an HTTPS URL or an empty string."
  }

  if ($uri.Scheme -ne [System.Uri]::UriSchemeHttps) {
    Fail "${ProjectTitle}: '$PropertyName' must use HTTPS when provided."
  }
}

function Assert-VisualAsset([string]$Value, [string]$ProjectTitle, [string]$PublicRoot) {
  if ([string]::IsNullOrWhiteSpace($Value)) {
    Fail "${ProjectTitle}: visual 'src' must not be empty."
  }

  if (-not $Value.StartsWith("/")) {
    Fail "${ProjectTitle}: visual 'src' must start with '/'."
  }

  $relativePath = $Value.TrimStart("/") -replace "/", [System.IO.Path]::DirectorySeparatorChar
  $publicRootPath = [System.IO.Path]::GetFullPath($PublicRoot)
  $assetPath = [System.IO.Path]::GetFullPath((Join-Path $publicRootPath $relativePath))
  $normalizedPublicRoot = $publicRootPath.TrimEnd([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar

  if (-not $assetPath.StartsWith($normalizedPublicRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    Fail "${ProjectTitle}: visual 'src' must stay within the public directory."
  }

  if (-not (Test-Path -LiteralPath $assetPath -PathType Leaf)) {
    Fail "${ProjectTitle}: visual 'src' points to a missing asset '$Value'."
  }
}

$allowedStatuses = @("live", "building", "planned", "research")
$allowedPortfolioTags = @("ai", "ml", "data", "backend", "frontend", "research")
$allowedVisualTypes = @("concept", "screenshot")
$requiredProperties = @(
  "title",
  "slug",
  "subtitle",
  "cardStatus",
  "status",
  "statusLabel",
  "featuredOrder",
  "summary",
  "longSummary",
  "roleSignals",
  "techStack",
  "portfolioTags",
  "demoUrl",
  "repoUrl",
  "metrics",
  "resumeBullets",
  "visual",
  "caseStudy"
)

$schema = Get-Content $SchemaPath -Raw | ConvertFrom-Json
$projects = Get-Content $DataPath -Raw | ConvertFrom-Json
$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$publicRoot = Join-Path $repoRoot "public"

if ($schema.type -ne "array") {
  Fail "Schema root type must be 'array'."
}

if ($projects -isnot [System.Collections.IEnumerable] -or $projects -is [string]) {
  Fail "Project manifest data must be a JSON array."
}

$projectList = @($projects)
if ($projectList.Count -eq 0) {
  Fail "Project manifest data must contain at least one project."
}

$seenSlugs = @{}
$seenFeaturedOrders = @{}

foreach ($project in $projectList) {
  foreach ($property in $requiredProperties) {
    if (-not ($project.PSObject.Properties.Name -contains $property)) {
      Fail "Project entry is missing required property '$property'."
    }
  }

  if ([string]::IsNullOrWhiteSpace($project.title)) {
    Fail "Project title must not be empty."
  }

  if ([string]::IsNullOrWhiteSpace($project.slug)) {
    Fail "$($project.title): 'slug' must not be empty."
  }

  if ($seenSlugs.ContainsKey($project.slug)) {
    Fail "$($project.title): duplicate slug '$($project.slug)'."
  }
  $seenSlugs[$project.slug] = $true

  if ([string]::IsNullOrWhiteSpace($project.summary)) {
    Fail "$($project.title): 'summary' must not be empty."
  }

  if ([string]::IsNullOrWhiteSpace($project.longSummary)) {
    Fail "$($project.title): 'longSummary' must not be empty."
  }

  if ([string]::IsNullOrWhiteSpace($project.subtitle)) {
    Fail "$($project.title): 'subtitle' must not be empty."
  }

  if ([string]::IsNullOrWhiteSpace($project.cardStatus)) {
    Fail "$($project.title): 'cardStatus' must not be empty."
  }

  if ([string]::IsNullOrWhiteSpace($project.statusLabel)) {
    Fail "$($project.title): 'statusLabel' must not be empty."
  }

  if ($project.featuredOrder -isnot [int] -and $project.featuredOrder -isnot [long]) {
    Fail "$($project.title): 'featuredOrder' must be an integer."
  }

  if ($seenFeaturedOrders.ContainsKey($project.featuredOrder)) {
    Fail "$($project.title): duplicate featuredOrder '$($project.featuredOrder)'."
  }
  $seenFeaturedOrders[$project.featuredOrder] = $true

  $null = Assert-StringArray $project.roleSignals "roleSignals" $project.title
  $null = Assert-StringArray $project.techStack "techStack" $project.title
  $portfolioTags = Assert-StringArray $project.portfolioTags "portfolioTags" $project.title
  $null = Assert-StringArray $project.metrics "metrics" $project.title
  $null = Assert-StringArray $project.resumeBullets "resumeBullets" $project.title

  foreach ($tag in $portfolioTags) {
    if ($tag -notin $allowedPortfolioTags) {
      Fail "$($project.title): unsupported portfolio tag '$tag'. Allowed tags: $($allowedPortfolioTags -join ', ')."
    }
  }

  if ($project.status -notin $allowedStatuses) {
    Fail "$($project.title): unsupported status '$($project.status)'. Allowed statuses: $($allowedStatuses -join ', ')."
  }

  Assert-OptionalUrl $project.demoUrl "demoUrl" $project.title
  Assert-OptionalUrl $project.repoUrl "repoUrl" $project.title

  if ($null -eq $project.visual) {
    Fail "$($project.title): 'visual' must be present."
  }
  foreach ($property in @("src", "alt", "type", "caption")) {
    if (-not ($project.visual.PSObject.Properties.Name -contains $property) -or [string]::IsNullOrWhiteSpace($project.visual.$property)) {
      Fail "$($project.title): visual '$property' must not be empty."
    }
  }
  Assert-VisualAsset $project.visual.src $project.title $publicRoot
  if ($project.visual.type -notin $allowedVisualTypes) {
    Fail "$($project.title): unsupported visual type '$($project.visual.type)'."
  }

  if ($null -eq $project.caseStudy) {
    Fail "$($project.title): 'caseStudy' must be present."
  }
  if ([string]::IsNullOrWhiteSpace($project.caseStudy.problem)) {
    Fail "$($project.title): caseStudy 'problem' must not be empty."
  }
  $null = Assert-StringArray $project.caseStudy.approach "caseStudy.approach" $project.title
  $null = Assert-StringArray $project.caseStudy.outcome "caseStudy.outcome" $project.title
}

Write-Output "Validated $($projectList.Count) portfolio projects against $SchemaPath."
