// Eventlisteners
window.addEventListener("DOMContentLoaded", () => {
    setupStates();
    setupEvents();
});

// Fetch and display all US states from API
async function setupStates() {
    try {
        let statesResponse = await fetch("https://csumb.space/api/allStatesAPI.php");
        if (!statesResponse.ok) throw new Error("State API failed");

        let statesData= await statesResponse.json();
        let statesSelect = document.querySelector("#state");

        // add placeholder
        let defaultOpt = document.createElement("option");
        defaultOpt.textContent = "Select State";
        defaultOpt.disabled = true;
        defaultOpt.selected = true;
        statesSelect.appendChild(defaultOpt);

        for (let s of statesData) {
            let opt = document.createElement("option");
            opt.value = s.usps;
            opt.textContent = s.state;
            statesSelect.appendChild(opt);
        }
    } catch (err) {
        console.error("Error loading states:", err);
    }       
}

// Setup event listeners for ZIP, username, password, form validation
function setupEvents() {
    document.querySelector("#zipInput").addEventListener("change", lookupZip);
    document.querySelector("#state").addEventListener("change", loadCounties);
    document.querySelector("#username").addEventListener("input", checkUsername);
    document.querySelector("#password").addEventListener("focus", suggestPassword);
    document.querySelector("#signupForm").addEventListener("submit", validateForm);
}