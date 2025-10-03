import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
// import { useState } from 'react';


export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     alert('Thank you for your message! We will get back to you soon.');
//     setFormData({ name: '', email: '', subject: '', message: '' });
//   };

  return (
    <>
      <Head>
        <title>Contact Us - YTTMP3.com Pinterest Downloader</title>
        <meta name="description" content="Contact YTTMP3.com for any queries or suggestions about our Pinterest downloader. We're here to help you download Pinterest videos, images, and GIFs." />
        <meta name="keywords" content="contact yttmp3, pinterest downloader support, contact us, help, support" />
        <meta property="og:title" content="Contact Us - YTTMP3.com Pinterest Downloader" />
        <meta property="og:description" content="Contact YTTMP3.com for any queries or suggestions about our Pinterest downloader." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Us - YTTMP3.com Pinterest Downloader" />
        <meta name="twitter:description" content="Contact YTTMP3.com for any queries or suggestions about our Pinterest downloader." />
        <link rel="canonical" href="https://yttmp3.com/contact-us" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Contact Us - YTTMP3.com
            </h1>

            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-4">
                If you have any queries or suggestions, please message us through the contact form below.
              </p>
              <p className="text-gray-500">
                admin@yttmp3.com
              </p>
            </div>
{/* 
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                  placeholder="Please describe your query or suggestion..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form> */}

            <div className="mt-12 bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Other Ways to Reach Us</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Email Support</h3>
                  <p className="text-gray-600">admin@yttmp3.com</p>
                  <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM UTC</p>
                  <p className="text-sm text-gray-500 mt-1">Weekend support available for urgent issues</p>
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