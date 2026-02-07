'use strict';

// ==========================================
// NEST 2025 (NISER PYQ) - QUESTION BANK
// ==========================================
const questionBank = {
    Biology: [
        {
            id: 1,
            text: "Change of amino acids in a protein led to formation of a salt bridge, without affecting the overall fold. This change result in:",
            options: ["an increase in free energy change (\\(\\Delta G\\)) of the protein.", "a decrease in melting temperature (\\(T_m\\)) of the protein.", "a decrease in enthalpy (\\(\\Delta H\\)) of the protein.", "a decrease in stability of the protein."],
            correct: 2 // Original A: "a decrease in enthalpy"
        },
        {
            id: 2,
            text: "Regarding light reaction of photosynthesis, which of the following is correct? <br>(I) Water oxidized... (II) Pheophytin-I reduces NADP+... (III) Cytochrome b6f transports protons... (IV) ATP synthase transports protons...",
            options: ["(I) and (II)", "(II) and (IV)", "(III) and (IV)", "(II) and (III)"],
            correct: 3 // Original A: "(II) and (III)"
        },
        {
            id: 3,
            text: "Malaria... virulent form X stored in salivary gland... toxic substance Y released by ruptured RBCs...",
            options: ["trophozoite and haemozoin.", "sporozoite and haemozoin.", "merozoite and hemagglutinin.", "sporozoite and hemagglutinin."],
            correct: 1 // Original A: "sporozoite and haemozoin"
        },
        {
            id: 4,
            text: "The oxygen dissociation curve (as percentage saturation versus \\(pO_2\\) of blood) of haemoglobin for a healthy adult individual is shown in the graph.<br><br><div style='text-align:center;'><img src='images/q4.png' alt='Oxygen Curve' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["\\(P, Q\\) and \\(R\\) for pH gradients, temperature, respective \\(pO_2\\) of blood", "Aniline blue, acetic acid, malachite green", "Alkaline solution, acidic solution, neutral solution", "Methylene blue, safranin, eosin"],
            correct: 0
        },
        {
            id: 5,
            text: "When a human somatic cell undergoes mitotic division, the ploidy level in metaphase and telophase, respectively, would be:",
            options: ["2n and 4n", "2n and 2n", "4n and 2n", "4n and 4n"],
            correct: 1 // Original A: "2n and 2n"
        },
        {
            id: 8,
            text: "In the eukaryotic cell cycle shown in the figure, the black solid bars (1, 2 and 3) represent important checkpoints...<br><br><div style='text-align:center;'><img src='images/q8.png' alt='Cell Cycle' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["chromosome attachment to spindles; DNA replication; growth factors.", "DNA replication; growth factors; chromosome attachment to spindles.", "growth factors; chromosome attachment to spindles; DNA replication.", "growth factors; DNA replication; chromosome attachment to spindles."],
            correct: 3 // Original A
        },
        {
            id: 12,
            text: "Identify the dicot stem tissue sections shown in the diagram:<br><br><div style='text-align:center;'><img src='images/q12.png' alt='Plant Anatomy' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["Dicot stem", "Monocot stem", "Dicot root", "Monocot root"],
            correct: 0 // Original A
        },
        {
            id: 13,
            text: "Regarding the inheritance pattern in the pedigree chart below...<br><br><div style='text-align:center;'><img src='images/q13.png' alt='Pedigree' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["X-linked recessive", "Autosomal dominant", "Autosomal recessive", "X-linked dominant"],
            correct: 2 // Assuming Autosomal recessive was A in PDF
        }
    ],
    Chemistry: [
        {
            id: 1,
            text: "Maltose, a disaccharide, contains glycosidic linkage between:",
            options: ["two units of \\(\\beta\\)-D-glucose", "two units of \\(\\alpha\\)-D-glucose", "\\(\\beta\\)-D-glucose and \\(\\alpha\\)-D-fructose", "\\(\\alpha\\)-D-glucose and \\(\\beta\\)-D-fructose"],
            correct: 1 // Original A: "two units of alpha-D-glucose"
        },
        {
            id: 2,
            text: "The IUPAC name of the compound shown in the diagram is:<br><br><div style='text-align:center;'><img src='images/q17.png' alt='IUPAC Structure' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["5-ethyl-6-methylnonan-3-ol", "1,3-diethyl-4-methylheptan-1-ol", "5-ethyl-6-propylheptan-3-ol", "5-ethyl-4-methylnonan-7-ol"],
            correct: 0 // Original A
        },
        {
            id: 8,
            text: "Major product in an aromatic electrophilic substitution reaction on the given compound (cyanobenzophenone) would be:<br><br><div style='text-align:center;'><img src='images/q23.png' alt='Reaction' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["Option (b)", "Option (c)", "Option (d)", "Option (a)"],
            correct: 3 // Original A
        },
        {
            id: 9,
            text: "The product P of the reaction with methyl magnesium bromide (2 equiv) followed by \\(H_3O^+\\) is:<br><br><div style='text-align:center;'><img src='images/q24.png' alt='Reaction Structure' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["Option (b)", "Option (a)", "Option (c)", "Option (d)"],
            correct: 1 // Original A
        }
    ],
    Physics: [
        {
            id: 1,
            text: "Noah Lyles and Kishane Thompson finished 100m sprint in 9.784 s and 9.789 s respectively. What was the distance between them at the finish?",
            options: ["10 cm", "25 cm", "5 cm", "50 cm"],
            correct: 2 // Original A: 5 cm
        },
        {
            id: 10,
            text: "Charges on capacitors \\(C_1\\) and \\(C_2\\) (2 \\(\\mu\\)F each) in the given DC circuit after a long time are:<br><br><div style='text-align:center;'><img src='images/q40.png' alt='Circuit' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["8 \\(\\mu\\)C and 16 \\(\\mu\\)C", "16 \\(\\mu\\)C and 8 \\(\\mu\\)C", "4 \\(\\mu\\)C and 4 \\(\\mu\\)C", "8 \\(\\mu\\)C and 8 \\(\\mu\\)C"],
            correct: 0 // Original A
        },
        {
            id: 12,
            text: "Net force on a square loop (side \\(a\\), current \\(I\\)) in a magnetic field \\(\\vec{B} = \\beta y \\hat{z}\\) is:<br><br><div style='text-align:center;'><img src='images/q42.png' alt='Magnetic Force' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["\\(I \\beta a^2\\)", "zero", "\\(2 I \\beta a^2\\)", "\\(I \\beta a / 2\\)"],
            correct: 0 // Original A
        },
        {
            id: 14,
            text: "Analyze the qualitative phase diagram below:<br><br><div style='text-align:center;'><img src='images/q44.png' alt='Phase Diagram' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["The triple point is at 1 atm", "Sublimation occurs at STP", "The liquid to vapour phase transition is not possible at STP.", "Solid phase is more dense than liquid"],
            correct: 2 // Original A
        }
    ],
    Mathematics: [
        {
            id: 1,
            text: "System of equations \\(x \\cos \\theta + y \\sec \\theta = 0\\) and \\(x \\sin \\theta + y \\tan \\theta = 0\\) has non-unique solution if:",
            options: ["\\(\\theta \\in \\{(2n+1)\\pi/2 : n \\in \\mathbb{Z}\\}\\)", "\\(\\theta \\in \\{n\\pi : n \\in \\mathbb{Z}\\}\\)", "\\(\\theta = 0\\) only", "no value of \\(\\theta\\)"],
            correct: 1 // Original A
        },
        {
            id: 3,
            text: "Value of the integral \\(\\int_0^{\\sqrt{\\pi}} x \\sin^2(x^2) dx\\) is:",
            options: ["\\(\\pi/2\\)", "\\(\\pi/8\\)", "\\(\\pi/4\\)", "\\(\\pi\\)"],
            correct: 2 // Original A: pi/4
        },
        {
            id: 6,
            text: "Length of segment \\(C_2T\\) in the nested circles diagram is:<br><br><div style='text-align:center;'><img src='images/q51.png' alt='Geometry' style='max-width:400px; width:100%; height:auto;'></div>",
            options: ["\\(\\sqrt{r_2(r_2-2r_1)}\\)", "\\(r_2 - r_1\\)", "\\(\\sqrt{r_1 r_2}\\)", "\\(2r_1\\)"],
            correct: 0 // Original A
        }
    ]
};

// ==========================================
// 2. EXAM ENGINE INITIALIZATION
// ==========================================
let currentQuestionIndex = 0;
let userAnswers = {}; // { Biology: {0: optionIndex, 1: ...}, Chemistry: ... }
let currentSection = 'Biology';
let questionStatus = {}; // { Biology: {0: 'answered', 1: 'marked', ...} }
let timeLeft = 180 * 60; // 180 minutes in seconds
let timerInterval;

// Initialize the exam
function initExam() {
    const userName = document.getElementById('candidateName').value || 'Candidate';
    document.getElementById('userNameDisplay').textContent = userName;
    document.getElementById('instructionPage').style.display = 'none';
    document.getElementById('examInterface').style.display = 'block';

    // Set initial section counts
    updateSectionCounts();
    loadQuestion(0);
    startTimer();
    renderPalette();

    // MathJax periodic re-typeset
    setInterval(() => {
        if (window.MathJax) {
            MathJax.typeset();
        }
    }, 1000);
}

// Function to handle Enter Key on name input
document.getElementById('candidateName').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !document.getElementById('beginTestBtn').disabled) {
        initExam();
    }
});

// Enable/Disable Begin Button based on agreement
document.getElementById('agreeTerms').addEventListener('change', function (e) {
    document.getElementById('beginTestBtn').disabled = !e.target.checked;
});

document.getElementById('beginTestBtn').onclick = initExam;

function loadQuestion(index) {
    currentQuestionIndex = index;
    const question = questionBank[currentSection][index];

    // Update Question Info
    document.getElementById('questionNumberDisplay').textContent = index + 1;
    document.getElementById('sectionTitle').textContent = currentSection;

    // Load Content
    const content = document.getElementById('questionContent');
    content.innerHTML = question.text;

    // Load Options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (userAnswers[currentSection] && userAnswers[currentSection][index] === i) {
            btn.classList.add('selected');
        }
        btn.innerHTML = `<span class="opt-id">${String.fromCharCode(65 + i)}</span> <span class="opt-text">${opt}</span>`;
        btn.onclick = () => selectOption(i);
        optionsContainer.appendChild(btn);
    });

    updatePalette();
}

function selectOption(index) {
    if (!userAnswers[currentSection]) userAnswers[currentSection] = {};
    userAnswers[currentSection][currentQuestionIndex] = index;

    // Update UI
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach((btn, i) => {
        if (i === index) btn.classList.add('selected');
        else btn.classList.remove('selected');
    });
}

function updateSectionCounts() {
    Object.keys(questionBank).forEach(section => {
        const total = questionBank[section].length;
        document.getElementById(`${section.toLowerCase()}Count`).textContent = `(${total})`;
    });
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
    document.getElementById('timerDisplay').textContent =
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Section Switching
document.querySelectorAll('.section-tab').forEach(tab => {
    tab.onclick = () => {
        document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentSection = tab.getAttribute('data-section');
        renderPalette();
        loadQuestion(0);
    };
});

function renderPalette() {
    const palette = document.getElementById('questionPalette');
    palette.innerHTML = '';
    questionBank[currentSection].forEach((_, i) => {
        const item = document.createElement('div');
        item.className = 'palette-item';
        item.textContent = i + 1;
        item.onclick = () => loadQuestion(i);
        palette.appendChild(item);
    });
    updatePalette();
}

function updatePalette() {
    const items = document.querySelectorAll('.palette-item');
    items.forEach((item, i) => {
        item.classList.remove('active', 'answered', 'marked');
        if (i === currentQuestionIndex) item.classList.add('active');
        if (userAnswers[currentSection] && userAnswers[currentSection][i] !== undefined) {
            item.classList.add('answered');
        }
    });

    // Update Legends
    let answered = 0;
    Object.keys(userAnswers).forEach(s => {
        answered += Object.keys(userAnswers[s]).length;
    });

    let totalQuestions = 0;
    Object.keys(questionBank).forEach(s => totalQuestions += questionBank[s].length);

    document.querySelectorAll('.leg-circle.answered')[0].textContent = answered;
    document.querySelectorAll('.leg-circle.not-visited')[0].textContent = totalQuestions - answered;
}

// Navigation Buttons
document.getElementById('saveNextBtn').onclick = () => {
    if (currentQuestionIndex < questionBank[currentSection].length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    } else {
        // Switch to next section if exists
        const sections = Object.keys(questionBank);
        const nextIdx = sections.indexOf(currentSection) + 1;
        if (nextIdx < sections.length) {
            currentSection = sections[nextIdx];
            document.querySelectorAll('.section-tab').forEach(t => {
                t.classList.toggle('active', t.getAttribute('data-section') === currentSection);
            });
            renderPalette();
            loadQuestion(0);
        }
    }
};

document.getElementById('clearBtn').onclick = () => {
    if (userAnswers[currentSection]) {
        delete userAnswers[currentSection][currentQuestionIndex];
        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(btn => btn.classList.remove('selected'));
        updatePalette();
    }
};

// Submission
document.getElementById('submitExamBtn').onclick = () => {
    document.getElementById('submitModal').style.display = 'flex';
    let summaryHTML = '<ul>';
    Object.keys(questionBank).forEach(s => {
        const ans = userAnswers[s] ? Object.keys(userAnswers[s]).length : 0;
        summaryHTML += `<li>${s}: ${ans} / ${questionBank[s].length} answered</li>`;
    });
    summaryHTML += '</ul>';
    document.getElementById('submissionSummary').innerHTML = summaryHTML;
};

document.getElementById('cancelSubmitBtn').onclick = () => {
    document.getElementById('submitModal').style.display = 'none';
};

document.getElementById('confirmSubmitBtn').onclick = () => {
    submitExam();
};

function submitExam(auto = false) {
    clearInterval(timerInterval);
    document.getElementById('submitModal').style.display = 'none';
    document.getElementById('scoreModal').style.display = 'flex';

    let totalScore = 0;
    let correctCount = 0;
    let wrongCount = 0;

    Object.keys(questionBank).forEach(s => {
        questionBank[s].forEach((q, i) => {
            if (userAnswers[s] && userAnswers[s][i] !== undefined) {
                if (userAnswers[s][i] === q.correct) {
                    totalScore += 4;
                    correctCount++;
                } else {
                    totalScore -= 1;
                    wrongCount++;
                }
            }
        });
    });

    document.getElementById('scoreContent').innerHTML = `
        <div style="text-align:center;">
            <p style="font-size: 2rem; font-weight: bold; color: #28a745;">${totalScore}</p>
            <p>Total Score</p>
            <hr>
            <p>Correct: ${correctCount}</p>
            <p>Incorrect: ${wrongCount}</p>
            <p>Unanswered: ${60 - (correctCount + wrongCount)}</p>
        </div>
    `;
}
