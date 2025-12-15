import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { storage } from '../lib/storage';
import confetti from 'canvas-confetti';

// 1. THE FILTER LIST
const BLOCK_PATTERNS = [
    // Generic
    '/checkout',
    '/cart',
    '/basket',
    '/place-order',
    '/payment',
    '/pay',
    '/buy',
    '/purchase',
    'shipping',
    'billing',
    'review',
    'transaction',

    // Specific Platforms
    'amazon.com/gp/buy',       // Amazon
    'shopify.com/checkouts',   // Shopify (generic)
    'paypal.com/webapps',      // PayPal
    'wsCP'                     // Walmart
];

// 2. THE DETECTION FUNCTION
function isCheckoutPage() {
    const url = window.location.href.toLowerCase();

    // Check URLs
    const isUrlMatch = BLOCK_PATTERNS.some(pattern => url.includes(pattern));
    if (isUrlMatch) return true;

    // Check Page Title
    const title = document.title.toLowerCase();
    if (title.includes('checkout') || title.includes('payment method')) {
        return true;
    }

    return false;
}

// 3. RAW CSS
const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

    .overlay-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 253, 247, 0.95);
        backdrop-filter: blur(20px);
        z-index: 2147483647;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Nunito', sans-serif;
        color: #1e293b;
    }

    .card {
        background: white;
        width: 500px;
        max-width: 90vw;
        padding: 48px;
        border-radius: 40px;
        text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        position: relative;
        animation: zoomIn 0.3s ease-out;
    }

    /* Gauntlet Specific Styles */
    .gauntlet-card {
        background: #FFF0F5;
        width: 600px;
        padding: 40px;
        border-radius: 32px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        text-align: left;
    }

    .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
    }

    .heart-row {
        display: flex;
        gap: 4px;
    }

    .heart-icon {
        width: 16px;
        height: 16px;
        color: #e2e8f0;
        transition: color 0.3s;
    }
    .heart-icon.active {
        color: #FDA4AF;
        fill: #FDA4AF;
    }

    .question-text {
        font-size: 24px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 24px;
        line-height: 1.3;
    }

    .options-stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .option-btn {
        width: 100%;
        padding: 16px 20px;
        background: white;
        border-radius: 16px;
        border: none;
        text-align: left;
        font-family: inherit;
        font-size: 16px;
        color: #1e293b;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .option-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .halt-btn {
        padding: 24px;
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 24px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
    }
    .halt-btn:hover {
        border-color: rgba(253, 164, 175, 0.5);
    }
    .halt-btn.selected {
        border-color: #FDA4AF;
        background-color: white;
    }

    .halt-emoji { font-size: 48px; margin-bottom: 8px; display: block; }
    .halt-label { font-size: 16px; color: #1e293b; font-weight: 600; }

    /* Animations */
    @keyframes zoomIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }

    .close-btn {
        position: absolute;
        top: 24px;
        right: 24px;
        background: none;
        border: none;
        cursor: pointer;
        color: #cbd5e1;
        transition: color 0.2s;
    }
    .close-btn:hover { color: #64748b; }

    .icon-circle {
        width: 96px;
        height: 96px;
        background-color: #FFF0F5;
        border-radius: 50%;
        margin: 0 auto 24px auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-svg {
        width: 48px;
        height: 48px;
        color: #FF8FAB;
    }

    h2 {
        font-size: 28px;
        font-weight: 800;
        margin: 0 0 32px 0;
        color: #1e293b;
        letter-spacing: -0.02em;
    }

    .timer-box {
        background-color: #FFF5F9;
        border-radius: 24px;
        padding: 32px;
        margin-bottom: 32px;
    }

    .timer-label {
        color: #94a3b8;
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 8px;
    }

    .timer-digits {
        color: #FF8FAB;
        font-size: 56px;
        font-weight: 600;
        line-height: 1;
        font-feature-settings: "tnum";
        font-variant-numeric: tabular-nums;
    }

    p {
        font-size: 18px;
        line-height: 1.6;
        color: #475569;
        margin: 0 0 32px 0;
    }

    .btn-primary {
        width: 100%;
        background-color: #FF8FAB;
        color: white;
        font-family: inherit;
        font-size: 18px;
        font-weight: 700;
        padding: 18px;
        border: none;
        border-radius: 99px;
        cursor: pointer;
        box-shadow: 0 10px 25px -5px rgba(255, 143, 171, 0.4);
        transition: transform 0.1s, background-color 0.2s;
        margin-bottom: 16px;
    }

    .btn-primary:hover {
        background-color: #ff7aa2;
        transform: scale(1.02);
    }
    .btn-primary:active {
        transform: scale(0.98);
    }

    .btn-secondary {
        background: none;
        border: none;
        font-family: inherit;
        font-size: 14px;
        color: #94a3b8;
        cursor: pointer;
        text-decoration: underline;
        text-decoration-color: transparent;
        transition: text-decoration-color 0.2s, color 0.2s;
    }
    .btn-secondary:hover {
        color: #64748b;
        text-decoration-color: #64748b;
    }
`;

// --- GAUNTLET DATA ---
const questions = [
    { id: 1, text: "Is this for a hobby you started less than 48 hours ago?", leftAnswer: "Yes, caught me 🙈", rightAnswer: "No, I'm serious" },
    { id: 2, text: "Will you still want this in a week?", leftAnswer: "Probably not 😅", rightAnswer: "Yes, definitely" },
    { id: 3, text: "Have you checked if you already own something similar?", leftAnswer: "Um... no", rightAnswer: "Yes, I checked" },
    { id: 4, text: "Are you...", isHaltScreen: true },
    { id: 5, text: "Is this within your budget for this month?", leftAnswer: "Not really 💸", rightAnswer: "Yes, it fits" },
    { id: 6, text: "Have you compared prices from at least 2 other places?", leftAnswer: "No, just here", rightAnswer: "Yes, this is best" },
    { id: 7, text: "Will this solve a real problem you have RIGHT NOW?", leftAnswer: "It's more of a want", rightAnswer: "Yes, I need it" },
    { id: 8, text: "Are you buying this to feel better emotionally?", leftAnswer: "Maybe yeah 🥺", rightAnswer: "No, it's practical" },
    { id: 9, text: "If this was double the price, would you still buy it?", leftAnswer: "No way", rightAnswer: "Yes, still worth it" },
    { id: 10, text: "Can you wait 24 more hours before deciding?", leftAnswer: "I guess I can wait", rightAnswer: "I really can't wait" }
];

const haltOptions = [
    { emoji: '🍔', label: 'Hungry', id: 'hungry' },
    { emoji: '😠', label: 'Angry', id: 'angry' },
    { emoji: '🥺', label: 'Lonely', id: 'lonely' },
    { emoji: '😴', label: 'Tired', id: 'tired' },
    { emoji: '✨', label: 'None', id: 'none' }
];

// --- COMPONENTS ---

// Generic Price Detection
function detectPrice(): number {
    // 1. Amazon Specific Selectors (Checkout/Cart)
    const amazonSelectors = [
        '#sc-subtotal-amount-activecart', // Cart
        '#subtotals-marketplace-table .grand-total-price', // Checkout
        '.grand-total-price',
        'td.grand-total-price',
        '.order-summary-grand-total',
        '#subtotals .a-color-price'
    ];

    for (const selector of amazonSelectors) {
        const el = document.querySelector(selector);
        if (el && el.textContent) {
            const match = el.textContent.match(/[\d,]+\.\d{2}/);
            if (match) {
                return parseFloat(match[0].replace(/,/g, ''));
            }
        }
    }

    // 2. Generic "Total" Search (Fallbacks)
    // Look for elements containing "Total" and a price regex
    const xpath = "//*[contains(text(), 'Total') or contains(text(), 'Order Total')]/following-sibling::*//text()[contains(., '$')] | //*[contains(text(), 'Total') or contains(text(), 'Order Total')]/..//*[contains(text(), '$')]";
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    if (result.singleNodeValue && result.singleNodeValue.textContent) {
        const match = result.singleNodeValue.textContent.match(/[\d,]+\.\d{2}/);
        if (match) {
            return parseFloat(match[0].replace(/,/g, ''));
        }
    }

    return 0; // Failure fallback
}

// Simple Heart SVG for Gauntlet
const HeartIcon = ({ active }: { active: boolean }) => (
    <svg className={`heart-icon ${active ? 'active' : ''}`} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5 0 0 0 0-7.78z"></path>
    </svg>
);

const QuestionGauntlet = ({ onClose, onPass, savedAmount }: { onClose: () => void, onPass: () => void, savedAmount: number }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [failed, setFailed] = useState(false);
    const [selectedHalt, setSelectedHalt] = useState<string | null>(null);
    const [showAward, setShowAward] = useState(false);

    const handleLeftAnswer = () => {
        setFailed(true);
        setTimeout(() => setShowAward(true), 1500);
    };

    const handleRightAnswer = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Success! Trigger confetti
            // const root = document.getElementById('wallet-glow-root');
            // We need to determine where to fire confetti. Since we are in Shadow DOM, 
            // the canvas-confetti library might attach to window.document by default.
            // We usually can't contain it easily inside Shadow DOM without a custom canvas, 
            // but global confetti is actually cooler.
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FDA4AF', '#93C5FD', '#C4B5FD', '#F472B6']
            });
            setTimeout(() => {
                onPass();
            }, 2000);
        }
    };

    const handleHaltSelection = (id: string) => {
        setSelectedHalt(id);
        if (id === 'none') {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedHalt(null);
            }
        } else {
            setFailed(true);
            setTimeout(() => setShowAward(true), 2000);
        }
    };

    const currentQ = questions[currentQuestion];

    // -- FAILED / SAVED SCREEN --
    if (showAward) {
        return (
            <div className="card">
                <style>{`
                    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
                    .floating-gem { animation: float 3s ease-in-out infinite; font-size: 64px; display: block; margin-bottom: 24px; }
                `}</style>
                <div className="floating-gem">💎</div>
                <h2>Impulse Controlled!</h2>
                <div className="timer-box">
                    <div className="timer-label">Money Saved</div>
                    <div className="timer-digits">${savedAmount > 0 ? savedAmount.toFixed(2) : '50.00+'}</div>
                </div>
                <p>You earned 50 XP and saved your wallet. Proud of you.</p>
                <button onClick={onClose} className="btn-primary">Back to Safety</button>
            </div>
        );
    }

    // -- MESSAGE BEFORE AWARD --
    if (failed) {
        return (
            <div className="card">
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>💖</div>
                <h2>That's okay, bestie!</h2>
                <p>The 48-hour timer is still running. We'll be here when you're ready.</p>
            </div>
        );
    }

    // -- SUCCESS SCREEN --
    // Handled by onPass() calls in parent primarily, checking if we need a specialized "Unlocked" screen before closing?
    // The user code showed "You passed! Checkout unlocked!"
    // We can do that here.

    return (
        <div className="gauntlet-card overlay-container" style={{ position: 'relative', background: '#FFF0F5', width: '600px', height: 'auto', display: 'block' }}>
            {/* Progress Bar */}
            <div className="progress-header">
                <span style={{ fontSize: '14px', color: '#64748b' }}>Question {currentQuestion + 1} of {questions.length}</span>
                <div className="heart-row">
                    {questions.map((_, idx) => (
                        <HeartIcon key={idx} active={idx <= currentQuestion} />
                    ))}
                </div>
            </div>

            {/* Question */}
            <div className="question-text">{currentQ.text}</div>

            {/* Answer Area */}
            {currentQ.isHaltScreen ? (
                <div className="grid-2">
                    {haltOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleHaltSelection(option.id)}
                            className={`halt-btn ${selectedHalt === option.id ? 'selected' : ''}`}
                        >
                            <span className="halt-emoji">{option.emoji}</span>
                            <span className="halt-label">{option.label}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="options-stack">
                    <button onClick={handleLeftAnswer} className="option-btn">{currentQ.leftAnswer}</button>
                    <button onClick={handleRightAnswer} className="option-btn">{currentQ.rightAnswer}</button>
                </div>
            )}
        </div>
    );
};

const Overlay = ({ onClose }: { onClose: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(48 * 60 * 60);
    const [mode, setMode] = useState<'timer' | 'gauntlet' | 'success'>('timer');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        // Try to detect price on mount
        const p = detectPrice();
        if (p > 0) setPrice(p);

        const timer = setInterval(() => {
            setTimeLeft((prev) => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleWait = async () => {
        await storage.startCoolDown(window.location.href, price);
        // Open Dashboard via Background Script (Safe Method)
        try {
            chrome.runtime.sendMessage({ action: "open_dashboard" });
        } catch (e) {
            console.error("Failed to open dashboard", e);
        }

        onClose();
        // Close current tab via Background Script (Safe Method)
        try {
            chrome.runtime.sendMessage({ action: "close_tab" });
        } catch (e) {
            console.error("Failed to close tab", e);
        }
    };

    const startGauntlet = () => {
        setMode('gauntlet');
    };

    const handlePass = async () => {
        setMode('success');
    };

    const handleUnlock = async () => {
        await storage.allowBypass(window.location.href);
        onClose();
    };

    return (
        <div className="overlay-container">
            {/* Backdrop */}
            <div style={{ position: 'absolute', inset: 0 }} onClick={handleWait} />

            {/* SUCCESS MODE */}
            {mode === 'success' && (
                <div className="card">
                    <div style={{ color: '#FDA4AF', marginBottom: '16px' }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                    </div>
                    <h2>You passed! ✨</h2>
                    <p>Okay bestie, you've thought this through. Checkout unlocked!</p>
                    <button onClick={handleUnlock} className="btn-primary">Proceed to Checkout</button>
                </div>
            )}

            {/* GAUNTLET MODE */}
            {mode === 'gauntlet' && (
                <QuestionGauntlet onClose={handleWait} onPass={handlePass} savedAmount={price} />
            )}

            {/* TIMER MODE (Default) */}
            {mode === 'timer' && (
                <div className="card">
                    <button onClick={handleWait} className="close-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div className="icon-circle">
                        <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                        </svg>
                    </div>

                    <h2>Whoa there, Bestie! Let's pause.</h2>

                    <div className="timer-box">
                        <div className="timer-label">Cooling Off Period</div>
                        <div className="timer-digits">{formatTime(timeLeft)}</div>
                    </div>

                    <p>
                        The 'Vibe Check' protocol is active. You can buy this... but not right now.
                        Let's wait 48 hours to see if it's true love or just a dopamine hit.
                        <span style={{ display: 'inline-block', marginLeft: '6px' }}>✨</span>
                    </p>

                    <button onClick={handleWait} className="btn-primary">
                        Okay, I'll wait (Close Tab)
                    </button>

                    <button onClick={startGauntlet} className="btn-secondary">
                        No, I actually need this for an emergency.
                    </button>

                    {/* Debug Price Logic */}
                    {/* <div style={{ fontSize: '10px', color: '#ccc', marginTop: '10px' }}>
                        Detected Price: ${price.toFixed(2)}
                    </div> */}
                </div>
            )}
        </div>
    );
};

// 4. THE INTERCEPTION LOGIC
async function engageProtocol() {
    // Check if we are already blocking to avoid double-renders
    if (document.getElementById('wallet-glow-root')) return;

    // Check Whitelist/Storage
    const isWhitelisted = await storage.isWhitelisted(window.location.href);
    if (isWhitelisted) {
        console.log("WalletGlow: URL is whitelisted. Shields Down.");
        return;
    }

    console.log("WalletGlow: Impulse Detected. Engaging Shields.");

    // A. Stop Video/Audio immediately
    const media = document.querySelectorAll('video, audio');
    media.forEach(m => (m as HTMLMediaElement).pause());

    // B. Create the Shadow Host (The Container)
    const host = document.createElement('div');
    host.id = 'wallet-glow-root';
    document.body.appendChild(host);

    // C. Attach Shadow DOM
    const shadow = host.attachShadow({ mode: 'open' });

    // D. Mount React App
    const root = ReactDOM.createRoot(shadow);

    const closeOverlay = () => {
        root.unmount();
        host.remove();
        document.body.style.overflow = '';
    };

    root.render(
        <React.StrictMode>
            <style>{STYLES}</style>
            <Overlay onClose={closeOverlay} />
        </React.StrictMode>
    );

    // Prevent scrolling
    document.body.style.overflow = 'hidden';
}

// 5. THE SPA PROBLEM
let lastUrl = location.href;
setInterval(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        // Prevent running on the extension's own pages
        if (window.location.protocol === 'chrome-extension:') return;

        if (isCheckoutPage()) {
            engageProtocol();
        }
    }
}, 1000);

// Initial Check
if (isCheckoutPage()) {
    engageProtocol();
}
