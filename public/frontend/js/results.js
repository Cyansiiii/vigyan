/**
 * Results Page - Complete Backend Integration
 * FIXED: 2026-01-25 - Fetching from backend instead of localStorage
 */

let allResults = [];

function initResults() {
    console.log('Initializing Results page...');
    
    const container = document.getElementById('view-results-page');
    if (!container) return;
    
    container.innerHTML = `
        <div class="page-header" style="margin-bottom: 24px;">
            <h2>Test Results</h2>
            <p>View student test results and rankings</p>
        </div>
        
        <div class="table-header">
            <div class="filter-bar">
                <select id="testFilter" class="filter-select">
                    <option value="">All Tests</option>
                    <option value="NEST Mock Test 1">NEST Mock Test 1</option>
                    <option value="IAT Mock Test 1">IAT Mock Test 1</option>
                </select>
                
                <input type="text" id="searchResults" class="search-input" placeholder="Search results...">
            </div>
            
            <button class="export-btn" onclick="exportResults()">
                <i class="fas fa-download"></i> Export
            </button>
        </div>
        
        <div id="resultsTableContainer">
            <div style="text-align: center; padding: 40px; color: #94a3b8;">
                <i class="fas fa-spinner fa-spin" style="font-size: 24px;"></i><br>
                Loading results from database...
            </div>
        </div>
    `;
    
    loadResults();
    document.getElementById('testFilter')?.addEventListener('change', applyFilters);
    document.getElementById('searchResults')?.addEventListener('input', applyFilters);
    
    console.log('✅ Results page initialized');
}

async function loadResults() {
    try {
        console.log('🔄 Fetching results from backend...');
        
        // Check if getAuthHeaders is available (it's in admin-dashboard-v3.js)
        let headers = { 'Content-Type': 'application/json' };
        if (typeof getAuthHeaders === 'function') {
            headers = getAuthHeaders();
        }
        
        // ✅ FIXED: Fetch from backend API with Auth Headers
        const response = await fetch(`${window.API_BASE_URL}/api/admin/results`, {
            method: 'GET',
            headers: headers
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        allResults = data.results || [];
        
        console.log(`✅ Loaded ${allResults.length} results from database`);
        displayResults(allResults);
        
    } catch (error) {
        console.error('❌ Failed to load results:', error);
        
        // Show error message
        const container = document.getElementById('resultsTableContainer');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #ef4444;">
                    <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <p style="font-size: 18px; margin-bottom: 8px;">Failed to load results</p>
                    <p style="font-size: 14px; color: #94a3b8;">${error.message}</p>
                    <button onclick="loadResults()" class="btn-primary" style="margin-top: 20px;">
                        <i class="fas fa-sync"></i> Retry
                    </button>
                </div>
            `;
        }
    }
}

function applyFilters() {
    const testFilter = document.getElementById('testFilter')?.value || '';
    const searchText = document.getElementById('searchResults')?.value.toLowerCase() || '';
    
    let filtered = allResults.filter(r => {
        const matchesTest = !testFilter || (r.testName && r.testName === testFilter) || (r.test_name && r.test_name === testFilter);
        const studentName = r.studentName || r.student_name || '';
        const testName = r.testName || r.test_name || '';
        const matchesSearch = !searchText || 
            studentName.toLowerCase().includes(searchText) || 
            testName.toLowerCase().includes(searchText);
        return matchesTest && matchesSearch;
    });
    
    displayResults(filtered);
}

function displayResults(results) {
    const container = document.getElementById('resultsTableContainer');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="coming-soon" style="text-align: center; padding: 60px 20px; color: #94a3b8;">
                <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                <p style="font-size: 18px;">No results found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Student Name</th>
                    <th>Test Name</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(r => {
                    const rank = r.rank || '-';
                    const studentName = r.studentName || r.student_name || 'Unknown';
                    const testName = r.testName || r.test_name || 'Unknown Test';
                    const score = r.score || 0;
                    const totalMarks = r.totalMarks || r.total_marks || 100;
                    const percentage = r.percentage || Math.round((score / totalMarks) * 100);
                    const date = r.date || r.created_at || new Date().toISOString().split('T')[0];
                    const resultId = r.id || r.result_id;
                    
                    return `
                        <tr>
                            <td><span class="rank-badge">#${rank}</span></td>
                            <td>${studentName}</td>
                            <td>${testName}</td>
                            <td><strong>${score}/${totalMarks}</strong></td>
                            <td><strong>${percentage}%</strong></td>
                            <td>${new Date(date).toLocaleDateString('en-IN')}</td>
                            <td>
                                <button class="action-btn" onclick="viewResult(${resultId})" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

function viewResult(id) {
    const result = allResults.find(r => r.id == id || r.result_id == id);
    if (!result) {
        alert('Result not found');
        return;
    }
    
    const studentName = result.studentName || result.student_name || 'Unknown';
    const testName = result.testName || result.test_name || 'Unknown Test';
    const score = result.score || 0;
    const totalMarks = result.totalMarks || result.total_marks || 100;
    const percentage = result.percentage || Math.round((score / totalMarks) * 100);
    const rank = result.rank || '-';
    const date = result.date || result.created_at || '-';
    
    alert(`Student: ${studentName}\nTest: ${testName}\nScore: ${score}/${totalMarks}\nPercentage: ${percentage}%\nRank: #${rank}\nDate: ${date}`);
}

function exportResults() {
    if (allResults.length === 0) {
        alert('No results to export');
        return;
    }
    
    if (typeof AdminUtils !== 'undefined') {
        AdminUtils.exportToCSV(allResults, 'results.csv');
    } else {
        // Fallback CSV export
        const csv = 'Rank,Student,Test,Score,Percentage,Date\n' +
            allResults.map(r => {
                const rank = r.rank || '-';
                const studentName = r.studentName || r.student_name || 'Unknown';
                const testName = r.testName || r.test_name || 'Unknown Test';
                const score = r.score || 0;
                const totalMarks = r.totalMarks || r.total_marks || 100;
                const percentage = r.percentage || Math.round((score / totalMarks) * 100);
                const date = r.date || r.created_at || '-';
                return `${rank},"${studentName}","${testName}",${score}/${totalMarks},${percentage}%,${date}`;
            }).join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `results-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    }
}

// Check if we are on the results page (but only if explicitly called via navigateTo)
// The dashboard already calls initResults via callPageInit
// if (document.getElementById('view-results-page')) {
//     initResults();
// }

window.initResults = initResults;
window.viewResult = viewResult;
window.exportResults = exportResults;
window.loadResults = loadResults;