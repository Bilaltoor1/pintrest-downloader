import Link from 'next/link';
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <h1>📌 YTTMP3.com</h1>
            <span className={styles.subtitle}>Pinterest Downloader</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/how-to" className={styles.navLink}>How To</Link>
          <Link href="/supported-urls" className={styles.navLink}>Supported URLs</Link>
          <Link href="/about-us" className={styles.navLink}>About Us</Link>
          <Link href="/contact-us" className={styles.navLink}>Contact Us</Link>
        </nav>
      </div>

      <div className={styles.description}>
        <p>
          Switch between single-pin and bulk downloads. Short links like{' '}
          <code>https://pin.it/3Cvk8e20t</code> are fully supported.
        </p>
      </div>
    </header>
  )
}
