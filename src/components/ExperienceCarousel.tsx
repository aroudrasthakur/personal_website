import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import type { Experience } from '@/lib/data';
import { formatDate } from '@/lib/data';

interface ExperienceCarouselProps {
  items: Experience[];
  ctaHref?: string;
  ctaLabel?: string;
}

function parseBullets(raw: string): string[] {
  return raw.split('➤').map((s) => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
}

function HighlightedText({ text }: { text: string }) {
  const regex = /(\d+(?:\.\d+)?(?:%|\+|°|x|ms|[KMB]\+?)?(?!\w))/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(<span key={match.index} className="exp-metric">{match[0]}</span>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="exp-modal-section-row">
      <span className="exp-modal-section-label">{children}</span>
      <div className="exp-modal-section-rule" />
    </div>
  );
}

function ExperienceModal({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  const isCurrent = exp.endDate === null;
  const bullets = exp.longDescription ? parseBullets(exp.longDescription) : [];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="exp-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="exp-modal"
        role="dialog"
        aria-modal="true"
        aria-label={exp.title}
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* top gradient strip */}
        <div className="exp-modal-strip" />

        {/* header */}
        <div className="exp-modal-header">
          <div className="exp-modal-header-glow" aria-hidden="true" />

          <div className="exp-modal-logo-wrap">
            <div className={`exp-modal-logo-shell${isCurrent ? ' is-current' : ''}`}>
              {exp.logoPath ? (
                <img src={exp.logoPath} alt="" className="exp-modal-logo" loading="lazy" decoding="async" />
              ) : (
                <span className="exp-logo-fallback">
                  {exp.company.split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div className="exp-modal-meta">
            <div className="exp-modal-title-row">
              <h3 className="exp-modal-title">{exp.title}</h3>
              {isCurrent && <span className="exp-modal-badge">Active</span>}
            </div>
            <div className="exp-modal-company">{exp.company}</div>
            <div className="exp-modal-date">
              {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
            </div>
          </div>

          <button className="exp-modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="exp-modal-body">
          {/* highlights */}
          {bullets.length > 0 ? (
            <>
              <SectionLabel>Highlights</SectionLabel>
              <ul className="exp-bullet-list">
                {bullets.map((bullet, i) => (
                  <li key={i} className="exp-bullet-item">
                    <span className="exp-bullet-marker" aria-hidden="true">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 1.5L7.5 4.5L1.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="exp-bullet-text">
                      <HighlightedText text={bullet} />
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="exp-modal-placeholder">Full description coming soon.</p>
          )}

          {/* tech stack */}
          <SectionLabel>Tech Stack</SectionLabel>
          <div className="exp-modal-tech">
            {exp.technologies.map((tech) => (
              <span key={tech} className="exp-modal-tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        .exp-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .exp-modal {
          position: relative;
          background: linear-gradient(160deg, rgba(11, 17, 28, 0.99), rgba(7, 10, 18, 0.98));
          border: 1px solid rgba(0, 255, 136, 0.15);
          border-radius: 20px;
          box-shadow:
            0 40px 100px rgba(0, 0, 0, 0.7),
            0 0 0 1px rgba(0, 255, 136, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          width: 100%;
          max-width: 800px;
          max-height: 88vh;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 255, 136, 0.15) transparent;
        }

        .exp-modal::-webkit-scrollbar { width: 4px; }
        .exp-modal::-webkit-scrollbar-track { background: transparent; }
        .exp-modal::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 136, 0.18);
          border-radius: 2px;
        }

        /* top accent strip */
        .exp-modal-strip {
          height: 3px;
          background: linear-gradient(90deg, var(--accent), var(--accent-secondary), transparent);
          border-radius: 20px 20px 0 0;
          flex-shrink: 0;
        }

        /* header */
        .exp-modal-header {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 1.1rem;
          padding: 1.6rem 1.75rem 1.5rem;
          overflow: hidden;
        }

        .exp-modal-header::after {
          content: '';
          position: absolute;
          inset: auto 0 0 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07) 30%, rgba(255, 255, 255, 0.07) 70%, transparent);
        }

        .exp-modal-header-glow {
          position: absolute;
          top: -40px;
          left: -20px;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(0, 255, 136, 0.1), transparent 68%);
          pointer-events: none;
        }

        .exp-modal-logo-wrap {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .exp-modal-logo-shell {
          width: 58px;
          height: 58px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.97);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0.4rem;
        }

        .exp-modal-logo-shell.is-current {
          border-color: rgba(0, 255, 136, 0.35);
          box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.08);
        }

        .exp-modal-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .exp-modal-meta {
          flex: 1;
          min-width: 0;
          padding-right: 2.5rem;
          position: relative;
          z-index: 1;
        }

        .exp-modal-title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-bottom: 0.3rem;
        }

        .exp-modal-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .exp-modal-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.18rem 0.6rem;
          border-radius: 999px;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.28);
          color: var(--accent);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .exp-modal-badge::before {
          content: '';
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          animation: modalBadgePulse 2s ease-in-out infinite;
        }

        @keyframes modalBadgePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .exp-modal-company {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 0.2rem;
        }

        .exp-modal-date {
          font-size: 0.8rem;
          color: var(--text-secondary);
          opacity: 0.7;
        }

        .exp-modal-close {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
          z-index: 2;
          flex-shrink: 0;
        }

        .exp-modal-close:hover {
          border-color: rgba(0, 255, 136, 0.3);
          color: var(--text-primary);
          background: rgba(0, 255, 136, 0.06);
        }

        .exp-modal-close:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.2);
        }

        /* body */
        .exp-modal-body {
          padding: 1.5rem 1.75rem 1.75rem;
        }

        /* section header row */
        .exp-modal-section-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .exp-modal-section-row + .exp-bullet-list,
        .exp-modal-section-row + .exp-modal-tech {
          margin-bottom: 0;
        }

        .exp-modal-section-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          flex-shrink: 0;
        }

        .exp-modal-section-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(0, 255, 136, 0.2), transparent);
        }

        /* bullet list */
        .exp-bullet-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          margin-bottom: 1.75rem;
          padding-left: 0;
        }

        .exp-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.7rem 0.9rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          transition: background 0.18s ease, border-color 0.18s ease;
        }

        .exp-bullet-item:hover {
          background: rgba(0, 255, 136, 0.03);
          border-color: rgba(0, 255, 136, 0.08);
        }

        .exp-bullet-marker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          margin-top: 0.15rem;
          border-radius: 5px;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.2);
          color: var(--accent);
        }

        .exp-bullet-text {
          font-size: 0.9rem;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        .exp-metric {
          color: var(--accent);
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        .exp-modal-placeholder {
          font-size: 0.88rem;
          color: var(--text-secondary);
          opacity: 0.4;
          font-style: italic;
          margin-bottom: 1.5rem;
        }

        /* tech tags */
        .exp-modal-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .exp-modal-tech-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.38rem 0.85rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 0.01em;
          transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }

        .exp-modal-tech-tag:hover {
          color: var(--text-primary);
          border-color: rgba(0, 255, 136, 0.2);
          background: rgba(0, 255, 136, 0.04);
        }

        @media (max-width: 860px) {
          .exp-modal { max-width: 100%; }
        }

        @media (max-width: 520px) {
          .exp-modal-overlay {
            padding: 0;
            align-items: flex-end;
          }
          .exp-modal {
            max-height: 92vh;
            border-radius: 20px 20px 0 0;
            border-bottom: none;
          }
          .exp-modal-strip { border-radius: 20px 20px 0 0; }
          .exp-modal-header { padding: 1.25rem 1.25rem 1.1rem; }
          .exp-modal-body { padding: 1.25rem; }
        }
      `}</style>
    </motion.div>
  );
}

export default function ExperienceCarousel({
  items,
  ctaHref,
  ctaLabel,
}: ExperienceCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [endSpacerWidth, setEndSpacerWidth] = useState(0);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  function updateCarouselState() {
    const el = carouselRef.current;
    if (!el) return;

    const firstItem = el.querySelector('.exp-card-item') as HTMLElement | null;
    const style = getComputedStyle(el);
    const gap = parseFloat(style.gap) || 20;
    if (firstItem) {
      setEndSpacerWidth(Math.max(0, el.clientWidth - firstItem.offsetWidth - gap));
    }

    const scrollLeft = Math.round(el.scrollLeft);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(scrollLeft > 5);
    setCanNext(scrollLeft < maxScroll - 5);

    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-exp-card]'));
    if (!cards.length) return;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    el.scrollTo({ left: 0, behavior: 'auto' });
    setActiveIndex(0);
    updateCarouselState();
    el.addEventListener('scroll', updateCarouselState, { passive: true });
    window.addEventListener('resize', updateCarouselState);

    return () => {
      el.removeEventListener('scroll', updateCarouselState);
      window.removeEventListener('resize', updateCarouselState);
    };
  }, [items]);

  function getScrollAmount() {
    const el = carouselRef.current;
    if (!el) return 0;
    const item = el.querySelector('.exp-card-item') as HTMLElement | null;
    if (!item) return el.clientWidth;
    const style = getComputedStyle(el);
    const gap = parseFloat(style.gap) || 20;
    return item.offsetWidth + gap;
  }

  function scroll(dir: number) {
    carouselRef.current?.scrollBy({ left: dir * getScrollAmount(), behavior: 'smooth' });
  }

  return (
    <>
      <div className="exp-stage">
        <div className="exp-stage-head">
          <div>
            <p className="exp-stage-kicker">Interactive timeline</p>
            <h3 className="exp-stage-title">Experience bar</h3>
          </div>
          <div className="exp-stage-controls">
            <div className="exp-stage-status">
              <span className="exp-stage-count">
                {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <div className="exp-arrow-row">
                <button
                  className="carousel-arrow carousel-arrow-prev"
                  onClick={() => scroll(-1)}
                  disabled={!canPrev}
                  aria-label="Previous experience"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  className="carousel-arrow carousel-arrow-next"
                  onClick={() => scroll(1)}
                  disabled={!canNext}
                  aria-label="Next experience"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="exp-progress" aria-hidden="true">
              <span style={{ width: `${((activeIndex + 1) / items.length) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="exp-carousel-shell">
          <div ref={carouselRef} className="exp-carousel">
            {items.map((exp, i) => {
              const distance = Math.min(Math.abs(activeIndex - i), 3);

              return (
                <motion.div
                  key={exp.id}
                  className="exp-card-item"
                  data-exp-card
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div
                    className="glass-card exp-card"
                    data-active={activeIndex === i}
                    style={{ '--distance': distance } as CSSProperties}
                  >
                    <div className="exp-card-surface">
                      <div className="exp-card-topline">
                        <div className="exp-card-brand">
                          <span className="exp-index">{String(i + 1).padStart(2, '0')}</span>
                          <div className="exp-logo-shell" aria-hidden="true">
                            {exp.logoPath ? (
                              <img src={exp.logoPath} alt="" className="exp-logo" loading="lazy" decoding="async" />
                            ) : (
                              <span className="exp-logo-fallback">
                                {exp.company.split(/\s+/).map((word) => word[0]).join('').slice(0, 3).toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="exp-date">
                          {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div className="exp-card-accent" />
                      <h4 className="exp-title">{exp.title}</h4>
                      <div className="exp-company">{exp.company}</div>
                      <p className="exp-desc">{exp.description}</p>
                      <div className="exp-tech">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <button
                        className="exp-details-btn"
                        onClick={() => setSelectedExp(exp)}
                        aria-label={`View full details for ${exp.title}`}
                      >
                        View details
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div className="exp-carousel-spacer" aria-hidden="true" style={{ width: `${endSpacerWidth}px` }} />
          </div>
        </div>

        {ctaHref && ctaLabel && (
          <div className="exp-cta">
            <a href={ctaHref} className="outline-button">{ctaLabel}</a>
          </div>
        )}

        <style>{`
          .exp-stage { position: relative; }

          .exp-stage-head {
            display: flex;
            align-items: end;
            justify-content: space-between;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .exp-stage-kicker {
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 0.14em;
            font-size: 0.78rem;
            margin-bottom: 0.35rem;
            font-weight: 600;
          }

          .exp-stage-title { font-size: 1.5rem; color: var(--text-primary); }

          .exp-stage-controls { display: grid; gap: 0.5rem; min-width: 220px; }

          .exp-stage-status {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
          }

          .exp-arrow-row { display: flex; align-items: center; gap: 0.55rem; }

          .exp-stage-count {
            color: var(--text-secondary);
            font-size: 0.82rem;
            text-align: right;
            letter-spacing: 0.08em;
          }

          .exp-progress {
            width: 100%;
            height: 3px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.08);
            overflow: hidden;
          }

          .exp-progress span {
            display: block;
            height: 100%;
            border-radius: inherit;
            background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
            transition: width 0.3s ease;
          }

          .exp-carousel-shell { position: relative; }

          .exp-carousel {
            display: flex;
            gap: 1.25rem;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            scrollbar-width: none;
            overscroll-behavior-x: contain;
            overscroll-behavior-y: none;
            touch-action: pan-x;
            padding: 0.75rem 0 1rem;
            -ms-overflow-style: none;
          }

          .exp-carousel::-webkit-scrollbar { display: none; }

          .exp-carousel-spacer { flex: 0 0 auto; pointer-events: none; }

          .exp-card-item {
            flex: 0 0 min(88%, 420px);
            scroll-snap-align: start;
          }

          @media (min-width: 640px) {
            .exp-card-item { flex: 0 0 min(62%, 430px); }
          }

          @media (min-width: 1024px) {
            .exp-card-item { flex: 0 0 min(42%, 440px); }
          }

          .exp-card {
            height: 100%;
            position: relative;
            overflow: hidden;
            transform:
              translateY(calc(var(--distance) * 10px))
              scale(calc(1 - (var(--distance) * 0.025)));
            opacity: calc(1 - (var(--distance) * 0.08));
            transition: transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
          }

          .exp-card[data-active='true'] {
            border-color: rgba(0, 255, 136, 0.18);
            box-shadow: 0 22px 44px rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(0, 255, 136, 0.04);
          }

          .exp-card-surface {
            padding: 1.35rem 1.35rem 1.25rem;
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          .exp-card-topline {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .exp-card-brand { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }

          .exp-index {
            font-size: 0.78rem;
            font-weight: 700;
            color: var(--accent);
            letter-spacing: 0.12em;
          }

          .exp-logo-shell {
            width: 46px;
            height: 46px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.96);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            flex-shrink: 0;
            padding: 0.35rem;
          }

          .exp-logo { width: 100%; height: 100%; object-fit: contain; display: block; }

          .exp-logo-fallback {
            font-size: 0.76rem;
            letter-spacing: 0.12em;
            color: var(--accent);
            font-weight: 700;
          }

          .exp-card-accent {
            position: absolute;
            top: 1.1rem;
            right: 1.35rem;
            width: 88px;
            height: 88px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 136, 0.22), transparent 70%);
            pointer-events: none;
          }

          .exp-title {
            font-size: 1.2rem;
            margin-bottom: 0.4rem;
            color: var(--text-primary);
            max-width: 22ch;
          }

          .exp-company {
            font-weight: 600;
            color: var(--accent);
            font-size: 0.95rem;
            margin-bottom: 0.75rem;
          }

          .exp-date { color: var(--text-secondary); font-size: 0.85rem; flex-shrink: 0; }

          .exp-desc {
            color: var(--text-secondary);
            font-size: 0.9rem;
            line-height: 1.7;
            margin-bottom: 1rem;
            flex-grow: 1;
          }

          .exp-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-bottom: 1rem;
          }

          .exp-details-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            align-self: flex-start;
            padding: 0.4rem 0.85rem;
            border-radius: 999px;
            border: 1px solid rgba(0, 255, 136, 0.22);
            background: rgba(0, 255, 136, 0.06);
            color: var(--accent);
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
            letter-spacing: 0.02em;
          }

          .exp-details-btn:hover {
            background: rgba(0, 255, 136, 0.12);
            border-color: rgba(0, 255, 136, 0.4);
            transform: translateX(2px);
          }

          .exp-details-btn:focus-visible {
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.2);
          }

          .carousel-arrow {
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(22, 22, 22, 0.92);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: var(--text-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          }

          .carousel-arrow:hover:not(:disabled) {
            transform: scale(1.04);
            border-color: rgba(0, 255, 136, 0.24);
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
          }

          .carousel-arrow:focus-visible {
            outline: none;
            border-color: rgba(0, 255, 136, 0.5);
            box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.18);
          }

          .carousel-arrow:active:not(:disabled) { transform: scale(0.96); }
          .carousel-arrow:disabled { opacity: 0.28; cursor: not-allowed; }

          .exp-cta { text-align: center; margin-top: 1.25rem; }

          @media (max-width: 768px) {
            .exp-stage-head { align-items: start; flex-direction: column; }
            .exp-stage-controls { width: 100%; }
            .exp-stage-status { width: 100%; }
            .exp-stage-count { text-align: left; }
            .exp-carousel { padding: 0.75rem 2.9rem 0.75rem; }
            .carousel-arrow { width: 36px; height: 36px; }
          }
        `}</style>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedExp && (
            <ExperienceModal exp={selectedExp} onClose={() => setSelectedExp(null)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
