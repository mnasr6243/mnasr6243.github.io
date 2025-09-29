// Randomized answers for Q1
const q1Answers = [
    {text: "Fortnite", correct: true},
    {text: "Rocket League", correct: false},
    {text: "Sims", correct: false},
    {text: "Warzone", correct: true}
];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}   

function loadQ1() {
    const container = document.getElementById("q1Options");
    container.innerHTML = "";
    shuffle(q1Answers).forEach((opt, i) => {
        const id = "q1_" + i;
        const label = document.createElement("label");
        label.setAttribute("for", id);
        label.innerHTML = `<input type="radio" name="q1" id="${id}" value="${opt.text}"> ${opt.text}`;
        container.appendChild(label);
    });
}
loadQ1();

// Handle quiz submition
document.getElementById("quizForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let score = 0;

// Q1
const q1Value = document.querySelector('input[name="q1"]:checked');
if (q1Value && (q1Value.value === "Fortnite" || q1Value.value === "Warzone")) {
    score += 20;
    showFeedback("feedback1", true);
} else {
    showFeedback("feedback1", false);
}

// Q2
const q2 = [...document.querySelectorAll('input[name="q2"]:checked')].map(x => x.value);
const correctQ2 = ["for", "while", "do-while"];
if (arraysEqual(q2.sort(), correctQ2.sort())) {
    score += 20;
    showFeedback("feedback2", true);
} else {
    showFeedback("feedback2", false);
}

// Q3 
const q3 = document.getElementById("q3").value;
if (q3 === "script") {
    score += 20;
    showFeedback("feedback3", true);
} else {
    showFeedback("feedback3", false);
}

// Q4 
const q4 = document.getElementById("q4").value;
if (q4 === "10") {
    score += 20;
    showFeedback("feedback4", true);
} else {
    showFeedback("feedback4", false);
}

// Q5
const q5 = document.getElementById("q5").value;
if (q5 === "Hola" || q5 === "hola") {
    score += 20;
    showFeedback("feedback5", true);
} else {
    showFeedback("feedback5", false);
}

// Show total score
const results = document.getElementById("results");
results.innerHTML = `Your Total Score is: ${score}/100`;
if (score >= 80) {
    results.classList.remove("try-again");
    results.classList.add("congrats");
    results.innerHTML += "<br> 🎉 Congratulations!";
} else {
    results.classList.remove("congrats");
    results.classList.add("try-again");
    results.innerHTML += " ❌ <br> Need at least 80/100 to pass. Try again!";
}

// Times taken (LocalStorage)
let times = localStorage.getItem("quizTimes") || 0;
times++;
localStorage.setItem("quizTimes", times);
document.getElementById("timesTaken").innerText = `Quiz taken ${times} times.`;
});

// Feedback helper
function showFeedback(id, correct) {
    const elem = document.getElementById(id);
    if (correct) {
        elem.innerHTML = '<img src="images/correct.jpg" alt="Correct" width="20" height="20"> <span>Correct!</span>';    
    } else {
        elem.innerHTML = '<img src="images/incorrect.jpg" alt="Incorrect" width="20" height="20"> <span>Incorrect!</span>';
    } 
}

function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

// Load times taken
document.addEventListener("DOMContentLoaded", function() {
    let time = localStorage.getItem("quizTimes") || 0;
    document.getElementById("timesTaken").innerText = `Quiz taken ${time} times.`;
});
