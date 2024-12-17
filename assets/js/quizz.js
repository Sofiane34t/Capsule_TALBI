// Questions tirées du texte donné
const questions = [
    {
        question: "Quelle est la longueur totale de la thèse ?",
        answers: ["344 pages", "218 pages", "102 pages"],
        correct: "344 pages"
    },
    {
        question: "Quelle partie de la thèse est consacrée au yoga et à la réflexivité ?",
        answers: ["Partie 1", "Partie 2", "Partie 3"],
        correct: "Partie 3"
    },
    {
        question: "Quel concept central est introduit par Anzieu ?",
        answers: ["Le Moi-peau", "Le transfert", "Le holding"],
        correct: "Le Moi-peau"
    },
    {
        question: "Combien de pages couvre la bibliographie ?",
        answers: ["10 pages", "16 pages", "20 pages"],
        correct: "16 pages"
    },
    {
        question: "Quelle est la problématique centrale de la thèse ?",
        answers: [
            "L'impact des pratiques corporelles sur la réflexivité des adolescents",
            "L’analyse de la sensorialité dans les institutions scolaires",
            "La relecture des concepts psychanalytiques en éducation"
        ],
        correct: "L'impact des pratiques corporelles sur la réflexivité des adolescents"
    }
];

// Variables globales
let currentQuestionIndex = 0;
let score = 0;

// Sélection des éléments HTML
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const homeBtn = document.getElementById("home-btn");
const scoreText = document.getElementById("score-text");

// Mélanger les questions
const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

// Fonction pour afficher une question
function displayQuestion() {
    resetState();
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(button, currentQuestion.correct));
        answersContainer.appendChild(button);
    });
}

// Fonction pour réinitialiser l'état des boutons
function resetState() {
    nextBtn.style.display = "none";
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

// Sélection d'une réponse
function selectAnswer(button, correctAnswer) {
    const isCorrect = button.innerText === correctAnswer;
    if (isCorrect) {
        button.style.backgroundColor = "#28a745";
        score++;
    } else {
        button.style.backgroundColor = "#dc3545";
    }
    Array.from(answersContainer.children).forEach(btn => btn.disabled = true);
    nextBtn.style.display = "block";
}

// Passer à la prochaine question
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        showFinalScore();
    }
});

// Afficher le score final
function showFinalScore() {
    resetState();
    questionText.innerText = "Quiz terminé !";
    scoreText.innerText = `Votre score est de ${score} sur ${shuffledQuestions.length}.`;
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    homeBtn.style.display = "inline-block";
}

// Recommencer le quiz
restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreText.innerText = "";
    restartBtn.style.display = "none";
    homeBtn.style.display = "none";
    displayQuestion();
});

// Initialiser le quiz
displayQuestion();
