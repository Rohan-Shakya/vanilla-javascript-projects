// Catching DOM
const startButton = document.querySelector('#start-btn');
const nextButton = document.querySelector('#next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let shuffleQuestion, currentQuestionIndex;

// functions
function startGame() {
  startButton.classList.add('hide');
  questionContainerElement.classList.remove('hide');
  shuffleQuestion = questions.sort(() => Math.random - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestion[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerHTML = question.question;
  question.answer.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatus(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffleQuestion.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerHTML = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatus(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatus(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

// Questions
const questions = [
  {
    question: 'What is 2 + 2 ?',
    answer: [
      { text: '4', correct: true },
      { text: '22', correct: false },
    ],
  },
  {
    question: 'What is 6 + 2 ?',
    answer: [
      { text: '4', correct: false },
      { text: '22', correct: false },
      { text: '8', correct: true },
      { text: '62', correct: false },
    ],
  },
  {
    question: "What is '8' + 2 ?",
    answer: [
      { text: '8', correct: false },
      { text: '28', correct: false },
      { text: '82', correct: true },
      { text: '16', correct: false },
    ],
  },
];
