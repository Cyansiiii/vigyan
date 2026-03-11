/**
 * Admin Utilities - Enhanced with ALL Functions
 */

const AdminUtils = {
    // Format date
    formatDate(dateString, format = 'long') {
        const date = new Date(dateString);
        if (format === 'short') {
            return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        }
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    },

    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    },

    // Show toast notification
    showToast(message, type = 'success') {
        // Remove existing toast
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();

        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        Object.assign(toast.style, {
            position: 'fixed',
            top: '24px',
            right: '24px',
            padding: '16px 24px',
            background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            zIndex: '10000',
            fontSize: '14px',
            fontWeight: '600',
            animation: 'slideInRight 0.3s ease-out',
            minWidth: '300px'
        });

        document.body.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // Show confirmation modal
    showConfirmModal(message, onConfirm, onCancel = null) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'confirm-modal-overlay';
        modal.innerHTML = `
            <div class="confirm-modal">
                <div class="confirm-modal-header">
                    <i class="fas fa-exclamation-triangle" style="color: #f59e0b; font-size: 48px;"></i>
                </div>
                <div class="confirm-modal-body">
                    <h3>Confirm Action</h3>
                    <p>${message}</p>
                </div>
                <div class="confirm-modal-footer">
                    <button class="btn-secondary" id="confirmCancel">Cancel</button>
                    <button class="btn-primary" id="confirmOk" style="background: #ef4444;">Confirm</button>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .confirm-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10001; animation: fadeIn 0.2s; }
            .confirm-modal { background: white; border-radius: 16px; padding: 32px; max-width: 400px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); animation: scaleIn 0.3s; }
            .confirm-modal-header { text-align: center; margin-bottom: 24px; }
            .confirm-modal-body h3 { font-size: 20px; color: #0f172a; margin-bottom: 12px; text-align: center; }
            .confirm-modal-body p { color: #64748b; text-align: center; line-height: 1.6; }
            .confirm-modal-footer { display: flex; gap: 12px; margin-top: 24px; }
            .confirm-modal-footer button { flex: 1; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Event listeners
        document.getElementById('confirmOk').addEventListener('click', () => {
            modal.remove();
            if (onConfirm) onConfirm();
        });

        document.getElementById('confirmCancel').addEventListener('click', () => {
            modal.remove();
            if (onCancel) onCancel();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                if (onCancel) onCancel();
            }
        });
    },

    // Export to CSV
    exportToCSV(data, filename) {
        if (!data || data.length === 0) {
            this.showToast('No data to export', 'error');
            return;
        }

        // Get headers
        const headers = Object.keys(data[0]);

        // Create CSV content
        let csv = headers.join(',') + '\n';
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                // Escape commas and quotes
                return typeof value === 'string' && (value.includes(',') || value.includes('"'))
                    ? `"${value.replace(/"/g, '""')}"`
                    : value;
            });
            csv += values.join(',') + '\n';
        });

        // Create download link
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        this.showToast('Data exported successfully!', 'success');
    },

    showEditModal(title, fields, onSave) {
        const modal = document.createElement('div');
        modal.className = 'confirm-modal-overlay';

        const fieldsGridHTML = `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">` + fields.map(field => {
            const value = field.value !== undefined ? field.value : '';
            const isFullWidth = field.type === 'textarea' || field.fullWidth ? 'grid-column: 1 / -1;' : '';
            if (field.type === 'select') {
                return `
                    <div style="${isFullWidth}">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #334155; font-size: 13px;">${field.label}</label>
                        <select class="form-input" id="edit_${field.key}" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                            ${field.options.map(opt => `<option value="${opt}" ${opt === value ? 'selected' : ''}>${opt}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else if (field.type === 'textarea') {
                return `
                    <div style="${isFullWidth}">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #334155; font-size: 13px;">${field.label}</label>
                        <textarea class="form-input" id="edit_${field.key}" rows="4" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; resize: vertical; font-size: 14px; font-family: inherit;">${value}</textarea>
                    </div>
                `;
            } else {
                return `
                    <div style="${isFullWidth}">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #334155; font-size: 13px;">${field.label}</label>
                        <input type="${field.type || 'text'}" class="form-input" id="edit_${field.key}" value="${value}" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                    </div>
                `;
            }
        }).join('') + `</div>`;

        modal.innerHTML = `
            <div class="confirm-modal" style="max-width: 800px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="confirm-modal-header" style="padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; margin-bottom: 0;">
                    <h3 style="font-size: 20px; color: #0f172a; margin: 0; text-align: left;">${title}</h3>
                </div>
                <div class="confirm-modal-body" style="text-align: left; padding: 24px 0; overflow-y: auto; flex: 1;">
                    ${fieldsGridHTML}
                </div>
                <div class="confirm-modal-footer" style="padding-top: 16px; border-top: 1px solid #e2e8f0; margin-top: 0;">
                    <button class="btn-secondary" id="editCancel">Cancel</button>
                    <button class="btn-primary" id="editSave"><i class="fas fa-save"></i> Save Changes</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('editSave').addEventListener('click', () => {
            const updatedData = {};
            fields.forEach(field => {
                updatedData[field.key] = document.getElementById(`edit_${field.key}`).value;
            });
            modal.remove();
            if (onSave) onSave(updatedData);
        });

        document.getElementById('editCancel').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9).toUpperCase();
    },

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validate phone
    validatePhone(phone) {
        const re = /^[6-9]\d{9}$/;
        return re.test(phone);
    }
};

window.AdminUtils = AdminUtils;