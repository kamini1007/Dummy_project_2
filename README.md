# Demo projects for Scanner Findings

4 small, self-contained projects, each with 1-2 deliberately outdated
dependencies carrying real, well-documented CVEs. Built for offline local-
path scanning specifically because your network has had trouble reaching
GitHub reliably earlier in this conversation - no network access needed for
these, just Trivy scanning a local folder.

**Honesty note**: I don't have the ability to actually run Trivy in this
sandbox to verify these get flagged (no network access here either). The
CVEs below are chosen because they're exceptionally well-known and
long-established in every vulnerability database - not obscure or
recently-published ones - so confidence is high, but this hasn't been
executed and confirmed end-to-end.

## What's in each one

| Project | Ecosystem | Vulnerable dependency | CVE |
|---|---|---|---|
| `node-frontend-app` | npm | lodash 4.17.15 | CVE-2020-8203 (prototype pollution) |
| `node-frontend-app` | npm | minimist 0.0.8 | CVE-2020-7598 (prototype pollution) |
| `python-ml-service` | pip | PyYAML 5.1 | CVE-2019-20477 / CVE-2020-1747 |
| `python-ml-service` | pip | Jinja2 2.10 | CVE-2019-10906 (sandbox escape) |
| `java-legacy-service` | maven | log4j-core 2.14.1 | **CVE-2021-44228 - Log4Shell** |
| `java-legacy-service` | maven | commons-collections 3.2.1 | CVE-2015-6420 (deserialization RCE) |
| `node-api-gateway` | npm | axios 0.21.0 | CVE-2020-28168 (SSRF) |

`java-legacy-service` is worth leading your demo with - Log4Shell is about
as recognizable as a CVE gets, and immediately signals "this platform finds
real, serious things," not just noise.

## How to use these

**1. Extract this zip** anywhere on your machine, e.g.
`D:\demo-vuln-projects\`.

**2. In the dashboard's Scanner Findings page**, use the "local path" field
(not the GitHub URL one) and point it at each project folder in turn:

```
Project name: node-frontend-app
Source: D:\demo-vuln-projects\node-frontend-app

Project name: python-ml-service
Source: D:\demo-vuln-projects\python-ml-service

Project name: java-legacy-service
Source: D:\demo-vuln-projects\java-legacy-service

Project name: node-api-gateway
Source: D:\demo-vuln-projects\node-api-gateway
```

**3. Or trigger all four from PowerShell directly**, if you'd rather script
it than click through the form:

```powershell
$projects = @(
  @{ name = "node-frontend-app";   path = "D:\demo-vuln-projects\node-frontend-app" },
  @{ name = "python-ml-service";   path = "D:\demo-vuln-projects\python-ml-service" },
  @{ name = "java-legacy-service"; path = "D:\demo-vuln-projects\java-legacy-service" },
  @{ name = "node-api-gateway";    path = "D:\demo-vuln-projects\node-api-gateway" }
)

foreach ($p in $projects) {
  $body = @{ projectName = $p.name; source = $p.path } | ConvertTo-Json
  Invoke-RestMethod -Method Post `
    -Uri "http://localhost:8080/api/ingestion/scanner-findings/scan" `
    -ContentType "application/json" -Body $body
}
```

Each scan runs Trivy against a local path, so it should be fast (a few
seconds per project, no cloning involved) - unlike the GitHub URL mode,
which depends on network access and can take a couple of minutes.

## After scanning

These CVEs will flow through the exact same pipeline as everything else -
check the Scanner Findings page for the raw list immediately, then trigger
analysis and risk scoring to see them get AI-explained and prioritized like
any other CVE in the system.
