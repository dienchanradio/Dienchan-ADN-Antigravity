-- =========================================================================
-- DIỆN CHẨN BOUTIQUE - MIGRATION: BẢNG SITE_SETTINGS CHO POSTGRESQL 16
-- Host: Vibe Host (Mắt Bão) - Database: khoahocdienchan
-- =========================================================================

CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,

    -- 1. BẬT / TẮT SECTION TRỰC TIẾP TRÊN WEB
    show_hero BOOLEAN NOT NULL DEFAULT TRUE,
    show_learning_path BOOLEAN NOT NULL DEFAULT TRUE,
    show_outcomes BOOLEAN NOT NULL DEFAULT TRUE,
    show_audience BOOLEAN NOT NULL DEFAULT TRUE,
    show_bonus BOOLEAN NOT NULL DEFAULT TRUE,
    show_instructor BOOLEAN NOT NULL DEFAULT TRUE,
    show_pricing BOOLEAN NOT NULL DEFAULT TRUE,
    show_payment BOOLEAN NOT NULL DEFAULT TRUE,
    show_faq BOOLEAN NOT NULL DEFAULT TRUE,

    -- 2. HERO BANNER (ĐẦU TRANG)
    hero_badge TEXT DEFAULT 'KHÓA HỌC DIỆN CHẨN ONLINE',
    hero_title TEXT NOT NULL DEFAULT 'CHỈ VỚI 15 PHÚT MỖI NGÀY THÔNG THẠO NHIỀU TUYỆT CHIÊU!',
    hero_subtitle TEXT DEFAULT 'Giải Pháp Chăm Sóc Sức Khỏe Tự Nhiên Dành Cho Người Bận Rộn',
    hero_description_1 TEXT DEFAULT 'Khóa học như một “chìa khóa” giúp kích hoạt hệ thống tự chữa lành tự nhiên vốn đã được lập trình sẵn trong cơ thể.',
    hero_description_2 TEXT DEFAULT 'Khóa học Online “DIỆN CHẨN KÍCH HOẠT ADN TỰ CHỮA LÀNH”. Đóng gói trọn bộ 25 bài giảng thực chiến thành video giúp bạn khai thông ách tắc tại nhà.',
    hero_cta_text TEXT DEFAULT 'ĐĂNG KÝ HỌC NGAY',
    hero_cta_link TEXT DEFAULT '#thanh-toan',
    hero_secondary_cta_text TEXT DEFAULT 'XEM LỘ TRÌNH',
    hero_secondary_cta_link TEXT DEFAULT '#lo-trinh',
    hero_image_main TEXT DEFAULT '',

    -- 3. LỘ TRÌNH TRỞ THÀNH CHUYÊN NGHIỆP (JSONB: CÁC CHƯƠNG & BÀI HỌC ĐỘNG)
    learning_path_title TEXT DEFAULT 'LỘ TRÌNH THÀNH CHUYÊN NGHIỆP',
    chapters JSONB NOT NULL DEFAULT '[
        {
            "id": 1,
            "title": "Chương 1: Nền Tảng Nhập Môn (7 bài)",
            "lessons": [
                "Bài 1: Hành trình khám phá câu chuyện về Thầy Tổ.",
                "Bài 2: Diện Chẩn – Điều Khiển Liệu Pháp là gì?",
                "Bài 3: Giải mã hệ thống Huyệt đạo – Đồ hình – Dụng cụ Diện Chẩn.",
                "Bài 4: Tư thế chuẩn hạn chế khí trượt đảo chiều.",
                "Bài 5: Gia tăng hiệu quả khi dùng huyệt Diện Chẩn.",
                "Bài 6: Cẩm nang sử dụng dụng cụ.",
                "Bài 7: Dùng ngải cứu đúng Thời."
            ]
        },
        {
            "id": 2,
            "title": "Chương 2: Kích hoạt cơ chế tự chữa lành (4 bài)",
            "lessons": [
                "Bài 8: Chăm sóc sức khỏe toàn diện",
                "Bài 9: Đánh thức “ngân hàng thuốc” tiềm ẩn trong cơ thể.",
                "Bài 10: Tăng sức đề kháng và chống viêm bằng thao tác đơn giản.",
                "Bài 11: Những nguyên tắc vàng trong Diện Chẩn."
            ]
        },
        {
            "id": 3,
            "title": "Chương 3: Đọc vị cơ thể, xử lý tình huống (8 bài)",
            "lessons": [
                "Bài 12: Vọng – Văn – Vấn – Thiết trong Diện Chẩn truy tìm nguồn gốc",
                "Bài 13: Kỹ năng phòng bệnh chủ động.",
                "Bài 14: Cấp cứu nhanh những tình huống khẩn cấp.",
                "Bài 15: Xử lý hiện tượng huyết áp bất thường.",
                "Bài 16: Xác định chính xác vị trí huyệt cơ bản.",
                "Bài 17: Khai thông huyệt đạo.",
                "Bài 18: Nâng tầm kỹ năng khai thông huyệt đạo.",
                "Bài 19: Ứng dụng Ngũ hành tương sinh – tương khắc trong Diện Chẩn."
            ]
        },
        {
            "id": 4,
            "title": "Chương 4: Chinh phục 7 cửa ải thành chuyên gia (7 bài)",
            "lessons": [
                "Bài 20: Phác đồ Chu Thiên Toàn Diện – Cân bằng năng lượng toàn thân.",
                "Bài 21: Phác đồ Đa Năng – Giải pháp đa triệu chứng.",
                "Bài 22: Đẩy lùi rối loạn tiền đình bằng Diện Chẩn.",
                "Bài 23: Gỡ nút thắt thoái hóa – gai – thoát vị đốt sống cổ.",
                "Bài 24: Chấm dứt cơn đau đầu không dùng thuốc.",
                "Bài 25: Giải phóng cứng cổ vai gáy nhanh chóng."
            ]
        }
    ]'::jsonb,

    -- 4. KẾT QUẢ ĐẠT ĐƯỢC (JSONB: SECTION 03 & ICON MINH HỌA)
    outcomes_title TEXT DEFAULT 'SAU KHÓA HỌC THÌ BẠN SẼ:',
    outcomes JSONB NOT NULL DEFAULT '[
        {"id": 1, "text": "Có khả năng tự nhận biết, đọc hiểu các dấu hiệu bất thường trên mặt và cơ thể để dự phòng bệnh tật, chăm sóc bản thân một cách an toàn và tiết kiệm.", "iconName": "ScanFace"},
        {"id": 2, "text": "Thành thạo các thao tác khai thông khí huyết và các phác đồ xử lý triệu chứng.", "iconName": "HeartPulse"},
        {"id": 3, "text": "Xây dựng lối sống lành mạnh, chủ động giúp dân văn phòng và freelancer cân bằng lại nhịp sống bận rộn, giảm stress áp lực công việc.", "iconName": "Leaf"},
        {"id": 4, "text": "Hiểu rõ mối liên hệ giữa các phản chiếu trên gương mặt với cơ quan nội tạng bên trong cơ thể.", "iconName": "Brain"},
        {"id": 5, "text": "Sở hữu một “kỹ năng sinh tồn” thời đại số, trang bị thêm một năng lực tự chủ về sức khỏe nâng cao hiệu suất làm việc mỗi ngày.", "iconName": "ShieldCheck"}
    ]'::jsonb,

    -- 5. ĐỐI TƯỢNG PHÙ HỢP (JSONB: SECTION 04 & ICON MINH HỌA)
    audience_title TEXT DEFAULT 'AI SẼ CẦN KHÓA HỌC NÀY!',
    audiences JSONB NOT NULL DEFAULT '[
        {"id": 1, "text": "Muốn giải quyết trọn bộ triệu chứng khó chịu từ nửa thân người trên như: cổ vai gáy, tiền đình, đốt sống cổ, viêm xoang...", "iconName": "HeartPulse"},
        {"id": 2, "text": "Tiết kiệm thời gian và không muốn dùng thuốc, muốn chủ động tự chăm sóc bản thân chỉ với 10-15 phút thực hành mỗi ngày.", "iconName": "Timer"},
        {"id": 3, "text": "Học một kỹ năng thực chiến không chỉ giúp ích cho bản thân mà còn chủ động hỗ trợ những người thân yêu (ông bà, cha mẹ, bạn bè...).", "iconName": "HandHeart"},
        {"id": 4, "text": "Thỏa mãn đam mê khám phá kiến thức mới mẻ, hiện đại, tự kích hoạt khả năng tự chữa lành tự nhiên, là một “món ăn tinh thần” hoàn toàn mới lạ, khoa học nhưng gần gũi, giúp mở rộng tư duy về chăm sóc sức khỏe toàn diện.", "iconName": "Telescope"}
    ]'::jsonb,

    -- 6. BỘ QUÀ TẶNG ĐỘC QUYỀN (JSONB)
    bonus_title TEXT DEFAULT 'BỘ 6 MÓN QUÀ ĐỘC QUYỀN KHI ĐĂNG KÝ!',
    gifts JSONB NOT NULL DEFAULT '[
        {"id": 1, "title": "Hỗ trợ 1:1 qua nhóm cộng đồng", "value": "Vô giá", "highlight": true, "iconName": "Headset"},
        {"id": 2, "title": "Miễn phí tham gia các buổi học online nâng cao", "value": "1.000.000đ", "highlight": false, "iconName": "MonitorPlay"},
        {"id": 3, "title": "Ebook độc quyền nhiều tuyệt chiêu", "value": "350.000đ", "highlight": false, "iconName": "BookOpenText"},
        {"id": 4, "title": "Nâng cấp tài khoản 1 năm thành trọn đời", "value": "1.500.000đ", "highlight": true, "iconName": "Infinity"},
        {"id": 5, "title": "Bộ checklist quy trình chăm sóc sức khỏe", "value": "200.000đ", "highlight": false, "iconName": "ClipboardCheck"},
        {"id": 6, "title": "Bản đồ tư duy lộ trình học.", "value": "300.000đ", "highlight": false, "iconName": "Map"}
    ]'::jsonb,

    -- 5. BẢNG GIÁ & HỌC PHÍ
    pricing_title TEXT DEFAULT 'BẢNG GIÁ SỞ HỮU KHÓA HỌC TRỌN ĐỜI',
    tuition_original TEXT NOT NULL DEFAULT '1.750.000 VNĐ',
    tuition_sale TEXT NOT NULL DEFAULT '875.000 VNĐ',
    tuition_discount_label TEXT DEFAULT 'Giá đang ưu đãi tri ân học viên hiện đang cực tốt lên tới 50%, chương trình này có thể kết thúc trước thời hạn!',
    tuition_note TEXT DEFAULT 'Ưu đãi độc quyền hôm nay (Học trọn đời — Toàn bộ 25 bài học + 6 Quà tặng)',

    -- 6. THÔNG TIN GIẢNG VIÊN
    instructor_name TEXT DEFAULT 'NGUYỄN MINH ĐẠT',
    instructor_subtitle TEXT DEFAULT 'NGƯỜI THỔI HỒN VÀO HÀNH TRÌNH TỰ CHỮA LÀNH CỦA BẠN',
    instructor_quote TEXT DEFAULT '“Với tôi, Diện Chẩn không chỉ là một phương pháp chăm sóc sức khỏe, mà là một sự nghiệp tâm huyết và là phong cách sống suốt hơn 11 năm qua. Khóa học Online này được tôi ấp ủ và đóng gói với mục tiêu: Dù bạn ở bất kỳ đâu, bận rộn đến đâu, cũng có thể tiếp cận tinh hoa Diện Chẩn một cách đơn giản.”',
    instructor_image TEXT DEFAULT '',

    -- 7. THÔNG TIN CHUYỂN KHOẢN NGÂN HÀNG & QR
    bank_account_name TEXT DEFAULT 'Nguyễn Minh Đạt',
    bank_account_number TEXT DEFAULT '36810000254898',
    bank_name TEXT DEFAULT 'BIDV',
    transfer_syntax TEXT DEFAULT 'Họ tên + SDT + ADN',
    payment_qr_image TEXT DEFAULT '',

    -- 8. CÂU HỎI THƯỜNG GẶP (FAQ JSONB)
    faqs JSONB NOT NULL DEFAULT '[
        {
            "id": 1,
            "question": "Tôi chưa từng học y học cổ truyền hay bấm huyệt bao giờ thì có học được không?",
            "answer": "Hoàn toàn được! Khóa học được thiết kế từ số 0, dùng ngôn ngữ hiện đại, đồ hình trực quan và hướng dẫn từng động tác rất chi tiết, ai cũng có thể làm theo dễ dàng."
        },
        {
            "id": 2,
            "question": "Tôi học online như thế nào và thời hạn xem video là bao lâu?",
            "answer": "Sau khi thanh toán và được admin kích hoạt, bạn đăng nhập vào website để học trên nền tảng video chuyên biệt. Bạn được tặng ngay gói sở hữu và xem lại trọn đời mọi lúc, mọi nơi trên điện thoại hay máy tính."
        },
        {
            "id": 3,
            "question": "Khi thực hành nếu không tìm đúng huyệt hoặc có thắc mắc thì ai hỗ trợ?",
            "answer": "Bạn sẽ được tham gia nhóm hỗ trợ độc quyền và các buổi Zoom trực tiếp cùng Nguyễn Minh Đạt để được giải đáp và hướng dẫn tỉ mỉ."
        },
        {
            "id": 4,
            "question": "Có bắt buộc phải có dụng cụ đầy đủ không?",
            "answer": "Bạn hoàn toàn có thể dùng các vật dụng sẵn có như đầu ngón tay, chìa khóa... để làm ngay."
        }
    ]'::jsonb,

    -- 9. FOOTER & LIÊN HỆ
    footer_hotline TEXT DEFAULT '091.999.4282',
    footer_zalo TEXT DEFAULT '091.999.4282',
    footer_email TEXT DEFAULT 'dienchanboutique@gmail.com',
    footer_website TEXT DEFAULT 'www.khoahocdienchan.com',
    footer_address TEXT DEFAULT 'VP Diện Chẩn Vì Cộng Đồng – Chi Nhánh Q.1 (Diện Chẩn Boutique), TP. Hồ Chí Minh',
    footer_copyright TEXT DEFAULT 'Copyright 2026 Bản quyền thuộc về Nguyễn Minh Đạt. All rights reserved.',

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Khởi tạo bản ghi cấu hình id = 1 đầu tiên nếu chưa có
INSERT INTO site_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;
