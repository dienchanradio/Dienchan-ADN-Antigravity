import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import {
  db,
  siteSettingsTable,
  type GiftItem,
  type ChapterItem,
  type FaqItem,
  type OutcomeItem,
  type AudienceItem,
} from "@workspace/db";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

// GET /api/site-settings (Public cho trang chủ)
router.get("/site-settings", async (req, res) => {
  try {
    const existing = await db
      .select()
      .from(siteSettingsTable)
      .where(eq(siteSettingsTable.id, 1))
      .limit(1);

    if (existing.length > 0) {
      return res.json(existing[0]);
    }

    // Nếu chưa có, tự động tạo dòng mặc định đầu tiên
    const [created] = await db
      .insert(siteSettingsTable)
      .values({ id: 1 })
      .onConflictDoNothing()
      .returning();

    if (created) {
      return res.json(created);
    }

    const [fallback] = await db
      .select()
      .from(siteSettingsTable)
      .where(eq(siteSettingsTable.id, 1))
      .limit(1);

    return res.json(fallback);
  } catch (error) {
    req.log?.error?.({ err: error }, "Lỗi khi lấy site settings");
    return res.status(500).json({ error: "Không thể lấy cấu hình website." });
  }
});

// PUT /api/admin/site-settings (Dành riêng cho Quản trị viên cập nhật CMS)
router.put("/admin/site-settings", requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};

    const outcomesData: OutcomeItem[] = Array.isArray(body.outcomes)
      ? body.outcomes.map((item: any, index: number) => ({
          id: typeof item?.id === "number" ? item.id : index + 1,
          text: typeof item?.text === "string" ? item.text.trim() : "",
          iconName: typeof item?.iconName === "string" ? item.iconName : "ScanFace",
        }))
      : [];

    const audiencesData: AudienceItem[] = Array.isArray(body.audiences)
      ? body.audiences.map((item: any, index: number) => ({
          id: typeof item?.id === "number" ? item.id : index + 1,
          text: typeof item?.text === "string" ? item.text.trim() : "",
          iconName: typeof item?.iconName === "string" ? item.iconName : "HeartPulse",
        }))
      : [];

    const giftsData: GiftItem[] = Array.isArray(body.gifts)
      ? body.gifts.map((item: any, index: number) => ({
          id: typeof item?.id === "number" ? item.id : index + 1,
          title: typeof item?.title === "string" ? item.title.trim() : "",
          value: typeof item?.value === "string" ? item.value.trim() : "",
          highlight: Boolean(item?.highlight),
          iconName: typeof item?.iconName === "string" ? item.iconName : "Sparkles",
        }))
      : [];

    const chaptersData: ChapterItem[] = Array.isArray(body.chapters)
      ? body.chapters.map((chap: any, cIdx: number) => ({
          id: typeof chap?.id === "number" ? chap.id : cIdx + 1,
          title: typeof chap?.title === "string" ? chap.title.trim() : `Chương ${cIdx + 1}`,
          lessons: Array.isArray(chap?.lessons)
            ? chap.lessons.map((les: any) => (typeof les === "string" ? les.trim() : String(les)))
            : [],
        }))
      : [];

    const faqsData: FaqItem[] = Array.isArray(body.faqs)
      ? body.faqs.map((f: any, fIdx: number) => ({
          id: typeof f?.id === "number" ? f.id : fIdx + 1,
          question: typeof f?.question === "string" ? f.question.trim() : "",
          answer: typeof f?.answer === "string" ? f.answer.trim() : "",
          iconName: typeof f?.iconName === "string" ? f.iconName : "Sparkles",
        }))
      : [];

    const parseBool = (val: any, fallback = true) => (typeof val === "boolean" ? val : fallback);

    const updatePayload = {
      // Bật/Tắt section
      showHero: parseBool(body.showHero, true),
      showLearningPath: parseBool(body.showLearningPath, true),
      showOutcomes: parseBool(body.showOutcomes, true),
      showAudience: parseBool(body.showAudience, true),
      showBonus: parseBool(body.showBonus, true),
      showInstructor: parseBool(body.showInstructor, true),
      showPricing: parseBool(body.showPricing, true),
      showPayment: parseBool(body.showPayment, true),
      showFaq: parseBool(body.showFaq, true),

      // Hero
      heroBadge: typeof body.heroBadge === "string" ? body.heroBadge.trim() : undefined,
      heroTitle: typeof body.heroTitle === "string" && body.heroTitle.trim() ? body.heroTitle.trim() : undefined,
      heroSubtitle: typeof body.heroSubtitle === "string" ? body.heroSubtitle.trim() : undefined,
      heroDescription1: typeof body.heroDescription1 === "string" ? body.heroDescription1.trim() : undefined,
      heroDescription2: typeof body.heroDescription2 === "string" ? body.heroDescription2.trim() : undefined,
      heroCtaText: typeof body.heroCtaText === "string" ? body.heroCtaText.trim() : undefined,
      heroCtaLink: typeof body.heroCtaLink === "string" ? body.heroCtaLink.trim() : undefined,
      heroSecondaryCtaText: typeof body.heroSecondaryCtaText === "string" ? body.heroSecondaryCtaText.trim() : undefined,
      heroSecondaryCtaLink: typeof body.heroSecondaryCtaLink === "string" ? body.heroSecondaryCtaLink.trim() : undefined,
      heroImageMain: typeof body.heroImageMain === "string" ? body.heroImageMain.trim() : undefined,

      // Lộ trình (Chapters & Lessons)
      learningPathTitle: typeof body.learningPathTitle === "string" ? body.learningPathTitle.trim() : undefined,
      chapters: chaptersData.length > 0 ? chaptersData : undefined,

      // Kết quả (Outcomes)
      outcomesTitle: typeof body.outcomesTitle === "string" ? body.outcomesTitle.trim() : undefined,
      outcomes: outcomesData.length > 0 ? outcomesData : undefined,

      // Đối tượng (Audience)
      audienceTitle: typeof body.audienceTitle === "string" ? body.audienceTitle.trim() : undefined,
      audiences: audiencesData.length > 0 ? audiencesData : undefined,

      // Quà tặng
      bonusTitle: typeof body.bonusTitle === "string" ? body.bonusTitle.trim() : undefined,
      gifts: giftsData.length > 0 ? giftsData : undefined,

      // Bảng giá & Học phí
      pricingTitle: typeof body.pricingTitle === "string" ? body.pricingTitle.trim() : undefined,
      tuitionOriginal: typeof body.tuitionOriginal === "string" ? body.tuitionOriginal.trim() : undefined,
      tuitionSale: typeof body.tuitionSale === "string" ? body.tuitionSale.trim() : undefined,
      tuitionDiscountLabel: typeof body.tuitionDiscountLabel === "string" ? body.tuitionDiscountLabel.trim() : undefined,
      tuitionNote: typeof body.tuitionNote === "string" ? body.tuitionNote.trim() : undefined,

      // Giảng viên
      instructorName: typeof body.instructorName === "string" ? body.instructorName.trim() : undefined,
      instructorSubtitle: typeof body.instructorSubtitle === "string" ? body.instructorSubtitle.trim() : undefined,
      instructorQuote: typeof body.instructorQuote === "string" ? body.instructorQuote.trim() : undefined,
      instructorImage: typeof body.instructorImage === "string" ? body.instructorImage.trim() : undefined,

      // Ngân hàng & QR
      bankAccountName: typeof body.bankAccountName === "string" ? body.bankAccountName.trim() : undefined,
      bankAccountNumber: typeof body.bankAccountNumber === "string" ? body.bankAccountNumber.trim() : undefined,
      bankName: typeof body.bankName === "string" ? body.bankName.trim() : undefined,
      transferSyntax: typeof body.transferSyntax === "string" ? body.transferSyntax.trim() : undefined,
      paymentQrImage: typeof body.paymentQrImage === "string" ? body.paymentQrImage.trim() : undefined,

      // FAQ
      faqs: faqsData.length > 0 ? faqsData : undefined,

      // Footer
      footerHotline: typeof body.footerHotline === "string" ? body.footerHotline.trim() : undefined,
      footerZalo: typeof body.footerZalo === "string" ? body.footerZalo.trim() : undefined,
      footerEmail: typeof body.footerEmail === "string" ? body.footerEmail.trim() : undefined,
      footerWebsite: typeof body.footerWebsite === "string" ? body.footerWebsite.trim() : undefined,
      footerAddress: typeof body.footerAddress === "string" ? body.footerAddress.trim() : undefined,
      footerCopyright: typeof body.footerCopyright === "string" ? body.footerCopyright.trim() : undefined,

      updatedAt: new Date(),
    };

    const existing = await db
      .select({ id: siteSettingsTable.id })
      .from(siteSettingsTable)
      .where(eq(siteSettingsTable.id, 1))
      .limit(1);

    let updated;
    if (existing.length === 0) {
      [updated] = await db
        .insert(siteSettingsTable)
        .values({
          id: 1,
          ...updatePayload,
        })
        .returning();
    } else {
      [updated] = await db
        .update(siteSettingsTable)
        .set(updatePayload)
        .where(eq(siteSettingsTable.id, 1))
        .returning();
    }

    req.log?.info?.({ settingsId: updated?.id }, "Site settings updated successfully");
    return res.json({ success: true, message: "Lưu cấu hình thành công!", data: updated });
  } catch (error) {
    req.log?.error?.({ err: error }, "Lỗi cập nhật site settings");
    return res.status(500).json({ error: "Không thể cập nhật cấu hình website." });
  }
});

export default router;
