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
    let examActive = false;

    // Detect Year from URL
    const urlParams = new URLSearchParams(window.location.search);
    let yearParam = urlParams.get('year') || '2025';
    let examType = urlParams.get('type');
    if (!examType) {
        // Sophisticated detection: check if path contains 'iiser'
        if (window.location.pathname.includes('iiser')) {
            examType = 'iiser';
        } else {
            examType = 'niser'; // fallback
        }
    }

    const TEST_YEAR = yearParam.replace(/[^a-zA-Z0-9_]/g, '');
    const EXAM_TYPE = examType.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase(); // niser or iiser

    // Update Titles Immediately on Load
    document.addEventListener('DOMContentLoaded', () => {
        document.title = `Vigyan.prep ${EXAM_TYPE.toUpperCase()} PYQ ${TEST_YEAR} - Assessment Center`;
    });

    const SCRIPT_BASE = new URL('.', document.currentScript?.src || window.location.href);
    const CLOUD_BASE = 'https://pub-651a326ea8494f02894fbd07e97363ea.r2.dev';
    const DATA_ROOT = `${CLOUD_BASE}/frontend/data/${EXAM_TYPE}/${TEST_YEAR}/`;

    function rewriteImagePaths(html) {
        if (!html || typeof html !== 'string') return html;

        return html.replace(
            /(<img[^>]+src=['"])(images\/[^'"]+)(['"])/g,
            `$1${DATA_ROOT}$2$3`
        );
    }

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

        // Update marking display if elements exist
        const correctEl = document.querySelector('.q-marks .green-text');
        const incorrectEl = document.querySelector('.q-marks .red-text');
        if (correctEl) correctEl.textContent = MARKING.correct;
        if (incorrectEl) incorrectEl.textContent = Math.abs(MARKING.incorrect);

        try {
            const btn = document.querySelector('.btn-primary');
            const originalBtnText = btn ? btn.textContent : 'I am ready to begin';
            if (btn) {
                btn.textContent = 'Preparing Environment...';
                btn.disabled = true;
                btn.style.opacity = '0.7';
                btn.style.cursor = 'not-allowed';
            }

            await ensureDataLoaded();

            // Check if data is actually populated or empty, and collect preloads
            let totalQCount = 0;
            const imageUrls = new Set();
            if (loadedQuestions) {
                Object.values(loadedQuestions).forEach(arr => {
                    if (arr && arr.length > 0) {
                        totalQCount += arr.length;
                        arr.forEach(q => {
                            let content = q.text || q.question || '';
                            if (q.imageUrl) {
                                const raw = q.imageUrl;
                                imageUrls.add(raw.startsWith('images/') ? DATA_ROOT + raw : raw);
                            }
                            // Regex find any embedded image src
                            const imgRegex = /<img[^>]+src="([^">]+)"/gi;
                            let match;
                            while ((match = imgRegex.exec(content)) !== null) {
                                const raw = match[1];
                                imageUrls.add(raw.startsWith('images/') ? DATA_ROOT + raw : raw);
                            }
                        });
                    }
                });
            }

            if (totalQCount === 0) {
                // Show Coming Soon message instead of starting exam
                showComingSoonMessage(examTitle, TEST_YEAR);
                return;
            }

            // Preload images if any exist, waiting up to a few seconds
            if (imageUrls.size > 0 && btn) {
                btn.textContent = `Loading ${imageUrls.size} Diagrams...`;
                const startTime = Date.now();
                await Promise.race([
                    Promise.all(Array.from(imageUrls).map(url => {
                        return new Promise(resolve => {
                            const img = new Image();
                            img.onload = resolve;
                            img.onerror = resolve; // resolve anyway so we don't break
                            img.src = url;
                        });
                    })),
                    new Promise(resolve => setTimeout(resolve, 4000)) // Max 4 seconds wait
                ]);
                const loadTime = Date.now() - startTime;
                if (loadTime < 1000) {
                    await new Promise(resolve => setTimeout(resolve, 1000 - loadTime)); // Minimum 1s visual feedback
                }
            }

            // Request fullscreen for immersive exam experience
            try {
                const docEl = document.documentElement;
                if (docEl.requestFullscreen) {
                    await docEl.requestFullscreen();
                } else if (docEl.webkitRequestFullscreen) {
                    docEl.webkitRequestFullscreen(); // Safari
                } else if (docEl.msRequestFullscreen) {
                    docEl.msRequestFullscreen(); // IE/Edge legacy
                }
            } catch (fsErr) {
                // Fullscreen denied or not supported — continue normally
                console.warn('Fullscreen request denied:', fsErr.message);
            }

            document.getElementById('instructionPage').style.display = 'none';
            document.getElementById('examInterface').style.display = 'block';
            examActive = true;

            // --- Fullscreen Exit Warning System ---
            setupFullscreenWarning();
            loadQuestion(0);
            startTimer();
            renderPalette();

            // MathJax typeset once after initial load
            if (window.MathJax) MathJax.typeset();
        } catch (err) {
            console.error(err);
            if (err.message === 'NO_DATA') {
                showComingSoonMessage(examTitle, TEST_YEAR);
            } else {
                alert('Error loading exam data. Please check your connection or try another year.');
                const btn = document.querySelector('.btn-primary');
                if (btn) {
                    btn.textContent = 'I am ready to begin';
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                }
            }
        }
    }

    function showComingSoonMessage(examTitle, year) {
        // Create an overlay or replace the content
        const instContainer = document.querySelector('.instruction-content-wrapper');
        if (instContainer) {
            instContainer.innerHTML = `
                <div style="width: 100%; padding: 60px 20px; text-align: center; background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); border-radius: 12px; border: 2px solid #d4af37; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                    <div style="font-size: 4rem; margin-bottom: 20px;">🚧</div>
                    <h2 style="color: #d4af37; font-size: 2rem; margin-bottom: 15px;">Coming Soon!</h2>
                    <p style="color: #94a3b8; font-size: 1.1rem; max-width: 600px; margin: 0 auto 30px; line-height: 1.6;">
                        We are currently preparing the <strong>${examTitle} ${year}</strong> previous year questions.
                        The content will be available shortly. Thank you for your patience!
                    </p>
                    <button onclick="window.history.back()" style="background: linear-gradient(135deg, #d4af37 0%, #b8962e 100%); color: #1e3a5f; padding: 12px 30px; font-weight: bold; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; transition: transform 0.2s;">
                        Go Back
                    </button>
                </div>
            `;
        }
    }

    async function ensureDataLoaded() {
        if (Object.keys(loadedQuestions).length > 0) return;
        // Dynamically fetch unified questions.json based on EXAM_TYPE and TEST_YEAR
        try {
            const response = await fetch(`frontend/data/${EXAM_TYPE}/${TEST_YEAR}/questions.json?v=${Date.now()}`);
            if (!response.ok) throw new Error(`Failed to fetch questions for ${EXAM_TYPE} ${TEST_YEAR}`);
            const data = await response.json();

            loadedQuestions = data.questions || {};
            loadedKeys = data.keys || {};
        } catch (e) {
            // If the file doesn't exist at all (404), treat as NO_DATA so it shows coming soon
            throw new Error('NO_DATA');
        }
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
        // Set Question Text
        const questionTextElement = document.getElementById('questionContent'); // Changed from 'questionText' to 'questionContent' to match existing ID
        if (questionTextElement) {
            // Build inner HTML with image if present
            let htmlContent = question.text || question.question || '';
            if (question.imageUrl) {
                htmlContent += `
                    <div class="test-diagram-container" style="margin: 20px 0; text-align: center;">
                        <img src="${question.imageUrl}" alt="Question Diagram" style="max-width: 100%; max-height: 400px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    </div>
                `;
            }
            questionTextElement.innerHTML = rewriteImagePaths(htmlContent);
        }

        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';

        if (question.questionType === 'Numerical') {
            optionsContainer.innerHTML = `
                <div class="numerical-input-container" style="padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                    <label style="display: block; margin-bottom: 12px; font-weight: 500;">Type your answer:</label>
                    <input type="number" id="numericAnswer" class="form-input" step="any" 
                        value="${userAnswers[currentSection] && userAnswers[currentSection][index] !== undefined ? userAnswers[currentSection][index] : ''}" 
                        style="max-width: 200px; background: rgba(0,0,0,0.2); color: white; border-color: rgba(255,255,255,0.2);"
                        oninput="saveNumericAnswer(this.value)">
                </div>
            `;
        } else {
            question.options.forEach((opt, i) => {
                const item = document.createElement('div');
                item.className = 'option-item';
                const isMSQ = question.questionType === 'MSQ';
                const isSelected = isMSQ 
                    ? (userAnswers[currentSection] && userAnswers[currentSection][index] && userAnswers[currentSection][index].includes(i))
                    : (userAnswers[currentSection] && userAnswers[currentSection][index] === i);

                if (isSelected) item.classList.add('selected');
                
                let text = '';
                let imageUrl = null;
                
                if (typeof opt === 'string') {
                    text = opt;
                } else if (typeof opt === 'object' && opt !== null) {
                    text = opt.text || opt.optionText || opt.content || '';
                    imageUrl = opt.imageUrl || null;
                }
                
                if (imageUrl) {
                    if (imageUrl.startsWith('/uploads')) {
                        const baseURL = (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) || window.API_BASE_URL || 'https://api.vigyanprep.com';
                        imageUrl = baseURL + imageUrl;
                    } else if (imageUrl.startsWith('images/') && EXAM_TYPE && TEST_YEAR) {
                        imageUrl = DATA_ROOT + imageUrl;
                    }
                }

                item.innerHTML = `
                    <div style="display:flex; gap:10px; align-items:flex-start;">
                        <input type="${isMSQ ? 'checkbox' : 'radio'}" name="temp_radio" class="opt-radio" style="margin-top: 4px;" ${isSelected ? 'checked' : ''}>
                        <span class="opt-text">${text}</span>
                    </div>
                    ${imageUrl ? `<div style="padding-left: 28px; margin-top: 8px;"><img src="${imageUrl}" style="max-width:250px; max-height:150px; border-radius:4px; box-shadow: 0 1px 3px rgba(0,0,0,0.5);"></div>` : ''}
                `;
                item.onclick = () => isMSQ ? toggleOption(i) : selectOption(i);
                optionsContainer.appendChild(item);
            });
        }

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

    function toggleOption(index) {
        if (!userAnswers[currentSection]) userAnswers[currentSection] = {};
        if (!userAnswers[currentSection][currentQuestionIndex]) userAnswers[currentSection][currentQuestionIndex] = [];
        
        let answers = userAnswers[currentSection][currentQuestionIndex];
        if (answers.includes(index)) {
            userAnswers[currentSection][currentQuestionIndex] = answers.filter(i => i !== index);
        } else {
            answers.push(index);
        }

        if (userAnswers[currentSection][currentQuestionIndex].length === 0) {
            delete userAnswers[currentSection][currentQuestionIndex];
        }

        if (questionStatus[currentSection][currentQuestionIndex] === 'marked') {
            questionStatus[currentSection][currentQuestionIndex] = null;
        }

        const items = document.querySelectorAll('.option-item');
        const isSelected = userAnswers[currentSection][currentQuestionIndex] && userAnswers[currentSection][currentQuestionIndex].includes(index);
        
        if (isSelected) {
            items[index].classList.add('selected');
            const cb = items[index].querySelector('.opt-radio');
            if (cb) cb.checked = true;
        } else {
            items[index].classList.remove('selected');
            const cb = items[index].querySelector('.opt-radio');
            if (cb) cb.checked = false;
        }
        updatePalette();
    }

    window.saveNumericAnswer = function(value) {
        if (!userAnswers[currentSection]) userAnswers[currentSection] = {};
        if (value === '') {
            delete userAnswers[currentSection][currentQuestionIndex];
        } else {
            userAnswers[currentSection][currentQuestionIndex] = parseFloat(value);
        }
        updatePalette();
    };

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
            await ensureDataLoaded();
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
        examActive = false;

        // Exit fullscreen when exam is done
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (document.webkitFullscreenElement) {
                document.webkitExitFullscreen();
            }
        } catch (e) { /* ignore */ }

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

            await ensureDataLoaded();

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
                        const userAnswer = userAnswers[s][i];
                        const type = q.questionType || 'MCQ';

                        if (type === 'MCQ' || type === 'TrueFalse') {
                            const correctLetter = decodeKey(keys[i]);
                            const correctIdx = correctLetter.charCodeAt(0) - 65;
                            if (userAnswer === correctIdx) {
                                sectionScore += MARKING.correct;
                                sectionCorrect++;
                                totalCorrect++;
                            } else {
                                sectionScore += MARKING.incorrect;
                                sectionWrong++;
                                totalWrong++;
                            }
                        } else if (type === 'MSQ') {
                            // MSQ Logic: keys[i] will be decoded as "A,C" or ["A", "C"]
                            let correctLetters = decodeKey(keys[i]);
                            if (typeof correctLetters === 'string') {
                                correctLetters = correctLetters.split(',').map(s => s.trim());
                            }
                            const correctIndices = correctLetters.map(l => l.charCodeAt(0) - 65);
                            
                            const userIndices = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
                            
                            // Check if exactly the same
                            const isCorrect = userIndices.length === correctIndices.length && 
                                            userIndices.every(idx => correctIndices.includes(idx));
                            
                            if (isCorrect) {
                                sectionScore += MARKING.correct;
                                sectionCorrect++;
                                totalCorrect++;
                            } else {
                                sectionScore += MARKING.incorrect;
                                sectionWrong++;
                                totalWrong++;
                            }
                        } else if (type === 'Numerical') {
                            const correctAnswer = parseFloat(decodeKey(keys[i]));
                            const tolerance = q.numericTolerance || 0;
                            
                            if (Math.abs(userAnswer - correctAnswer) <= tolerance) {
                                sectionScore += MARKING.correct;
                                sectionCorrect++;
                                totalCorrect++;
                            } else {
                                sectionScore += MARKING.incorrect;
                                sectionWrong++;
                                totalWrong++;
                            }
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

    // --- FULLSCREEN EXIT WARNING SYSTEM ---
    function setupFullscreenWarning() {
        // Create the warning modal dynamically
        const overlay = document.createElement('div');
        overlay.id = 'fsWarningOverlay';
        overlay.style.cssText = `
            display: none;
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            align-items: center;
            justify-content: center;
            animation: fsFadeIn 0.3s ease;
        `;

        overlay.innerHTML = `
            <style>
                @keyframes fsFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fsSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes fsPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
                #fsWarningCard {
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 20px;
                    padding: 45px 40px;
                    max-width: 480px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.1);
                    animation: fsSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                #fsWarningCard .fs-icon {
                    font-size: 3.5rem;
                    margin-bottom: 20px;
                    display: block;
                    animation: fsPulse 2s ease-in-out infinite;
                }
                #fsWarningCard h2 {
                    color: #d4af37;
                    font-family: 'Inter', 'Space Grotesk', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0 0 12px 0;
                    letter-spacing: 0.5px;
                }
                #fsWarningCard p {
                    color: #94a3b8;
                    font-size: 0.95rem;
                    line-height: 1.7;
                    margin: 0 0 30px 0;
                }
                #fsWarningCard p strong {
                    color: #e2e8f0;
                }
                #fsReturnBtn {
                    background: linear-gradient(135deg, #d4af37 0%, #f59e0b 100%);
                    color: #0f172a;
                    border: none;
                    padding: 14px 36px;
                    font-size: 1rem;
                    font-weight: 700;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                #fsReturnBtn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.45);
                }
                #fsDismissLink {
                    display: block;
                    margin-top: 18px;
                    color: #64748b;
                    font-size: 0.8rem;
                    cursor: pointer;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                #fsDismissLink:hover {
                    color: #94a3b8;
                }
            </style>
            <div id="fsWarningCard">
                <span class="fs-icon">🖥️</span>
                <h2>Fullscreen Mode Recommended</h2>
                <p>
                    For the <strong>best exam experience</strong>, we recommend staying in
                    fullscreen mode. It minimizes distractions, prevents accidental navigation,
                    and ensures all questions and options are <strong>perfectly visible</strong>.
                </p>
                <button id="fsReturnBtn">↗ Return to Fullscreen</button>
                <a id="fsDismissLink">Continue without fullscreen</a>
            </div>
        `;

        document.body.appendChild(overlay);

        // Return to fullscreen button handler
        document.getElementById('fsReturnBtn').onclick = async function () {
            overlay.style.display = 'none';
            try {
                const docEl = document.documentElement;
                if (docEl.requestFullscreen) {
                    await docEl.requestFullscreen();
                } else if (docEl.webkitRequestFullscreen) {
                    docEl.webkitRequestFullscreen();
                }
            } catch (e) {
                console.warn('Could not re-enter fullscreen:', e.message);
            }
        };

        // Dismiss link handler
        document.getElementById('fsDismissLink').onclick = function () {
            overlay.style.display = 'none';
        };

        // Listen for fullscreen exit
        const onFsChange = () => {
            const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
            if (!isFullscreen && examActive) {
                overlay.style.display = 'flex';
            }
        };

        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
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
