import Script from 'next/script';
import FAQ from '../../components/FAQ';
import styles from './page.module.css';

export const metadata = {
  title: 'How to Download Pinterest Images & Videos - Complete Guide',
  description: 'Learn how to download Pinterest images and videos on desktop and mobile. Step-by-step guide for saving Pinterest content in high quality.',
  keywords: 'pinterest download guide, how to save pinterest images, download pinterest videos, pinterest downloader tutorial',
  openGraph: {
    title: 'How to Download Pinterest Images & Videos',
    description: 'Complete step-by-step guide to downloading Pinterest content on any device',
    type: 'article',
  },
};

export default function HowToPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download Pinterest Images and Videos",
    "description": "Complete guide to downloading Pinterest images and videos on desktop and mobile devices",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Copy Pinterest URL",
        "text": "Open Pinterest and copy the URL of the image or video you want to download"
      },
      {
        "@type": "HowToStep",
        "name": "Paste URL",
        "text": "Paste the Pinterest URL into the downloader tool"
      },
      {
        "@type": "HowToStep",
        "name": "Download Content",
        "text": "Click the download button to save the image or video to your device"
      }
    ]
  };

  return (
    <div className={styles.pageContainer}>
      <Script
        id="how-to-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.mainTitle}>
            How to Download Pinterest Images & Videos
          </h1>
          <p className={styles.subtitle}>
            Complete guide to saving Pinterest content on desktop and mobile devices - fast, easy, and free
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Download Instructions</h2>
          <p className={styles.sectionText}>
            Follow these simple steps to download any Pinterest image or video to your device
          </p>

          <div className={styles.instructionsGrid}>
            <div className={styles.instructionCard}>
              <h3 className={styles.featureTitle}>Desktop Instructions</h3>
              <div className={styles.stepsList}>
                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Find Your Content</h4>
                    <p className={styles.stepDescription}>
                      Open Pinterest.com and browse to the image or video you want to download
                    </p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Copy the URL</h4>
                    <p className={styles.stepDescription}>
                      Click on the pin to open it in full view. Copy the URL from your browser address bar
                    </p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Paste in Downloader</h4>
                    <p className={styles.stepDescription}>
                      Return to our downloader tool and paste the URL into the input field
                    </p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Download</h4>
                    <p className={styles.stepDescription}>
                      Click the Download button. Your image or video will be saved to your downloads folder
                    </p>
                  </div>
                </div>
              </div>
       
          
              <div className={styles.proTip}>
                <strong>Pro Tip:</strong> For bulk downloads, use our Bulk Download mode to download multiple pins at once
              </div>
            </div>
              
            <div className={styles.instructionCard}>
              <h3 className={styles.featureTitle}>Mobile Instructions</h3>
              <div className={styles.stepsList}>
                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Open Pinterest App</h4>
                    <p className={styles.stepDescription}>
                      Launch the Pinterest app on your iOS or Android device and find the content you want
                    </p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Share & Copy Link</h4>
                    <p className={styles.stepDescription}>
                      Tap the three dots or share icon, then tap Copy Link to copy the pin URL to clipboard
                    </p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Visit Downloader</h4>
                    <p className={styles.stepDescription}>
                      Open your mobile browser and navigate to our downloader tool. Paste the URL in the input field
                    </p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Save to Device</h4>
                    <p className={styles.stepDescription}>
                      Tap Download and the file will be saved to your Photos or Gallery
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.proTip}>
                <strong>Pro Tip:</strong> Use the browser Request Desktop Site option for an enhanced downloading experience
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Video Download Quality</h2>
          <p className={styles.sectionText}>
            Our tool supports multiple video quality options for Pinterest video downloads
          </p>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Available Quality Options</h3>
              <ul className={styles.featuresList}>
                <li><strong>Best Quality:</strong> Highest available resolution with audio</li>
                <li><strong>720p HD:</strong> Standard HD quality, perfect for most uses</li>
                <li><strong>480p:</strong> Balanced quality and file size</li>
                <li><strong>360p:</strong> Smaller file size for quick sharing</li>
              </ul>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Audio Support</h3>
              <p className={styles.featureText}>
                All video downloads include audio when available. Our tool automatically merges video and audio streams.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Format Support</h3>
              <p className={styles.featureText}>
                Videos are downloaded in MP4 format. Images are saved in their original format.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Mobile Compatibility</h2>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>iOS (iPhone & iPad)</h3>
              <ul className={styles.featuresList}>
                <li>Works in Safari, Chrome, and other browsers</li>
                <li>Downloads save directly to Photos app</li>
                <li>Support for iOS 12 and newer versions</li>
                <li>No app installation required</li>
              </ul>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Android</h3>
              <ul className={styles.featuresList}>
                <li>Compatible with Chrome, Firefox, and Samsung Internet</li>
                <li>Files save to Downloads or Gallery folder</li>
                <li>Works on Android 6.0 and above</li>
                <li>Fully responsive mobile interface</li>
              </ul>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Tablets</h3>
              <ul className={styles.featuresList}>
                <li>Optimized for both iPad and Android tablets</li>
                <li>Larger screen provides better experience</li>
                <li>Same functionality as desktop version</li>
                <li>Touch-friendly interface</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Safety & Privacy</h2>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Secure Downloads</h3>
              <p className={styles.featureText}>
                All downloads are processed through secure HTTPS connections. We never store your files on our servers.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Privacy Protected</h3>
              <p className={styles.featureText}>
                We do not track your downloads or collect personal information. Your Pinterest activity remains private.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>No Account Needed</h3>
              <p className={styles.featureText}>
                Download Pinterest content without signing in. No registration, no email required.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>No Malware</h3>
              <p className={styles.featureText}>
                Our tool is 100 percent web-based with no software to install. No risk of viruses or malicious code.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <FAQ />
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.sectionTitle}>Ready to Start Downloading?</h2>
          <p className={styles.sectionText}>
            Try our free Pinterest downloader now - no registration required
          </p>
          <a href="/" className={styles.ctaButton}>
            Start Downloading Now
          </a>
        </section>
      </main>
    </div>
  );
}
