import './_group.css';

const assets = {
  hero: '/__mockup/images/Section_1a_1787988875343.png',
  classOne: '/__mockup/images/Section_1b_1787988875344.jpg',
  classTwo: '/__mockup/images/Section_1c_1787988875344.jpg',
};

export function Current() {
  return (
    <main className="dien-chan-preview current">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">KHÓA HỌC DIỆN CHẨN ONLINE</div>
            <h1>CHỈ VỚI 15 PHÚT <span>MỖI NGÀY</span> THÔNG THẠO NHIỀU TUYỆT CHIÊU!</h1>
            <p className="hero-lead">Giải Pháp Chăm Sóc Sức Khỏe Tự Nhiên Dành Cho Người Bận Rộn</p>
            <p className="hero-description">Khóa học như một “chìa khóa” giúp kích hoạt hệ thống tự chữa lành tự nhiên vốn đã được lập trình sẵn trong cơ thể.</p>
            <p className="hero-description">Khóa học Online <strong>“DIỆN CHẨN KÍCH HOẠT ADN TỰ CHỮA LÀNH”.</strong> Đóng gói trọn bộ 25 bài giảng thực chiến giúp bạn khai thông ách tắc tại nhà.</p>
            <div className="value-bullets">
              <div className="value-bullet"><span className="check">✓</span><span>Cắt đứt nhanh chóng những triệu chứng khó chịu đeo bám dai dẳng hằng ngày.</span></div>
              <div className="value-bullet"><span className="check">✓</span><span>Chuẩn hóa quy trình từng bước, dễ nhớ, dễ làm và thấy ngay kết quả.</span></div>
              <div className="value-bullet"><span className="check">✓</span><span>Sở hữu kỹ năng chăm sóc sức khỏe chủ động trọn đời cho bản thân, cha mẹ và con cái.</span></div>
            </div>
            <div className="hero-actions">
              <span className="cta">ĐĂNG KÝ HỌC NGAY</span>
              <span className="ghost-btn">Xem lộ trình <span aria-hidden="true">→</span></span>
            </div>
            <div className="trust-row">
              <div><strong>11+</strong>Năm Kinh Nghiệm</div>
              <div><strong>500+</strong>Học Viên Đào Tạo Trực Tiếp</div>
              <div><strong>1.000+</strong>Ca Phục Hồi</div>
            </div>
          </div>
          <div className="hero-collage">
            <img className="hero-image-main" src={assets.hero} alt="Nguyễn Minh Đạt chia sẻ trong lớp học" />
            <img className="hero-image-small" src={assets.classOne} alt="Học viên thực hành Diện Chẩn" />
            <img className="hero-image-third" src={assets.classTwo} alt="Học viên học cùng giảng viên" />
            <div className="hero-stamp" aria-label="Học tại nhà">HỌC<br />TẠI NHÀ<br />✓</div>
          </div>
        </div>
      </section>
    </main>
  );
}