'use client'

import { useState } from 'react'
import axios from 'axios'
import styles from './MediaTable.module.css'
import { resolveMediaUrl, getAltText, getResolution } from '../utils/mediaHelpers'

export default function MediaTable({ items = [], limit = 10, apiUrl }) {
  const [downloadingItems, setDownloadingItems] = useState(new Set())

  const handleSingleItemDownload = async (item, index) => {
    const mediaUrl = resolveMediaUrl(item)
    if (!mediaUrl) {
      alert('No valid media URL found for this item')
      return
    }

    const itemKey = `${mediaUrl}-${index}`
    setDownloadingItems(prev => new Set([...prev, itemKey]))

    try {
      const response = await axios.post(`${apiUrl}/api/download-direct`, {
        media_url: mediaUrl
      }, {
        responseType: 'blob'
      })

      const contentDisposition = response.headers['content-disposition']
      let filename = 'media'
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      } else {
        const urlParts = mediaUrl.split('/')
        const lastPart = urlParts[urlParts.length - 1]
        if (lastPart && lastPart.includes('.')) {
          filename = lastPart.split('?')[0]
        } else {
          const isVideo = item.video_url || item.type === 'video' || mediaUrl.includes('.mp4')
          filename = `media_${Date.now()}.${isVideo ? 'mp4' : 'jpg'}`
        }
      }

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

  const renderRows = () => {
    return items.slice(0, limit).map((item, index) => {
      const src = resolveMediaUrl(item)
      if (!src) {
        return null
      }

      const itemKey = `${src}-${index}`
      const isDownloading = downloadingItems.has(itemKey)

      return (
        <tr key={itemKey}>
          <td>{index + 1}</td>
          <td>
            <img src={src} alt={getAltText(item)} className={styles.mediaThumb} />
          </td>
          <td>{getAltText(item)}</td>
          <td>{getResolution(item)}</td>
          <td>
            <div className={styles.actionButtons}>
              <a href={src} target="_blank" rel="noreferrer" className={styles.btnLink}>
                View
              </a>
              <button
                onClick={() => handleSingleItemDownload(item, index)}
                disabled={isDownloading}
                className={styles.btnDownload}
              >
                {isDownloading ? 'Downloading...' : 'Download'}
              </button>
            </div>
          </td>
        </tr>
      )
    }).filter(Boolean)
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.mediaTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Preview</th>
            <th>Description</th>
            <th>Resolution</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  )
}
