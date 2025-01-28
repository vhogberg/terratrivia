
// Homepage consisting of level selector
const homePage = document.getElementById("home");

// A single quiz level
const quizPage = document.getElementById("quiz");

// Used to switch between homepage and quizpage
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

// Method for getting the questions assigned to a level
async function getQuestions(levelId) {
    // Grab just the category from the level id
    const category = levelId.slice(0, -8);
    // Grab the "level-x" part from the level id
    const level = levelId.slice(-7);

    // grab questions from JSON file
    const response = await fetch ("./utils/questions.json");
    const data = await response.json();

    // filer out the correct 10 questions
    startQuiz(data.categories[category][level]);
}

function startQuiz (questions) {
    questions.forEach((questionObj) => {
        const question = questionObj.question;
        const answers = questionObj.answers;
        const correctAnswer = questionObj.correct_answer;

        console.log(question);
        answers.forEach((a) => {
            console.log(a);
        })
        console.log(correctAnswer);
    });
}

/*

For every button in "home" element
if pressed
check which number button
start quiz with questions assigned to number/level

*/