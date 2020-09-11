// Catching DOM
const canvas = document.getElementById('canvas');

const download = document.getElementById('myDownload');
const downloadOption = document.getElementById('download-option');
const pngOption = document.getElementById('png-option');
const jpegOption = document.getElementById('jpeg-option');

const pencil = document.getElementById('pencil');

const palette = document.getElementById('palette');
const paletteColor = document.getElementById('palette-color');

const eraser = document.getElementById('eraser');
const eraserSize = document.getElementById('eraser-size');
const radiusOption = document.getElementById('radius');

const repeat = document.getElementById('repeat');

// Canvas height and width
canvas.width = innerWidth - 5;
canvas.height = innerHeight - 120;
var c = canvas.getContext('2d');

// resize
window.addEventListener('resize', function () {
  canvas.width = innerWidth - 5;
  canvas.height = innerHeight - 120;
});

let painting = false;
let radius = 10;
let drawing = 'yes';

function startPosition(e) {
  painting = true;
  draw(e);
}
function finishedPosition() {
  painting = false;
  c.beginPath();
}
function draw(e) {
  if (drawing == 'yes') {
    if (!painting) return;
    c.lineWidth = radius;
    c.lineCap = 'round';
    c.lineTo(e.clientX - 2, e.clientY - 61);
    c.stroke();
    c.beginPath();
    c.moveTo(e.clientX - 2, e.clientY - 61);
  }
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

// radius
var setRadius = function (newRadius) {
  if (newRadius < minRad) {
    newRadius = minRad;
  } else if (newRadius > maxRad) {
    newRadius = maxRad;
  }

  radius = newRadius;
  c.lineWidth = radius * 2;

  radSpan.innerHTML = radius;
};

var minRad = 1,
  maxRad = 100,
  defaultRad = 10,
  interval = 5,
  radSpan = document.getElementById('radius-value'),
  decRad = document.getElementById('radius-decrement'),
  incRad = document.getElementById('radius-increment');

decRad.addEventListener('click', function () {
  setRadius(radius - interval);
});
incRad.addEventListener('click', function () {
  setRadius(radius + interval);
});

setRadius(defaultRad);

// colors
var colors = [
  'black',
  'gray',
  'white',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'chocolate',
  'skyblue',
];
var swatches = document.getElementsByClassName('swatch');

for (var i = 0; i < colors.length; i++) {
  var swatch = document.createElement('div');
  swatch.className = 'swatch';
  swatch.style.backgroundColor = colors[i];
  swatch.addEventListener('click', setSwatch);
  paletteColor.appendChild(swatch);
}

function setColor(color) {
  c.fillStyle = color;
  c.strokeStyle = color;
  var active = document.getElementsByClassName('active')[0];

  if (active) {
    active.className = 'swatch';
  }
}

function setSwatch(e) {
  var swatch = e.target;
  setColor(swatch.style.backgroundColor);

  swatch.className += ' active';
}

setSwatch({ target: document.getElementsByClassName('swatch')[0] });

// toggling hide class
palette.addEventListener('click', function () {
  paletteColor.classList.toggle('hide');

  radiusOption.classList.add('hide');
  downloadOption.classList.add('hide');
  eraserSize.classList.add('hide');
});

pencil.addEventListener('click', function () {
  drawing = 'yes';
  radiusOption.classList.toggle('hide');

  paletteColor.classList.add('hide');
  downloadOption.classList.add('hide');
  eraserSize.classList.add('hide');
});

download.addEventListener('click', function () {
  downloadOption.classList.toggle('hide');

  radiusOption.classList.add('hide');
  paletteColor.classList.add('hide');
  eraserSize.classList.add('hide');
});

// downloading file
pngOption.addEventListener('click', function () {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(canvas.msSaveBlob(), 'canvas-image.png');
  } else {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.download = 'canvas-image.png';
    a.click();
    document.body.removeChild(a);
  }
});

jpegOption.addEventListener('click', function () {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(canvas.msSaveBlob(), 'canvas-image.jpeg');
  } else {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = canvas.toDataURL('images/jpeg');
    a.download = 'canvas-image.jpeg';
    a.click();
    document.body.removeChild(a);
  }
});

// size-eraser
const increment = document.getElementById('eraser-increment');
const decrement = document.getElementById('eraser-decrement');
const sizeValaue = document.getElementById('eraser-size-value');

var minimumSize = 5,
  MaximumSize = 100,
  defaultRad = 10,
  interval = 5,
  height,
  width;

var heightIncrease = function (newHeight) {
  if (newHeight < minimumSize) {
    newHeight = minimumSize;
  } else if (newHeight > MaximumSize) {
    newHeight = MaximumSize;
  }

  height = newHeight;

  sizeValaue.innerHTML = height;
};

var widthIncrease = function (newWidth) {
  if (newWidth < minimumSize) {
    newWidth = minimumSiize;
  } else if (newWidth > MaximumSize) {
    newWidth = MaximumSize;
  }

  width = newWidth;
};

increment.addEventListener('click', function () {
  heightIncrease(height + interval);
  widthIncrease(width + interval);
});
decrement.addEventListener('click', function () {
  heightIncrease(height - interval);
  widthIncrease(width - interval);
});

heightIncrease(defaultRad);
widthIncrease(defaultRad);

// eraser
eraser.addEventListener('click', function () {
  eraserSize.classList.toggle('hide');
  drawing = 'no';
  function erase(e) {
    if (drawing == 'no') {
      if (!painting) return;
      c.clearRect(e.clientX - 2, e.clientY - 61, width, height);
    }
  }
  canvas.addEventListener('mousemove', erase);

  radiusOption.classList.add('hide');
  paletteColor.classList.add('hide');
  downloadOption.classList.add('hide');
});

// Repeat
repeat.addEventListener('click', function () {
  c.clearRect(0, 0, canvas.width, canvas.height);
});
