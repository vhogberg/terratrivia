
// Elements needed on a global level
const homePage = document.getElementById("home");
const quizPage = document.getElementById("quiz");
const footer = document.querySelector("footer");
const quizCompleteDialog = document.getElementById("quiz-complete-dialog");
const allAnswers = document.querySelectorAll(".answer");

// Used to hide the quizpage initially
quizPage.classList.add("hidden");

// Button listener for choosing category and level
const levelButtons = document.querySelectorAll(".category-level-button");
levelButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Grab the pressed buttons' id.
        var buttonId = button.id;
        // Remove the "-button" part at the end of the id to leave just the level id
        levelId = buttonId.replaceAll("-button", "");
        // Method for getting the questions assigned to a level
        getQuestions(levelId);
    })
});

// Global tracking variables
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Method for getting the questions assigned to a level
async function getQuestions(levelId) {
    // Grab just the category from the level id
    const category = levelId.slice(0, -8);
    // Grab the "level-x" part from the level id
    const level = levelId.slice(-7);

    // grab questions from JSON file
    const response = await fetch("./utils/questions.json");
    const data = await response.json();

    // filter out the correct 10 questions
    questions = data.categories[category][level];

    // Reset tracking variables for a new quiz
    currentQuestionIndex = 0;
    score = 0;

    // Swap from homepage to quizpage
    homePage.classList.add("hidden");
    footer.classList.add("hidden");
    quizPage.classList.remove("hidden");

    // Display first question
    displayQuestion();
}

function displayQuestion() {
    // Check if there are any remaining questions
    if (currentQuestionIndex >= questions.length) {
        // End the quiz and show the results
        showGameOverDialog();
        return;
    }

    // Get the current question object
    const questionObj = questions[currentQuestionIndex];
    const question = questionObj.question;
    const answers = questionObj.answers;

    // Display the current question
    document.getElementById("question").textContent = question;

    // Display amount of questions answered
    document.getElementById("number-of-questions-answered").textContent = currentQuestionIndex + "/10 questions answered.";

    // Display the answer options
    answers.forEach((answer, index) => {
        const answerElement = document.getElementById(`answer-${index + 1}`); // starts at 0
        answerElement.textContent = answer;
        answerElement.onclick = () => checkAnswer(index + 1); // click handler
    });
}

// Function to check the user answer
function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    // If user selected correctly, update score by 1.
    if (selectedAnswer === correctAnswer) {
        score++;
    }

    // Select the html elements from the ints
    const selectedAnswerElement = document.getElementById(`answer-${selectedAnswer}`);
    const correctAnswerElement = document.getElementById(`answer-${correctAnswer}`);

    // Add css classes that shows correct/false answers + selected answer
    allAnswers.forEach (answer => {
        answer.classList.add("disabled"); // So user cant click another answer
        answer.classList.add("false-answer");
    })
    selectedAnswerElement.classList.add("selected-answer");
    correctAnswerElement.classList.add("correct-answer");
}


// Next question / skip question
function nextQuestion() {
    // Move to the next question
    currentQuestionIndex++;

    allAnswers.forEach (answer => {
        answer.classList.remove("false-answer");
        answer.classList.remove("correct-answer");
        answer.classList.remove("selected-answer");
        answer.classList.remove("disabled");
    })
    displayQuestion();
}

// Modal window popup for when all questions are answered
function showGameOverDialog() {
    document.getElementById("result").textContent = "You got: " + score + "/10 correct!";
    quizCompleteDialog.showModal();
}

// Level over dialog button listeners
document.getElementById("play-again-button").addEventListener("click", startQuizAgain);
document.getElementById("next-question-button").addEventListener("click", nextQuestion);

// Function that starts the quiz again, resetting scores
function startQuizAgain() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("number-of-questions-answered").textContent = currentQuestionIndex + "/10 questions answered.";
    quizCompleteDialog.close();
}

// Return home to choose another level
document.getElementById("return-home-button").addEventListener("click", returnHome);
function returnHome() {
    quizCompleteDialog.close();
    quizPage.classList.add("hidden");
    homePage.classList.remove("hidden");
    footer.classList.remove("hidden");
}