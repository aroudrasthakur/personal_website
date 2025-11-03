import Navbar from '../components/Navbar';
import { experiences, formatDate } from '../lib/data';
import Link from 'next/link';

function sortExperiencesByPriority(exps){
  return [...exps].sort((a,b)=>{
    if((b.priority||0) !== (a.priority||0)) return (b.priority||0) - (a.priority||0);
    return (b.endDate||'9999-99').localeCompare(a.endDate||'9999-99');
  });
}

export default function AllExperiences(){
  const sorted = sortExperiencesByPriority(experiences);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '6rem' }}>
        <section className="container" style={{ padding: '4rem 0' }}>
          <div className="section-header"><h2>All Experiences</h2></div>

          <ol className="full-list-grid experience-list" style={{ listStyle: 'none', padding: 0, margin: 0 }} aria-label="All experiences">
            {sorted.map(exp => (
              <li key={exp.id} style={{ marginBottom: '1.25rem' }}>
                <article className="experience-card" aria-labelledby={`exp-title-${exp.id}`}>
                  <h3 id={`exp-title-${exp.id}`}>{exp.title}</h3>
                  <div className="company">{exp.company}</div>
                  <div className="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
                  <p>{exp.description}</p>
                  <div className="experience-tech" style={{ marginTop: '0.5rem' }}>
                    {exp.technologies.map(t => <span className="tech-tag" key={t}>{t}</span>)}
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: '2rem' }}>
            <Link href="/" className="view-all-btn">← Back to Home</Link>
          </div>
        </section>
      </main>
    </>
  );
}