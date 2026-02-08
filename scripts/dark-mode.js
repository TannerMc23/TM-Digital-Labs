const toggleButton = document.querySelector("button");
const body = document.body;

let isDarkMode = false;

toggleButton.addEventListener("click", function(){
    if (isDarkMode){
        body.classList.remove("dark");
        body.classList.add("light");
        isDarkMode = false;
    } else {
        body.classList.remove("light");
        body.classList.add("dark");
        isDarkMode = true;
    }
});