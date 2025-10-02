import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Built with Next.js 15 and Flask</p>
      <p>
        Powered by{' '}
        <a href="https://github.com/sean1832/pinterest-dl" target="_blank" rel="noreferrer">
          pinterest-dl
        </a>
      </p>
    </footer>
  )
}
