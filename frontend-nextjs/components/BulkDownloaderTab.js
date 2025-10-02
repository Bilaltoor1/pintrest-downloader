'use client'

import { useState } from 'react'
import axios from 'axios'
import styles from './BulkDownloaderTab.module.css'
import MediaTable from './MediaTable'

const DEFAULT_BULK_COUNT = 30
const MAX_BULK_COUNT = 150

export default function BulkDownloaderTab({ apiUrl }) {
  const [bulkUrl, setBulkUrl] = useState('')
  const [bulkNumImages, setBulkNumImages] = useState(DEFAULT_BULK_COUNT)
  const [bulkMinResolution, setBulkMinResolution] = useState('')
  const [bulkDownloadVideo, setBulkDownloadVideo] = useState(false)
  const [bulkCaption, setBulkCaption] = useState('none')
  const [bulkLoading, setBulkLoading] = useState(false)
  const [bulkDownloading, setBulkDownloading] = useState(false)
  const [bulkResult, setBulkResult] = useState(null)
  const [bulkDownloadResult, setBulkDownloadResult] = useState(null)
  const [bulkError, setBulkError] = useState(null)

  const handleBulkFetch = async () => {
    if (!bulkUrl.trim()) {
      setBulkError('Enter a Pinterest board, pin, or profile URL first.')
      return
    }

    setBulkLoading(true)
    setBulkError(null)
    setBulkResult(null)
    setBulkDownloadResult(null)

    try {
      const response = await axios.post(`${apiUrl}/api/scrape`, {
        url: bulkUrl.trim(),
        num: bulkNumImages,
        min_resolution: bulkMinResolution.trim() || null,
      })

      setBulkResult(response.data)

      if (!response.data?.count) {
        setBulkError('No media was returned for this URL. Try raising the limit or removing the resolution filter.')
      }
    } catch (error) {
      setBulkResult(null)
      setBulkError(error.response?.data?.error || 'Unable to fetch media for this URL.')
    } finally {
      setBulkLoading(false)
    }
  }

  const handleBulkDownload = async () => {
    if (!bulkUrl.trim()) {
      setBulkError('Enter a Pinterest board, pin, or profile URL first.')
      return
    }

    if (!bulkResult?.count) {
      setBulkError('Fetch media first to verify the preview before downloading.')
      return
    }

    setBulkDownloading(true)
    setBulkError(null)
    setBulkDownloadResult(null)

    try {
      const response = await axios.post(`${apiUrl}/api/download`, {
        url: bulkUrl.trim(),
        num: bulkNumImages,
        min_resolution: bulkMinResolution.trim() || null,
        download_video: bulkDownloadVideo,
        caption: bulkCaption,
      })

      setBulkDownloadResult(response.data)
    } catch (error) {
      setBulkError(error.response?.data?.error || 'Unable to prepare the download package.')
    } finally {
      setBulkDownloading(false)
    }
  }

  return (
    <div className={styles.tabPanel}>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Pinterest URL (Board / Pin / Profile)</label>
          <input
            type="text"
            placeholder="https://www.pinterest.com/..."
            value={bulkUrl}
            onChange={(e) => setBulkUrl(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Number of Media</label>
            <input
              type="number"
              value={bulkNumImages}
              min="1"
              max={MAX_BULK_COUNT}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (Number.isNaN(value)) {
                  setBulkNumImages(1)
                  return
                }
                setBulkNumImages(Math.min(Math.max(value, 1), MAX_BULK_COUNT))
              }}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Min Resolution (optional)</label>
            <input
              type="text"
              placeholder="e.g., 512x512"
              value={bulkMinResolution}
              onChange={(e) => setBulkMinResolution(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formOptions}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={bulkDownloadVideo}
              onChange={(e) => setBulkDownloadVideo(e.target.checked)}
            />
            <span>Download videos when available</span>
          </label>

          <div className={styles.formGroup}>
            <label>Caption Format</label>
            <select
              value={bulkCaption}
              onChange={(e) => setBulkCaption(e.target.value)}
              className={styles.input}
            >
              <option value="none">None</option>
              <option value="txt">Text File</option>
              <option value="json">JSON File</option>
              <option value="metadata">Embed in Image</option>
            </select>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            onClick={handleBulkFetch}
            disabled={bulkLoading || !bulkUrl.trim()}
            className={styles.btnSecondary}
          >
            {bulkLoading ? 'Fetching...' : 'Fetch Media'}
          </button>
          <button
            onClick={handleBulkDownload}
            disabled={bulkDownloading || !bulkResult?.count}
            className={styles.btnPrimary}
          >
            {bulkDownloading ? 'Preparing ZIP...' : 'Download ZIP'}
          </button>
        </div>
      </div>

      {bulkError && (
        <div className={styles.error}>
          <strong>Error:</strong> {bulkError}
        </div>
      )}

      {bulkResult && (
        <div className={styles.result}>
          <div className={styles.resultHeader}>
            <h3>Bulk Preview</h3>
            <span className={styles.badge}>{bulkResult.count || 0} items</span>
          </div>

          {bulkResult.count ? (
            <>
              <p>
                Showing up to {Math.min((bulkResult.media || []).length, 15)} of {bulkResult.count} items.
              </p>
              <MediaTable 
                items={bulkResult.media || []} 
                limit={15}
                apiUrl={apiUrl}
              />
            </>
          ) : (
            <p className={styles.emptyState}>
              No media returned. Try a different URL or adjust the filters.
            </p>
          )}

          {bulkDownloadResult && (
            <div className={styles.downloadBanner}>
              <p>
                {bulkDownloadResult.download_url
                  ? `Ready! ${bulkDownloadResult.count || 0} files packaged for download.`
                  : 'Download completed.'}
              </p>
              {bulkDownloadResult.download_url && (
                <a
                  href={`${apiUrl}${bulkDownloadResult.download_url}`}
                  className={styles.btnPrimary}
                  download
                >
                  Save ZIP
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
