
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Stories } from './components/Stories';
import { CTASection } from './components/CTASection';
import { PricingPage } from './components/PricingPage';
import { CheckoutPage } from './components/CheckoutPage';
import { Footer } from './components/Footer';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentCancel } from './components/PaymentCancel';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { Dashboard } from './components/Dashboard';
import { SupportPage } from './components/SupportPage';
import { AboutPage } from './components/AboutPage';
import { PrivacyPage, TermsPage } from './components/LegalPages';
import { supabase } from './lib/supabase';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    }).catch(err => {
      console.error('Auth Check Failed', err);
      setLoading(false); // Valid to fail open as guest
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Hash Listener
    const handleHashChange = () => {
      const newHash = window.location.hash || '#';
      setCurrentHash(newHash);

      // Only scroll to top if we are navigating to a new "Page"
      // If it's a section on the landing page (#features, etc), let browser handle it
      const baseHash = newHash.split('?')[0];
      if (['#login', '#signup', '#dashboard', '#success', '#cancel', '#about', '#pricing', '#privacy', '#terms', '#support', '#checkout'].includes(baseHash)) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      subscription.unsubscribe();
    };
  }, []);

  // Simple Router logic
  // Handle query params in hash (e.g. #signup?next=pricing)
  const hashPath = currentHash.split('?')[0];

  const isAboutPage = hashPath === '#about';
  const isPricingPage = hashPath === '#pricing';
  const isSuccessPage = hashPath === '#success';
  const isCancelPage = hashPath === '#cancel';
  const isLoginPage = hashPath === '#login';
  const isSignupPage = hashPath === '#signup';
  const isDashboardPage = hashPath === '#dashboard';
  const isCheckoutPage = hashPath === '#checkout';

  // New Legal pages
  const isPrivacyPage = hashPath === '#privacy';
  const isTermsPage = hashPath === '#terms';
  const isSupportPage = hashPath === '#support';

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fffdf9]">
        <div className="animate-pulse text-rose-400 font-bold text-xl">Loading WalletGlow...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdf9] font-sans selection:bg-rose-200 selection:text-rose-900">

      <AnimatePresence mode="wait">
        <motion.main
          key={currentHash === '#features' || currentHash === '#how-it-works' || currentHash === '#stories' ? 'landing' : currentHash}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {isLoginPage ? (
            <LoginPage />
          ) : isSignupPage ? (
            <SignupPage />
          ) : isDashboardPage ? (
            session ? <Dashboard /> : <LoginPage />
          ) : isSuccessPage ? (
            <PaymentSuccess />
          ) : isCancelPage ? (
            <PaymentCancel />
          ) : isSupportPage ? (
            <>
              <Navbar />
              <SupportPage />
              <Footer />
            </>
          ) : isPricingPage ? (
            <>
              <Navbar />
              <PricingPage />
              <Footer />
            </>
          ) : isCheckoutPage ? (
            <CheckoutPage />
          ) : isPrivacyPage ? (
            <>
              <Navbar />
              <PrivacyPage />
              <Footer />
            </>
          ) : isTermsPage ? (
            <>
              <Navbar />
              <TermsPage />
              <Footer />
            </>
          ) : isAboutPage ? (
            <>
              <Navbar />
              <AboutPage />
              <Footer />
            </>
          ) : (
            <>
              <Navbar />
              <Hero />
              <Features />
              <HowItWorks />
              <Stories />
              <CTASection />
              <Footer />
            </>
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
