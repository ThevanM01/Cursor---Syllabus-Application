// Test data autofill function
function autofillForm() {
    // General Information
    document.getElementById('course_code').value = 'ADM1300';
    document.getElementById('course_name').value = 'ADM 1300';
    document.getElementById('course_section').value = 'H';
    document.getElementById('semester').value = 'Summer';
    document.getElementById('year').value = '2024';
    document.getElementById('professor_name').value = 'Thevan';
    document.getElementById('email').value = 't.mohanathas03@gmail.com';
    document.getElementById('class_location').value = 'DMS';
    document.getElementById('class_hours').value = 'Friday 1:00pm - 2:00pm';
    document.getElementById('course_delivery').value = 'Online';
    document.getElementById('course_exams').value = 'In Person';
    document.getElementById('office').value = 'Virtual (Zoom)';
    document.getElementById('phone').value = '123-456-7891';
    document.getElementById('office_hours').value = 'Monday';
    document.getElementById('prerequisite').value = 'ADM1299';
    document.getElementById('ta').value = 'Adam';
    
    // Course Description and Learning Outcomes
    document.getElementById('course_description').value = '1';
    document.getElementById('learning_outcomes').value = '1';
    
    // Timeline data
    const timelineInputs = document.querySelectorAll('#timeline-body tr:first-child input');
    if (timelineInputs.length >= 3) {
        timelineInputs[0].value = 'Week 1';  // Week
        timelineInputs[1].value = '1';       // Deliverables
        timelineInputs[2].value = '1';       // Due Date
    }
} 