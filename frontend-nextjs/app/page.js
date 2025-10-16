import { Suspense } from 'react'
import styles from './page.module.css'
import VideoDownloaderClient from '@/components/VideoDownloaderClient'
import Link from 'next/link'

export const metadata = {
  title: 'Pinterest Video Downloader- Download HD Videos, GIFs & Images in 1 Click!',
  description:
    'Easily download Pinterest videos in high quality. Convert Pinterest videos to MP4 with our fast, free online downloader. Save your favorite videos now!',
  keywords:
    'Pinterest Video Downloader, download Pinterest videos, Pinterest to MP4, high quality Pinterest downloader, online video downloader, Pinterest video convertor, save Pinterest videos, MP4 downloader, Pinterest video saver, Pinterest video download free',
  alternates: {
    canonical: 'https://yttmp3.com/',
  },
  openGraph: {
    title: 'Pinterest Video Downloader | yttmp3.com',
    description:
      'Fast and free Pinterest video downloader supporting HD and 4K quality. Works on mobile, tablet, and desktop without registration.',
    url: 'https://yttmp3.com/',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Pinterest Video Downloader'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    domain: 'yttmp3.com',
    url: 'https://yttmp3.com/',
    title: 'Pinterest Video Downloader | yttmp3.com',
    description:
      'Fast and free Pinterest video downloader supporting HD and 4K quality. Works on mobile, tablet, and desktop without registration.',
    images: ['/og.png']
  }
}

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.main}>
        <Suspense fallback={<div className={styles.suspenseFallback}>Loading video downloader…</div>}>
          <VideoDownloaderClient />
        </Suspense>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What is yttmp3 Pinterest video downloader ?</h2>
          <p className={styles.sectionText}>
            The website is mainly dedicated to downloading Pinterest videos, images, and GIFs online for free (without watermark).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Supported Video Quality & Formats</h2>
          <p className={styles.sectionText}>
            One of the best things about yttmp3 is the choice of download quality. Whether you’re on mobile data or Wi-Fi, you can choose the right format and resolution.
          </p>
           <span> We support:</span>
            <ul style={
              {
                marginLeft:'3rem',
                marginTop:'1rem',
                marginBottom:'1rem'
              }
            }>
              <li>HD (720p and 1080p) for clear viewing</li>
              <li>2K and 4K Pinterest video downloads if available</li>
              <li>MP4 format for universal compatibility</li>
              <li>You can download bulk images as zip or then in jpg or png</li>
            </ul>
            <p>
            You can even use yttmp3 to download bulk images from Pinterest and download them as a zip file you can download 50 or even 100 pins at a time so give a chance to yttmp3 pinterest downloader which helps you to download your favorite pins from pinterest if you want to download only images visit 
            <Link style={{
              color:'purple'
            }} href='/image-downloader'>pinterest image downloader</Link>.
          </p>
          
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What You Can Download?</h2>
            <ul style={
              {
                marginLeft:'3rem',
                marginTop:'1rem',
                marginBottom:'1rem'
              }
            }>
              <li>Pinterest reels and short videos</li>
              <li>GIFs posted as animated pins</li>
              <li>Idea Pins (multi-step tutorials or slideshows)</li>
              <li>Audio tracks from certain Pinterest clips</li>
            </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to use Pinterest Video Downloader?</h2>

          <img 
            src="/donwload_steps.png" 
            alt="How to download Pinterest videos step by step" 
            className={styles.downloadStepsImage}
          />
          
          <ol className={styles.stepsList}>
            <li>Open the Pinterest app and find the video you want to download</li>
            <li>Tap the share button and select "Copy Link"</li>
            <li>Open your mobile browser and visit our website</li>
            <li>Paste the link in the input field and tap "Download"</li>
            <li>Choose your preferred quality and save the video to your device</li>
          </ol>
        </section>
      </main>
    </div>
  )
}
