// IISER Aptitude Test 2019
const questionBank = {
    Biology: [
        {
            id: 1,
            text: "Which of the following produces a dikaryotic phase in Basidiomycetes?",
            options: [
                "Karyogamy",
                "Plasmogamy",
                "Apogamy",
                "Karyokinesis"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 2,
            text: "In the standard nomenclature used for depicting floral formula, which type of flower is represented by K₍₅₎?",
            options: [
                "Polysepalous",
                "Syncarpous",
                "Gamosepalous",
                "Gamopetalous"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 3,
            text: "Which one of the following statements is TRUE?",
            options: [
                "Blood is a connective tissue which does not secrete collagen",
                "Tendons are a type of dense, irregular connective tissue",
                "Adipose tissue is an example of a fluid connective tissue",
                "Saliva is secreted by an endocrine gland"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 4,
            text: `Match the entries in column I and column II.<br><br>
            <table border="1" style="width:100%; border-collapse: collapse; text-align: left;">
              <tr>
                <th style="padding: 8px;">Column I</th>
                <th style="padding: 8px;">Column II</th>
              </tr>
              <tr>
                <td style="padding: 8px;">(a) Haem</td>
                <td style="padding: 8px;">(1) Cofactor</td>
              </tr>
              <tr>
                <td style="padding: 8px;">(b) NAD</td>
                <td style="padding: 8px;">(2) Vitamin</td>
              </tr>
              <tr>
                <td style="padding: 8px;">(c) Zinc</td>
                <td style="padding: 8px;">(3) Coenzyme</td>
              </tr>
              <tr>
                <td style="padding: 8px;">(d) Niacin</td>
                <td style="padding: 8px;">(4) Prosthetic group</td>
              </tr>
            </table>`,
            options: [
                "a-3, b-1, c-4, d-2",
                "a-4, b-3, c-1, d-2",
                "a-2, b-1, c-3, d-4",
                "a-4, b-1, c-3, d-2"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 5,
            text: "Which one of the following helps in bacterial motility?",
            options: [
                "Centrioles",
                "Fimbriae",
                "Microtubules",
                "Flagella"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 6,
            text: "During light reaction in chloroplasts of tobacco plants, where is the proton gradient generated?",
            options: [
                "Between stroma and intermembrane space of chloroplasts",
                "Between thylakoid lumen and intermembrane space of chloroplasts",
                "Between stroma and thylakoid lumen",
                "Between inner and outer chloroplast membranes"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 7,
            text: "Which of the following will NOT be triggered by the release of acetyl choline in the synapse at the neuromuscular junction during muscle contraction?",
            options: [
                "Generation of an action potential in the muscles",
                "Release of Ca²⁺ from the sarcoplasmic reticulum",
                "Binding of ATP molecules to the myosin head",
                "Shifting of tropomyosin to expose the myosin binding sites on actin filaments"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 8,
            text: "The diagram below shows a typical ECG. If the AV node is not functional, which of the following options correctly represents the changes seen in the ECG?<br><br>",
            options: [
                "P wave will sustain longer with smaller amplitude",
                "The QRS complex will be absent",
                "The T wave will sustain longer with smaller amplitude",
                "The distance between the P wave and the QRS complex will be smaller"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 9,
            text: "Listed below are different plant reproductive strategies: I. Parthenocarpy, II. Syngamy, III. Apomixis, IV. Polyembryony. Which of them can give rise to a clonal progeny having the same genotype as that of the mother plant?",
            options: [
                "III and IV",
                "I and II",
                "II and III",
                "I and IV"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 10,
            text: "The diagram below represents the pedigree of a certain genetic disease (affected individuals are shaded). What is the mode of inheritance?<br><br>",
            options: [
                "X-linked recessive",
                "Y-linked",
                "X-linked dominant",
                "Mitochondrial"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 11,
            text: "An E. coli whose DNA is fully labeled by ¹⁵N is grown in a medium containing ¹⁴NH₄Cl. What will be the percentage of hybrid (¹⁵N/¹⁴N) and light (¹⁴N/¹⁴N) DNA molecules at the end of 80 minutes (doubling time = 20 mins)?",
            options: [
                "25% hybrid and 75% light",
                "50% hybrid and 50% light",
                "0% hybrid and 100% light",
                "12.5% hybrid and 87.5% light"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 12,
            text: "Which diagram best represents the expected change in body size distribution if larger individuals have better survival and higher reproductive rates?<br><br>",
            options: [
                "Graph A",
                "Graph B",
                "Graph C",
                "Graph D"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 13,
            text: "What are the types of immunity acquired by: i) transfer of antibodies to the foetus via the placenta, and ii) vaccination of an infant?",
            options: [
                "Both are active immunity",
                "Both are passive immunity",
                "Active and passive immunity, respectively",
                "Passive and active immunity, respectively"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 14,
            text: "Which among the following correctly represents the sequence of events for a normal polymerase chain reaction (PCR)?",
            options: [
                "Denaturation, annealing, extension",
                "Annealing, denaturation, extension",
                "Extension, annealing, denaturation",
                "Denaturation, extension, annealing"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 15,
            text: "Loss of biodiversity occurs due to the growth of carrot grass (Parthenium sp.). This is an example of:",
            options: [
                "Alien-species invasion",
                "Co-extinction",
                "Over-exploitation",
                "Habitat loss and fragmentation"
            ],
            correct: 0,
            marks: 3
        }
    ],

    Chemistry: [
        {
            id: 16,
            text: "What are the correct orders of bond lengths d(X-X) and bond dissociation enthalpies BDE(X-X) for F₂ and Cl₂?",
            options: [
                "d(F-F) < d(Cl-Cl) and BDE(F-F) < BDE(Cl-Cl)",
                "d(F-F) > d(Cl-Cl) and BDE(F-F) > BDE(Cl-Cl)",
                "d(F-F) < d(Cl-Cl) and BDE(F-F) > BDE(Cl-Cl)",
                "d(F-F) > d(Cl-Cl) and BDE(F-F) < BDE(Cl-Cl)"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 17,
            text: "Which is the appropriate combination of spin configuration and colour for the anionic complex [Co(L)₆]³⁻ (L is a monodentate and monoanionic ligand)?",
            options: [
                "high-spin and green",
                "low-spin and green",
                "low-spin and blue",
                "high-spin and yellow"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 18,
            text: "Which of the following combination of elements forms interstitial hydrides?",
            options: [
                "Na and Mg",
                "Yb and Ti",
                "Fe and Mn",
                "B and Al"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 19,
            text: "How many geometrical isomers are possible for the square planar complex [Pd(py)(Cl)(Br)(NH₃)]?",
            options: [
                "2",
                "4",
                "5",
                "3"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 20,
            text: "A molecular adduct is formed between BF₃ and Et₂O. Which values describe the coordination number (CN), valency (V) and oxidation state (OS) of B atom in this adduct?",
            options: [
                "CN=4, V=4 and OS=+3",
                "CN=4, V=3 and OS=+4",
                "CN=4, V=3 and OS=+3",
                "CN=3, V=3 and OS=+4"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 21,
            text: "While making paneer (cottage cheese) from milk by adding dilute acetic acid, the milk proteins undergo:",
            options: [
                "solubilization",
                "degradation",
                "denaturation",
                "polymerization"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 22,
            text: "What is the final major product of the reaction: Ph-CH(Br)-CH₂-Br + (i) KOH, EtOH (ii) NaNH₂?<br><br>",
            options: [
                "Ph-CH=CH-NH₂",
                "Ph-C≡CH",
                "Ph-C(OEt)=CH₂",
                "Ph-CH=CH₂"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 23,
            text: "Identify the final major product in the reaction sequence: Benzamide + (i) Br₂/NaOH + (ii) Br₂(excess)/H₂O.<br><br>",
            options: [
                "2,4,6-Tribromoaniline",
                "m-Bromobenzamide",
                "p-Bromoaniline",
                "2,6-Dibromoaniline"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 24,
            text: "Identify the compound [X] in the reaction: Ph-N₂⁺Cl⁻ + Ethanol -> [X] + N₂ + HCl.",
            options: [
                "CH₃COOH",
                "OHC-CHO",
                "CH₃CH₂OCH₂CH₂Cl",
                "CH₃CHO"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 25,
            text: "Which one among the following compounds is aromatic?<br><br>",
            options: [
                "Compound A",
                "Compound B",
                "Compound C",
                "Compound D"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 26,
            text: "Using the Arrhenius equation, find out the value of k at T → ∞?",
            options: [
                "A",
                "-A",
                "eᴬ",
                "e⁻ᴬ"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 27,
            text: "Which one of the following is NOT an example of heterogeneous equilibrium?",
            options: [
                "Equilibrium between water vapour and liquid water in a closed container",
                "Equilibrium attained during acid catalysed hydrolysis of ethyl acetate",
                "Equilibrium between solid Ca(OH)₂ and its saturated solution",
                "Equilibrium attained on heating solid CaCO₃ in a closed container"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 28,
            text: "At 60°C, 50% of N₂O₄(g) is dissociated to NO₂(g). What is the standard Gibbs free energy change at 60°C and 1 atm pressure? (R=8.314 J/K/mol)",
            options: [
                "763 Jmol⁻¹",
                "-790 Jmol⁻¹",
                "-863 Jmol⁻¹",
                "500 Jmol⁻¹"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 29,
            text: "For the cell Ag|Ag⁺ Cl⁻|AgCl(s)|Ag, E°(Ag+|Ag)=0.79V, E°(Cl-|AgCl|Ag)=0.22V. What is the value of ln K for AgCl(s) ⇌ Ag⁺ + Cl⁻?",
            options: [
                "-22.2",
                "-18.5",
                "-29.3",
                "-26.8"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 30,
            text: `Match the following:<br><br>
            <table border="1" style="width:100%; border-collapse: collapse; text-align: left;">
              <tr><td style="padding: 5px;">i) Ge doped with In</td><td style="padding: 5px;">1. n-type semiconductor</td></tr>
              <tr><td style="padding: 5px;">ii) Si doped with N</td><td style="padding: 5px;">2. Schottky defect</td></tr>
              <tr><td style="padding: 5px;">iii) ZnS</td><td style="padding: 5px;">3. p-type semiconductor</td></tr>
              <tr><td style="padding: 5px;">iv) CsCl</td><td style="padding: 5px;">4. Frenkel defect</td></tr>
            </table>`,
            options: [
                "i-1, ii-3, iii-2, iv-4",
                "i-1, ii-3, iii-4, iv-2",
                "i-3, ii-1, iii-2, iv-4",
                "i-3, ii-1, iii-4, iv-2"
            ],
            correct: 3,
            marks: 3
        }
    ],

    Mathematics: [
        {
            id: 31,
            text: "Let 1, ζ₂, ..., ζₙ be the roots of xⁿ=1 (n≥3). The sum 1/(2-ζ₂) + ... + 1/(2-ζₙ) equals:",
            options: [
                "(1 + (n-2)2ⁿ) / (2ⁿ - 1)",
                "(1 + n2ⁿ⁻¹ - 2ⁿ) / (2ⁿ - 1)",
                "(1 + n2ⁿ⁻¹ - 2ⁿ) / (2ⁿ⁻¹ + 1)",
                "(1 + (n-1)2ⁿ - 2ⁿ⁻¹) / (2ⁿ⁻¹ + 1)"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 32,
            text: "How many solutions does sin²x - 15 sin x cos x + 50 cos²x = 0 have in [0, 2π]?",
            options: [
                "4",
                "0",
                "1",
                "2"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 33,
            text: "Let A be 4x4 matrix. K = Kernel(A), J = Image(A). If K=J, which statement is necessarily true?",
            options: [
                "A² = 0",
                "A is symmetric",
                "A is skew symmetric",
                "A² = A"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 34,
            text: "Consider 5 straight lines in a plane, no two parallel, no three intersecting at a point. Number of disjoint regions?",
            options: [
                "17",
                "18",
                "16",
                "20"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 35,
            text: "Consider the circle C passing through (1,0) and (0,1) having the smallest area. Equation of tangent at (0,1)?",
            options: [
                "y = -x + 1",
                "y = x - 1",
                "y = x",
                "y = x + 1"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 36,
            text: "f:[-1,1]→R. Region S = {(x,y): -1≤x≤1, 0≤y≤f(x)}. For which function is area of S largest?",
            options: [
                "f(x) = πˣ|sin πx|",
                "f(x) = πˣ|cos πx|",
                "f(x) = πˣ(1 + |tan πx/10|)",
                "f(x) = πˣ/(|x| + 1)"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 37,
            text: "f:R→R is continuous. f is surjective if:",
            options: [
                "lim(x→∞)f = ∞ and lim(x→-∞)f = ∞",
                "lim(x→∞)f = 0 and lim(x→-∞)f = ∞",
                "lim(x→∞)f = 0 and lim(x→-∞)f = -∞",
                "lim(x→∞)f = -∞ and lim(x→-∞)f = ∞"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 38,
            text: "The limit n→∞ [ (1/n²⁰²⁰) * Σ(k=1 to n) k²⁰¹⁹ ] is:",
            options: [
                "1/2018",
                "1/2020",
                "1/2019",
                "Does not exist"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 39,
            text: "The sum of n consecutive terms of an AP consisting of integers is 161. Possible value of n?",
            options: [
                "5",
                "7",
                "6",
                "8"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 40,
            text: "f:R→R is non-zero even function, ∫(-1 to 1) f(x)dx = α. Value of ∫(-1 to 1) f(x)/(1+eˣ) dx?",
            options: [
                "α",
                "αe⁻ᵃ",
                "α/2",
                "e⁻ᵃ/2"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 41,
            text: `What is the mean deviation about the mean for the following data?<br><br>
            <table border="1" style="width:100%; border-collapse: collapse; text-align: center;">
              <tr><th>xi</th><td>1</td><td>2</td><td>3</td><td>4</td></tr>
              <tr><th>fi</th><td>5</td><td>10</td><td>15</td><td>20</td></tr>
            </table>`,
            options: [
                "4/5",
                "3/5",
                "2/5",
                "1"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 42,
            text: "Total number of subsets of S containing at most two elements is 16. Number of elements in S?",
            options: [
                "5",
                "6",
                "16",
                "7"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 43,
            text: "Parallelogram ABCD. AE/AB = CF/CD = 1/n. AC=a. Length of XY?<br><br>",
            options: [
                "a/n",
                "na/(n+1)",
                "(n-1)a/(n+1)",
                "(n-1)a/n"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 44,
            text: "X = {ai+bj+ck : a,b,c in {-1,0,1}}. Y = Triples of mutually perpendicular unit vectors from X. |Y|?",
            options: [
                "27",
                "24",
                "36",
                "48"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 45,
            text: "Probability that 3 randomly chosen elements x,y,z from {1..10} satisfy x+y+z=5?",
            options: [
                "3/1000",
                "1/200",
                "1/1000",
                "3/500"
            ],
            correct: 0,
            marks: 3
        }
    ],

    Physics: [
        {
            id: 46,
            text: "Particle mass m rotating in circular orbit radius r under gravity of mass M (M>>m). Total Energy E. Angular momentum?",
            options: [
                "r√(2Em)",
                "r√(-2Em)",
                "r√(-Em/2)",
                "r√(Em/2)"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 47,
            text: "Point charge Q at corner of cube. Flux through shaded face (one of the faces not touching charge)?<br><br>",
            options: [
                "Q/(18ε₀)",
                "Q/(12ε₀)",
                "Q/(24ε₀)",
                "Q/(6ε₀)"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 48,
            text: "Neutral gas molecules mass m, temp T. Average de Broglie wavelength λ depends on T as?",
            options: [
                "λ ∝ √T",
                "λ ∝ 1/T^(3/2)",
                "λ ∝ 1/√T",
                "λ ∝ T^(3/2)"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 49,
            text: "Particle unit mass thrown with velocity v₀ at angle φ. Angular momentum about projection point at time t?",
            options: [
                "2gt²v₀ cosφ",
                "1/2 gt²v₀ cosφ",
                "2gt²v₀ sinφ",
                "1/2 gt²v₀ sinφ"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 50,
            text: "Two long thin conductors A and B carrying current I. A is fixed. What happens to B?<br><br>",
            options: [
                "Net force along +x",
                "Net anticlockwise torque",
                "Net force along -x",
                "Net clockwise torque"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 51,
            text: "Average KE of ideal gas molecules leaking freely through orifice (N, P, V inside container)?",
            options: [
                "3PV/(2N)",
                "PV/(2N)",
                "3PV/N",
                "2PV/(3N)"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 52,
            text: "Expression for energy in terms of Planck's h, light velocity c, Gravitational constant G?",
            options: [
                "√(hG/c³)",
                "√(hc⁵/G)",
                "hc⁵/G",
                "√(G/hc⁵)"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 53,
            text: "Solid block connected to springs k and 4k. Time spent on left (t_L) vs right (t_R)?<br><br>",
            options: [
                "t_L = 2t_R",
                "t_L = t_R/2",
                "t_L = t_R",
                "t_L = 4t_R"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 54,
            text: "Capacitor C₀ (concentric spheres). If radii of inner and outer spheres are halved, new capacitance?",
            options: [
                "C₀/2",
                "4C₀",
                "C₀",
                "C₀/√2"
            ],
            correct: 0,
            marks: 3
        },
        {
            id: 55,
            text: "Time t taken by capacitor in given circuit to charge to 1/√(2π) of full capacity?<br><br>",
            options: [
                "t → ∞",
                "t = 1/RC",
                "t = 2πRC",
                "t = RC"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 56,
            text: "H atom energy E_n = -13.6/n² eV. Maximum frequency of emitted photon?",
            options: [
                "2.1 x 10⁶ GHz",
                "5.5 x 10⁶ GHz",
                "3.3 x 10⁶ GHz",
                "1.7 x 10⁶ GHz"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 57,
            text: "Which statement about P-V diagram of ideal gas is INCORRECT?",
            options: [
                "Two distinct adiabats never cross",
                "Two distinct isotherms never cross",
                "Isotherm and adiabat intersect at one point",
                "Isotherm and adiabat intersect at more than one point"
            ],
            correct: 3,
            marks: 3
        },
        {
            id: 58,
            text: "Solid Cube, Cylinder (h=d), Sphere of identical mass/metal at 50°C put in water at 10°C. Which cools fastest?",
            options: [
                "The cylinder",
                "The sphere",
                "The cube",
                "All three at same rate"
            ],
            correct: 1,
            marks: 3
        },
        {
            id: 59,
            text: "LED display 100 pixels/cm². Eye pupil 5mm, wavelength 575nm. Nearest distance so display doesn't appear pixelated?",
            options: [
                "30.23 m",
                "7.12 m",
                "4.52 m",
                "20.32 m"
            ],
            correct: 2,
            marks: 3
        },
        {
            id: 60,
            text: "Two charges q at B, C of isosceles triangle. Charge q' at A. Net field vanishes at height h/3. Value of q'?<br><br>",
            options: [
                "q' = -3√3 q",
                "q' = +3√3 q",
                "q' = +√3 q",
                "q' = -√3 q"
            ],
            correct: 0,
            marks: 3
        }
    ]
};
// State
let currentSection = 'Biology';
let currentQuestionIndex = 0;
let answers = {};
let markedForReview = {};
let visited = {};
let timeLeft = 10800; // 3 hours
let timerInterval = null;
let userName = 'Student';
let violations = 0; // Added violations counter

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Begin Test Button
    const beginBtn = document.getElementById('beginTestBtn');
    if (beginBtn) {
        beginBtn.addEventListener('click', startExam);
    }

    // Section Tabs
    document.querySelectorAll('.section-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });

    // Action Buttons
    const markBtn = document.getElementById('markReviewBtn');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveNextBtn');
    const submitBtn = document.getElementById('submitExamBtn');

    if (markBtn) markBtn.addEventListener('click', toggleMarkForReview);
    if (clearBtn) clearBtn.addEventListener('click', clearResponse);
    if (saveBtn) saveBtn.addEventListener('click', saveAndNext);
    if (submitBtn) submitBtn.addEventListener('click', submitExam);

    // Checkbox validation
    const agreeTerms = document.getElementById('agreeTerms');
    const beginTestBtn = document.getElementById('beginTestBtn');
    
    if (agreeTerms && beginTestBtn) {
        beginTestBtn.disabled = !agreeTerms.checked;
        agreeTerms.addEventListener('change', function() {
            beginTestBtn.disabled = !this.checked;
        });
    }

    // Get candidate name
    const nameInput = document.getElementById('candidateName');
    if (nameInput) {
        nameInput.addEventListener('change', function() {
            userName = this.value || 'Student';
        });
    }
}

// Start Exam
function startExam() {
    const instructionPage = document.getElementById('instructionPage');
    const examInterface = document.getElementById('examInterface');
    
    if (instructionPage) instructionPage.style.display = 'none';
    if (examInterface) examInterface.style.display = 'block';

    // Set user name
    const userNameEl = document.getElementById('userName');
    if (userNameEl) userNameEl.textContent = userName;

    // Load first question
    loadQuestion();
    updatePalette();
    startTimer();
    updateSectionCounts();
}

// Timer
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            autoSubmitExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    const display = `Time Left : ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const timerEl = document.getElementById('timerDisplay');
    if (timerEl) timerEl.textContent = display;
}

// Load Question
function loadQuestion() {
    const questions = questionBank[currentSection];
    const question = questions[currentQuestionIndex];
    const questionKey = `${currentSection}-${currentQuestionIndex}`;

    visited[questionKey] = true;

    // Update question number
    const qNumEl = document.getElementById('questionNumberDisplay');
    if (qNumEl) qNumEl.textContent = `Question No. ${currentQuestionIndex + 1}`;

    // Update question text
    const qTextEl = document.getElementById('questionContent');
    if (qTextEl) {
        qTextEl.innerHTML = `<p class="question-text">${question.text}</p>`;
    }

    // Load options
    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option-item';
            if (answers[questionKey] === index) {
                optionDiv.classList.add('selected');
            }
            
            optionDiv.innerHTML = `
                <input type="radio" name="question" value="${index}" ${answers[questionKey] === index ? 'checked' : ''}>
                <span class="option-text"><strong>(${String.fromCharCode(97 + index)})</strong> ${option}</span>
            `;
            
            optionDiv.addEventListener('click', function() {
                selectAnswer(index);
            });
            
            optionsContainer.appendChild(optionDiv);
        });
    }

    // Update section title
    const sectionTitleEl = document.getElementById('sectionTitle');
    if (sectionTitleEl) sectionTitleEl.textContent = currentSection;

    updatePalette();
}

// Select Answer
function selectAnswer(optionIndex) {
    const questionKey = `${currentSection}-${currentQuestionIndex}`;
    answers[questionKey] = optionIndex;
    
    // Update UI
    document.querySelectorAll('.option-item').forEach((item, index) => {
        if (index === optionIndex) {
            item.classList.add('selected');
            item.querySelector('input').checked = true;
        } else {
            item.classList.remove('selected');
            item.querySelector('input').checked = false;
        }
    });
    
    updatePalette();
    updateSectionCounts();
}

// Switch Section
function switchSection(section) {
    currentSection = section;
    currentQuestionIndex = 0;
    
    // Update active tab
    document.querySelectorAll('.section-tab').forEach(tab => {
        if (tab.getAttribute('data-section') === section) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    loadQuestion();
}

// Toggle Mark for Review
function toggleMarkForReview() {
    const questionKey = `${currentSection}-${currentQuestionIndex}`;
    markedForReview[questionKey] = !markedForReview[questionKey];
    updatePalette();
    saveAndNext();
}

// Clear Response
function clearResponse() {
    const questionKey = `${currentSection}-${currentQuestionIndex}`;
    delete answers[questionKey];
    loadQuestion();
    updateSectionCounts();
}

// Save and Next
function saveAndNext() {
    const questions = questionBank[currentSection];
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Update Palette
function updatePalette() {
    const paletteEl = document.getElementById('questionPalette');
    if (!paletteEl) return;
    
    paletteEl.innerHTML = '';
    const questions = questionBank[currentSection];
    
    questions.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'palette-btn';
        btn.textContent = index + 1;
        
        const questionKey = `${currentSection}-${index}`;
        
        // Determine status
        if (index === currentQuestionIndex) {
            btn.classList.add('current');
        }
        
        if (markedForReview[questionKey]) {
            btn.classList.add('marked');
        } else if (answers[questionKey] !== undefined) {
            btn.classList.add('answered');
        } else if (visited[questionKey]) {
            btn.classList.add('not-answered');
        } else {
            btn.classList.add('not-visited');
        }
        
        btn.addEventListener('click', () => {
            currentQuestionIndex = index;
            loadQuestion();
        });
        
        paletteEl.appendChild(btn);
    });
}

// Update Section Counts
function updateSectionCounts() {
    const sections = ['Biology', 'Chemistry', 'Mathematics', 'Physics'];
    
    sections.forEach(section => {
        let answered = 0;
        const questions = questionBank[section];
        
        questions.forEach((_, index) => {
            const key = `${section}-${index}`;
            if (answers[key] !== undefined) answered++;
        });
        
        const countEl = document.getElementById(`${section.toLowerCase()}Count`);
        if (countEl) {
            countEl.textContent = answered;
        }
    });
}

// Submit Exam
function submitExam() {
    if (confirm('Are you sure you want to submit the exam?')) {
        autoSubmitExam();
    }
}

// Auto Submit and Manual Submit
function autoSubmitExam() {
    // Stop timers
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Compute results
    const results = calculateScore();

    // Show results
    showResults(results);

    // Console log for debugging
    console.log('Exam submitted:', {
        answers,
        markedForReview,
        violations,
        timeLeft,
        score: results.totalScore,
        maxScore: results.maxScore,
        timestamp: new Date().toISOString()
    });
}

// Score calculation
function calculateScore() {
    let totalScore = 0;
    let maxScore = 0;
    let totalAttempted = 0;
    let totalCorrect = 0;
    let totalQuestions = 0;
    let sectionBreakdown = {};

    Object.keys(questionBank).forEach(section => {
        const qArr = questionBank[section];
        const marksPerQuestion = 4; // As per standard JEE pattern
        
        sectionBreakdown[section] = {
            obtained: 0,
            max: qArr.length * marksPerQuestion,
            attempted: 0,
            correctCount: 0,
            totalQuestions: qArr.length
        };

        qArr.forEach((q, idx) => {
            totalQuestions++;
            maxScore += marksPerQuestion;
            const key = `${section}-${idx}`;
            const ans = answers[key];
            
            if (ans !== undefined && ans !== null) {
                totalAttempted++;
                sectionBreakdown[section].attempted++;
                
                if (ans === q.correct) {
                    totalCorrect++;
                    totalScore += marksPerQuestion;
                    sectionBreakdown[section].obtained += marksPerQuestion;
                    sectionBreakdown[section].correctCount++;
                } else {
                    // Negative marking: -1 for wrong answer
                    totalScore -= 1;
                    sectionBreakdown[section].obtained -= 1;
                }
            }
        });
    });

    return {
        totalScore,
        maxScore,
        totalAttempted,
        totalCorrect,
        totalQuestions,
        sectionBreakdown
    };
}

// Show results
function showResults(results) {
    // Create a results display
    const examInterface = document.getElementById('examInterface');
    if (!examInterface) {
        alert(`Exam Submitted!\n\nTotal Score: ${results.totalScore}/${results.maxScore}\nAttempted: ${results.totalAttempted}/${results.totalQuestions}\nCorrect: ${results.totalCorrect}\nViolations: ${violations}`);
        return;
    }

    // Hide exam content and show results
    examInterface.innerHTML = `
        <div style="max-width: 900px; margin: 50px auto; padding: 30px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #2563eb; text-align: center; margin-bottom: 30px;">Exam Results</h1>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 20px 0; color: #334155;">Overall Performance</h2>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div style="background: white; padding: 15px; border-radius: 6px;">
                        <div style="font-size: 14px; color: #64748b; margin-bottom: 5px;">Total Score</div>
                        <div style="font-size: 28px; font-weight: bold; color: ${results.totalScore >= 0 ? '#10b981' : '#ef4444'};">${results.totalScore} / ${results.maxScore}</div>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 6px;">
                        <div style="font-size: 14px; color: #64748b; margin-bottom: 5px;">Attempted</div>
                        <div style="font-size: 28px; font-weight: bold; color: #2563eb;">${results.totalAttempted} / ${results.totalQuestions}</div>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 6px;">
                        <div style="font-size: 14px; color: #64748b; margin-bottom: 5px;">Correct Answers</div>
                        <div style="font-size: 28px; font-weight: bold; color: #10b981;">${results.totalCorrect}</div>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 6px;">
                        <div style="font-size: 14px; color: #64748b; margin-bottom: 5px;">Violations</div>
                        <div style="font-size: 28px; font-weight: bold; color: #ef4444;">${violations}</div>
                    </div>
                </div>
            </div>

            <h2 style="color: #334155; margin-bottom: 20px;">Section-wise Breakdown</h2>
            <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="text-align: left; padding: 15px; border-bottom: 2px solid #e2e8f0; color: #475569;">Section</th>
                        <th style="text-align: right; padding: 15px; border-bottom: 2px solid #e2e8f0; color: #475569;">Score</th>
                        <th style="text-align: right; padding: 15px; border-bottom: 2px solid #e2e8f0; color: #475569;">Max Score</th>
                        <th style="text-align: right; padding: 15px; border-bottom: 2px solid #e2e8f0; color: #475569;">Attempted</th>
                        <th style="text-align: right; padding: 15px; border-bottom: 2px solid #e2e8f0; color: #475569;">Correct</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.keys(results.sectionBreakdown).map(section => {
                        const s = results.sectionBreakdown[section];
                        return `
                            <tr>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: 500;">${section}</td>
                                <td style="padding: 15px; text-align: right; border-bottom: 1px solid #e2e8f0; color: ${s.obtained >= 0 ? '#10b981' : '#ef4444'}; font-weight: 500;">${s.obtained}</td>
                                <td style="padding: 15px; text-align: right; border-bottom: 1px solid #e2e8f0;">${s.max}</td>
                                <td style="padding: 15px; text-align: right; border-bottom: 1px solid #e2e8f0;">${s.attempted} / ${s.totalQuestions}</td>
                                <td style="padding: 15px; text-align: right; border-bottom: 1px solid #e2e8f0;">${s.correctCount}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>

            <div style="text-align: center; margin-top: 40px;">
                <button onclick="location.reload()" style="background: #2563eb; color: white; padding: 12px 30px; border: none; border-radius: 6px; font-size: 16px; font-weight: 500; cursor: pointer; box-shadow: 0 2px 4px rgba(37,99,235,0.2);">
                    Start New Exam
                </button>
            </div>
        </div>
    `;
}