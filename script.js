const studentForm = document.getElementById('student-form');
const studentList = document.getElementById('student-list');

// Load data from LocalStorage on startup
document.addEventListener('DOMContentLoaded', displayStudents);

// Handle Form Submission
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const fee = document.getElementById('fee').value;
    const joinDate = document.getElementById('Date').value;

    const student = { 
    id: Date.now(), 
    name, 
    age, 
    email, 
    fee,
    joinDate
};

    addStudentToStorage(student);
    addStudentToTable(student);
    studentForm.reset();
});

// Add student row to UI
function addStudentToTable(student) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.email}</td>
        <td>${student.fee}</td>
        <td>${student.joinDate}</td>
        <td><button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button></td>
    `;
    row.setAttribute('data-id', student.id);
    studentList.appendChild(row);
}

// Storage Logic
function addStudentToStorage(student) {
    const students = getStudentsFromStorage();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
}

function getStudentsFromStorage() {
    return localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
}

function displayStudents() {
    const students = getStudentsFromStorage();
    students.forEach(student => addStudentToTable(student));
}

// Delete Logic
function deleteStudent(id) {
    let students = getStudentsFromStorage();
    students = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
    
    // Remove from UI
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.remove();
}