(function () {
    'use strict';

    // ==========================================
    // VIGYAN.PREP "LIGHTNING" EXAM ENGINE (v2.0)
    // Secure Vault & On-Demand Fetching
    // ==========================================

    // ENCAPSULATED STATE (Invisible to Console)
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let questionStatus = {};  // Tracks: 'visited' (red), 'marked' (purple)
    let currentSection = 'Biology';
    let loadedQuestions = {}; // Cache for questions: { Biology: [...] }
    let loadedKeys = {};      // Cache for keys: { Biology: { ... } }
    let timeLeft = 180 * 60;
    let timerInterval;

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
        const userName = document.getElementById('candidateName').value || 'Candidate';
        document.getElementById('userNameDisplay').textContent = userName;

        // Initialize status objects
        ['Biology', 'Chemistry', 'Physics', 'Mathematics'].forEach(s => {
            questionStatus[s] = {};
        });

        // Fetch initial section before showing interface
        try {
            await ensureSectionLoaded(currentSection);
            document.getElementById('instructionPage').style.display = 'none';
            document.getElementById('examInterface').style.display = 'block';

            updateSectionCounts();
            loadQuestion(0);
            startTimer();
            renderPalette();

            // Periodic MathJax update
            setInterval(() => {
                if (window.MathJax) MathJax.typeset();
            }, 1000);
        } catch (err) {
            alert('Error loading exam data. Please check your connection.');
        }
    }

    async function ensureSectionLoaded(section) {
        if (loadedQuestions[section]) return;

        const response = await fetch(`../data/niser/2025/${section.toLowerCase()}_q.json?v=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to fetch questions');
        loadedQuestions[section] = await response.json();
    }

    async function ensureKeysLoaded(section) {
        if (loadedKeys[section]) return;

        const response = await fetch(`../data/niser/2025/${section.toLowerCase()}_k.json?v=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to fetch keys');
        loadedKeys[section] = await response.json();
    }

    function loadQuestion(index) {
        currentQuestionIndex = index;
        const questions = loadedQuestions[currentSection];
        const question = questions[index];

        // Mark as visited (red) if not answered
        if (!userAnswers[currentSection] || userAnswers[currentSection][index] === undefined) {
            if (!questionStatus[currentSection][index]) {
                questionStatus[currentSection][index] = 'visited';
            }
        }

        document.getElementById('questionNumberDisplay').textContent = index + 1;
        document.getElementById('sectionTitle').textContent = currentSection;

        const content = document.getElementById('questionContent');
        content.innerHTML = question.text;

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

        // Add "Show Answer" button
        const answerBtn = document.createElement('button');
        answerBtn.className = 'show-answer-btn';
        answerBtn.innerHTML = '🎯 Show Correct Answer';
        answerBtn.onclick = () => handleRevealAnswer();
        optionsContainer.appendChild(answerBtn);

        const answerReveal = document.createElement('div');
        answerReveal.id = 'answerReveal';
        answerReveal.className = 'answer-reveal hidden';
        optionsContainer.appendChild(answerReveal);

        updatePalette();
    }

    async function handleRevealAnswer() {
        const revealDiv = document.getElementById('answerReveal');
        if (!revealDiv) return;

        try {
            await ensureKeysLoaded(currentSection);
            const keyBase64 = loadedKeys[currentSection][currentQuestionIndex];
            const correctLetter = decodeKey(keyBase64);

            revealDiv.classList.remove('hidden');
            revealDiv.innerHTML = `<span class="correct-badge">✓ Correct Answer: <strong>Option ${correctLetter}</strong></span>`;

            const optItems = document.querySelectorAll('.option-item');
            const correctIndex = correctLetter.charCodeAt(0) - 65;
            if (optItems[correctIndex]) {
                optItems[correctIndex].classList.add('correct-highlight');
            }
        } catch (err) {
            console.error('Key fetch failed', err);
        }
    }

    function selectOption(index) {
        if (!userAnswers[currentSection]) userAnswers[currentSection] = {};
        userAnswers[currentSection][currentQuestionIndex] = index;

        // Remove marked status if it was there and they answer
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

        // Fetch all keys for final scoring
        try {
            const sections = ['Biology', 'Chemistry', 'Physics', 'Mathematics'];
            for (const s of sections) {
                await ensureKeysLoaded(s);
                await ensureSectionLoaded(s); // Should be loaded if they visited, but ensure for total count
            }

            let totalScore = 0;
            let correctCount = 0;
            let wrongCount = 0;
            let totalQuestions = 0;

            sections.forEach(s => {
                const questions = loadedQuestions[s];
                const keys = loadedKeys[s];
                questions.forEach((q, i) => {
                    totalQuestions++;
                    if (userAnswers[s] && userAnswers[s][i] !== undefined) {
                        const correctLetter = decodeKey(keys[i]);
                        const correctIdx = correctLetter.charCodeAt(0) - 65;
                        if (userAnswers[s][i] === correctIdx) {
                            totalScore += 4;
                            correctCount++;
                        } else {
                            totalScore -= 1;
                            wrongCount++;
                        }
                    }
                });
            });

            document.getElementById('scoreModal').style.display = 'flex';
            document.getElementById('scoreContent').innerHTML = `
                <div style="text-align:center;">
                    <p style="font-size: 2.5rem; font-weight: bold; color: var(--header-blue);">${totalScore}</p>
                    <p style="color: #666;">Total Score</p>
                    <hr style="border-color: #eee; margin: 20px 0;">
                    <p>✅ Correct: <strong>${correctCount}</strong></p>
                    <p>❌ Incorrect: <strong>${wrongCount}</strong></p>
                    <p>⏭️ Unanswered: <strong>${totalQuestions - (correctCount + wrongCount)}</strong></p>
                </div>
            `;
        } catch (err) {
            alert('Error calculating results. Please refresh.');
        }
    }

    function setupEventListeners() {
        const agreeTerms = document.getElementById('agreeTerms');
        const beginTestBtn = document.getElementById('beginTestBtn');
        const submitExamBtn = document.getElementById('submitExamBtn');
        const markReviewBtn = document.getElementById('markReviewBtn');

        if (agreeTerms && beginTestBtn) {
            agreeTerms.onchange = (e) => beginTestBtn.disabled = !e.target.checked;
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
                    questionStatus[currentSection][currentQuestionIndex] = 'visited'; // Reset to red if cleared
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
            const total = 20; // Fixed per section for NEST 2025
            summaryHTML += `<li>${s}: ${ans} / ${total} answered</li>`;
        });
        summaryHTML += '</ul>';
        document.getElementById('submissionSummary').innerHTML = summaryHTML;
    }

    function updateSectionCounts() {
        // Since we fetch on demand, we'll hardcode or deduce counts
        ['Biology', 'Chemistry', 'Physics', 'Mathematics'].forEach(s => {
            const countEl = document.getElementById(`${s.toLowerCase()}Count`);
            if (countEl) countEl.textContent = `(20)`;
        });
    }

    // BOOTSTRAP
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEventListeners);
    } else {
        setupEventListeners();
    }

})();
