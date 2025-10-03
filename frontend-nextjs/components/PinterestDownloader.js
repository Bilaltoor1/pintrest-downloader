'use client'

import { useState, useEffect } from 'react'
import apiClient from '@/utils/apiClient'
import styles from './PinterestDownloader.module.css'
import Header from './Header'
import LoginStatus from './LoginStatus'
import Tabs from './Tabs'
import SinglePinTab from './SinglePinTab'
import BulkDownloaderTab from './BulkDownloaderTab'
import Footer from './Footer'

export default function PinterestDownloader() {
  const [activeTab, setActiveTab] = useState('single')
  const [hasCookies, setHasCookies] = useState(false)

  useEffect(() => {
    checkCookiesStatus()
  }, [])

  const checkCookiesStatus = async () => {
    try {
      const response = await apiClient.get('/api/cookies/status')
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
        />

        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === 'single' ? (
          <SinglePinTab />
        ) : (
          <BulkDownloaderTab />
        )}
      </div>

      <Footer />
    </div>
  )
}
