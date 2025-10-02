'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './PinterestDownloader.module.css'
import Header from './Header'
import LoginStatus from './LoginStatus'
import Tabs from './Tabs'
import SinglePinTab from './SinglePinTab'
import BulkDownloaderTab from './BulkDownloaderTab'
import Footer from './Footer'

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '')

export default function PinterestDownloader() {
  const [activeTab, setActiveTab] = useState('single')
  const [hasCookies, setHasCookies] = useState(false)

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
  }

  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.container}>
        <LoginStatus 
          hasCookies={hasCookies} 
          onCookiesUpdate={checkCookiesStatus}
          apiUrl={API_URL}
        />

        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === 'single' ? (
          <SinglePinTab apiUrl={API_URL} />
        ) : (
          <BulkDownloaderTab apiUrl={API_URL} />
        )}
      </div>

      <Footer />
    </div>
  )
}
