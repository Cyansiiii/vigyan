// exam_2023.js - IISER 2023 Questions
'use strict';

// ----------------------------------------------------------------------------
// 1. QUESTION BANK
// ----------------------------------------------------------------------------
const questionBank = {
    Biology: [
        {
            id: 1,
            text: `Match the entries in Column I with their functions described in Column II.<br><br>
            <table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">
                <tr><th>Column I</th><th>Column II</th></tr>
                <tr><td>P. Nucleolus</td><td>(i) Protein synthesis</td></tr>
                <tr><td>Q. Ribosomes</td><td>(ii) DNA replication</td></tr>
                <tr><td>R. Nucleus</td><td>(iii) rRNA synthesis</td></tr>
                <tr><td>S. Mitochondria</td><td>(iv) ATP production</td></tr>
            </table><br>
            Which one of the following combinations is correct? [cite: 3, 4, 5, 6]`,
            options: [
                "P-(iv); Q-(iii); R-(ii); S-(i)",
                "P-(iii); Q-(i); R-(iv); S-(ii)",
                "P-(ii); Q-(iv); R-(i); S-(iii)",
                "P-(i); Q-(ii); R-(iii); S-(iv)"
            ],
            correct: 0 // Option A from source [cite: 7]
        },
        {
            id: 2,
            text: "Which one of the following best describes peptones? [cite: 19]",
            options: [
                "Partially digested proteins",
                "Zymogen form of pepsin",
                "Activated form of pepsin",
                "An intestinal mixture of proteins, mucous and HCO₃⁻"
            ],
            correct: 0 // Option A [cite: 21]
        },
        {
            id: 3,
            text: `Match the biomolecules given in Column I with their corresponding chemical nature given in Column II.<br><br>
            <table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">
                <tr><th>Column I</th><th>Column II</th></tr>
                <tr><td>P. Starch</td><td>(i) Lipid</td></tr>
                <tr><td>Q. Insulin</td><td>(ii) Polysaccharide</td></tr>
                <tr><td>R. Cholesterol</td><td>(iii) Nucleic acid</td></tr>
                <tr><td>S. RNA</td><td>(iv) Protein</td></tr>
            </table><br>
            Which one of the following combinations is correct? [cite: 30, 31, 32]`,
            options: [
                "P-(iv); Q-(ii); R-(i); S-(iii)",
                "P-(ii); Q-(iv); R-(iii); S-(i)",
                "P-(iii); Q-(i); R-(iv); S-(ii)",
                "P-(i); Q-(iii); R-(ii); S-(iv)"
            ],
            correct: 1 // Option B [cite: 36]
        },
        {
            id: 4,
            text: "A mitotic drug inhibits microtubule formation. Which one of the following stages of karyokinesis will be the first to get affected by the drug? [cite: 43]",
            options: [
                "Metaphase",
                "Anaphase",
                "Prophase",
                "Telophase"
            ],
            correct: 1 // Option B [cite: 47]
        },
        {
            id: 5,
            text: "Which one of the following statements regarding seed structure is INCORRECT? [cite: 54]",
            options: [
                "In monocot seeds, the membraneous seed coat that is fused with the fruit wall is called the aleurone layer.",
                "The endosperm is not present in some of the mature dicot seeds.",
                "In dicots, the outer layer of the seed coat is called testa.",
                "Coleoptile and coleorhiza are found in monocotyledonous seeds."
            ],
            correct: 0 // Option A [cite: 56]
        },
        {
            id: 6,
            text: "Which one of the following anatomical features of wood can be used to estimate the age of a tree growing in a temperate climate? [cite: 65]",
            options: [
                "Spring wood and late wood",
                "Heart wood and sap wood",
                "Spring wood and heart wood",
                "Autumn wood and sap wood"
            ],
            correct: 0 // Option A [cite: 67]
        },
        {
            id: 7,
            text: "Which one of the following statements is CORRECT about biological nitrogen fixation in plants? [cite: 76]",
            options: [
                "The catalytic redox center of Nitrogenase contains Mo and Fe as cofactors.",
                "Atmospheric nitrogen is fixed by Nitrogenase by converting N₂ to NO₃⁻.",
                "Nitrogenase can function optimally only in the presence of molecular oxygen.",
                "The transport of important amides, like asparagine and glutamine, produced by transamination, to different parts of the plant body is mediated by phloem."
            ],
            correct: 0 // Option A [cite: 78]
        },
        {
            id: 8,
            text: "Which one of the following is an example of genetic diversity? [cite: 87]",
            options: [
                "Variation in the potency and concentration of reserpine produced by Rauwolfia vomitoria.",
                "Higher diversity of amphibians in the Western Ghats than in the Eastern Ghats.",
                "Greater variation of ecosystems found in India than in Scandinavia.",
                "The greater diversity of plant species found in India compared to Central Asia."
            ],
            correct: 0 // Option A [cite: 88, 90]
        },
        {
            id: 9,
            text: "When the ribosome encounters a stop codon in the mRNA, during translation, which one of the following binds to the stop codon? [cite: 98]",
            options: [
                "Release factor",
                "Rho factor",
                "Termination factor",
                "Sigma factor"
            ],
            correct: 0 // Option A [cite: 100]
        },
        {
            id: 10,
            text: `Match the terms in Column I with their corresponding physiological roles given in Column II.<br><br>
            <table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">
                <tr><th>Column I</th><th>Column II</th></tr>
                <tr><td>P. Auxin</td><td>(i) Seed dormancy</td></tr>
                <tr><td>Q. Cytokinin</td><td>(ii) Fruit ripening</td></tr>
                <tr><td>R. Ethylene</td><td>(iii) Stomatal closure</td></tr>
                <tr><td>S. Abscisic acid</td><td>(iv) Cell elongation</td></tr>
                <tr><td></td><td>(v) Cell division</td></tr>
            </table><br>
            Which one of the following combinations is correct? [cite: 109, 110, 111]`,
            options: [
                "P-(iv); Q-(v); R-(i); S-(ii)",
                "P-(v); Q-(i); R-(iv); S-(iii)",
                "P-(iii); Q-(ii); R-(v); S-(iv)",
                "P-(i); Q-(iv); R-(iii); S-(v)"
            ],
            correct: 3 // Option D [cite: 124] (Note: Text has P-Auxin matching Cell Elongation (iv))
        },
        {
            id: 11,
            text: "For which one of the following diseases does the causative agent require the splicing of their hnRNA to generate mature mRNA? [cite: 127]",
            options: [
                "Malaria",
                "Pertussis",
                "Typhoid",
                "Tuberculosis"
            ],
            correct: 0 // Option A [cite: 129]
        },
        {
            id: 12,
            text: `The diagram below represents an enzyme, its substrate, and potential inhibitors (P, Q, R, S, T).<br>
            <strong>Structure Descriptions:</strong><br>
            <ul>
                <li><strong>Enzyme:</strong> Has a V-shaped Active Site and a Round Allosteric Site.</li>
                <li><strong>Substrate:</strong> Triangular shape (fits the V-shaped active site).</li>
                <li><strong>Inhibitor P:</strong> A circle attached to a triangle (partially fits active site).</li>
                <li><strong>Inhibitor Q:</strong> Two squares joined together (does not fit active site).</li>
                <li><strong>Inhibitor R:</strong> A square with a round protrusion (fits allosteric site).</li>
                <li><strong>Inhibitor S:</strong> Two triangles joined (diamond shape, fits active site).</li>
                <li><strong>Inhibitor T:</strong> Two circles joined (does not fit active site).</li>
            </ul>
            <br>
            Which one of the following combinations is the best pair of <strong>competitive inhibitors</strong> (binds to active site) for the enzyme? [cite: 138, 150]`,
            options: [
                "P, S",
                "Q, R",
                "S, T",
                "R, T"
            ],
            correct: 0 // Option A [cite: 152]
        },
        {
            id: 13,
            text: "In an island with 10,000 individuals, four have sickle cell anemia, a recessive autosomal disease. Assuming that the locus is in Hardy-Weinberg equilibrium, how many individuals in that island are expected to be heterozygous for the disease allele? [cite: 161]",
            options: [
                "392",
                "4",
                "9996",
                "9608"
            ],
            correct: 0 // Option A [cite: 164]
        },
        {
            id: 14,
            text: `<strong>Plasmid Map & Gel Electrophoresis Problem:</strong><br><br>
            <strong>1. Vector Map (pIAT, 3500 bp):</strong><br>
            - Contains <em>Hind III</em> and <em>EcoR I</em> sites close together.<br>
            - A 1000 bp DNA fragment is cloned between these sites.<br>
            - The insert contains a <em>Not I</em> site at 400 bp from the <em>EcoR I</em> end (leaving 600 bp to the <em>Hind III</em> end).<br>
            - The vector itself has another <em>Not I</em> site approximately 1100 bp away from the cloning site.<br><br>
            <strong>2. Digestion Lanes:</strong><br>
            - <strong>Lane 1:</strong> Digested with <em>Not I</em> and <em>EcoR I</em>.<br>
            - <strong>Lane 2:</strong> Digested with <em>Not I</em> and <em>Hind III</em>.<br><br>
            Based on the map, which banding pattern is correct? [cite: 172, 173, 174, 185, 186]`,
            options: [
                "Lane 1: Two bands (3500 bp, 1000 bp); Lane 2: Two bands (4000 bp, 500 bp)",
                "Lane 1: Two bands (4000 bp, 500 bp); Lane 2: Two bands (3500 bp, 1000 bp)",
                "Lane 1: One band (4500 bp); Lane 2: Two bands (3500 bp, 1000 bp)",
                "Lane 1: Two bands (3500 bp, 1000 bp); Lane 2: One band (4500 bp)"
            ],
            correct: 1 // Option B [cite: 199]
        },
        {
            id: 15,
            text: `<strong>Pedigree Chart Analysis:</strong><br>
            <pre>
Generation I:   (Normal Female) O ----- [Affected Male] ■
                                   |
Generation II:      -----------------------------------
                    |                                 |
               [Normal Male] □                  (Normal Female) O ---- [Unknown Male] ?
                                                                     |
Generation III:                                              -----------------
                                                             |               |
                                                      [Normal Male] □   [Affected Male] ■
            </pre><br>
            The chart shows the inheritance of a genetic disorder. I-2 and III-2 are the only affected individuals (Solid/Filled shapes).<br>
            Which one of the following is the correct pattern of inheritance and the genotype of the II-3 individual? [cite: 229, 240]`,
            options: [
                "Autosomal recessive, heterozygous",
                "Autosomal dominant, homozygous for the normal allele",
                "X-linked recessive, heterozygous",
                "Autosomal recessive, homozygous for the normal allele"
            ],
            correct: 0 // Option A [cite: 242]
        }
    ],
    
    Chemistry: [
        {
            id: 1,
            text: "How many radial nodes does Ca⁺ have in its 4s orbital? [cite: 252]",
            options: [
                "3",
                "0",
                "1",
                "2"
            ],
            correct: 0 // Option A [cite: 254]
        },
        {
            id: 2,
            text: "Amongst O₂, N₂, F₂, and B₂, which molecules will be attracted to an external magnetic field? [cite: 263]",
            options: [
                "O₂ and B₂",
                "F₂, N₂, and B₂",
                "O₂, B₂, and N₂",
                "O₂ and F₂"
            ],
            correct: 0 // Option A [cite: 265]
        },
        {
            id: 3,
            text: "What is the smallest P−P−P bond angle in the highly reactive allotrope of phosphorus? [cite: 274]",
            options: [
                "60°",
                "109°",
                "45°",
                "120°"
            ],
            correct: 0 // Option A [cite: 276]
        },
        {
            id: 4,
            text: "Which of the following is an ore of iron? [cite: 285]",
            options: [
                "Siderite",
                "Bauxite",
                "Malachite",
                "Quartz"
            ],
            correct: 0 // Option A [cite: 287]
        },
        {
            id: 5,
            text: "Which parameters are plotted in the Ellingham diagram? [cite: 296]",
            options: [
                "ΔᵣG° vs T",
                "ΔᵣH° vs T",
                "ΔᵣS° vs T",
                "ΔᵣS° vs P"
            ],
            correct: 0 // Option A [cite: 298]
        },
        {
            id: 6,
            text: `[DIAGRAM: Shows 4 chemical structures - I: primary alkyl halide, II: tertiary alkyl halide, III: neopentyl halide, IV: secondary alkyl halide]<br><br>
            Which of the following compounds will NOT undergo the Finkelstein reaction with NaI via Sₙ2 pathway? [cite: 307]`,
            options: [
                "II and III",
                "I and III",
                "II and IV",
                "I and IV"
            ],
            correct: 0 // Option A [cite: 310]
        },
        {
            id: 7,
            text: `[DIAGRAM: Shows 4 different synthetic routes (I, II, III, IV) for making n-propyl benzene using different reagents and conditions]<br><br>
            Which one amongst the following is the most efficient way of synthesizing n-propyl benzene? [cite: 325]`,
            options: [
                "Route I: Benzene + CH₃CH₂CH₂Cl / AlCl₃",
                "Route II: Benzene + CH₃CH₂COCl / AlCl₃, then Zn-Hg/HCl",
                "Route III: Benzene + CH₂=CHCH₃, then H₂/Pd",
                "Route IV: Benzene + (CH₃)₂CHCl / AlCl₃"
            ],
            correct: 1 // Option B [cite: 329]
        },
        {
            id: 8,
            text: `[DIAGRAM: Shows 4 molecular structures - I, II, III, IV with different stereochemistry]<br><br>
            Which amongst the following are chiral compounds? [cite: 353]`,
            options: [
                "II and IV",
                "I and IV",
                "II and III",
                "I and II"
            ],
            correct: 0 // Option A [cite: 358]
        },
        {
            id: 9,
            text: `[DIAGRAM: Shows 4 nitrogenous base structures - I: Thymine, II: Uracil, III: Adenine, IV: Cytosine]<br><br>
            Which one amongst the following bases is NOT present in RNA? [cite: 374]`,
            options: [
                "III (Adenine)",
                "I (Thymine)",
                "II (Uracil)",
                "IV (Cytosine)"
            ],
            correct: 1 // Option B [cite: 378] (Thymine is I)
        },
        {
            id: 10,
            text: `[DIAGRAM: Shows 4 cyclic structures - I, II, III, IV with different conjugation patterns]<br><br>
            Which amongst the following are aromatic? [cite: 395]`,
            options: [
                "I and II",
                "III and IV",
                "II and IV",
                "I and III"
            ],
            correct: 0 // Option A [cite: 402]
        },
        {
            id: 11,
            text: "Why is it harder to compress liquids and solids relative to gases? [cite: 413]",
            options: [
                "Molecules are closer to each other in solids and liquids.",
                "Due to the presence of electron-nuclear attraction in solids and liquids.",
                "Due to the absence of electron-nuclear attraction in solids and liquids.",
                "Solids and liquids have definite volume."
            ],
            correct: 0 // Option A [cite: 415]
        },
        {
            id: 12,
            text: "Related to the Freundlich adsorption isotherm, which one of the following statements is NOT correct? [cite: 424]",
            options: [
                "It holds good over a wide range of pressures.",
                "The value of 1/n is between 0 and 1.",
                "The Freundlich adsorption isotherm equation is an empirical equation.",
                "It is used for the adsorption of both gases and solutions."
            ],
            correct: 0 // Option A [cite: 426]
        },
        {
            id: 13,
            text: "Consider the following reaction: CH₄(g) → C(g) + 4H(g); ΔₐH⁰ = 1665 kJ mol⁻¹<br><br>Which of the statements is FALSE? [cite: 437, 438]",
            options: [
                "ΔₐH⁰ is the mean bond enthalpy of a C-H bond.",
                "All four C-H bonds in CH₄ are identical in bond length and energy.",
                "The energy required to break individual C-H bonds in successive steps is different.",
                "Mean C-H bond enthalpies differ slightly from compound to compound."
            ],
            correct: 0 // Option A [cite: 440]
        },
        {
            id: 14,
            text: "In two solutions X (hexane and benzene) and Y (water and HCl), what types of deviations from Raoult's law are observed? [cite: 449]",
            options: [
                "No deviation (ideal behaviour) and negative deviation, respectively.",
                "Negative deviation and positive deviation, respectively.",
                "Positive deviation and negative deviation, respectively.",
                "Positive deviation and no deviation (ideal behaviour), respectively."
            ],
            correct: 0 // Option A [cite: 451]
        },
        {
            id: 15,
            text: "In aqueous solution, the hydronium ion gets further hydrated to give which of the following species? [cite: 460]",
            options: [
                "H₉O₄⁺",
                "H₇O₄⁺",
                "H₃O₂⁺",
                "H₅O₃⁺"
            ],
            correct: 0 // Option A [cite: 461]
        }
    ],
    
    Mathematics: [
        {
            id: 1,
            text: "Let f : R → (0, ∞) be a continuous decreasing function. Suppose f(0), f(1), ..., f(10) are in a geometric progression with common ratio 1/5. In which of the following intervals does the value of ∫₀¹⁰ f(x)dx lie? [cite: 472]",
            options: [
                "(0, 2f(0))",
                "(4f(0), 6f(0))",
                "(8f(0), 10f(0))",
                "(12f(0), 14f(0))"
            ],
            correct: 0 // Option A [cite: 474]
        },
        {
            id: 2,
            text: "Let M be a 3 × 3 matrix with real entries such that {(x₁, x₂, x₃) : M(x₁, x₂, x₃)ᵀ = (0, 0, 0)ᵀ} = {(x₁, x₂, x₃) : x₁ + x₂ = 0 = x₂ + x₃}. What is the value of the determinant of M? [cite: 483, 484, 485]",
            options: [
                "0",
                "1",
                "2",
                "3"
            ],
            correct: 0 // Option A [cite: 487]
        },
        {
            id: 3,
            text: "What is the locus of the center of circles passing through the origin (0, 0) with fixed radius? [cite: 496]",
            options: [
                "Circle",
                "Hyperbola",
                "Parabola",
                "Line"
            ],
            correct: 0 // Option A [cite: 498]
        },
        {
            id: 4,
            text: "Let α be a real number. What is the total number of distinct point(s) of intersection between the parabola y = x² + 4x sin α + 6 and the pair of lines y² = 1? [cite: 507]",
            options: [
                "Zero",
                "One",
                "Two",
                "Four"
            ],
            correct: 2 // Option C [cite: 513]
        },
        {
            id: 5,
            text: "Let L be a straight line passing through the origin, and it makes angles α, β and γ with the positive X, Y and Z-axes, respectively. What is the value of cos 2α + cos 2β + cos 2γ? [cite: 518, 519]",
            options: [
                "-1",
                "3",
                "1",
                "-3"
            ],
            correct: 0 // Option A [cite: 521]
        },
        {
            id: 6,
            text: "What is the total number of distinct divisors of 2⁹ × 3¹⁹? [cite: 530]",
            options: [
                "200",
                "30",
                "435",
                "100"
            ],
            correct: 0 // Option A [cite: 532]
        },
        {
            id: 7,
            text: "Suppose the mean and the standard deviation of the data {x₁, x₂, ..., x₉} are μ and σ(≠0), respectively. After including one more data value x₁₀, the mean of the data {x₁, x₂, ..., x₉, x₁₀} remains μ. What is the standard deviation of the data {x₁, x₂, ..., x₉, x₁₀}? [cite: 541, 542]",
            options: [
                "3σ/√10",
                "σ√10/3",
                "10σ/9",
                "9σ/10"
            ],
            correct: 0 // Option A [cite: 544]
        },
        {
            id: 8,
            text: "Consider three biased coins. Let the probability of getting head be 1/3 and the probability of getting tail be 2/3 in each of the coins. Consider the experiment of tossing the three coins one by one, and the following events: E: 'at least two heads show up', F: 'first coin shows tail'. What is the conditional probability of E given that F has already occurred? [cite: 553, 554, 555, 556, 557, 558, 559, 560, 561]",
            options: [
                "1/9",
                "2/9",
                "1/4",
                "4/9"
            ],
            correct: 0 // Option A [cite: 562]
        },
        {
            id: 9,
            text: "Which of the following differential equations has y = eˣ as one of its particular solutions? [cite: 572]",
            options: [
                "y(d²y/dx²) - eˣ(dy/dx) + y² = e²ˣ",
                "y(d²y/dx²) + eˣ(dy/dx) + y² = e²ˣ",
                "y(d²y/dx²) - eˣ(dy/dx) + y² = eˣ",
                "y(d²y/dx²) + eˣ(dy/dx) + y² = eˣ"
            ],
            correct: 0 // Option A [cite: 574]
        },
        {
            id: 10,
            text: "What is the area of the region {(x, y) : 0 ≤ y ≤ xe^(x²), 0 ≤ x ≤ 1}? [cite: 583, 584]",
            options: [
                "½(e - 1)",
                "½e",
                "e - 1",
                "e - 2"
            ],
            correct: 0 // Option A [cite: 585]
        },
        {
            id: 11,
            text: "Consider the objective function Z = x - y subject to the constraints: x + 2y ≤ 10, x + y ≥ 2, x ≥ 0, y ≥ 0. What is the minimum value of Z subject to the above constraints? [cite: 595, 596, 597, 598, 599, 600, 601]",
            options: [
                "-5",
                "-2",
                "2",
                "-10"
            ],
            correct: 0 // Option A [cite: 603]
        },
        {
            id: 12,
            text: "Let p(x) = x² + bx + c be a quadratic polynomial with real coefficients b and c. Suppose p(1) = 5 and p(-1) = 3. What is the product of the roots of p(x) = 0? [cite: 612, 613]",
            options: [
                "3",
                "-1",
                "2",
                "1"
            ],
            correct: 0 // Option A [cite: 614]
        },
        {
            id: 13,
            text: "Let f : (-1, 2) → R be a differentiable function such that f'(x) = 2/(x² - 5) and f(0) = 0. Then in which of the following intervals does f(1) lie? [cite: 624, 625, 626]",
            options: [
                "(-∞, 0)",
                "(0, 2)",
                "(2, 4)",
                "(4, ∞)"
            ],
            correct: 0 // Option A [cite: 628]
        },
        {
            id: 14,
            text: "Let f(x) = sin(3x), x ∈ [0, π/2]. Which of the following statements is true? [cite: 637, 638]",
            options: [
                "f is decreasing on (π/4, π/2)",
                "f is increasing on (π/4, π/2)",
                "f is increasing on (π/4, π/3) and decreasing on (π/3, π/2)",
                "f is decreasing on (π/4, π/3) and increasing on (π/3, π/2)"
            ],
            correct: 2 // Option C [cite: 644]
        },
        {
            id: 15,
            text: "Which one of the following functions is differentiable at x = 0? [cite: 649]",
            options: [
                "cos |x|",
                "sin |x|",
                "|x|^(1/2)",
                "|x|"
            ],
            correct: 0 // Option A [cite: 650]
        }
    ],
    
    Physics: [
        {
            id: 1,
            text: "A ball is thrown vertically upwards with an initial speed u from a height h above the ground. The ball eventually hits the ground with a speed v. The acceleration due to gravity is g and the air resistance is negligible. What is the average speed of the ball over its entire trajectory? [cite: 661, 662, 663]",
            options: [
                "(u² + v²) / (2(u + v))",
                "(v + u) / 2",
                "gh / (2(u + v))",
                "(u² + gh) / (2(u + v))"
            ],
            correct: 0 // Option A [cite: 665]
        },
        {
            id: 2,
            text: "Two cubes A and B of same dimensions are made of different materials with densities ρₐ and ρᵦ, respectively. Cube A floats in water with a fraction η of its volume immersed. When cube B is placed on top of cube A, it is found that cube A is just entirely immersed, while cube B is entirely above the surface of the water. What is the ratio ρᵦ/ρₐ? [cite: 674, 675, 676, 677]",
            options: [
                "(1 - η)/η",
                "η/(1 - η)",
                "η",
                "1/η"
            ],
            correct: 0 // Option A [cite: 679]
        },
        {
            id: 3,
            text: "An object is placed in front of a convex lens. A real inverted image of double its size is formed. When the object is moved closer to the lens by a distance d, the image shifts away from the lens by a distance 8d from its previous position. What is the magnitude of the magnification in the final setup? [cite: 688, 689, 690]",
            options: [
                "4",
                "1/2",
                "8",
                "16"
            ],
            correct: 0 // Option A [cite: 692]
        },
        {
            id: 4,
            text: "The frequency of the whistle of a train moving with a constant speed is observed by a stationary detector on the platform to be ν₁. The frequency of the same whistle is detected to be ν₂ inside another train moving on a parallel track, at a speed v towards the first train. If the speed of sound in air is taken to be vₛₒᵤₙ𝒹, what is the ratio v/vₛₒᵤₙ𝒹? [cite: 701, 702]",
            options: [
                "(ν₂ - ν₁)/ν₁",
                "(ν₂ - ν₁)/ν₂",
                "ν₂/ν₁",
                "ν₁/ν₂"
            ],
            correct: 0 // Option A [cite: 704]
        },
        {
            id: 5,
            text: "A current I flows through a cylindrical cable of length L and uniform cross-sectional area A. The power dissipated due to the current is P₁. The cable is cut into two equal halves. If the cross-sectional area and the current flowing through the two halves remain unchanged and the power dissipated in each half is P₂, which of the following options is correct? [cite: 713, 714]",
            options: [
                "P₂ = P₁/2",
                "P₂ = 2P₁",
                "P₂ = P₁",
                "P₂ = P₁/4"
            ],
            correct: 0 // Option A [cite: 716]
        },
        {
            id: 6,
            text: "Particle A with charge Q and particle B with charge 2Q are fixed at positions r⃗ₐ and r⃗ᵦ, respectively. The force on A due to B is F⃗ᵦₐ, and that on B due to A is F⃗ₐᵦ. Which of the following options is correct? [cite: 725, 726]",
            options: [
                "F⃗ₐᵦ = -F⃗ᵦₐ",
                "F⃗ₐᵦ = F⃗ᵦₐ",
                "F⃗ₐᵦ = 2F⃗ᵦₐ",
                "F⃗ₐᵦ = -2F⃗ᵦₐ"
            ],
            correct: 0 // Option A [cite: 728]
        },
        {
            id: 7,
            text: "The magnetic flux φᵦ(t) through a coil at a time t is given by φᵦ(t) = φ₀ cos ωt, where 0 ≤ ωt ≤ π and φ₀ is a non-zero constant. At what time is the magnitude of the induced emf a maximum? [cite: 737, 738]",
            options: [
                "π/(2ω)",
                "π/ω",
                "π/(4ω)",
                "0"
            ],
            correct: 0 // Option A [cite: 740]
        },
        {
            id: 8,
            text: "A charged particle is moving in a uniform magnetic field. The magnetic force acting on the particle is always perpendicular to the velocity of the particle. Which of the following statements is correct?",
            options: [
                "The speed of the particle remains constant.",
                "The velocity of the particle remains constant.",
                "The momentum of the particle remains constant.",
                "The kinetic energy of the particle changes."
            ],
            correct: 0
        },
        {
            id: 9,
            text: "The velocity v(t) of a particle moving in one dimension is given by:<br>v(t) = αt (for 0 ≤ t ≤ T/3)<br>v(t) = αT/3 (for T/3 ≤ t ≤ 2T/3)<br>v(t) = α(T-t) (for 2T/3 ≤ t ≤ T)<br>where α(≠0) is a constant. What is the total displacement of the particle from time t=0 to t=T? [cite: 761, 762, 763]",
            options: [
                "2αT²/9",
                "4αT²/9",
                "8αT²/9",
                "7αT²/9"
            ],
            correct: 0 // Option A [cite: 765]
        },
        {
            id: 10,
            text: `[DIAGRAM: Shows two fixed positive charges +q separated by 2L. A third charge +q of mass m is placed equidistant between them and oscillates vertically.]<br><br>
            Two fixed point particles, each of charge +q, are separated by a distance 2L. Another point charge +q of mass m is oscillating about its equilibrium position as indicated in the figure. The time period of oscillation is given by T = 2π³ᐟ²α√m/q. Given that ε₀ is the permittivity of free space, which of the following options is the dimensionally correct expression for α in SI units? [cite: 774, 775, 776]`,
            options: [
                "ε₀¹ᐟ²L³ᐟ²",
                "ε₀¹ᐟ²L",
                "ε₀³ᐟ²L¹ᐟ²",
                "ε₀³ᐟ²L"
            ],
            correct: 0 // Option A [cite: 778]
        },
        {
            id: 11,
            text: `[DIAGRAM: A Wheatstone bridge-like circuit. Four resistors form a diamond shape: Top-Left (R), Top-Right (3R), Bottom-Left (R), Bottom-Right (3R). A central vertical wire has a resistor (2R) and horizontal wire has a resistor (3R).]<br><br>
            What is the effective resistance between A and B in the circuit shown below? [cite: 790]`,
            options: [
                "4R/3",
                "R/3",
                "2R/3",
                "R/6"
            ],
            correct: 0 // Option A [cite: 799]
        },
        {
            id: 12,
            text: `[DIAGRAM: Two spheres A and B of radius R and Mass M separated by distance 4R (center to center). Object C is thrown from surface of A towards B.]<br><br>
            Two spherical bodies A and B each of mass M and radius R are located such that their centers are apart by a distance of 4R. An object C of mass m is thrown from the surface of A directly towards the center of B with a speed v₀ = 2v_min, where v_min is the minimum speed needed for C to reach the surface of B. Given that G is the universal gravitational constant, how does the speed v(x) of C change as a function of its distance from the center of A? [cite: 812, 813, 814]`,
            options: [
                "v(x) = 2√(2GMR) / (x¹ᐟ²(4R-x)¹ᐟ²)",
                "v(x) = 2R√(2GMR) / (x(4R-x))",
                "v(x) = √(GMR) / (x¹ᐟ²(4R-x)¹ᐟ²)",
                "v(x) = 6R²√(2GMR) / (x³ᐟ²(4R-x)³ᐟ²)"
            ],
            correct: 0 // Option A [cite: 821]
        },
        {
            id: 13,
            text: "Consider the Bohr model of an atom where an electron of charge -e revolves around a nucleus of charge +e in an orbit of radius r. The electron has an orbital angular momentum 2h/2π. If the nucleus had charge +2e, what would have been the radius of the orbit of the electron with the same principal quantum number? [cite: 831, 832]",
            options: [
                "r/2",
                "2r",
                "r",
                "√2r"
            ],
            correct: 0 // Option A [cite: 834]
        },
        {
            id: 14,
            text: "A quantity has been measured to have a value of 0.00230 in some units. How many significant figures does the measured value have? [cite: 843, 844]",
            options: [
                "3",
                "5",
                "4",
                "2"
            ],
            correct: 0 // Option A [cite: 845]
        },
        {
            id: 15,
            text: "Consider a Carnot heat engine operating between a heat reservoir at temperature 600 K, and an external atmosphere at temperature 300 K. In one cycle, 1000 kJ of heat is extracted from the heat reservoir, and the associated work is input to a reversible refrigerator that operates between 200 K and the same external atmosphere at 300 K. The refrigerator completes one cycle and releases heat into the atmosphere. How much heat is released into the atmosphere at the end of one cycle of the combined system? [cite: 855, 856, 857]",
            options: [
                "2000 kJ",
                "2500 kJ",
                "1000 kJ",
                "500 kJ"
            ],
            correct: 0 // Option A [cite: 859]
        }
    ]
};

// ----------------------------------------------------------------------------
// 2. STATE MANAGEMENT
// ----------------------------------------------------------------------------
let currentSection = 'Biology';
let currentQuestionIndex = 0;
let answers = {};
let markedForReview = {};
let visited = {};
let timeLeft = 10800; // 3 hours in seconds
let timerInterval = null;
let userName = 'Student';

// ----------------------------------------------------------------------------
// 3. INITIALIZATION & EVENTS
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    // 1. Begin Test Button
    const beginBtn = document.getElementById('beginTestBtn');
    if (beginBtn) {
        beginBtn.addEventListener('click', startExam);
    }

    // 2. Section Navigation Tabs
    document.querySelectorAll('.section-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });

    // 3. Action Buttons (Mark, Clear, Save/Next, Submit)
    const markBtn = document.getElementById('markReviewBtn');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveNextBtn');
    const submitBtn = document.getElementById('submitExamBtn');

    if (markBtn) markBtn.addEventListener('click', toggleMarkForReview);
    if (clearBtn) clearBtn.addEventListener('click', clearResponse);
    if (saveBtn) saveBtn.addEventListener('click', saveAndNext);
    if (submitBtn) submitBtn.addEventListener('click', submitExam);

    // 4. Terms Checkbox Validation
    const agreeTerms = document.getElementById('agreeTerms');
    const beginTestBtn = document.getElementById('beginTestBtn');
    
    if (agreeTerms && beginTestBtn) {
        beginTestBtn.disabled = !agreeTerms.checked;
        agreeTerms.addEventListener('change', function() {
            beginTestBtn.disabled = !this.checked;
        });
    }

    // 5. User Name Input
    const nameInput = document.getElementById('candidateName');
    if (nameInput) {
        nameInput.addEventListener('change', function() {
            userName = this.value || 'Student';
        });
    }
}

// ----------------------------------------------------------------------------
// 4. CORE EXAM LOGIC
// ----------------------------------------------------------------------------

function startExam() {
    const instructionPage = document.getElementById('instructionPage');
    const examInterface = document.getElementById('examInterface');
    
    if (instructionPage) instructionPage.style.display = 'none';
    if (examInterface) examInterface.style.display = 'block';

    // Set user name display
    const userNameEl = document.getElementById('userName');
    if (userNameEl) userNameEl.textContent = userName;

    // Initialize Exam
    loadQuestion();
    updatePalette();
    startTimer();
    updateSectionCounts();
}

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            autoSubmit();
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

function loadQuestion() {
    const questions = questionBank[currentSection];
    const question = questions[currentQuestionIndex];
    const questionKey = `${currentSection}-${currentQuestionIndex}`;

    visited[questionKey] = true;

    // Update Question Number Header
    const qNumEl = document.getElementById('questionNumberDisplay');
    if (qNumEl) qNumEl.textContent = `Question No. ${currentQuestionIndex + 1}`;

    // Update Question Text
    const qTextEl = document.getElementById('questionContent');
    if (qTextEl) {
        qTextEl.innerHTML = `<p class="question-text">${question.text}</p>`;
    }

    // Update Options
    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option-item';
            
            // Highlight selected option
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

    // Update Active Section Title
    const sectionTitleEl = document.getElementById('sectionTitle');
    if (sectionTitleEl) sectionTitleEl.textContent = currentSection;

    updatePalette();
}

function selectAnswer(optionIndex) {
    const questionKey = `${currentSection}-${currentQuestionIndex}`;
    answers[questionKey] = optionIndex;
    
    // Update UI styling for selection
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

function switchSection(section) {
    currentSection = section;
    currentQuestionIndex = 0;
    
    // Update active tab styling
    document.querySelectorAll('.section-tab').forEach(tab => {
        if (tab.getAttribute('data-section') === section) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    loadQuestion();
}

function toggleMarkForReview() {
    const questionKey = `${currentSection}-${currentQuestionIndex}`;
    markedForReview[questionKey] = !markedForReview[questionKey];
    updatePalette();
    saveAndNext();
}

function clearResponse() {
    const questionKey = `${currentSection}-${currentQuestionIndex}`;
    delete answers[questionKey];
    loadQuestion();
    updateSectionCounts();
}

function saveAndNext() {
    const questions = questionBank[currentSection];
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

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
        
        // Determine button color status
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

function submitExam() {
    if (confirm('Are you sure you want to submit the exam? You will not be able to change answers after submission.')) {
        finalizeExam();
    }
}

function autoSubmit() {
    alert('Time is up! Your exam will be submitted automatically.');
    finalizeExam();
}

function finalizeExam() {
    // Stop the timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Disable interactions
    const examInterface = document.getElementById('examInterface');
    if (examInterface) {
        examInterface.querySelectorAll('input, button').forEach(el => el.disabled = true);
        examInterface.style.opacity = '0.5'; // Visual cue
    }

    // Calculate and Show Results
    const results = calculateDetailedScore();
    showResults(results);
}

function calculateDetailedScore() {
    let totalScore = 0;
    let maxScore = 0;
    let sectionBreakdown = {};

    // Standard marking scheme: +4 for correct, -1 for incorrect
    const MARKS_CORRECT = 4;
    const MARKS_WRONG = -1;

    Object.keys(questionBank).forEach(section => {
        const qArr = questionBank[section];
        
        sectionBreakdown[section] = {
            obtained: 0,
            max: qArr.length * MARKS_CORRECT,
            attempted: 0,
            correctCount: 0,
            totalQuestions: qArr.length
        };

        qArr.forEach((q, idx) => {
            maxScore += MARKS_CORRECT;
            const key = `${section}-${idx}`;
            const ans = answers[key];

            if (ans !== undefined && ans !== null) {
                sectionBreakdown[section].attempted++;
                
                if (ans === q.correct) {
                    totalScore += MARKS_CORRECT;
                    sectionBreakdown[section].obtained += MARKS_CORRECT;
                    sectionBreakdown[section].correctCount++;
                } else {
                    // Apply negative marking
                    totalScore += MARKS_WRONG;
                    sectionBreakdown[section].obtained += MARKS_WRONG;
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

function showResults(results) {
    // Hide Exam Interface
    const examInterface = document.getElementById('examInterface');
    if (examInterface) examInterface.style.display = 'none';

    // Show Results Panel
    // If a specific results panel exists, use it. Otherwise, create one dynamically.
    let resultsPanel = document.getElementById('resultsPanel');
    
    if (!resultsPanel) {
        resultsPanel = document.createElement('div');
        resultsPanel.id = 'resultsPanel';
        resultsPanel.style.padding = '20px';
        resultsPanel.style.maxWidth = '800px';
        resultsPanel.style.margin = '20px auto';
        resultsPanel.style.fontFamily = 'Arial, sans-serif';
        document.body.appendChild(resultsPanel);
    }
    
    resultsPanel.style.display = 'block';
    resultsPanel.innerHTML = ''; // Clear previous

    // 1. Header
    const title = document.createElement('h2');
    title.textContent = `Exam Results for ${userName}`;
    title.style.borderBottom = '2px solid #333';
    title.style.paddingBottom = '10px';
    resultsPanel.appendChild(title);

    // 2. Summary
    const summaryDiv = document.createElement('div');
    summaryDiv.style.margin = '20px 0';
    summaryDiv.style.fontSize = '18px';
    summaryDiv.innerHTML = `
        <p><strong>Total Score:</strong> <span style="color: ${results.totalScore >= 0 ? 'green' : 'red'}">${results.totalScore}</span> / ${results.maxScore}</p>
        <p><strong>Status:</strong> Submitted Successfully</p>
    `;
    resultsPanel.appendChild(summaryDiv);

    // 3. Detailed Table
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    table.innerHTML = `
      <thead style="background-color: #f2f2f2;">
        <tr>
          <th style="text-align:left;padding:10px;border:1px solid #ddd;">Section</th>
          <th style="text-align:center;padding:10px;border:1px solid #ddd;">Questions</th>
          <th style="text-align:center;padding:10px;border:1px solid #ddd;">Attempted</th>
          <th style="text-align:center;padding:10px;border:1px solid #ddd;">Correct</th>
          <th style="text-align:right;padding:10px;border:1px solid #ddd;">Score</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    
    const tbody = table.querySelector('tbody');

    Object.keys(results.sectionBreakdown).forEach(sec => {
        const s = results.sectionBreakdown[sec];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding:10px;border:1px solid #ddd;"><strong>${sec}</strong></td>
            <td style="padding:10px;text-align:center;border:1px solid #ddd;">${s.totalQuestions}</td>
            <td style="padding:10px;text-align:center;border:1px solid #ddd;">${s.attempted}</td>
            <td style="padding:10px;text-align:center;border:1px solid #ddd;">${s.correctCount}</td>
            <td style="padding:10px;text-align:right;border:1px solid #ddd;"><strong>${s.obtained}</strong> / ${s.max}</td>
        `;
        tbody.appendChild(tr);
    });

    resultsPanel.appendChild(table);

    // 4. Restart/Close Button
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Close / Finish';
    restartBtn.style.marginTop = '20px';
    restartBtn.style.padding = '10px 20px';
    restartBtn.style.cursor = 'pointer';
    restartBtn.style.backgroundColor = '#4CAF50';
    restartBtn.style.color = 'white';
    restartBtn.style.border = 'none';
    restartBtn.style.borderRadius = '4px';
    
    restartBtn.onclick = function() {
        window.location.reload(); // Or redirect to home
    };
    
    resultsPanel.appendChild(restartBtn);
}

console.log('Exam system initialized successfully!');