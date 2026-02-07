'use strict';

// ==========================================
// NEST 2025 (NISER PYQ) - COMPLETE QUESTION BANK
// 80 Questions: 20 per section
// ==========================================

const questionBank = {
    Biology: [
        {
            id: 1,
            text: "Change of amino acids in a protein led to formation of a salt bridge, without affecting the overall fold. This change results in:",
            options: [
                "an increase in free energy change (\\(\\Delta G\\)) of the protein.",
                "a decrease in melting temperature (\\(T_m\\)) of the protein.",
                "a decrease in enthalpy (\\(\\Delta H\\)) of the protein.",
                "a decrease in stability of the protein."
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 2,
            text: "Regarding light reaction of photosynthesis, which of the following is correct?<br>(I) Water is oxidized at the oxygen evolving complex.<br>(II) Pheophytin reduces NADP+ directly.<br>(III) Cytochrome b6f complex transports protons across the thylakoid membrane.<br>(IV) ATP synthase transports protons from stroma to lumen.",
            options: [
                "(I) and (II)",
                "(II) and (IV)",
                "(I) and (III)",
                "(II) and (III)"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 3,
            text: "Malaria is caused by Plasmodium. The most virulent form X is stored in the salivary gland of the mosquito, and a toxic substance Y is released when RBCs rupture. X and Y are:",
            options: [
                "trophozoite and haemozoin.",
                "sporozoite and haemozoin.",
                "merozoite and hemagglutinin.",
                "sporozoite and hemagglutinin."
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 4,
            text: "The oxygen dissociation curve (as percentage saturation versus \\(pO_2\\)) of blood for a healthy adult is shown. The regions P, Q, and R represent:<br><br><div style='text-align:center;'><img src='images/bio_q4.png' alt='Oxygen Curve' style='max-width:450px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "P: Tissues at rest, Q: Active tissues, R: Lungs",
                "P: Lungs, Q: Active tissues, R: Tissues at rest",
                "P: Active tissues, Q: Tissues at rest, R: Lungs",
                "P: Tissues at rest, Q: Lungs, R: Active tissues"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 5,
            text: "When a human somatic cell undergoes mitotic division, the ploidy level in metaphase and telophase, respectively, would be:",
            options: [
                "2n and 4n",
                "2n and 2n",
                "4n and 2n",
                "4n and 4n"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 6,
            text: "Which of the following is NOT a characteristic of meristematic cells?",
            options: [
                "They have thin cell walls.",
                "They have large vacuoles.",
                "They are metabolically active.",
                "They have dense cytoplasm."
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 7,
            text: "In the electron transport chain, the final electron acceptor is:",
            options: [
                "NAD+",
                "FAD",
                "Cytochrome c",
                "Oxygen"
            ],
            correct: 3,
            correctLetter: "D"
        },
        {
            id: 8,
            text: "In the eukaryotic cell cycle shown, the black solid bars (1, 2 and 3) represent important checkpoints. These checkpoints monitor:<br><br><div style='text-align:center;'><img src='images/bio_q8.png' alt='Cell Cycle' style='max-width:400px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "1: chromosome attachment to spindles; 2: DNA replication; 3: growth factors.",
                "1: DNA replication; 2: growth factors; 3: chromosome attachment to spindles.",
                "1: growth factors; 2: chromosome attachment to spindles; 3: DNA replication.",
                "1: growth factors; 2: DNA replication; 3: chromosome attachment to spindles."
            ],
            correct: 3,
            correctLetter: "D"
        },
        {
            id: 9,
            text: "The process of transcription in eukaryotes occurs in:",
            options: [
                "Cytoplasm only",
                "Nucleus only",
                "Both nucleus and cytoplasm",
                "Mitochondria only"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 10,
            text: "Which of the following amino acids contains a sulfur atom?",
            options: [
                "Serine",
                "Threonine",
                "Cysteine",
                "Tyrosine"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 11,
            text: "The Hardy-Weinberg equilibrium can be disrupted by:",
            options: [
                "Random mating",
                "Large population size",
                "Genetic drift",
                "Absence of selection"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 12,
            text: "Which of the following is a primary metabolite?",
            options: [
                "Alkaloids",
                "Proteins",
                "Terpenes",
                "Flavonoids"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 13,
            text: "In the given pedigree charts (i, ii, iii, iv), which pattern represents autosomal recessive inheritance?<br><br><div style='text-align:center;'><img src='images/bio_q13.png' alt='Pedigree Charts' style='max-width:500px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "Pedigree (i)",
                "Pedigree (ii)",
                "Pedigree (iii)",
                "Pedigree (iv)"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 14,
            text: "The diagram shows cell growth pattern with layers P, Q, and R over time. This represents:<br><br><div style='text-align:center;'><img src='images/bio_q14.png' alt='Cell Growth' style='max-width:400px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "Primary growth in dicot stem",
                "Secondary growth in dicot stem",
                "Growth of epidermis",
                "Root cap formation"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 15,
            text: "The histogram shows bristle number distribution in three populations (Plot I, II, III). This pattern indicates:<br><br><div style='text-align:center;'><img src='images/bio_q15.png' alt='Bristle Distribution' style='max-width:500px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "Stabilizing selection",
                "Directional selection",
                "Disruptive selection",
                "No selection"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 16,
            text: "The enzyme DNA polymerase III adds nucleotides in which direction?",
            options: [
                "3' to 5' direction",
                "5' to 3' direction",
                "Both directions simultaneously",
                "Random direction"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 17,
            text: "Which type of RNA is the most abundant in a cell?",
            options: [
                "mRNA",
                "tRNA",
                "rRNA",
                "snRNA"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 18,
            text: "The hormone responsible for fruit ripening is:",
            options: [
                "Auxin",
                "Gibberellin",
                "Cytokinin",
                "Ethylene"
            ],
            correct: 3,
            correctLetter: "D"
        },
        {
            id: 19,
            text: "Which of the following is NOT a function of the liver?",
            options: [
                "Detoxification",
                "Bile production",
                "Glycogen storage",
                "Insulin production"
            ],
            correct: 3,
            correctLetter: "D"
        },
        {
            id: 20,
            text: "The process by which mRNA is synthesized from DNA template is called:",
            options: [
                "Replication",
                "Translation",
                "Transcription",
                "Transduction"
            ],
            correct: 2,
            correctLetter: "C"
        }
    ],
    Chemistry: [
        {
            id: 1,
            text: "Maltose, a disaccharide, contains a glycosidic linkage between:",
            options: [
                "two units of \\(\\beta\\)-D-glucose",
                "two units of \\(\\alpha\\)-D-glucose",
                "\\(\\beta\\)-D-glucose and \\(\\alpha\\)-D-fructose",
                "\\(\\alpha\\)-D-glucose and \\(\\beta\\)-D-fructose"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 2,
            text: "The IUPAC name of the compound shown is:<br><br><div style='text-align:center;'><img src='images/chem_q22.png' alt='IUPAC Structure' style='max-width:350px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "5-ethyl-6-methylnonan-3-ol",
                "1,3-diethyl-4-methylheptan-1-ol",
                "5-ethyl-6-propylheptan-3-ol",
                "5-ethyl-4-methylnonan-7-ol"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 3,
            text: "Which of the following has the highest lattice energy?",
            options: [
                "NaCl",
                "NaBr",
                "NaI",
                "NaF"
            ],
            correct: 3,
            correctLetter: "D"
        },
        {
            id: 4,
            text: "The hybridization of carbon in \\(\\text{CO}_2\\) is:",
            options: [
                "sp",
                "sp²",
                "sp³",
                "sp³d"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 5,
            text: "Which of the following is an example of a Lewis acid?",
            options: [
                "NH₃",
                "BF₃",
                "H₂O",
                "OH⁻"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 6,
            text: "The molecular orbital energy diagram represents:<br><br><div style='text-align:center;'><img src='images/chem_mo.png' alt='MO Diagram' style='max-width:300px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "O₂ molecule",
                "N₂ molecule",
                "F₂ molecule",
                "CO molecule"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 7,
            text: "The product of reaction with 2-propanone in basic \\(\\text{I}_2\\) (iodoform reaction) is:",
            options: [
                "CHI₃ and CH₃COO⁻",
                "CH₃I and CH₃CO⁻",
                "C₂H₅I and HCOO⁻",
                "CHI₃ and C₂H₅O⁻"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 8,
            text: "The major product in electrophilic aromatic substitution on the given compound is:<br><br><div style='text-align:center;'><img src='images/chem_q23.png' alt='EAS Reaction' style='max-width:450px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "Product (a)",
                "Product (b)",
                "Product (c)",
                "Product (d)"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 9,
            text: "The product P of the reaction with methyl magnesium bromide (2 equiv) followed by \\(\\text{H}_3\\text{O}^+\\) is:<br><br><div style='text-align:center;'><img src='images/chem_q24.png' alt='Grignard Reaction' style='max-width:500px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "Product (a)",
                "Product (b)",
                "Product (c)",
                "Product (d)"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 10,
            text: "Which of the following species is paramagnetic?",
            options: [
                "N₂",
                "O₂",
                "CO",
                "F₂"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 11,
            text: "The order of bond length in \\(\\text{O}_2\\), \\(\\text{O}_2^-\\) and \\(\\text{O}_2^{2-}\\) is:",
            options: [
                "O₂ < O₂⁻ < O₂²⁻",
                "O₂²⁻ < O₂⁻ < O₂",
                "O₂⁻ < O₂ < O₂²⁻",
                "O₂²⁻ < O₂ < O₂⁻"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 12,
            text: "Which of the following is a quinone derivative?<br><br><div style='text-align:center;'><img src='images/chem_quinone.png' alt='Quinone Options' style='max-width:450px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "Compound (a)",
                "Compound (b)",
                "Compound (c)",
                "Compound (d)"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 13,
            text: "The rate of SN1 reaction depends on:",
            options: [
                "Concentration of substrate only",
                "Concentration of nucleophile only",
                "Concentration of both substrate and nucleophile",
                "Temperature only"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 14,
            text: "Which of the following is the correct IUPAC name?",
            options: [
                "2-methylpropan-2-ol",
                "tert-butyl alcohol",
                "1,1-dimethylethanol",
                "2-methylpropanol"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 15,
            text: "The pH of a 0.01 M HCl solution is:",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 16,
            text: "For a spontaneous process at constant T and P:",
            options: [
                "ΔG > 0",
                "ΔG < 0",
                "ΔG = 0",
                "ΔH > 0"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 17,
            text: "The Gibbs free energy (G) vs Temperature (T) and Pressure (P) relationship is shown. Which graph correctly represents \\(\\left(\\frac{\\partial G}{\\partial T}\\right)_P\\)?<br><br><div style='text-align:center;'><img src='images/chem_thermo.png' alt='Thermodynamics Graphs' style='max-width:450px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "Graph (a)",
                "Graph (b)",
                "Graph (c)",
                "Graph (d)"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 18,
            text: "Which of the following is the strongest acid?",
            options: [
                "HF",
                "HCl",
                "HBr",
                "HI"
            ],
            correct: 3,
            correctLetter: "D"
        },
        {
            id: 19,
            text: "The coordination number of Na+ in NaCl crystal is:",
            options: [
                "4",
                "6",
                "8",
                "12"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 20,
            text: "Which of the following reactions is an example of disproportionation?",
            options: [
                "2H₂O₂ → 2H₂O + O₂",
                "Zn + 2HCl → ZnCl₂ + H₂",
                "2Cu⁺ → Cu + Cu²⁺",
                "Fe + CuSO₄ → FeSO₄ + Cu"
            ],
            correct: 2,
            correctLetter: "C"
        }
    ],
    Physics: [
        {
            id: 1,
            text: "Noah Lyles and Kishane Thompson finished the 100m sprint in 9.784 s and 9.789 s respectively. If they ran at constant speeds, what was the distance between them at the finish?",
            options: [
                "10 cm",
                "25 cm",
                "5 cm",
                "50 cm"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 2,
            text: "A ball is dropped from height h. If it loses 20% of its energy on each bounce, after how many bounces will it reach a maximum height less than h/2?",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 3,
            text: "Light travels from medium 1 (n₁) to medium 2 (n₂) as shown. If n₁ > n₂, the ray will:<br><br><div style='text-align:center;'><img src='images/phys_refraction.png' alt='Refraction' style='max-width:350px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "Bend towards the normal",
                "Bend away from the normal",
                "Continue straight",
                "Undergo total internal reflection"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 4,
            text: "A light ray passes through four transparent media as shown. If n₁ < n₂ < n₃ < n₄, the ray emerges:<br><br><div style='text-align:center;'><img src='images/phys_layers.png' alt='Four Media' style='max-width:350px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "Parallel to incident ray",
                "Perpendicular to incident ray",
                "At a smaller angle to normal",
                "At a larger angle to normal"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 5,
            text: "The graph of maximum velocity (Vmax) vs frequency (ν) in the photoelectric effect is:<br><br><div style='text-align:center;'><img src='images/phys_photoelectric.png' alt='Photoelectric Effect' style='max-width:450px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "Graph (a)",
                "Graph (b)",
                "Graph (c)",
                "Graph (d)"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 6,
            text: "The de Broglie wavelength of an electron accelerated through potential V is:",
            options: [
                "\\(\\lambda = \\frac{h}{\\sqrt{2meV}}\\)",
                "\\(\\lambda = \\frac{h}{meV}\\)",
                "\\(\\lambda = \\frac{2h}{meV}\\)",
                "\\(\\lambda = \\frac{h}{2meV}\\)"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 7,
            text: "Two identical springs with spring constant k are connected in series. The effective spring constant is:",
            options: [
                "2k",
                "k/2",
                "k",
                "4k"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 8,
            text: "The moment of inertia of a uniform disc about an axis through its center perpendicular to its plane is I. The moment of inertia about a diameter is:",
            options: [
                "I",
                "I/2",
                "I/4",
                "2I"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 9,
            text: "A satellite is in a circular orbit around Earth. If its speed is doubled, it will:",
            options: [
                "Escape Earth's gravity",
                "Move to a higher orbit",
                "Move to a lower orbit",
                "Remain in the same orbit"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 10,
            text: "In the DC circuit shown, after a long time, the charges on capacitors C₁ and C₂ are:<br><br><div style='text-align:center;'><img src='images/phys_q40.png' alt='DC Circuit' style='max-width:400px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "8 μC and 16 μC",
                "16 μC and 8 μC",
                "4 μC and 4 μC",
                "8 μC and 8 μC"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 11,
            text: "The electric field inside a uniformly charged sphere at distance r from center (r < R) is:",
            options: [
                "\\(E \\propto r\\)",
                "\\(E \\propto 1/r\\)",
                "\\(E \\propto 1/r^2\\)",
                "E = 0"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 12,
            text: "A square loop with side a carrying current I is placed in a magnetic field \\(\\vec{B} = \\beta y \\hat{z}\\). The net force on the loop is:<br><br><div style='text-align:center;'><img src='images/phys_q42.png' alt='Magnetic Force' style='max-width:350px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "\\(I \\beta a^2\\)",
                "zero",
                "\\(2 I \\beta a^2\\)",
                "\\(I \\beta a / 2\\)"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 13,
            text: "The work done by a gas in an isothermal expansion from V to 2V is:",
            options: [
                "nRT",
                "nRT ln 2",
                "2nRT",
                "nRT/2"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 14,
            text: "In a p-n junction diode, the width of depletion region:",
            options: [
                "Increases with forward bias",
                "Decreases with forward bias",
                "Remains constant",
                "Becomes zero at forward bias"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 15,
            text: "The binding energy per nucleon is maximum for:",
            options: [
                "Hydrogen",
                "Iron",
                "Uranium",
                "Helium"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 16,
            text: "A wire of resistance R is stretched uniformly to double its length. The new resistance is:",
            options: [
                "R",
                "2R",
                "4R",
                "R/2"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 17,
            text: "The time period of a simple pendulum on Moon (g_moon = g/6) compared to Earth is:",
            options: [
                "Same",
                "√6 times larger",
                "6 times larger",
                "√6 times smaller"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 18,
            text: "In Young's double slit experiment, the fringe width is proportional to:",
            options: [
                "d (slit separation)",
                "1/d",
                "d²",
                "1/d²"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 19,
            text: "The dimension of Planck's constant is:",
            options: [
                "[ML²T⁻¹]",
                "[ML²T⁻²]",
                "[MLT⁻¹]",
                "[M²LT⁻¹]"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 20,
            text: "The root mean square speed of gas molecules is proportional to:",
            options: [
                "T",
                "√T",
                "T²",
                "1/T"
            ],
            correct: 1,
            correctLetter: "B"
        }
    ],
    Mathematics: [
        {
            id: 1,
            text: "The system of equations \\(x \\cos \\theta + y \\sec \\theta = 0\\) and \\(x \\sin \\theta + y \\tan \\theta = 0\\) has non-trivial solution if:",
            options: [
                "\\(\\theta \\in \\{(2n+1)\\pi/2 : n \\in \\mathbb{Z}\\}\\)",
                "\\(\\theta \\in \\{n\\pi : n \\in \\mathbb{Z}\\}\\)",
                "\\(\\theta = 0\\) only",
                "no value of \\(\\theta\\)"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 2,
            text: "The value of \\(\\lim_{x \\to 0} \\frac{\\sin x - x}{x^3}\\) is:",
            options: [
                "1/6",
                "-1/6",
                "1/3",
                "-1/3"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 3,
            text: "The value of the integral \\(\\int_0^{\\sqrt{\\pi}} x \\sin^2(x^2) dx\\) is:",
            options: [
                "\\(\\pi/2\\)",
                "\\(\\pi/8\\)",
                "\\(\\pi/4\\)",
                "\\(\\pi\\)"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 4,
            text: "If \\(A\\) is a 3×3 matrix with \\(|A| = 5\\), then \\(|\\text{adj}(A)|\\) is:",
            options: [
                "5",
                "25",
                "125",
                "1/5"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 5,
            text: "The number of ways to arrange the letters in 'MISSISSIPPI' is:",
            options: [
                "\\(\\frac{11!}{4!4!2!}\\)",
                "\\(\\frac{11!}{4!4!2!1!}\\)",
                "\\(11!\\)",
                "\\(\\frac{11!}{4!2!}\\)"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 6,
            text: "In the nested circles shown, if the radius of outer circle C₂ is r₂ and inner circle C₁ is r₁, the length of segment C₂T is:<br><br><div style='text-align:center;'><img src='images/math_q66.png' alt='Nested Circles' style='max-width:300px; width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1);'></div>",
            options: [
                "\\(\\sqrt{r_2(r_2-2r_1)}\\)",
                "\\(r_2 - r_1\\)",
                "\\(\\sqrt{r_1 r_2}\\)",
                "\\(2r_1\\)"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 7,
            text: "If \\(f(x) = x^3 - 3x\\), then the number of real roots of \\(f(f(x)) = 0\\) is:",
            options: [
                "3",
                "5",
                "7",
                "9"
            ],
            correct: 2,
            correctLetter: "C"
        },
        {
            id: 8,
            text: "The coefficient of \\(x^{10}\\) in the expansion of \\((1+x)^{15}\\) is:",
            options: [
                "3003",
                "5005",
                "1365",
                "2002"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 9,
            text: "The eccentricity of the ellipse \\(\\frac{x^2}{25} + \\frac{y^2}{16} = 1\\) is:",
            options: [
                "3/5",
                "4/5",
                "5/3",
                "5/4"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 10,
            text: "If \\(\\vec{a} \\cdot \\vec{b} = 0\\) and \\(\\vec{a} \\times \\vec{b} = \\vec{0}\\), then:",
            options: [
                "\\(\\vec{a} = \\vec{0}\\) or \\(\\vec{b} = \\vec{0}\\)",
                "\\(\\vec{a} \\parallel \\vec{b}\\)",
                "\\(\\vec{a} \\perp \\vec{b}\\)",
                "\\(|\\vec{a}| = |\\vec{b}|\\)"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 11,
            text: "The derivative of \\(\\tan^{-1}\\left(\\frac{\\cos x}{1 + \\sin x}\\right)\\) is:",
            options: [
                "1/2",
                "-1/2",
                "1",
                "-1"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 12,
            text: "The area bounded by \\(y = x^2\\) and \\(y = x\\) is:",
            options: [
                "1/6",
                "1/3",
                "1/2",
                "1"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 13,
            text: "The sum of infinite GP \\(1 + 1/3 + 1/9 + 1/27 + ...\\) is:",
            options: [
                "3/2",
                "2",
                "3",
                "4/3"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 14,
            text: "If \\(\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}\\), then for \\(x \\in [-1, 1]\\):",
            options: [
                "Always true",
                "True only for x = 0",
                "True only for x = 1",
                "Never true"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 15,
            text: "The equation of tangent to the curve \\(y = x^2\\) at point (1, 1) is:",
            options: [
                "y = 2x - 1",
                "y = 2x + 1",
                "y = x + 1",
                "y = x - 1"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 16,
            text: "If \\(z = 1 + i\\), then \\(|z|\\) is:",
            options: [
                "1",
                "√2",
                "2",
                "√3"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 17,
            text: "The probability of getting exactly 2 heads in 4 tosses of a fair coin is:",
            options: [
                "1/4",
                "3/8",
                "1/2",
                "5/8"
            ],
            correct: 1,
            correctLetter: "B"
        },
        {
            id: 18,
            text: "The distance between parallel lines \\(3x + 4y = 5\\) and \\(3x + 4y = 10\\) is:",
            options: [
                "1",
                "5",
                "2",
                "1/5"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 19,
            text: "If \\(f(x) = \\ln(x^2 + 1)\\), then \\(f'(0)\\) is:",
            options: [
                "0",
                "1",
                "2",
                "undefined"
            ],
            correct: 0,
            correctLetter: "A"
        },
        {
            id: 20,
            text: "The value of \\(\\int_0^1 \\frac{1}{1+x^2} dx\\) is:",
            options: [
                "π/4",
                "π/2",
                "π",
                "1"
            ],
            correct: 0,
            correctLetter: "A"
        }
    ]
};

// ==========================================
// 2. EXAM ENGINE INITIALIZATION
// ==========================================
let currentQuestionIndex = 0;
let userAnswers = {};
let currentSection = 'Biology';
let questionStatus = {};
let timeLeft = 180 * 60;
let timerInterval;
let showAnswerMode = false;

function initExam() {
    const userName = document.getElementById('candidateName').value || 'Candidate';
    document.getElementById('userNameDisplay').textContent = userName;
    document.getElementById('instructionPage').style.display = 'none';
    document.getElementById('examInterface').style.display = 'block';

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

document.getElementById('candidateName').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !document.getElementById('beginTestBtn').disabled) {
        initExam();
    }
});

document.getElementById('agreeTerms').addEventListener('change', function (e) {
    document.getElementById('beginTestBtn').disabled = !e.target.checked;
});

document.getElementById('beginTestBtn').onclick = initExam;

function loadQuestion(index) {
    currentQuestionIndex = index;
    const question = questionBank[currentSection][index];

    document.getElementById('questionNumberDisplay').textContent = index + 1;
    document.getElementById('sectionTitle').textContent = currentSection;

    const content = document.getElementById('questionContent');
    content.innerHTML = question.text;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (userAnswers[currentSection] && userAnswers[currentSection][index] === i) {
            btn.classList.add('selected');
        }
        const letter = String.fromCharCode(65 + i);
        btn.innerHTML = `<span class="opt-id">${letter}</span> <span class="opt-text">${opt}</span>`;
        btn.onclick = () => selectOption(i);
        optionsContainer.appendChild(btn);
    });

    // Add "Show Answer" button
    const answerBtn = document.createElement('button');
    answerBtn.className = 'show-answer-btn';
    answerBtn.innerHTML = '🎯 Show Correct Answer';
    answerBtn.onclick = () => revealAnswer(question.correctLetter);
    optionsContainer.appendChild(answerBtn);

    // Answer reveal container
    const answerReveal = document.createElement('div');
    answerReveal.id = 'answerReveal';
    answerReveal.className = 'answer-reveal hidden';
    optionsContainer.appendChild(answerReveal);

    updatePalette();
}

function revealAnswer(correctLetter) {
    const revealDiv = document.getElementById('answerReveal');
    revealDiv.classList.remove('hidden');
    revealDiv.innerHTML = `<span class="correct-badge">✓ Correct Answer: <strong>Option ${correctLetter}</strong></span>`;

    // Highlight correct option
    const optBtns = document.querySelectorAll('.option-btn');
    const correctIndex = correctLetter.charCodeAt(0) - 65;
    optBtns[correctIndex].classList.add('correct-highlight');
}

function selectOption(index) {
    if (!userAnswers[currentSection]) userAnswers[currentSection] = {};
    userAnswers[currentSection][currentQuestionIndex] = index;

    const btns = document.querySelectorAll('.option-btn');
    btns.forEach((btn, i) => {
        if (i === index) btn.classList.add('selected');
        else btn.classList.remove('selected');
    });
}

function updateSectionCounts() {
    Object.keys(questionBank).forEach(section => {
        const total = questionBank[section].length;
        const countEl = document.getElementById(`${section.toLowerCase()}Count`);
        if (countEl) countEl.textContent = `(${total})`;
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
    const timerEl = document.getElementById('timerDisplay');
    if (timerEl) {
        timerEl.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
}

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
    if (!palette) return;
    palette.innerHTML = '';
    questionBank[currentSection].forEach((_, i) => {
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
        item.classList.remove('active', 'answered', 'marked');
        if (i === currentQuestionIndex) item.classList.add('active');
        if (userAnswers[currentSection] && userAnswers[currentSection][i] !== undefined) {
            item.classList.add('answered');
        }
    });
}

document.getElementById('saveNextBtn').onclick = () => {
    if (currentQuestionIndex < questionBank[currentSection].length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    } else {
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
    let totalQuestions = 0;

    Object.keys(questionBank).forEach(s => {
        questionBank[s].forEach((q, i) => {
            totalQuestions++;
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
            <p style="font-size: 2.5rem; font-weight: bold; color: #10b981;">${totalScore}</p>
            <p style="color: #94a3b8;">Total Score</p>
            <hr style="border-color: rgba(255,255,255,0.1); margin: 20px 0;">
            <p>✅ Correct: <strong>${correctCount}</strong></p>
            <p>❌ Incorrect: <strong>${wrongCount}</strong></p>
            <p>⏭️ Unanswered: <strong>${totalQuestions - (correctCount + wrongCount)}</strong></p>
        </div>
    `;
}
