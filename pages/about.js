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
              I'm Aroudra Thakur — a Full Stack and AI/ML Software Engineer passionate about building reliable,
              scalable, and user-centered products. My background blends web engineering, computer vision,
              and cloud-native architecture. I enjoy designing clean APIs, optimizing performance, and applying
              ML where it can deliver real user value.
            </p>

            <h3 style={{ color: 'var(--accent)', marginTop: '1.5rem' }}>What I work on</h3>
            <p style={{ marginBottom: '1rem' }}>
              - Front-end engineering: React, Vue, responsive design, accessibility and performance tuning.<br/>
              - Back-end systems: Node.js, Python, REST/GraphQL APIs, and relational / document databases.<br/>
              - Machine learning & computer vision: prototyping, model deployment, and integrating ML inference into apps.<br/>
              - Cloud & DevOps: containerization (Docker), CI/CD (GitHub Actions), and AWS deployments.
            </p>

            <h3 style={{ color: 'var(--accent)', marginTop: '1.5rem' }}>Approach & values</h3>
            <p style={{ marginBottom: '1rem' }}>
              I value clear communication, testable code, and incremental delivery. I enjoy mentoring and knowledge-sharing,
              and I try to keep accessibility and performance top-of-mind while shipping user-facing features.
            </p>

            <h3 style={{ color: 'var(--accent)', marginTop: '1.5rem' }}>Highlights</h3>
            <ul style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <li>Led development of a multi-tenant SaaS dashboard used by enterprise customers.</li>
              <li>Built a real-time computer vision prototype for object detection and analytics.</li>
              <li>Automated testing + CI/CD pipelines to improve release confidence and reduce manual work.</li>
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