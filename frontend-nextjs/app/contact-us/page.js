import Head from 'next/head';
import Script from 'next/script';
import styles from '../../components/ContentPage.module.css'
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

      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={styles.card}>
            <h1 className={styles.title}>
              Contact Us - YTTMP3.com
            </h1>

            <div className={styles.center} style={{ marginBottom: 16 }}>
              <p className={styles.lead}>
                If you have any queries or suggestions, please message us through the contact form below.
              </p>
              <p className={styles.muted}>
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

            <div className={styles.box} style={{ background: '#f9fafb', marginTop: 18 }}>
              <h2 className={styles.sectionTitle}>Other Ways to Reach Us</h2>
              <div className={styles.gridTwo}>
                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: 6 }}>Email Support</h3>
                  <p>admin@yttmp3.com</p>
                  <p className={styles.muted} style={{ marginTop: 4 }}>We typically respond within 24 hours</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: 6 }}>Business Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM UTC</p>
                  <p className={styles.muted} style={{ marginTop: 4 }}>Weekend support available for urgent issues</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Script id="ld-contact" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact YTTMP3.com',
          url: 'https://yttmp3.com/contact-us',
          mainEntity: {
            '@type': 'Organization',
            name: 'YTTMP3.com',
            email: 'admin@yttmp3.com'
          }
        })}
      </Script>
    </>
  );
}