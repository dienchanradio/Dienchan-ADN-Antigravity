import {
  boolean,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export interface GiftItem {
  id: number;
  title: string;
  value?: string;
  highlight?: boolean;
  iconName?: string;
}

export interface ChapterItem {
  id: number;
  title: string;
  lessons: string[];
}

export interface OutcomeItem {
  id: number;
  text: string;
  iconName?: string;
}

export interface AudienceItem {
  id: number;
  text: string;
  iconName?: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  iconName?: string;
}

export const defaultOutcomes: OutcomeItem[] = [
  { id: 1, text: "Có khả năng tự nhận biết, đọc hiểu các dấu hiệu bất thường trên mặt và cơ thể để dự phòng bệnh tật, chăm sóc bản thân một cách an toàn và tiết kiệm.", iconName: "ScanFace" },
  { id: 2, text: "Thành thạo các thao tác khai thông khí huyết và các phác đồ xử lý triệu chứng.", iconName: "HeartPulse" },
  { id: 3, text: "Xây dựng lối sống lành mạnh, chủ động giúp dân văn phòng và freelancer cân bằng lại nhịp sống bận rộn, giảm stress áp lực công việc.", iconName: "Leaf" },
  { id: 4, text: "Hiểu rõ mối liên hệ giữa các phản chiếu trên gương mặt với cơ quan nội tạng bên trong cơ thể.", iconName: "Brain" },
  { id: 5, text: "Sở hữu một “kỹ năng sinh tồn” thời đại số, trang bị thêm một năng lực tự chủ về sức khỏe nâng cao hiệu suất làm việc mỗi ngày.", iconName: "ShieldCheck" },
];

export const defaultAudiences: AudienceItem[] = [
  { id: 1, text: "Muốn giải quyết trọn bộ triệu chứng khó chịu từ nửa thân người trên như: cổ vai gáy, tiền đình, đốt sống cổ, viêm xoang...", iconName: "HeartPulse" },
  { id: 2, text: "Tiết kiệm thời gian và không muốn dùng thuốc, muốn chủ động tự chăm sóc bản thân chỉ với 10-15 phút thực hành mỗi ngày.", iconName: "Timer" },
  { id: 3, text: "Học một kỹ năng thực chiến không chỉ giúp ích cho bản thân mà còn chủ động hỗ trợ những người thân yêu (ông bà, cha mẹ, bạn bè...).", iconName: "HandHeart" },
  { id: 4, text: "Thỏa mãn đam mê khám phá kiến thức mới mẻ, hiện đại, tự kích hoạt khả năng tự chữa lành tự nhiên, là một “món ăn tinh thần” hoàn toàn mới lạ, khoa học nhưng gần gũi, giúp mở rộng tư duy về chăm sóc sức khỏe toàn diện.", iconName: "Telescope" },
];

export const defaultGifts: GiftItem[] = [
  { id: 1, title: "Hỗ trợ 1:1 qua nhóm cộng đồng", value: "Vô giá", highlight: true, iconName: "Headset" },
  { id: 2, title: "Miễn phí tham gia các buổi học online nâng cao", value: "1.000.000đ", highlight: false, iconName: "MonitorPlay" },
  { id: 3, title: "Ebook độc quyền nhiều tuyệt chiêu", value: "350.000đ", highlight: false, iconName: "BookOpenText" },
  { id: 4, title: "Nâng cấp tài khoản 1 năm thành trọn đời", value: "1.500.000đ", highlight: true, iconName: "Infinity" },
  { id: 5, title: "Bộ checklist quy trình chăm sóc sức khỏe", value: "200.000đ", highlight: false, iconName: "ClipboardCheck" },
  { id: 6, title: "Bản đồ tư duy lộ trình học.", value: "300.000đ", highlight: false, iconName: "Map" },
];

export const defaultChapters: ChapterItem[] = [
  {
    id: 1,
    title: "Chương 1: Nền Tảng Nhập Môn (7 bài)",
    lessons: [
      "Bài 1: Hành trình khám phá câu chuyện về Thầy Tổ.",
      "Bài 2: Diện Chẩn – Điều Khiển Liệu Pháp là gì?",
      "Bài 3: Giải mã hệ thống Huyệt đạo – Đồ hình – Dụng cụ Diện Chẩn.",
      "Bài 4: Tư thế chuẩn hạn chế khí trượt đảo chiều.",
      "Bài 5: Gia tăng hiệu quả khi dùng huyệt Diện Chẩn.",
      "Bài 6: Cẩm nang sử dụng dụng cụ.",
      "Bài 7: Dùng ngải cứu đúng Thời.",
    ],
  },
  {
    id: 2,
    title: "Chương 2: Kích hoạt cơ chế tự chữa lành (4 bài)",
    lessons: [
      "Bài 8: Chăm sóc sức khỏe toàn diện",
      "Bài 9: Đánh thức “ngân hàng thuốc” tiềm ẩn trong cơ thể.",
      "Bài 10: Tăng sức đề kháng và chống viêm bằng thao tác đơn giản.",
      "Bài 11: Những nguyên tắc vàng trong Diện Chẩn.",
    ],
  },
  {
    id: 3,
    title: "Chương 3: Đọc vị cơ thể, xử lý tình huống (8 bài)",
    lessons: [
      "Bài 12: Vọng – Văn – Vấn – Thiết trong Diện Chẩn truy tìm nguồn gốc",
      "Bài 13: Kỹ năng phòng bệnh chủ động.",
      "Bài 14: Cấp cứu nhanh những tình huống khẩn cấp.",
      "Bài 15: Xử lý hiện tượng huyết áp bất thường.",
      "Bài 16: Xác định chính xác vị trí huyệt cơ bản.",
      "Bài 17: Khai thông huyệt đạo.",
      "Bài 18: Nâng tầm kỹ năng khai thông huyệt đạo.",
      "Bài 19: Ứng dụng Ngũ hành tương sinh – tương khắc trong Diện Chẩn.",
    ],
  },
  {
    id: 4,
    title: "Chương 4: Chinh phục 7 cửa ải thành chuyên gia (7 bài)",
    lessons: [
      "Bài 20: Phác đồ Chu Thiên Toàn Diện – Cân bằng năng lượng toàn thân.",
      "Bài 21: Phác đồ Đa Năng – Giải pháp đa triệu chứng.",
      "Bài 22: Đẩy lùi rối loạn tiền đình bằng Diện Chẩn.",
      "Bài 23: Gỡ nút thắt thoái hóa – gai – thoát vị đốt sống cổ.",
      "Bài 24: Chấm dứt cơn đau đầu không dùng thuốc.",
      "Bài 25: Giải phóng cứng cổ vai gáy nhanh chóng.",
    ],
  },
];

export const defaultFaqs: FaqItem[] = [
  {
    id: 1,
    question: "Tôi chưa từng học y học cổ truyền hay bấm huyệt bao giờ thì có học được không?",
    answer: "Hoàn toàn được! Khóa học được thiết kế từ số 0, dùng ngôn ngữ hiện đại, đồ hình trực quan và hướng dẫn từng động tác rất chi tiết, ai cũng có thể làm theo dễ dàng.",
  },
  {
    id: 2,
    question: "Tôi học online như thế nào và thời hạn xem video là bao lâu?",
    answer: "Sau khi thanh toán và được admin kích hoạt, bạn đăng nhập vào website để học trên nền tảng video chuyên biệt. Bạn được tặng ngay gói sở hữu và xem lại trọn đời mọi lúc, mọi nơi trên điện thoại hay máy tính.",
  },
  {
    id: 3,
    question: "Khi thực hành nếu không tìm đúng huyệt hoặc có thắc mắc thì ai hỗ trợ?",
    answer: "Bạn sẽ được tham gia nhóm hỗ trợ độc quyền và các buổi Zoom trực tiếp cùng Nguyễn Minh Đạt để được giải đáp và hướng dẫn tỉ mỉ.",
  },
  {
    id: 4,
    question: "Có bắt buộc phải có dụng cụ đầy đủ không?",
    answer: "Bạn hoàn toàn có thể dùng các vật dụng sẵn có như đầu ngón tay, chìa khóa... để làm ngay.",
  },
];

export const siteSettingsTable = pgTable("site_settings", {
  id: serial("id").primaryKey(),

  // BẬT / TẮT TỪNG SECTION TRÊN TRANG CHỦ
  showHero: boolean("show_hero").notNull().default(true),
  showLearningPath: boolean("show_learning_path").notNull().default(true),
  showOutcomes: boolean("show_outcomes").notNull().default(true),
  showAudience: boolean("show_audience").notNull().default(true),
  showBonus: boolean("show_bonus").notNull().default(true),
  showInstructor: boolean("show_instructor").notNull().default(true),
  showPricing: boolean("show_pricing").notNull().default(true),
  showPayment: boolean("show_payment").notNull().default(true),
  showFaq: boolean("show_faq").notNull().default(true),

  // 1. HERO BANNER
  heroBadge: text("hero_badge").default("KHÓA HỌC DIỆN CHẨN ONLINE"),
  heroTitle: text("hero_title").notNull().default("CHỈ VỚI 15 PHÚT MỖI NGÀY THÔNG THẠO NHIỀU TUYỆT CHIÊU!"),
  heroSubtitle: text("hero_subtitle").default("Giải Pháp Chăm Sóc Sức Khỏe Tự Nhiên Dành Cho Người Bận Rộn"),
  heroDescription1: text("hero_description_1").default("Khóa học như một “chìa khóa” giúp kích hoạt hệ thống tự chữa lành tự nhiên vốn đã được lập trình sẵn trong cơ thể."),
  heroDescription2: text("hero_description_2").default("Khóa học Online “DIỆN CHẨN KÍCH HOẠT ADN TỰ CHỮA LÀNH”. Đóng gói trọn bộ 25 bài giảng thực chiến thành video giúp bạn khai thông ách tắc tại nhà."),
  heroCtaText: text("hero_cta_text").default("ĐĂNG KÝ HỌC NGAY"),
  heroCtaLink: text("hero_cta_link").default("#thanh-toan"),
  heroSecondaryCtaText: text("hero_secondary_cta_text").default("XEM LỘ TRÌNH"),
  heroSecondaryCtaLink: text("hero_secondary_cta_link").default("#lo-trinh"),
  heroImageMain: text("hero_image_main").default(""),

  // 2. LỘ TRÌNH TRỞ THÀNH CHUYÊN NGHIỆP (JSONB mảng các chương và bài học)
  learningPathTitle: text("learning_path_title").default("LỘ TRÌNH THÀNH CHUYÊN NGHIỆP"),
  chapters: jsonb("chapters").$type<ChapterItem[]>().notNull().default(defaultChapters),

  // 3. KẾT QUẢ ĐẠT ĐƯỢC (JSONB)
  outcomesTitle: text("outcomes_title").default("SAU KHÓA HỌC THÌ BẠN SẼ:"),
  outcomes: jsonb("outcomes").$type<OutcomeItem[]>().notNull().default(defaultOutcomes),

  // 4. ĐỐI TƯỢNG PHÙ HỢP (JSONB)
  audienceTitle: text("audience_title").default("AI SẼ CẦN KHÓA HỌC NÀY!"),
  audiences: jsonb("audiences").$type<AudienceItem[]>().notNull().default(defaultAudiences),

  // 5. QUÀ TẶNG ĐỘC QUYỀN (JSONB)
  bonusTitle: text("bonus_title").default("BỘ 6 MÓN QUÀ ĐỘC QUYỀN KHI ĐĂNG KÝ!"),
  gifts: jsonb("gifts").$type<GiftItem[]>().notNull().default(defaultGifts),

  // 4. HỌC PHÍ & KHUYẾN MÃI
  pricingTitle: text("pricing_title").default("BẢNG GIÁ SỞ HỮU KHÓA HỌC TRỌN ĐỜI"),
  tuitionOriginal: text("tuition_original").notNull().default("1.750.000 VNĐ"),
  tuitionSale: text("tuition_sale").notNull().default("875.000 VNĐ"),
  tuitionDiscountLabel: text("tuition_discount_label").default("Giá đang ưu đãi tri ân học viên hiện đang cực tốt lên tới 50%, chương trình này có thể kết thúc trước thời hạn!"),
  tuitionNote: text("tuition_note").default("Ưu đãi độc quyền hôm nay (Học trọn đời — Toàn bộ 25 bài học + 6 Quà tặng)"),

  // 5. GIẢNG VIÊN
  instructorName: text("instructor_name").default("NGUYỄN MINH ĐẠT"),
  instructorSubtitle: text("instructor_subtitle").default("NGƯỜI THỔI HỒN VÀO HÀNH TRÌNH TỰ CHỮA LÀNH CỦA BẠN"),
  instructorQuote: text("instructor_quote").default("“Với tôi, Diện Chẩn không chỉ là một phương pháp chăm sóc sức khỏe, mà là một sự nghiệp tâm huyết và là phong cách sống suốt hơn 11 năm qua. Khóa học Online này được tôi ấp ủ và đóng gói với mục tiêu: Dù bạn ở bất kỳ đâu, bận rộn đến đâu, cũng có thể tiếp cận tinh hoa Diện Chẩn một cách đơn giản.”"),
  instructorImage: text("instructor_image").default(""),

  // 6. THANH TOÁN & NGÂN HÀNG
  bankAccountName: text("bank_account_name").default("Nguyễn Minh Đạt"),
  bankAccountNumber: text("bank_account_number").default("36810000254898"),
  bankName: text("bank_name").default("BIDV"),
  transferSyntax: text("transfer_syntax").default("Họ tên + SDT + ADN"),
  paymentQrImage: text("payment_qr_image").default(""),

  // 7. CÂU HỎI THƯỜNG GẶP (FAQ JSONB)
  faqs: jsonb("faqs").$type<FaqItem[]>().notNull().default(defaultFaqs),

  // 8. FOOTER & LIÊN HỆ
  footerHotline: text("footer_hotline").default("091.999.4282"),
  footerZalo: text("footer_zalo").default("091.999.4282"),
  footerEmail: text("footer_email").default("dienchanboutique@gmail.com"),
  footerWebsite: text("footer_website").default("www.khoahocdienchan.com"),
  footerAddress: text("footer_address").default("VP Diện Chẩn Vì Cộng Đồng – Chi Nhánh Q.1 (Diện Chẩn Boutique), TP. Hồ Chí Minh"),
  footerCopyright: text("footer_copyright").default("Copyright 2026 Bản quyền thuộc về Nguyễn Minh Đạt. All rights reserved."),

  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettingsTable).omit({
  id: true,
  updatedAt: true,
});

export type SiteSettings = typeof siteSettingsTable.$inferSelect;
export type InsertSiteSettings = typeof siteSettingsTable.$inferInsert;
