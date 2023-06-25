import Notiflix from 'notiflix';
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay)
  });
};
promisesForm = document.querySelector('.form');


promisesForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
    const {
    elements: { delay, step, amount }
    } = event.currentTarget;
  const quantityPromises = amount.value;
  let delayValue = Number(delay.value);
  for (let i = 1; i <= quantityPromises; i++) {
        createPromise(i, delayValue).then(value => Notiflix.Notify.success(value)).catch(err => Notiflix.Notify.failure(err));
    delayValue += Number(step.value);
  }
  promisesForm.reset()

}



