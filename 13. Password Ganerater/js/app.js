// DOM Elements
const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numberElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// generate event listen
generateElement.addEventListener('click', () => {
  const length = parseInt(lengthElement.value);
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumber = numberElement.checked;
  const hasSymbol = symbolsElement.checked;

  resultElement.innerHTML = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// copy password to clipboard
clipboardElement.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultElement.innerText;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard!');
});

// generate password function
function generatePassword(lower, upper, number, symbol, length) {
  // 1. Init pw var
  // 2. filter out unchecked types
  // 3. loop iver length call generator function for each typep
  // 4. add final pw to the pw var ans return

  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  if (typesCount === 0) {
    return '';
  }
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

import {
  getRandomLower,
  getRandomUpper,
  getRandomNumber,
  getRandomSymbol,
} from './generatePW.js';
