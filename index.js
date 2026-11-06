// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// index.js

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");


function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

// Step 2: render the alerts
function displayAlerts(data) {
  
  alertsDisplay.innerHTML = "";

  const summary = document.createElement("p");
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  const list = document.createElement("ul");
  data.features.forEach((alert) => {
    const item = document.createElement("li");
    item.textContent = alert.properties.headline;
    list.appendChild(item);
  });
  alertsDisplay.appendChild(list);
}

// Step 1: fetch the data
async function fetchWeatherAlerts(state) {
  try {
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    if (!response.ok) {
      throw new Error(`Could not get alerts for "${state}". Please check the state abbreviation.`);
    }

    const data = await response.json();
    console.log(data);

   
    clearError();
    displayAlerts(data);
  } catch (error) {
    console.log(error.message);
    alertsDisplay.innerHTML = ""; 
    showError(error.message);
  }
}


fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();

 
  if (!/^[A-Z]{2}$/.test(state)) {
    showError("Please enter a valid two-letter state abbreviation (e.g., MN).");
    return;
  }

  fetchWeatherAlerts(state);


  stateInput.value = "";
});