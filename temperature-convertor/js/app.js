// Catching Doms
const celciusInput = document.querySelector('.celcius > input');
const fahrenheitInput = document.querySelector('.fahrenheit > input');
const kelvinInput = document.querySelector('.kelvin > input');

function roundNum(num) {
  return Math.round(num * 100) / 100;
}

function celciusToFahrenheitAndKelvin() {
  const cTemp = parseFloat(celciusInput.value);
  const fTemp = cTemp * (9 / 5) + 32;
  const kTemp = cTemp + 273.15;
  fahrenheitInput.value = roundNum(fTemp);
  kelvinInput.value = roundNum(kTemp);
}

celciusInput.addEventListener('input', celciusToFahrenheitAndKelvin);

function fahrenheitToCelciusAndKelvin() {
  const fTemp = parseFloat(fahrenheitInput.value);
  const cTemp = (fTemp - 32) * (5 / 9);
  const kTemp = ((fTemp - 32) * 5) / 9 + 273.15;
  celciusInput.value = roundNum(cTemp);
  kelvinInput.value = roundNum(kTemp);
}

fahrenheitInput.addEventListener('input', fahrenheitToCelciusAndKelvin);

function kelvinToFahrenheitAndCelcius() {
  const kTemp = parseFloat(kelvinInput.value);
  const fTemp = ((kTemp - 273.15) * 9) / 5 + 32;
  const cTemp = kTemp - 273.15;
  fahrenheitInput.value = roundNum(fTemp);
  celciusInput.value = roundNum(cTemp);
}

kelvinInput.addEventListener('input', kelvinToFahrenheitAndCelcius);
