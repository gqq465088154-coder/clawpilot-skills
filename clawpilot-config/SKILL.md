---
name: clawpilot-config
description: Use when the user needs help locating, validating, or minimally fixing ClawPilot or OpenClaw gateway configuration required for pairing, auth, or host-side operations. Explain exactly what is missing and the most direct fix.
---

# ClawPilot Config

> **Config Path:** `~/.config/openclaw/config.yaml`
> **Key Fields:** `gateway_token` · `gateway_password` · `OPENCLAW_TOKEN` (env)
> **Related Skills:** [`clawpilot-pair`](../clawpilot-pair/SKILL.md) · [`clawpilot-doctor`](../clawpilot-doctor/SKILL.md)

Use this skill for ClawPilot and OpenClaw configuration inspection and minimal correction.

## When To Use

Use this skill when the user needs to:

- Find the relevant OpenClaw config file
- Validate gateway token or password settings
- Validate referenced environment variables
- Understand why pairing or host-side operations cannot authenticate

Do not use this skill for file delivery or general diagnostics when configuration is not the actual issue.

## Workflow

### Step 1 — Locate Config

```bash
ls ~/.config/openclaw/config.yaml
```

### Step 2 — Inspect Auth Fields

Check only auth-related fields:

| Field | Type | Required |
|-------|------|----------|
| `gateway_token` | string | Yes (if no password) |
| `gateway_password` | string | Yes (if no token) |
| `OPENCLAW_TOKEN` | env var | Referenced in config |

### Step 3 — Verify Environment Variables

If auth is provided via environment variable references, verify the referenced variables exist:

```bash
echo $OPENCLAW_TOKEN
```

### Step 4 — Report & Fix

- Explain exactly what is missing or misconfigured.
- If the fix is obvious and low-risk, propose the minimal change.

## Output Rules

- Name the exact missing field, file, or environment variable.
- Prefer the shortest direct fix.
- If multiple fixes are possible, recommend one and explain why.

## Do Not

- Do not rewrite unrelated config sections.
- Do not say "config is wrong" without naming the specific field or variable.
- Do not proceed as if auth is valid when it is only referenced but not actually present in the environment.
