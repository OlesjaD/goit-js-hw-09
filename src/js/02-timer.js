import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import '../css/common.css';

const refs = {
    timerPicker: document.querySelector('input#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    timerDays: document.querySelector('[data-days]'),
    timerHours: document.querySelector('[data-hours]'),
    timerMinutes: document.querySelector('[data-minutes]'),
    timerSeconds: document.querySelector('[data-seconds]'),
};
refs.btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {      
      // console.log(selectedDates[0]);
      if (selectedDates[0] < Date.now()) {
        window.alert("Please choose a date in the future");
        return;
      } refs.btnStart.disabled = false;
    },
  };
const calendars = flatpickr(refs.timerPicker, options);

refs.btnStart.addEventListener('click', onclickBtn);

function onclickBtn () {
  refs.btnStart.disabled = true;
  refs.timerPicker.disabled = true;

  const timerId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = calendars.selectedDates[0] - currentDate;
    // console.log(deltaTime);
    const coverTime = convertMs(deltaTime);
    updateTimer(coverTime);  
}, 1000);

  if (calendars.selectedDates[0].getTime - Date.now() <= 0) {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
    return;
  };
};

function updateTimer({days, hours, minutes, seconds}) {
  refs.timerDays.textContent = days;
  refs.timerHours.textContent = hours;
  refs.timerMinutes.textContent = minutes;
  refs.timerSeconds.textContent = seconds;
};

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

// });

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}