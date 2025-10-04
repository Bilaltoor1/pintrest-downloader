import TikTokDownloaderClient from '@/components/TikTokDownloaderClient'
import styles from './page.module.css'

export const metadata = {
  title: 'TikTok Video Downloader - Download TikTok Videos Free',
  description: 'Download TikTok videos instantly. Fast, free, and high quality TikTok video downloader. No watermark option available.',
  keywords: 'tiktok downloader, download tiktok video, tiktok video download, tiktok no watermark',
}

export default function TikTokDownloaderPage() {
  return (
    <main className={styles.container}>
      <TikTokDownloaderClient />

      <section className={styles.contentSection}>
        <div className={styles.content}>
          <h2>How to Download TikTok Videos</h2>
          <ol className={styles.steps}>
            <li>Open TikTok app or website and find the video you want to download</li>
            <li>Copy the video URL (tap Share → Copy Link)</li>
            <li>Paste the URL into the input field above</li>
            <li>Click "Download" and select your preferred quality</li>
            <li>Click "Download Video" to save it to your device</li>
          </ol>

          <h2>Why Use Our TikTok Downloader?</h2>
          <ul className={styles.features}>
            <li><strong>Free Forever:</strong> No subscription or payment required</li>
            <li><strong>High Quality:</strong> Download videos in the best available quality</li>
            <li><strong>Fast Processing:</strong> Get your videos in seconds</li>
            <li><strong>No Watermark:</strong> Download TikTok videos without watermark</li>
            <li><strong>Privacy Focused:</strong> We don't store your downloads</li>
            <li><strong>All Devices:</strong> Works on mobile, tablet, and desktop</li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className={styles.faq}>
            <div className={styles.faqItem}>
              <h3>Is it free to download TikTok videos?</h3>
              <p>Yes, our TikTok video downloader is completely free with no hidden charges or subscriptions.</p>
            </div>

            <div className={styles.faqItem}>
              <h3>Can I download TikTok videos without watermark?</h3>
              <p>Yes, our downloader provides options to download TikTok videos without the TikTok watermark when available.</p>
            </div>

            <div className={styles.faqItem}>
              <h3>What video quality can I download?</h3>
              <p>You can download TikTok videos in various qualities, including HD and the original quality posted by the creator.</p>
            </div>

            <div className={styles.faqItem}>
              <h3>Do I need to install any software?</h3>
              <p>No installation required. Our TikTok downloader works entirely in your web browser.</p>
            </div>

            <div className={styles.faqItem}>
              <h3>Is it safe to use this TikTok downloader?</h3>
              <p>Yes, our service is safe and secure. We don't store your videos or personal information.</p>
            </div>

            <div className={styles.faqItem}>
              <h3>Can I download private TikTok videos?</h3>
              <p>No, you can only download public TikTok videos. Private videos are protected by TikTok's privacy settings.</p>
            </div>
          </div>

          <h2>About TikTok Video Downloading</h2>
          <p>
            TikTok has become one of the most popular social media platforms for short-form video content. 
            Our TikTok downloader makes it easy to save your favorite videos for offline viewing. Whether you 
            want to keep a memorable video, share content with friends, or create compilations, our tool 
            provides a simple and efficient way to download TikTok videos.
          </p>
          <p>
            Please note that downloaded videos should be used in accordance with TikTok's terms of service 
            and copyright laws. Always respect content creators' rights and only download videos for personal use.
          </p>
        </div>
      </section>
    </main>
  )
}
