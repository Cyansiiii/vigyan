/**
 * Live Test Preview Module
 * Handles test configuration, question selection, and student simulation
 */

const LTPState = {
    selectedTestId: null,
    currentSubject: 'Physics',
    selectedQuestions: new Set(),
    questionsPool: [],
    upcomingTests: [],
    currentPage: 1,
    isFinalizing: false
};

// Initialize the module
async function initLiveTestPreview() {
    console.log('🚀 Initializing Live Test Preview Module...');

    // ✅ CRITICAL FIX: Inject Modal into body ONLY if not already present
    // This MUST be done first because it needs top-level stacking context
    if (!document.getElementById('ltpPreviewModal')) {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'ltp-modal-root';
        modalContainer.innerHTML = `
            <div class="preview-overlay" id="ltpPreviewOverlay" style="display:none;"></div>
            <div class="preview-modal" id="ltpPreviewModal" style="display:none;">
                <div id="ltpPreviewContent" style="height:100%; display:flex; flex-direction:column;"></div>
            </div>
        `;
        document.body.appendChild(modalContainer);
        console.log('✅ Preview modal injected to body root');
    }

    LTPState.selectedQuestions.clear();
    LTPState.selectedTestId = null;

    renderLTPContainer();
    await loadLTPUpcomingTests();
}

// Render the main container structure
function renderLTPContainer() {
    const container = document.getElementById('live-test-preview-page');
    if (!container) return;

    container.innerHTML = `
        <div class="ltp-container">
            <div class="ltp-header">
                <div>
                    <h2 style="margin:0">Live Test Configuration</h2>
                    <p style="margin:5px 0 0; color:#64748b;">Select a test to manage questions and preview perspective</p>
                </div>
                <div class="ltp-actions">
                    <button class="btn btn-secondary" onclick="openLTPPreview()" id="previewBtn" disabled>
                        <i class="fas fa-eye"></i> Student View
                    </button>
                    <button class="btn btn-primary" onclick="finalizeLTPTest()" id="finalizeBtn" disabled>
                        <i class="fas fa-check-double"></i> Finalize Test
                    </button>
                </div>
            </div>

            <div class="ltp-grid">
                <!-- Sidebar: Test List -->
                <div class="ltp-sidebar">
                    <h3 style="font-size:16px; margin-bottom:15px; border-bottom:1px solid #f1f5f9; padding-bottom:10px;">
                        Upcoming Tests
                    </h3>
                    <div id="ltpTestList" class="test-list-container">
                        <div class="loading-spinner">Loading tests...</div>
                    </div>
                </div>

                <!-- Main: Question Selection -->
                <div class="ltp-main" id="ltpQuestionManager" style="display:none;">
                    <div class="ltp-controls">
                        <div class="subject-tabs">
                            <div class="subject-tab active" onclick="switchLTPSubject('Physics')">Physics</div>
                            <div class="subject-tab" onclick="switchLTPSubject('Chemistry')">Chemistry</div>
                            <div class="subject-tab" onclick="switchLTPSubject('Mathematics')">Mathematics</div>
                            <div class="subject-tab" onclick="switchLTPSubject('Biology')">Biology</div>
                        </div>
                        <div style="flex:1"></div>
                        <button class="btn btn-outline" onclick="saveLTPSelection()">
                            <i class="fas fa-save"></i> Save Selection
                        </button>
                    </div>

                    <div class="q-selection-pool">
                        <table class="q-selection-table">
                            <thead>
                                <tr>
                                    <th width="40"><input type="checkbox" onchange="toggleAllLTPQuestions(this)"></th>
                                    <th>Question Text</th>
                                    <th width="100">Type</th>
                                    <th width="80">Marks</th>
                                </tr>
                            </thead>
                            <tbody id="ltpQuestionList">
                                <!-- Questions will load here -->
                            </tbody>
                        </table>
                        <div id="ltpPagination" class="pagination-footer" style="padding:20px 0; display:flex; justify-content:center;"></div>
                    </div>
                </div>

                <!-- Empty State -->
                <div class="ltp-main" id="ltpEmptyState" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; color:#94a3b8;">
                    <div style="font-size:48px; margin-bottom:20px;">🗓️</div>
                    <h3 style="color:#475569">No Test Selected</h3>
                    <p>Select an upcoming test from the sidebar to begin question selection.</p>
                </div>
            </div>
    `;
}

// Load upcoming tests
async function loadLTPUpcomingTests() {
    try {
        const response = await AdminAPI.getLivePreviewUpcomingTests();
        if (response.success) {
            LTPState.upcomingTests = response.data;
            renderLTPTestList();
        }
    } catch (error) {
        console.error('Error loading tests:', error);
    }
}

// Render the sidebar test list
function renderLTPTestList() {
    const list = document.getElementById('ltpTestList');
    if (!list) return;

    if (LTPState.upcomingTests.length === 0) {
        list.innerHTML = '<div style="text-align:center; padding:20px; color:#94a3b8;">No draft tests found</div>';
        return;
    }

    list.innerHTML = LTPState.upcomingTests.map(test => `
        <div class="test-item-card ${LTPState.selectedTestId === test._id ? 'active' : ''}" onclick="selectLTPTest('${test._id}')">
            <div style="font-weight:600; margin-bottom:5px;">${test.test_name}</div>
            <div style="font-size:12px; color:#64748b;">
                <i class="fas fa-calendar-alt"></i> ${new Date(test.exam_date).toLocaleDateString()}
                <span style="margin-left:10px;"><i class="fas fa-clock"></i> ${test.duration} mins</span>
            </div>
            <div style="margin-top:8px;">
                <span class="badge ${test.status === 'draft' ? 'badge-warning' : 'badge-success'}">${test.status.toUpperCase()}</span>
                ${test.isFinalized ? '<span class="badge badge-info">LOCKED</span>' : ''}
            </div>
        </div>
    `).join('');
}

// Select a test
async function selectLTPTest(testId) {
    LTPState.selectedTestId = testId;
    renderLTPTestList();

    // Show manager, hide empty state
    document.getElementById('ltpQuestionManager').style.display = 'block';
    document.getElementById('ltpEmptyState').style.display = 'none';

    // Reset state for new test
    LTPState.selectedQuestions.clear();

    // Load existing questions for this test
    const response = await AdminAPI.getTestQuestions(testId);
    if (response.success) {
        // Pre-select existing questions
        Object.values(response.data.questionsBySubject).forEach(qs => {
            qs.forEach(q => LTPState.selectedQuestions.add(q._id));
        });
    }

    // Enable/disable buttons based on test status
    const test = LTPState.upcomingTests.find(t => t._id === testId);
    document.getElementById('finalizeBtn').disabled = test.isFinalized;
    document.getElementById('previewBtn').disabled = false;

    await loadLTPQuestions();
}

// Load questions for current subject
async function loadLTPQuestions() {
    const list = document.getElementById('ltpQuestionList');
    list.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px;">Loading questions...</td></tr>';

    try {
        const response = await AdminAPI.getQuestionsBySubject(LTPState.currentSubject, LTPState.currentPage);
        if (response.success) {
            LTPState.questionsPool = response.data.questions;
            renderLTPQuestions();
            renderLTPPagination(response.data.pagination);
        }
    } catch (error) {
        list.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:red;">Failed to load questions.</td></tr>';
    }
}

// Render question rows
function renderLTPQuestions() {
    const list = document.getElementById('ltpQuestionList');
    if (!list) return;

    list.innerHTML = LTPState.questionsPool.map(q => `
        <tr onclick="toggleLTPQuestion('${q._id}')" style="cursor:pointer;">
            <td>
                <input type="checkbox" class="q-check" value="${q._id}" 
                    ${LTPState.selectedQuestions.has(q._id) ? 'checked' : ''} 
                    onclick="event.stopPropagation(); toggleLTPQuestion('${q._id}')">
            </td>
            <td>
                <div style="font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:500px;">
                    ${q.questionText.replace(/<[^>]*>/g, '')}
                </div>
            </td>
            <td><span class="badge badge-outline">${(q.type && q.type !== 'undefined') ? q.type : (q.questionType && q.questionType !== 'undefined' ? q.questionType : 'MCQ')}</span></td>
            <td>${q.marks || 4}</td>
        </tr>
    `).join('');
}

// Toggle subject
function switchLTPSubject(subject) {
    LTPState.currentSubject = subject;
    LTPState.currentPage = 1;

    document.querySelectorAll('.subject-tab').forEach(tab => {
        tab.classList.toggle('active', tab.textContent === subject);
    });

    loadLTPQuestions();
}

// Toggle question selection
function toggleLTPQuestion(id) {
    if (LTPState.selectedQuestions.has(id)) {
        LTPState.selectedQuestions.delete(id);
    } else {
        LTPState.selectedQuestions.add(id);
    }
    renderLTPQuestions();
}

// Save selection to backend
async function saveLTPSelection() {
    if (!LTPState.selectedTestId) return;

    // Filter questions by current subject
    const subjectQuestions = LTPState.questionsPool
        .filter(q => LTPState.selectedQuestions.has(q._id))
        .map((q, idx) => ({
            questionId: q._id,
            subject: LTPState.currentSubject,
            questionOrder: idx + 1,
            marks: q.marks,
            negativeMarks: q.negativeMarks
        }));

    try {
        const response = await AdminAPI.addQuestionsToTest(LTPState.selectedTestId, subjectQuestions);
        if (response.success) {
            window.showSuccessNotification('Test questions updated successfully!');
        }
    } catch (error) {
        window.showErrorNotification('Failed to save selection.');
    }
}

// Finalize Test
async function finalizeLTPTest() {
    if (!confirm('Are you sure you want to finalize this test? It will be locked and scheduled for students.')) return;

    try {
        const response = await AdminAPI.finalizeLiveTest(LTPState.selectedTestId);
        if (response.success) {
            window.showSuccessNotification('Test Finalized Successfully!');
            await loadLTPUpcomingTests();
            selectLTPTest(LTPState.selectedTestId);
        }
    } catch (error) {
        window.showErrorNotification(error.message);
    }
}

// --- Preview Perspective (Student View) State ---
let LTPPreviewData = null;
let LTPPreviewState = {
    currentSubjectIdx: 0,
    currentQuestionIdx: 0,
    statusMap: {}, // { questionId: 'not-visited' | 'answered' | 'marked' | 'marked-answered' }
    answersMap: {}, // { questionId: selectedOptionId }
    lastRenderedQuestionId: null, // used to optimize MathJax
    cachedSanitizedText: '' // used to optimize DOMPurify
};

// Open Perspective Preview (Student View)
async function openLTPPreview() {
    const modal = document.getElementById('ltpPreviewModal');
    const overlay = document.getElementById('ltpPreviewOverlay');
    const content = document.getElementById('ltpPreviewContent');

    modal.style.display = 'flex';
    overlay.style.display = 'block';
    content.innerHTML = '<div style="padding:100px; text-align:center; color:white;">Loading Student Perspective...</div>';

    // Lazy-load MathJax on first preview open
    ensureMathJaxLoaded();

    try {
        if (!LTPState.selectedTestId) {
            content.innerHTML = '<div style="padding:100px; text-align:center; color:white;">Error: No test selected! Please select a test first.</div>';
            return;
        }

        const response = await AdminAPI.getTestPreview(LTPState.selectedTestId);
        if (response.success) {
            LTPPreviewData = response.data;
            console.log('DEBUG: LTPPreviewData Loaded:', JSON.parse(JSON.stringify(LTPPreviewData)));

            // Initialize State
            LTPPreviewState.currentSubjectIdx = 0;
            LTPPreviewState.currentQuestionIdx = 0;
            LTPPreviewState.statusMap = {};
            LTPPreviewState.answersMap = {};

            // Default all questions to not-visited
            if (LTPPreviewData.sections) {
                LTPPreviewData.sections.forEach(sec => {
                    if (sec.questions) {
                        sec.questions.forEach(q => {
                            LTPPreviewState.statusMap[q._id] = 'not-visited';
                        });
                    }
                });
            }

            renderStudentPerspective();
        } else {
            console.error('Preview response success is false:', response);
            const msg = (response.message || 'Unknown error').toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
            content.innerHTML = `<div style="padding:100px; text-align:center; color:white;">Failed to load view: ${msg}</div>`;
        }
    } catch (error) {
        console.error('Preview Error:', error);
        const msg = (error.message || 'Unknown error').toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
        content.innerHTML = `<div style="padding:100px; text-align:center; color:white;">Error loading student view: ${msg}</div>`;
    }
}

function renderStudentPerspective() {
    const content = document.getElementById('ltpPreviewContent');
    if (!LTPPreviewData) return;

    if (!LTPPreviewData.sections || LTPPreviewData.sections.length === 0) {
        content.innerHTML = `
            <div style="padding:100px; text-align:center; color:white; background: #0f172a; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <h3 style="margin-bottom: 20px;">No Sections Found</h3>
                <p style="color: #94a3b8; margin-bottom: 30px;">This test does not have any questions or sections assigned to it yet.</p>
                <button class="btn btn-primary" onclick="closeLTPPreview()">Close Preview</button>
            </div>
        `;
        return;
    }

    const currentSection = LTPPreviewData.sections[LTPPreviewState.currentSubjectIdx];
    const currentQuestion = currentSection?.questions ? currentSection.questions[LTPPreviewState.currentQuestionIdx] : null;

    if (!currentQuestion) {
        content.innerHTML = `
            <div style="padding:100px; text-align:center; color:white; background: #0f172a; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <h3 style="margin-bottom: 20px;">No Questions in Section</h3>
                <p style="color: #94a3b8; margin-bottom: 30px;">This section is currently empty.</p>
                <button class="btn btn-primary" onclick="closeLTPPreview()">Close Preview</button>
            </div>
        `;
        return;
    }

    // Abstract security evaluation to helper
    const safeText = getLTPQuestionSafeText(currentQuestion);

    // Update status to visited if not answered
    if (currentQuestion && LTPPreviewState.statusMap[currentQuestion._id] === 'not-visited') {
        LTPPreviewState.statusMap[currentQuestion._id] = 'not-answered';
    }

    content.innerHTML = `
        <div class="student-view-header">
            <div>
                <h4 style="margin:0">${LTPPreviewData.test_name || 'Test Preview'}</h4>
                <div style="font-size:12px; opacity:0.8;">Admin Preview Mode</div>
            </div>
            <div style="text-align:right;">
                <div style="font-family:'Roboto Mono', monospace; font-size:20px;" id="ltpTimer">03:00:00</div>
                <button class="btn btn-sm btn-outline-light" onclick="closeLTPPreview()">Exit Preview</button>
            </div>
        </div>
        <div class="student-view-body" style="background: #0f172a; color: white;">
            <div class="question-area" style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255,255,255,0.1); border-radius:12px;">
                <div style="border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:15px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:700; font-size:18px;">Question ${LTPPreviewState.currentQuestionIdx + 1}</span>
                    <span style="background:rgba(16, 185, 129, 0.2); color:#10b981; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600;">+4 | -1</span>
                </div>
                
                <div class="q-content">
                    <div class="tex2jax_process" style="font-size:16px; line-height:1.6; margin-bottom:25px; color: #f8fafc;">
                        ${safeText}
                    </div>

                    <div class="options-grid" style="display:flex; flex-direction:column; gap:12px; margin-top:30px;">
                        ${(currentQuestion?.options || []).map((opt, i) => {
        const id = String.fromCharCode(65 + i);
        const isSelected = LTPPreviewState.answersMap[currentQuestion._id] === id;
        let text = 'Option Text Missing';

        if (typeof opt === 'string') {
            text = opt;
        } else if (typeof opt === 'object' && opt !== null) {
            text = opt.optionText || opt.text || opt.content || 'Check Data';
        }

        return `
                                <div onclick="selectLTPOption('${id}')" 
                                     style="padding:15px; border:1px solid ${isSelected ? '#3b82f6' : 'rgba(255,255,255,0.1)'}; 
                                            background: ${isSelected ? 'rgba(59, 130, 246, 0.1)' : 'transparent'};
                                            border-radius:8px; display:flex; gap:15px; cursor:pointer;"
                                     class="preview-opt-row">
                                    <div style="width:24px; height:24px; border-radius:50%; border:2px solid ${isSelected ? '#3b82f6' : '#64748b'}; 
                                                display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold;">
                                        ${id}
                                    </div>
                                    <span>${text}</span>
                                </div>
                            `;
    }).join('')}
                    </div>
                </div>

                <div style="margin-top:auto; border-top:1px solid rgba(255,255,255,0.1); padding-top:20px; display:flex; gap:15px;">
                    <button class="btn btn-secondary" onclick="markForReviewLTP()">Mark for Review</button>
                    <button class="btn btn-outline-light" onclick="clearResponseLTP()">Clear Response</button>
                    <div style="flex:1"></div>
                    <button class="btn btn-primary" onclick="saveAndNextLTP()" style="padding: 10px 30px;">Save & Next</button>
                </div>
            </div>

            <div class="student-sidebar" style="background: rgba(15, 23, 42, 0.9); border-left: 1px solid rgba(255,255,255,0.1);">
                <div style="margin-bottom:25px;">
                    <h5 style="margin-bottom:15px; font-size:14px; color:#94a3b8; text-transform:uppercase; letter-spacing:1px;">Subject Sections</h5>
                    <div class="tabs" style="display:flex; flex-direction:column; gap:8px;">
                        ${LTPPreviewData.sections.map((s, idx) => `
                            <div class="subject-tag ${idx === LTPPreviewState.currentSubjectIdx ? 'active' : ''}" 
                                 onclick="switchLTPPreviewSubject(${idx})"
                                 style="padding:10px 15px; border-radius:8px; cursor:pointer; font-size:13px; font-weight:500;
                                        background: ${idx === LTPPreviewState.currentSubjectIdx ? '#3b82f6' : 'rgba(255,255,255,0.05)'};">
                                ${s.subjectName.toUpperCase()}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <h5 style="margin-bottom:15px; font-size:14px; color:#94a3b8; text-transform:uppercase; letter-spacing:1px;">Question Palette</h5>
                <div class="palette-grid" style="display:grid; grid-template-columns:repeat(5, 1fr); gap:10px; padding:10px; background:rgba(0,0,0,0.2); border-radius:8px;">
                    ${currentSection.questions.map((q, i) => {
        const status = LTPPreviewState.statusMap[q._id];
        let bg = '#1e293b'; // not-visited
        let color = '#94a3b8';

        if (status === 'answered') { bg = '#10b981'; color = '#fff'; }
        else if (status === 'not-answered') { bg = '#ef4444'; color = '#fff'; }
        else if (status === 'marked') { bg = '#8b5cf6'; color = '#fff'; }
        else if (status === 'marked-answered') { bg = '#8b5cf6'; color = '#fff'; } // Specific styling for marked-answered often has a dot in real JEE

        const isActive = i === LTPPreviewState.currentQuestionIdx;

        return `
                            <div onclick="jumpToLTPQuestion(${i})" 
                                 style="width:35px; height:35px; background:${bg}; color:${color}; 
                                        border: ${isActive ? '2px solid #3b82f6' : 'none'};
                                        border-radius:4px; display:flex; align-items:center; justify-content:center; 
                                        font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s;">
                                ${i + 1}
                            </div>
                        `;
    }).join('')}
                </div>
                
                <div style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:11px;">
                    <div style="display:flex; align-items:center; gap:5px;"><div style="width:12px; height:12px; background:#10b981; border-radius:2px;"></div> Answered</div>
                    <div style="display:flex; align-items:center; gap:5px;"><div style="width:12px; height:12px; background:#ef4444; border-radius:2px;"></div> Not Answered</div>
                    <div style="display:flex; align-items:center; gap:5px;"><div style="width:12px; height:12px; background:#8b5cf6; border-radius:2px;"></div> Marked</div>
                    <div style="display:flex; align-items:center; gap:5px;"><div style="width:12px; height:12px; background:#1e293b; border-radius:2px;"></div> Not Visited</div>
                </div>
            </div>
        </div>
    `;

    triggerLTPMathJax(currentQuestion?._id);
}

// --- Helper Modules for Clean Architecture ---

function getLTPQuestionSafeText(question) {
    if (!question || !question.questionText) return "No question content found.";

    // Use cached string to avoid re-sanitizing on same question
    if (question._id === LTPPreviewState.lastRenderedQuestionId && LTPPreviewState.cachedSanitizedText) {
        return LTPPreviewState.cachedSanitizedText;
    }

    let safeText = "";
    if (window.DOMPurify) {
        safeText = window.DOMPurify.sanitize(question.questionText);
    } else {
        // DOMPurify loaded with defer, may not be ready yet on first call
        // Basic HTML entity escape as fallback (strips script injection)
        console.warn("DOMPurify not yet loaded, using basic HTML escape.");
        safeText = question.questionText
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    LTPPreviewState.cachedSanitizedText = safeText;
    return safeText;
}

// Lazy-load MathJax only when the preview is actually opened
let _mathJaxLoadPromise = null;
function ensureMathJaxLoaded() {
    if (window.MathJax) return Promise.resolve(); // Already loaded
    if (_mathJaxLoadPromise) return _mathJaxLoadPromise; // Already loading

    _mathJaxLoadPromise = new Promise((resolve) => {
        // Set config before loading the script
        window.MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true
            },
            options: {
                ignoreHtmlClass: 'tex2jax_ignore',
                processHtmlClass: 'tex2jax_process'
            },
            startup: {
                pageReady: () => {
                    console.log('✅ MathJax ready (lazy loaded)');
                    MathJax.startup.defaultReady();
                    resolve();
                }
            }
        };

        const script = document.createElement('script');
        script.id = 'MathJax-script';
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        script.async = true;
        script.onerror = () => {
            console.error('❌ Failed to load MathJax from CDN');
            resolve(); // Don't block on failure
        };
        document.head.appendChild(script);
    });
    return _mathJaxLoadPromise;
}

function triggerLTPMathJax(questionId) {
    // Always try to typeset, just debounce it to prevent freezing
    if (window.MathJax && window.MathJax.typesetPromise) {
        if (LTPPreviewState.typesetTimeout) clearTimeout(LTPPreviewState.typesetTimeout);
        LTPPreviewState.typesetTimeout = setTimeout(() => {
            MathJax.typesetPromise().catch(err => console.error("MathJax error:", err));
        }, 150);
    } else {
        // MathJax not ready yet, retry after it loads
        ensureMathJaxLoaded().then(() => {
            if (window.MathJax && window.MathJax.typesetPromise) {
                setTimeout(() => {
                    MathJax.typesetPromise().catch(err => console.error("MathJax error:", err));
                }, 150);
            }
        });
    }
}

// --- Interactive Navigation Handlers ---

function selectLTPOption(optionId) {
    const section = LTPPreviewData.sections[LTPPreviewState.currentSubjectIdx];
    const question = section.questions[LTPPreviewState.currentQuestionIdx];
    LTPPreviewState.answersMap[question._id] = optionId;
    renderStudentPerspective();
}

function saveAndNextLTP() {
    const section = LTPPreviewData.sections[LTPPreviewState.currentSubjectIdx];
    const question = section.questions[LTPPreviewState.currentQuestionIdx];

    // Set status
    if (LTPPreviewState.answersMap[question._id]) {
        LTPPreviewState.statusMap[question._id] = 'answered';
    } else {
        LTPPreviewState.statusMap[question._id] = 'not-answered';
    }

    // Move to next question or next subject
    if (LTPPreviewState.currentQuestionIdx < section.questions.length - 1) {
        LTPPreviewState.currentQuestionIdx++;
    } else if (LTPPreviewState.currentSubjectIdx < LTPPreviewData.sections.length - 1) {
        LTPPreviewState.currentSubjectIdx++;
        LTPPreviewState.currentQuestionIdx = 0;
    }

    renderStudentPerspective();
}

function markForReviewLTP() {
    const section = LTPPreviewData.sections[LTPPreviewState.currentSubjectIdx];
    const question = section.questions[LTPPreviewState.currentQuestionIdx];

    if (LTPPreviewState.answersMap[question._id]) {
        LTPPreviewState.statusMap[question._id] = 'marked-answered';
    } else {
        LTPPreviewState.statusMap[question._id] = 'marked';
    }

    // Auto-advance
    saveAndNextLTP();
}

function clearResponseLTP() {
    const section = LTPPreviewData.sections[LTPPreviewState.currentSubjectIdx];
    const question = section.questions[LTPPreviewState.currentQuestionIdx];
    delete LTPPreviewState.answersMap[question._id];
    LTPPreviewState.statusMap[question._id] = 'not-answered';
    renderStudentPerspective();
}

function jumpToLTPQuestion(idx) {
    LTPPreviewState.currentQuestionIdx = idx;
    renderStudentPerspective();
}

function switchLTPPreviewSubject(idx) {
    LTPPreviewState.currentSubjectIdx = idx;
    LTPPreviewState.currentQuestionIdx = 0;
    renderStudentPerspective();
}

function closeLTPPreview() {
    document.getElementById('ltpPreviewModal').style.display = 'none';
    document.getElementById('ltpPreviewOverlay').style.display = 'none';
}

function renderLTPPagination(pagination) {
    const footer = document.getElementById('ltpPagination');
    if (!footer) return;

    let html = '';
    if (pagination.totalPages > 1) {
        html = `
        < button class="btn btn-sm btn-outline" ${pagination.currentPage === 1 ? 'disabled' : ''} onclick = "changeLTPPage(${pagination.currentPage - 1})" > Prev</button >
            <span style="margin: 0 15px; font-weight:500;">Page ${pagination.currentPage} of ${pagination.totalPages}</span>
            <button class="btn btn-sm btn-outline" ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''} onclick="changeLTPPage(${pagination.currentPage + 1})">Next</button>
    `;
    }
    footer.innerHTML = html;
}

function changeLTPPage(page) {
    LTPState.currentPage = page;
    loadLTPQuestions();
}

// Helper: Toggle all questions on page
function toggleAllLTPQuestions(checkbox) {
    LTPState.questionsPool.forEach(q => {
        if (checkbox.checked) LTPState.selectedQuestions.add(q._id);
        else LTPState.selectedQuestions.delete(q._id);
    });
    renderLTPQuestions();
}

// Make globally available
window.initLiveTestPreview = initLiveTestPreview;
window.switchLTPSubject = switchLTPSubject;
window.selectLTPTest = selectLTPTest;
window.toggleLTPQuestion = toggleLTPQuestion;
window.saveLTPSelection = saveLTPSelection;
window.finalizeLTPTest = finalizeLTPTest;
window.openLTPPreview = openLTPPreview;
window.closeLTPPreview = closeLTPPreview;
window.changeLTPPage = changeLTPPage;
window.toggleAllLTPQuestions = toggleAllLTPQuestions;

// Student Perspective Functions
window.selectLTPOption = selectLTPOption;
window.saveAndNextLTP = saveAndNextLTP;
window.markForReviewLTP = markForReviewLTP;
window.clearResponseLTP = clearResponseLTP;
window.jumpToLTPQuestion = jumpToLTPQuestion;
window.switchLTPPreviewSubject = switchLTPPreviewSubject;
