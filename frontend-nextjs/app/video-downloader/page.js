'use client'

import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from './page.module.css'
import apiClient from '@/utils/apiClient'

export default function VideoDownloader() {
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
        setError('No videos found for this pin.')
      }
    } catch (error) {
      setResult(null)
      setError(error.response?.data?.error || 'Unable to fetch videos.')
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
        download_video: true,
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

  const handleDownloadMedia = async (mediaUrl, fileName) => {
    try {
      const response = await apiClient.post('/api/download-direct', { media_url: mediaUrl }, { responseType: 'blob' })
      const blob = response.data
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName || `pinterest_media_${Date.now()}.mp4`
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
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.mainTitle}>Pinterest Video Downloader</h1>
          <p className={styles.subtitle}>
            Save Pinterest Videos Instantly - Fast, Online, and Always Free Download Pinterest Videos
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
                {result.count === 1 ? 'Downloaded Video' : `${result.count} Videos Found`}
              </h2>
              
              {result.count === 1 ? (
                // Single Video - Centered
                <div className={styles.singleImageWrapper}>
                  <img 
                    src={result.media[0].src} 
                    alt={result.media[0].alt || 'Pinterest Video'}
                    className={styles.singleImage}
                  />
                  <button
                    onClick={() => handleDownloadMedia(
                      result.media[0].src, 
                      `pinterest_video_${result.media[0].id}.mp4`
                    )}
                    className={styles.downloadLink}
                  >
                    Download Video ({result.media[0].resolution.x}x{result.media[0].resolution.y})
                  </button>
                </div>
              ) : (
                // Multiple Videos - Grid
                <>
                  <div className={styles.imageGrid}>
                    {result.media.map((video, idx) => (
                      <div key={idx} className={styles.imageCard}>
                        <img 
                          src={video.src} 
                          alt={video.alt || `Pinterest Video ${idx + 1}`}
                          className={styles.gridImage}
                        />
                        <button
                          onClick={() => handleDownloadMedia(
                            video.src, 
                            `pinterest_video_${video.id || idx}.mp4`
                          )}
                          className={styles.downloadLinkSmall}
                        >
                          Download ({video.resolution.x}x{video.resolution.y})
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

        {/* What is Pinterest Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What is Pinterest?</h2>
          <p className={styles.sectionText}>
            Pinterest is a visual discovery engine where users can find ideas for recipes, home and style inspiration, and much more. It's a platform where billions of pins and videos are shared daily, making it a treasure trove of creative content.
          </p>
        </section>

        {/* Download in High Quality Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Download Pinterest videos in 1080p, 4k High Quality</h2>
          <p className={styles.sectionText}>
            Our Pinterest video downloader allows you to save videos in the highest quality available, including 1080p and 4K resolution. Get crystal clear videos without any watermarks or quality loss.
          </p>
        </section>

        {/* Why Use Our Downloader Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why You Should Use Our Pinterest Video Downloader</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Download Pinterest Videos in High Quality</h3>
              <p className={styles.featureText}>
                Get your favorite Pinterest videos in the best quality available - from HD to 4K resolution.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Easy for All Devices</h3>
              <p className={styles.featureText}>
                Works seamlessly on desktop, mobile, and tablets. Download videos from any device, anywhere.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Free to Use</h3>
              <p className={styles.featureText}>
                100% free with no hidden charges, no registration required, and unlimited downloads.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use from Mobile Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to use Pinterest Video Downloader from Mobile?</h2>
          <ol className={styles.stepsList}>
            <li>Open the Pinterest app and find the video you want to download</li>
            <li>Tap the share button and select "Copy Link"</li>
            <li>Open your mobile browser and visit our website</li>
            <li>Paste the link in the input field and tap "Download"</li>
            <li>Choose your preferred quality and save the video to your device</li>
          </ol>
        </section>

        {/* What Makes yttmp3 Best Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What makes yttmp3 the best Pinterest downloader?</h2>
          <ul className={styles.featuresList}>
            <li>Lightning-fast download speeds</li>
            <li>No registration or login required</li>
            <li>Support for all video qualities including 4K</li>
            <li>No watermarks on downloaded videos</li>
            <li>Works on all devices and platforms</li>
            <li>100% safe and secure downloads</li>
            <li>Unlimited downloads with no restrictions</li>
          </ul>
        </section>

        {/* How to Use from PC/Laptop Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Use Pinterest Video Downloader From PC/Laptop?</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <h3 className={styles.stepTitle}>Step 1: Copy the Video URL</h3>
              <p className={styles.stepText}>
                Open Pinterest, navigate to the video you want to download, and copy the URL from your browser's address bar.
              </p>
            </div>
            <div className={styles.stepCard}>
              <h3 className={styles.stepTitle}>Step 2: Paste the Link & Press the Download Button</h3>
              <p className={styles.stepText}>
                Paste the copied URL into the input field above and click the "Download" button to process the video.
              </p>
            </div>
            <div className={styles.stepCard}>
              <h3 className={styles.stepTitle}>Step 3: Download the Video</h3>
              <p className={styles.stepText}>
                Select your preferred quality from the available options and click download to save the video to your computer.
              </p>
            </div>
          </div>
        </section>

        {/* Is yttmp3 Safe Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Is yttmp3 Safe?</h2>
          <p className={styles.sectionText}>
            Absolutely! yttmp3 is completely safe to use. We don't store any of your data, require no registration, and have no malicious ads or pop-ups. Your privacy and security are our top priorities. Our service runs entirely in your browser, ensuring your downloads are private and secure.
          </p>
        </section>

        {/* Does yttmp3 Work on Mobile Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Does yttmp3 Work on Mobile?</h2>
          <p className={styles.sectionText}>
            Yes! yttmp3 works perfectly on all mobile devices including iOS and Android smartphones and tablets. Our responsive design ensures a seamless experience regardless of your device. Simply open your mobile browser, paste the Pinterest URL, and download your video in seconds.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
