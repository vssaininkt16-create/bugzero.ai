import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export const metadata = {
  title: 'BugZero Cyber Solutions | Securing India\'s Digital Future',
  description: 'India\'s most trusted cybersecurity startup. DPIIT Recognized. VAPT, penetration testing, cloud security, and compliance services for enterprises and government.',
  keywords: 'cybersecurity company India, VAPT testing India, penetration testing startup India, bug bounty India, cybersecurity services',
  openGraph: {
    title: 'BugZero Cyber Solutions | Securing India\'s Digital Future',
    description: 'India\'s most trusted cybersecurity startup offering VAPT, penetration testing, and comprehensive security solutions.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cyber-bg antialiased">
        <Navigation />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
