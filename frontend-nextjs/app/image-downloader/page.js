import Script from 'next/script'
import styles from './page.module.css'
import ImageDownloaderClient from '@/components/ImageDownloaderClient'
import Link from 'next/link'

export const metadata = {
  title: 'Pinterest Image Downloader - Pinterest Downloader yttmp3.com',
  description: 'Easily download Pinterest images in high quality with our fast, free online Pinterest image downloader. Save your favorite Pinterest photos quickly and efficiently.',
  keywords: ['Pinterest image downloader', 'download Pinterest images', 'high quality Pinterest images', 'save Pinterest photos', 'free Pinterest image downloader', 'Pinterest image download tool'],
  alternates: {
    canonical: 'https://yttmp3.com/image-downloader'
  },
  openGraph: {
    url: 'https://yttmp3.com/image-downloader',
    type: 'website',
    title: 'Pinterest Image Downloader - Pinterest Downloader yttmp3.com',
    description: 'Easily download Pinterest images in high quality with our fast, free online Pinterest image downloader. Save your favorite Pinterest photos quickly and efficiently.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Pinterest Image Downloader'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    domain: 'yttmp3.com',
    url: 'https://yttmp3.com/image-downloader',
    title: 'Pinterest Image Downloader - Pinterest Downloader yttmp3.com',
    description: 'Easily download Pinterest images in high quality with our fast, free online Pinterest image downloader. Save your favorite Pinterest photos quickly and efficiently.',
    images: ['/og.png']
  }
}

export default function ImageDownloader() {
  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "yttmp3",
        "item": "https://yttmp3.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Pinterest Image Downloader",
        "item": "https://yttmp3.com/image-downloader"
      }
    ]
  }

  return (
    <div className={styles.pageContainer}>
      <main className={styles.main}>
        {/* Client-side interactive component */}
        <ImageDownloaderClient />


        {/* Server-side rendered content sections */}
        
        {/* What is Pinterest Section */}
       <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What is yttmp3 ?</h2>
          <p className={styles.sectionText}>
            The website is mainly dedicated to downloading Pinterest videos, images, and GIFs online for free (without watermark).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Supported Video Quality & Formats</h2>
          <p className={styles.sectionText}>
            One of the best things about yttmp3 is the choice of download quality. Whether you’re on mobile data or Wi-Fi, you can choose the right format and resolution for downloading the images visit <Link style={{
              color:'purple'
            }} href='/'>pinterest video downloader</Link>.
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
            You can even use yttmp3 to download bulk images from Pinterest and download them as a zip file you can download 50 or even 100 pins at a time so give a chance to yttmp3 pinterest downloader which helps you to download your favorite pins from pinterest.
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
          <h2 className={styles.sectionTitle}>How to use Pinterest Video Downloader from Mobile?</h2>
          
          <img 
            src="/donwload_steps.png" 
            alt="How to download Pinterest images step by step" 
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

      {/* JSON-LD Schema Markup */}
      <Script id="breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
    </div>
  )
}
