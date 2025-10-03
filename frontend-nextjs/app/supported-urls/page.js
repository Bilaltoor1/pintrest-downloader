import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Script from 'next/script';
import styles from '../../components/ContentPage.module.css'

export default function SupportedUrls() {
  const supportedUrls = [
    'https://www.pinterest.com/pin/795377984215165340/',
    'https://pin.it/60m8aXr85',
    'https://www.pinterest.com/pin/[PIN_ID]/',
    'https://pinterest.com/pin/[PIN_ID]/',
    'https://pin.it/[SHORT_CODE]'
  ];

  return (
    <>
      <Head>
        <title>Supported URLs - YTTMP3.com Pinterest Downloader</title>
        <meta name="description" content="Check which Pinterest URLs are supported by YTTMP3.com downloader. We support all standard Pinterest pin URLs and short links." />
        <meta name="keywords" content="supported urls, pinterest urls, pin links, download support, url formats" />
        <meta property="og:title" content="Supported URLs - YTTMP3.com Pinterest Downloader" />
        <meta property="og:description" content="Check which Pinterest URLs are supported by YTTMP3.com downloader." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Supported URLs - YTTMP3.com Pinterest Downloader" />
        <meta name="twitter:description" content="Check which Pinterest URLs are supported by YTTMP3.com downloader." />
        <link rel="canonical" href="https://yttmp3.com/supported-urls" />
      </Head>

      <div className={styles.wrapper}>
        <Header />

        <main className={styles.main}>
          <div className={styles.card}>
            <h1 className={styles.title}>
              YTTMP3.com Supported URLs
            </h1>

            <div className={styles.center} style={{ marginBottom: 16 }}>
              <p className={styles.lead}>
                If you have any queries or suggestions, please message us through the contact mail.
              </p>
              <p className={styles.muted} style={{ marginBottom: 16 }}>
                admin@yttmp3.com
              </p>
            </div>

            <div className={styles.noteGreen} style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
              <h2 className={styles.sectionTitle}>✅ Supported URL Formats</h2>
              <p>
                YTTMP3.com supports all standard Pinterest URLs. Here are the formats we accept:
              </p>

              <div style={{ display: 'grid', gap: 8 }}>
                {supportedUrls.map((url, index) => (
                  <div key={index} className={styles.box}>
                    <code className={styles.codeBox}>
                      {url}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.gridTwo} style={{ marginBottom: 16 }}>
              <div className={styles.noteBlue} style={{ padding: 16, borderRadius: 12 }}>
                <h3 className={styles.sectionTitle}>How to Get Pinterest URLs</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  <div className="flex items-start space-x-2">
                    <span className={styles.pill}>1</span>
                    <p>Open Pinterest in your browser or app</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className={styles.pill}>2</span>
                    <p>Find the pin you want to download</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className={styles.pill}>3</span>
                    <p>Click the three dots (⋯) menu</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className={styles.pill}>4</span>
                    <p>Select "Copy Link" or "Copy Pin Link"</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className={styles.pill}>5</span>
                    <p>Paste the URL in our downloader</p>
                  </div>
                </div>
              </div>

              <div className={styles.noteYellow} style={{ padding: 16, borderRadius: 12 }}>
                <h3 className={styles.sectionTitle}>URL Examples</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  <div className={styles.box}>
                    <p className={styles.muted} style={{ marginBottom: 6 }}>Full Pinterest URL</p>
                    <code className={styles.codeBox}>
                      https://www.pinterest.com/pin/795377984215165340/
                    </code>
                  </div>
                  <div className={styles.box}>
                    <p className={styles.muted} style={{ marginBottom: 6 }}>Short Pinterest Link</p>
                    <code className={styles.codeBox}>
                      https://pin.it/60m8aXr85
                    </code>
                  </div>
                  <div className={styles.box}>
                    <p className={styles.muted} style={{ marginBottom: 6 }}>Mobile Pinterest URL</p>
                    <code className={styles.codeBox}>
                      https://pinterest.com/pin/1234567890123456789/
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.noteYellow} style={{ padding: 16, borderRadius: 12 }}>
              <h3 className={styles.sectionTitle}>Important Notes</h3>
              <ul className={styles.listDisc} style={{ margin: 0 }}>
                <li>All Pinterest URLs are supported as long as they point to valid pins</li>
                <li>Private pins may not be downloadable (Pinterest restrictions)</li>
                <li>Some content may be region-locked by Pinterest</li>
                <li>We support images, videos, and GIFs from all supported URLs</li>
              </ul>
            </div>

            <div className={styles.center} style={{ marginTop: 16 }}>
              <a
                href="/"
                className={styles.btnPrimary}
              >
                Try Our Downloader Now
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <Script id="ld-supported-urls" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Supported Pinterest URL Formats',
          url: 'https://yttmp3.com/supported-urls',
          description: 'List of supported Pinterest URL formats for YTTMP3.com Pinterest downloader.'
        })}
      </Script>
    </>
  );
}