import Link from 'next/link';
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <span>2025 Copyright | </span>
          <span>Powered by BD Network | </span>
          <Link href="/" className={styles.footerLink}>Pinterest Downloader</Link>
          <span> | </span>
          <Link href="/supported-urls" className={styles.footerLink}>Supported URL's</Link>
          <span> | </span>
          <Link href="/terms" className={styles.footerLink}>Terms</Link>
          <span> | </span>
          <Link href="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link>
          <span> | </span>
          <Link href="/about-us" className={styles.footerLink}>About Us</Link>
          <span> | </span>
          <Link href="/contact-us" className={styles.footerLink}>Contact Us</Link>
        </div>

        {/* <div className={styles.footerBottom}>
          <p>Built with Next.js 15 and Flask</p>
          <p>
            Powered by{' '}
            <a href="https://github.com/sean1832/pinterest-dl" target="_blank" rel="noreferrer">
              pinterest-dl
            </a>
          </p>
        </div> */}
      </div>
    </footer>
  )
}
