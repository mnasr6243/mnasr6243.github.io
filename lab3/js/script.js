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


