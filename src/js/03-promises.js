import Notiflix from "notiflix";

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit (ev) {
  ev.preventDefault();
  let position = 0;
  let delay = Number(ev.target.delay.value);
  const step = Number(ev.target.step.value);
  const amount = Number(ev.target.amount.value);

  setTimeout(() => {
    const timerId = setInterval(() => {
      if (amount === position) {
        clearInterval(timerId);
      } else {
        position +=1;
        createPromise(position, delay)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      }
    },delay += step);
  }, delay);
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const value = { position, delay };
  if (shouldResolve) {
    return Promise.resolve(value);
  } else {
    return Promise.reject(value);
  }
}
