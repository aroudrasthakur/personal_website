import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function EmailPopup() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText('aroudra.thakur@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="contact-card-btn"
        aria-label="Show email address"
      >
        <span className="contact-card-icon">📧</span>
        <span>Email</span>
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            className="dialog-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setShow(false); }}
            onKeyDown={(e) => { if (e.key === 'Escape') setShow(false); }}
          >
            <motion.div
              className="dialog-content"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>📧 Email Address</h3>
              <div
                style={{
                  background: 'var(--bg-primary)',
                  padding: '0.875rem 1.5rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '1.1rem',
                  color: 'var(--accent)',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--border)',
                  fontFamily: 'monospace',
                }}
              >
                aroudra.thakur@gmail.com
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button onClick={copyEmail} className="glow-button" style={{ fontSize: '0.9rem', padding: '0.7rem 1.5rem' }}>
                  {copied ? '✓ Copied!' : 'Copy Email'}
                </button>
                <button
                  onClick={() => setShow(false)}
                  style={{
                    padding: '0.7rem 1.5rem',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-secondary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .contact-card-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.75rem;
          background: linear-gradient(135deg, rgba(22, 22, 22, 0.9), rgba(22, 22, 22, 0.6));
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          font-family: inherit;
        }
        .contact-card-btn:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 255, 136, 0.08);
        }
        .contact-card-icon { font-size: 1.25rem; }
      `}</style>
    </>
  );
}
