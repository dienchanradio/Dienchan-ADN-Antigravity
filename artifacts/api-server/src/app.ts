import path from "path";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
// Cấu hình đường dẫn tới thư mục Frontend vừa build
// (Nếu Vite của bạn xuất file ra thư mục public, hãy thêm "/public" vào sau "dist")
const frontendPath = path.join(process.cwd(), "artifacts/dien-chan-adn/dist/public");

// Phục vụ các file tĩnh (CSS, JS, Hình ảnh...)
app.use(express.static(frontendPath));

// Bắt mọi đường link (ngoại trừ /api) và trả về giao diện web
app.get("/lay-link-db", (req, res) => {
  res.send(process.env.POSTGRES_URL || "Không tìm thấy link");
});
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
export default app;
