---
name: GitHub connector upload limit
description: Cloudflare can block repeated GitHub repository write requests through the connected GitHub proxy.
---

The connected GitHub proxy may return an HTML Cloudflare 403 for large inline Git Tree or GraphQL commit payloads, while reads and small writes still succeed. Reducing one large tree into medium inline-content batches may remain blocked.

**Why:** A repository source upload encountered this behavior after the initial repository creation and partial asset upload; retrying blobs, Contents writes, and Tree writes did not restore code uploads.

**How to apply:** Compare local and remote Git blob SHAs first. Upload each differing file with the Git Data blob endpoint using base64, then create one small SHA-only tree and commit it. This avoids inline source payloads that trigger Cloudflare. Never assume the 403 means missing GitHub permissions or exhausted API quota.

When the local HTTPS remote rejects `git push` for missing credentials but the Replit GitHub connection is authorized, use the connected GitHub API to create blobs, a tree, and one commit, then advance the branch ref without asking the user for a token.

**Why:** The workspace remote may not inherit the authorized Replit connector session, while the connector can still write to the same repository securely.

**How to apply:** Verify the remote branch SHA first, compare Git blob SHAs, upload only changed files, create a tree with the remote tree as its base, and update the ref with `force: false`.