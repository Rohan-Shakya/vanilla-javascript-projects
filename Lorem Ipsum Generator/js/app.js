// Importing datas
import { text } from './data.js';

const form = document.querySelector('.lorem-form');
const amount = document.querySelector('#amount');
const result = document.querySelector('.lorem-text');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = parseInt(amount.value);
  const random = Math.floor(Math.random() * text.length);

  // ###### GENERATE Random paragraph if value is NAN or value is less than 0 or value is greater than 10 ######
  if (isNaN(value) || value <= 0 || value > 10) {
    result.innerHTML = `
        <p class="result"> ${text[random]}</p>
    `;
  }

  // ### GENRATE input:value no. of paragraph
  else {
    let tempText = text.slice(0, value);
    tempText = tempText
      .map((para) => {
        return `<p class="result">${para}</p>`;
      })
      .join('');
    result.innerHTML = tempText;
  }
});
