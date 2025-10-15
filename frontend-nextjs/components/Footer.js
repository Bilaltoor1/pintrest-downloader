import Link from 'next/link';
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <span>2025 Copyright | </span>
          <span>Powered by Bilal Toor | </span>
          <Link href="/" className={styles.footerLink}>Video Downloader</Link>
          <span> | </span>
          <Link href="/how-to" className={styles.footerLink}>How To</Link>
          <span> | </span>
          <Link href="/about-us" className={styles.footerLink}>About Us</Link>
          <span> | </span>
          <Link href="/contact-us" className={styles.footerLink}>Contact Us</Link>
          <span> | </span>
          <Link href="/terms" className={styles.footerLink}>Terms</Link>
          <span> | </span>
          <Link href="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
