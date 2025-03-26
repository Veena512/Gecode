/* script.js */
let currentUser = null;
let questions = [];
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

    // Simplified authentication (replace with secure backend)
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
    const facultyContent = document.getElementById('facultyContent');
    facultyContent.innerHTML = `
        <h2>Create Exam</h2>
        <input type="text" id="examTitle" placeholder="Exam Title"><br><br>
        <input type="number" id="examDuration" placeholder="Duration (minutes)"><br><br>
        <button onclick="addQuestionsToExam()">Add Questions</button>
        <div id="examQuestions"></div>
        <button onclick="saveExam()">Save Exam</button>
    `;
}

function addQuestionsToExam() {
    const examQuestions = document.getElementById('examQuestions');
    examQuestions.innerHTML = `
        <h3>Add Questions</h3>
        <select id="questionSelect">
            ${questions.map((q, index) => `<option value="${index}">${q.question}</option>`).join('')}
        </select>
        <button onclick="addSelectedQuestion()">Add</button>
        <div id="selectedQuestions"></div>
    `;
}

let selectedQuestions = [];

function addSelectedQuestion() {
    const questionIndex = parseInt(document.getElementById('questionSelect').value);
    selectedQuestions.push(questions[questionIndex]);
    const selectedQuestionsDiv = document.getElementById('selectedQuestions');
    selectedQuestionsDiv.innerHTML = selectedQuestions.map((q, index) => `<p>${q.question}</p>`).join('');
}

function saveExam() {
    const examTitle = document.getElementById('examTitle').value;
    const examDuration = parseInt(document.getElementById('examDuration').value);
    const newExam = {
        title: examTitle,
        duration: examDuration,
        questions: selectedQuestions
    };
    exams.push(newExam);
    alert('Exam saved!');
    selectedQuestions = [];
    document.getElementById('facultyContent').innerHTML = '';
}

function startExam() {
    if(exams.length === 0){
        alert("No Exams Available");
        return;
    }
    const examForm = document.getElementById('examForm');
    examForm.innerHTML = '';
    currentExam = exams[0];
    currentExam.questions.forEach((q, index) => {
        examForm.innerHTML += `
            <div class="question">
                <p>${q.question}</p>
                ${q.options.map((option, optionIndex) => `
                    <input type="radio" name="q${index}" value="${optionIndex}"> ${option}<br>
                `).join('')}
            </div>
        `;
    });
    document.querySelector('.exam-form').classList.remove('hidden');
    startTimer(currentExam.duration);
    openFullscreen();
}

function submitExam() {
    let score = 0;
    currentExam.questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score++;
        }
    });
    document.getElementById('examResult').innerHTML = `Your score: ${score} / ${currentExam.questions.length}`;
    closeFullscreen();
    document.querySelector('.exam-form').classList.add('hidden');
    clearInterval(examInterval);
}

function startTimer(duration) {
    examStartTime = Date.now();
    examEndTime = examStartTime + duration * 60 * 1000;

    examInterval = setInterval(() => {
        const now = Date.now();
        const timeLeft = examEndTime - now;

        if (timeLeft <= 0) {
            clearInterval(examInterval);
            submitExam();
        } else {
            const minutes = Math.floor(timeLeft / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            document.getElementById('timer').textContent = `<span class="math-inline">\{minutes\}\:</span>{seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

function manageQuestions() {
    const facultyContent = document.getElementById('facultyContent');
    facultyContent.innerHTML = `
        <h2>Manage Questions</h2>
        <input type="
