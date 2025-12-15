export function PrivacyPage() {
    return (
        <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-rose-950 mb-8">Privacy Policy</h1>

            <div className="prose prose-rose max-w-none text-slate-600">
                <p className="text-lg mb-6">Last updated: December 14, 2025</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-4">1. Introduction</h2>
                    <p>
                        Welcome to WalletGlow ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website or use our
                        browser extension and tell you about your privacy rights and how the law protects you.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-4">2. Data We Collect</h2>
                    <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes email address.</li>
                        <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-4">3. How We Use Your Data</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-4">4. Data Security</h2>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                        In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-4">5. Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                        <a href="mailto:privacy@walletglow.com" className="text-rose-500 hover:underline ml-1">privacy@walletglow.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}

export function TermsPage() {
    return (
        <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-rose-950 mb-8">Terms of Service</h1>

            <div className="prose prose-rose max-w-none text-slate-600">
                <p className="text-lg mb-6">Last updated: December 14, 2025</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-4">1. Agreement to Terms</h2>
                    <p>
                        By accessing or using our website and browser extension, you agree to be bound by these Terms of Service and our Privacy Policy.
                        If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-4">2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on WalletGlow's website for personal,
                        non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>attempt to decompile or reverse engineer any software contained on WalletGlow's website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-4">3. Disclaimer</h2>
                    <p>
                        The materials on WalletGlow's website are provided on an 'as is' basis. WalletGlow makes no warranties, expressed or implied,
                        and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability,
                        fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-4">4. Limitations</h2>
                    <p>
                        In no event shall WalletGlow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit,
                        or due to business interruption) arising out of the use or inability to use the materials on WalletGlow's website.
                    </p>
                </section>
            </div>
        </div>
    );
}
