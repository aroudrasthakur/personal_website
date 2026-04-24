import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Project } from '@/lib/data';
import { ProjectDescription } from '@/components/ProjectDescription';
import { getYouTubeVideoId } from '@/lib/youtube';
import YouTubeAmbientPlayer from '@/components/YouTubeAmbientPlayer';

interface ProjectShowcaseProps {
  items: Project[];
}

function hasLink(value: string | null) {
  return Boolean(value && value.trim().length > 0);
}

export default function ProjectShowcase({ items }: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = items[activeIndex];
  const youTubeId =
    activeProject.embedYouTubeDemo && hasLink(activeProject.demo)
      ? getYouTubeVideoId(activeProject.demo)
      : null;
  return (
    <div className="project-showcase">
      <div className="project-showcase-layout">
        <div className="project-spotlight glass-card">
          <div className="project-spotlight-meta">
            <span className="project-spotlight-kicker">Selected project</span>
            <span className="project-spotlight-count">
              {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="project-spotlight-body"
            >
              <div className="project-spotlight-surface">
                <div className="project-signal-row">
                  <span className="project-signal-chip">Build focus</span>
                  <span className="project-signal-chip">{activeProject.tags[0] ?? 'Software'}</span>
                  <span className="project-signal-chip">
                    {hasLink(activeProject.demo) ? 'Live demo' : 'Case study'}
                  </span>
                </div>

                <div
                  className="project-spotlight-content"
                  data-youtube-embed={youTubeId ? 'true' : undefined}
                >
                  <div className="project-spotlight-text">
                    <h3 className="project-spotlight-title">{activeProject.title}</h3>
                    {youTubeId && (
                      <YouTubeAmbientPlayer
                        videoId={youTubeId}
                        projectTitle={activeProject.title}
                        title={`${activeProject.title} — demo video`}
                      />
                    )}
                    <ProjectDescription
                      text={activeProject.description}
                      className="project-spotlight-description"
                    />
                  </div>
                </div>

                <div className="project-spotlight-stats">
                  <div className="project-stat-card">
                    <strong>{String(activeProject.tags.length).padStart(2, '0')}</strong>
                    <span>core technologies</span>
                  </div>
                  <div className="project-stat-card">
                    <strong>{hasLink(activeProject.github) ? 'Repo' : 'Demo'}</strong>
                    <span>primary destination</span>
                  </div>
                  <div className="project-stat-card">
                    <strong>P{activeProject.priority}</strong>
                    <span>spotlight priority</span>
                  </div>
                </div>

                <div className="project-spotlight-tags">
                  {activeProject.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-spotlight-links">
                  {hasLink(activeProject.github) && (
                    <a href={activeProject.github} target="_blank" rel="noreferrer" className="glow-button">
                      View Code
                    </a>
                  )}
                  {hasLink(activeProject.website) && (
                    <a href={activeProject.website!} target="_blank" rel="noreferrer" className="outline-button">
                      Visit site
                    </a>
                  )}
                  {hasLink(activeProject.demo) && (
                    <a href={activeProject.demo!} target="_blank" rel="noreferrer" className="outline-button">
                      Watch Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="project-selector-panel">
          <div className="selector-panel-header">
            <p className="selector-kicker">Project board</p>
            <h3>Choose a build to explore</h3>
          </div>

          <div className="project-selector-list">
            {items.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className="project-selector-card"
                data-active={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <span className="selector-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="selector-copy">
                  <strong>{project.title}</strong>
                  <ProjectDescription text={project.description} className="project-selector-preview" />
                </div>
                <span className="selector-label">
                  {hasLink(project.demo) ? 'Live' : 'Build'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .project-showcase {
          position: relative;
        }

        .project-showcase-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
          gap: 1.4rem;
          align-items: start;
        }

        .project-spotlight {
          position: sticky;
          top: 110px;
          overflow: hidden;
          min-height: 620px;
          background:
            radial-gradient(circle at top left, rgba(0, 255, 136, 0.16), transparent 26%),
            radial-gradient(circle at bottom right, rgba(0, 204, 255, 0.14), transparent 30%),
            linear-gradient(160deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
        }

        .project-spotlight::before {
          content: '';
          position: absolute;
          inset: 18% -10% auto auto;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 204, 255, 0.16), transparent 70%);
          pointer-events: none;
        }

        .project-spotlight-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 1.4rem 1.6rem 0;
          position: relative;
          z-index: 1;
        }

        .project-spotlight-kicker,
        .selector-kicker {
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .project-spotlight-count {
          color: var(--text-secondary);
          font-size: 0.8rem;
          letter-spacing: 0.12em;
        }

        .project-spotlight-body {
          height: 100%;
          position: relative;
          z-index: 1;
        }

        .project-spotlight-surface {
          padding: 1.25rem 1.6rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          min-height: 100%;
        }

        .project-spotlight-content {
          display: block;
        }

        .project-spotlight-text {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }

        .project-youtube-ambient {
          position: relative;
          width: 100%;
          max-width: min(100%, 44rem);
          margin-bottom: 1.1rem;
        }

        .project-youtube-ambient-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem 1rem;
          width: 100%;
          margin-bottom: 0.35rem;
        }

        .project-youtube-ambient-chrome {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 0;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .project-youtube-ambient-audio {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin-left: auto;
        }

        .project-youtube-ambient-audio-kicker {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .project-youtube-audio-switch {
          flex-shrink: 0;
          display: block;
          padding: 0;
          border: none;
          background: none;
          cursor: pointer;
          line-height: 0;
        }

        .project-youtube-audio-switch:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
          border-radius: 4px;
        }

        .project-youtube-audio-switch-track {
          display: block;
          position: relative;
          width: 2.6rem;
          height: 1.35rem;
          border-radius: 999px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .project-youtube-audio-switch[data-audio='on'] .project-youtube-audio-switch-track {
          border-color: rgba(0, 255, 136, 0.45);
          background: var(--accent-dim);
          box-shadow: 0 0 12px var(--accent-glow);
        }

        .project-youtube-audio-switch-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: calc(1.35rem - 4px);
          height: calc(1.35rem - 4px);
          border-radius: 50%;
          background: var(--text-secondary);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .project-youtube-audio-switch[data-audio='on'] .project-youtube-audio-switch-thumb {
          transform: translateX(1.22rem);
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent-glow);
        }

        .project-youtube-ambient-hint {
          margin: 0 0 0.4rem 0;
          text-align: right;
          width: 100%;
          font-size: 0.64rem;
          line-height: 1.35;
          color: var(--text-secondary);
        }

        .project-youtube-embed-slab {
          position: relative;
          width: 100%;
        }

        .project-youtube-embed-slab .project-youtube-ambient-rail {
          position: absolute;
          left: 0.35rem;
          top: 0.2rem;
          bottom: 0.45rem;
          width: 2px;
          background: linear-gradient(
            180deg,
            var(--accent),
            rgba(0, 255, 136, 0.15) 40%,
            rgba(0, 204, 255, 0.35) 100%
          );
          box-shadow: 0 0 12px var(--accent-glow);
          border-radius: 2px;
          pointer-events: none;
        }

        .project-youtube-ambient-label {
          color: var(--accent);
          font-weight: 800;
        }

        .project-youtube-ambient-sep {
          display: block;
          width: 1.1rem;
          height: 1px;
          background: linear-gradient(90deg, var(--accent-secondary), transparent);
          opacity: 0.6;
        }

        .project-youtube-ambient-sub {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .project-youtube-embed {
          position: relative;
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          background: #050506;
          aspect-ratio: 16 / 9;
          box-shadow:
            0 0 0 1px rgba(0, 255, 136, 0.12),
            0 0 0 1px rgba(0, 204, 255, 0.08) inset,
            0 20px 48px rgba(0, 0, 0, 0.45);
        }

        .project-youtube-embed::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          border-radius: inherit;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
        }

        .project-youtube-embed-fringe {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          border-radius: inherit;
          background:
            linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, transparent 18%),
            linear-gradient(315deg, rgba(0, 204, 255, 0.08) 0%, transparent 20%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.2), transparent 28%);
        }

        .project-youtube-embed-scan {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          border-radius: inherit;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 4px
          );
          opacity: 0.4;
          mix-blend-mode: overlay;
        }

        .project-youtube-iframe-host {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .project-youtube-iframe-host iframe {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .project-spotlight-text:has(.project-youtube-ambient) .project-spotlight-title {
          margin-bottom: 0.55rem;
        }

        .project-signal-row {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .project-signal-chip,
        .project-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.38rem 0.7rem;
          border-radius: 999px;
          font-size: 0.78rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
        }

        .project-spotlight-title {
          font-size: clamp(2.4rem, 5vw, 4.6rem);
          line-height: 0.96;
          max-width: 9ch;
          letter-spacing: -0.04em;
          margin-bottom: 0.65rem;
        }

        .project-spotlight-description {
          max-width: 58ch;
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 1.02rem;
        }

        .project-spotlight-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.8rem;
        }

        .project-stat-card {
          padding: 1rem;
          border-radius: var(--radius);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
        }

        .project-stat-card strong {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-size: 1.3rem;
          margin-bottom: 0.2rem;
          color: var(--text-primary);
        }

        .project-stat-card span {
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .project-spotlight-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
        }

        .project-tag {
          color: var(--accent);
          background: rgba(0, 255, 136, 0.08);
          border-color: rgba(0, 255, 136, 0.18);
        }

        .project-spotlight-links {
          display: flex;
          gap: 0.9rem;
          flex-wrap: wrap;
          margin-top: auto;
        }

        .project-selector-panel {
          display: grid;
          gap: 1rem;
        }

        .selector-panel-header {
          padding: 1.1rem 1.2rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.02);
        }

        .selector-panel-header h3 {
          font-size: 1.3rem;
          margin-top: 0.35rem;
        }

        .project-selector-list {
          display: grid;
          gap: 0.8rem;
          max-height: 620px;
          overflow-y: auto;
          padding-right: 0.3rem;
        }

        .project-selector-card {
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.9rem;
          align-items: start;
          padding: 1rem;
          text-align: left;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(22, 22, 22, 0.9), rgba(22, 22, 22, 0.7));
          color: inherit;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }

        .project-selector-card:hover,
        .project-selector-card[data-active='true'] {
          transform: translateX(4px);
          border-color: rgba(0, 255, 136, 0.3);
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.08), rgba(0, 204, 255, 0.05));
        }

        .selector-index,
        .selector-label {
          font-size: 0.74rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-top: 0.18rem;
        }

        .selector-copy strong {
          display: block;
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .selector-copy p,
        .selector-copy .project-selector-preview {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .project-showcase-layout {
            grid-template-columns: 1fr;
          }

          .project-spotlight {
            position: relative;
            top: 0;
            min-height: auto;
          }

          .project-selector-list {
            max-height: none;
          }
        }

        @media (max-width: 768px) {
          .project-spotlight-title {
            font-size: 2.5rem;
          }

          .project-spotlight-stats {
            grid-template-columns: 1fr;
          }

          .project-selector-card {
            grid-template-columns: auto 1fr;
          }

          .selector-label {
            grid-column: 2;
          }
        }
      `}</style>
    </div>
  );
}
