'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const SKILLS_DIR = __dirname;
const SKILL_DIRS = ['clawpilot-pair', 'clawpilot-send', 'clawpilot-doctor', 'clawpilot-config'];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ── helpers ──────────────────────────────────────────────────────────────────

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(':');
    if (idx > -1) {
      meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  });
  return { meta, body: match[2] };
}

function loadSkills() {
  return SKILL_DIRS.map((dir) => {
    const file = path.join(SKILLS_DIR, dir, 'SKILL.md');
    if (!fs.existsSync(file)) return null;
    const raw = fs.readFileSync(file, 'utf8');
    const { meta, body } = parseFrontMatter(raw);
    return {
      id: dir,
      name: meta.name || dir,
      description: meta.description || '',
      body,
    };
  }).filter(Boolean);
}

// ── API routes ────────────────────────────────────────────────────────────────

// GET /api/skills  → list all skills (meta only)
app.get('/api/skills', (req, res) => {
  const skills = loadSkills().map(({ id, name, description }) => ({
    id,
    name,
    description,
  }));
  res.json({ ok: true, skills });
});

// GET /api/skills/:id  → full skill document
app.get('/api/skills/:id', (req, res) => {
  const skill = loadSkills().find((s) => s.id === req.params.id);
  if (!skill) return res.status(404).json({ ok: false, error: 'Skill not found' });
  res.json({ ok: true, skill });
});

// GET /api/health  → liveness probe
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, uptime: process.uptime(), port: PORT });
});

// ── SPA fallback ──────────────────────────────────────────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`ClawPilot Skills Dashboard running at http://0.0.0.0:${PORT}`);
  console.log(`  ┌─ Web UI  → http://localhost:${PORT}/`);
  console.log(`  ├─ Skills  → http://localhost:${PORT}/api/skills`);
  console.log(`  └─ Health  → http://localhost:${PORT}/api/health`);
});
