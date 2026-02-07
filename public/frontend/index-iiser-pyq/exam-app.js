// Professional Exam Application - Official IISER/JEE Style
// Version: 2025.12.24.2 with Debug Logging
'use strict';

console.log('[ExamApp] Script loaded successfully');

// Global State
window.ExamApp = {
    currentSection: 'Biology',
    currentQuestionIndex: 0,
    answers: {},
    markedForReview: {},
    visited: {},
    timeLeft: 10800, // 3 hours in seconds
    timerInterval: null,
    userName: 'Candidate',
    examYear: '2025',
    questionBank: null
};

// Load exam data dynamically based on year
function loadExamData(year) {
    console.log('[ExamApp] Loading exam data for year:', year);
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `../js-exam/exam_${year}.js`;
        
        script.onload = function() {
            if (typeof questionBank !== 'undefined') {
                window.ExamApp.questionBank = questionBank;
                console.log('[ExamApp] Question bank loaded successfully:', questionBank);
                resolve(questionBank);
            } else {
                reject(new Error('Question bank not found in exam script'));
            }
        };
        
        script.onerror = function() {
            reject(new Error(`Failed to load exam data for year ${year}`));
        };
        
        document.body.appendChild(script);
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('[ExamApp] DOM Content Loaded');
    setupInstructionPage();
});

// Setup Instruction Page
function setupInstructionPage() {
    console.log('[ExamApp] Setting up instruction page');
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
    
    if (yearSelect) {
        yearSelect.addEventListener('change', function() {
            window.ExamApp.examYear = this.value;
            updateBeginButton();
            updateExamTitles(this.value);
        });
    }
    
    if (candidateInput) {
        candidateInput.addEventListener('input', function() {
            window.ExamApp.userName = this.value.trim() || 'Candidate';
            updateBeginButton();
        });
    }
    
    if (agreeTerms) {
        agreeTerms.addEventListener('change', updateBeginButton);
    }
    
    if (beginBtn) {
        beginBtn.addEventListener('click', startExamProcess);
    }
    
    updateBeginButton();
}

function updateExamTitles(year) {
    const titles = ['examTitleHeader', 'testNameDisplay'];
    titles.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = `Vigyan.prep Aptitude Test Series ${year}`;
    });
}

async function startExamProcess() {
    console.log('[ExamApp] Starting exam process');
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
        
        const instructionPage = document.getElementById('instructionPage');
        if (instructionPage) instructionPage.style.display = 'none';
        
        const examInterface = document.getElementById('examInterface');
        if (examInterface) examInterface.style.display = 'block';
        
        const userNameEl = document.getElementById('userName');
        if (userNameEl) userNameEl.textContent = candidateName;
        
        console.log('[ExamApp] Initializing exam interface');
        initializeExam();
    } catch (error) {
        console.error('[ExamApp] Failed to start exam:', error);
        alert(`Error: ${error.message}`);
        if (beginBtn) {
            beginBtn.textContent = 'I am ready to begin the test';
            beginBtn.disabled = false;
        }
    }
}

function initializeExam() {
    console.log('[ExamApp] Initializing exam');
    setupExamEventListeners();
    loadQuestion();
    updateQuestionPalette();
    updateSectionCounts();
    startTimer();
    setupCalculator();
    
    const questionKey = `${window.ExamApp.currentSection}-${window.ExamApp.currentQuestionIndex}`;
    window.ExamApp.visited[questionKey] = true;
    console.log('[ExamApp] Exam initialized successfully');
}

function setupExamEventListeners() {
    console.log('[ExamApp] Setting up event listeners');
    
    // Section tabs
    document.querySelectorAll('.section-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            console.log('[ExamApp] Section tab clicked:', section);
            switchSection(section);
        });
    });
    
    // Action buttons
    const markReviewBtn = document.getElementById('markReviewBtn');
    const clearBtn = document.getElementById('clearBtn');
    const saveNextBtn = document.getElementById('saveNextBtn');
    const submitExamBtn = document.getElementById('submitExamBtn');
    
    if (markReviewBtn) {
        console.log('[ExamApp] Mark Review button found, attaching listener');
        markReviewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[ExamApp] Mark for Review clicked!');
            markForReviewAndNext();
        });
    } else {
        console.error('[ExamApp] Mark Review button NOT found!');
    }
    
    if (clearBtn) {
        console.log('[ExamApp] Clear button found, attaching listener');
        clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[ExamApp] Clear Response clicked!');
            clearResponse();
        });
    } else {
        console.error('[ExamApp] Clear button NOT found!');
    }
    
    if (saveNextBtn) {
        console.log('[ExamApp] Save & Next button found, attaching listener');
        saveNextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[ExamApp] Save & Next clicked!');
            saveAndNext();
        });
    } else {
        console.error('[ExamApp] Save & Next button NOT found!');
    }
    
    if (submitExamBtn) {
        submitExamBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[ExamApp] Submit Exam clicked!');
            showSubmitConfirmation();
        });
    }
}

function startTimer() {
    updateTimerDisplay();
    
    window.ExamApp.timerInterval = setInterval(() => {
        window.ExamApp.timeLeft--;
        updateTimerDisplay();
        
        const timerEl = document.getElementById('timerDisplay');
        if (window.ExamApp.timeLeft <= 300 && timerEl) {
            timerEl.style.background = '#d32f2f';
        }
        
        if (window.ExamApp.timeLeft <= 0) {
            autoSubmitExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(window.ExamApp.timeLeft / 3600);
    const minutes = Math.floor((window.ExamApp.timeLeft % 3600) / 60);
    const seconds = window.ExamApp.timeLeft % 60;
    
    const display = `Time Left : ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const timerEl = document.getElementById('timerDisplay');
    if (timerEl) timerEl.textContent = display;
}

function loadQuestion() {
    console.log('[ExamApp] Loading question:', window.ExamApp.currentQuestionIndex);
    if (!window.ExamApp.questionBank) return;
    
    const questions = window.ExamApp.questionBank[window.ExamApp.currentSection];
    if (!questions || questions.length === 0) return;
    
    const question = questions[window.ExamApp.currentQuestionIndex];
    const questionKey = `${window.ExamApp.currentSection}-${window.ExamApp.currentQuestionIndex}`;
    
    window.ExamApp.visited[questionKey] = true;
    
    const qNumEl = document.getElementById('questionNumberDisplay');
    if (qNumEl) qNumEl.textContent = `Question No. ${window.ExamApp.currentQuestionIndex + 1}`;
    
    const qContentEl = document.getElementById('questionContent');
    if (qContentEl) qContentEl.innerHTML = `<p class="question-text">${question.text}</p>`;
    
    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            
            if (window.ExamApp.answers[questionKey] === index) {
                optionBtn.classList.add('selected');
            }
            
            optionBtn.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${option}`;
            optionBtn.addEventListener('click', function() {
                console.log('[ExamApp] Option selected:', index);
                selectAnswer(index);
            });
            
            optionsContainer.appendChild(optionBtn);
        });
    }
    
    const sectionTitleEl = document.getElementById('sectionTitle');
    if (sectionTitleEl) sectionTitleEl.textContent = window.ExamApp.currentSection;
    
    updateQuestionPalette();
    updateLegendCounts();
}

function selectAnswer(optionIndex) {
    const questionKey = `${window.ExamApp.currentSection}-${window.ExamApp.currentQuestionIndex}`;
    window.ExamApp.answers[questionKey] = optionIndex;
    console.log('[ExamApp] Answer saved:', questionKey, '=', optionIndex);
    console.log('[ExamApp] All answers:', window.ExamApp.answers);
    
    document.querySelectorAll('.option-btn').forEach((btn, index) => {
        if (index === optionIndex) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    updateQuestionPalette();
    updateSectionCounts();
    updateLegendCounts();
}

function switchSection(section) {
    console.log('[ExamApp] Switching to section:', section);
    window.ExamApp.currentSection = section;
    window.ExamApp.currentQuestionIndex = 0;
    
    document.querySelectorAll('.section-tab').forEach(tab => {
        if (tab.getAttribute('data-section') === section) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    loadQuestion();
}

function markForReviewAndNext() {
    console.log('[ExamApp] Marking for review');
    const questionKey = `${window.ExamApp.currentSection}-${window.ExamApp.currentQuestionIndex}`;
    window.ExamApp.markedForReview[questionKey] = true;
    console.log('[ExamApp] Marked for review:', questionKey);
    updateQuestionPalette();
    updateLegendCounts();
    saveAndNext();
}

function clearResponse() {
    console.log('[ExamApp] Clearing response');
    const questionKey = `${window.ExamApp.currentSection}-${window.ExamApp.currentQuestionIndex}`;
    delete window.ExamApp.answers[questionKey];
    delete window.ExamApp.markedForReview[questionKey];
    console.log('[ExamApp] Cleared question:', questionKey);
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    updateQuestionPalette();
    updateSectionCounts();
    updateLegendCounts();
}

function saveAndNext() {
    console.log('[ExamApp] Save and next');
    const questions = window.ExamApp.questionBank[window.ExamApp.currentSection];
    
    if (window.ExamApp.currentQuestionIndex < questions.length - 1) {
        window.ExamApp.currentQuestionIndex++;
    } else {
        const sections = ['Biology', 'Chemistry', 'Mathematics', 'Physics'];
        const currentIndex = sections.indexOf(window.ExamApp.currentSection);
        
        if (currentIndex < sections.length - 1) {
            switchSection(sections[currentIndex + 1]);
            return;
        }
    }
    
    loadQuestion();
}

function updateQuestionPalette() {
    const paletteEl = document.getElementById('questionPalette');
    if (!paletteEl || !window.ExamApp.questionBank) return;
    
    paletteEl.innerHTML = '';
    const questions = window.ExamApp.questionBank[window.ExamApp.currentSection];
    
    questions.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'palette-btn';
        btn.textContent = index + 1;
        
        const questionKey = `${window.ExamApp.currentSection}-${index}`;
        
        if (index === window.ExamApp.currentQuestionIndex) {
            btn.classList.add('current');
        }
        
        const isAnswered = window.ExamApp.answers[questionKey] !== undefined;
        const isMarked = window.ExamApp.markedForReview[questionKey];
        const isVisited = window.ExamApp.visited[questionKey];
        
        if (isAnswered && isMarked) {
            btn.classList.add('answered-marked');
        } else if (isMarked) {
            btn.classList.add('marked');
        } else if (isAnswered) {
            btn.classList.add('answered');
        } else if (isVisited) {
            btn.classList.add('not-answered');
        } else {
            btn.classList.add('not-visited');
        }
        
        btn.addEventListener('click', () => {
            console.log('[ExamApp] Palette button clicked:', index);
            window.ExamApp.currentQuestionIndex = index;
            loadQuestion();
        });
        
        paletteEl.appendChild(btn);
    });
}

function updateSectionCounts() {
    if (!window.ExamApp.questionBank) return;
    
    const sections = ['Biology', 'Chemistry', 'Mathematics', 'Physics'];
    
    sections.forEach(section => {
        let answered = 0;
        const questions = window.ExamApp.questionBank[section];
        
        questions.forEach((_, index) => {
            const key = `${section}-${index}`;
            if (window.ExamApp.answers[key] !== undefined) {
                answered++;
            }
        });
        
        const countEl = document.getElementById(`${section.toLowerCase()}Count`);
        if (countEl) countEl.textContent = `${answered}`;
    });
}

function updateLegendCounts() {
    if (!window.ExamApp.questionBank) return;
    
    let answered = 0, notAnswered = 0, notVisited = 0, marked = 0, answeredMarked = 0;
    
    const sections = ['Biology', 'Chemistry', 'Mathematics', 'Physics'];
    
    sections.forEach(section => {
        const questions = window.ExamApp.questionBank[section];
        
        questions.forEach((_, index) => {
            const key = `${section}-${index}`;
            const isAnswered = window.ExamApp.answers[key] !== undefined;
            const isMarked = window.ExamApp.markedForReview[key];
            const isVisited = window.ExamApp.visited[key];
            
            if (isAnswered && isMarked) {
                answeredMarked++;
            } else if (isMarked) {
                marked++;
            } else if (isAnswered) {
                answered++;
            } else if (isVisited) {
                notAnswered++;
            } else {
                notVisited++;
            }
        });
    });
    
    const legendItems = document.querySelectorAll('.legend-item');
    if (legendItems.length >= 5) {
        legendItems[0].querySelector('.legend-circle').textContent = answered;
        legendItems[1].querySelector('.legend-circle').textContent = notAnswered;
        legendItems[2].querySelector('.legend-circle').textContent = notVisited;
        legendItems[3].querySelector('.legend-circle').textContent = marked;
        legendItems[4].querySelector('.legend-circle').textContent = answeredMarked;
    }
}

// Calculator Functions
function setupCalculator() {
    const calcBtn = document.getElementById('calculatorBtn');
    const closeBtn = document.getElementById('closeCalculator');
    const modal = document.getElementById('calculatorModal');
    
    if (calcBtn) {
        calcBtn.addEventListener('click', function() {
            console.log('[ExamApp] Calculator button clicked');
            if (modal) {
                modal.classList.add('show');
                if (typeof initializeCalculator === 'function') {
                    initializeCalculator();
                }
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    // Close calculator when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
}

// Submit Functions
function showSubmitConfirmation() {
    console.log('[ExamApp] Showing submit confirmation');
    const modal = document.getElementById('submitModal');
    if (!modal) return;
    
    const summary = calculateSubmissionSummary();
    
    const summaryEl = document.getElementById('submissionSummary');
    if (summaryEl) {
        summaryEl.innerHTML = `
            <p><strong>Total Questions:</strong> ${summary.total}</p>
            <p><strong>Answered:</strong> ${summary.answered}</p>
            <p><strong>Not Answered:</strong> ${summary.notAnswered}</p>
            <p><strong>Marked for Review:</strong> ${summary.marked}</p>
            <p><strong>Not Visited:</strong> ${summary.notVisited}</p>
        `;
    }
    
    modal.classList.add('show');
    
    const cancelBtn = document.getElementById('cancelSubmitBtn');
    const confirmBtn = document.getElementById('confirmSubmitBtn');
    
    if (cancelBtn) {
        cancelBtn.onclick = function() {
            modal.classList.remove('show');
        };
    }
    
    if (confirmBtn) {
        confirmBtn.onclick = function() {
            modal.classList.remove('show');
            finalSubmitExam();
        };
    }
}

function calculateSubmissionSummary() {
    let total = 0, answered = 0, notAnswered = 0, marked = 0, notVisited = 0;
    
    const sections = ['Biology', 'Chemistry', 'Mathematics', 'Physics'];
    
    sections.forEach(section => {
        const questions = window.ExamApp.questionBank[section];
        
        questions.forEach((_, index) => {
            total++;
            const key = `${section}-${index}`;
            const isAnswered = window.ExamApp.answers[key] !== undefined;
            const isMarked = window.ExamApp.markedForReview[key];
            const isVisited = window.ExamApp.visited[key];
            
            if (isAnswered) answered++;
            if (isMarked) marked++;
            if (isVisited && !isAnswered) notAnswered++;
            if (!isVisited) notVisited++;
        });
    });
    
    return { total, answered, notAnswered, marked, notVisited };
}

function finalSubmitExam() {
    console.log('[ExamApp] Final submit - calculating results');
    console.log('[ExamApp] Final answers:', window.ExamApp.answers);
    
    if (window.ExamApp.timerInterval) {
        clearInterval(window.ExamApp.timerInterval);
    }
    
    const results = calculateResults();
    console.log('[ExamApp] Results calculated:', results);
    showResultsPage(results);
}

function autoSubmitExam() {
    alert('Time is up! Your exam will be submitted automatically.');
    finalSubmitExam();
}

function calculateResults() {
    let totalScore = 0, maxScore = 0, totalAttempted = 0, totalCorrect = 0, totalIncorrect = 0, totalQuestions = 0;
    
    const sectionBreakdown = {};
    const sections = ['Biology', 'Chemistry', 'Mathematics', 'Physics'];
    
    sections.forEach(section => {
        const questions = window.ExamApp.questionBank[section];
        const marksPerQuestion = 4;
        const negativeMarks = -1;
        
        sectionBreakdown[section] = {
            obtained: 0,
            max: questions.length * marksPerQuestion,
            attempted: 0,
            correct: 0,
            incorrect: 0,
            totalQuestions: questions.length
        };
        
        questions.forEach((q, index) => {
            totalQuestions++;
            maxScore += marksPerQuestion;
            
            const key = `${section}-${index}`;
            const answer = window.ExamApp.answers[key];
            
            if (answer !== undefined) {
                totalAttempted++;
                sectionBreakdown[section].attempted++;
                
                if (answer === q.correct) {
                    totalCorrect++;
                    totalScore += marksPerQuestion;
                    sectionBreakdown[section].obtained += marksPerQuestion;
                    sectionBreakdown[section].correct++;
                } else {
                    totalIncorrect++;
                    totalScore += negativeMarks;
                    sectionBreakdown[section].obtained += negativeMarks;
                    sectionBreakdown[section].incorrect++;
                }
            }
        });
    });
    
    return {
        totalScore,
        maxScore,
        totalAttempted,
        totalCorrect,
        totalIncorrect,
        totalQuestions,
        sectionBreakdown,
        userName: window.ExamApp.userName,
        examYear: window.ExamApp.examYear,
        timeSpent: 10800 - window.ExamApp.timeLeft
    };
}

function showResultsPage(results) {
    const examInterface = document.getElementById('examInterface');
    if (!examInterface) return;
    
    const percentage = ((results.totalScore / results.maxScore) * 100).toFixed(2);
    const timeSpentMin = Math.floor(results.timeSpent / 60);
    const timeSpentSec = results.timeSpent % 60;
    
    examInterface.innerHTML = `
        <div style="max-width: 1000px; margin: 50px auto; padding: 40px; background: white; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 3px solid #e2e8f0;">
                <h1 style="color: #1565c0; font-size: 2.5rem; margin-bottom: 10px;">🎓 Exam Completed!</h1>
                <p style="color: #64748b; font-size: 1.1rem;">Vigyan.prep Aptitude Test Series ${results.examYear}</p>
                <p style="color: #475569; font-size: 1rem; margin-top: 10px;">Candidate: <strong>${results.userName}</strong></p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
                <div style="background: #1976d2; padding: 25px; border-radius: 10px; text-align: center; color: white;">
                    <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 5px;">${results.totalScore}</div>
                    <div style="font-size: 0.9rem;">Total Score</div>
                    <div style="font-size: 0.85rem; margin-top: 5px;">out of ${results.maxScore}</div>
                </div>
                <div style="background: #f57c00; padding: 25px; border-radius: 10px; text-align: center; color: white;">
                    <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 5px;">${percentage}%</div>
                    <div style="font-size: 0.9rem;">Percentage</div>
                </div>
                <div style="background: #4caf50; padding: 25px; border-radius: 10px; text-align: center; color: white;">
                    <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 5px;">${results.totalCorrect}</div>
                    <div style="font-size: 0.9rem;">Correct</div>
                    <div style="font-size: 0.85rem; margin-top: 5px;">out of ${results.totalAttempted} attempted</div>
                </div>
                <div style="background: #d32f2f; padding: 25px; border-radius: 10px; text-align: center; color: white;">
                    <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 5px;">${timeSpentMin}:${timeSpentSec.toString().padStart(2, '0')}</div>
                    <div style="font-size: 0.9rem;">Time Spent</div>
                </div>
            </div>
            
            <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08); margin-bottom: 30px;">
                <div style="background: #1565c0; color: white; padding: 20px;">
                    <h2 style="margin: 0; font-size: 1.3rem;">📚 Subject-wise Performance</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f1f5f9;">
                            <th style="text-align: left; padding: 18px 20px; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0;">Subject</th>
                            <th style="text-align: center; padding: 18px 20px; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0;">Score</th>
                            <th style="text-align: center; padding: 18px 20px; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0;">Max</th>
                            <th style="text-align: center; padding: 18px 20px; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0;">Attempted</th>
                            <th style="text-align: center; padding: 18px 20px; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0;">Correct</th>
                            <th style="text-align: center; padding: 18px 20px; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0;">%</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.keys(results.sectionBreakdown).map((section, idx) => {
                            const s = results.sectionBreakdown[section];
                            const sectionPercent = ((s.obtained / s.max) * 100).toFixed(1);
                            const bgColor = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                            
                            return `
                                <tr style="background: ${bgColor};">
                                    <td style="padding: 18px 20px; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #1e293b;">${section}</td>
                                    <td style="padding: 18px 20px; text-align: center; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: ${s.obtained >= 0 ? '#4caf50' : '#d32f2f'}; font-size: 1.1rem;">${s.obtained}</td>
                                    <td style="padding: 18px 20px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #64748b;">${s.max}</td>
                                    <td style="padding: 18px 20px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #64748b;">${s.attempted} / ${s.totalQuestions}</td>
                                    <td style="padding: 18px 20px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #4caf50; font-weight: 500;">${s.correct}</td>
                                    <td style="padding: 18px 20px; text-align: center; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: ${sectionPercent >= 50 ? '#4caf50' : '#d32f2f'};}">${sectionPercent}%</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
                <button onclick="location.reload()" style="background: #1976d2; color: white; padding: 16px 40px; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 600; cursor: pointer;">
                    🔄 Take Another Exam
                </button>
            </div>
        </div>
    `;
}

console.log('[ExamApp] All functions defined successfully');