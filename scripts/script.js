
// Homepage consisting of level selector
const homePage = document.getElementById("home");

// A single quiz level
const quizPage = document.getElementById("quiz");

const footer = document.querySelector("footer");

const quizCompleteDialog = document.getElementById("quiz-complete-dialog");

// Used to switch between homepage and quizpage
quizPage.classList.add("hidden");
// homePage.classList.add("hidden");

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

    // Display first question
    displayQuestion();
}

function displayQuestion() {

    // Check if there are remaining questions
    if (currentQuestionIndex >= questions.length) {
        // End the quiz and show the results
        endQuiz();
        return;
    }

    homePage.classList.add("hidden");
    footer.classList.add("hidden");
    quizPage.classList.remove("hidden");


    // Get the current question object
    const questionObj = questions[currentQuestionIndex];
    const question = questionObj.question;
    const answers = questionObj.answers;

    // Display the current question text
    document.getElementById("question").textContent = question;

    // Display the answer options
    answers.forEach((answer, index) => {
        const answerElement = document.getElementById(`answer-${index + 1}`);
        answerElement.textContent = answer;
        answerElement.onclick = () => checkAnswer(index + 1); // click handler
    });
}

// Function to check the user answer
function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    // Move to the next question
    currentQuestionIndex++;
    displayQuestion();
}

function endQuiz() {
    showGameOverDialog();
}

function showGameOverDialog() {
    document.getElementById("result").textContent = "You got: " + score + "/10 correct!";
    quizCompleteDialog.showModal();
}

function startQuizAgain() {
    currentQuestionIndex = 0;
    score = 0;
    quizCompleteDialog.close();
}

function returnHome() {
    quizCompleteDialog.close();
    quizPage.classList.add("hidden");
    homePage.classList.remove("hidden");
    footer.classList.remove("hidden");
}

// Level over dialog button listeners
document.getElementById("play-again-button").addEventListener("click", startQuizAgain);
document.getElementById("return-home-button").addEventListener("click", returnHome);


/*

For every button in "home" element
if pressed
check which number button
start quiz with questions assigned to number/level

*/