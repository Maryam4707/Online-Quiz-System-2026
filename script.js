
const questions = [
    {
        question: "What is Generative AI?",
        options: [
            "AI that creates new content",
            "AI that only stores data",
            "AI that repairs computers",
            "AI that only calculates numbers"
        ],
        answer: 0
    },
    {
        question: "Which of these is a Generative AI tool?",
        options: ["MS Paint", "ChatGPT", "Calculator", "Notepad"],
        answer: 1
    },
    {
        question: "What does GPT stand for?",
        options: [
            "General Processing Tool",
            "Generative Pre-trained Transformer",
            "Global Program Technology",
            "Generated Personal Text"
        ],
        answer: 1
    },
    {
        question: "What is a prompt in Generative AI?",
        options: [
            "A computer virus",
            "An instruction given to AI",
            "A programming error",
            "A database"
        ],
        answer: 1
    },
    {
        question: "What is an AI hallucination?",
        options: [
            "AI generating incorrect information",
            "AI shutting down",
            "AI deleting files",
            "AI improving internet speed"
        ],
        answer: 0
    },
    {
        question: "Which technology is commonly used in Generative AI?",
        options: [
            "Large Language Models",
            "Only spreadsheets",
            "Printers",
            "Operating systems"
        ],
        answer: 0
    },
    {
        question: "What is the purpose of fine-tuning an AI model?",
        options: [
            "To delete the model",
            "To adapt it for a specific task",
            "To turn off the internet",
            "To change the computer screen"
        ],
        answer: 1
    },
    {
        question: "What does LLM stand for?",
        options: [
            "Large Language Model",
            "Low Learning Machine",
            "Logical Link Method",
            "Long List Memory"
        ],
        answer: 0
    },
    {
        question: "What is a multimodal AI model?",
        options: [
            "A model that only reads text",
            "A model that works with multiple types of data",
            "A model that only performs calculations",
            "A model without training"
        ],
        answer: 1
    },
    {
        question: "What is one limitation of Generative AI?",
        options: [
            "It can sometimes produce incorrect answers",
            "It never makes mistakes",
            "It always knows the latest information",
            "It does not need any data"
        ],
        answer: 0
    }
];

// Get HTML Elements
const authWelcome = document.getElementById("authWelcome");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const welcome = document.getElementById("welcome");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Screen Navigation
function showScreen(screen) {
    authWelcome.style.display = "none";
    signup.style.display = "none";
    login.style.display = "none";
    welcome.style.display = "none";
    quiz.style.display = "none";
    result.style.display = "none";

    screen.style.display = "block";
}

// Welcome Buttons
document.getElementById("goSignupBtn").addEventListener("click", function () {
    showScreen(signup);
});

document.getElementById("goLoginBtn").addEventListener("click", function () {
    showScreen(login);
});

// Back and Navigation Buttons
document.getElementById("signupBackBtn").addEventListener("click", function () {
    showScreen(authWelcome);
});

document.getElementById("loginBackBtn").addEventListener("click", function () {
    showScreen(authWelcome);
});

document.getElementById("signupLoginBtn").addEventListener("click", function () {
    showScreen(login);
});

document.getElementById("loginSignupBtn").addEventListener("click", function () {
    showScreen(signup);
});

// Sign Up
signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;

    if (localStorage.getItem("quizUser_" + email)) {
        alert("Account already exists! Please Login.");
        showScreen(login);
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("quizUser_" + email, JSON.stringify(user));

    alert("Account created successfully! Please Login.");

    signupForm.reset();
    document.getElementById("loginEmail").value = email;

    showScreen(login);
});

// Login
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const savedUser = localStorage.getItem("quizUser_" + email);

    if (!savedUser) {
        alert("Account not found! Please Sign Up first.");
        return;
    }

    const user = JSON.parse(savedUser);

    if (user.password !== password) {
        alert("Incorrect password! Please try again.");
        return;
    }

    alert("Login successful! Welcome " + user.name);

    loginForm.reset();
    showScreen(welcome);
});

// Start Quiz
document.getElementById("startBtn").addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    showScreen(quiz);
    showQuestion();
});

// Show Questions
function showQuestion() {
    selectedAnswer = null;

    const current = questions[currentQuestion];

    questionElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}: ${current.question}`;

    optionsElement.innerHTML = "";

    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option-btn";

        button.addEventListener("click", function () {
            selectedAnswer = index;

            Array.from(optionsElement.children).forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");
        });

        optionsElement.appendChild(button);
    });

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next Question";
}

// Next Question
nextButton.addEventListener("click", function () {
    if (selectedAnswer === null) {
        alert("Please select an answer!");
        return;
    }

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Show Result
function showResult() {
    showScreen(result);

    const totalMarks = questions.length;
    const percentage = (score / totalMarks) * 100;
    const status = percentage >= 50 ? "PASS" : "FAIL";

    scoreElement.innerHTML =
        `Total Marks: ${totalMarks}<br>
         Obtained Marks: ${score}<br>
         Percentage: ${percentage}%<br>
         Final Result: ${status}`;
}

// Restart Quiz
function restartQuiz() {
    if (currentQuestion < questions.length) {
        alert("Please complete the quiz first!");
        return;
    }

    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    showScreen(welcome);
}
