import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, postsTable } from "@workspace/db";
import { getAdminSession, requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "").slice(0, 90) || "bai-viet";
}

function normalizePostBody(body: unknown): {
  title: string; thumbnailUrl: string | null; excerpt: string; content: string; status: "draft" | "published";
} | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  const excerpt = typeof raw.excerpt === "string" ? raw.excerpt.trim() : "";
  const content = typeof raw.content === "string" ? raw.content.trim() : "";
  const thumbnailUrl = raw.thumbnailUrl === null || raw.thumbnailUrl === undefined || raw.thumbnailUrl === ""
    ? null
    : typeof raw.thumbnailUrl === "string" ? raw.thumbnailUrl.trim() : null;
  const status = raw.status === "published" ? "published" : "draft";
  if (title.length < 3 || title.length > 180 || excerpt.length > 500 || content.length < 1 || content.length > 200_000) return null;
  return { title, thumbnailUrl, excerpt, content, status };
}

async function uniqueSlug(title: string, exceptId?: number): Promise<string> {
  const base = slugify(title);
  let slug = base;
  let suffix = 2;
  while (true) {
    const rows = await db.select({ id: postsTable.id }).from(postsTable).where(eq(postsTable.slug, slug)).limit(1);
    if (!rows[0] || rows[0].id === exceptId) return slug;
    slug = `${base}-${suffix++}`;
  }
}

function serialize(post: typeof postsTable.$inferSelect) {
  return {
    ...post,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    publishedAt: post.publishedAt,
  };
}

router.get("/posts", async (_req, res): Promise<void> => {
  const posts = await db.select().from(postsTable)
    .where(eq(postsTable.status, "published"))
    .orderBy(desc(postsTable.publishedAt), desc(postsTable.createdAt));
  res.json(posts.map(serialize));
});

router.get("/posts/:slug", async (req, res): Promise<void> => {
  const [post] = await db.select().from(postsTable)
    .where(eq(postsTable.slug, req.params.slug))
    .limit(1);
  if (!post || post.status !== "published") {
    res.status(404).json({ error: "Không tìm thấy bài viết." });
    return;
  }
  res.json(serialize(post));
});

router.get("/admin/posts", requireAdmin, async (_req, res): Promise<void> => {
  const posts = await db.select().from(postsTable).orderBy(desc(postsTable.updatedAt));
  res.json(posts.map(serialize));
});

router.post("/admin/posts", requireAdmin, async (req, res): Promise<void> => {
  const input = normalizePostBody(req.body);
  const session = getAdminSession(req);
  if (!input || !session) {
    res.status(400).json({ error: "Vui lòng nhập tiêu đề, tóm tắt và nội dung bài viết hợp lệ." });
    return;
  }
  const now = new Date();
  const [post] = await db.insert(postsTable).values({
    ...input,
    slug: await uniqueSlug(input.title),
    authorEmail: session.email,
    updatedAt: now,
    publishedAt: input.status === "published" ? now : null,
  }).returning();
  res.status(201).json(serialize(post));
});

router.patch("/admin/posts/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const input = normalizePostBody(req.body);
  if (!Number.isInteger(id) || !input) {
    res.status(400).json({ error: "Dữ liệu bài viết không hợp lệ." });
    return;
  }
  const [existing] = await db.select().from(postsTable).where(eq(postsTable.id, id)).limit(1);
  if (!existing) {
    res.status(404).json({ error: "Không tìm thấy bài viết." });
    return;
  }
  const now = new Date();
  const [post] = await db.update(postsTable).set({
    ...input,
    updatedAt: now,
    publishedAt: input.status === "published" ? existing.publishedAt ?? now : null,
  }).where(eq(postsTable.id, id)).returning();
  res.json(serialize(post));
});

router.delete("/admin/posts/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "ID bài viết không hợp lệ." });
    return;
  }
  const [deleted] = await db.delete(postsTable).where(eq(postsTable.id, id)).returning({ id: postsTable.id });
  if (!deleted) {
    res.status(404).json({ error: "Không tìm thấy bài viết." });
    return;
  }
  res.status(204).end();
});

export default router;