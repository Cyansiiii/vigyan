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

        // Find the "Tests" link in all navbars (Desktop and Mobile)
        const navLinks = document.querySelectorAll('.nav-links');

        navLinks.forEach(nav => {
            // Find the <a> tag pointing to testfirstpage.html
            const testLink = Array.from(nav.querySelectorAll('a')).find(a =>
                a.getAttribute('href') === 'testfirstpage.html'
            );

            if (testLink && !nav.querySelector('.doubt-link-injected')) {
                // If the link is a simple <a>, we can add the doubt link after it
                // Or transform it into a dropdown if desired.
                // User asked for "sub section YOUR DOUBT", so adding it next to it or as a dropdown.

                const doubtLink = document.createElement('a');
                doubtLink.href = 'your-doubt.html';
                doubtLink.className = 'doubt-link-injected';
                doubtLink.innerHTML = '<span class="text-blue-400 font-bold">✨ YOUR DOUBT</span>';
                doubtLink.style.marginLeft = '15px'; // Adjust spacing

                // For mobile or specific layouts, we might need different styling
                testLink.parentNode.insertBefore(doubtLink, testLink.nextSibling);
            }
        });
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
