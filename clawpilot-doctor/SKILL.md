---
name: clawpilot-doctor
description: Use when the user wants to diagnose or repair ClawPilot or OpenClaw host issues, including status checks, logs, restart, update, and self-repair. Focus on the concrete blocking issue and the next corrective action.
---

# ClawPilot Doctor

> **Entry Points:** `clawpilot status` · `clawpilot restart`
> **Checks:** OpenClaw Gateway (`:3000`) · Hermes Gateway (`:4000`)
> **Related Skills:** [`clawpilot-config`](../clawpilot-config/SKILL.md) · [`clawpilot-pair`](../clawpilot-pair/SKILL.md)

Use this skill for ClawPilot and OpenClaw / Hermes host troubleshooting.

## When To Use

Use this skill when the user asks to:

- Check ClawPilot or Gateway status
- Read logs
- Restart the Gateway
- Update OpenClaw or Hermes
- Run repair or diagnostics

Do not use this skill to generate a pairing code or send files back to PocketClaw.

## Preferred Actions

Use the smallest action that answers the question or fixes the issue:

| Action | Command |
|--------|---------|
| Status check | `clawpilot status` |
| Restart gateway | `clawpilot restart` |
| Hermes gateway status | `hermes gateway status` |
| Host commands | Commands already exposed through the current OpenClaw or relay setup |
| Self-repair | Confirmed repair commands such as OpenClaw self-repair paths |

## Diagnostic Flow

```
clawpilot status
    ├── ✅ All OK → report to user
    └── ❌ Failure detected
            ├── Gateway unreachable → clawpilot restart
            ├── Auth failure → hand off to clawpilot-config
            └── Service missing → hermes gateway install && hermes gateway start
```

## Output Rules

- Report what you checked.
- Report what failed or passed.
- If blocked, give the next command to run.
- Keep the result concrete and operational, not theoretical.

## Do Not

- Do not jump into pairing unless the user explicitly wants pairing.
- Do not modify unrelated config when a status or log check is enough.
- Do not claim a repair is complete without verifying the result.
