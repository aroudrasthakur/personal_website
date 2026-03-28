import { motion } from 'motion/react';
import type { Experience } from '@/lib/data';
import { formatDate } from '@/lib/data';

interface ExperienceGridProps {
  items: Experience[];
}

export default function ExperienceGrid({ items }: ExperienceGridProps) {
  return (
    <div className="exp-grid stagger-grid">
      {items.map((exp, i) => (
        <motion.article
          key={exp.id}
          className="glass-card exp-full-card stagger-item"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="exp-full-accent" />
          <div className="exp-full-content">
            <h3 className="exp-full-title">{exp.title}</h3>
            <div className="exp-full-company">{exp.company}</div>
            <div className="exp-full-date">
              {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
            </div>
            <p className="exp-full-desc">{exp.description}</p>
            <div className="exp-full-tech">
              {exp.technologies.map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </motion.article>
      ))}

      <style>{`
        .exp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }

        .exp-full-card {
          position: relative;
          overflow: hidden;
          padding: 0;
          display: flex;
        }

        .exp-full-accent {
          width: 4px;
          min-height: 100%;
          background: linear-gradient(180deg, #00ff88, #00ccff);
          flex-shrink: 0;
        }

        .exp-full-content {
          padding: 1.5rem;
          flex: 1;
        }

        .exp-full-title {
          font-size: 1.15rem;
          margin-bottom: 0.35rem;
          color: var(--text-primary);
        }

        .exp-full-company {
          font-weight: 600;
          color: var(--accent);
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }

        .exp-full-date {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
        }

        .exp-full-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .exp-full-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        @media (max-width: 768px) {
          .exp-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
