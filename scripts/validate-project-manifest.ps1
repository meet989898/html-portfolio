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

  if ($Value.StartsWith("#")) {
    return
  }

  $uri = $null
  if (-not [System.Uri]::TryCreate($Value, [System.UriKind]::Absolute, [ref]$uri)) {
    Fail "${ProjectTitle}: '$PropertyName' must be an absolute URL or an empty string."
  }
}

$allowedStatuses = @("live", "planned", "research")
$allowedPortfolioTags = @("ml", "retrieval", "backend", "data")
$requiredProperties = @(
  "title",
  "slug",
  "summary",
  "roleSignals",
  "techStack",
  "portfolioTags",
  "demoUrl",
  "repoUrl",
  "status",
  "metrics",
  "resumeBullets"
)

$schema = Get-Content $SchemaPath -Raw | ConvertFrom-Json
$projects = Get-Content $DataPath -Raw | ConvertFrom-Json

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
}

Write-Output "Validated $($projectList.Count) portfolio projects against $SchemaPath."
