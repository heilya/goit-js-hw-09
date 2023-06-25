import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const pickrInput = document.querySelector('#datetime-picker');
const startTimerButton = document.querySelector('button[data-start]');
const daysDateValue = document.querySelector('.value[data-days]');
const hourseDateValue = document.querySelector('.value[data-hours]');
const minutesDateValue = document.querySelector('.value[data-minutes]');
const secondsDateValue = document.querySelector('.value[data-seconds]');


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (Date.now()>selectedDates[0]) {
          Notiflix.Notify.failure('Please choose a date in the future');
          startTimerButton.disabled = true;
          return
        }
          startTimerButton.disabled = false;
          
        
          startTimerButton.addEventListener('click', () => {
              timerId = setInterval(() => {
                  const remainingTime = selectedDates[0].getTime() - Date.now();
                  const { days, hours, minutes, seconds } = convertMs(remainingTime);
                  timerText(days, hours, minutes, seconds);
                  if (remainingTime<=0) {
                  clearInterval(timerId)
                  timerText('00','00','00','00')
         }
                  
              }, 1000);
          })
    },
};

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




flatpickr(pickrInput, options);

function timerText(day, hour, minute, second) {
    daysDateValue.textContent = addLeadingZero(day);
    hourseDateValue.textContent = addLeadingZero(hour);
    minutesDateValue.textContent = addLeadingZero(minute);
    secondsDateValue.textContent = addLeadingZero(second);


}

function addLeadingZero(value){
  return value.toString().padStart(2, '0')
}
