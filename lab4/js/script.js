// Wait until page fully loads
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
    document.querySelector("#zipInput").addEventListener("input", lookupZip);
    document.querySelector("#state").addEventListener("change", loadCounties);
    document.querySelector("#username").addEventListener("input", checkUsername);
    document.querySelector("#password").addEventListener("focus", suggestPassword);
    document.querySelector("#signupForm").addEventListener("submit", validateForm);
}

// lookup city/lat/lon from ZIP code
async function lookupZip() {
    let zip = document.querySelector("#zipInput").value.trim();
    let cityEl = document.querySelector("#city");
    let latEl = document.querySelector("#latitude");
    let lonEl = document.querySelector("#longitude");
    let msgEl = document.querySelector("#zipMessage");

    cityEl.textContent = "";
    latEl.textContent = "";
    lonEl.textContent = "";
    msgEl.textContent = "";

    if (zip.length !== 5 || isNaNzip) {
        msgEl.textContent = "ZIP code must be 5 digits";
        msgEl.className = "unavailable";
        return;
    }

    try {
        let response = await fetch(`https://csumb.space/api/cityInfoAPI.php?zip=${zip}`);
        if (!response.ok) throw new Error("ZIP API cannot be reached");
        let data = await response.json();

        if (data.city) {
            cityEl.textContent = data.city;
            latEl.textContent = data.latitude;
            lonEl.textContent = data.longitude;
            msgEl.textContent = "ZIP code found";
            msgEl.className = "available";
        } else {
            msgEl.textContent = "No data found for that ZIP code: " + zip;
            msgEl.className = "unavailable";
        }

    } catch (err) {
        msgEl.textContent = "Error looking up ZIP code";
        msgEl.className = "unavailable";
        console.error("Zip coder error: ", err);       
    }
}

// Load counties for selected state
async function loadCounties() {
    let stateCode = document.querySelector("#state").value;
    let countySelect = document.querySelector("#county");
    countySelect.innerHTML = "";

    try {
        let response = await fetch(`https://csumb.space/api/countyListAPI.php?state=${stateCode}`);
        if (!response.ok) throw new Error("County API cannot be reached");

        let counties = await response.json();
        for (let c of counties) {
            let opt = document.createElement("option");
            opt.textContent = c.county;
            countySelect.appendChild(opt);
        }
    } catch (err) {
        console.error("County error: ", err);
    }
}

// Check if username is available 
async function checkUsername() {
    let username = document.querySelector("#username").value.trim();
    let msgEL = document.querySelector("#usernameMessage");

    msgEL.textContent = "";
    msgEL.className = "";

    if (username.length < 3) {
        msgEL.textContent = "Username must be at least 3 characters";
        msgEL.classList.add("unavailable");
        return;
    }

    try {
        let response = await fetch(`https://csumb.space/api/usernamesAPI.php?username=${username}`);
        if (!response.ok) throw new Error("Username API cannot be reached");

        let data = await response.json();
        if (data.available) {
            msgEL.textContent = "✅ Username is available";
            msgEL.classList.add("available");
        } else {
            msgEL.textContent = "❌ Username is taken";
            msgEL.classList.add("unavailable");
        }
    } catch (err) {
        console.error("Username check error: ", err);
    }
}

// Password suggestion
async function suggestPassword() {
    let suggestionEl = document.querySelector("#suggestion");
    suggestionEl.textContent = "Generating Password Suggestion...";

    try {
        let response = await fetch("https://csumb.space/api/suggestedPassword.php?length=8");
        if (!response.ok) throw new Error("Password Suggestion API cannot be reached");

        let data = await response.json();
        suggestionEl.textContent = `Suggested Password: ${data.password}`;
    } catch (err) {
        suggestionEl.textContent = "Error generating password suggestion";
        console.error("Password suggestion error: ", err);
    }
}   

// Form validation
function validateForm(event) {
    let username = document.querySelector("#username").value.trim();
    let password = document.querySelector("#password").value.trim();
    let confirmPassword = document.querySelector("#confirmPassword").value.trim();

    if (username.length < 3) {
        alert("Username must be at least 3 characters");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

        alert("✅ Form submitted successfully!");
    }