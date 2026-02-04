/**
 * Enrollment Lock & Dynamic Navbar v1.0
 * Purpose: Restrict AI Doubt features to enrolled students only
 */
(function () {
    console.log('🔒 Enrollment Lock Initialized');

    const checkEnrollment = () => {
        const purchasedTests = JSON.parse(localStorage.getItem('purchasedTests') || '[]');
        const rollNumber = localStorage.getItem('userRollNumber');

        // Student is enrolled if they have a roll number AND at least one purchased test
        return rollNumber && purchasedTests.length > 0;
    };

    const injectDoubtLink = () => {
        if (!checkEnrollment()) {
            console.log('ℹ️ Enrollment check: New student (Doubt locked)');
            return;
        }

        console.log('✅ Enrollment check: Enrolled student (Doubt unlocked)');

        // 1. Target the Tests page specifically
        if (window.location.pathname.includes('testfirstpage.html')) {
            const container = document.getElementById('doubt-section-container');
            if (container && !container.querySelector('.doubt-card-injected')) {
                const doubtCard = document.createElement('div');
                doubtCard.className = 'doubt-card-injected w-full mt-12 fade-in';
                doubtCard.innerHTML = `
                    <div class="glass-panel" style="min-height: auto; border-color: #c5a059; background: rgba(197, 160, 89, 0.05);">
                        <div class="flex flex-col md:flex-row items-center gap-8">
                            <div class="w-24 h-24 bg-[#c5a059]/10 rounded-3xl flex items-center justify-center border border-[#c5a059]/20">
                                <i class="fas fa-brain text-[#c5a059] text-4xl"></i>
                            </div>
                            <div class="flex-1 text-center md:text-left">
                                <h2 class="text-3xl font-black mb-2" style="font-family: 'Playfair Display', serif; color: #c5a059;">Zen Dojo AI Tutor</h2>
                                <p class="text-gray-400 max-w-xl">Get instant, step-by-step solutions for your doubts with our premium AI-powered research assistant.</p>
                            </div>
                            <a href="your-doubt.html" class="buy-btn" style="width: auto; padding: 1.25rem 3rem; margin-top: 0; background: linear-gradient(135deg, #c5a059 0%, #8b6b3f 100%);">
                                Open Zen Dojo <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                `;
                container.appendChild(doubtCard);
            }
        }
    };

    // Protection for your-doubt.html
    if (window.location.pathname.includes('your-doubt.html')) {
        if (!checkEnrollment()) {
            alert('This section is only available for enrolled students. Please purchase a test series to continue.');
            window.location.href = 'testfirstpage.html';
        }
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectDoubtLink);
    } else {
        injectDoubtLink();
    }

    // Also watch for storage changes (e.g. after a purchase)
    window.addEventListener('storage', (e) => {
        if (e.key === 'purchasedTests' || e.key === 'userRollNumber') {
            injectDoubtLink();
        }
    });

})();
