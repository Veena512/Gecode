/* script.js */
let currentUser = null;
let questions = [ // Add some initial questions
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Rome"], answer: 1 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 }
];
let exams = [];
let userRoles = {
    admin: ["admin"],
    faculty: ["faculty"],
    student: ["student"]
};
let examStartTime;
let examEndTime;
let examInterval;
let currentExam;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        currentUser = { username: username, role: 'admin' };
        showPanel('admin');
    } else if (username === 'faculty' && password === 'faculty') {
        currentUser = { username: username, role: 'faculty' };
        showPanel('faculty');
    } else if (username === 'student' && password === 'student') {
        currentUser = { username: username, role: 'student' };
        showPanel('student');
    } else {
        alert('Invalid credentials');
    }
}

function showPanel(role) {
    document.querySelector('.login-form').classList.add('hidden');
    document.querySelector(`.${role}-panel`).classList.remove('hidden');
}

function createExam() {
    // ... (rest of the createExam function remains the same)
}

function addQuestionsToExam() {
    // ... (rest of the addQuestionsToExam function remains the same)
}

let selectedQuestions = [];

function addSelectedQuestion() {
    // ... (rest of the addSelectedQuestion function remains the same)
}

function saveExam() {
    // ... (rest of the saveExam function remains the same)
}

function startExam() {
    if(exams.length === 0){
        alert("No Exams Available");
        return;
    }
    // ... (rest of the startExam function remains the same)
}

function submitExam() {
    // ... (rest of the submitExam function remains the same)
}

function startTimer(duration) {
    // ... (rest of the startTimer function remains the same)
}

function manageQuestions() {
    const facultyContent = document.getElementById('facultyContent');
    facultyContent.innerHTML = `
        <h2>Manage Questions</h2>
        <input type="text" id="newQuestionText" placeholder="Question"><br>
        <input type="text" id="newOption1" placeholder="Option 1"><br>
        <input type="text" id="newOption2" placeholder="Option 2"><br>
        <input type="text" id="newOption3" placeholder="Option 3"><br>
        <input type="text" id="newOption4" placeholder="Option 4"><br>
        <input type="number" id="newAnswer" placeholder="Correct Option (0-3)"><br>
        <button onclick="addQuestion()">Add Question</button><br><br>
        ${questions.map((q, index) => `<p>${q.question}</p>`).join('')}
    `;
}

function addQuestion() {
    const newQuestion = {
        question: document.getElementById('newQuestionText').value,
        options: [
            document.getElementById('newOption1').value,
            document.getElementById('newOption2').value,
            document.getElementById('newOption3').value,
            document.getElementById('newOption4').value
        ],
        answer: parseInt(document.getElementById('newAnswer').value)
    };
    questions.push(newQuestion);
    manageQuestions(); // Refresh question list
}

function openFullscreen() {
    document.getElementById('fullScreenDiv').classList.remove('hidden');
    document.getElementById('fullScreenContent').innerHTML = document.getElementById('examForm').innerHTML;
}

function closeFullscreen() {
    document.getElementById('fullScreenDiv').classList.add('hidden');
}

function showFacultyManagement() {
    document.getElementById('adminContent').innerHTML = "Faculty Management Coming Soon";
}

function showStudentManagement() {
    document.getElementById('adminContent').innerHTML = "Student Management Coming Soon";
}

function showQuestionBank() {
    document.getElementById('adminContent').innerHTML = "Question Bank Management Coming Soon";
}
