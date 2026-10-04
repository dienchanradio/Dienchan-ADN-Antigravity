import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { SiZalo } from 'react-icons/si';
import './zalo-contact.css';

const ZALO_PROFILE_URL = 'https://zalo.me/0919994282';
const ZALO_QR_URL = `${import.meta.env.BASE_URL}assets/zalo-contact-qr.jpg`;

export function ZaloContactWidget() {
  const marker = useRef<HTMLSpanElement>(null);
  const qrDialog = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    const section = marker.current?.closest('section');
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setSeen(true);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = qrDialog.current;
    if (!dialog) return;
    if (qrOpen && !dialog.open) dialog.showModal();
    else if (!qrOpen && dialog.open) dialog.close();
  }, [qrOpen]);

  return (
    <>
      <span ref={marker} aria-hidden="true" />
      {seen && (visible || !dismissed) && (
        <div className={`zalo-floater ${visible ? 'zalo-floater-roaming' : 'zalo-floater-docked'}`}>
          <button
            type="button"
            className="zalo-floater-link"
            onClick={() => setQrOpen(true)}
            aria-label="Mở bảng kết bạn Zalo"
            title="Kết bạn Zalo"
          >
            <SiZalo size={36} aria-hidden="true" />
          </button>
          {!visible && (
            <button
              type="button"
              className="zalo-floater-close"
              aria-label="Ẩn nút Zalo"
              onClick={() => setDismissed(true)}
            >
              ×
            </button>
          )}
        </div>
      )}

      <dialog
        ref={qrDialog}
        className="zalo-qr-dialog"
        aria-labelledby="zalo-qr-title"
        onClose={() => setQrOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setQrOpen(false);
        }}
      >
        <div className="zalo-qr-content">
          <button
            type="button"
            className="zalo-qr-close"
            onClick={() => setQrOpen(false)}
            aria-label="Đóng mã QR Zalo"
          >
            <X size={19} aria-hidden="true" />
          </button>
          <div className="zalo-qr-heading">
            <span className="zalo-qr-eyebrow">Diện Chẩn Boutique</span>
            <h2 id="zalo-qr-title">Kết bạn Zalo</h2>
            <p>Quét mã bằng ứng dụng Zalo để kết bạn và trò chuyện.</p>
          </div>
          <img
            className="zalo-qr-image"
            src={ZALO_QR_URL}
            width="984"
            height="1200"
            alt="Mã QR Zalo của Mr Nguyễn"
          />
          <p className="zalo-qr-phone">Zalo: 091.999.4282</p>
          <a className="zalo-qr-open-link" href={ZALO_PROFILE_URL} target="_blank" rel="noopener noreferrer">
            Mở Zalo để kết bạn
          </a>
        </div>
      </dialog>
    </>
  );
}