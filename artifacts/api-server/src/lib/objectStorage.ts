import { randomUUID } from "node:crypto";
import { Storage, type File } from "@google-cloud/storage";
import type { Response } from "express";

const SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
const storage = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${SIDECAR_ENDPOINT}/credential`,
      format: { type: "json", subject_token_field_name: "access_token" },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

function parsePath(value: string): { bucket: string; object: string } {
  const normalized = value.startsWith("/") ? value : `/${value}`;
  const parts = normalized.split("/");
  if (parts.length < 3 || !parts[1] || !parts.slice(2).join("/")) throw new Error("Invalid object storage path.");
  return { bucket: parts[1], object: parts.slice(2).join("/") };
}

function privateDir(): string {
  const value = process.env.PRIVATE_OBJECT_DIR;
  if (!value) throw new Error("PRIVATE_OBJECT_DIR is not configured.");
  return value.replace(/\/+$/, "");
}

async function signUpload(bucket: string, object: string): Promise<string> {
  const response = await fetch(`${SIDECAR_ENDPOINT}/object-storage/signed-object-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bucket_name: bucket,
      object_name: object,
      method: "PUT",
      expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`Object storage signing failed with ${response.status}.`);
  const body = await response.json() as { signed_url?: string };
  if (!body.signed_url) throw new Error("Object storage did not return an upload URL.");
  return body.signed_url;
}

export async function createUpload(): Promise<{ uploadURL: string; objectPath: string }> {
  const rawPath = `${privateDir()}/uploads/${randomUUID()}`;
  const { bucket, object } = parsePath(rawPath);
  return { uploadURL: await signUpload(bucket, object), objectPath: `/objects/${object.slice(object.indexOf("/") + 1)}` };
}

export async function getObject(objectPath: string): Promise<File | null> {
  if (!objectPath.startsWith("/objects/")) return null;
  const entity = objectPath.slice("/objects/".length);
  const file = storage.bucket(parsePath(privateDir()).bucket).file(`${parsePath(privateDir()).object}/${entity}`);
  const [exists] = await file.exists();
  return exists ? file : null;
}

export async function pipeObject(file: File, res: Response): Promise<void> {
  const [metadata] = await file.getMetadata();
  res.setHeader("Content-Type", String(metadata.contentType ?? "application/octet-stream"));
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  if (metadata.size) res.setHeader("Content-Length", String(metadata.size));
  file.createReadStream().on("error", () => {
    if (!res.headersSent) res.status(500).json({ error: "Không thể đọc hình ảnh." });
    else res.end();
  }).pipe(res);
}