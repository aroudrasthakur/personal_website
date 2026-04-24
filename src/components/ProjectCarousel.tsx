import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import type { Project } from '@/lib/data';
import { ProjectDescription } from '@/components/ProjectDescription';

interface ProjectCarouselProps {
  items: Project[];
}

export default function ProjectCarousel({ items }: ProjectCarouselProps) {
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
    const item = el.querySelector('.proj-card-item') as HTMLElement;
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
        <button
          className="carousel-arrow carousel-arrow-prev"
          onClick={() => scroll(-1)}
          disabled={!canPrev}
          aria-label="Previous project"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        <div ref={carouselRef} className="proj-carousel">
          {items.map((proj, i) => (
            <motion.div
              key={proj.id}
              className="proj-card-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="glass-card proj-card">
                <div className="proj-icon-area">
                  <span className="proj-icon">{proj.icon}</span>
                </div>
                <div className="proj-body">
                  <h3 className="proj-title">{proj.title}</h3>
                  <ProjectDescription text={proj.description} className="proj-desc" />
                  <div className="proj-tags">
                    {proj.tags.map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="proj-links">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="proj-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                        GitHub
                      </a>
                    )}
                    {proj.website && (
                      <a href={proj.website} target="_blank" rel="noreferrer" className="proj-link proj-link-website">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                        Site
                      </a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noreferrer" className="proj-link proj-link-demo">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          className="carousel-arrow carousel-arrow-next"
          onClick={() => scroll(1)}
          disabled={!canNext}
          aria-label="Next project"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a href="/projects" className="outline-button">View All Projects</a>
      </div>

      <style>{`
        .proj-carousel {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          padding: 0.5rem 3rem;
          -ms-overflow-style: none;
        }
        .proj-carousel::-webkit-scrollbar { display: none; }

        .proj-card-item {
          flex: 0 0 100%;
          scroll-snap-align: start;
        }
        @media (min-width: 640px) {
          .proj-card-item { flex: 0 0 calc(50% - 0.75rem); }
        }
        @media (min-width: 1024px) {
          .proj-card-item { flex: 0 0 calc(33.333% - 1rem); }
        }

        .proj-card {
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .proj-icon-area {
          height: 140px;
          background: linear-gradient(135deg, var(--accent-dim), rgba(0, 204, 255, 0.06));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .proj-icon { font-size: 3rem; }

        .proj-body {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .proj-title {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .proj-desc {
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex: 1;
        }

        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .proj-links {
          display: flex;
          gap: 0.75rem;
        }

        .proj-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          background: var(--accent-dim);
          border: 1px solid rgba(0, 255, 136, 0.2);
          color: var(--accent);
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .proj-link:hover {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
        }

        .proj-link-demo {
          background: rgba(0, 204, 255, 0.08);
          border-color: rgba(0, 204, 255, 0.2);
          color: var(--accent-secondary);
        }

        .proj-link-demo:hover {
          background: var(--accent-secondary);
          color: var(--bg-primary);
          border-color: var(--accent-secondary);
        }

        .proj-link-website {
          background: rgba(168, 85, 247, 0.1);
          border-color: rgba(168, 85, 247, 0.25);
          color: #c4b5fd;
        }
        .proj-link-website:hover {
          background: #a855f7;
          color: var(--bg-primary);
          border-color: #a855f7;
        }

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
