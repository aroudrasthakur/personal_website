import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function ProjectCarousel({ items = [] }) {
  const carouselRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const itemGapFallback = 32;

  function getItemScrollAmount() {
    const carousel = carouselRef.current;
    if (!carousel) return 0;
    const item = carousel.querySelector('.carousel-item');
    if (!item) return carousel.clientWidth;
    const itemWidth = item.getBoundingClientRect().width;
    const style = window.getComputedStyle(carousel);
    let gap = 0;
    if (style && style.gap) gap = parseFloat(style.gap) || 0;
    if (!gap) gap = itemGapFallback;
    return Math.round(itemWidth + gap);
  }

  function updateButtons() {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const scrollLeft = Math.round(carousel.scrollLeft);
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    setCanPrev(scrollLeft > 5);
    setCanNext(scrollLeft < (maxScroll - 5));
  }

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    updateButtons();
    const onScroll = () => updateButtons();
    const onResize = () => updateButtons();
    carousel.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      carousel.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [items]);

  function scrollByAmount(amount) {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: amount, behavior: 'smooth' });
  }

  return (
    <>
      <div className="carousel-container">
        <div className="carousel-wrapper" style={{ position: 'relative' }}>
          <button
            className="carousel-nav prev"
            aria-label="Previous project"
            onClick={() => scrollByAmount(-getItemScrollAmount())}
            disabled={!canPrev}
            style={{ left: 0 }}
          >
            ‹
          </button>

          <div className="carousel" ref={carouselRef} role="list">
            {items.map(proj => (
              <div className="carousel-item" role="listitem" key={proj.id}>
                <div className="project-card">
                  <div className="project-image" aria-hidden>{proj.icon}</div>
                  <div className="project-info">
                    <div className="project-header">
                      <h3>{proj.title}</h3>
                      <div className="project-stars">⭐ {proj.stars}</div>
                    </div>
                    <p>{proj.description}</p>
                    <div className="project-tags">
                      {proj.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
                    </div>
                    <div className="project-links">
                      {proj.github && <a href={proj.github} className="project-link" target="_blank" rel="noreferrer">GitHub</a>}
                      {proj.demo && <a href={proj.demo} className="project-link" target="_blank" rel="noreferrer">Demo</a>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-nav next"
            aria-label="Next project"
            onClick={() => scrollByAmount(getItemScrollAmount())}
            disabled={!canNext}
            style={{ right: 0 }}
          >
            ›
          </button>
        </div>
      </div>

      <div className="view-all-container">
        <Link href="/projects" className="view-all-btn">View All Projects</Link>
      </div>
    </>
  );
}