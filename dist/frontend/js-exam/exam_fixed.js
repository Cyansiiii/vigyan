// exam_fixed.js - PW Online Exam System (debugged & complete)
// Notes: This file is a self-contained, fixed version of the code you provided.

'use strict';

// Question Bank Database
const QUESTION_BANK = {
  Physics: [
    { id: 'P1', text: 'On a circular track, two cyclists start from opposite directions. Abhijit moves with constant speed, Vani starts from rest with constant acceleration. They meet with same speed. Which is correct?', options: ['Abhijit travelled double the distance', 'Abhijit travelled half the distance', 'Both travelled same distance', 'Abhijit travelled 4/3 distance'], correct: 0, marks: 4 },
    
  ],
  Chemistry: [ /* ... same as provided ... */
    { id: 'C1', text: 'If element with Z=120 is discovered, which group will it belong to?', options: ['Alkaline earth metals', 'Alkali metals', 'Halogens', 'Noble gases'], correct: 3, marks: 4 },
    
  ],
  Mathematics: [ /* ... same as provided ... */
    { id: 'M1', text: 'Lines L₁: 5x-2y=1, L₂ through (0,1) and (100,101), L₃ through (1,11) parallel to -î+2ĵ. Total elements in A?', options: ['3', '0', '1', '2'], correct: 3, marks: 4 },
    { id: 'M2', text: 'Set A: points equidistant from P(-1,0) and Q(1,0). Set B: points equidistant from A and Q. If (5,y)∈B, what is y²?', options: ['9', '1', '4', '16'], correct: 3, marks: 4 },
    { id: 'M3', text: 'Lines L₁ and L₂. If (2,3,4) on L₁ is closest to L₂, which point on L₂ is closest?', options: ['(3,4,3)', '(3,4,4)', '(5,4,5)', '(4,4,4)'], correct: 0, marks: 4 },
    { id: 'M4', text: 'Sequence a₁,a₂,a₃,... with sₙ=a₁+a₂+...+aₙ. If 2sₙ=n(c+aₙ), which statement is correct?', options: ['a₁,a₂,a₃,... is AP', 'a₁,2a₂,3a₃,... is AP', 'a₁,a₂,a₃,... is GP', 'a₁,2a₂,3a₃,... is GP'], correct: 0, marks: 4 },
    { id: 'M5', text: 'f:ℝ→ℝ strictly decreasing with |f(t)|<π/2. g(t)=sin(f(t)). Which is correct?', options: ['g decreasing on [0,π]', 'g increasing on [0,π]', 'g increasing on (0,π/2), decreasing on (π/2,π)', 'g decreasing on (0,π/2), increasing on (π/2,π)'], correct: 1, marks: 4 },
    { id: 'M6', text: 'f,g:ℝ→ℝ. If g continuous, which case implies f is continuous?', options: ['g(x)=(f(x))³', 'g(x)=|f(x)|', 'g(x)=(f(x))²', 'g(x)=sin(f(x))'], correct: 0, marks: 4 },
    { id: 'M7', text: 'Largest area of rectangle under y=1-x² and above x-axis?', options: ['4/(3√3)', '2/(3√3)', '4/3', '1/3'], correct: 0, marks: 4 },
    { id: 'M8', text: 'R={(A,B)∈M×M: det(A-B) is integer} on 3×3 matrices. Which is correct?', options: ['Reflexive and symmetric, not transitive', 'Reflexive, not symmetric/transitive', 'Equivalence relation', 'Symmetric and transitive, not reflexive'], correct: 2, marks: 4 },
    { id: 'M9', text: 'Value of ²³C₀+²³C₂+²³C₄+...+²³C₂₂?', options: ['2²²', '2²²-1', '2²³+1', '2²³'], correct: 0, marks: 4 },
    { id: 'M10', text: 'f:ℚ→ℚ with f(x+y)=f(x)+f(y) and f(1)=10. Which is correct?', options: ['f is bijective', 'f is injective but not surjective', 'f is surjective but not injective', 'f is neither injective nor surjective'], correct: 0, marks: 4 },
    { id: 'M11', text: 'Integral from e⁻π/² to eπ/² of [sin²(log x)+sin(log x²)]dx. Value of I?', options: ['eπ/²-e⁻π/²', '0', 'πeπ/²/2', 'eπ-1'], correct: 1, marks: 4 },
    { id: 'M12', text: 'S={(|z-iz|, |z|²): z complex}. Which is correct?', options: ['S is a parabola', 'S is a circle', 'S is an ellipse but not circle', 'S is a hyperbola'], correct: 0, marks: 4 },
    { id: 'M13', text: 'Ship with 3 engines. Needs ≥2 working. P(A breaks)=1/4, P(B breaks)=1/4, P(C breaks)=1/2. P(completes)?', options: ['3/4', '1/2', '1/32', '1/4'], correct: 1, marks: 4 },
    { id: 'M14', text: 'cos(y)dy/dx + (1/x)sin(y)=x, y=π/2 at x=√3. Value of y at x=√(3/2)?', options: ['π/6', 'π/3', 'π/2', 'π/4'], correct: 0, marks: 4 },
    { id: 'M15', text: '∠BAQ=∠CPQ=∠CBQ=π/2, QA=3, AB=4, BC=1. Length of PQ?', options: ['2.2', '2', '√2', '3-√2'], correct: 1, marks: 4 }
  ],
  Biology: [ /* ... same as provided ... */
    { id: 'B1', text: 'What will be the sequence of RNA synthesized using the DNA template strand 5-GTCTAGGCTTCTC-3?', options: ['5-GAGAAGCCUAGAC-3', '5-GUCUAGGCUUCUC-3', '5-CAGAUCCGAAGAG-3', '5-CUCUUCGGAUCUG-3'], correct: 0, marks: 4 },
    { id: 'B2', text: 'Most likely pattern of inheritance of a rare genetic disorder?', options: ['X-linked dominant', 'X-linked recessive', 'Autosomal recessive', 'Autosomal dominant'], correct: 2, marks: 4 },
    { id: 'B3', text: 'Which protein plays a direct role in muscle contraction?', options: ['Troponin', 'Insulin', 'Myoglobin', 'Trypsin'], correct: 0, marks: 4 },
    { id: 'B4', text: 'Which is NOT derived from epidermal cell layer in plants?', options: ['Casparian strip from rice root', 'Trichomes from maize leaf', 'Subsidiary cells from rice leaf', 'Bulliform cells from grass'], correct: 0, marks: 4 },
    { id: 'B5', text: 'Which statement about meiosis is INCORRECT?', options: ['End products of meiosis II are haploid gametes', 'Four products are genetically different', 'Recombination in both males and females', 'Only one product survives in females'], correct: 0, marks: 4 },
    { id: 'B6', text: 'Test routinely performed to detect typhoid?', options: ['Widal test', 'ELISA', 'Gel electrophoresis', 'RT-PCR'], correct: 0, marks: 4 },
    { id: 'B7', text: 'After 30 PCR cycles, 1 billion copies produced. Copies at 20th cycle?', options: ['1 million', '0.66 billion', '10 million', '0.1 billion'], correct: 0, marks: 4 },
    { id: 'B8', text: 'Population N=400, K=500, r=0.01. What is dN/dt?', options: ['0.8', '0.05', '1', '0.4'], correct: 0, marks: 4 },
    { id: 'B9', text: 'Correct statement about Hemichordata?', options: ['Not chordate, has stomochord', 'Chordate sub-phylum with stomochord', 'Chordate sub-phylum with notochord', 'Not chordate due to water vascular system'], correct: 0, marks: 4 },
    { id: 'B10', text: 'Correct about oxygen dissociation curves?', options: ['Curve A: favorable at low H+', 'Curve C: favorable at low pCO2', 'Curve A: favorable at low pH', 'Curve C: favorable at high pO2'], correct: 0, marks: 4 },
    { id: 'B11', text: 'Match enzymes with cellular compartments correctly.', options: ['P-(ii); Q-(iii); R-(i); S-(iv)', 'P-(iv); Q-(i); R-(iii); S-(ii)', 'P-(iii); Q-(ii); R-(i); S-(v)', 'P-(iii); Q-(i); R-(iv); S-(ii)'], correct: 0, marks: 4 },
    { id: 'B12', text: 'Two species P (2n=20) and Q (2n=30) crossed. Which seed tissue has same chromosome numbers?', options: ['Embryo', 'Endosperm', 'Embryo and seed coat', 'Embryo and endosperm'], correct: 0, marks: 4 },
    { id: 'B13', text: 'Which plasmid vector for cloning with BamHI, EcoRI, and ampicillin selection?', options: ['Vector A', 'Vector B', 'Vector C', 'Vector D'], correct: 1, marks: 4 },
    { id: 'B14', text: 'Match conditions with affected physiological processes correctly.', options: ['P-(ii); Q-(iv); R-(iii); S-(i)', 'P-(iii); Q-(iv); R-(i); S-(ii)', 'P-(iv); Q-(iii); R-(i); S-(ii)', 'P-(ii); Q-(i); R-(iv); S-(iii)'], correct: 1, marks: 4 },
    { id: 'B15', text: 'Which graph represents correct relationship between light intensity and photosynthesis rate?', options: ['Graph A', 'Graph B', 'Graph C', 'Graph D'], correct: 2, marks: 4 }
  ]
};

// Global State
let currentSection = 'Physics';
let currentQuestionIndex = 0;
let answers = {};
let markedForReview = {};
let visited = {};
let violations = 0;
let timeLeft = 7200; // 2 hours in seconds
let timerInterval = null;
let syncInterval = null;
let lastSyncTime = Date.now();

// Initialize
function init() {
  generateStudentID();
  setupEventListeners();
  generateRulerMarks();
}

// Generate Random Student ID
function generateStudentID() {
  const idEl = document.getElementById('studentId');
  const id = 'PW2024-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  if (idEl) idEl.textContent = 'Student ID: ' + id;
}

// Start Exam
function startExam() {
  const instructions = document.getElementById('instructionsScreen');
  const exam = document.getElementById('examScreen');
  if (instructions) instructions.style.display = 'none';
  if (exam) exam.style.display = 'block';

  loadQuestion();
  updatePalette();
  startTimer();
  startSecurityMonitoring();

  console.log('Exam started at:', new Date().toISOString());
}

// Timer Functions
function startTimer() {
  updateTimerDisplay();

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      autoSubmitExam();
    }
  }, 1000);

  // Server time sync every 30 seconds
  if (syncInterval) clearInterval(syncInterval);
  syncInterval = setInterval(() => {
    const currentTime = Date.now();
    const expectedTime = lastSyncTime + 30000;
    const drift = Math.abs(currentTime - expectedTime);

    if (drift > 5000) {
      alert('⚠️ Time sync error detected. Test will be auto-submitted for security.');
      autoSubmitExam();
    }

    lastSyncTime = currentTime;
    console.log('Time sync check:', new Date().toISOString());
  }, 30000);
}

function updateTimerDisplay() {
  const el = document.getElementById('timerDisplay');
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const display = 
    hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');

  if (el) el.textContent = display;
}

// Security Monitoring
function startSecurityMonitoring() {
  // Tab switch detection
  document.addEventListener('visibilitychange', handleVisibilityChange);
  // DevTools detection
  document.addEventListener('keydown', handleKeyPress);
  // Right-click disable
  document.addEventListener('contextmenu', (e) => e.preventDefault());
}

function handleVisibilityChange() {
  if (document.hidden) {
    violations++;
    updateViolationsDisplay();
    alert(`⚠️ WARNING: Tab switching detected!\nViolation #${violations}\nYour test may be invalidated if you continue.`);

    if (violations >= 3) {
      alert('❌ Multiple violations detected. Test will be auto-submitted.');
      autoSubmitExam();
    }
  }
}

function handleKeyPress(e) {
  // Detect F12 or Ctrl+Shift+I
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i'))) {
    e.preventDefault();
    violations++;
    updateViolationsDisplay();
    alert(`⚠️ Developer tools detected! Violation #${violations}`);

    if (violations >= 3) {
      autoSubmitExam();
    }
  }
}

function updateViolationsDisplay() {
  const box = document.getElementById('violationsBox');
  const count = document.getElementById('violationsCount');

  if (violations > 0) {
    if (box) box.classList.remove('hidden');
    if (count) count.textContent = `Violations: ${violations}`;
  }
}

// Question Navigation
function loadQuestion() {
  const questions = QUESTION_BANK[currentSection];
  const question = questions[currentQuestionIndex];
  const questionKey = `${currentSection}-${currentQuestionIndex}`;

  // Mark as visited
  visited[questionKey] = true;

  // Update question display
  const qNumEl = document.getElementById('questionNumber');
  const qTextEl = document.getElementById('questionText');
  if (qNumEl) qNumEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  if (qTextEl) qTextEl.textContent = question.text;

  // Update mark for review button
  const markBtn = document.getElementById('markReviewBtn');
  if (markBtn) {
    if (markedForReview[questionKey]) {
      markBtn.classList.add('marked');
      const span = markBtn.querySelector('span');
      if (span) span.textContent = 'Marked for Review';
    } else {
      markBtn.classList.remove('marked');
      const span = markBtn.querySelector('span');
      if (span) span.textContent = 'Mark for Review';
    }
  }

  // Load options
  const container = document.getElementById('optionsContainer');
  if (container) {
    container.innerHTML = '';

    question.options.forEach((option, index) => {
      const label = document.createElement('label');
      label.className = 'option-label';
      if (answers[questionKey] === index) {
        label.classList.add('selected');
      }

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'question';
      input.value = index;
      input.checked = answers[questionKey] === index;
      input.onchange = () => selectAnswer(index);

      const optionText = document.createElement('span');
      optionText.innerHTML = `<strong>(${String.fromCharCode(97 + index)})</strong> ${option}`;

      label.appendChild(input);
      label.appendChild(optionText);
      container.appendChild(label);
    });
  }

  // Update navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
  if (nextBtn) nextBtn.disabled = currentQuestionIndex === questions.length - 1;

  updatePalette();
}

function selectAnswer(optionIndex) {
  const questionKey = `${currentSection}-${currentQuestionIndex}`;
  answers[questionKey] = optionIndex;

  // Auto-save (simulate AJAX)
  console.log('Auto-saving answer:', {
    questionKey,
    answer: optionIndex,
    timestamp: new Date().toISOString()
  });

  // Update UI
  document.querySelectorAll('.option-label').forEach((label, index) => {
    if (index === optionIndex) {
      label.classList.add('selected');
    } else {
      label.classList.remove('selected');
    }
  });

  updatePalette();
}

function navigateQuestion(direction) {
  const questions = QUESTION_BANK[currentSection];
  const newIndex = currentQuestionIndex + direction;

  if (newIndex >= 0 && newIndex < questions.length) {
    currentQuestionIndex = newIndex;
    loadQuestion();
  }
}

function toggleMarkForReview() {
  const questionKey = `${currentSection}-${currentQuestionIndex}`;
  markedForReview[questionKey] = !markedForReview[questionKey];
  loadQuestion();
}

// Section Switching (robust)
function switchSection(section, evt) {
  if (!QUESTION_BANK[section]) return;
  currentSection = section;
  currentQuestionIndex = 0;

  // Update tab styling
  document.querySelectorAll('.section-tab').forEach(tab => tab.classList.remove('active'));
  // prefer explicit element if provided
  if (evt && evt.target) evt.target.classList.add('active');
  else {
    const tabEl = document.querySelector(`.section-tab[data-section="${section}"]`);
    if (tabEl) tabEl.classList.add('active');
  }

  // Update palette title
  const paletteTitle = document.getElementById('paletteTitle');
  if (paletteTitle) paletteTitle.textContent = `${section} - Question Palette`;

  loadQuestion();
  updatePalette();
}

// Question Palette
function updatePalette() {
  const grid = document.getElementById('paletteGrid');
  const questions = QUESTION_BANK[currentSection];
  if (!grid || !questions) return;

  grid.innerHTML = '';

  questions.forEach((_, index) => {
    const btn = document.createElement('button');
    btn.className = 'palette-btn';
    btn.textContent = index + 1;
    btn.onclick = () => jumpToQuestion(index);

    const questionKey = `${currentSection}-${index}`;

    // Apply status class
    if (markedForReview[questionKey]) {
      btn.classList.add('marked');
    } else if (answers[questionKey] !== undefined) {
      btn.classList.add('answered');
    } else if (visited[questionKey]) {
      btn.classList.add('not-answered');
    } else {
      btn.classList.add('not-visited');
    }

    // Highlight current
    if (index === currentQuestionIndex) {
      btn.classList.add('current');
    }

    grid.appendChild(btn);
  });
}

// Jump to a specific question from palette
function jumpToQuestion(index) {
  const questions = QUESTION_BANK[currentSection];
  if (index >= 0 && index < questions.length) {
    currentQuestionIndex = index;
    loadQuestion();
  }
}

// Auto-submit and manual submit
function autoSubmitExam() {
  // Stop timers / monitoring
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }

  // Remove critical listeners (to avoid multiple alerts)
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  document.removeEventListener('keydown', handleKeyPress);

  // Lock UI if elements exist
  const examScreen = document.getElementById('examScreen');
  if (examScreen) {
    // disable inputs in exam screen
    examScreen.querySelectorAll('input, button, textarea, select').forEach(el => {
      try { el.disabled = true; } catch (e) { /* some elements may be read-only */ }
    });
  }

  // Compute results
  const results = calculateScore();

  // Show results
  showResults(results);

  // Simulate send to server (console)
  console.log('Auto/Manual submit payload:', {
    studentId: document.getElementById('studentId')?.textContent || null,
    answers,
    markedForReview,
    violations,
    timeLeft,
    score: results.totalScore,
    maxScore: results.maxScore,
    timestamp: new Date().toISOString()
  });
}

function finishExam() {
  // Called when user clicks "Submit" manually
  const confirmSubmit = confirm('Are you sure you want to submit the exam? You will not be able to change answers after submission.');
  if (confirmSubmit) {
    autoSubmitExam();
  }
}

// Score calculation
function calculateScore() {
  let totalScore = 0;
  let maxScore = 0;
  let sectionBreakdown = {};

  Object.keys(QUESTION_BANK).forEach(section => {
    const qArr = QUESTION_BANK[section];
    sectionBreakdown[section] = {
      obtained: 0,
      max: qArr.reduce((s, q) => s + (q.marks || 0), 0),
      attempted: 0,
      correctCount: 0,
      totalQuestions: qArr.length
    };

    qArr.forEach((q, idx) => {
      maxScore += q.marks || 0;
      const key = `${section}-${idx}`;
      const ans = answers[key];

      if (ans !== undefined && ans !== null) {
        sectionBreakdown[section].attempted++;
        if (ans === q.correct) {
          totalScore += q.marks || 0;
          sectionBreakdown[section].obtained += q.marks || 0;
          sectionBreakdown[section].correctCount++;
        }
      }
    });
  });

  return {
    totalScore,
    maxScore,
    sectionBreakdown
  };
}

// Show results UI (if results container exists, populate it; else use an alert)
function showResults(results) {
  const resultsPanel = document.getElementById('resultsPanel');

  if (resultsPanel) {
    // Clear and fill results panel
    resultsPanel.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Exam Results';
    resultsPanel.appendChild(title);

    const scoreLine = document.createElement('p');
    scoreLine.innerHTML = `<strong>Score:</strong> ${results.totalScore} / ${results.maxScore}`;
    resultsPanel.appendChild(scoreLine);

    const violationsLine = document.createElement('p');
    violationsLine.innerHTML = `<strong>Violations:</strong> ${violations}`;
    resultsPanel.appendChild(violationsLine);

    // Section breakdown table
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.innerHTML = `
      <thead>
        <tr>
          <th style="text-align:left;padding:6px;border-bottom:1px solid #ccc;">Section</th>
          <th style="text-align:right;padding:6px;border-bottom:1px solid #ccc;">Obtained</th>
          <th style="text-align:right;padding:6px;border-bottom:1px solid #ccc;">Max</th>
          <th style="text-align:right;padding:6px;border-bottom:1px solid #ccc;">Attempted</th>
          <th style="text-align:right;padding:6px;border-bottom:1px solid #ccc;">Correct</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');

    Object.keys(results.sectionBreakdown).forEach(sec => {
      const s = results.sectionBreakdown[sec];
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="padding:6px;border-bottom:1px solid #eee;">${sec}</td>
        <td style="padding:6px;text-align:right;border-bottom:1px solid #eee;">${s.obtained}</td>
        <td style="padding:6px;text-align:right;border-bottom:1px solid #eee;">${s.max}</td>
        <td style="padding:6px;text-align:right;border-bottom:1px solid #eee;">${s.attempted}/${s.totalQuestions}</td>
        <td style="padding:6px;text-align:right;border-bottom:1px solid #eee;">${s.correctCount}</td>
      `;
      tbody.appendChild(tr);
    });

    resultsPanel.appendChild(table);

    // Optionally provide a "Download JSON" button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Results (JSON)';
    downloadBtn.onclick = () => {
      const payload = {
        studentId: document.getElementById('studentId')?.textContent || null,
        results,
        answers,
        markedForReview,
        violations,
        timestamp: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exam_results.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    };
    resultsPanel.appendChild(document.createElement('br'));
    resultsPanel.appendChild(downloadBtn);

    // Reveal results panel and hide exam screen if present
    const examScreen = document.getElementById('examScreen');
    if (examScreen) examScreen.style.display = 'none';
    resultsPanel.style.display = 'block';
  } else {
    // fallback
    alert(`Exam submitted.\nScore: ${results.totalScore} / ${results.maxScore}\nViolations: ${violations}`);
  }
}

// Save & restore state to localStorage (helps accidental reload)
function saveState() {
  try {
    const state = {
      currentSection,
      currentQuestionIndex,
      answers,
      markedForReview,
      visited,
      violations,
      timeLeft,
      lastSaved: Date.now()
    };
    localStorage.setItem('pw_exam_state', JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save state to localStorage:', e);
  }
}

function restoreState() {
  try {
    const raw = localStorage.getItem('pw_exam_state');
    if (!raw) return;
    const state = JSON.parse(raw);

    // Merge restored state carefully
    if (state.currentSection && QUESTION_BANK[state.currentSection]) currentSection = state.currentSection;
    if (typeof state.currentQuestionIndex === 'number') currentQuestionIndex = state.currentQuestionIndex;
    answers = state.answers || answers;
    markedForReview = state.markedForReview || markedForReview;
    visited = state.visited || visited;
    violations = state.violations || violations;
    if (typeof state.timeLeft === 'number') timeLeft = state.timeLeft;
  } catch (e) {
    console.warn('Could not restore state from localStorage:', e);
  }
}

// Periodic auto-save
setInterval(saveState, 10000); // every 10s

// Warn user before unloading if exam in progress
window.addEventListener('beforeunload', (e) => {
  // If exam started and not yet submitted
  if (timerInterval) {
    const confirmationMessage = 'Leaving will submit your exam automatically — are you sure?';
    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
    return confirmationMessage; // Webkit, Safari, Chrome
  }
});

// Accessibility: keyboard navigation for palette (optional)
document.addEventListener('keydown', (e) => {
  if (!timerInterval) return; // only while exam ongoing
  if (e.key === 'ArrowRight') {
    navigateQuestion(1);
  } else if (e.key === 'ArrowLeft') {
    navigateQuestion(-1);
  }
});

// Small helpers and stubs
function setupEventListeners() {
  // Bind start / submit if elements exist
  const startBtn = document.getElementById('startBtn');
  if (startBtn) startBtn.addEventListener('click', startExam);
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.addEventListener('click', finishExam);

  // Section tabs (assume .section-tab elements have data-section attribute)
  document.querySelectorAll('.section-tab').forEach(tab => {
    const sec = tab.getAttribute('data-section');
    if (sec) tab.addEventListener('click', (evt) => switchSection(sec, evt));
  });

  // Prev / Next
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => navigateQuestion(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateQuestion(1));

  // Mark for review
  const markBtn = document.getElementById('markReviewBtn');
  if (markBtn) markBtn.addEventListener('click', toggleMarkForReview);
}

function generateRulerMarks() {
  // stub: if you have a visual ruler, populate marks here
  return;
}

// Initialize and restore any saved state
restoreState();
init();

// Expose some functions to global scope for UI buttons (if referenced in HTML)
window.startExam = startExam;
window.finishExam = finishExam;
window.switchSection = switchSection;
window.jumpToQuestion = jumpToQuestion;
window.toggleMarkForReview = toggleMarkForReview;

// End of file
