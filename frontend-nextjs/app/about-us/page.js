import Head from 'next/head';
import styles from '../../components/ContentPage.module.css'

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us - YTTMP3.com Pinterest Downloader</title>
        <meta name="description" content="Learn about YTTMP3.com - a free Pinterest downloader that helps users download their favorite content from Pinterest for offline viewing. Safe, anonymous, and ad-supported." />
        <meta name="keywords" content="about yttmp3, pinterest downloader, free downloader, offline viewing, safe download" />
        <meta property="og:title" content="About Us - YTTMP3.com Pinterest Downloader" />
        <meta property="og:description" content="Learn about YTTMP3.com - a free Pinterest downloader for offline viewing." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Us - YTTMP3.com Pinterest Downloader" />
        <meta name="twitter:description" content="Learn about YTTMP3.com - a free Pinterest downloader for offline viewing." />
        <link rel="canonical" href="https://yttmp3.com/about-us" />
      </Head>

      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={styles.card}>
            <h1 className={styles.title}>
              About Us - YTTMP3.com
            </h1>

            <div>
              <p className={styles.lead}>
                YTTMP3.com is a free website that helps users download their favorite content from Pinterest and save it for offline viewing by generating direct links to the content.
              </p>

              <div className={styles.noteBlue} style={{ padding: 16, borderRadius: 12 }}>
                <p>
                  <strong>Important:</strong> The content is hosted on Pinterest's servers, not ours. We do not save content on our servers nor do we keep a history of downloaded content. Using YTTMP3.com is completely anonymous and safe.
                </p>
              </div>

              <h2 className={styles.sectionTitle}>How We Work</h2>
              <p>
                Our service provides direct download links to Pinterest content. We help users access their favorite pins, images, videos, and GIFs for personal, offline use. All downloads are processed through secure, direct links to ensure the best quality and fastest download speeds.
              </p>

              <h2 className={styles.sectionTitle}>Our Commitment</h2>
              <ul className={styles.listDisc} style={{ marginBottom: 16 }}>
                <li>Free service with no registration required</li>
                <li>High-quality downloads (HD, 2K, 4K when available)</li>
                <li>Support for all Pinterest content types</li>
                <li>Fast and reliable download processing</li>
                <li>Complete privacy and anonymity</li>
                <li>No storage of user data or download history</li>
              </ul>

              <h2 className={styles.sectionTitle}>Support Our Service</h2>
              <div className={styles.noteYellow} style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
                <p className="mb-3">
                  We run Google Ads on our website to support our servers and keep YTTMP3.com running. Your support helps us maintain this free service.
                </p>
                <p style={{ fontWeight: 600 }}>
                  If you want to support us, please disable your AdBlocker while using YTTMP3.com. We promise to only use safe and non-intrusive ads.
                </p>
              </div>

              <h2 className={styles.sectionTitle}>Contact Us</h2>
              <p>
                If you have any queries, feel free to contact us via our contact page. We're always happy to help and welcome your feedback to improve our service.
              </p>

              <div className="bg-gray-50 rounded-lg" style={{ padding: 16, marginTop: 16 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Quick Facts</h3>
                <div className={styles.gridTwo}>
                  <div>
                    <p className="text-sm"><strong>Founded:</strong> 2025</p>
                    <p className="text-sm"><strong>Service:</strong> Free</p>
                  </div>
                  <div>
                    <p className="text-sm"><strong>Platform:</strong> Pinterest</p>
                    <p className="text-sm"><strong>Content:</strong> Images, Videos, GIFs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </>
  );
}