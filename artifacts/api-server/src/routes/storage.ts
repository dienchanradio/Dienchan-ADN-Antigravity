import { Router, type IRouter } from "express";
import { requireAdmin } from "../lib/adminAuth";
import { v2 as cloudinary } from "cloudinary";

// 1. Cấu hình Cloudinary (Sẽ nhận chìa khóa từ Biến môi trường Vibe Host)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router: IRouter = Router();

// 2. Cấp link giả lập cho Frontend để nó tưởng đang dùng hệ thống cũ
router.post("/admin/uploads/request-url", requireAdmin, async (req, res): Promise<void> => {
  const { name, size, contentType } = req.body ?? {};

  if (typeof name !== "string" || typeof size !== "number" || size <= 0 || typeof contentType !== "string" || !contentType.startsWith("image/")) {
    res.status(400).json({ error: "Chỉ hỗ trợ tệp hình ảnh hợp lệ." });
    return;
  }
  if (size > 10 * 1024 * 1024) {
    res.status(413).json({ error: "Ảnh không được vượt quá 10MB." });
    return;
  }

  // Tạo một ID duy nhất cho bức ảnh
  const imageId = `dienchan_${Date.now()}`;

  // Đánh lừa Frontend bằng cách trả về link tải lên nội bộ của chúng ta
  res.json({
    uploadURL: `/api/admin/uploads/execute/${imageId}`, 
    objectPath: `/${imageId}`,
    metadata: { name, size, contentType }
  });
});

// 3. Đón file từ Frontend gửi lên và bơm thẳng lên Cloudinary
router.put("/admin/uploads/execute/:id", requireAdmin, (req, res): void => {
  const imageId = req.params.id;

  const uploadStream = cloudinary.uploader.upload_stream(
    { public_id: imageId, folder: "dienchan_images" },
    (error, result) => {
      if (error) {
        console.error("Lỗi tải ảnh lên Cloudinary:", error);
        res.status(500).json({ error: "Lỗi tải ảnh lên Cloudinary" });
        return;
      }
      res.json({ success: true, url: result?.secure_url });
    }
  );

  // Truyền trực tiếp dữ liệu file nhị phân đang tải lên thẳng vào Cloudinary
  req.pipe(uploadStream);
});

// 4. Khi bài viết muốn hiển thị ảnh -> Chuyển hướng người xem về link ảnh xịn của Cloudinary
router.get("/storage/*path", (req, res): void => {
  const rawPath = req.params.path;
  const imageId = Array.isArray(rawPath) ? rawPath.join("/") : rawPath;
  const cleanId = imageId.replace(/^\//, ''); // Xóa dấu gạch chéo dư thừa

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    res.status(500).json({ error: "Chưa cấu hình Cloudinary" });
    return;
  }

  // Tạo link trỏ thẳng về Cloudinary
  const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/dienchan_images/${cleanId}`;
  res.redirect(cloudinaryUrl);
});

export default router;
