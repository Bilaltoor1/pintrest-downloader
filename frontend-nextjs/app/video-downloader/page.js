'use client'

import { useState } from 'react'
import styles from './page.module.css'
import apiClient from '@/utils/apiClient'

export default function VideoDownloader() {
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
        // Set default format to best quality
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
        // Show warning if audio was not merged
        if (response.data.warning) {
          setWarning(response.data.warning)
        }
        
        // Trigger download
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
    <div className={styles.pageContainer}>
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
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {warning && <div className={styles.warning}>{warning}</div>}
        </section>
        
        {/* Results Section */}
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
    </div>
  )
}
