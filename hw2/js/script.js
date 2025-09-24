//👂 Event Listeners
document.querySelector("#guessBtn").addEventListener("click", makeGuess);
document.querySelector("#letterInput").addEventListener("keypress", keyEnter);
document.querySelector("#resetBtn").addEventListener("click", resetGame);

//🔤 Makes a guess if enter key is pressed
function keyEnter(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
}

//🔚 Resets the game
function resetGame() {
    guessBtn.disabled = false;
    letterInput.disabled = false;
    startGame();
}

//🗺 Global variables/words to guess
const words = ["lazy", "hangman", "angry", "upset", "game", "browser", "coding", 
                "apple", "banana", "cherry", "dragonfruit", "elephant", "flamingo", "guitar", "computer", 
                "island", "jungle", "kangaroo", "laptop", "mountain", "notebook", "ocean", "pyramid", 
                "happy", "rainbow", "sunshine", "telescope", "umbrella", "volcano", "whisper", "phone",
                "yesterday", "zebra"];

let chosenWord = "";
let displayedWord = [];
let wrongGuesses = 0;
let guessedLetters = [];

const displayWord = document.getElementById("displayWord");
const wrongGuessesText = document.getElementById("wrongGuesses");
const lettersGuessedText = document.getElementById("lettersGuessed");
const messageText = document.getElementById("message");
const letterInput = document.getElementById("letterInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const gameList = document.getElementById("gameList");

//🧱 canvas setup
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

//Starts the game
startGame();

//🎯 start a new game
function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    console.log(chosenWord);
    displayedWord = Array(chosenWord.length).fill("_");
    wrongGuesses = 0;
    guessedLetters = [];

    updateDisplay();
    messageText.textContent = "";
    gameList.innerHTML = "";
    letterInput.focus();

    clearCanvas();
    drawStructure();

    statusImage.style.display = "none"; //hide old image
}

//🔄 Updates the UI
function updateDisplay() {
    displayWord.textContent = "Word: " + displayedWord.join(" ");
    wrongGuessesText.textContent = "Wrong Guesses: " + wrongGuesses;
    lettersGuessedText.textContent = "Guessed Letters: " + guessedLetters.join(", ");
}

//🎲 makeGuess function
function makeGuess() {
    const guess = letterInput.value.toLowerCase();
    letterInput.value = "";

    if (!guess.match(/[a-z]/) || guess.length !== 1) {
        messageText.textContent = "Please enter a valid single letter!";
        return;
    }

    if (guessedLetters.includes(guess)) {
        messageText.textContent = "You already guessed that letter!";
        return;
    }

    guessedLetters.push(guess);

    if(chosenWord.includes(guess)) {
        //correct guess
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === guess) {
                displayedWord[i] = guess;
            }
        }
        messageText.textContent = "✅ Correct!";
    } else {
        //wrong guess
        wrongGuesses++;
        messageText.textContent = "❌ Wrong Guess!"
        drawHangman(wrongGuesses);
    }
    updateDisplay();
    checkGameOver();
    addLog(guess);
}

//🧾 Add to game history
function addLog(guess) {
    const li = document.createElement("li");
    li.textContent = `Guessed "${guess}" → ${displayedWord.join(" ")} (wrong: ${wrongGuesses})`;
    gameList.prepend(li);
}

//🏆 Checks for win/loss
function checkGameOver() {
    if (!displayedWord.includes("_")) {
        messageText.textContent = "🎉 You Won! The word was: " + chosenWord;
        guessBtn.disabled = true; 
        letterInput.disabled = true; 

        statusImage.src = "images/win.jpg"; //win image
        statusImage.style.display = "block";

    } else if (wrongGuesses >= 6) {
        messageText.textContent = "💀 You Lost! The word was: " + chosenWord + ". Press Play Again to try again";
        guessBtn.disabled = true;
        letterInput.disabled = true;

        statusImage.src = "images/lose.jpg"; //lose image
        statusImage.style.display = "block";
    }
}

//🎨 Drawing Structure
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawStructure() {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, 230); ctx.lineTo(180, 230)   //base
    ctx.moveTo(50, 230); ctx.lineTo(50, 20)     //pole
    ctx.lineTo(130, 20)                         //top beam
    ctx.lineTo(130, 50)                         //rope
    ctx.stroke();
}

//🎨 Drawing Hangman
function drawHangman(step) {
    ctx.lineWidth = 2;
    switch (step) {
        case 1: //Head
            ctx.beginPath();
            ctx.arc(130, 70, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 2: //Body
            ctx.beginPath();
            ctx.moveTo(130, 90);
            ctx.lineTo(130, 150);
            ctx.stroke();
            break;     
        case 3: //Left arm
            ctx.beginPath();
            ctx.moveTo(130, 110);
            ctx.lineTo(100, 130);
            ctx.stroke();
            break; 
        case 4: //Right arm
            ctx.beginPath();
            ctx.moveTo(130, 110);
            ctx.lineTo(160, 130);
            ctx.stroke();
            break; 
        case 5: //Left leg
            ctx.beginPath();
            ctx.moveTo(130, 150);
            ctx.lineTo(110, 190);
            ctx.stroke();
            break; 
        case 6: //Right leg
            ctx.beginPath();
            ctx.moveTo(130, 150);
            ctx.lineTo(150, 190);
            ctx.stroke();
            break; 
    }
}
