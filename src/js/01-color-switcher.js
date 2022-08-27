import '../css/common.css';

const refs = {
    startBtnEl: document.querySelector('[data-start]'),
    stopBtnEl: document.querySelector('[data-stop]'),
    bodyEl: document.querySelector("body"),
}

refs.startBtnEl.addEventListener("click", startChangeBodyColor),
refs.stopBtnEl.addEventListener("click", stopChangeBodyColor)

let timeoutId = null;
const CHANGECOLOR_DELAY = 1000;
refs.stopBtnEl.setAttribute("disabled", "disabled")

refs.startBtnEl.classList.add("btn");
refs.stopBtnEl.classList.add("btn");

function startChangeBodyColor() {
    refs.stopBtnEl.removeAttribute("disabled", "disabled");
    refs.startBtnEl.setAttribute("disabled", "disabled")

timeoutId = setInterval(() => {
    changeBodyColor();
  }, CHANGECOLOR_DELAY);
}


function stopChangeBodyColor() {
    clearTimeout(timeoutId);

    refs.startBtnEl.removeAttribute("disabled", "disabled");
    refs.stopBtnEl.setAttribute("disabled", "disabled")
}


function changeBodyColor() {
    const randomColor = getRandomHexColor()
    refs.bodyEl.style= `background-color: ${randomColor}`;
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
