---
name: Artifact publish command
description: Production publish candidates can crash after a successful build when the runtime command is missing or reduced to bare npm.
---

Artifact-based publishing separates the build result from the production process that promotes it. A candidate that logs npm's generic help output is being started with an empty or stale run command, not failing because the frontend bundle is invalid. In this workspace, different publish stages may probe `/`, `/api`, or `/api/healthz` even when the artifact declares a specific startup health path.

**Why:** The last known-good deployment can continue serving HTTP 200 while a newer candidate is rejected during its crash-loop health check.

**How to apply:** Check the artifact's production settings and the publishing configuration separately. Keep unauthenticated, dependency-free 200 responses at `/`, `/api`, and `/api/healthz`; confirm the Node production entrypoint on the publish port and static web serving independently.