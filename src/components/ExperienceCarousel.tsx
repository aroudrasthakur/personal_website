import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import type { Experience } from '@/lib/data';
import { formatDate } from '@/lib/data';

interface ExperienceCarouselProps {
  items: Experience[];
  ctaHref?: string;
  ctaLabel?: string;
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
                  style={
                    {
                      '--distance': distance,
                    } as CSSProperties
                  }
                >
                  <div className="exp-card-surface">
                    <div className="exp-card-topline">
                      <div className="exp-card-brand">
                        <span className="exp-index">{String(i + 1).padStart(2, '0')}</span>
                        <div className="exp-logo-shell" aria-hidden="true">
                          {exp.logoPath ? (
                            <img
                              src={exp.logoPath}
                              alt=""
                              className="exp-logo"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <span className="exp-logo-fallback">
                              {exp.company
                                .split(/\s+/)
                                .map((word) => word[0])
                                .join('')
                                .slice(0, 3)
                                .toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="exp-date">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
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
          <a href={ctaHref} className="outline-button">
            {ctaLabel}
          </a>
        </div>
      )}

      <style>{`
        .exp-stage {
          position: relative;
        }

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

        .exp-stage-title {
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .exp-stage-controls {
          display: grid;
          gap: 0.5rem;
          min-width: 220px;
        }

        .exp-stage-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .exp-arrow-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }

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

        .exp-carousel-shell {
          position: relative;
        }

        .exp-carousel {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-padding-left: 0;
          scroll-behavior: smooth;
          scrollbar-width: none;
          overscroll-behavior-x: contain;
          overscroll-behavior-y: none;
          touch-action: pan-x;
          padding: 0.75rem 0 1rem;
          -ms-overflow-style: none;
        }

        .exp-carousel::-webkit-scrollbar {
          display: none;
        }

        .exp-carousel-spacer {
          flex: 0 0 auto;
          pointer-events: none;
        }

        .exp-card-item {
          flex: 0 0 min(88%, 420px);
          scroll-snap-align: start;
        }

        @media (min-width: 640px) {
          .exp-card-item {
            flex: 0 0 min(62%, 430px);
          }
        }

        @media (min-width: 1024px) {
          .exp-card-item {
            flex: 0 0 min(42%, 440px);
          }
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
          padding: 1.35rem 1.35rem 1.5rem;
          height: 100%;
          position: relative;
        }

        .exp-card-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .exp-card-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: 0;
        }

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

        .exp-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

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

        .exp-date {
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .exp-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .exp-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
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
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
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

        .carousel-arrow:active:not(:disabled) {
          transform: scale(0.96);
        }

        .carousel-arrow:disabled {
          opacity: 0.28;
          cursor: not-allowed;
        }

        .exp-cta {
          text-align: center;
          margin-top: 1.25rem;
        }

        @media (max-width: 768px) {
          .exp-stage-head {
            align-items: start;
            flex-direction: column;
          }

          .exp-stage-controls {
            width: 100%;
          }

          .exp-stage-status {
            width: 100%;
          }

          .exp-stage-count {
            text-align: left;
          }

          .exp-carousel {
            padding: 0.75rem 2.9rem 0.75rem;
          }

          .carousel-arrow {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
}
