// Import Notiflix
import Notiflix from 'notiflix';

const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');
const labels = document.querySelectorAll('label');
const createBtn = document.querySelector('[type="submit"]');

// Style
delay.insertAdjacentHTML('beforebegin', '<br>');
step.insertAdjacentHTML('beforebegin', '<br>');
amount.insertAdjacentHTML('beforebegin', '<br>');
form.style.display = 'flex';
form.style.marginTop = '50px';
createBtn.style.cursor = 'pointer';
labels.forEach(el => {
  el.style.margin = '0 10px 0 0';
});

// Promise generator implementation
createBtn.addEventListener('click', handleClick);

function handleClick(evt) {
  evt.preventDefault();
  if (delay.value === '' || step.value === '' || amount.value === '') {
    return Notiflix.Notify.warning('Please fill in all fields');
  } else if (+delay.value < 0 || +step.value < 0 || +amount.value <= 0) {
    return Notiflix.Notify.warning(
      `Numbers couldn't be negativ, amount field have to be more then 0`
    );
  }
  createPromise(1, delay.value)
    .then(({ position, delay }) =>
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
    )
    .catch(({ position, delay }) =>
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
    );
  let delayCount = +delay.value + +step.value;
  for (let i = 1; i < +amount.value; i += 1) {
    createPromise(i + 1, delayCount)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );
    delayCount += +step.value;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
