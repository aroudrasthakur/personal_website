import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '../lib/data';

export default function ExperienceCarousel({ items = [] }) {
  const carouselRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const itemGapFallback = 32; // px

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
            aria-label="Previous experience"
            onClick={() => scrollByAmount(-getItemScrollAmount())}
            disabled={!canPrev}
            style={{ left: 0 }}
          >
            ‹
          </button>

          <div className="carousel" ref={carouselRef} role="list">
            {items.map(exp => (
              <div className="carousel-item" role="listitem" key={exp.id}>
                <div className="experience-card">
                  <h3>{exp.title}</h3>
                  <div className="company">{exp.company}</div>
                  <div className="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
                  <p>{exp.description}</p>
                  <div className="experience-tech">
                    {exp.technologies.map(t => <span className="tech-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-nav next"
            aria-label="Next experience"
            onClick={() => scrollByAmount(getItemScrollAmount())}
            disabled={!canNext}
            style={{ right: 0 }}
          >
            ›
          </button>
        </div>
      </div>

      <div className="view-all-container">
        <Link href="/experiences" className="view-all-btn">View All Experiences</Link>
      </div>
    </>
  );
}