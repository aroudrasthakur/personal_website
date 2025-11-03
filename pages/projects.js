import Navbar from '../components/Navbar';
import { projects } from '../lib/data';
import Link from 'next/link';

function sortProjectsByPriority(projs){
  return [...projs].sort((a,b)=>{
    if((b.priority||0) !== (a.priority||0)) return (b.priority||0) - (a.priority||0);
    return b.stars - a.stars;
  });
}

export default function AllProjects(){
  const sorted = sortProjectsByPriority(projects);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '6rem' }}>
        <section className="container" style={{ padding: '4rem 0' }}>
          <div className="section-header"><h2>All Projects</h2></div>

          <div className="full-list-grid" aria-label="All projects">
            {sorted.map(proj => (
              <article className="project-card" key={proj.id} style={{ marginBottom: '1rem' }}>
                <div className="project-image" aria-hidden="true">{proj.icon}</div>
                <div className="project-info">
                  <div className="project-header">
                    <h3>{proj.title}</h3>
                    <div className="project-stars" aria-label={`${proj.stars} stars`}>⭐ {proj.stars}</div>
                  </div>
                  <p>{proj.description}</p>
                  <div className="project-tags" style={{ marginBottom: '0.75rem' }}>
                    {proj.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
                  </div>
                  <div className="project-links">
                    {proj.github && <a href={proj.github} className="project-link" target="_blank" rel="noreferrer">GitHub</a>}
                    {proj.demo && <a href={proj.demo} className="project-link" target="_blank" rel="noreferrer">Demo</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Link href="/" className="view-all-btn">← Back to Home</Link>
          </div>
        </section>
      </main>
    </>
  );
}