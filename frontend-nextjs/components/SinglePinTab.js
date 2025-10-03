'use client'

import { useState } from 'react'
import apiClient from '@/utils/apiClient'
import styles from './SinglePinTab.module.css'
import { getPrimaryMedia, getPinTitle, getAltText, getResolution } from '../utils/mediaHelpers'
import MediaTable from './MediaTable'

export default function SinglePinTab() {
  const [singleUrl, setSingleUrl] = useState('')
  const [singleDownloadVideo, setSingleDownloadVideo] = useState(false)
  const [singleCaption, setSingleCaption] = useState('none')
  const [singleLoading, setSingleLoading] = useState(false)
  const [singleDownloading, setSingleDownloading] = useState(false)
  const [singleResult, setSingleResult] = useState(null)
  const [singleDownloadResult, setSingleDownloadResult] = useState(null)
  const [singleError, setSingleError] = useState(null)

  const singlePreviewItem = singleResult?.media?.[0] || null
  const singlePreviewMedia = singlePreviewItem ? getPrimaryMedia(singlePreviewItem) : null

  const handleSingleFetch = async () => {
    if (!singleUrl.trim()) {
      setSingleError('Please paste a Pinterest pin URL.')
      return
    }

    setSingleLoading(true)
    setSingleError(null)
    setSingleResult(null)
    setSingleDownloadResult(null)

    try {
      const response = await apiClient.post('/api/scrape', {
        url: singleUrl.trim(),
        num: 1,
      })

      setSingleResult(response.data)
      console.log(response.data)
      if (!response.data?.count) {
        setSingleError('No media found for this pin. Double-check the URL and try again.')
      }
    } catch (error) {
      setSingleResult(null)
      setSingleError(error.response?.data?.error || 'Unable to fetch data for this pin.')
    } finally {
      setSingleLoading(false)
    }
  }

  const handleSingleDownload = async () => {
    if (!singleUrl.trim()) {
      setSingleError('Please paste a Pinterest pin URL.')
      return
    }

    if (!singleResult?.count) {
      setSingleError('Fetch the pin first so you can verify the preview before downloading.')
      return
    }

    setSingleDownloading(true)
    setSingleError(null)
    setSingleDownloadResult(null)

    try {
      const response = await apiClient.post('/api/download-single', {
        url: singleUrl.trim(),
        download_video: singleDownloadVideo,
        caption: singleCaption,
      })

      if (response.data.success && response.data.download_url) {
        const downloadResponse = await apiClient.get(response.data.download_url, {
          responseType: 'blob'
        })

        const blob = new Blob([downloadResponse.data])
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = response.data.filename || 'pinterest_media'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        setSingleDownloadResult({ 
          message: `Downloaded ${response.data.filename} successfully!`,
          ...response.data 
        })
      } else {
        setSingleError('Failed to prepare download. Please try again.')
      }
    } catch (error) {
      setSingleError(error.response?.data?.error || 'Unable to download this pin right now.')
    } finally {
      setSingleDownloading(false)
    }
  }

  return (
    <div className={styles.tabPanel}>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Pin URL</label>
          <input
            type="text"
            placeholder="e.g., https://pin.it/3Cvk8e20t"
            value={singleUrl}
            onChange={(e) => setSingleUrl(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={`${styles.formOptions} ${styles.compact}`}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={singleDownloadVideo}
              onChange={(e) => setSingleDownloadVideo(e.target.checked)}
            />
            <span>Include video stream if available</span>
          </label>

          <div className={styles.formGroup}>
            <label>Caption Format</label>
            <select
              value={singleCaption}
              onChange={(e) => setSingleCaption(e.target.value)}
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
            onClick={handleSingleFetch}
            disabled={singleLoading || !singleUrl.trim()}
            className={styles.btnSecondary}
          >
            {singleLoading ? 'Fetching...' : 'Fetch Pin'}
          </button>
          <button
            onClick={handleSingleDownload}
            disabled={singleDownloading || !singleResult?.count}
            className={styles.btnPrimary}
          >
            {singleDownloading ? 'Preparing download...' : 'Download Pin'}
          </button>
        </div>
      </div>

      {singleError && (
        <div className={styles.error}>
          <strong>Error:</strong> {singleError}
        </div>
      )}

      {singleResult && (
        <div className={styles.result}>
          <div className={styles.resultHeader}>
            <h3>Single Pin Preview</h3>
            <span className={styles.badge}>{singleResult.count || 0} item</span>
          </div>

          {singleResult.count ? (
            <>
              {singlePreviewItem && singlePreviewMedia && (
                <div className={styles.pinPreviewCard}>
                  <div className={styles.pinPreviewMedia}>
                    {singlePreviewMedia.type === 'video' ? (
                      <video
                        src={singlePreviewMedia.src}
                        controls
                        playsInline
                        className={styles.previewMediaElement}
                      />
                    ) : (
                      <img
                        src={singlePreviewMedia.src}
                        alt={getAltText(singlePreviewItem)}
                        className={styles.previewMediaElement}
                      />
                    )}
                  </div>
                  <div className={styles.pinPreviewDetails}>
                    <h4>{getPinTitle(singlePreviewItem)}</h4>
                    <p className={styles.pinPreviewMeta}>
                      Resolution: {getResolution(singlePreviewItem)}
                    </p>
                    <p className={styles.pinPreviewDescription}>
                      {getAltText(singlePreviewItem)}
                    </p>
                  </div>
                </div>
              )}

              <MediaTable 
                items={singleResult.media || []} 
                limit={1}
              />
            </>
          ) : (
            <p className={styles.emptyState}>No preview available. Try another pin URL.</p>
          )}

          {singleDownloadResult && (
            <div className={styles.downloadBanner}>
              <p>
                {singleDownloadResult.filename
                  ? `Downloaded ${singleDownloadResult.filename}.`
                  : 'Download completed.'}
              </p>
              {singleDownloadResult.download_url && (
                <a
                  href={singleDownloadResult.download_url}
                  className={styles.btnPrimary}
                  download
                >
                  Download again
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
