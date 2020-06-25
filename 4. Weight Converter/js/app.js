// Catching Dom
const inputValue = document.querySelector('#inputValue');
let kgValue = document.getElementById('in_kg');
const gramsValue = document.querySelector('#grams');
const poundsValue = document.querySelector('#pounds');
const mgValue = document.querySelector('#mg');
const usTonsValue = document.querySelector('#Us_tons');
const ounceValue = document.querySelector('#ounce');
let num;

// Event Listeners
inputValue.addEventListener('click', () => {
  if (isNaN(kgValue.value) || kgValue.value <= 0) {
    window.alert('Enter number greater then zero');
  } else {
    // converting input value to number
    kgValue = Number(kgValue.value);
    num = kgValue * 1000;
    gramsValue.value = num;
    num = kgValue * 2.2046;
    poundsValue.value = num;
    num = kgValue * 1000000;
    mgValue.value = num;
    num = kgValue * 0.0011023;
    usTonsValue.value = num;
    num = kgValue * 35.274;
    ounceValue.value = num;
  }
});
