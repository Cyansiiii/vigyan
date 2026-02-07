'use strict';

// ==========================================
// IISER 2024 - FULL QUESTION BANK (60 QUESTIONS)
// ==========================================
const questionBank = {
    Biology: [
        { id: 1, text: "What will be the sequence of RNA synthesized using the following DNA template strand? 5'-GTCTAGGCTTCTC-3'", options: ["5'-GUCUAGGCUUCUC-3'", "5'-GAGAAGCCUAGAC-3'", "5'-CAGAUCCGAAGAG-3'", "5'-CUCUUCGGAUCUG-3'"], correct: 1 },
        { id: 2, text: "The pedigree diagram shows the inheritance of a rare genetic disorder. Which is the most likely pattern of inheritance?", options: ["X-linked dominant", "X-linked recessive", "Autosomal recessive", "Autosomal dominant"], correct: 2 },
        { id: 3, text: "Which protein plays a direct role in muscle contraction?", options: ["Troponin", "Insulin", "Myoglobin", "Trypsin"], correct: 0 },
        { id: 4, text: "Which is NOT derived from epidermal cell layer in plants?", options: ["Casparian strip from rice root", "Trichomes from maize leaf", "Subsidiary cells from rice leaf", "Bulliform cells from grass"], correct: 0 },
        { id: 5, text: "Which statement about meiosis is INCORRECT?", options: ["End products of meiosis II are haploid gametes", "Four products are genetically different", "Recombination in both males and females", "Only one product survives in females"], correct: 3 },
        { id: 6, text: "Test routinely performed to detect typhoid?", options: ["Widal test", "ELISA", "Gel electrophoresis", "RT-PCR"], correct: 0 },
        { id: 7, text: "After 30 PCR cycles, 1 billion copies. Copies at 20th cycle?", options: ["1 million", "0.66 billion", "10 million", "0.1 billion"], correct: 0 },
        { id: 8, text: "Population N=400, K=500, r=0.01. What is dN/dt?", options: ["0.8", "0.05", "1", "0.4"], correct: 0 },
        { id: 9, text: "Correct statement about Hemichordata?", options: ["Not chordate, has stomochord", "Chordate with stomochord", "Chordate with notochord", "Not chordate, water vascular"], correct: 0 },
        { id: 10, text: "Match enzymes with compartments.", options: ["P-(ii); Q-(iii); R-(i); S-(iv)", "P-(iv); Q-(i); R-(iii); S-(ii)", "P-(iii); Q-(ii); R-(i); S-(v)", "P-(iii); Q-(i); R-(iv); S-(ii)"], correct: 3 },
        { id: 11, text: "Two species crossed. Which tissue has same chromosome?", options: ["Embryo", "Endosperm", "Embryo and seed coat", "Embryo and endosperm"], correct: 2 },
        { id: 12, text: "Which plasmid for cloning with BamHI, EcoRI?", options: ["Vector A", "Vector B", "Vector C", "Vector D"], correct: 1 },
        { id: 13, text: "Match conditions with processes.", options: ["P-(ii); Q-(iv); R-(iii); S-(i)", "P-(iii); Q-(iv); R-(i); S-(ii)", "P-(iv); Q-(iii); R-(i); S-(ii)", "P-(ii); Q-(i); R-(iv); S-(iii)"], correct: 2 },
        { id: 14, text: "Which graph represents light vs photosynthesis?", options: ["Graph A", "Graph B", "Graph C", "Graph D"], correct: 2 },
        { id: 15, text: "Oxygen dissociation curves statement?", options: ["Curve A at low H+", "Curve C at low pCO2", "Curve A at low pH", "Curve C at high pO2"], correct: 1 }
    ],
    Chemistry: [
        { id: 1, text: "Element Z=120, which group?", options: ["Alkaline earth", "Alkali", "Halogens", "Noble gases"], correct: 0 },
        { id: 2, text: "N2, CO, NO+ statement?", options: ["Isoelectronic, identical bond order", "Isoelectronic, different bond order", "Not isoelectronic, identical", "Neither"], correct: 0 },
        { id: 3, text: "Complex with 2 Bohr Magneton?", options: ["Only K4[Mn(CN)6]", "K2[MnCl4] and K4[Mn(CN)6]", "[Fe(H2O)6](NO3)2 and K2[MnCl4]", "K4[Mn(CN)6] and [Ni(CO)4]"], correct: 0 },
        { id: 4, text: "VSEPR shapes of XeF4 and SF4?", options: ["Square planar and see-saw", "Both see-saw", "See-saw and square planar", "Both square planar"], correct: 0 },
        { id: 5, text: "Which shows violet colour?", options: ["[CoCl(NH3)5]2+", "[Co(H2O)(NH3)5]3+", "[Co(NH3)6]3+", "[Co(CN)6]3-"], correct: 2 },
        { id: 6, text: "Relationship between structures?", options: ["Conformational", "Structural", "Enantiomers", "Positional"], correct: 2 },
        { id: 7, text: "Order of acidity?", options: ["P > N > Q > M", "P > Q > N > M", "N > P > M > Q", "N > P > Q > M"], correct: 3 },
        { id: 8, text: "Products N and Q?", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
        { id: 9, text: "X and Z in reaction?", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
        { id: 10, text: "Structural descriptions M and N?", options: ["M α-D-gluco, N β-D-fructo", "M β-D-gluco, N β-D-fructo", "M α-D-gluco, N α-D-fructo", "M α-D-glucofuranose, N β-D"], correct: 0 },
        { id: 11, text: "Exothermic 2A→B+C+D statement?", options: ["Spontaneous at all T", "Spontaneous high T", "Spontaneous low T", "Non-spontaneous"], correct: 2 },
        { id: 12, text: "Work function 500nm, 100W at 300nm. KE?", options: ["40 J", "2.6×10⁻¹⁹ J", "1.6×10⁻¹⁹ J", "80 J"], correct: 1 },
        { id: 13, text: "Rate constant 3×10⁻³. Which plot?", options: ["Plot A", "Plot B", "Plot C", "Plot D"], correct: 1 },
        { id: 14, text: "Osmotic pressure vs volume plot?", options: ["Plot A", "Plot B", "Plot C", "Plot D"], correct: 2 },
        { id: 15, text: "KCl limiting molar conductivity?", options: ["150.1", "149.2", "151.1", "152.1"], correct: 0 }
    ],
    Mathematics: [
        { id: 1, text: "Lines L1, L2, L3. Total elements in A?", options: ["3", "0", "1", "2"], correct: 3 },
        { id: 2, text: "If (5,y)∈B, what is y²?", options: ["9", "1", "4", "16"], correct: 3 },
        { id: 3, text: "Point on L2 closest to L1?", options: ["(3,4,3)", "(3,4,4)", "(5,4,5)", "(4,4,4)"], correct: 0 },
        { id: 4, text: "2sn=n(c+an), which statement?", options: ["AP", "a1,2a2,3a3 is AP", "GP", "a1,2a2,3a3 is GP"], correct: 1 },
        { id: 5, text: "g(t)=sin(f(t)). Which correct?", options: ["g decreasing", "g increasing", "g inc then dec", "g dec then inc"], correct: 1 },
        { id: 6, text: "Which case implies f continuous?", options: ["g=(f)³", "g=|f|", "g=(f)²", "g=sin(f)"], correct: 0 },
        { id: 7, text: "Largest rectangle area under y=1-x²?", options: ["4/(3√3)", "2/(3√3)", "4/3", "1/3"], correct: 0 },
        { id: 8, text: "Relation R on matrices?", options: ["Reflex, symmetric", "Reflex only", "Equivalence", "Symmetric, transitive"], correct: 2 },
        { id: 9, text: "²³C₀+²³C₂+...+²³C₂₂?", options: ["2²²", "2²²-1", "2²³+1", "2²³"], correct: 0 },
        { id: 10, text: "f(x+y)=f(x)+f(y), f(1)=10?", options: ["Bijective", "Injective", "Surjective", "Neither"], correct: 1 },
        { id: 11, text: "Integral value I?", options: ["eπ/²-e⁻π/²", "0", "πeπ/²/2", "eπ-1"], correct: 1 },
        { id: 12, text: "Subset S of complex?", options: ["Parabola", "Circle", "Ellipse", "Hyperbola"], correct: 0 },
        { id: 13, text: "Ship engines prob?", options: ["3/4", "1/2", "1/32", "1/4"], correct: 1 },
        { id: 14, text: "Differential equation y value?", options: ["π/6", "π/3", "π/2", "π/4"], correct: 0 },
        { id: 15, text: "Length of PQ?", options: ["2.2", "2", "√2", "3-√2"], correct: 1 }
    ],
    Physics: [
        { id: 1, text: "Abhijit and Vani on circular track?", options: ["Abhijit double", "Abhijit half", "Same distance", "Abhijit 4/3"], correct: 0 },
        { id: 2, text: "Pendulum angular momentum vs T?", options: ["A ∝ T³", "A ∝ T²", "A ∝ T", "A ∝ T⁴"], correct: 1 },
        { id: 3, text: "Angular acceleration of disc?", options: ["g/4R", "g/2R", "g/R", "g/3R"], correct: 1 },
        { id: 4, text: "Bob velocity V0?", options: ["√(5gL/2)", "√(5gL)", "√(2gL)", "√(3gL/2)"], correct: 0 },
        { id: 5, text: "Sphere oscillation period?", options: ["2π√(2R/3g)", "2π√(R/g)", "2π√(3R/2g)", "2π√(2R/g)"], correct: 0 },
        { id: 6, text: "Gas adiabatic expansion pressure?", options: ["RT/2V", "RT/4V", "RT/V", "2RT/V"], correct: 2 },
        { id: 7, text: "x=sin²(ωt)cos³(ωt) period?", options: ["2π/ω", "2π/3ω", "2π/5ω", "2π/15ω"], correct: 2 },
        { id: 8, text: "Mixed gas λ and T?", options: ["Formula A", "Formula B", "Formula C", "Formula D"], correct: 1 },
        { id: 9, text: "Charge acceleration?", options: ["(i-3√3j)", "(i-√3j)", "(3i-√3j)", "(3√3i-j)"], correct: 2 },
        { id: 10, text: "Circuit ω value?", options: ["1/√(2LC)", "1/√(LC)", "1/2√(LC)", "1/√(3LC)"], correct: 0 },
        { id: 11, text: "Wire magnetic moment?", options: ["Iab(j+k)", "Iab(j-k)", "√2Iab(j+k)", "Iab(k-j)"], correct: 0 },
        { id: 12, text: "Capacitor Q2/(Q1+Q2)?", options: ["4/5", "1/5", "1/4", "1/2"], correct: 0 },
        { id: 13, text: "Binding energy difference?", options: ["0.01307", "2.00425", "0.99559", "3.01291"], correct: 1 },
        { id: 14, text: "Slab thickness for zero shift?", options: ["1/√3", "1/√2", "1/2", "√3/2"], correct: 3 },
        { id: 15, text: "Work function value?", options: ["1 eV", "2 eV", "1.5 eV", "1.25 eV"], correct: 1 }
    ]
};

// ==========================================
// EXAM ENGINE (EXACTLY SAME AS 2025)
// ==========================================

let currentSection = 'Biology';
let currentQIndex = 0;
let answers = {};
let marked = {};
let visited = {};
let timeLeft = 10800;
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    const agreeCheck = document.getElementById('agreeTerms');
    const beginBtn = document.getElementById('beginTestBtn');
    if (agreeCheck && beginBtn) {
        agreeCheck.onchange = () => beginBtn.disabled = !agreeCheck.checked;
        beginBtn.onclick = startExam;
    }

    document.querySelectorAll('.section-tab').forEach(btn => {
        btn.onclick = () => switchSection(btn.dataset.section);
    });

    document.getElementById('saveNextBtn').onclick = saveAndNext;
    document.getElementById('markReviewBtn').onclick = markReview;
    document.getElementById('clearBtn').onclick = clearResponse;
    document.getElementById('submitExamBtn').onclick = showSubmitSummary;
    
    document.getElementById('cancelSubmitBtn').onclick = () => document.getElementById('submitModal').style.display = 'none';
    document.getElementById('confirmSubmitBtn').onclick = submitFinal;
});

function startExam() {
    document.getElementById('instructionPage').style.display = 'none';
    document.getElementById('examInterface').style.display = 'block';
    
    const nameInput = document.getElementById('candidateName');
    if (nameInput && document.getElementById('userNameDisplay')) {
        document.getElementById('userNameDisplay').innerText = nameInput.value || 'Candidate';
    }

    timerInterval = setInterval(() => {
        timeLeft--;
        const h = Math.floor(timeLeft / 3600).toString().padStart(2,'0');
        const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2,'0');
        const s = (timeLeft % 60).toString().padStart(2,'0');
        const timerEl = document.getElementById('timerDisplay');
        if (timerEl) timerEl.innerText = `${h}:${m}:${s}`;
        
        if (timeLeft <= 0) submitFinal();
    }, 1000);

    loadQuestion();
    updateCounts();
}

function switchSection(sec) {
    currentSection = sec;
    currentQIndex = 0;
    
    document.querySelectorAll('.section-tab').forEach(b => {
        if (b.dataset.section === sec) b.classList.add('active');
        else b.classList.remove('active');
    });
    
    const titleEl = document.getElementById('sectionTitle');
    if (titleEl) titleEl.innerText = sec;
    
    loadQuestion();
}

function loadQuestion() {
    const qData = questionBank[currentSection][currentQIndex];
    const key = `${currentSection}-${currentQIndex}`;
    visited[key] = true;

    document.getElementById('questionNumberDisplay').innerText = currentQIndex + 1;
    document.getElementById('questionContent').innerHTML = qData.text;

    let html = '';
    qData.options.forEach((opt, idx) => {
        const isChecked = answers[key] === idx ? 'checked' : '';
        const isSelected = answers[key] === idx ? 'selected' : '';
        html += `
            <div class="option-item ${isSelected}" onclick="selectAnswer(${idx})">
                <input type="radio" name="opt" ${isChecked}>
                <span>${opt}</span>
            </div>
        `;
    });
    document.getElementById('optionsContainer').innerHTML = html;

    updatePalette();
    updateCounts();
}

function selectAnswer(idx) {
    const key = `${currentSection}-${currentQIndex}`;
    answers[key] = idx;
    
    const opts = document.querySelectorAll('.option-item');
    opts.forEach((el, i) => {
        if (i === idx) { el.classList.add('selected'); el.querySelector('input').checked = true; }
        else { el.classList.remove('selected'); el.querySelector('input').checked = false; }
    });
    updateCounts();
}

function saveAndNext() {
    if (currentQIndex < questionBank[currentSection].length - 1) {
        currentQIndex++;
        loadQuestion();
    }
}

function markReview() {
    const key = `${currentSection}-${currentQIndex}`;
    marked[key] = true;
    saveAndNext();
}

function clearResponse() {
    const key = `${currentSection}-${currentQIndex}`;
    delete answers[key];
    delete marked[key];
    loadQuestion();
}

function updatePalette() {
    const grid = document.getElementById('questionPalette');
    if (!grid) return;
    grid.innerHTML = '';
    
    questionBank[currentSection].forEach((_, idx) => {
        const key = `${currentSection}-${idx}`;
        const btn = document.createElement('div');
        btn.innerText = idx + 1;
        btn.className = 'palette-btn';
        
        if (answers[key] !== undefined && marked[key]) btn.classList.add('answered-marked');
        else if (marked[key]) btn.classList.add('marked');
        else if (answers[key] !== undefined) btn.classList.add('answered');
        else if (visited[key]) btn.classList.add('not-answered');
        else btn.classList.add('not-visited');

        if (idx === currentQIndex) btn.style.border = "2px solid #000";

        btn.onclick = () => { currentQIndex = idx; loadQuestion(); };
        grid.appendChild(btn);
    });
}

function updateCounts() {
    const counts = { answered: 0, notAnswered: 0, notVisited: 0, marked: 0, ansMarked: 0 };
    
    Object.keys(questionBank).forEach(sec => {
        questionBank[sec].forEach((_, idx) => {
            const key = `${sec}-${idx}`;
            if (!visited[key]) counts.notVisited++;
            else if (answers[key] !== undefined && marked[key]) counts.ansMarked++;
            else if (marked[key]) counts.marked++;
            else if (answers[key] !== undefined) counts.answered++;
            else counts.notAnswered++;
        });

        const secCount = questionBank[sec].filter((_, i) => answers[`${sec}-${i}`] !== undefined).length;
        const badge = document.getElementById(`${sec.toLowerCase()}Count`);
        if (badge) badge.innerText = secCount > 0 ? secCount : '';
    });

    const legItems = document.querySelectorAll('.leg-circle');
    if (legItems.length >= 5) {
        legItems[0].innerText = counts.answered;
        legItems[1].innerText = counts.notAnswered;
        legItems[2].innerText = counts.notVisited;
        legItems[3].innerText = counts.marked;
        legItems[4].innerText = counts.ansMarked;
    }
}

function showSubmitSummary() {
    let html = `
    <table class="summary-table">
        <thead>
            <tr>
                <th>Section</th>
                <th>Total Qs</th>
                <th>Attempted</th>
                <th>Not Attempted</th>
            </tr>
        </thead>
        <tbody>`;
    
    Object.keys(questionBank).forEach(sec => {
        const total = questionBank[sec].length;
        let attempted = 0;
        questionBank[sec].forEach((_, i) => { if (answers[`${sec}-${i}`] !== undefined) attempted++; });
        
        html += `
            <tr>
                <td style="text-align:left; font-weight:bold;">${sec}</td>
                <td>${total}</td>
                <td>${attempted}</td>
                <td>${total - attempted}</td>
            </tr>`;
    });
    
    html += `</tbody></table>`;
    document.getElementById('submissionSummary').innerHTML = html;
    document.getElementById('submitModal').style.display = 'flex';
}

function submitFinal() {
    document.getElementById('submitModal').style.display = 'none';
    clearInterval(timerInterval);

    let totalScore = 0;
    let totalMax = 0;
    let correct = 0;
    let wrong = 0;
    
    Object.keys(questionBank).forEach(sec => {
        questionBank[sec].forEach((q, i) => {
            totalMax += 4;
            const ans = answers[`${sec}-${i}`];
            if (ans !== undefined) {
                if (ans === q.correct) {
                    totalScore += 4;
                    correct++;
                } else {
                    totalScore -= 1;
                    wrong++;
                }
            }
        });
    });

    const percent = totalMax > 0 ? ((totalScore / totalMax) * 100).toFixed(2) : 0;
    
    const html = `
        <div class="score-grid">
            <div class="score-box">
                <span class="score-val">${totalScore} / ${totalMax}</span>
                <span class="score-lbl">Total Score</span>
            </div>
            <div class="score-box">
                <span class="score-val" style="color:#28a745;">${correct}</span>
                <span class="score-lbl">Correct Answers</span>
            </div>
            <div class="score-box">
                <span class="score-val" style="color:#dc3545;">${wrong}</span>
                <span class="score-lbl">Incorrect Answers</span>
            </div>
            <div class="score-box">
                <span class="score-val">${percent}%</span>
                <span class="score-lbl">Percentage</span>
            </div>
        </div>
        <div style="margin-top:20px; text-align:center; color:#666;">
            Thank you for taking the test. Good luck!
        </div>
    `;

    const scoreContent = document.getElementById('scoreContent');
    if (scoreContent) scoreContent.innerHTML = html;
    
    const scoreModal = document.getElementById('scoreModal');
    if (scoreModal) scoreModal.style.display = 'flex';
}