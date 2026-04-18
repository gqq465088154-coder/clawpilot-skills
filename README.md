# ClawPilot Skills

This repository contains a ClawPilot skill suite for PocketClaw and OpenClaw host operations, plus a full-site dashboard for visualization and management.

## 🚀 Quick Start

```bash
npm install
npm start
```

Then open **http://localhost:3000** in your browser.

### Docker

```bash
docker compose up -d
```

---

## 🚪 Port Entrances

| Port | Path | Description |
|------|------|-------------|
| 3000 | `http://localhost:3000/` | Web 仪表盘（全站可视化） |
| 3000 | `http://localhost:3000/api/skills` | Skills REST API |
| 3000 | `http://localhost:3000/api/skills/:id` | 单项技能详情 API |
| 3000 | `http://localhost:3000/api/health` | Health / 存活检查 |

---

## Included Skills

- `clawpilot-pair`
  Install or upgrade ClawPilot, verify OpenClaw gateway auth, and generate a PocketClaw pairing code.

- `clawpilot-send`
  Send a local or generated file back to PocketClaw with:

  ```bash
  clawpilot send "/absolute/path/to/file"
  ```

- `clawpilot-doctor`
  Diagnose or repair ClawPilot / OpenClaw host issues such as status, logs, restart, update, and self-repair.

- `clawpilot-config`
  Inspect or minimally fix configuration required for pairing and auth.

## Layout

```
.
├── server.js                  # Express API + static server
├── public/index.html          # Full-site dashboard UI
├── Dockerfile                 # Container build
├── docker-compose.yml         # One-command deployment
├── package.json
├── clawpilot-pair/SKILL.md
├── clawpilot-send/SKILL.md
├── clawpilot-doctor/SKILL.md
└── clawpilot-config/SKILL.md
```
