import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Experience } from '@/lib/data';
import { formatDate } from '@/lib/data';

interface ExperienceCarouselProps {
  items: Experience[];
}

export default function ExperienceCarousel({ items }: ExperienceCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  function updateButtons() {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = Math.round(el.scrollLeft);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(scrollLeft > 5);
    setCanNext(scrollLeft < maxScroll - 5);
  }

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    return () => {
      el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [items]);

  function getScrollAmount() {
    const el = carouselRef.current;
    if (!el) return 0;
    const item = el.querySelector('.exp-card-item') as HTMLElement;
    if (!item) return el.clientWidth;
    const style = getComputedStyle(el);
    const gap = parseFloat(style.gap) || 24;
    return item.offsetWidth + gap;
  }

  function scroll(dir: number) {
    carouselRef.current?.scrollBy({ left: dir * getScrollAmount(), behavior: 'smooth' });
  }

  return (
    <div>
      <div style={{ position: 'relative' }}>
        {/* Prev button */}
        <button
          className="carousel-arrow carousel-arrow-prev"
          onClick={() => scroll(-1)}
          disabled={!canPrev}
          aria-label="Previous experience"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="exp-carousel"
        >
          {items.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="exp-card-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="glass-card exp-card">
                <div className="exp-card-accent" />
                <h3 className="exp-title">{exp.title}</h3>
                <div className="exp-company">{exp.company}</div>
                <div className="exp-date">
                  {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                </div>
                <p className="exp-desc">{exp.description}</p>
                <div className="exp-tech">
                  {exp.technologies.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next button */}
        <button
          className="carousel-arrow carousel-arrow-next"
          onClick={() => scroll(1)}
          disabled={!canNext}
          aria-label="Next experience"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a href="/experiences" className="outline-button">
          View All Experiences
        </a>
      </div>

      <style>{`
        .exp-carousel {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          padding: 0.5rem 3rem;
          -ms-overflow-style: none;
        }
        .exp-carousel::-webkit-scrollbar { display: none; }

        .exp-card-item {
          flex: 0 0 100%;
          scroll-snap-align: start;
        }

        @media (min-width: 640px) {
          .exp-card-item { flex: 0 0 calc(50% - 0.75rem); }
        }
        @media (min-width: 1024px) {
          .exp-card-item { flex: 0 0 calc(33.333% - 1rem); }
        }

        .exp-card {
          padding: 1.75rem;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .exp-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, #00ff88, #00ccff);
          border-radius: 0 2px 2px 0;
        }

        .exp-title {
          font-size: 1.15rem;
          margin-bottom: 0.4rem;
          padding-left: 0.75rem;
          color: var(--text-primary);
        }

        .exp-company {
          font-weight: 600;
          color: var(--accent);
          font-size: 0.95rem;
          margin-bottom: 0.3rem;
          padding-left: 0.75rem;
        }

        .exp-date {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          padding-left: 0.75rem;
        }

        .exp-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          padding-left: 0.75rem;
        }

        .exp-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          padding-left: 0.75rem;
        }

        /* Carousel arrows */
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-arrow:hover:not(:disabled) {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
          box-shadow: 0 4px 15px var(--accent-dim);
        }

        .carousel-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .carousel-arrow-prev { left: 0; }
        .carousel-arrow-next { right: 0; }
      `}</style>
    </div>
  );
}
