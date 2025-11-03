import Navbar from '../components/Navbar';
import ExperienceCarousel from '../components/ExperienceCarousel';
import ProjectCarousel from '../components/ProjectCarousel';
import CallArena from '../components/CallArena';
import EmailPopup from '../components/EmailPopup';
import { experiences, projects } from '../lib/data';
import { useState } from 'react';

function sortExperiencesByPriority(exps){
  // Sort by priority desc, then endDate (most recent first)
  return [...exps].sort((a,b)=>{
    if((b.priority||0) !== (a.priority||0)) return (b.priority||0) - (a.priority||0);
    // fallback: present/latest first (same as previous logic)
    return (b.endDate||'9999-99').localeCompare(a.endDate||'9999-99');
  });
}
function sortProjectsByPriority(projs){
  // Sort by priority desc, then stars desc
  return [...projs].sort((a,b)=>{
    if((b.priority||0) !== (a.priority||0)) return (b.priority||0) - (a.priority||0);
    return b.stars - a.stars;
  });
}

export default function Home() {
  const [emailOpen, setEmailOpen] = useState(false);

  const sortedExperiences = sortExperiencesByPriority(experiences);
  const topExperiences = sortedExperiences.slice(0, 4); // top 4 by priority

  const sortedProjects = sortProjectsByPriority(projects);
  const topProjects = sortedProjects.slice(0, 4); // top 4 by priority

  return (
    <>
      <Navbar />
      <main>
        <section id="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="float">Hi, I'm Aroudra Thakur</h1>
              <p className="subtitle">Full Stack and AI/ML Software Engineer | Computer Vision Enthusiast</p>
              <a href="#contact" className="cta-button">Get In Touch</a>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <div className="section-header"><h2>About Me</h2></div>
            <div className="about-content">
              <div className="about-image">👨‍💻</div>
              <div className="about-text">
                <p>Hey! I am an Honors Computer Science student at UT Arlington researching AI, Computer Vision, and Full-Stack Systems Engineering. My work spans event-based vision, pose estimation, and AI accessibility, using tools like TensorFlow, PyTorch, React, and AWS. I’ve contributed to research under multiple professors, developed deep learning models for real-time vision tasks, and led peer mentoring in Data Structures and Algorithms. Passionate about human-centered AI, I aim to build technologies that advance accessibility, innovation, and impact.</p>
                <div className="skills">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Java</span>
                  <span className="skill-tag">C/C++</span>
                  <span className="skill-tag">TypeScript/JavaScript</span>
                  <span className="skill-tag">TensorFlow</span>
                  <span className="skill-tag">PyTorch</span>
                  <span className="skill-tag">OpenCV</span>
                  <span className="skill-tag">Django</span>
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">AWS</span>
                  <span className="skill-tag">Docker</span>
                  <span className="skill-tag">CI/CD (Docker Actions)</span>
                  <span className="skill-tag">Linux</span>
                  <span className="skill-tag">PostgresQL</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">REST/GraphQL</span>
                  <span className="skill-tag">Agile Development</span>
                  <span className="skill-tag">Data Visualization</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="container">
            <div className="section-header"><h2>Experience</h2></div>
            <ExperienceCarousel items={topExperiences} />
          </div>
        </section>

        <section id="projects">
          <div className="container">
            <div className="section-header"><h2>Featured Projects</h2></div>
            <ProjectCarousel items={topProjects} />
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="section-header"><h2>Get In Touch</h2></div>
            <div className="contact-content">
              <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>

              <div className="contact-links">
                <button onClick={()=>setEmailOpen(true)} className="contact-link email-button">📧 Email</button>
                <a href="https://github.com/aroudrasthakur" className="contact-link" target="_blank" rel="noreferrer">💻 GitHub</a>
                <a href="https://www.linkedin.com/in/aroudra-thakur-69203630a/" className="contact-link" target="_blank" rel="noreferrer">💼 LinkedIn</a>
              </div>

              <div className="call-wrapper" aria-live="polite">
                <CallArena />
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="container"><p>&copy; 2025 Aroudra Thakur. All rights reserved.</p></div>
        </footer>
      </main>

      <EmailPopup show={emailOpen} onClose={()=>setEmailOpen(false)} />
    </>
  );
}