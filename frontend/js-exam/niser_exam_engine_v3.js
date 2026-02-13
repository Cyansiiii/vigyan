(function () {
    'use strict';

    // ==========================================
    // VIGYAN.PREP "UNIVERSAL" EXAM ENGINE (v3.1)
    // ==========================================
    // ⚠️ IMPORTANT: THIS FILE CONTAINS LOGIC ONLY (NO QUESTIONS).
    // It fetches questions from: /frontend/data/{EXAM}/{YEAR}/...
    //
    // CAPABILITIES:
    // 1. Supports Exam Types: 'niser' and 'iiser'
    // 2. Supports Years: '2024_s1', '2025', etc. (Year-Agnostic)
    // ==========================================

    // ENCAPSULATED STATE
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let questionStatus = {};
    let currentSection = 'Biology';
    let loadedQuestions = {};
    let loadedKeys = {};
    let timeLeft = 180 * 60;
    let timerInterval;
    let userName = '';
    let userEmail = '';

    // Detect Year from URL
    const urlParams = new URLSearchParams(window.location.search);
    let yearParam = urlParams.get('year') || '2025';
    let examType = urlParams.get('type') || 'niser'; // Default to niser

    // Allow alphanumeric (e.g., 2024_s1) but sanitize strictly to safe chars
    const TEST_YEAR = yearParam.replace(/[^a-zA-Z0-9_]/g, '');
    const EXAM_TYPE = examType.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase(); // niser or iiser

    // Dynamic Marking Scheme
    const MARKING = {
        correct: EXAM_TYPE === 'iiser' ? 4 : 3,
        incorrect: -1,
        totalQuestions: 60
    };

    // HELPER: Base64 Decoder
    function decodeKey(base64) {
        try {
            return atob(base64);
        } catch (e) {
            return base64;
        }
    }

    // AUTH & NAVIGATION
    async function initExam() {
        userName = document.getElementById('candidateName').value.trim() || 'Candidate';
        userEmail = document.getElementById('candidateEmail').value.trim() || '';

        // Validate inputs
        if (!userName || userName.length < 2) {
            alert('Please enter your full name (at least 2 characters)');
            return;
        }
        if (!userEmail || !userEmail.includes('@')) {
            alert('Please enter a valid email address to receive your score report');
            return;
        }

        document.getElementById('userNameDisplay').textContent = userName;

        // Initialize status objects
        ['Biology', 'Chemistry', 'Physics', 'Mathematics'].forEach(s => {
            questionStatus[s] = {};
        });

        const examTitle = EXAM_TYPE.toUpperCase();
        const headerTitle = document.getElementById('examTitleHeader');
        if (headerTitle) headerTitle.textContent = `${examTitle} PYQ ${TEST_YEAR}`;

        // Update marking display if elements exist
        const correctEl = document.querySelector('.q-marks .green-text');
        const incorrectEl = document.querySelector('.q-marks .red-text');
        if (correctEl) correctEl.textContent = MARKING.correct;
        if (incorrectEl) incorrectEl.textContent = Math.abs(MARKING.incorrect);

        // Also update instruction page title if present
        const instTitle = document.getElementById('examTitle');
        if (instTitle) instTitle.textContent = `Vigyan.prep ${examTitle} PYQ ${TEST_YEAR}`;

        try {
            await ensureSectionLoaded(currentSection);
            document.getElementById('instructionPage').style.display = 'none';
            document.getElementById('examInterface').style.display = 'block';

            // updateSectionCounts(); // Badges removed
            loadQuestion(0);
            startTimer();
            renderPalette();

            // MathJax typeset once after initial load
            if (window.MathJax) MathJax.typeset();
        } catch (err) {
            console.error(err);
            alert('Error loading exam data. Please check your connection or try another year.');
        }
    }

    async function ensureSectionLoaded(section) {
        if (loadedQuestions[section]) return;
        // Dynamically fetch based on EXAM_TYPE and TEST_YEAR
        const response = await fetch(`../data/${EXAM_TYPE}/${TEST_YEAR}/${section.toLowerCase()}_q.json?v=${Date.now()}`);
        if (!response.ok) throw new Error(`Failed to fetch ${section} for ${EXAM_TYPE} ${TEST_YEAR}`);
        loadedQuestions[section] = await response.json();
    }

    async function ensureKeysLoaded(section) {
        if (loadedKeys[section]) return;
        const response = await fetch(`../data/${EXAM_TYPE}/${TEST_YEAR}/${section.toLowerCase()}_k.json?v=${Date.now()}`);
        if (!response.ok) throw new Error(`Failed to fetch keys for ${section}`);
        loadedKeys[section] = await response.json();
    }

    function loadQuestion(index) {
        currentQuestionIndex = index;
        const questions = loadedQuestions[currentSection];
        const question = questions[index];

        if (!userAnswers[currentSection] || userAnswers[currentSection][index] === undefined) {
            if (!questionStatus[currentSection][index]) {
                questionStatus[currentSection][index] = 'visited';
            }
        }

        document.getElementById('questionNumberDisplay').textContent = index + 1;
        document.getElementById('sectionTitle').textContent = currentSection;

        const content = document.getElementById('questionContent');
        // Support both 'text' (2025 format) and 'question' (2024 format)
        content.innerHTML = question.text || question.question;

        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';

        question.options.forEach((opt, i) => {
            const item = document.createElement('div');
            item.className = 'option-item';
            if (userAnswers[currentSection] && userAnswers[currentSection][index] === i) {
                item.classList.add('selected');
            }
            item.innerHTML = `
                <input type="radio" name="temp_radio" class="opt-radio" ${userAnswers[currentSection] && userAnswers[currentSection][index] === i ? 'checked' : ''}>
                <span class="opt-text">${opt}</span>
            `;
            item.onclick = () => selectOption(i);
            optionsContainer.appendChild(item);
        });

        updatePalette();

        // MathJax typeset after question content is loaded
        if (window.MathJax) {
            setTimeout(() => MathJax.typeset(), 50);
        }
    }

    function selectOption(index) {
        if (!userAnswers[currentSection]) userAnswers[currentSection] = {};
        userAnswers[currentSection][currentQuestionIndex] = index;

        if (questionStatus[currentSection][currentQuestionIndex] === 'marked') {
            questionStatus[currentSection][currentQuestionIndex] = null;
        }

        const items = document.querySelectorAll('.option-item');
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('selected');
                const radio = item.querySelector('.opt-radio');
                if (radio) radio.checked = true;
            } else {
                item.classList.remove('selected');
                const radio = item.querySelector('.opt-radio');
                if (radio) radio.checked = false;
            }
        });
        updatePalette();
    }

    function handleMarkReview() {
        const isAnswered = userAnswers[currentSection] && userAnswers[currentSection][currentQuestionIndex] !== undefined;

        if (isAnswered) {
            questionStatus[currentSection][currentQuestionIndex] = 'ans-marked';
        } else {
            questionStatus[currentSection][currentQuestionIndex] = 'marked';
        }

        saveAndNext();
    }

    function saveAndNext() {
        const questions = loadedQuestions[currentSection];
        if (currentQuestionIndex < questions.length - 1) {
            loadQuestion(currentQuestionIndex + 1);
        } else {
            const sections = ['Biology', 'Chemistry', 'Physics', 'Mathematics'];
            const nextIdx = sections.indexOf(currentSection) + 1;
            if (nextIdx < sections.length) switchSection(sections[nextIdx]);
        }
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitExam(true);
            }
            updateTimerDisplay();
        }, 1000);
    }

    function updateTimerDisplay() {
        const h = Math.floor(timeLeft / 3600);
        const m = Math.floor((timeLeft % 3600) / 60);
        const s = timeLeft % 60;
        const timerEl = document.getElementById('timerDisplay');
        if (timerEl) {
            timerEl.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
    }

    function renderPalette() {
        const palette = document.getElementById('questionPalette');
        if (!palette) return;

        const questions = loadedQuestions[currentSection];
        palette.innerHTML = '';
        questions.forEach((_, i) => {
            const item = document.createElement('div');
            item.className = 'palette-btn';
            item.textContent = i + 1;
            item.onclick = () => loadQuestion(i);
            palette.appendChild(item);
        });
        updatePalette();
    }

    function updatePalette() {
        const items = document.querySelectorAll('.palette-btn');
        items.forEach((item, i) => {
            item.classList.remove('active', 'answered', 'not-answered', 'marked', 'ans-marked');

            if (i === currentQuestionIndex) item.classList.add('active');

            const status = questionStatus[currentSection][i];
            const hasAnswer = userAnswers[currentSection] && userAnswers[currentSection][i] !== undefined;

            if (status === 'marked') {
                item.classList.add('marked');
            } else if (status === 'ans-marked') {
                item.classList.add('ans-marked');
            } else if (hasAnswer) {
                item.classList.add('answered');
            } else if (status === 'visited') {
                item.classList.add('not-answered');
            }
        });
    }

    async function switchSection(section) {
        try {
            await ensureSectionLoaded(section);
            currentSection = section;
            document.querySelectorAll('.section-tab').forEach(t => {
                t.classList.toggle('active', t.getAttribute('data-section') === section);
            });
            renderPalette();
            loadQuestion(0);
        } catch (err) {
            alert('Error loading section.');
        }
    }

    async function submitExam(auto = false) {
        clearInterval(timerInterval);

        document.getElementById('submitModal').style.display = 'none';

        // Show loading indicator
        document.getElementById('scoreModal').style.display = 'flex';
        document.getElementById('scoreContent').innerHTML = `
            <div style="text-align:center; padding: 40px;">
                <div style="font-size: 2rem; margin-bottom: 15px;">⏳</div>
                <p>Calculating your score...</p>
            </div>
        `;

        try {
            const sections = ['Biology', 'Chemistry', 'Physics', 'Mathematics'];

            // Load all sections and keys in PARALLEL (much faster!)
            await Promise.all([
                ...sections.map(s => ensureSectionLoaded(s)),
                ...sections.map(s => ensureKeysLoaded(s))
            ]);

            let sectionScores = {};
            let totalCorrect = 0;
            let totalWrong = 0;
            let totalQuestions = 0;

            // Calculate score for each section
            sections.forEach(s => {
                const questions = loadedQuestions[s];
                const keys = loadedKeys[s];
                let sectionScore = 0;
                let sectionCorrect = 0;
                let sectionWrong = 0;

                questions.forEach((q, i) => {
                    totalQuestions++;
                    if (userAnswers[s] && userAnswers[s][i] !== undefined) {
                        const correctLetter = decodeKey(keys[i]);
                        const correctIdx = correctLetter.charCodeAt(0) - 65;
                        if (userAnswers[s][i] === correctIdx) {
                            sectionScore += MARKING.correct;
                            sectionCorrect++;
                            totalCorrect++;
                        } else {
                            sectionScore += MARKING.incorrect;
                            sectionWrong++;
                            totalWrong++;
                        }
                    }
                });

                sectionScores[s] = { score: sectionScore, correct: sectionCorrect, wrong: sectionWrong };
            });

            // Calculate scores based on Exam Type
            const scores = Object.values(sectionScores).map(s => s.score);
            const totalScore = scores.reduce((sum, s) => sum + s, 0);

            let displayScore, scoreLabel, secondaryScore;

            if (EXAM_TYPE === 'iiser') {
                displayScore = totalScore;
                scoreLabel = 'Total Score (All 4 Subjects)';
                secondaryScore = `Max Marks: 240`;
            } else {
                const sortedScores = [...scores].sort((a, b) => b - a);
                displayScore = sortedScores.slice(0, 3).reduce((sum, s) => sum + s, 0);
                scoreLabel = 'Merit Score (Best 3 Subjects)';
                secondaryScore = `Total (All 4): ${totalScore}`;
            }

            document.getElementById('scoreModal').style.display = 'flex';
            document.getElementById('scoreContent').innerHTML = `
                <div style="text-align:center;">
                    <p style="font-size: 2.5rem; font-weight: bold; color: var(--header-blue);">${displayScore}</p>
                    <p style="color: #666;">${scoreLabel}</p>
                    <p style="font-size: 1rem; color: #888;">${secondaryScore}</p>
                    <hr style="border-color: #eee; margin: 20px 0;">
                    <div style="text-align:left; margin: 10px 20px;">
                        <p><strong>Subject-wise Breakdown:</strong></p>
                        ${sections.map(s => `<p style="font-size: 0.9rem;">${s}: <strong>${sectionScores[s].score}</strong> (✓${sectionScores[s].correct} ✗${sectionScores[s].wrong})</p>`).join('')}
                    </div>
                    <hr style="border-color: #eee; margin: 20px 0;">
                    <p>✅ Total Correct: <strong>${totalCorrect}</strong></p>
                    <p>❌ Total Incorrect: <strong>${totalWrong}</strong></p>
                    <p>⏭️ Unanswered: <strong>${totalQuestions - (totalCorrect + totalWrong)}</strong></p>
                    <p style="margin-top: 15px; font-size: 0.85rem; color: #10b981;">📧 Score report sent to ${userEmail}</p>
                </div>
            `;

            // Send score report to backend
            sendScoreReport({
                name: userName,
                email: userEmail,
                examType: EXAM_TYPE,
                examYear: TEST_YEAR,
                sectionScores: sectionScores,
                finalScore: displayScore,
                scoreType: scoreLabel,
                totalScore: totalScore,
                totalCorrect: totalCorrect,
                totalWrong: totalWrong,
                totalQuestions: totalQuestions
            });

        } catch (err) {
            alert('Error calculating results. Please refresh.');
        }
    }

    // Send score report to backend for email
    async function sendScoreReport(data) {
        try {
            // Use Hostinger PHP endpoint directly (Railway can't connect to Hostinger SMTP)
            const response = await fetch('https://vigyanprep.com/api/send-score-report.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                console.log('✅ Score report sent successfully');
            } else {
                console.error('❌ Failed to send score report:', result.message);
            }
        } catch (err) {
            console.error('❌ Error sending score report:', err);
        }
    }

    function setupEventListeners() {
        const agreeTerms = document.getElementById('agreeTerms');
        const beginTestBtn = document.getElementById('beginTestBtn');
        const submitExamBtn = document.getElementById('submitExamBtn');
        const markReviewBtn = document.getElementById('markReviewBtn');

        if (agreeTerms && beginTestBtn) {
            // Validate name and email before enabling button
            const validateInputs = () => {
                const nameInput = document.getElementById('candidateName');
                const emailInput = document.getElementById('candidateEmail');
                const nameValid = nameInput && nameInput.value.trim().length >= 2;
                const emailValid = emailInput && emailInput.value.trim().includes('@');
                const termsChecked = agreeTerms.checked;

                const isValid = nameValid && emailValid && termsChecked;
                beginTestBtn.disabled = !isValid;

                // Toggle active class for visual feedback
                if (isValid) {
                    beginTestBtn.classList.add('active');
                } else {
                    beginTestBtn.classList.remove('active');
                }
            };

            agreeTerms.onchange = validateInputs;
            document.getElementById('candidateName').oninput = validateInputs;
            document.getElementById('candidateEmail').oninput = validateInputs;

            // Check once on load in case of autofill
            setTimeout(validateInputs, 500);
        }

        if (beginTestBtn) beginTestBtn.onclick = initExam;
        if (submitExamBtn) submitExamBtn.onclick = () => {
            document.getElementById('submitModal').style.display = 'flex';
            renderSummary();
        };

        if (markReviewBtn) markReviewBtn.onclick = handleMarkReview;

        document.getElementById('cancelSubmitBtn').onclick = () => {
            document.getElementById('submitModal').style.display = 'none';
        };

        document.getElementById('confirmSubmitBtn').onclick = () => submitExam();

        document.querySelectorAll('.section-tab').forEach(tab => {
            tab.onclick = () => switchSection(tab.getAttribute('data-section'));
        });

        const saveNextBtn = document.getElementById('saveNextBtn');
        if (saveNextBtn) {
            saveNextBtn.onclick = saveAndNext;
        }

        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.onclick = () => {
                if (userAnswers[currentSection]) {
                    delete userAnswers[currentSection][currentQuestionIndex];
                    questionStatus[currentSection][currentQuestionIndex] = 'visited';
                    const items = document.querySelectorAll('.option-item');
                    items.forEach(item => {
                        item.classList.remove('selected');
                        const radio = item.querySelector('.opt-radio');
                        if (radio) radio.checked = false;
                    });
                    updatePalette();
                }
            };
        }
    }

    function renderSummary() {
        let summaryHTML = '<ul>';
        ['Biology', 'Chemistry', 'Physics', 'Mathematics'].forEach(s => {
            const ans = userAnswers[s] ? Object.keys(userAnswers[s]).length : 0;
            const total = loadedQuestions[s] ? loadedQuestions[s].length : '??';
            summaryHTML += `<li>${s}: ${ans} / ${total} answered</li>`;
        });
        summaryHTML += '</ul>';
        document.getElementById('submissionSummary').innerHTML = summaryHTML;
    }

    // function updateSectionCounts() { ... } - Removed as badges are gone

    // BOOTSTRAP
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEventListeners);
    } else {
        setupEventListeners();
    }

})();
