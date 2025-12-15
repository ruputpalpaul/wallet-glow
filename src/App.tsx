
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Stories } from './components/Stories';
import { PricingPage } from './components/PricingPage';
import { Footer } from './components/Footer';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentCancel } from './components/PaymentCancel';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { Dashboard } from './components/Dashboard';
import { SupportPage } from './components/SupportPage';
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
      setCurrentHash(window.location.hash || '#');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      subscription.unsubscribe();
    };
  }, []);

  // Simple Router logic
  const isAboutPage = currentHash === '#about';
  const isPricingPage = currentHash === '#pricing';
  const isSuccessPage = currentHash === '#success';
  const isCancelPage = currentHash === '#cancel';
  const isLoginPage = currentHash === '#login';
  const isSignupPage = currentHash === '#signup';
  const isDashboardPage = currentHash === '#dashboard';

  // New Legal pages
  const isPrivacyPage = currentHash === '#privacy';
  const isTermsPage = currentHash === '#terms';
  const isSupportPage = currentHash === '#support';
  const isSupportPage = currentHash === '#support'; // New route

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
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
          key={currentHash}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
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
          ) : isPrivacyPage ? (
            <>
              <Navbar />
              <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p>This is a placeholder for the privacy policy.</p>
              </div>
              <Footer />
            </>
          ) : isTermsPage ? (
            <>
              <Navbar />
              <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
                <p>This is a placeholder for the terms of service.</p>
              </div>
              <Footer />
            </>
          ) : isAboutPage ? (
            <>
              <Navbar />
              <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">About WalletGlow</h1>
                <p className="text-lg text-slate-600">We are on a mission to help people spend mindfully.</p>
              </div>
              <Footer />
            </>
          ) : (
            <>
              <Navbar />
              <Hero />
              <Features />
              <HowItWorks />
              <Stories />
              <Footer />
            </>
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
