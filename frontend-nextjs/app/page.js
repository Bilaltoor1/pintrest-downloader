import { Suspense } from 'react'
import styles from './page.module.css'
import VideoDownloaderClient from '@/components/VideoDownloaderClient'

export const metadata = {
  title: 'Pinterest Video Downloader – Download Pinterest Videos in HD & 4K',
  description:
    'Download Pinterest videos instantly in HD and 4K without watermarks. Paste a Pinterest video link, choose the quality, and save the file to any device.',
  keywords:
    'pinterest video downloader, download pinterest videos, pinterest hd download, pinterest 4k downloader, yttmp3 pinterest',
  alternates: {
    canonical: 'https://yttmp3.com/',
  },
  openGraph: {
    title: 'Pinterest Video Downloader | yttmp3.com',
    description:
      'Fast and free Pinterest video downloader supporting HD and 4K quality. Works on mobile, tablet, and desktop without registration.',
    url: 'https://yttmp3.com/',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.main}>
        <Suspense fallback={<div className={styles.suspenseFallback}>Loading video downloader…</div>}>
          <VideoDownloaderClient />
        </Suspense>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What is Pinterest?</h2>
          <p className={styles.sectionText}>
            Pinterest is a visual discovery engine where users can find ideas for recipes, home and style inspiration, and much more. It's a platform where billions of pins and videos are shared daily, making it a treasure trove of creative content.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Download Pinterest videos in 1080p, 4k High Quality</h2>
          <p className={styles.sectionText}>
            Our Pinterest video downloader allows you to save videos in the highest quality available, including 1080p and 4K resolution. Get crystal clear videos without any watermarks or quality loss.
          </p>
        </section>

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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Is yttmp3 Safe?</h2>
          <p className={styles.sectionText}>
            Absolutely! yttmp3 is completely safe to use. We don't store any of your data, require no registration, and have no malicious ads or pop-ups. Your privacy and security are our top priorities. Our service runs entirely in your browser, ensuring your downloads are private and secure.
          </p>
        </section>

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
