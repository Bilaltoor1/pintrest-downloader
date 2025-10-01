import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')
const DEFAULT_BULK_COUNT = 30
const MAX_BULK_COUNT = 150

const resolveMediaUrl = (item = {}) => {
  const candidates = [
    item.image_url,
    item.url,
    item.media_url,
    item.content_url,
    item.thumbnail_url,
    item.cover_image_url,
    item.link,
    item.href,
    item.permalink,
  ]

  if (item.original?.url) {
    candidates.push(item.original.url)
  }

  if (item.source_url) {
    candidates.push(item.source_url)
  }

  if (item.images) {
    if (Array.isArray(item.images)) {
      item.images.forEach((img) => {
        if (!img) return
        if (typeof img === 'string') {
          candidates.push(img)
        } else if (typeof img === 'object' && img.url) {
          candidates.push(img.url)
        }
      })
    } else if (typeof item.images === 'object') {
      Object.values(item.images).forEach((img) => {
        if (!img) return
        if (typeof img === 'string') {
          candidates.push(img)
        } else if (img.url) {
          candidates.push(img.url)
        }
      })
    }
  }

  return candidates.find((value) => typeof value === 'string' && value.startsWith('http')) || ''
}

const resolveVideoUrl = (item = {}) => {
  const candidates = [
    item.video_url,
    item.videoUrl,
    item?.videos?.video_list?.V_1080P?.url,
    item?.videos?.video_list?.V_720P?.url,
    item?.videos?.video_list?.V_480P?.url,
    item?.videos?.video_list?.V_360P?.url,
    item?.videos?.video_list?.V_240P?.url,
    item?.videos?.video_list?.V_144P?.url,
  ]

  const visit = (value) => {
    if (!value) return
    if (typeof value === 'string') {
      candidates.push(value)
      return
    }
    if (Array.isArray(value)) {
      value.forEach(visit)
      return
    }
    if (typeof value === 'object') {
      Object.values(value).forEach(visit)
    }
  }

  visit(item.videos)
  visit(item.video)

  return candidates.find((value) => typeof value === 'string' && value.startsWith('http')) || ''
}

const getPrimaryMedia = (item = {}) => {
  const videoSrc = resolveVideoUrl(item)
  if (videoSrc) {
    return { type: 'video', src: videoSrc }
  }

  const imageSrc = resolveMediaUrl(item)
  if (imageSrc) {
    return { type: 'image', src: imageSrc }
  }

  return null
}

const pickDimension = (candidates = []) =>
  candidates.find((value) => typeof value === 'number' && Number.isFinite(value) && value > 0)

const getResolution = (item = {}) => {
  const dims = item.dimensions || item.dimension || item.original_dimensions || item.original_size || {}
  const width = pickDimension([
    item.width,
    item.image_width,
    item.media_width,
    item.original_width,
    item.resource_width,
    dims.width,
    item.size?.width,
  ])
  const height = pickDimension([
    item.height,
    item.image_height,
    item.media_height,
    item.original_height,
    item.resource_height,
    dims.height,
    item.size?.height,
  ])

  if (width && height) {
    return `${width}×${height}`
  }
  return '—'
}

const getAltText = (item = {}) =>
  item.alt || item.description || item.title || item.note || item.rich_summary?.display_name || '—'

const getPinTitle = (item = {}) => {
  const candidates = [
    item.title,
    item.grid_title,
    item.page_title,
    item.rich_metadata?.title,
    item.rich_summary?.display_name,
    item.note,
    item.description,
  ]

  return candidates.find((value) => typeof value === 'string' && value.trim()) || 'Pinterest Pin'
}

function App() {
  const [activeTab, setActiveTab] = useState('single')
  const [hasCookies, setHasCookies] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState(null)

  // Single-pin state
  const [singleUrl, setSingleUrl] = useState('')
  const [singleDownloadVideo, setSingleDownloadVideo] = useState(false)
  const [singleCaption, setSingleCaption] = useState('none')
  const [singleLoading, setSingleLoading] = useState(false)
  const [singleDownloading, setSingleDownloading] = useState(false)
  const [singleResult, setSingleResult] = useState(null)
  const [singleDownloadResult, setSingleDownloadResult] = useState(null)
  const [singleError, setSingleError] = useState(null)

  // Bulk state
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

  // Individual download state
  const [downloadingItems, setDownloadingItems] = useState(new Set())

  const singlePreviewItem = singleResult?.media?.[0] || null
  const singlePreviewMedia = singlePreviewItem ? getPrimaryMedia(singlePreviewItem) : null

  useEffect(() => {
    checkCookiesStatus()
  }, [])

  const checkCookiesStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cookies/status`)
      setHasCookies(response.data.has_cookies)
    } catch (error) {
      console.error('Error checking cookies:', error)
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'single') {
      setBulkError(null)
    } else {
      setSingleError(null)
    }
  }

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
      const response = await axios.post(`${API_URL}/api/scrape`, {
        url: singleUrl.trim(),
        num: 1,
      })

      setSingleResult(response.data)

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
      // Use the new download-single endpoint that handles Pinterest URLs directly
      const response = await axios.post(`${API_URL}/api/download-single`, {
        url: singleUrl.trim(),
        download_video: singleDownloadVideo,
        caption: singleCaption,
      })

      if (response.data.success && response.data.download_url) {
        // Download the file using the returned download URL
        const downloadResponse = await axios.get(`${API_URL}${response.data.download_url}`, {
          responseType: 'blob'
        })

        // Create download link
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
      const response = await axios.post(`${API_URL}/api/scrape`, {
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
      const response = await axios.post(`${API_URL}/api/download`, {
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

  const handleLogin = async () => {
    setAuthLoading(true)
    setAuthError(null)

    try {
      await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      })
      alert('Successfully logged in!')
      setHasCookies(true)
      setShowLogin(false)
      setEmail('')
      setPassword('')
    } catch (error) {
      setAuthError(error.response?.data?.error || 'Login failed. Please check your credentials.')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSingleItemDownload = async (item, index) => {
    const mediaUrl = resolveMediaUrl(item)
    if (!mediaUrl) {
      alert('No valid media URL found for this item')
      return
    }

    const itemKey = `${mediaUrl}-${index}`
    setDownloadingItems(prev => new Set([...prev, itemKey]))

    try {
      // Use direct download endpoint for original file format
      const response = await axios.post(`${API_URL}/api/download-direct`, {
        media_url: mediaUrl
      }, {
        responseType: 'blob'
      })

      // Get filename from headers or generate one
      const contentDisposition = response.headers['content-disposition']
      let filename = 'media'
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      } else {
        // Generate filename based on media URL
        const urlParts = mediaUrl.split('/')
        const lastPart = urlParts[urlParts.length - 1]
        if (lastPart && lastPart.includes('.')) {
          filename = lastPart.split('?')[0] // Remove query params
        } else {
          // Determine extension based on item type
          const isVideo = item.video_url || item.type === 'video' || mediaUrl.includes('.mp4')
          filename = `media_${Date.now()}.${isVideo ? 'mp4' : 'jpg'}`
        }
      }

      // Create download link
      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to download this item')
    } finally {
      setDownloadingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemKey)
        return newSet
      })
    }
  }

  const renderMediaTable = (items = [], limit = 10) => {
    const rows = items.slice(0, limit).map((item, index) => {
      const src = resolveMediaUrl(item)
      if (!src) {
        return null
      }

      const itemKey = `${src}-${index}`
      const isDownloading = downloadingItems.has(itemKey)

      return (
        <tr key={`${src}-${index}`}>
          <td>{index + 1}</td>
          <td>
            <img src={src} alt={getAltText(item)} className="media-thumb" />
          </td>
          <td>{getAltText(item)}</td>
          <td>{getResolution(item)}</td>
          <td>
            <div className="action-buttons">
              <a href={src} target="_blank" rel="noreferrer" className="btn-link">
                View
              </a>
              <button
                onClick={() => handleSingleItemDownload(item, index)}
                disabled={isDownloading}
                className="btn-download"
              >
                {isDownloading ? 'Downloading...' : 'Download'}
              </button>
            </div>
          </td>
        </tr>
      )
    })

    return rows.filter(Boolean)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📌 Pinterest Downloader</h1>
        <p>
          Switch between single-pin and bulk downloads. Short links like <code>https://pin.it/3Cvk8e20t</code> are fully supported.
        </p>
      </header>

      <div className="container">
        <div className="login-status">
          {hasCookies ? (
            <span className="status-badge success">✓ Logged In (Private boards accessible)</span>
          ) : (
            <span className="status-badge warning">⚠ Not logged in (Public only)</span>
          )}
          <button onClick={() => setShowLogin(!showLogin)} className="btn-secondary">
            {showLogin ? 'Cancel' : 'Login to Pinterest'}
          </button>
        </div>

        {showLogin && (
          <div className="login-form">
            <h3>Login to Pinterest</h3>
            <input
              type="email"
              placeholder="Pinterest Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input"
            />
            <button onClick={handleLogin} disabled={authLoading} className="btn-primary">
              {authLoading ? 'Logging in...' : 'Login'}
            </button>
            {authError && <p className="error-inline">{authError}</p>}
          </div>
        )}

        <div className="tabs">
          <button
            type="button"
            className={`tab-button ${activeTab === 'single' ? 'active' : ''}`}
            onClick={() => handleTabChange('single')}
          >
            Single Pin
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === 'bulk' ? 'active' : ''}`}
            onClick={() => handleTabChange('bulk')}
          >
            Bulk Downloader
          </button>
        </div>

        {activeTab === 'single' ? (
          <div className="tab-panel">
            <div className="form">
              <div className="form-group">
                <label>Pin URL</label>
                <input
                  type="text"
                  placeholder="e.g., https://pin.it/3Cvk8e20t"
                  value={singleUrl}
                  onChange={(event) => setSingleUrl(event.target.value)}
                  className="input"
                />
              </div>

              <div className="form-options compact">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={singleDownloadVideo}
                    onChange={(event) => setSingleDownloadVideo(event.target.checked)}
                  />
                  <span>Include video stream if available</span>
                </label>

                <div className="form-group">
                  <label>Caption Format</label>
                  <select
                    value={singleCaption}
                    onChange={(event) => setSingleCaption(event.target.value)}
                    className="input"
                  >
                    <option value="none">None</option>
                    <option value="txt">Text File</option>
                    <option value="json">JSON File</option>
                    <option value="metadata">Embed in Image</option>
                  </select>
                </div>
              </div>

              <div className="actions">
                <button
                  onClick={handleSingleFetch}
                  disabled={singleLoading || !singleUrl.trim()}
                  className="btn-secondary"
                >
                  {singleLoading ? 'Fetching...' : 'Fetch Pin'}
                </button>
                <button
                  onClick={handleSingleDownload}
                  disabled={singleDownloading || !singleResult?.count}
                  className="btn-primary"
                >
                  {singleDownloading ? 'Preparing download...' : 'Download Pin'}
                </button>
              </div>
            </div>

            {singleError && (
              <div className="error">
                <strong>Error:</strong> {singleError}
              </div>
            )}

            {singleResult && (
              <div className="result">
                <div className="result-header">
                  <h3>Single Pin Preview</h3>
                  <span className="badge">{singleResult.count || 0} item</span>
                </div>

                {singleResult.count ? (
                  <>
                    {singlePreviewItem && singlePreviewMedia && (
                      <div className="pin-preview-card">
                        <div className="pin-preview-media">
                          {singlePreviewMedia.type === 'video' ? (
                            <video
                              src={singlePreviewMedia.src}
                              controls
                              playsInline
                              className="preview-media-element"
                            />
                          ) : (
                            <img
                              src={singlePreviewMedia.src}
                              alt={getAltText(singlePreviewItem)}
                              className="preview-media-element"
                            />
                          )}
                        </div>
                        <div className="pin-preview-details">
                          <h4>{getPinTitle(singlePreviewItem)}</h4>
                          <p className="pin-preview-meta">Resolution: {getResolution(singlePreviewItem)}</p>
                          <p className="pin-preview-description">{getAltText(singlePreviewItem)}</p>
                        </div>
                      </div>
                    )}

                    <div className="table-wrapper">
                      <table className="media-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Preview</th>
                            <th>Description</th>
                            <th>Resolution</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>{renderMediaTable(singleResult.media || [], 1)}</tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <p className="empty-state">No preview available. Try another pin URL.</p>
                )}

                {singleDownloadResult && (
                  <div className="download-banner">
                    <p>
                      {singleDownloadResult.filename
                        ? `Downloaded ${singleDownloadResult.filename}.`
                        : 'Download completed.'}
                    </p>
                    {singleDownloadResult.download_url && (
                      <a
                        href={`${API_URL}${singleDownloadResult.download_url}`}
                        className="btn-primary"
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
        ) : (
          <div className="tab-panel">
            <div className="form">
              <div className="form-group">
                <label>Pinterest URL (Board / Pin / Profile)</label>
                <input
                  type="text"
                  placeholder="https://www.pinterest.com/..."
                  value={bulkUrl}
                  onChange={(event) => setBulkUrl(event.target.value)}
                  className="input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Number of Media</label>
                  <input
                    type="number"
                    value={bulkNumImages}
                    min="1"
                    max={MAX_BULK_COUNT}
                    onChange={(event) => {
                      const value = Number(event.target.value)
                      if (Number.isNaN(value)) {
                        setBulkNumImages(1)
                        return
                      }
                      setBulkNumImages(Math.min(Math.max(value, 1), MAX_BULK_COUNT))
                    }}
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label>Min Resolution (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., 512x512"
                    value={bulkMinResolution}
                    onChange={(event) => setBulkMinResolution(event.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={bulkDownloadVideo}
                    onChange={(event) => setBulkDownloadVideo(event.target.checked)}
                  />
                  <span>Download videos when available</span>
                </label>

                <div className="form-group">
                  <label>Caption Format</label>
                  <select
                    value={bulkCaption}
                    onChange={(event) => setBulkCaption(event.target.value)}
                    className="input"
                  >
                    <option value="none">None</option>
                    <option value="txt">Text File</option>
                    <option value="json">JSON File</option>
                    <option value="metadata">Embed in Image</option>
                  </select>
                </div>
              </div>

              <div className="actions">
                <button
                  onClick={handleBulkFetch}
                  disabled={bulkLoading || !bulkUrl.trim()}
                  className="btn-secondary"
                >
                  {bulkLoading ? 'Fetching...' : 'Fetch Media'}
                </button>
                <button
                  onClick={handleBulkDownload}
                  disabled={bulkDownloading || !bulkResult?.count}
                  className="btn-primary"
                >
                  {bulkDownloading ? 'Preparing ZIP...' : 'Download ZIP'}
                </button>
              </div>
            </div>

            {bulkError && (
              <div className="error">
                <strong>Error:</strong> {bulkError}
              </div>
            )}

            {bulkResult && (
              <div className="result">
                <div className="result-header">
                  <h3>Bulk Preview</h3>
                  <span className="badge">{bulkResult.count || 0} items</span>
                </div>

                {bulkResult.count ? (
                  <>
                    <p>
                      Showing up to {Math.min((bulkResult.media || []).length, 15)} of {bulkResult.count} items.
                    </p>
                    <div className="table-wrapper">
                      <table className="media-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Preview</th>
                            <th>Description</th>
                            <th>Resolution</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>{renderMediaTable(bulkResult.media || [], 15)}</tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <p className="empty-state">
                    No media returned. Try a different URL or adjust the filters.
                  </p>
                )}

                {bulkDownloadResult && (
                  <div className="download-banner">
                    <p>
                      {bulkDownloadResult.download_url
                        ? `Ready! ${bulkDownloadResult.count || 0} files packaged for download.`
                        : 'Download completed.'}
                    </p>
                    {bulkDownloadResult.download_url && (
                      <a
                        href={`${API_URL}${bulkDownloadResult.download_url}`}
                        className="btn-primary"
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
        )}
      </div>

      <footer className="footer">
        <p>Built with React + Vite and Flask</p>
        <p>
          Powered by{' '}
          <a href="https://github.com/sean1832/pinterest-dl" target="_blank" rel="noreferrer">
            pinterest-dl
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
