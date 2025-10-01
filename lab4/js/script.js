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

    if (!zip) return;

    try {
        let response = await fetch(`https://csumb.space/api/cityInfoAPI.php?zip=${zip}`);
        if (!response.ok) throw new Error("ZIP API cannot be reached");

        let data = await response.json();
        if (data.city) {
            cityEl.textContent = data.city;
            latEl.textContent = data.latitude;
            lonEl.textContent = data.longitude;
        } else {
            msgEl.textContent = "No data found for that ZIP code: " + zip;
        }

    } catch (err) {
        msgEl.textContent = "Error looking up ZIP code";
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