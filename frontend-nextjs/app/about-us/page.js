import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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

      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              About Us - YTTMP3.com
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                YTTMP3.com is a free website that helps users download their favorite content from Pinterest and save it for offline viewing by generating direct links to the content.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-gray-700">
                  <strong>Important:</strong> The content is hosted on Pinterest's servers, not ours. We do not save content on our servers nor do we keep a history of downloaded content. Using YTTMP3.com is completely anonymous and safe.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Work</h2>
              <p className="text-gray-600 mb-6">
                Our service provides direct download links to Pinterest content. We help users access their favorite pins, images, videos, and GIFs for personal, offline use. All downloads are processed through secure, direct links to ensure the best quality and fastest download speeds.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Free service with no registration required</li>
                <li>High-quality downloads (HD, 2K, 4K when available)</li>
                <li>Support for all Pinterest content types</li>
                <li>Fast and reliable download processing</li>
                <li>Complete privacy and anonymity</li>
                <li>No storage of user data or download history</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support Our Service</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-gray-700 mb-3">
                  We run Google Ads on our website to support our servers and keep YTTMP3.com running. Your support helps us maintain this free service.
                </p>
                <p className="text-gray-700 font-medium">
                  If you want to support us, please disable your AdBlocker while using YTTMP3.com. We promise to only use safe and non-intrusive ads.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any queries, feel free to contact us via our contact page. We're always happy to help and welcome your feedback to improve our service.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Facts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600"><strong>Founded:</strong> 2025</p>
                    <p className="text-sm text-gray-600"><strong>Service:</strong> Free</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><strong>Platform:</strong> Pinterest</p>
                    <p className="text-sm text-gray-600"><strong>Content:</strong> Images, Videos, GIFs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}