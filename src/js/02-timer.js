// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Import Notiflix
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');
const labels = document.querySelectorAll('.label');
const second = document.querySelector('[data-seconds]');
const minute = document.querySelector('[data-minutes]');
const hour = document.querySelector('[data-hours]');
const day = document.querySelector('[data-days]');

// Style
timer.style.display = 'flex';
timer.style.margin = '20px 0';
fields.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
  el.style.margin = '0 5px 0 0';
  el.style.width = '50px';
});
values.forEach(el => {
  el.style.font = '28px bold Arial, sans-serif';
});
labels.forEach(el => {
  el.style.font = '10px Arial, sans-serif';
  el.style.textTransform = 'uppercase';
});
start.style.cursor = 'pointer';

// Flatpickr initialisation
let selectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      return Notiflix.Notify.failure('Please select a date in the future');
    }
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    start.removeAttribute('disabled');
  },
};
flatpickr(input, options);

// Timer implementation
start.setAttribute('disabled', '');
start.addEventListener('click', startTimer);

function startTimer() {
  const timerId = setInterval(() => {
    const currentDate = new Date();
    start.setAttribute('disabled', '');
    input.setAttribute('disabled', '');
    if (currentDate < selectedDate) {
      const timeRemain = selectedDate - currentDate;
      const convertedTimeRemain = convertMs(timeRemain);
      second.textContent = addLeadingZero(convertedTimeRemain.seconds);
      minute.textContent = addLeadingZero(convertedTimeRemain.minutes);
      hour.textContent = addLeadingZero(convertedTimeRemain.hours);
      day.textContent = addLeadingZero(convertedTimeRemain.days);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
