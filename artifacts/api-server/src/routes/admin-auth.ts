import { Router, type IRouter } from "express";
import { clearAdminSession, adminCredentialsConfigured, adminEmail, adminPassword, getAdminSession, setAdminSession } from "../lib/adminAuth";

const router: IRouter = Router();

router.get("/admin/auth/me", (req, res) => {
  const session = getAdminSession(req);
  if (!session) {
    res.status(401).json({ error: "Chưa đăng nhập quản trị viên." });
    return;
  }
  res.json({ email: session.email });
});

router.post("/admin/auth/login", (req, res) => {
  if (!adminCredentialsConfigured()) {
    res.status(503).json({ error: "Admin Auth chưa được cấu hình. Hãy đặt ADMIN_EMAIL, ADMIN_PASSWORD và SESSION_SECRET trong Replit Secrets." });
    return;
  }
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (!email || !password || email !== adminEmail().trim().toLowerCase() || password !== adminPassword()) {
    res.status(401).json({ error: "Email hoặc mật khẩu quản trị viên không chính xác." });
    return;
  }
  setAdminSession(res, email);
  res.json({ email });
});

router.post("/admin/auth/logout", (_req, res) => {
  clearAdminSession(res);
  res.status(204).end();
});

export default router;