import Link from 'next/link';
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            PINVIDEO
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Video Downloader</Link>
          <Link href="/image-downloader" className={styles.navLink}>Image Downloader</Link>
          <Link href="/how-to" className={styles.navLink}>How To</Link>
        </nav>
      </div>
    </header>
  )
}
