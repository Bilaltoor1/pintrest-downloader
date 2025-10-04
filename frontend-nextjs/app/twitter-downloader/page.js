import { Suspense } from 'react'
import TwitterDownloaderClient from '@/components/TwitterDownloaderClient'
import styles from './page.module.css'

export const metadata = {
  title: 'Twitter Video Downloader – Download Twitter/X Videos in HD',
  description:
    'Download Twitter and X videos instantly in high quality. Paste a tweet link, choose the quality, and save videos to any device without watermarks.',
  keywords:
    'twitter video downloader, download twitter videos, x video downloader, twitter hd download, download tweets, yttmp3 twitter',
  alternates: {
    canonical: 'https://yttmp3.com/twitter-downloader',
  },
  openGraph: {
    title: 'Twitter Video Downloader | yttmp3.com',
    description:
      'Fast and free Twitter/X video downloader supporting HD quality. Works on mobile, tablet, and desktop without registration.',
    url: 'https://yttmp3.com/twitter-downloader',
    type: 'website',
  },
}

export default function TwitterDownloaderPage() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.main}>
        <Suspense fallback={<div className={styles.suspenseFallback}>Loading Twitter downloader…</div>}>
          <TwitterDownloaderClient />
        </Suspense>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What is Twitter/X?</h2>
          <p className={styles.sectionText}>
            Twitter (now X) is a social media platform where users share short messages, images, and videos. With millions of videos posted daily, it's a hub for news, entertainment, tutorials, and viral content that users often want to save and share.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Download Twitter Videos in High Quality</h2>
          <p className={styles.sectionText}>
            Our Twitter video downloader allows you to save videos in the highest quality available, including HD and Full HD resolution. Get crystal clear videos without any watermarks or quality loss, directly from any tweet.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why You Should Use Our Twitter Video Downloader</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Download Twitter Videos in HD</h3>
              <p className={styles.featureText}>
                Get your favorite Twitter/X videos in the best quality available - from standard to Full HD resolution.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Works on All Devices</h3>
              <p className={styles.featureText}>
                Download videos seamlessly on desktop, mobile, and tablets. Save Twitter videos from any device, anywhere.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Completely Free</h3>
              <p className={styles.featureText}>
                100% free with no hidden charges, no registration required, and unlimited downloads without restrictions.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Download Twitter Videos from Mobile?</h2>
          <ol className={styles.stepsList}>
            <li>Open the Twitter/X app and find the video you want to download</li>
            <li>Tap the share icon and select &quot;Copy Link&quot;</li>
            <li>Open your mobile browser and visit yttmp3.com</li>
            <li>Paste the tweet link in the input field and tap &quot;Download&quot;</li>
            <li>Choose your preferred quality and save the video to your device</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What Makes yttmp3 the Best Twitter Downloader?</h2>
          <ul className={styles.featuresList}>
            <li>Lightning-fast download speeds for Twitter/X videos</li>
            <li>No registration or login required</li>
            <li>Support for all video qualities including HD and Full HD</li>
            <li>No watermarks on downloaded videos</li>
            <li>Works on all devices and platforms</li>
            <li>100% safe and secure downloads</li>
            <li>Unlimited downloads with no restrictions</li>
            <li>Supports both Twitter and X platform URLs</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Download Twitter Videos From PC/Laptop?</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <h3 className={styles.stepTitle}>Step 1: Copy the Tweet URL</h3>
              <p className={styles.stepText}>
                Open Twitter/X, navigate to the tweet with the video you want to download, and copy the URL from your browser&apos;s address bar.
              </p>
            </div>
            <div className={styles.stepCard}>
              <h3 className={styles.stepTitle}>Step 2: Paste the Link &amp; Press Download</h3>
              <p className={styles.stepText}>
                Paste the copied URL into the input field above and click the &quot;Download&quot; button to process the video.
              </p>
            </div>
            <div className={styles.stepCard}>
              <h3 className={styles.stepTitle}>Step 3: Save the Video</h3>
              <p className={styles.stepText}>
                Select your preferred quality from the available options and click download to save the Twitter video to your computer.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Is yttmp3 Safe for Downloading Twitter Videos?</h2>
          <p className={styles.sectionText}>
            Absolutely! yttmp3 is completely safe to use. We don&apos;t store any of your data, require no registration, and have no malicious ads or pop-ups. Your privacy and security are our top priorities. Our service runs securely in your browser, ensuring your downloads are private and protected.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Does yttmp3 Work on Mobile Devices?</h2>
          <p className={styles.sectionText}>
            Yes! yttmp3 works perfectly on all mobile devices including iOS and Android smartphones and tablets. Our responsive design ensures a seamless experience regardless of your device. Simply open your mobile browser, paste the Twitter URL, and download your video in seconds.
          </p>
        </section>

        <section className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How do I use the Twitter video downloader?</h3>
            <p className={styles.faqAnswer}>
              Simply copy the Twitter/X video URL, paste it into the input field on our homepage, click &quot;Download,&quot; select your preferred quality, and save the video to your device. It&apos;s fast, easy, and requires no registration.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How can I download Twitter videos without the app?</h3>
            <p className={styles.faqAnswer}>
              You can download Twitter videos directly from your browser using yttmp3.com. No app installation needed—just paste the tweet URL and download. Works on any device with a web browser.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How do I download Twitter videos online?</h3>
            <p className={styles.faqAnswer}>
              Visit yttmp3.com, paste the Twitter video link in the input box, click &quot;Download,&quot; choose your quality, and save the video. Our online tool processes videos instantly without requiring software installation.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What&apos;s the best video format to download?</h3>
            <p className={styles.faqAnswer}>
              We recommend downloading in MP4 format at the highest quality available (usually HD or Full HD). MP4 is compatible with all devices and media players, ensuring smooth playback everywhere.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Where are my downloaded videos saved?</h3>
            <p className={styles.faqAnswer}>
              Downloaded videos are saved to your device&apos;s default download folder. On desktop, this is usually the &quot;Downloads&quot; folder. On mobile, check your &quot;Downloads&quot; or &quot;Files&quot; app. You can change the save location in your browser settings.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How can I download Twitter videos on my phone?</h3>
            <p className={styles.faqAnswer}>
              Open the Twitter app, copy the tweet link, visit yttmp3.com in your mobile browser, paste the link, tap &quot;Download,&quot; select quality, and save. The video will be saved to your phone&apos;s storage.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Are there any download limits?</h3>
            <p className={styles.faqAnswer}>
              No! yttmp3 has no download limits. You can download as many Twitter videos as you want, completely free, without any restrictions or daily caps.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Is there a limit on how many videos I can download from Twitter?</h3>
            <p className={styles.faqAnswer}>
              There are absolutely no limits. Download unlimited Twitter/X videos for free. We don&apos;t track download counts or impose any restrictions on usage.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Is it free to download videos?</h3>
            <p className={styles.faqAnswer}>
              Yes, completely free! yttmp3 is a 100% free service with no hidden costs, subscription fees, or premium tiers. Download unlimited Twitter videos without paying a cent.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
