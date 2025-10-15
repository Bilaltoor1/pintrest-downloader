'use client'

import { useState } from 'react'
import styles from '../app/image-downloader/page.module.css'
import apiClient from '@/utils/apiClient'

export default function ImageDownloaderClient() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('single') // 'single' or 'bulk'
  const [bulkCount, setBulkCount] = useState('10')
  const [downloadingZip, setDownloadingZip] = useState(false)

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Please enter a Pinterest URL.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const count = mode === 'single' ? 1 : parseInt(bulkCount) || 10
      const response = await apiClient.post('/api/scrape', {
        url: url.trim(),
        num: count,
      })

      setResult(response.data)
      if (!response.data?.count) {
        setError('No images found for this pin.')
      }
    } catch (error) {
      setResult(null)
      setError(error.response?.data?.error || 'Unable to fetch images.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadZip = async () => {
    if (!url.trim()) {
      setError('Please enter a Pinterest URL.')
      return
    }

    setDownloadingZip(true)
    setError(null)

    try {
      const count = parseInt(bulkCount) || 10
      const response = await apiClient.post('/api/download', {
        url: url.trim(),
        num: count,
        download_video: false,
        caption: 'none',
      })

      if (response.data.success && response.data.download_url) {
        // Trigger download by navigating to the URL
        const downloadUrl = response.data.download_url
        window.location.href = downloadUrl
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Unable to download ZIP.')
    } finally {
      setDownloadingZip(false)
    }
  }

  const handleDownloadImage = async (imageUrl, fileName) => {
    try {
      const response = await apiClient.post('/api/download-direct', { media_url: imageUrl }, { responseType: 'blob' })
      const blob = response.data
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName || `pinterest_image_${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
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
  }

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.mainTitle}>Pinterest Image Downloader</h1>
        <p className={styles.subtitle}>
          Save Pinterest Images Instantly - Fast, Online, and Always Free Download Pinterest Images
        </p>
        
        <div className={styles.downloadSection}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.urlInput}
              placeholder="Paste Pinterest image URL here..."
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
                Paste From Clipboard
              </button>
            )}
            
            <div className={styles.modeSelector}>
              <select 
                className={styles.modeDropdown}
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="single">Single</option>
                <option value="bulk">Bulk</option>
              </select>
              
              {mode === 'bulk' && (
                <input
                  type="number"
                  className={styles.countInput}
                  placeholder="Count"
                  value={bulkCount}
                  onChange={(e) => setBulkCount(e.target.value)}
                  min="1"
                  max="100"
                />
              )}
            </div>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}
      </section>
      
      {/* Results Section */}
      {result && result.media && result.media.length > 0 && (
        <section className={styles.resultsSection}>
          <div className={styles.resultsContainer}>
            <h2 className={styles.resultsTitle}>
              {result.count === 1 ? 'Downloaded Image' : `${result.count} Images Found`}
            </h2>
            
            {result.count === 1 ? (
              // Single Image - Centered
              <div className={styles.singleImageWrapper}>
                <img 
                  src={result.media[0].src} 
                  alt={result.media[0].alt || 'Pinterest Image'}
                  className={styles.singleImage}
                />
                <button
                  onClick={() => handleDownloadImage(
                    result.media[0].src, 
                    `pinterest_${result.media[0].id}.jpg`
                  )}
                  className={styles.downloadLink}
                >
                  Download Image ({result.media[0].resolution.x}x{result.media[0].resolution.y})
                </button>
              </div>
            ) : (
              // Multiple Images - Grid
              <>
                <div className={styles.imageGrid}>
                  {result.media.map((image, idx) => (
                    <div key={idx} className={styles.imageCard}>
                      <img 
                        src={image.src} 
                        alt={image.alt || `Pinterest Image ${idx + 1}`}
                        className={styles.gridImage}
                      />
                      <button
                        onClick={() => handleDownloadImage(
                          image.src, 
                          `pinterest_${image.id || idx}.jpg`
                        )}
                        className={styles.downloadLinkSmall}
                      >
                        Download ({image.resolution.x}x{image.resolution.y})
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Bulk Download ZIP Button */}
                <div className={styles.bulkDownloadWrapper}>
                  <button
                    onClick={handleDownloadZip}
                    disabled={downloadingZip}
                    className={styles.downloadZipBtn}
                  >
                    {downloadingZip ? '⏳ Creating ZIP...' : '📦 Download All as ZIP'}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  )
}
