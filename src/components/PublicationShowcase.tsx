import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Publication, PublicationKind } from '@/lib/data';
import { formatDate } from '@/lib/data';

interface PublicationShowcaseProps {
  items: Publication[];
}

type PublicationTab = 'all' | PublicationKind;

const PUBLICATION_TABS: { id: PublicationTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'paper', label: 'Papers' },
  { id: 'poster', label: 'Posters' },
];

function formatPublicationDate(dateStr?: string) {
  if (!dateStr) return null;
  return formatDate(`${dateStr}-01`);
}

export default function PublicationShowcase({ items }: PublicationShowcaseProps) {
  const [activeTab, setActiveTab] = useState<PublicationTab>('all');

  const displayedItems = useMemo(() => {
    if (activeTab === 'all') return items;
    return items.filter((item) => item.kind === activeTab);
  }, [activeTab, items]);

  return (
    <div className="publication-showcase">
      <div
        className="pub-tabs"
        role="tablist"
        aria-label="Publication categories"
      >
        {PUBLICATION_TABS.map((tab) => {
          const count =
            tab.id === 'all'
              ? items.length
              : items.filter((item) => item.kind === tab.id).length;
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="publication-panel"
              className="pub-tab"
              data-active={isActive}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="pub-tab-label">{tab.label}</span>
              <span className="pub-tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div id="publication-panel" role="tabpanel" className="pub-panel">
        <AnimatePresence mode="wait">
          <motion.ul
            key={activeTab}
            className="pub-list"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          >
            {displayedItems.map((item, index) => {
              const formattedDate = formatPublicationDate(item.date);

              return (
                <motion.li
                  key={item.id}
                  className="pub-card glass-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: index * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <div className="pub-card-top">
                    <div className="pub-card-meta">
                      <span className="pub-kind">{item.label}</span>
                      {formattedDate && (
                        <time className="pub-date" dateTime={item.date}>
                          {formattedDate}
                        </time>
                      )}
                    </div>
                    <span className="pub-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="pub-title">{item.title}</h3>

                  {item.venue && <p className="pub-venue">{item.venue}</p>}

                  <p className="pub-description">{item.description}</p>

                  {item.links.length > 0 && (
                    <div className="pub-links">
                      {item.links.map((link) => (
                        <a
                          key={`${item.id}-${link.url}`}
                          href={link.url}
                          className="pub-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>{link.label}</span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M14 3h7v7" />
                            <path d="M10 14L21 3" />
                            <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>

        {displayedItems.length === 0 && (
          <p className="pub-empty">No publications in this category yet.</p>
        )}
      </div>

      <style>{`
        .publication-showcase {
          --pub-accent-rgb: 140, 120, 255;
          --pub-accent-secondary-rgb: 0, 204, 255;
          --pub-accent: rgb(var(--pub-accent-rgb));
          --pub-accent-secondary: rgb(var(--pub-accent-secondary-rgb));
        }

        .pub-tabs {
          display: flex;
          gap: 0.5rem;
          margin: 0 0 1.25rem;
          padding: 0.35rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .pub-tab {
          flex: 1 1 0;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.72rem 0.85rem;
          border: 1px solid transparent;
          border-radius: 10px;
          background: transparent;
          color: var(--text-secondary);
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .pub-tab[data-active='true'] {
          color: var(--text-primary);
          border-color: rgba(var(--pub-accent-rgb), 0.28);
          background:
            radial-gradient(circle at 20% 20%, rgba(var(--pub-accent-rgb), 0.16), transparent 55%),
            rgba(var(--pub-accent-rgb), 0.08);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
        }

        .pub-tab-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 1.35rem;
          height: 1.35rem;
          padding: 0 0.35rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        .pub-tab[data-active='true'] .pub-tab-count {
          background: rgba(var(--pub-accent-rgb), 0.18);
          color: var(--pub-accent);
        }

        .pub-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 1rem;
        }

        .pub-card {
          position: relative;
          padding: 1.35rem 1.4rem 1.25rem;
          border-radius: calc(var(--radius-lg) + 2px);
          background:
            radial-gradient(circle at top left, rgba(var(--pub-accent-rgb), 0.1), transparent 28%),
            radial-gradient(circle at bottom right, rgba(var(--pub-accent-secondary-rgb), 0.08), transparent 30%),
            linear-gradient(140deg, rgba(14, 21, 33, 0.96), rgba(8, 12, 20, 0.88));
          overflow: hidden;
        }

        .pub-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, var(--pub-accent), var(--pub-accent-secondary));
          opacity: 0.75;
        }

        .pub-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.85rem;
        }

        .pub-card-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.55rem;
        }

        .pub-kind {
          display: inline-flex;
          align-items: center;
          padding: 0.28rem 0.65rem;
          border-radius: 999px;
          border: 1px solid rgba(var(--pub-accent-rgb), 0.24);
          background: rgba(var(--pub-accent-rgb), 0.08);
          color: var(--pub-accent);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .pub-date {
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 500;
        }

        .pub-index {
          color: rgba(var(--pub-accent-rgb), 0.55);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          font-variant-numeric: tabular-nums;
        }

        .pub-title {
          margin: 0 0 0.55rem;
          font-size: clamp(1.05rem, 2.2vw, 1.35rem);
          line-height: 1.35;
          letter-spacing: -0.02em;
          max-width: 58ch;
        }

        .pub-venue {
          margin: 0 0 0.75rem;
          color: var(--pub-accent-secondary);
          font-size: 0.92rem;
          font-weight: 600;
        }

        .pub-description {
          margin: 0 0 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 68ch;
        }

        .pub-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
        }

        .pub-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(var(--pub-accent-rgb), 0.22);
          background: rgba(var(--pub-accent-rgb), 0.06);
          color: var(--text-primary);
          font-size: 0.84rem;
          font-weight: 600;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }

        .pub-link:hover {
          transform: translateY(-1px);
          border-color: rgba(var(--pub-accent-rgb), 0.38);
          background: rgba(var(--pub-accent-rgb), 0.12);
          color: var(--pub-accent);
        }

        .pub-empty {
          margin: 0;
          padding: 2rem 1rem;
          text-align: center;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .pub-tabs {
            flex-direction: column;
          }

          .pub-card {
            padding: 1.15rem 1.1rem 1.05rem;
          }
        }
      `}</style>
    </div>
  );
}
