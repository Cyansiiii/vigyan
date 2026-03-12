/**
 * Add Questions Page V2 - Complete Admin to Student Flow
 * Properly integrates with exam structure (IISER/ISI/NEST + Year + Subject)
 * Created: 2025-12-30
 * Updated: 2026-02-14 - Complete refactor with Sticky Config, Numeric IDs, and Standardized Marks
 */

const STICKY_KEYS = ['examType', 'examYear', 'paperType', 'subject'];

function initAddQuestions() {
    console.log('🚀 Initializing Add Questions V2 page...');

    const container = document.getElementById('add-questions-page');
    if (!container) {
        console.error('❌ add-questions-page container not found');
        return;
    }

    container.innerHTML = `
        <div class="page-header">
            <h2><i class="fas fa-plus-circle"></i> Add New Question</h2>
            <p>Add questions to your question bank for student exams</p>
        </div>
        
        <div class="form-container" style="max-width: 1000px; margin: 0 auto;">
            <form id="addQuestionForm" style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                
                <!-- Exam Configuration -->
                <div class="form-section">
                    <h3 style="margin-bottom: 20px; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-cog" style="color: #6366f1;"></i> 
                        Exam Configuration
                    </h3>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="examType">Exam Type *</label>
                            <select id="examType" required class="form-input">
                                <option value="">Select Exam</option>
                                <option value="IISER">IISER IAT</option>
                                <option value="ISI">ISI UG (B.Stat/B.Math)</option>
                                <option value="NEST">NEST</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="examYear">Year *</label>
                            <select id="examYear" required class="form-input">
                                <option value="">Select Year</option>
                                <option value="2027">2027</option>
                                <option value="2026" selected>2026</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="paperTypeGroup" style="display: none;">
                            <label for="paperType">Paper Type (ISI Only)</label>
                            <select id="paperType" class="form-input">
                                <option value="">Not Applicable</option>
                                <option value="A">Paper A (MCQ)</option>
                                <option value="B">Paper B (Subjective)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style="background: #f0f9ff; border: 2px solid #0284c7; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                            <i class="fas fa-info-circle" style="color: #0284c7; font-size: 20px;"></i>
                            <strong style="color: #0c4a6e;">Generated Test ID:</strong>
                        </div>
                        <div id="testIdPreview" style="font-size: 24px; font-weight: bold; color: #0284c7; font-family: monospace;">
                            Select exam type
                        </div>
                    </div>
                </div>
                
                <!-- Question Details -->
                <div class="form-section" style="margin-top: 24px;">
                    <h3 style="margin-bottom: 20px; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-list-ol" style="color: #10b981;"></i> 
                        Question Details
                    </h3>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="subject">Subject *</label>
                            <select id="subject" required class="form-input">
                                <option value="">Select Subject</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Biology">Biology</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="questionType">Question Type *</label>
                            <select id="questionType" required class="form-input">
                                <option value="">Select Type</option>
                                <option value="MCQ">MCQ (Multiple Choice)</option>
                                <option value="MSQ">MSQ (Multi-Select)</option>
                                <option value="Numerical">Numerical (Integer/Decimal)</option>
                                <option value="TrueFalse">True/False</option>
                                <option value="Descriptive">Descriptive (ISI Paper B)</option>
                            </select>
                        </div>
                        
                        <div class="form-group" style="display: flex; gap: 10px;">
                            <div style="flex: 1;">
                                <label for="marksPositive">Marks (+)</label>
                                <input type="number" id="marksPositive" required class="form-input" value="4">
                            </div>
                            <div style="flex: 1;">
                                <label for="marksNegative">Marks (-)</label>
                                <input type="number" id="marksNegative" required class="form-input" value="-1">
                            </div>
                        </div>
                    </div>

                    <div class="form-row" style="display: none;" id="extraFieldsRow">
                        <div class="form-group" id="numericAnswerGroup">
                            <label for="correctNumericAnswer">Correct Numeric Answer *</label>
                            <input type="number" id="correctNumericAnswer" class="form-input" step="any" placeholder="e.g. 10.5">
                        </div>
                        <div class="form-group" id="numericToleranceGroup">
                            <label for="numericTolerance">Tolerance (+/-)</label>
                            <input type="number" id="numericTolerance" class="form-input" value="0" step="any">
                        </div>
                        <div class="form-group" id="questionNumberGroup">
                            <label for="questionNumber">Force Number (Optional)</label>
                            <input type="number" id="questionNumber" class="form-input" placeholder="0 = Auto">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="questionText">Question Content (HTML Supported) *</label>
                        <textarea id="questionText" required class="form-input" style="height: 150px;" placeholder="Type your question here..."></textarea>
                    </div>

                    <!-- Question Diagram Upload -->
                    <div class="form-group" style="margin-top: 16px; padding: 16px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px;">
                        <label for="questionImage" style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-image" style="color: #6366f1;"></i> 
                            Question Diagram (Optional)
                        </label>
                        <div style="display: flex; gap: 16px; align-items: center;">
                            <input type="file" id="questionImage" class="form-input" accept="image/*" style="flex: 1;" onchange="handleImageUpload(event)">
                            <div id="imagePreviewContainer" style="display: none; position: relative;">
                                <img id="imagePreview" src="" alt="Preview" style="max-height: 80px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <button type="button" onclick="clearImageUpload()" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; border: none; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center;">&times;</button>
                            </div>
                        </div>
                        <input type="hidden" id="imageUrl" value="">
                        <small id="uploadStatus" style="color: #64748b; margin-top: 8px; display: block;">Upload a diagram if needed</small>
                    </div>
                </div>
                
                <!-- Options (MCQ) -->
                <div class="form-section" id="mcqOptions">
                    <h3 style="margin-bottom: 20px; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-check-square" style="color: #8b5cf6;"></i> 
                        Answer Options
                    </h3>
                    
                    <div style="display: grid; gap: 16px;">
                        ${['A', 'B', 'C', 'D'].map(opt => `
                        <div class="form-group" style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;" id="option${opt}Container">
                            <label for="option${opt}">Option ${opt} *</label>
                            <input type="text" id="option${opt}" class="form-input" style="margin-bottom: 12px;">
                            <label for="option${opt}Image" style="display: flex; align-items: center; gap: 8px; font-weight: normal; font-size: 13px;">
                                <i class="fas fa-image" style="color: #6366f1;"></i> Option ${opt} Image (Optional)
                            </label>
                            <div style="display: flex; gap: 12px; align-items: center;">
                                <input type="file" id="option${opt}Image" class="form-input" accept="image/*" style="flex: 1; padding: 6px; font-size: 13px;" onchange="handleOptionImageUpload(event, '${opt}')">
                                <div id="option${opt}PreviewContainer" style="display: none; position: relative;">
                                    <img id="option${opt}Preview" src="" alt="Preview" style="max-height: 40px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                    <button type="button" onclick="clearOptionImageUpload('${opt}')" style="position: absolute; top: -6px; right: -6px; background: #ef4444; color: white; border: none; border-radius: 50%; width: 18px; height: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px;">&times;</button>
                                </div>
                            </div>
                            <input type="hidden" id="option${opt}Url" value="">
                            <small id="option${opt}UploadStatus" style="color: #64748b; margin-top: 4px; display: block; font-size: 11px;"></small>
                        </div>
                        `).join('')}
                    </div>
                    
                    <div class="form-group" style="margin-top: 20px;" id="correctAnswerGroup">
                        <label for="correctAnswer">Correct Answer *</label>
                        <select id="correctAnswer" class="form-input">
                            <option value="">Select correct answer</option>
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                            <option value="D">Option D</option>
                        </select>
                    </div>

                    <div class="form-group" style="margin-top: 20px; display: none;" id="msqCorrectAnswersGroup">
                        <label style="display: block; margin-bottom: 12px; font-weight: 600;">Correct Answers (Select all that apply) *</label>
                        <div style="display: flex; gap: 20px; background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                            ${['A', 'B', 'C', 'D'].map(opt => `
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 500;">
                                    <input type="checkbox" name="msqCorrect" value="${opt}" style="width: 18px; height: 18px;">
                                    Option ${opt}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Submit Buttons -->
                <div style="margin-top: 32px; display: flex; gap: 12px; justify-content: flex-end; padding-top: 24px; border-top: 2px solid #e2e8f0;">
                    <button type="button" id="resetBtn" class="btn-secondary" onclick="resetForm()">
                        <i class="fas fa-redo"></i> Reset Form
                    </button>
                    <button type="submit" id="submitQuestionBtn" class="btn-primary">
                        <i class="fas fa-plus"></i> Add Question
                    </button>
                </div>
            </form>
        </div>
        
        <style>
            .form-section { border-bottom: 2px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 24px; }
            .form-section:last-child { border-bottom: none; }
            .form-group { margin-bottom: 16px; }
            .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #334155; font-size: 14px; }
            .form-input { width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px; transition: all 0.3s; font-family: inherit; }
            .form-input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); }
            .btn-primary { padding: 12px 24px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; }
            .btn-primary:hover { background: #4f46e5; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4); }
            .btn-secondary { padding: 12px 24px; background: #f1f5f9; color: #475569; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; }
            .spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid #ffffff; border-top-color: transparent; border-radius: 50%; animation: spin 0.6s linear infinite; }
            @keyframes spin { to { transform: rotate(360deg); } }
        </style>
    `;

    setupEventListeners();
    restoreStickyConfig();
}

function setupEventListeners() {
    const form = document.getElementById('addQuestionForm');
    if (!form) return;

    STICKY_KEYS.forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            el.addEventListener('change', () => {
                localStorage.setItem(`sticky_${key}`, el.value);
                if (key === 'examType') handleExamTypeChange();
                updateTestIdPreview();
            });
        }
    });

    form.addEventListener('submit', handleFormSubmit);

    document.getElementById('questionType')?.addEventListener('change', handleTypeChange);

    // Draft creation trigger fields
    ['examType', 'examYear', 'paperType', 'subject'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', triggerDraftCreation);
    });
}

function handleTypeChange() {
    const type = document.getElementById('questionType').value;
    const mcqOptionsGroup = document.getElementById('mcqOptions');
    const extraFieldsRow = document.getElementById('extraFieldsRow');
    const numericGroup = document.getElementById('numericAnswerGroup');
    const toleranceGroup = document.getElementById('numericToleranceGroup');

    const msqCorrectGroup = document.getElementById('msqCorrectAnswersGroup');
    const singleCorrectGroup = document.getElementById('correctAnswerGroup');

    if (type === 'MCQ' || type === 'MSQ' || type === 'TrueFalse') {
        mcqOptionsGroup.style.display = 'block';
        extraFieldsRow.style.display = 'none';

        if (type === 'MSQ') {
            msqCorrectGroup.style.display = 'block';
            singleCorrectGroup.style.display = 'none';
        } else {
            msqCorrectGroup.style.display = 'none';
            singleCorrectGroup.style.display = 'block';
        }

        // Adjust for True/False
        if (type === 'TrueFalse') {
            document.getElementById('optionA').value = 'True';
            document.getElementById('optionB').value = 'False';

            const optC = document.getElementById('optionC');
            const optD = document.getElementById('optionD');

            optC.required = false;
            optD.required = false;
            optC.value = '';
            optD.value = '';

            document.getElementById('optionCContainer').style.display = 'none';
            document.getElementById('optionDContainer').style.display = 'none';
        } else {
            document.getElementById('optionC').required = true;
            document.getElementById('optionD').required = true;
            document.getElementById('optionCContainer').style.display = 'block';
            document.getElementById('optionDContainer').style.display = 'block';
        }
    } else {
        mcqOptionsGroup.style.display = 'none';
        extraFieldsRow.style.display = 'grid';
        if (type === 'Numerical') {
            numericGroup.style.display = 'block';
            toleranceGroup.style.display = 'block';
        } else {
            numericGroup.style.display = 'none';
            toleranceGroup.style.display = 'none';
        }
    }
}

let activeDraftId = null;

async function triggerDraftCreation() {
    const examType = document.getElementById('examType').value;
    const examYear = document.getElementById('examYear').value;
    const subject = document.getElementById('subject').value;
    const questionType = document.getElementById('questionType').value;

    if (!examType || !examYear || !subject || !questionType) return;

    const testId = document.getElementById('testIdPreview').textContent;
    const type = document.getElementById('questionType').value;

    try {
        const result = await window.AdminAPI.request('/api/admin/questions/draft', {
            method: 'POST',
            body: JSON.stringify({ testId, section: subject, questionType: type })
        });

        if (result.success) {
            activeDraftId = result.id;
            console.log('📝 Draft created with ID:', activeDraftId);
            const preview = document.getElementById('testIdPreview');
            preview.innerHTML = `${testId} <br><small style="color: #64748b;">Draft ID: ${activeDraftId}</small>`;
        }
    } catch (err) {
        console.error('❌ Draft creation failed:', err);
    }
}

function handleExamTypeChange() {
    const examType = document.getElementById('examType').value;
    const paperGroup = document.getElementById('paperTypeGroup');
    if (examType === 'ISI') {
        paperGroup.style.display = 'block';
    } else {
        paperGroup.style.display = 'none';
        document.getElementById('paperType').value = '';
        localStorage.setItem('sticky_paperType', '');
    }
}

function updateTestIdPreview() {
    const examType = document.getElementById('examType').value;
    const examYear = document.getElementById('examYear').value;
    const paperType = document.getElementById('paperType').value;
    const preview = document.getElementById('testIdPreview');

    if (!examType || !examYear) {
        preview.textContent = 'Select exam type';
        return;
    }

    let testId = `${examType}_${examYear}`;
    if (examType === 'ISI' && paperType) testId += `_${paperType}`;
    preview.textContent = testId;
}

function restoreStickyConfig() {
    STICKY_KEYS.forEach(key => {
        const saved = localStorage.getItem(`sticky_${key}`);
        const el = document.getElementById(key);
        if (saved && el) el.value = saved;
    });
    handleExamTypeChange();
    updateTestIdPreview();
}

function buildQuestionPayload() {
    const type = document.getElementById('questionType').value;
    const qNrInput = document.getElementById('questionNumber').value;
    const payload = {
        testId: document.getElementById('testIdPreview').textContent.trim().split(/\s+/)[0],
        questionNumber: parseInt(document.getElementById('questionNumber').value) || 0,
        questionText: document.getElementById('questionText').value.trim(),
        questionType: type,
        section: document.getElementById('subject').value,
        marksPositive: parseInt(document.getElementById('marksPositive').value),
        marksNegative: parseInt(document.getElementById('marksNegative').value),
        imageUrl: document.getElementById('imageUrl').value || null,
        status: 'approved'
    };

    if (type === 'MCQ' || type === 'MSQ' || type === 'TrueFalse') {
        const buildOpt = (letter) => {
            const text = document.getElementById('option' + letter).value.trim();
            const url = document.getElementById('option' + letter + 'Url').value.trim();
            // Provide consistent object format for questions
            return { text: text, imageUrl: url || null };
        };

        payload.options = [ buildOpt('A'), buildOpt('B') ];
        if (type === 'MCQ' || type === 'MSQ') {
            payload.options.push(buildOpt('C'));
            payload.options.push(buildOpt('D'));
        }

        if (type === 'MSQ') {
            const checked = Array.from(document.querySelectorAll('input[name="msqCorrect"]:checked')).map(cb => cb.value);
            payload.correctAnswer = checked; // Send as array
        } else {
            payload.correctAnswer = document.getElementById('correctAnswer').value;
        }
    } else if (type === 'Numerical') {
        payload.correctNumericAnswer = parseFloat(document.getElementById('correctNumericAnswer').value);
        payload.numericTolerance = parseFloat(document.getElementById('numericTolerance').value) || 0;
    }
    return payload;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submitQuestionBtn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner"></div> Saving...';

    try {
        const payload = buildQuestionPayload();

        const endpoint = activeDraftId ? `/api/admin/questions/${activeDraftId}` : '/api/admin/questions';
        const method = activeDraftId ? 'PUT' : 'POST';

        const result = await window.AdminAPI.request(endpoint, {
            method: method,
            body: JSON.stringify(payload)
        });

        if (result.success) {
            window.AdminUtils.showToast('✅ Question Added Successfully', 'success');
            activeDraftId = null; // Reset draft ID for next question

            // Clear only content
            ['questionText', 'optionA', 'optionB', 'optionC', 'optionD', 'correctAnswer', 'imageUrl', 'correctNumericAnswer', 'numericTolerance'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
            ['A', 'B', 'C', 'D'].forEach(letter => clearOptionImageUpload(letter));
            
            clearImageUpload();
            updateTestIdPreview(); // Refresh to remove "Draft ID:" text
            // Increment question number
            const qNr = document.getElementById('questionNumber');
            const serverQNr = result.questionNumber;
            if (serverQNr) {
                qNr.value = serverQNr + 1;
            } else {
                const currentNum = parseInt(qNr.value) || 0;
                if (currentNum > 0) qNr.value = currentNum + 1;
            }
            // if it was 0/auto, backend already assigned one, but frontend stays 0 for next auto
        } else {
            throw new Error(result.error || 'Failed to add question');
        }
    } catch (err) {
        window.AdminUtils.showToast(err.message, 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
}

window.handleImageUpload = async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusText = document.getElementById('uploadStatus');
    const preview = document.getElementById('imagePreview');
    const container = document.getElementById('imagePreviewContainer');
    const urlField = document.getElementById('imageUrl');

    try {
        statusText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> signing...';
        const auth = await window.AdminAPI.request('/api/admin/gateway/sign-upload');
        if (!auth.success) throw new Error('Sign failed');

        statusText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> uploading...';
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('https://vigyanprep.com/api/upload-question-image.php', {
            method: 'POST',
            headers: {
                'X-Upload-Signature': auth.signature,
                'X-Upload-Timestamp': auth.timestamp
            },
            body: formData
        });

        const res = await response.json();
        if (res.success) {
            urlField.value = res.url;
            preview.src = res.url;
            container.style.display = 'block';
            statusText.innerHTML = '<i class="fas fa-check" style="color:green"></i> Uploaded';
        } else throw new Error(res.error);
    } catch (err) {
        statusText.innerHTML = '<i class="fas fa-times" style="color:red"></i> ' + err.message;
    }
};

window.handleOptionImageUpload = async function (event, optionLetter) {
    const file = event.target.files[0];
    if (!file) return;

    const statusText = document.getElementById(`option${optionLetter}UploadStatus`);
    const preview = document.getElementById(`option${optionLetter}Preview`);
    const container = document.getElementById(`option${optionLetter}PreviewContainer`);
    const urlField = document.getElementById(`option${optionLetter}Url`);

    try {
        statusText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> signing...';
        const auth = await window.AdminAPI.request('/api/admin/gateway/sign-upload');
        if (!auth.success) throw new Error('Sign failed');

        statusText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> uploading...';
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('https://vigyanprep.com/api/upload-question-image.php', {
            method: 'POST',
            headers: {
                'X-Upload-Signature': auth.signature,
                'X-Upload-Timestamp': auth.timestamp
            },
            body: formData
        });

        const res = await response.json();
        if (res.success) {
            urlField.value = res.url;
            preview.src = res.url;
            container.style.display = 'block';
            statusText.innerHTML = '<i class="fas fa-check" style="color:green"></i> Uploaded';
        } else throw new Error(res.error);
    } catch (err) {
        statusText.innerHTML = '<i class="fas fa-times" style="color:red"></i> ' + err.message;
    }
};

window.clearImageUpload = function () {
    document.getElementById('questionImage').value = '';
    document.getElementById('imageUrl').value = '';
    document.getElementById('imagePreview').src = '';
    document.getElementById('imagePreviewContainer').style.display = 'none';
    document.getElementById('uploadStatus').textContent = 'Upload a diagram if needed';
};

window.clearOptionImageUpload = function(optionLetter) {
    const fileInput = document.getElementById(`option${optionLetter}Image`);
    const urlField = document.getElementById(`option${optionLetter}Url`);
    const preview = document.getElementById(`option${optionLetter}Preview`);
    const container = document.getElementById(`option${optionLetter}PreviewContainer`);
    const statusText = document.getElementById(`option${optionLetter}UploadStatus`);
    
    if (fileInput) fileInput.value = '';
    if (urlField) urlField.value = '';
    if (preview) preview.src = '';
    if (container) container.style.display = 'none';
    if (statusText) statusText.textContent = '';
};

window.resetForm = function () {
    if (confirm('Clear form content?')) {
        ['questionText', 'optionA', 'optionB', 'optionC', 'optionD', 'correctAnswer', 'imageUrl', 'questionNumber'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        clearImageUpload();
        ['A', 'B', 'C', 'D'].forEach(letter => clearOptionImageUpload(letter));
        
        if (confirm('Also clear Sticky Config?')) {
            STICKY_KEYS.forEach(k => localStorage.removeItem(`sticky_${k}`));
            location.reload();
        }
    }
};

// Export to window
window.initAddQuestions = initAddQuestions;