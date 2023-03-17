const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.btnStart.addEventListener('click', () => {
    refs.btnStart.disabled = true;
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});
  
refs.btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
});
    

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };