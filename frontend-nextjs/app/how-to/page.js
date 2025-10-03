import Script from 'next/script';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import styles from './page.module.css';

export const metadata = {
  title: 'How to Download Pinterest Videos - YTTMP3.com',
  description: 'Learn how to download Pinterest videos, images, and GIFs using YTTMP3.com. Step-by-step guide for mobile app and desktop with video tutorial.',
}

export default function HowTo() {
  return (
    <>
      <div className={styles.pageContainer}>
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              How to Download Pinterest Videos using YTTMP3.com?
            </h1>

            <div className="text-center mb-8">
              <p className="text-xl text-gray-600">
                YTTMP3.com is the Best Pinterest video downloader online. The steps below provide quick info on how to download Pinterest videos, images, and GIFs from both the mobile app and desktop versions. ❤️
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Mobile App Steps */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
                  📱 Steps to Download from Mobile App
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-blue-700 font-medium">Open the Pinterest App</p>
                      <p className="text-blue-600 text-sm">Select the video, image, or GIF you want to download</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-blue-700 font-medium">Tap the ⋯ icon</p>
                      <p className="text-blue-600 text-sm">At the top right corner (or bottom right in latest version)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-blue-700 font-medium">Tap "Copy Link"</p>
                      <p className="text-blue-600 text-sm">Copy the Pinterest URL to your clipboard</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="text-blue-700 font-medium">Paste URL on YTTMP3.com</p>
                      <p className="text-blue-600 text-sm">Paste the video URL in the download input box</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      5
                    </div>
                    <div>
                      <p className="text-blue-700 font-medium">Tap Download</p>
                      <p className="text-blue-600 text-sm">Click the Download button to save to your device</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Pro Tip:</strong> The Pinterest video, image, or GIF will be downloaded directly to your device's Downloads folder.
                  </p>
                </div>
              </div>

              {/* Desktop Steps */}
              <div className="bg-green-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
                  💻 Steps to Download from Desktop
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Open Pinterest Website</p>
                      <p className="text-green-600 text-sm">Go to pinterest.com in your browser</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Find Your Content</p>
                      <p className="text-green-600 text-sm">Select the video, image, or GIF you want</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Copy the URL</p>
                      <p className="text-green-600 text-sm">Copy the Pinterest video URL from address bar</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Visit YTTMP3.com</p>
                      <p className="text-green-600 text-sm">Paste the URL in our downloader box</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      5
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Download</p>
                      <p className="text-green-600 text-sm">Press download and save to your computer</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-100 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>Pro Tip:</strong> Check your Downloads folder. You can also press Ctrl+J to see download history.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Quality & Formats */}
            <div className="bg-purple-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-purple-800 mb-4 text-center">
                🎥 YTTMP3.com: Supported Video Quality & Formats
              </h2>

              <p className="text-purple-700 mb-4 text-center">
                One of the best things about YTTMP3.com is the choice of download quality. Whether you're on mobile data or Wi-Fi, you can choose the right format and resolution.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Video Quality</h3>
                  <ul className="space-y-2 text-purple-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      HD (720p and 1080p) for clear viewing
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      2K and 4K Pinterest video downloads if available
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      MP4 format for universal compatibility
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      MP3 conversion for audio-only content
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Content Types</h3>
                  <ul className="space-y-2 text-purple-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Standard Pinterest videos
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Pinterest reels and short videos
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      GIFs and animated pins
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      High-resolution images
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile Compatibility */}
            <div className="bg-orange-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-orange-800 mb-4 text-center">
                📱 Does YTTMP3.com Work on Mobile?
              </h2>

              <p className="text-orange-700 mb-4 text-center">
                Absolutely. YTTMP3.com supports all mobile devices and platforms.
              </p>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl mb-2">📱</div>
                  <h3 className="font-semibold text-orange-800">Android</h3>
                  <p className="text-sm text-orange-600">Full support with APK compatibility</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl mb-2">🍎</div>
                  <h3 className="font-semibold text-orange-800">iOS/iPhone</h3>
                  <p className="text-sm text-orange-600">Safari and Chrome support</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl mb-2">💻</div>
                  <h3 className="font-semibold text-orange-800">Desktop</h3>
                  <p className="text-sm text-orange-600">All browsers supported</p>
                </div>
              </div>
            </div>

            {/* Safety Section */}
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4 text-center">
                🛡️ Is YTTMP3.com Safe to Use?
              </h2>

              <div className="text-center mb-4">
                <p className="text-green-700 text-lg font-medium">Yes, YTTMP3.com is completely safe.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Safety Features</h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      No login or Pinterest credentials required
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      No tracking or personal data collection
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Works directly through your browser
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      No malware or viruses
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-semibold">Verified Safe</p>
                    <div className="flex justify-center space-x-4 mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Google Safe Browsing</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Norton Safe Web</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Sucuri Scanner</span>
                    </div>
                  </div>
                  <blockquote className="text-green-700 italic">
                    "I saved a Pinterest cooking video in HD using YTTMP3.com, now I don't need to open the app every time I want to watch it." - Verified User!
                  </blockquote>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <FAQ
              title="❓ Questions & Answers"
              items={[
                {
                  q: 'Can I download videos from Pinterest?',
                  a: 'Yes, with YTTMP3.com, you can easily download videos from Pinterest. Just copy the Pinterest video URL, paste it in the form above, and click the Download button. The video will be downloaded to your PC or mobile device.',
                },
                {
                  q: 'How to download Pinterest videos?',
                  a: '1) Enter the Pinterest video URL that you want to download.<br/>2) Paste the URL into our downloader box.<br/>3) Click the Download button.<br/>4) The download process will start immediately.<br/>5) The video will be saved directly to your system.',
                },
                {
                  q: 'How can I download images from Pinterest?',
                  a: 'To download images from Pinterest, follow the same steps as for videos. Copy the image URL, paste it into the form, and click Download. The image will be saved to your device.',
                },
                {
                  q: 'Can I download GIFs from Pinterest?',
                  a: 'Yes, YTTMP3.com supports downloading GIFs from Pinterest. Copy the GIF URL, paste it in the form above, and click the Download button to save the GIF to your device.',
                },
                {
                  q: 'Where are files saved after being downloaded?',
                  a: 'Downloaded files are typically saved in the "Downloads" folder on your device. You can check your browser\'s download history by pressing CTRL+J on your keyboard.',
                },
              ]}
            />

            <div className="text-center mt-8">
              <a
                href="/"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Start Downloading Now
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
      
      <Script id="ld-howto" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Download Pinterest Videos using YTTMP3.com',
          step: [
            { '@type': 'HowToStep', text: 'Open Pinterest and select the content.' },
            { '@type': 'HowToStep', text: 'Copy the content link.' },
            { '@type': 'HowToStep', text: 'Paste the link into YTTMP3.com.' },
            { '@type': 'HowToStep', text: 'Click Download to save the file.' }
          ]
        })}
      </Script>
    </>
  );
}