'use client'

import { useState } from 'react'
import styles from './../app/page.module.css'
import apiClient from '@/utils/apiClient'

export default function VideoDownloaderClient() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const [selectedFormat, setSelectedFormat] = useState('best')

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Please enter a Pinterest URL.')
      return
    }

    setLoading(true)
    setError(null)
    setWarning(null)
    setResult(null)

    try {
      const response = await apiClient.post('/api/scrape-video', {
        url: url.trim(),
        num: 1,
      })

      setResult(response.data)
      if (!response.data?.count || response.data.count === 0) {
        setError('No video found for this pin.')
      } else if (response.data.media[0].formats.length > 0) {
        setSelectedFormat('best')
      }
    } catch (error) {
      setResult(null)
      setError(error.response?.data?.error || 'Unable to fetch video.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadVideo = async () => {
    if (!url.trim()) {
      setError('Please enter a Pinterest URL.')
      return
    }

    try {
      setLoading(true)
      setWarning(null)
      const response = await apiClient.post('/api/download-video', {
        url: url.trim(),
        format_id: selectedFormat,
      })

      if (response.data.success && response.data.download_url) {
        if (response.data.warning) {
          setWarning(response.data.warning)
        }
        window.location.href = response.data.download_url
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Unable to download video.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleDownload()
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  const handleClear = () => {
    setUrl('')
    setResult(null)
    setError(null)
    setWarning(null)
  }

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.mainTitle}>Pinterest Video Downloader</h1>
        <p className={styles.subtitle}>
         Download Free Pinterest Videos in High Quality
        </p>

        <div className={styles.downloadSection}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.urlInput}
              placeholder="Paste Pinterest video URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className={styles.controlsWrapper}>
            <button
              className={styles.downloadBtn}
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Download'}
            </button>

            {url ? (
              <button className={styles.clearBtn} onClick={handleClear}>
                Clear
              </button>
            ) : (
              <button className={styles.pasteBtn} onClick={handlePasteFromClipboard}>
                Paste
              </button>
            )}
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {warning && <div className={styles.warning}>{warning}</div>}
      </section>

      {result && result.media && result.media.length > 0 && (
        <section className={styles.resultsSection}>
          <div className={styles.resultsContainer}>
            <h2 className={styles.resultsTitle}>Video Ready to Download</h2>

            <div className={styles.singleImageWrapper}>
              <img
                src={result.media[0].thumbnail}
                alt={result.media[0].title || 'Pinterest Video'}
                className={styles.singleImage}
              />

              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{result.media[0].title || 'Pinterest Video'}</h3>
                {result.media[0].duration > 0 && (
                  <p className={styles.videoDuration}>
                    Duration: {Math.floor(result.media[0].duration / 60)}:{(result.media[0].duration % 60).toString().padStart(2, '0')}
                  </p>
                )}
              </div>

              {result.media[0].formats && result.media[0].formats.length > 0 && (
                <div className={styles.formatSelector}>
                  <label htmlFor="quality-select" className={styles.formatLabel}>
                    Select Quality:
                  </label>
                  <select
                    id="quality-select"
                    className={styles.qualityDropdown}
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                  >
                    <option value="best">Best Quality</option>
                    {result.media[0].formats.map((format, idx) => (
                      <option key={idx} value={format.format_id}>
                        {format.quality} ({format.width}x{format.height})
                        {format.filesize ? ` - ${(format.filesize / 1024 / 1024).toFixed(1)}MB` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={handleDownloadVideo}
                className={styles.downloadLink}
                disabled={loading}
              >
                {loading ? 'Downloading...' : 'Download Video'}
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
