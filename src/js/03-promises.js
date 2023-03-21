import Notiflix from "notiflix";

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);



function onFormSubmit (ev) {
  ev.preventDefault();
 
  let delay = Number(ev.target.delay.value);
  const step = Number(ev.target.step.value);
  const amount = Number(ev.target.amount.value);

  let position = 0;
  let readyTime = delay;
  
  for (let i = 1; i <= amount; i+=1) {
    position =i;
        
    createPromise(position, readyTime)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    readyTime += step;
  };
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) =>{
    setTimeout (() =>{
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
}, delay);
})
}