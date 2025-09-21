//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
initializeGame();
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";

   //resets input textbox
   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.disabled = false;
   playerGuess.focus(); //adding focus to textbox
   playerGuess.value = ""; //clearing the textbox

   //clearing the feedback
   let feedback = document.querySelector("#feedback");
   feedback.textContent = ""; 

   //clearing previous guesse
   document.querySelector("#guesses").textContent = "";

   //sets attempts (7 total)
   document.querySelector("#attemptsLeft").textContent = 7;
}

function checkGuess() {
    let feedback = document.querySelector('#feedback');
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);

    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("Attempts: " + attempts);

    // shows attempts remaining
    document.querySelector("#attemptsLeft").textContent = 7 - attempts;
    
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        wins++;
        document.querySelector("#wins").textContent = wins;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The correct number was " + randomNumber + " Click reset to play again";
            feedback.style.color = "red";
            losses++;
            document.querySelector("#losses").textContent = losses;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

// activates if player wins or loses
function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hides Guess button
    resetBtn.style.display = "inline"; //displays Reset button
    document.querySelector("#playerGuess").disabled = true; //locks input
}