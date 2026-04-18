---
name: clawpilot-pair
description: Use when the user wants to pair PocketClaw, install or upgrade ClawPilot, verify host runtime readiness, and generate a pairing code for OpenClaw or Hermes. Follow a strict pairing workflow and output the final pairing code on its own line when successful.
---

# ClawPilot Pair

> **Entry Point:** `clawpilot pair --runtime <openclaw|hermes>`
> **Depends On:** OpenClaw Gateway (`:3000`) or Hermes Gateway (`:4000`)
> **Related Skills:** [`clawpilot-config`](../clawpilot-config/SKILL.md) · [`clawpilot-doctor`](../clawpilot-doctor/SKILL.md)

Use this skill for PocketClaw pairing and first-time host setup.

## When To Use

Use this skill when the user wants any of the following:

- Pair PocketClaw with the current host
- Install or upgrade `clawpilot`
- Check whether the host is ready for pairing
- Generate a new pairing code

Do not use this skill for normal chat replies, file delivery, or general diagnostics unrelated to pairing.

## Required Workflow

Follow this order exactly. Do not skip checks.

### Step 1 — Install or Upgrade ClawPilot

```bash
npm install -g @rethinkingstudio/clawpilot@latest
```

### Step 2 — Determine Target Runtime

- Use `openclaw` or `hermes`.
- If the user does not specify and the host only has one runtime, use that runtime.
- If both runtimes are available and the user did not specify, ask which runtime to pair.

### Step 3 — Runtime Readiness Checks

**For `openclaw`:**
- Verify OpenClaw config can be found.
- Verify gateway auth is usable.
- Verify the local gateway is reachable at `http://localhost:3000`.
- If auth or gateway reachability fails, stop and report the blocking step with the next command or config fix.
- → Hand off to [`clawpilot-config`](../clawpilot-config/SKILL.md) if the config is the blocker.

**For `hermes`:**
- Verify the `hermes` CLI exists.
- Verify `hermes gateway status` works.
- If the gateway service is not installed, tell the user to run:

```bash
hermes gateway install
hermes gateway start
```

- If Hermes API readiness fails (`http://localhost:4000`), report the exact blocking step and the next command to run.

### Step 4 — Generate Pairing Code

Only after readiness checks pass:

```bash
clawpilot pair --runtime openclaw
```

or

```bash
clawpilot pair --runtime hermes
```

Notes:
- `clawpilot pair --runtime hermes` will prepare the local Hermes API automatically if possible.
- Use `--code-only` only when the user explicitly wants the code without QR output.

## Output Rules

- If successful, put the final pairing code on its own line.
- Keep explanations brief and action-oriented.
- If blocked, say what failed, what was checked, and the next command or config change needed.

## Do Not

- Do not invent ClawPilot flags or unsupported commands.
- Do not skip runtime readiness checks and jump straight to pairing.
- Do not return a vague failure such as "configuration error" without naming the missing item.
- Do not force OpenClaw-specific checks when the user is pairing Hermes.
- Do not modify unrelated host settings.
