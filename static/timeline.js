/* All timeline-related JavaScript from form.html */
// Timeline table functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add row functionality
    document.getElementById('add-row').addEventListener('click', function() {
        const tbody = document.getElementById('timeline-body');
        const newRow = document.createElement('tr');
        const headers = document.querySelectorAll('#timeline-header th:not(.action-column)');
        
        headers.forEach((header, index) => {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `timeline[${tbody.children.length}][${header.textContent.toLowerCase()}]`;
            td.appendChild(input);
            newRow.appendChild(td);
        });
        
        // Add delete button cell
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.className = 'delete-row';
        deleteButton.onclick = function() {
            this.closest('tr').remove();
        };
        deleteCell.appendChild(deleteButton);
        newRow.appendChild(deleteCell);
        
        tbody.appendChild(newRow);
    });

    // Add column functionality
    document.getElementById('add-column').addEventListener('click', function() {
        const input = document.getElementById('new_column_name');
        const name = input.value.trim();
        if (!name) return;

        // Add header
        const header = document.getElementById('timeline-header');
        const newTh = document.createElement('th');
        newTh.innerHTML = `
            <div class="column-header">
                ${name}
                <span class="delete-column" onclick="removeColumn(this)">⛔</span>
            </div>
        `;
        newTh.draggable = true;
        
        // Insert before the action column (last column)
        const actionColumn = header.querySelector('.action-column');
        header.insertBefore(newTh, actionColumn);

        // Add input field to each row
        const rows = document.getElementById('timeline-body').children;
        Array.from(rows).forEach((row, rowIndex) => {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `timeline[${rowIndex}][${name.toLowerCase()}]`;
            td.appendChild(input);
            
            // Insert before the delete button cell
            const deleteCell = row.lastElementChild;
            row.insertBefore(td, deleteCell);
        });

        input.value = '';
    });

    // Make headers draggable for reordering
    const headers = document.querySelectorAll('#timeline-header th[draggable="true"]');
    headers.forEach(header => {
        header.addEventListener('dragstart', handleDragStart);
        header.addEventListener('dragover', handleDragOver);
        header.addEventListener('drop', handleDrop);
    });
});

// Drag and drop functionality
let draggedHeader = null;

function handleDragStart(e) {
    draggedHeader = this;
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedHeader !== this) {
        const allHeaders = Array.from(draggedHeader.parentNode.children);
        const draggedIndex = allHeaders.indexOf(draggedHeader);
        const droppedIndex = allHeaders.indexOf(this);

        // Reorder headers
        if (draggedIndex < droppedIndex) {
            this.parentNode.insertBefore(draggedHeader, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedHeader, this);
        }

        // Reorder columns in each row
        const rows = document.getElementById('timeline-body').children;
        Array.from(rows).forEach(row => {
            const cells = Array.from(row.children);
            const draggedCell = cells[draggedIndex];
            const droppedCell = cells[droppedIndex];
            
            if (draggedIndex < droppedIndex) {
                row.insertBefore(draggedCell, droppedCell.nextSibling);
            } else {
                row.insertBefore(draggedCell, droppedCell);
            }
        });
    }
    
    return false;
}

function removeColumn(element) {
    const th = element.closest('th');
    const table = th.closest('table');
    const index = Array.from(th.parentNode.children).indexOf(th);
    
    // Remove header
    th.remove();
    
    // Remove corresponding cell from each row
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells[index]) {
            cells[index].remove();
        }
    });
} 