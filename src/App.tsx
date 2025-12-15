import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Stories } from './components/Stories';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { PricingPage } from './components/PricingPage';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentCancel } from './components/PaymentCancel';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Scroll to top on page switch if it's a "page" change, not just a section anchor
      if (['#about', '#privacy', '#terms', '#pricing', '#success', '#cancel', '#', ''].includes(window.location.hash)) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple Router
  const isAboutPage = currentHash === '#about';
  const isPrivacyPage = currentHash === '#privacy';
  const isTermsPage = currentHash === '#terms';
  const isPricingPage = currentHash === '#pricing';
  const isSuccessPage = currentHash === '#success';
  const isCancelPage = currentHash === '#cancel';

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-[#fffdf9] font-sans selection:bg-rose-200 selection:text-rose-900">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={currentHash}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isAboutPage ? (
            <AboutPage />
          ) : isPrivacyPage ? (
            <PrivacyPolicy />
          ) : isTermsPage ? (
            <TermsOfService />
          ) : isPricingPage ? (
            <PricingPage />
          ) : isSuccessPage ? (
            <PaymentSuccess />
          ) : isCancelPage ? (
            <PaymentCancel />
          ) : (
            <>
              <Hero />
              <Features />
              <HowItWorks />
              <Stories />
              <CTASection />
            </>
          )}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
