import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  BookOpenText,
  Brain,
  Check,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  Compass,
  CreditCard,
  ExternalLink,
  Eye,
  EyeOff,
  FileCheck2,
  FileText,
  Flame,
  Gift,
  HandHeart,
  Headset,
  Heart,
  HeartPulse,
  Home,
  Image,
  Infinity,
  Leaf,
  Lightbulb,
  Map,
  MonitorPlay,
  Newspaper,
  Phone,
  Plus,
  QrCode,
  RefreshCcw,
  ScanFace,
  ShieldCheck,
  Sliders,
  Smile,
  Sparkles,
  Star,
  Sun,
  Target,
  Telescope,
  Timer,
  Trash2,
  User,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

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

export interface SiteSettingsData {
  // Bật/Tắt section
  showHero: boolean;
  showLearningPath: boolean;
  showOutcomes: boolean;
  showAudience: boolean;
  showBonus: boolean;
  showInstructor: boolean;
  showPricing: boolean;
  showPayment: boolean;
  showFaq: boolean;

  // Hero
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription1: string;
  heroDescription2: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  heroImageMain: string;

  // Lộ trình (4 Chương, 25 bài học)
  learningPathTitle: string;
  chapters: ChapterItem[];

  // Kết quả sau khóa học (Section 03)
  outcomesTitle: string;
  outcomes: OutcomeItem[];

  // Đối tượng phù hợp (Section 04)
  audienceTitle: string;
  audiences: AudienceItem[];

  // Quà tặng độc quyền (Section 05)
  bonusTitle: string;
  gifts: GiftItem[];

  // Học phí & Khuyến mãi (Section 07)
  pricingTitle: string;
  tuitionOriginal: string;
  tuitionSale: string;
  tuitionDiscountLabel: string;
  tuitionNote: string;

  // Giảng viên (Section 06)
  instructorName: string;
  instructorSubtitle: string;
  instructorQuote: string;
  instructorImage: string;

  // Ngân hàng (Section 08)
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
  transferSyntax: string;
  paymentQrImage: string;

  // FAQ (Section 09)
  faqs: FaqItem[];

  // Footer & Liên hệ
  footerHotline: string;
  footerZalo: string;
  footerEmail: string;
  footerWebsite: string;
  footerAddress: string;
  footerCopyright: string;
}

const defaultOutcomes: OutcomeItem[] = [
  { id: 1, text: 'Có khả năng tự nhận biết, đọc hiểu các dấu hiệu bất thường trên mặt và cơ thể để dự phòng bệnh tật, chăm sóc bản thân một cách an toàn và tiết kiệm.', iconName: 'ScanFace' },
  { id: 2, text: 'Thành thạo các thao tác khai thông khí huyết và các phác đồ xử lý triệu chứng.', iconName: 'HeartPulse' },
  { id: 3, text: 'Xây dựng lối sống lành mạnh, chủ động giúp dân văn phòng và freelancer cân bằng lại nhịp sống bận rộn, giảm stress áp lực công việc.', iconName: 'Leaf' },
  { id: 4, text: 'Hiểu rõ mối liên hệ giữa các phản chiếu trên gương mặt với cơ quan nội tạng bên trong cơ thể.', iconName: 'Brain' },
  { id: 5, text: 'Sở hữu một “kỹ năng sinh tồn” thời đại số, trang bị thêm một năng lực tự chủ về sức khỏe nâng cao hiệu suất làm việc mỗi ngày.', iconName: 'ShieldCheck' },
];

const defaultAudiences: AudienceItem[] = [
  { id: 1, text: 'Muốn giải quyết trọn bộ triệu chứng khó chịu từ nửa thân người trên như: cổ vai gáy, tiền đình, đốt sống cổ, viêm xoang...', iconName: 'HeartPulse' },
  { id: 2, text: 'Tiết kiệm thời gian và không muốn dùng thuốc, muốn chủ động tự chăm sóc bản thân chỉ với 10-15 phút thực hành mỗi ngày.', iconName: 'Timer' },
  { id: 3, text: 'Học một kỹ năng thực chiến không chỉ giúp ích cho bản thân mà còn chủ động hỗ trợ những người thân yêu (ông bà, cha mẹ, bạn bè...).', iconName: 'HandHeart' },
  { id: 4, text: 'Thỏa mãn đam mê khám phá kiến thức mới mẻ, hiện đại, tự kích hoạt khả năng tự chữa lành tự nhiên, là một “món ăn tinh thần” hoàn toàn mới lạ, khoa học nhưng gần gũi, giúp mở rộng tư duy về chăm sóc sức khỏe toàn diện.', iconName: 'Telescope' },
];

const defaultGifts: GiftItem[] = [
  { id: 1, title: 'Hỗ trợ 1:1 qua nhóm cộng đồng', value: 'Vô giá', highlight: true, iconName: 'Headset' },
  { id: 2, title: 'Miễn phí tham gia các buổi học online nâng cao', value: '1.000.000đ', highlight: false, iconName: 'MonitorPlay' },
  { id: 3, title: 'Ebook độc quyền nhiều tuyệt chiêu', value: '350.000đ', highlight: false, iconName: 'BookOpenText' },
  { id: 4, title: 'Nâng cấp tài khoản 1 năm thành trọn đời', value: '1.500.000đ', highlight: true, iconName: 'Infinity' },
  { id: 5, title: 'Bộ checklist quy trình chăm sóc sức khỏe', value: '200.000đ', highlight: false, iconName: 'ClipboardCheck' },
  { id: 6, title: 'Bản đồ tư duy lộ trình học.', value: '300.000đ', highlight: false, iconName: 'Map' },
];

const defaultChapters: ChapterItem[] = [
  {
    id: 1,
    title: 'Chương 1: Nền Tảng Nhập Môn (7 bài)',
    lessons: [
      'Bài 1: Hành trình khám phá câu chuyện về Thầy Tổ.',
      'Bài 2: Diện Chẩn – Điều Khiển Liệu Pháp là gì?',
      'Bài 3: Giải mã hệ thống Huyệt đạo – Đồ hình – Dụng cụ Diện Chẩn.',
      'Bài 4: Tư thế chuẩn hạn chế khí trượt đảo chiều.',
      'Bài 5: Gia tăng hiệu quả khi dùng huyệt Diện Chẩn.',
      'Bài 6: Cẩm nang sử dụng dụng cụ.',
      'Bài 7: Dùng ngải cứu đúng Thời.',
    ],
  },
  {
    id: 2,
    title: 'Chương 2: Kích hoạt cơ chế tự chữa lành (4 bài)',
    lessons: [
      'Bài 8: Chăm sóc sức khỏe toàn diện',
      'Bài 9: Đánh thức “ngân hàng thuốc” tiềm ẩn trong cơ thể.',
      'Bài 10: Tăng sức đề kháng và chống viêm bằng thao tác đơn giản.',
      'Bài 11: Những nguyên tắc vàng trong Diện Chẩn.',
    ],
  },
  {
    id: 3,
    title: 'Chương 3: Đọc vị cơ thể, xử lý tình huống (8 bài)',
    lessons: [
      'Bài 12: Vọng – Văn – Vấn – Thiết trong Diện Chẩn truy tìm nguồn gốc',
      'Bài 13: Kỹ năng phòng bệnh chủ động.',
      'Bài 14: Cấp cứu nhanh những tình huống khẩn cấp.',
      'Bài 15: Xử lý hiện tượng huyết áp bất thường.',
      'Bài 16: Xác định chính xác vị trí huyệt cơ bản.',
      'Bài 17: Khai thông huyệt đạo.',
      'Bài 18: Nâng tầm kỹ năng khai thông huyệt đạo.',
      'Bài 19: Ứng dụng Ngũ hành tương sinh – tương khắc trong Diện Chẩn.',
    ],
  },
  {
    id: 4,
    title: 'Chương 4: Chinh phục 7 cửa ải thành chuyên gia (7 bài)',
    lessons: [
      'Bài 20: Phác đồ Chu Thiên Toàn Diện – Cân bằng năng lượng toàn thân.',
      'Bài 21: Phác đồ Đa Năng – Giải pháp đa triệu chứng.',
      'Bài 22: Đẩy lùi rối loạn tiền đình bằng Diện Chẩn.',
      'Bài 23: Gỡ nút thắt thoái hóa – gai – thoát vị đốt sống cổ.',
      'Bài 24: Chấm dứt cơn đau đầu không dùng thuốc.',
      'Bài 25: Giải phóng cứng cổ vai gáy nhanh chóng.',
    ],
  },
];

const defaultFaqs: FaqItem[] = [
  {
    id: 1,
    question: 'Tôi chưa từng học y học cổ truyền hay bấm huyệt bao giờ thì có học được không?',
    answer: 'Hoàn toàn được! Khóa học được thiết kế từ số 0, dùng ngôn ngữ hiện đại, đồ hình trực quan và hướng dẫn từng động tác rất chi tiết, ai cũng có thể làm theo dễ dàng.',
    iconName: 'Sparkles',
  },
  {
    id: 2,
    question: 'Tôi học online như thế nào và thời hạn xem video là bao lâu?',
    answer: 'Sau khi thanh toán và được admin kích hoạt, bạn đăng nhập vào website để học trên nền tảng video chuyên biệt. Bạn được tặng ngay gói sở hữu và xem lại trọn đời mọi lúc, mọi nơi trên điện thoại hay máy tính.',
    iconName: 'Sparkles',
  },
  {
    id: 3,
    question: 'Khi thực hành nếu không tìm đúng huyệt hoặc có thắc mắc thì ai hỗ trợ?',
    answer: 'Bạn sẽ được tham gia nhóm hỗ trợ độc quyền và các buổi Zoom trực tiếp cùng Nguyễn Minh Đạt để được giải đáp và hướng dẫn tỉ mỉ.',
    iconName: 'Sparkles',
  },
  {
    id: 4,
    question: 'Có bắt buộc phải có dụng cụ đầy đủ không?',
    answer: 'Bạn hoàn toàn có thể dùng các vật dụng sẵn có như đầu ngón tay, chìa khóa... để làm ngay.',
    iconName: 'Sparkles',
  },
];

const ICON_MAP: Record<string, LucideIcon> = {
  ScanFace,
  HeartPulse,
  Leaf,
  Brain,
  ShieldCheck,
  Timer,
  HandHeart,
  Telescope,
  Headset,
  MonitorPlay,
  BookOpenText,
  Infinity,
  ClipboardCheck,
  Map,
  Sparkles,
  Gift,
  CircleHelp,
  Award,
  Zap,
  Heart,
  Star,
  Sun,
  Smile,
  Activity,
  Lightbulb,
  Compass,
  Flame,
  Target,
  Eye,
};

const ICON_OPTIONS = [
  { id: 'ScanFace', label: '👤 Khuôn mặt (ScanFace)' },
  { id: 'HeartPulse', label: '🩺 Nhịp tim / Y tế (HeartPulse)' },
  { id: 'Leaf', label: '🌿 Tự nhiên / Thảo dược (Leaf)' },
  { id: 'Brain', label: '🧠 Trí não / Y lý (Brain)' },
  { id: 'ShieldCheck', label: '🛡️ Bảo vệ / Đề kháng (ShieldCheck)' },
  { id: 'Timer', label: '⏱️ Thời gian / 15 phút (Timer)' },
  { id: 'HandHeart', label: '🤝 Chăm sóc người thân (HandHeart)' },
  { id: 'Telescope', label: '🔭 Khám phá / Tầm nhìn (Telescope)' },
  { id: 'Headset', label: '🎧 Hỗ trợ 1:1 (Headset)' },
  { id: 'MonitorPlay', label: '💻 Video khóa học (MonitorPlay)' },
  { id: 'BookOpenText', label: '📖 Ebook tài liệu (BookOpenText)' },
  { id: 'Infinity', label: '♾️ Trọn đời (Infinity)' },
  { id: 'ClipboardCheck', label: '📋 Checklist chăm sóc (ClipboardCheck)' },
  { id: 'Map', label: '🗺️ Bản đồ tư duy (Map)' },
  { id: 'Sparkles', label: '✨ Tia sáng / FAQ (Sparkles)' },
  { id: 'Gift', label: '🎁 Hộp quà (Gift)' },
  { id: 'CircleHelp', label: '❓ Hỏi đáp FAQ (CircleHelp)' },
  { id: 'Award', label: '🏆 Chứng nhận chuyên gia (Award)' },
  { id: 'Zap', label: '⚡ Năng lượng / Tức thì (Zap)' },
];

function IconPicker({
  value,
  onChange,
  title = 'Chọn Icon hoặc dán link ảnh',
}: {
  value?: string | null;
  onChange: (val: string) => void;
  title?: string;
}) {
  const currentVal = value || 'Sparkles';
  const isCustomUrl = currentVal.startsWith('http://') || currentVal.startsWith('https://') || currentVal.startsWith('/') || currentVal.startsWith('data:');
  const [useCustomUrl, setUseCustomUrl] = useState(isCustomUrl);
  const [urlInput, setUrlInput] = useState(isCustomUrl ? currentVal : '');

  const IconComponent = !isCustomUrl ? (ICON_MAP[currentVal] || Sparkles) : null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Sparkles size={13} className="text-amber-500" />
          {title}
        </label>
        <button
          type="button"
          onClick={() => {
            const next = !useCustomUrl;
            setUseCustomUrl(next);
            if (!next) {
              onChange('Sparkles');
            } else if (urlInput.trim()) {
              onChange(urlInput.trim());
            }
          }}
          className="text-[11px] font-medium text-amber-700 hover:text-amber-800 underline cursor-pointer"
        >
          {useCustomUrl ? '← Chọn từ danh sách có sẵn' : '+ Dán Link ảnh ngoài (Cloudinary...)'}
        </button>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
          {isCustomUrl ? (
            <img src={currentVal} alt="icon" className="w-6 h-6 object-contain" />
          ) : IconComponent ? (
            <IconComponent size={20} className="text-amber-600" />
          ) : (
            <Sparkles size={20} className="text-amber-600" />
          )}
        </div>

        {useCustomUrl ? (
          <input
            type="text"
            placeholder="Dán link ảnh https://res.cloudinary.com/..."
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              onChange(e.target.value.trim());
            }}
            className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        ) : (
          <select
            value={currentVal}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {ICON_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <p className="text-[10px] text-slate-400">
        Kích thước tự động tối ưu vừa vặn trong khung tròn hiển thị của website.
      </p>
    </div>
  );
}

function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200/80 rounded-xl hover:border-slate-300 transition-colors">
      <div className="pr-4">
        <div className="text-xs font-bold text-slate-900">{label}</div>
        <div className="text-[11px] text-slate-500 mt-0.5">{description}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 cursor-pointer ${
          checked ? 'bg-emerald-500' : 'bg-slate-300'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

type TabType =
  | 'visibility'
  | 'hero'
  | 'learning'
  | 'outcomes'
  | 'audience'
  | 'gifts'
  | 'pricing'
  | 'instructor'
  | 'payment'
  | 'faq'
  | 'posts'
  | 'footer';

export function AdminSiteSettingsPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabType>('visibility');

  const [form, setForm] = useState<SiteSettingsData>({
    showHero: true,
    showLearningPath: true,
    showOutcomes: true,
    showAudience: true,
    showBonus: true,
    showInstructor: true,
    showPricing: true,
    showPayment: true,
    showFaq: true,

    heroBadge: 'KHÓA HỌC DIỆN CHẨN ONLINE',
    heroTitle: 'CHỈ VỚI 15 PHÚT MỖI NGÀY THÔNG THẠO NHIỀU TUYỆT CHIÊU!',
    heroSubtitle: 'Giải Pháp Chăm Sóc Sức Khỏe Tự Nhiên Dành Cho Người Bận Rộn',
    heroDescription1: 'Khóa học như một “chìa khóa” giúp kích hoạt hệ thống tự chữa lành tự nhiên vốn đã được lập trình sẵn trong cơ thể.',
    heroDescription2: 'Khóa học Online “DIỆN CHẨN KÍCH HOẠT ADN TỰ CHỮA LÀNH”. Đóng gói trọn bộ 25 bài giảng thực chiến thành video giúp bạn khai thông ách tắc tại nhà.',
    heroCtaText: 'ĐĂNG KÝ HỌC NGAY',
    heroCtaLink: '#thanh-toan',
    heroSecondaryCtaText: 'XEM LỘ TRÌNH',
    heroSecondaryCtaLink: '#lo-trinh',
    heroImageMain: '',

    learningPathTitle: 'LỘ TRÌNH THÀNH CHUYÊN NGHIỆP',
    chapters: defaultChapters,

    outcomesTitle: 'SAU KHÓA HỌC THÌ BẠN SẼ:',
    outcomes: defaultOutcomes,

    audienceTitle: 'MÀ TÓM LẠI... AI SẼ CẦN KHÓA HỌC NÀY!',
    audiences: defaultAudiences,

    bonusTitle: 'BỘ 6 MÓN QUÀ ĐỘC QUYỀN KHI ĐĂNG KÝ!',
    gifts: defaultGifts,

    pricingTitle: 'BẢNG GIÁ SỞ HỮU KHÓA HỌC TRỌN ĐỜI',
    tuitionOriginal: '1.750.000 VNĐ',
    tuitionSale: '875.000 VNĐ',
    tuitionDiscountLabel: 'Giá đang ưu đãi tri ân học viên hiện đang cực tốt lên tới 50%, chương trình này có thể kết thúc trước thời hạn!',
    tuitionNote: 'Ưu đãi độc quyền hôm nay (Học trọn đời — Toàn bộ 25 bài học + 6 Quà tặng)',

    instructorName: 'NGUYỄN MINH ĐẠT',
    instructorSubtitle: 'NGƯỜI THỔI HỒN VÀO HÀNH TRÌNH TỰ CHỮA LÀNH CỦA BẠN',
    instructorQuote: '“Với tôi, Diện Chẩn không chỉ là một phương pháp chăm sóc sức khỏe, mà là một sự nghiệp tâm huyết và là phong cách sống suốt hơn 11 năm qua.\n\nKhóa học Online này được tôi ấp ủ và đóng gói với mục tiêu: Dù bạn ở bất kỳ đâu, bận rộn đến đâu, cũng có thể tiếp cận tinh hoa Diện Chẩn một cách đơn giản, và đây là phương pháp quản trị sức khỏe của người Việt Nam do Thầy Tổ Bùi Quốc Châu phát minh”',
    instructorImage: '',

    bankAccountName: 'Nguyễn Minh Đạt',
    bankAccountNumber: '36810000254898',
    bankName: 'BIDV',
    transferSyntax: 'Họ tên + SDT + ADN',
    paymentQrImage: '',

    faqs: defaultFaqs,

    footerHotline: '091.999.4282',
    footerZalo: '091.999.4282',
    footerEmail: 'dienchanboutique@gmail.com',
    footerWebsite: 'www.khoahocdienchan.com',
    footerAddress: 'VP Diện Chẩn Vì Cộng Đồng – Chi Nhánh Q.1 (Diện Chẩn Boutique), TP. Hồ Chí Minh',
    footerCopyright: 'Copyright 2026 Bản quyền thuộc về Nguyễn Minh Đạt. All rights reserved.',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/site-settings');
      if (!res.ok) throw new Error('Không thể tải cấu hình từ máy chủ');
      const data = await res.json();
      setForm((prev) => ({
        ...prev,
        showHero: data.showHero !== false,
        showLearningPath: data.showLearningPath !== false,
        showOutcomes: data.showOutcomes !== false,
        showAudience: data.showAudience !== false,
        showBonus: data.showBonus !== false,
        showInstructor: data.showInstructor !== false,
        showPricing: data.showPricing !== false,
        showPayment: data.showPayment !== false,
        showFaq: data.showFaq !== false,

        heroBadge: data.heroBadge || prev.heroBadge,
        heroTitle: data.heroTitle || prev.heroTitle,
        heroSubtitle: data.heroSubtitle || prev.heroSubtitle,
        heroDescription1: data.heroDescription1 || prev.heroDescription1,
        heroDescription2: data.heroDescription2 || prev.heroDescription2,
        heroCtaText: data.heroCtaText || prev.heroCtaText,
        heroCtaLink: data.heroCtaLink || prev.heroCtaLink,
        heroSecondaryCtaText: data.heroSecondaryCtaText || prev.heroSecondaryCtaText,
        heroSecondaryCtaLink: data.heroSecondaryCtaLink || prev.heroSecondaryCtaLink,
        heroImageMain: data.heroImageMain || '',

        learningPathTitle: data.learningPathTitle || prev.learningPathTitle,
        chapters: Array.isArray(data.chapters) && data.chapters.length > 0 ? data.chapters : defaultChapters,

        outcomesTitle: data.outcomesTitle || prev.outcomesTitle,
        outcomes: Array.isArray(data.outcomes) && data.outcomes.length > 0 ? data.outcomes : defaultOutcomes,

        audienceTitle: data.audienceTitle || prev.audienceTitle,
        audiences: Array.isArray(data.audiences) && data.audiences.length > 0 ? data.audiences : defaultAudiences,

        bonusTitle: data.bonusTitle || prev.bonusTitle,
        gifts: Array.isArray(data.gifts) && data.gifts.length > 0 ? data.gifts : defaultGifts,

        pricingTitle: data.pricingTitle || prev.pricingTitle,
        tuitionOriginal: data.tuitionOriginal || prev.tuitionOriginal,
        tuitionSale: data.tuitionSale || prev.tuitionSale,
        tuitionDiscountLabel: data.tuitionDiscountLabel || prev.tuitionDiscountLabel,
        tuitionNote: data.tuitionNote || prev.tuitionNote,

        instructorName: data.instructorName || prev.instructorName,
        instructorSubtitle: data.instructorSubtitle || prev.instructorSubtitle,
        instructorQuote: data.instructorQuote || prev.instructorQuote,
        instructorImage: data.instructorImage || '',

        bankAccountName: data.bankAccountName || prev.bankAccountName,
        bankAccountNumber: data.bankAccountNumber || prev.bankAccountNumber,
        bankName: data.bankName || prev.bankName,
        transferSyntax: data.transferSyntax || prev.transferSyntax,
        paymentQrImage: data.paymentQrImage || '',

        faqs: Array.isArray(data.faqs) && data.faqs.length > 0 ? data.faqs : defaultFaqs,

        footerHotline: data.footerHotline || prev.footerHotline,
        footerZalo: data.footerZalo || prev.footerZalo,
        footerEmail: data.footerEmail || prev.footerEmail,
        footerWebsite: data.footerWebsite || prev.footerWebsite,
        footerAddress: data.footerAddress || prev.footerAddress,
        footerCopyright: data.footerCopyright || prev.footerCopyright,
      }));
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Lỗi khi tải dữ liệu' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (field: keyof SiteSettingsData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Không thể cập nhật cấu hình' }));
        throw new Error(errorData.error || 'Lỗi cập nhật');
      }
      await queryClient.invalidateQueries({ queryKey: ['/api/site-settings'] });
      setMessage({
        type: 'success',
        text: 'Cập nhật cấu hình website thành công! Toàn bộ nội dung và biểu tượng đã đồng bộ với trang chủ.',
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Lỗi khi lưu cài đặt' });
    } finally {
      setSaving(false);
    }
  };

  // Chapter handlers
  const addChapter = () => {
    const nextId = form.chapters.length + 1;
    setForm((prev) => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        { id: nextId, title: `Chương ${nextId}: Tiêu đề chương mới`, lessons: ['Bài 1: Nội dung bài học'] },
      ],
    }));
  };

  const removeChapter = (cIdx: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa chương này?')) return;
    setForm((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((_, idx) => idx !== cIdx),
    }));
  };

  const updateChapterTitle = (cIdx: number, title: string) => {
    setForm((prev) => {
      const updated = [...prev.chapters];
      updated[cIdx] = { ...updated[cIdx], title };
      return { ...prev, chapters: updated };
    });
  };

  const addLesson = (cIdx: number) => {
    setForm((prev) => {
      const updated = [...prev.chapters];
      const lessons = [...(updated[cIdx].lessons || []), 'Bài mới: Nội dung bài học'];
      updated[cIdx] = { ...updated[cIdx], lessons };
      return { ...prev, chapters: updated };
    });
  };

  const removeLesson = (cIdx: number, lIdx: number) => {
    setForm((prev) => {
      const updated = [...prev.chapters];
      const lessons = updated[cIdx].lessons.filter((_, idx) => idx !== lIdx);
      updated[cIdx] = { ...updated[cIdx], lessons };
      return { ...prev, chapters: updated };
    });
  };

  const updateLesson = (cIdx: number, lIdx: number, val: string) => {
    setForm((prev) => {
      const updated = [...prev.chapters];
      const lessons = [...updated[cIdx].lessons];
      lessons[lIdx] = val;
      updated[cIdx] = { ...updated[cIdx], lessons };
      return { ...prev, chapters: updated };
    });
  };

  // Outcomes handlers
  const addOutcome = () => {
    setForm((prev) => ({
      ...prev,
      outcomes: [
        ...prev.outcomes,
        { id: Date.now(), text: 'Nội dung kết quả đạt được sau khóa học...', iconName: 'ShieldCheck' },
      ],
    }));
  };

  const removeOutcome = (index: number) => {
    setForm((prev) => ({
      ...prev,
      outcomes: prev.outcomes.filter((_, idx) => idx !== index),
    }));
  };

  const updateOutcome = (index: number, key: keyof OutcomeItem, val: any) => {
    setForm((prev) => {
      const list = [...prev.outcomes];
      list[index] = { ...list[index], [key]: val };
      return { ...prev, outcomes: list };
    });
  };

  // Audience handlers
  const addAudience = () => {
    setForm((prev) => ({
      ...prev,
      audiences: [
        ...prev.audiences,
        { id: Date.now(), text: 'Đối tượng phù hợp với khóa học...', iconName: 'HeartPulse' },
      ],
    }));
  };

  const removeAudience = (index: number) => {
    setForm((prev) => ({
      ...prev,
      audiences: prev.audiences.filter((_, idx) => idx !== index),
    }));
  };

  const updateAudience = (index: number, key: keyof AudienceItem, val: any) => {
    setForm((prev) => {
      const list = [...prev.audiences];
      list[index] = { ...list[index], [key]: val };
      return { ...prev, audiences: list };
    });
  };

  // Gifts handlers
  const addGift = () => {
    setForm((prev) => ({
      ...prev,
      gifts: [
        ...prev.gifts,
        { id: Date.now(), title: 'Tên món quà mới', value: '500.000đ', highlight: false, iconName: 'Gift' },
      ],
    }));
  };

  const removeGift = (index: number) => {
    setForm((prev) => ({
      ...prev,
      gifts: prev.gifts.filter((_, idx) => idx !== index),
    }));
  };

  const updateGift = (index: number, key: keyof GiftItem, val: any) => {
    setForm((prev) => {
      const list = [...prev.gifts];
      list[index] = { ...list[index], [key]: val };
      return { ...prev, gifts: list };
    });
  };

  // FAQ handlers
  const addFaq = () => {
    setForm((prev) => ({
      ...prev,
      faqs: [
        ...prev.faqs,
        { id: Date.now(), question: 'Câu hỏi mới?', answer: 'Câu trả lời chi tiết...', iconName: 'Sparkles' },
      ],
    }));
  };

  const removeFaq = (index: number) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, idx) => idx !== index),
    }));
  };

  const updateFaq = (index: number, key: keyof FaqItem, val: any) => {
    setForm((prev) => {
      const list = [...prev.faqs];
      list[index] = { ...list[index], [key]: val };
      return { ...prev, faqs: list };
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 pb-28">
      {/* HEADER NAV */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
            <img src="/assets/Logo_1787988875342.png" alt="Logo" className="h-8 w-auto object-contain" />
            <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">Hệ Thống Quản Trị ADN</span>
          </Link>
          <span className="hidden sm:inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            CMS Quản Trị
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/hethongquantriadn/settings"
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 shadow-2xs"
          >
            Cấu hình Website
          </Link>
          <Link
            href="/hethongquantriadn/posts"
            className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Tin tức & Bài viết
          </Link>
          <Link
            href="/hethongquantriadn"
            className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Đơn đăng ký
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors inline-flex items-center gap-1"
          >
            <Eye size={13} />
            <span className="hidden sm:inline">Xem</span> Website
          </a>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* PAGE HEADING */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="text-[11px] font-bold text-amber-700 uppercase tracking-widest">
              Bảng Điều Khiển Trung Tâm
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Cấu Hình Giao Diện & Nội Dung Trang Chủ
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Tùy biến trực tiếp lộ trình 4 chương, quà tặng, kết quả, biểu tượng icon và nội dung toàn trang.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchSettings}
              disabled={loading}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCcw size={13} className={loading ? 'animate-spin' : ''} />
              Tải lại
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={saving}
              className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-2xs inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 size={14} />
              {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
            </button>
          </div>
        </div>

        {/* NOTIFICATION MESSAGE */}
        {message && (
          <div
            className={`p-3.5 rounded-xl text-xs font-medium mb-6 flex items-center gap-2.5 ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{message.text}</span>
          </div>
        )}

        {/* TABS NAVIGATION */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-thin">
          {[
            { id: 'visibility', label: 'Bật/Tắt Section', icon: Sliders },
            { id: 'hero', label: 'Hero Banner', icon: Home },
            { id: 'learning', label: 'Sec 02: Lộ Trình (4 Chương)', icon: BookOpen },
            { id: 'outcomes', label: 'Sec 03: Kết Quả & Icon', icon: Target },
            { id: 'audience', label: 'Sec 04: Đối Tượng & Icon', icon: Users },
            { id: 'gifts', label: 'Sec 05: Quà Tặng & Icon', icon: Gift },
            { id: 'pricing', label: 'Sec 07: Học Phí & Khuyến Mãi', icon: Award },
            { id: 'instructor', label: 'Sec 06: Giảng Viên Đạt', icon: User },
            { id: 'payment', label: 'Sec 08: Tài Khoản & QR', icon: CreditCard },
            { id: 'faq', label: 'Sec 09: FAQ & Icon', icon: CircleHelp },
            { id: 'posts', label: '📰 Tin Tức & Bài Viết', icon: Newspaper },
            { id: 'footer', label: 'Footer & Liên Hệ', icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-2xs font-bold'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: BẬT / TẮT SECTION */}
        {activeTab === 'visibility' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-base font-bold text-slate-900">Quản Lý Hiển Thị (Bật / Tắt Từng Section)</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Bật hoặc tắt từng khối giao diện trên trang chủ ngay tức thì mà không cần xóa code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ToggleSwitch
                label="1. Hero Banner"
                description="Khối đầu trang: Tiêu đề, nút đăng ký & ảnh đại diện"
                checked={form.showHero}
                onChange={(v) => handleChange('showHero', v)}
              />
              <ToggleSwitch
                label="2. Lộ Trình Học"
                description="Toàn bộ 4 chương và 25 bài học thực chiến"
                checked={form.showLearningPath}
                onChange={(v) => handleChange('showLearningPath', v)}
              />
              <ToggleSwitch
                label="3. Kết Quả Sau Khóa Học"
                description="5 giá trị đạt được và biểu tượng minh họa"
                checked={form.showOutcomes}
                onChange={(v) => handleChange('showOutcomes', v)}
              />
              <ToggleSwitch
                label="4. Đối Tượng Phù Hợp"
                description="Ai là người phù hợp nhất để tham gia khóa học"
                checked={form.showAudience}
                onChange={(v) => handleChange('showAudience', v)}
              />
              <ToggleSwitch
                label="5. Quà Tặng Độc Quyền"
                description="Bộ quà tặng trị giá cao khi học viên đăng ký"
                checked={form.showBonus}
                onChange={(v) => handleChange('showBonus', v)}
              />
              <ToggleSwitch
                label="6. Giảng Viên Nguyễn Minh Đạt"
                description="Chân dung, tâm thư và kinh nghiệm thực chiến 11 năm"
                checked={form.showInstructor}
                onChange={(v) => handleChange('showInstructor', v)}
              />
              <ToggleSwitch
                label="7. Học Phí & Khuyến Mãi"
                description="Bảng giá ưu đãi 50% và đếm ngược sở hữu trọn đời"
                checked={form.showPricing}
                onChange={(v) => handleChange('showPricing', v)}
              />
              <ToggleSwitch
                label="8. Thanh Toán & QR"
                description="Thông tin số tài khoản và ảnh mã QR chuyển khoản"
                checked={form.showPayment}
                onChange={(v) => handleChange('showPayment', v)}
              />
              <ToggleSwitch
                label="9. Câu Hỏi Thường Gặp (FAQ)"
                description="Giải đáp các thắc mắc phổ biến trước khi đăng ký"
                checked={form.showFaq}
                onChange={(v) => handleChange('showFaq', v)}
              />
            </div>
          </div>
        )}

        {/* TAB 2: HERO BANNER */}
        {activeTab === 'hero' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">Hero Banner (Khu Vực Đầu Trang)</h2>
              <p className="text-xs text-slate-500 mt-0.5">Tiêu đề, thông điệp chính và nút kêu gọi hành động.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Badge nhỏ phía trên (Eyebrow)
                </label>
                <input
                  type="text"
                  value={form.heroBadge}
                  onChange={(e) => handleChange('heroBadge', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tiêu đề chính (Title)
                </label>
                <input
                  type="text"
                  value={form.heroTitle}
                  onChange={(e) => handleChange('heroTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tiêu đề phụ (Subtitle)
                </label>
                <input
                  type="text"
                  value={form.heroSubtitle}
                  onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Đoạn mô tả 1
                </label>
                <textarea
                  rows={3}
                  value={form.heroDescription1}
                  onChange={(e) => handleChange('heroDescription1', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Đoạn mô tả 2
                </label>
                <textarea
                  rows={3}
                  value={form.heroDescription2}
                  onChange={(e) => handleChange('heroDescription2', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nút CTA chính (Text & Link)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Text"
                    value={form.heroCtaText}
                    onChange={(e) => handleChange('heroCtaText', e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={form.heroCtaLink}
                    onChange={(e) => handleChange('heroCtaLink', e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nút phụ (Text & Link)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Text"
                    value={form.heroSecondaryCtaText}
                    onChange={(e) => handleChange('heroSecondaryCtaText', e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={form.heroSecondaryCtaLink}
                    onChange={(e) => handleChange('heroSecondaryCtaLink', e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LỘ TRÌNH HỌC (4 CHƯƠNG, 25 BÀI) */}
        {activeTab === 'learning' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Sec 02: Quản Lý Lộ Trình Học ({form.chapters.length} Chương)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quản lý đầy đủ cả 4 chương cùng 25 bài học thực chiến. Bạn có thể thêm, sửa, xóa bất kỳ bài học hoặc chương nào.
                </p>
              </div>
              <button
                type="button"
                onClick={addChapter}
                className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus size={14} /> Thêm Chương Mới
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tiêu đề phần lộ trình
              </label>
              <input
                type="text"
                value={form.learningPathTitle}
                onChange={(e) => handleChange('learningPathTitle', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-6">
              {form.chapters.map((chapter, cIdx) => (
                <div key={chapter.id || cIdx} className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-slate-50/50">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                        Chương {cIdx + 1}
                      </label>
                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) => updateChapterTitle(cIdx, e.target.value)}
                        className="w-full font-bold text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeChapter(cIdx)}
                      className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer mt-4"
                      title="Xóa chương này"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">
                        Danh sách bài học ({(chapter.lessons || []).length} bài)
                      </span>
                      <button
                        type="button"
                        onClick={() => addLesson(cIdx)}
                        className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={12} /> Thêm bài
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {(chapter.lessons || []).map((lesson, lIdx) => (
                        <div key={lIdx} className="flex items-center gap-2">
                          <span className="text-slate-400 text-xs w-5 text-right shrink-0">{lIdx + 1}.</span>
                          <input
                            type="text"
                            value={lesson}
                            onChange={(e) => updateLesson(cIdx, lIdx, e.target.value)}
                            className="flex-1 text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeLesson(cIdx, lIdx)}
                            className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                            title="Xóa bài học"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KẾT QUẢ ĐẠT ĐƯỢC (SECTION 03 & ICON) */}
        {activeTab === 'outcomes' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Sec 03: Kết Quả Sau Khóa Học ({form.outcomes.length} Mục)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tùy biến nội dung từng kết quả và chọn biểu tượng (Icon) hoặc dán link ảnh minh họa nhỏ tương ứng.
                </p>
              </div>
              <button
                type="button"
                onClick={addOutcome}
                className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus size={14} /> Thêm Kết Quả Mới
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tiêu đề Section 03
              </label>
              <input
                type="text"
                value={form.outcomesTitle}
                onChange={(e) => handleChange('outcomesTitle', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-4">
              {form.outcomes.map((item, index) => (
                <div
                  key={item.id || index}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="flex-1 w-full space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">Mục kết quả #{index + 1}</label>
                      <button
                        type="button"
                        onClick={() => removeOutcome(index)}
                        className="text-rose-500 hover:text-rose-700 text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={13} /> Xóa mục này
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={item.text}
                      onChange={(e) => updateOutcome(index, 'text', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="w-full md:w-80 shrink-0">
                    <IconPicker
                      value={item.iconName}
                      onChange={(val) => updateOutcome(index, 'iconName', val)}
                      title={`Biểu tượng Mục #${index + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ĐỐI TƯỢNG PHÙ HỢP (SECTION 04 & ICON) */}
        {activeTab === 'audience' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Sec 04: Đối Tượng Phù Hợp ({form.audiences.length} Đối Tượng)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tùy biến nội dung đối tượng và chọn biểu tượng (Icon) hoặc dán link ảnh minh họa nhỏ tương ứng.
                </p>
              </div>
              <button
                type="button"
                onClick={addAudience}
                className="px-3 py-1.5 text-xs font-bold text-purple-800 bg-purple-50 border border-purple-300 rounded-lg hover:bg-purple-100 inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus size={14} /> Thêm Đối Tượng Mới
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tiêu đề Section 04
              </label>
              <input
                type="text"
                value={form.audienceTitle}
                onChange={(e) => handleChange('audienceTitle', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-4">
              {form.audiences.map((item, index) => (
                <div
                  key={item.id || index}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="flex-1 w-full space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">Đối tượng #{index + 1}</label>
                      <button
                        type="button"
                        onClick={() => removeAudience(index)}
                        className="text-rose-500 hover:text-rose-700 text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={13} /> Xóa mục này
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={item.text}
                      onChange={(e) => updateAudience(index, 'text', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="w-full md:w-80 shrink-0">
                    <IconPicker
                      value={item.iconName}
                      onChange={(val) => updateAudience(index, 'iconName', val)}
                      title={`Biểu tượng Mục #${index + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: QUÀ TẶNG ĐỘC QUYỀN (SECTION 05 & ICON) */}
        {activeTab === 'gifts' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Sec 05: Quà Tặng Độc Quyền ({form.gifts.length} Món Quà)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tùy biến tên quà tặng, giá trị, nhãn nổi bật và icon đại diện.
                </p>
              </div>
              <button
                type="button"
                onClick={addGift}
                className="px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-300 rounded-lg hover:bg-amber-100 inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus size={14} /> Thêm Quà Tặng Mới
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tiêu đề Section 05
              </label>
              <input
                type="text"
                value={form.bonusTitle}
                onChange={(e) => handleChange('bonusTitle', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-4">
              {form.gifts.map((gift, index) => (
                <div
                  key={gift.id || index}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="flex-1 w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">Món quà #{index + 1}</label>
                      <button
                        type="button"
                        onClick={() => removeGift(index)}
                        className="text-rose-500 hover:text-rose-700 text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={13} /> Xóa quà tặng
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Tên quà tặng"
                        value={gift.title}
                        onChange={(e) => updateGift(index, 'title', e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Trị giá (ví dụ: 1.000.000đ, Vô giá...)"
                          value={gift.value || ''}
                          onChange={(e) => updateGift(index, 'value', e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 shrink-0">
                        <input
                          type="checkbox"
                          checked={Boolean(gift.highlight)}
                          onChange={(e) => updateGift(index, 'highlight', e.target.checked)}
                          className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                        />
                        Nổi bật (Highlight)
                      </label>
                    </div>
                  </div>

                  <div className="w-full md:w-80 shrink-0">
                    <IconPicker
                      value={gift.iconName}
                      onChange={(val) => updateGift(index, 'iconName', val)}
                      title={`Icon Quà #${index + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: HỌC PHÍ & BẢNG GIÁ */}
        {activeTab === 'pricing' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">Sec 07: Bảng Giá & Học Phí</h2>
              <p className="text-xs text-slate-500 mt-0.5">Mức học phí ưu đãi, giá gốc và nhãn ưu đãi.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tiêu đề bảng giá
                </label>
                <input
                  type="text"
                  value={form.pricingTitle}
                  onChange={(e) => handleChange('pricingTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Học phí gốc (Gạch ngang)
                </label>
                <input
                  type="text"
                  value={form.tuitionOriginal}
                  onChange={(e) => handleChange('tuitionOriginal', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Học phí ưu đãi hôm nay
                </label>
                <input
                  type="text"
                  value={form.tuitionSale}
                  onChange={(e) => handleChange('tuitionSale', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-amber-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nhãn thông báo ưu đãi / Giảm giá
                </label>
                <input
                  type="text"
                  value={form.tuitionDiscountLabel}
                  onChange={(e) => handleChange('tuitionDiscountLabel', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ghi chú dưới giá
                </label>
                <input
                  type="text"
                  value={form.tuitionNote}
                  onChange={(e) => handleChange('tuitionNote', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: GIẢNG VIÊN */}
        {activeTab === 'instructor' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">Sec 06: Thông Tin Giảng Viên</h2>
              <p className="text-xs text-slate-500 mt-0.5">Tên, danh xưng, tâm thư và ảnh đại diện giảng viên.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Họ và tên giảng viên
                </label>
                <input
                  type="text"
                  value={form.instructorName}
                  onChange={(e) => handleChange('instructorName', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Danh xưng / Phụ đề
                </label>
                <input
                  type="text"
                  value={form.instructorSubtitle}
                  onChange={(e) => handleChange('instructorSubtitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tâm thư / Lời nhắn nhủ học viên
                </label>
                <textarea
                  rows={4}
                  value={form.instructorQuote}
                  onChange={(e) => handleChange('instructorQuote', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Link ảnh chân dung giảng viên
                </label>
                <input
                  type="text"
                  placeholder="https://... hoặc đường dẫn ảnh"
                  value={form.instructorImage}
                  onChange={(e) => handleChange('instructorImage', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">Để trống nếu dùng ảnh mặc định của hệ thống.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: TÀI KHOẢN & THANH TOÁN */}
        {activeTab === 'payment' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">Sec 08: Tài Khoản & Mã QR Thanh Toán</h2>
              <p className="text-xs text-slate-500 mt-0.5">Thông tin tài khoản ngân hàng và mã QR hiển thị ở bước đăng ký học.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tên ngân hàng
                </label>
                <input
                  type="text"
                  value={form.bankName}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Số tài khoản
                </label>
                <input
                  type="text"
                  value={form.bankAccountNumber}
                  onChange={(e) => handleChange('bankAccountNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tên chủ tài khoản
                </label>
                <input
                  type="text"
                  value={form.bankAccountName}
                  onChange={(e) => handleChange('bankAccountName', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Cú pháp chuyển khoản gợi ý
                </label>
                <input
                  type="text"
                  value={form.transferSyntax}
                  onChange={(e) => handleChange('transferSyntax', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Link ảnh QR Code thanh toán
                </label>
                <input
                  type="text"
                  placeholder="https://... hoặc đường dẫn ảnh QR"
                  value={form.paymentQrImage}
                  onChange={(e) => handleChange('paymentQrImage', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: FAQ & ICON */}
        {activeTab === 'faq' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Sec 09: Câu Hỏi Thường Gặp FAQ ({form.faqs.length} Câu Hỏi)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Thêm, sửa câu hỏi đáp và tùy biến biểu tượng icon mở đầu từng câu hỏi.
                </p>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="px-3 py-1.5 text-xs font-bold text-violet-800 bg-violet-50 border border-violet-300 rounded-lg hover:bg-violet-100 inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus size={14} /> Thêm Câu Hỏi Mới
              </button>
            </div>

            <div className="space-y-4">
              {form.faqs.map((faq, index) => (
                <div
                  key={faq.id || index}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="flex-1 w-full space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">Câu hỏi #{index + 1}</label>
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="text-rose-500 hover:text-rose-700 text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={13} /> Xóa câu hỏi
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Nội dung câu hỏi"
                      value={faq.question}
                      onChange={(e) => updateFaq(index, 'question', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />

                    <textarea
                      rows={3}
                      placeholder="Nội dung câu trả lời"
                      value={faq.answer}
                      onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="w-full md:w-80 shrink-0">
                    <IconPicker
                      value={faq.iconName}
                      onChange={(val) => updateFaq(index, 'iconName', val)}
                      title={`Icon Câu Hỏi #${index + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 11: TIN TỨC & BÀI VIẾT */}
        {activeTab === 'posts' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Newspaper className="text-emerald-600" size={20} />
                <h2 className="text-base font-bold text-slate-900">Quản Lý Tin Tức & Bài Viết Chia Sẻ</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Hệ thống CMS cho phép bạn viết bài viết kiến thức, mẹo Diện Chẩn, tải ảnh trực tiếp và xuất bản ngay lên website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <FileText size={18} />
                  <span>Soạn Thảo Bài Viết Mới</span>
                </div>
                <p className="text-xs text-emerald-900/80 leading-relaxed">
                  Tạo bài viết mới với hỗ trợ định dạng Markdown, chèn nhiều ảnh vào nội dung và chọn trạng thái Bản nháp hoặc Xuất bản.
                </p>
                <Link
                  href="/hethongquantriadn/posts/new"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                >
                  <Plus size={14} /> + Soạn bài viết mới
                </Link>
              </div>

              <div className="border border-slate-200 bg-slate-50/60 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                  <BookOpen size={18} />
                  <span>Danh Sách & Quản Lý Bài Đã Đăng</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Xem toàn bộ danh sách bài viết tin tức, chỉnh sửa nội dung, thay đổi ảnh đại diện hoặc xóa bài viết.
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href="/hethongquantriadn/posts"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                  >
                    Xem tất cả bài viết
                  </Link>
                  <Link
                    href="/tin-tuc"
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
                  >
                    <ExternalLink size={13} />
                    Xem trang /tin-tuc
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-600" />
                Mẹo hay khi đăng bài Tin tức:
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                <li>Ảnh tải lên sẽ tự động được lưu trữ và tối ưu trên máy chủ.</li>
                <li>Hỗ trợ tiêu đề phụ (<code># Tiêu đề</code>), in đậm (<code>**chữ đậm**</code>), danh sách gạch đầu dòng.</li>
                <li>Người xem có thể đọc trực tiếp tại trang chủ và mục Tin Tức trên thanh điều hướng.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 12: FOOTER & LIÊN HỆ */}
        {activeTab === 'footer' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">Footer & Thông Tin Liên Hệ</h2>
              <p className="text-xs text-slate-500 mt-0.5">Số điện thoại, Zalo, địa chỉ và thông tin bản quyền chân trang.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hotline
                </label>
                <input
                  type="text"
                  value={form.footerHotline}
                  onChange={(e) => handleChange('footerHotline', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Số Zalo tư vấn
                </label>
                <input
                  type="text"
                  value={form.footerZalo}
                  onChange={(e) => handleChange('footerZalo', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email hỗ trợ
                </label>
                <input
                  type="text"
                  value={form.footerEmail}
                  onChange={(e) => handleChange('footerEmail', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tên miền website
                </label>
                <input
                  type="text"
                  value={form.footerWebsite}
                  onChange={(e) => handleChange('footerWebsite', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Địa chỉ văn phòng
                </label>
                <input
                  type="text"
                  value={form.footerAddress}
                  onChange={(e) => handleChange('footerAddress', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Dòng chữ bản quyền (Copyright)
                </label>
                <input
                  type="text"
                  value={form.footerCopyright}
                  onChange={(e) => handleChange('footerCopyright', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FLOATING BOTTOM SAVE BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between z-30 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-slate-600 font-medium hidden sm:inline">
            {saving ? 'Đang lưu vào cơ sở dữ liệu...' : 'Các thay đổi sẽ có hiệu lực ngay trên trang chủ sau khi lưu.'}
          </span>
          <span className="text-xs text-slate-600 font-medium sm:hidden">
            {saving ? 'Đang lưu...' : 'Sẵn sàng lưu'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchSettings}
            disabled={saving}
            className="px-3 sm:px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCcw size={13} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Hoàn tác</span>
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={saving}
            className="px-4 sm:px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-lg shadow-2xs transition-all inline-flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <RefreshCcw size={14} className="animate-spin" />
                ĐANG LƯU...
              </>
            ) : (
              <>
                <CheckCircle2 size={15} />
                LƯU TẤT CẢ CẤU HÌNH
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
