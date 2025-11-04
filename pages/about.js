import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '6rem' }}>
        <section className="container" style={{ padding: '4rem 0' }}>
          <div className="section-header"><h2>About — Aroudra Thakur</h2></div>

          <div style={{ maxWidth: 900, margin: '0 auto', color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '1rem', fontSize: '1.05rem' }}>
              I'm Aroudra Thakur — a Computer Science student at The University of Texas at Arlington with a passion for 
              Full Stack Development and AI/ML. I specialize in building scalable web applications, developing intelligent 
              systems using computer vision and deep learning, and creating user-centered products that solve real-world problems.
            </p>

            <h3 style={{ color: 'var(--accent)', marginTop: '2rem', marginBottom: '1rem' }}>Technical Skills</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Languages</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'PHP', 'HTML/CSS'].map(skill => (
                  <span key={skill} style={{ 
                    padding: '0.4rem 0.8rem', 
                    backgroundColor: 'var(--card-bg)', 
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    border: '1px solid var(--border-color)'
                  }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Frontend</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['React', 'React Native', 'Next.js', 'Vue.js', 'Expo', 'jQuery'].map(skill => (
                  <span key={skill} style={{ 
                    padding: '0.4rem 0.8rem', 
                    backgroundColor: 'var(--card-bg)', 
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    border: '1px solid var(--border-color)'
                  }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Backend & Databases</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Node.js', 'Django', 'Flask', 'PostgreSQL', 'MySQL', 'REST APIs', 'GraphQL'].map(skill => (
                  <span key={skill} style={{ 
                    padding: '0.4rem 0.8rem', 
                    backgroundColor: 'var(--card-bg)', 
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    border: '1px solid var(--border-color)'
                  }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>AI/ML & Computer Vision</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['TensorFlow', 'PyTorch', 'Keras', 'OpenCV', 'Mediapipe', 'CNNs', 'GCNs', 'Transformers', 'NLP', 'DTW'].map(skill => (
                  <span key={skill} style={{ 
                    padding: '0.4rem 0.8rem', 
                    backgroundColor: 'var(--card-bg)', 
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    border: '1px solid var(--border-color)'
                  }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Cloud & DevOps</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['AWS', 'Docker', 'Git', 'GitHub Actions', 'Apache'].map(skill => (
                  <span key={skill} style={{ 
                    padding: '0.4rem 0.8rem', 
                    backgroundColor: 'var(--card-bg)', 
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    border: '1px solid var(--border-color)'
                  }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Other</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Raspberry Pi', 'Embedded Systems', 'IoT', 'Event-Based Vision', 'Agile', 'WordPress'].map(skill => (
                  <span key={skill} style={{ 
                    padding: '0.4rem 0.8rem', 
                    backgroundColor: 'var(--card-bg)', 
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    border: '1px solid var(--border-color)'
                  }}>{skill}</span>
                ))}
              </div>
            </div>

            <h3 style={{ color: 'var(--accent)', marginTop: '1.5rem' }}>What I work on</h3>
            <p style={{ marginBottom: '1rem' }}>
              - Full-stack web applications with modern frameworks and responsive design<br/>
              - AI/ML systems for computer vision, pose estimation, and natural language processing<br/>
              - Research in human pose estimation, ASL recognition, and event-based vision<br/>
              - Mobile applications with React Native and cross-platform development<br/>
              - Cloud infrastructure, automation, and performance optimization
            </p>

            <h3 style={{ color: 'var(--accent)', marginTop: '1.5rem' }}>Highlights</h3>
            <ul style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <li>Developed scalable SaaS modules at TopSource Worldwide and Hotspring, optimizing APIs and UI performance</li>
              <li>Published research in IEEE Access on human pose estimation using deep learning</li>
              <li>Built LangPal, a full-featured language learning platform with real-time chat and partner matching</li>
              <li>Created AI-powered applications for fitness form correction, slang detection, and autonomous driving</li>
              <li>Leading development of MavsPrep as ACM Create Member, providing academic resources to UTA students</li>
            </ul>

            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/"className="view-all-btn">← Back to Home</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}