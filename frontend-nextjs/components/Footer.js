import Link from 'next/link';
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <span>2025 Copyright | </span>
          <span>Powered by BD Network | </span>
          <Link href="/video-downloader" className={styles.footerLink}>Video Downloader</Link>
          <span> | </span>
          <Link href="/image-downloader" className={styles.footerLink}>Image Downloader</Link>
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
