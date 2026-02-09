const yearSpan = document.getElementById('currentyear');
const now = new Date();
yearSpan.textContent = now.getFullYear();

const toggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggle.textContent = "☀️";
}

const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    hamburger.classList.toggle("active");
});

toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");
    toggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
