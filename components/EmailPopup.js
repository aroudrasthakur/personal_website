import { useEffect } from 'react';

export default function EmailPopup({ show, onClose }) {
  useEffect(() => {
    function onKey(e){ if(e.key === 'Escape') onClose(); }
    if (show) window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [show, onClose]);

  if (!show) return null;
  return (
    <div className="email-popup show" id="emailPopup" onClick={(e)=>{ if(e.target === e.currentTarget) onClose(); }}>
      <div className="popup-content">
        <h3>📧 Email Address</h3>
        <div className="email-display">aroudra.thakur@gmail.com</div>
        <div className="popup-buttons">
          <button className="popup-button copy-button" onClick={() => { navigator.clipboard.writeText('aroudra.thakur@gmail.com'); }}>
            Copy Email
          </button>
          <button className="popup-button close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}