import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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

      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              YTTMP3.com Supported URLs
            </h1>

            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-4">
                If you have any queries or suggestions, please message us through the contact mail.
              </p>
              <p className="text-gray-500 mb-6">
                admin@yttmp3.com
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-800 mb-4">✅ Supported URL Formats</h2>
              <p className="text-green-700 mb-4">
                YTTMP3.com supports all standard Pinterest URLs. Here are the formats we accept:
              </p>

              <div className="space-y-3">
                {supportedUrls.map((url, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                    <code className="text-sm text-gray-800 font-mono break-all">
                      {url}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Get Pinterest URLs</h3>
                <div className="space-y-3 text-sm text-blue-700">
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    <p>Open Pinterest in your browser or app</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    <p>Find the pin you want to download</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                    <p>Click the three dots (⋯) menu</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                    <p>Select "Copy Link" or "Copy Pin Link"</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">5</span>
                    <p>Paste the URL in our downloader</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">URL Examples</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded p-3 border">
                    <p className="text-xs text-gray-500 mb-1">Full Pinterest URL</p>
                    <code className="text-sm text-purple-700 break-all">
                      https://www.pinterest.com/pin/795377984215165340/
                    </code>
                  </div>
                  <div className="bg-white rounded p-3 border">
                    <p className="text-xs text-gray-500 mb-1">Short Pinterest Link</p>
                    <code className="text-sm text-purple-700 break-all">
                      https://pin.it/60m8aXr85
                    </code>
                  </div>
                  <div className="bg-white rounded p-3 border">
                    <p className="text-xs text-gray-500 mb-1">Mobile Pinterest URL</p>
                    <code className="text-sm text-purple-700 break-all">
                      https://pinterest.com/pin/1234567890123456789/
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Notes</h3>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>All Pinterest URLs are supported as long as they point to valid pins</li>
                <li>Private pins may not be downloadable (Pinterest restrictions)</li>
                <li>Some content may be region-locked by Pinterest</li>
                <li>We support images, videos, and GIFs from all supported URLs</li>
              </ul>
            </div>

            <div className="text-center mt-8">
              <a
                href="/"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Try Our Downloader Now
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}