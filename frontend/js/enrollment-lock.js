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

        // Target all navbars (Desktop and Mobile)
        const navLinksContainers = document.querySelectorAll('.nav-links');

        navLinksContainers.forEach(nav => {
            // Find the "Tests" link
            const testLink = Array.from(nav.querySelectorAll('a')).find(a =>
                a.getAttribute('href') === 'testfirstpage.html' &&
                !a.closest('.nav-dropdown') // Ensure we don't double-process
            );

            if (testLink) {
                // Create the dropdown structure
                const dropdownDiv = document.createElement('div');
                dropdownDiv.className = 'nav-dropdown tests-dropdown-injected';

                // Copy active class if present
                const isActive = testLink.classList.contains('active-link') ||
                    testLink.classList.contains('text-white'); // For tailwind versions

                dropdownDiv.innerHTML = `
                    <a href="#" class="dropdown-trigger ${isActive ? 'active-link' : ''}">Tests <i class="fas fa-chevron-down" style="font-size: 0.7em; margin-left: 5px;"></i></a>
                    <div class="dropdown-menu">
                        <a href="testfirstpage.html">All Tests</a>
                        <a href="your-doubt.html" style="color: #c5a059; font-weight: bold;">✨ YOUR DOUBT</a>
                    </div>
                `;

                // Replace the original link
                testLink.parentNode.replaceChild(dropdownDiv, testLink);
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
