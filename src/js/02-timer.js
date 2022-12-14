import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  btnStart: document.querySelector('[data-start]'),
  inputDateTime: document.querySelector('#datetime-picker')
}

refs.btnStart.setAttribute("disabled", "disabled");

let selectedDate = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0].getTime();
      
      if (options.defaultDate > selectedDates[0]) {
          
          Notify.failure('Please choose a date in the future');
          return;
    }
    
    refs.btnStart.removeAttribute("disabled", "disabled");
    Notify.info('Please press the Start button to start the countdown timer');    
  },
};

const fp = flatpickr(refs.inputDateTime, options);

refs.btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  let differenceBetweenDate = selectedDate - options.defaultDate;
  
timerId = setInterval(() => {
  differenceBetweenDate = differenceBetweenDate - 1000;
  convertMs(differenceBetweenDate);
}, 1000);
  refs.btnStart.removeEventListener('click', onBtnStartClick);  
  Notify.success('Timer has started successfully');
}

function updateClock({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);

  if (refs.days.textContent === '00' &&
      refs.hours.textContent === '00' &&
      refs.minutes.textContent === '00' &&
      refs.seconds.textContent === '00') {
    clearInterval(timerId);
    Notify.success('The countdown timer has ended successfully');
      }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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

    updateClock({ days, hours, minutes, seconds });

    return { days, hours, minutes, seconds };
}

