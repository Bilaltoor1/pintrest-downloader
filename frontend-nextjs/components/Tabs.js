import styles from './Tabs.module.css'

export default function Tabs({ activeTab, onTabChange }) {
  return (
    <div className={styles.tabs}>
      <button
        type="button"
        className={`${styles.tabButton} ${activeTab === 'single' ? styles.active : ''}`}
        onClick={() => onTabChange('single')}
      >
        Single Pin
      </button>
      <button
        type="button"
        className={`${styles.tabButton} ${activeTab === 'bulk' ? styles.active : ''}`}
        onClick={() => onTabChange('bulk')}
      >
        Bulk Downloader
      </button>
    </div>
  )
}
