import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const current = router.pathname;

  const linkClass = (path) => current === path ? { color: 'var(--accent)' } : {};

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <Link href="/"aria-label="Home - Aroudra Thakur" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Aroudra Thakur</Link>
        </div>

        <ul>
          <li><Link href="/about" style={linkClass('/about')}>About</Link></li>
          <li><Link href="/experiences" style={linkClass('/experiences')}>Experience</Link></li>
          <li><Link href="/projects" style={linkClass('/projects')}>Projects</Link></li>
          <li><Link href="/contact" style={linkClass('/contact')}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}