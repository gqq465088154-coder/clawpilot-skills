# ClawPilot Skills

A skill suite for **PocketClaw** and **OpenClaw / Hermes** host operations.

> **[📊 Open Visual Dashboard](docs/index.html)** — interactive overview of all skills, architecture, ports, and deployment commands.

## Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌────────────────────────────┐     ┌────────────────────┐
│  PocketClaw │ ──▶ │  ClawPilot CLI   │ ──▶ │     Skills Layer           │ ──▶ │   Host Runtimes    │
│  (Mobile)   │     │  pair·send·      │     │ pair│send│doctor│config    │     │ OpenClaw  :3000    │
│             │     │  status·restart   │     │                            │     │ Hermes    :4000    │
└─────────────┘     └──────────────────┘     └────────────────────────────┘     └────────────────────┘
```

## Included Skills

| Skill | Entry Point | Description |
|-------|-------------|-------------|
| **clawpilot-pair** | `clawpilot pair --runtime <openclaw|hermes>` | Install / upgrade ClawPilot, verify host runtime readiness, generate a PocketClaw pairing code |
| **clawpilot-send** | `clawpilot send "/absolute/path/to/file"` | Send a local or generated file back to PocketClaw mobile (≤ 20 MB) |
| **clawpilot-doctor** | `clawpilot status` · `clawpilot restart` | Diagnose and repair ClawPilot / OpenClaw host issues: status, logs, restart, update, self-repair |
| **clawpilot-config** | `~/.config/openclaw/config.yaml` | Inspect and minimally fix gateway configuration (token, password, env vars) |

## Port & Entry-Point Reference

| Service | Address / Command | Runtime | Notes |
|---------|-------------------|---------|-------|
| OpenClaw Gateway | `http://localhost:3000` | OpenClaw | Main gateway API and pairing endpoint |
| Hermes Gateway | `http://localhost:4000` | Hermes | Main gateway API and pairing endpoint |
| `clawpilot pair` | `clawpilot pair --runtime <runtime>` | Both | Generates PocketClaw pairing code (requires gateway reachability) |
| `clawpilot send` | `clawpilot send "/path/to/file"` | Both | File delivery to PocketClaw mobile (≤ 20 MB) |
| `clawpilot status` | `clawpilot status` | Both | Health check for ClawPilot and gateway |
| `clawpilot restart` | `clawpilot restart` | Both | Restart the gateway service |
| Hermes Gateway Setup | `hermes gateway install && hermes gateway start` | Hermes | Initial Hermes gateway installation and startup |
| OpenClaw Config | `~/.config/openclaw/config.yaml` | OpenClaw | Gateway token, password, and env var settings |

## Quick Start

```bash
# 1. Install ClawPilot CLI
npm install -g @rethinkingstudio/clawpilot@latest

# 2. Pair with a runtime
clawpilot pair --runtime openclaw   # or hermes

# 3. Verify status
clawpilot status

# 4. Send a file to PocketClaw
clawpilot send "/absolute/path/to/file.pdf"
```

## Layout

```
clawpilot-skills/
├── README.md
├── docs/
│   └── index.html          ← Visual dashboard
├── clawpilot-pair/
│   └── SKILL.md             ← Pairing skill definition
├── clawpilot-send/
│   └── SKILL.md             ← File-send skill definition
├── clawpilot-doctor/
│   └── SKILL.md             ← Diagnostics skill definition
└── clawpilot-config/
    └── SKILL.md             ← Configuration skill definition
```

## Skill Cross-Reference

| Scenario | Primary Skill | Fallback |
|----------|---------------|----------|
| First-time pairing | `clawpilot-pair` | — |
| Send file to mobile | `clawpilot-send` | — |
| Gateway unreachable | `clawpilot-doctor` | → `clawpilot-config` |
| Auth failure | `clawpilot-config` | — |
| Upgrade ClawPilot | `clawpilot-pair` | — |
| Hermes not installed | `clawpilot-pair` | → `clawpilot-doctor` |
