
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
function getQuestions(levelId) {
    alert(levelId);
}

/*

For every button in "home" element
if pressed
check which number button
start quiz with questions assigned to number/level

*/