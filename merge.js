// DOM Elements
const body = document.querySelector("body");
const hourHand = document.querySelector(".hour");
const minuteHand = document.querySelector(".minute");
const secondHand = document.querySelector(".seconds");
const modeButton = document.querySelector(".modebutton");
const modeText = document.querySelector(".mode-text");
const modeIcon = document.querySelector(".mode-icon");

// Calendar Elements
const dayElement = document.getElementById("day");
const dateElement = document.getElementById("date");
const monthElement = document.getElementById("month");
const yearElement = document.getElementById("year");

// Update Clock
function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  secondHand.style.transform = `rotate(${secondDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;
}

// Update Calendar
function updateCalendar() {
  const now = new Date();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  dateElement.textContent = String(now.getDate()).padStart(2, "0");
  dayElement.textContent = days[now.getDay()];
  monthElement.textContent = months[now.getMonth()];
  yearElement.textContent = now.getFullYear();
}

// Toggle Dark Mode
function toggleDarkMode() {
  body.classList.toggle("dark");
  const isDarkMode = body.classList.contains("dark");
  
  // Update button text and icon
  modeText.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  modeIcon.textContent = isDarkMode ? "☀️" : "🌙";
  
  // Save preference
  localStorage.setItem("mode", isDarkMode ? "dark" : "light");
}

// Initialize
function init() {
  // Check for saved preference
  if (localStorage.getItem("mode") === "dark") {
    body.classList.add("dark");
    modeText.textContent = "Light Mode";
    modeIcon.textContent = "☀️";
  }

  // Start clock
  updateClock();
  updateCalendar();
  setInterval(updateClock, 1000);
  setInterval(updateCalendar, 60000);

  // Event listeners
  modeButton.addEventListener("click", toggleDarkMode);
}

// Start the app
init();