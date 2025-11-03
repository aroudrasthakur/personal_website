import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(null);
  function copy(text, id) {
    navigator.clipboard.writeText(text).then(()=> {
      setCopied(id);
      setTimeout(()=> setCopied(null), 1500);
    });
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '6rem' }}>
        <section className="container" style={{ padding: '4rem 0' }}>
          <div className="section-header"><h2>Contact</h2></div>

          <div style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-secondary)', textAlign: 'left' }}>
            <p style={{ marginBottom: '1rem' }}>I'd love to hear about your project or opportunity. Below are the best ways to reach me:</p>

            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="contact-line">
                <span>Email</span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <strong>aroudra.thakur@gmail.com</strong>
                  <button className="popup-button copy-button" onClick={()=>copy('aroudra.thakur@gmail.com','email')}>{copied === 'email' ? '✓ Copied' : 'Copy'}</button>
                </div>
              </div>

              <div className="contact-line">
                <span>Phone</span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <strong>+1 682 406 7019</strong>
                  <a className="popup-button copy-button" href="tel:+16824067019">Call</a>
                  <button className="popup-button copy-button" onClick={()=>copy('+1 682 406 7019','phone')}>{copied === 'phone' ? '✓ Copied' : 'Copy'}</button>
                </div>
              </div>

              <a className="contact-link" href="https://github.com/aroudrasthakur" target="_blank" rel="noreferrer">💻 GitHub</a>
              <a className="contact-link" href="https://www.linkedin.com/in/aroudra-thakur-69203630a/" target="_blank" rel="noreferrer">💼 LinkedIn</a>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/" className="view-all-btn">← Back to Home</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}