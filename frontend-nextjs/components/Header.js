import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>📌 Pinterest Downloader</h1>
      <p>
        Switch between single-pin and bulk downloads. Short links like{' '}
        <code>https://pin.it/3Cvk8e20t</code> are fully supported.
      </p>
    </header>
  )
}
