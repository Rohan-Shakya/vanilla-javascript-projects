// Generator functions

export function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

export function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

export function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

export function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
