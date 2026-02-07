// IISER/JEE Exam App - Version 4 (NEW FILE TO BYPASS CACHE)
'use strict';

alert('✅ NEW JavaScript V4 Loaded! If you see this, cache is bypassed.');
console.log('✅ [V4] Script loaded - NEW VERSION');

// Global State
window.ExamApp = {
    currentSection: 'Biology',
    currentQuestionIndex: 0,
    answers: {},
    markedForReview: {},
    visited: {},
    timeLeft: 10800,
    timerInterval: null,
    userName: 'Candidate',
    examYear: '2025',
    questionBank: null
};

function loadExamData(year) {
    console.log('[V4] Loading exam for year:', year);
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `../js-exam/exam_${year}.js`;
        
        script.onload = function() {
            if (typeof questionBank !== 'undefined') {
                window.ExamApp.questionBank = questionBank;
                console.log('[V4] ✅ Questions loaded');
                resolve(questionBank);
            } else {
                reject(new Error('Question bank not found'));
            }
        };
        
        script.onerror = () => reject(new Error('Failed to load exam'));
        document.body.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('[V4] DOM Ready');
    setupInstructionPage();
});

function setupInstructionPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const yearFromURL = urlParams.get('year');
    
    const yearSelect = document.getElementById('examYear');
    const beginBtn = document.getElementById('beginTestBtn');
    const agreeTerms = document.getElementById('agreeTerms');
    const candidateInput = document.getElementById('candidateName');
    
    if (yearFromURL && yearSelect) {
        window.ExamApp.examYear = yearFromURL;
        yearSelect.value = yearFromURL;
        updateExamTitles(yearFromURL);
    }
    
    function updateBeginButton() {
        if (!candidateInput || !yearSelect || !agreeTerms || !beginBtn) return;
        const hasName = candidateInput.value.trim() !== '';
        const hasYear = yearSelect.value !== '';
        const agreedTerms = agreeTerms.checked;
        beginBtn.disabled = !(hasName && hasYear && agreedTerms);
    }
    
    if (yearSelect) yearSelect.addEventListener('change', function() {
        window.ExamApp.examYear = this.value;
        updateBeginButton();
        updateExamTitles(this.value);
    });
    
    if (candidateInput) candidateInput.addEventListener('input', function() {
        window.ExamApp.userName = this.value.trim() || 'Candidate';
        updateBeginButton();
    });
    
    if (agreeTerms) agreeTerms.addEventListener('change', updateBeginButton);
    if (beginBtn) beginBtn.addEventListener('click', startExamProcess);
    
    updateBeginButton();
}

function updateExamTitles(year) {
    ['examTitleHeader', 'testNameDisplay'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = `Vigyan.prep Aptitude Test Series ${year}`;
    });
}

async function startExamProcess() {
    console.log('[V4] Starting exam');
    const candidateInput = document.getElementById('candidateName');
    const yearSelect = document.getElementById('examYear');
    
    if (!candidateInput || !yearSelect) return;
    
    const candidateName = candidateInput.value.trim();
    const examYear = yearSelect.value;
    
    if (!candidateName || !examYear) {
        alert('Please fill all required fields!');
        return;
    }
    
    window.ExamApp.userName = candidateName;
    window.ExamApp.examYear = examYear;
    
    const beginBtn = document.getElementById('beginTestBtn');
    if (beginBtn) {
        beginBtn.textContent = 'Loading exam...';
        beginBtn.disabled = true;
    }
    
    try {
        await loadExamData(examYear);
        document.getElementById('instructionPage').style.display = 'none';
        document.getElementById('examInterface').style.display = 'block';
        document.getElementById('userName').textContent = candidateName;
        initializeExam();
    } catch (error) {
        console.error('[V4] Error:', error);
        alert(`Error: ${error.message}`);
        if (beginBtn) {
            beginBtn.textContent = 'I am ready to begin the test';
            beginBtn.disabled = false;
        }
    }
}

function initializeExam() {
    console.log('[V4] ✅ Initializing exam');
    setupExamEventListeners();
    loadQuestion();
    updateQuestionPalette();
    updateSectionCounts();
    startTimer();
    setupCalculator();
    
    const key = `${window.ExamApp.currentSection}-${window.ExamApp.currentQuestionIndex}`;
    window.ExamApp.visited[key] = true;
}

function setupExamEventListeners() {
    console.log('[V4] Setting up button listeners');
    
    // Section tabs
    document.querySelectorAll('.section-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchSection(this.getAttribute('data-section'));
        });
    });
    
    // CRITICAL: Action buttons
    const markBtn = document.getElementById('markReviewBtn');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveNextBtn');
    const submitBtn = document.getElementById('submitExamBtn');
    
    if (markBtn) {
        console.log('[V4] ✅ Mark button found');
        markBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('[V4] 🔥 MARK CLICKED!');
            markForReviewAndNext();
            return false;
        };
    }
    
    if (clearBtn) {
        console.log('[V4] ✅ Clear button found');
        clearBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('[V4] 🔥 CLEAR CLICKED!');
            clearResponse();
            return false;
        };
    }
    
    if (saveBtn) {
        console.log('[V4] ✅ Save button found');
        saveBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('[V4] 🔥 SAVE & NEXT CLICKED!');
            saveAndNext();
            return false;
        };
    }
    
    if (submitBtn) {
        submitBtn.onclick = function(e) {
            e.preventDefault();
            console.log('[V4] 🔥 SUBMIT CLICKED!');
            showSubmitConfirmation();
            return false;
        };
    }
}

function startTimer() {
    updateTimerDisplay();
    window.ExamApp.timerInterval = setInterval(() => {
        window.ExamApp.timeLeft--;
        updateTimerDisplay();
        if (window.ExamApp.timeLeft <= 300) {
            document.getElementById('timerDisplay').style.background = '#d32f2f';
        }
        if (window.ExamApp.timeLeft <= 0) autoSubmitExam();
    }, 1000);
}

function updateTimerDisplay() {
    const h = Math.floor(window.ExamApp.timeLeft / 3600);
    const m = Math.floor((window.ExamApp.timeLeft % 3600) / 60);
    const s = window.ExamApp.timeLeft % 60;
    document.getElementById('timerDisplay').textContent = 
        `Time Left : ${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function loadQuestion() {
    console.log('[V4] Loading Q', window.ExamApp.currentQuestionIndex + 1);
    if (!window.ExamApp.questionBank) return;
    
    const questions = window.ExamApp.questionBank[window.ExamApp.currentSection];
    const question = questions[window.ExamApp.currentQuestionIndex];
    const key = `${window.ExamApp.currentSection}-${window.ExamApp.currentQuestionIndex}`;
    
    window.ExamApp.visited[key] = true;
    
    document.getElementById('questionNumberDisplay').textContent = `Question No. ${window.ExamApp.currentQuestionIndex + 1}`;
    document.getElementById('questionContent').innerHTML = `<p class="question-text">${question.text}</p>`;
    document.getElementById('sectionTitle').textContent = window.ExamApp.currentSection;
    
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    question.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (window.ExamApp.answers[key] === idx) btn.classList.add('selected');
        btn.innerHTML = `<strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}`;
        btn.onclick = () => selectAnswer(idx);
        container.appendChild(btn);
    });
    
    updateQuestionPalette();
    updateLegendCounts();
}

function selectAnswer(idx) {
    const key = `${window.ExamApp.currentSection}-${window.ExamApp.currentQuestionIndex}`;
    window.ExamApp.answers[key] = idx;
    console.log('[V4] ✅ Answer saved:', key, '=', idx);
    console.log('[V4] Total answers:', Object.keys(window.ExamApp.answers).length);
    
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        if (i === idx) btn.classList.add('selected');
        else btn.classList.remove('selected');
    });
    
    updateQuestionPalette();
    updateSectionCounts();
    updateLegendCounts();
}

function switchSection(section) {
    console.log('[V4] Switch to', section);
    window.ExamApp.currentSection = section;
    window.ExamApp.currentQuestionIndex = 0;
    
    document.querySelectorAll('.section-tab').forEach(tab => {
        if (tab.getAttribute('data-section') === section) tab.classList.add('active');
        else tab.classList.remove('active');
    });
    
    loadQuestion();
}

function markForReviewAndNext() {
    console.log('[V4] 📌 Marking for review');
    const key = `${window.ExamApp.currentSection}-${window.ExamApp.currentQuestionIndex}`;
    window.ExamApp.markedForReview[key] = true;
    console.log('[V4] ✅ Marked:', key);
    updateQuestionPalette();
    updateLegendCounts();
    saveAndNext();
}

function clearResponse() {
    console.log('[V4] 🗑️ Clearing response');
    const key = `${window.ExamApp.currentSection}-${window.ExamApp.currentQuestionIndex}`;
    delete window.ExamApp.answers[key];
    delete window.ExamApp.markedForReview[key];
    console.log('[V4] ✅ Cleared');
    
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    updateQuestionPalette();
    updateSectionCounts();
    updateLegendCounts();
}

function saveAndNext() {
    console.log('[V4] ➡️ Save & Next');
    const questions = window.ExamApp.questionBank[window.ExamApp.currentSection];
    
    if (window.ExamApp.currentQuestionIndex < questions.length - 1) {
        window.ExamApp.currentQuestionIndex++;
    } else {
        const sections = ['Biology', 'Chemistry', 'Mathematics', 'Physics'];
        const idx = sections.indexOf(window.ExamApp.currentSection);
        if (idx < sections.length - 1) {
            switchSection(sections[idx + 1]);
            return;
        }
    }
    loadQuestion();
}

function updateQuestionPalette() {
    const palette = document.getElementById('questionPalette');
    if (!palette || !window.ExamApp.questionBank) return;
    
    palette.innerHTML = '';
    const questions = window.ExamApp.questionBank[window.ExamApp.currentSection];
    
    questions.forEach((_, idx) => {
        const btn = document.createElement('button');
        btn.className = 'palette-btn';
        btn.textContent = idx + 1;
        
        const key = `${window.ExamApp.currentSection}-${idx}`;
        const isAnswered = window.ExamApp.answers[key] !== undefined;
        const isMarked = window.ExamApp.markedForReview[key];
        const isVisited = window.ExamApp.visited[key];
        
        if (idx === window.ExamApp.currentQuestionIndex) btn.classList.add('current');
        
        if (isAnswered && isMarked) btn.classList.add('answered-marked');
        else if (isMarked) btn.classList.add('marked');
        else if (isAnswered) btn.classList.add('answered');
        else if (isVisited) btn.classList.add('not-answered');
        else btn.classList.add('not-visited');
        
        btn.onclick = () => {
            window.ExamApp.currentQuestionIndex = idx;
            loadQuestion();
        };
        palette.appendChild(btn);
    });
}

function updateSectionCounts() {
    if (!window.ExamApp.questionBank) return;
    ['Biology', 'Chemistry', 'Mathematics', 'Physics'].forEach(section => {
        let count = 0;
        const questions = window.ExamApp.questionBank[section];
        questions.forEach((_, idx) => {
            if (window.ExamApp.answers[`${section}-${idx}`] !== undefined) count++;
        });
        const el = document.getElementById(`${section.toLowerCase()}Count`);
        if (el) el.textContent = `${count}`;
    });
}

function updateLegendCounts() {
    if (!window.ExamApp.questionBank) return;
    
    let answered = 0, notAnswered = 0, notVisited = 0, marked = 0, answeredMarked = 0;
    
    ['Biology', 'Chemistry', 'Mathematics', 'Physics'].forEach(section => {
        window.ExamApp.questionBank[section].forEach((_, idx) => {
            const key = `${section}-${idx}`;
            const isAns = window.ExamApp.answers[key] !== undefined;
            const isMark = window.ExamApp.markedForReview[key];
            const isVis = window.ExamApp.visited[key];
            
            if (isAns && isMark) answeredMarked++;
            else if (isMark) marked++;
            else if (isAns) answered++;
            else if (isVis) notAnswered++;
            else notVisited++;
        });
    });
    
    const items = document.querySelectorAll('.legend-item');
    if (items.length >= 5) {
        items[0].querySelector('.legend-circle').textContent = answered;
        items[1].querySelector('.legend-circle').textContent = notAnswered;
        items[2].querySelector('.legend-circle').textContent = notVisited;
        items[3].querySelector('.legend-circle').textContent = marked;
        items[4].querySelector('.legend-circle').textContent = answeredMarked;
    }
}

function setupCalculator() {
    const btn = document.getElementById('calculatorBtn');
    const close = document.getElementById('closeCalculator');
    const modal = document.getElementById('calculatorModal');
    
    if (btn) btn.onclick = () => {
        modal.classList.add('show');
        if (typeof initializeCalculator === 'function') initializeCalculator();
    };
    if (close) close.onclick = () => modal.classList.remove('show');
    if (modal) modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('show'); };
}

function showSubmitConfirmation() {
    console.log('[V4] 📊 Submit confirmation');
    const modal = document.getElementById('submitModal');
    const summary = calculateSubmissionSummary();
    
    document.getElementById('submissionSummary').innerHTML = `
        <p><strong>Total:</strong> ${summary.total}</p>
        <p><strong>Answered:</strong> ${summary.answered}</p>
        <p><strong>Not Answered:</strong> ${summary.notAnswered}</p>
        <p><strong>Marked:</strong> ${summary.marked}</p>
        <p><strong>Not Visited:</strong> ${summary.notVisited}</p>
    `;
    
    modal.classList.add('show');
    document.getElementById('cancelSubmitBtn').onclick = () => modal.classList.remove('show');
    document.getElementById('confirmSubmitBtn').onclick = () => {
        modal.classList.remove('show');
        finalSubmitExam();
    };
}

function calculateSubmissionSummary() {
    let total = 0, answered = 0, notAnswered = 0, marked = 0, notVisited = 0;
    ['Biology', 'Chemistry', 'Mathematics', 'Physics'].forEach(section => {
        window.ExamApp.questionBank[section].forEach((_, idx) => {
            total++;
            const key = `${section}-${idx}`;
            const isAns = window.ExamApp.answers[key] !== undefined;
            const isMark = window.ExamApp.markedForReview[key];
            const isVis = window.ExamApp.visited[key];
            if (isAns) answered++;
            if (isMark) marked++;
            if (isVis && !isAns) notAnswered++;
            if (!isVis) notVisited++;
        });
    });
    return { total, answered, notAnswered, marked, notVisited };
}

function finalSubmitExam() {
    console.log('[V4] 🎓 FINAL SUBMIT');
    console.log('[V4] Total answers collected:', Object.keys(window.ExamApp.answers).length);
    console.log('[V4] Answers:', window.ExamApp.answers);
    
    if (window.ExamApp.timerInterval) clearInterval(window.ExamApp.timerInterval);
    const results = calculateResults();
    console.log('[V4] Results:', results);
    showResultsPage(results);
}

function autoSubmitExam() {
    alert('Time up! Submitting...');
    finalSubmitExam();
}

function calculateResults() {
    let totalScore = 0, maxScore = 0, attempted = 0, correct = 0, incorrect = 0, total = 0;
    const breakdown = {};
    
    ['Biology', 'Chemistry', 'Mathematics', 'Physics'].forEach(section => {
        const questions = window.ExamApp.questionBank[section];
        breakdown[section] = { obtained: 0, max: questions.length * 4, attempted: 0, correct: 0, incorrect: 0, totalQuestions: questions.length };
        
        questions.forEach((q, idx) => {
            total++;
            maxScore += 4;
            const key = `${section}-${idx}`;
            const ans = window.ExamApp.answers[key];
            
            if (ans !== undefined) {
                attempted++;
                breakdown[section].attempted++;
                if (ans === q.correct) {
                    correct++;
                    totalScore += 4;
                    breakdown[section].obtained += 4;
                    breakdown[section].correct++;
                } else {
                    incorrect++;
                    totalScore -= 1;
                    breakdown[section].obtained -= 1;
                    breakdown[section].incorrect++;
                }
            }
        });
    });
    
    return { totalScore, maxScore, totalAttempted: attempted, totalCorrect: correct, totalIncorrect: incorrect, 
             totalQuestions: total, sectionBreakdown: breakdown, userName: window.ExamApp.userName, 
             examYear: window.ExamApp.examYear, timeSpent: 10800 - window.ExamApp.timeLeft };
}

function showResultsPage(r) {
    const pct = ((r.totalScore / r.maxScore) * 100).toFixed(2);
    const mins = Math.floor(r.timeSpent / 60);
    const secs = r.timeSpent % 60;
    
    document.getElementById('examInterface').innerHTML = `
        <div style="max-width:1000px;margin:50px auto;padding:40px;background:white;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.1)">
            <div style="text-align:center;margin-bottom:40px;padding-bottom:30px;border-bottom:3px solid #e2e8f0">
                <h1 style="color:#1565c0;font-size:2.5rem;margin-bottom:10px">🎓 Exam Complete!</h1>
                <p style="color:#64748b;font-size:1.1rem">Vigyan.prep Test ${r.examYear}</p>
                <p style="color:#475569;margin-top:10px">Candidate: <strong>${r.userName}</strong></p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:40px">
                <div style="background:#1976d2;padding:25px;border-radius:10px;text-align:center;color:white">
                    <div style="font-size:2.5rem;font-weight:bold">${r.totalScore}</div>
                    <div>Total Score (out of ${r.maxScore})</div>
                </div>
                <div style="background:#f57c00;padding:25px;border-radius:10px;text-align:center;color:white">
                    <div style="font-size:2.5rem;font-weight:bold">${pct}%</div>
                    <div>Percentage</div>
                </div>
                <div style="background:#4caf50;padding:25px;border-radius:10px;text-align:center;color:white">
                    <div style="font-size:2.5rem;font-weight:bold">${r.totalCorrect}</div>
                    <div>Correct (${r.totalAttempted} attempted)</div>
                </div>
                <div style="background:#d32f2f;padding:25px;border-radius:10px;text-align:center;color:white">
                    <div style="font-size:2.5rem;font-weight:bold">${mins}:${secs.toString().padStart(2,'0')}</div>
                    <div>Time Spent</div>
                </div>
            </div>
            <table style="width:100%;border-collapse:collapse;background:white;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.08)">
                <thead><tr style="background:#1565c0;color:white">
                    <th style="padding:18px 20px;text-align:left">Subject</th>
                    <th style="padding:18px 20px;text-align:center">Score</th>
                    <th style="padding:18px 20px;text-align:center">Max</th>
                    <th style="padding:18px 20px;text-align:center">Attempted</th>
                    <th style="padding:18px 20px;text-align:center">Correct</th>
                    <th style="padding:18px 20px;text-align:center">%</th>
                </tr></thead>
                <tbody>
                    ${Object.keys(r.sectionBreakdown).map((s, i) => {
                        const d = r.sectionBreakdown[s];
                        const sp = ((d.obtained / d.max) * 100).toFixed(1);
                        return `<tr style="background:${i%2===0?'#fff':'#f8fafc'}">
                            <td style="padding:18px 20px;font-weight:500">${s}</td>
                            <td style="padding:18px 20px;text-align:center;font-weight:600;color:${d.obtained>=0?'#4caf50':'#d32f2f'}">${d.obtained}</td>
                            <td style="padding:18px 20px;text-align:center">${d.max}</td>
                            <td style="padding:18px 20px;text-align:center">${d.attempted}/${d.totalQuestions}</td>
                            <td style="padding:18px 20px;text-align:center;color:#4caf50;font-weight:500">${d.correct}</td>
                            <td style="padding:18px 20px;text-align:center;font-weight:600;color:${sp>=50?'#4caf50':'#d32f2f'}">${sp}%</td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
            <div style="text-align:center;margin-top:40px">
                <button onclick="location.reload()" style="background:#1976d2;color:white;padding:16px 40px;border:none;border-radius:10px;font-size:1.1rem;font-weight:600;cursor:pointer">🔄 Take Another</button>
            </div>
        </div>
    `;
}

console.log('[V4] ✅ All functions ready');