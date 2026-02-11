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
        </div>

        <!-- Preview Modal -->
        <div class="preview-overlay" id="ltpPreviewOverlay"></div>
        <div class="preview-modal" id="ltpPreviewModal">
            <div id="ltpPreviewContent" style="height:100%; display:flex; flex-direction:column;"></div>
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
            <td><span class="badge badge-outline">${q.questionType}</span></td>
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

// Open Perspective Preview (Student View)
async function openLTPPreview() {
    const modal = document.getElementById('ltpPreviewModal');
    const overlay = document.getElementById('ltpPreviewOverlay');
    const content = document.getElementById('ltpPreviewContent');

    modal.style.display = 'flex';
    overlay.style.display = 'block';

    content.innerHTML = '<div style="padding:100px; text-align:center;">Loading Preview...</div>';

    try {
        const response = await AdminAPI.getTestPreview(LTPState.selectedTestId);
        if (response.success) {
            const test = response.data;
            renderStudentPerspective(test);
        }
    } catch (error) {
        content.innerHTML = '<div style="padding:100px; text-align:center;">Error loading preview.</div>';
    }
}

function renderStudentPerspective(test) {
    const content = document.getElementById('ltpPreviewContent');

    content.innerHTML = `
        <div class="student-view-header">
            <div>
                <h4 style="margin:0">${test.test_name}</h4>
                <div style="font-size:12px; opacity:0.8;">Admin Preview Mode</div>
            </div>
            <div style="text-align:right;">
                <div style="font-family:'Roboto Mono', monospace; font-size:20px;">03:00:00</div>
                <button class="btn btn-sm btn-outline-light" onclick="closeLTPPreview()">Exit Preview</button>
            </div>
        </div>
        <div class="student-view-body">
            <div class="question-area">
                <div style="border-bottom:1px solid #eee; padding-bottom:15px; margin-bottom:20px; display:flex; justify-content:space-between;">
                    <span style="font-weight:700;">Question 1</span>
                    <span style="color:#10b981; font-weight:600;">+4 | -1</span>
                </div>
                <div class="q-content">
                    <p>${test.sections[0]?.questions[0]?.questionText || 'No questions selected yet.'}</p>
                    <div class="options-grid" style="display:flex; flex-direction:column; gap:12px; margin-top:30px;">
                        ${test.sections[0]?.questions[0]?.options.map(opt => `
                            <div style="padding:15px; border:1px solid #e2e8f0; border-radius:8px; display:flex; gap:10px; cursor:pointer;">
                                <span style="font-weight:700;">${opt.optionId}.</span>
                                <span>${opt.optionText}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div style="margin-top:50px; border-top:1px solid #eee; padding-top:20px; display:flex; gap:15px;">
                    <button class="btn btn-secondary">Mark for Review</button>
                    <button class="btn btn-outline">Clear Response</button>
                    <div style="flex:1"></div>
                    <button class="btn btn-primary">Save & Next</button>
                </div>
            </div>
            <div class="student-sidebar">
                <div style="margin-bottom:25px;">
                    <h5 style="margin-bottom:10px;">Subjects</h5>
                    <div class="tabs" style="display:flex; flex-wrap:wrap; gap:5px;">
                        ${test.sections.map(s => `<span class="badge badge-primary">${s.subjectName}</span>`).join('')}
                    </div>
                </div>
                <h5 style="margin-bottom:15px;">Question Palette</h5>
                <div class="palette-grid" style="display:grid; grid-template-columns:repeat(5, 1fr); gap:8px;">
                    ${Array.from({ length: 60 }, (_, i) => `<div style="width:35px; height:35px; background:white; border:1px solid #ddd; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:12px;">${i + 1}</div>`).join('')}
                </div>
            </div>
        </div>
    `;
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
            <button class="btn btn-sm btn-outline" ${pagination.currentPage === 1 ? 'disabled' : ''} onclick="changeLTPPage(${pagination.currentPage - 1})">Prev</button>
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
