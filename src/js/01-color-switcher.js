const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.style.cursor = 'pointer';
stopBtn.style.cursor = 'pointer';

stopBtn.setAttribute('disabled', '');
let timerId;
startBtn.addEventListener('click', () => {
  changeBodyColor();
  timerId = setInterval(changeBodyColor, 1000);
});
stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled');
});

function changeBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
