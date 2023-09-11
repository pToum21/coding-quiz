
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];
var score = 0;
var timerEl = document.querySelector('.time');
var timeLeft = 60;
var questionNumber = 0;
var startBtn = document.querySelector('.start-button');
var questionText = document.querySelector('.question-text');
var answerChoices = document.querySelector('.answers');
var answerResult = document.querySelector('.answer-result');
var correctAnswerDisplay = 'CORRECT!';
var wrongAnswerDisplay = 'WRONG!';


function getQuestions() {
  var getQuestion = questions[questionNumber];
  questionText.textContent = getQuestion.title;
  answerChoices.textContent = "";
  var answerList = document.createElement('ul');

  getQuestion.choices.forEach(function (choice) {
    var listItem = document.createElement("li");
    listItem.textContent = choice;
    listItem.addEventListener("click", function () {
      checkAnswer(choice, getQuestion.answer);
    })
    answerList.appendChild(listItem);
  })
  answerChoices.appendChild(answerList);
};

function checkAnswer(choices, correctChoice) {
  questionNumber++;
  if (questionNumber < questions.length) {
    getQuestions();
  }
  if (choices === correctChoice) {
    answerResult.textContent = correctAnswerDisplay;
  } else {
    answerResult.textContent = wrongAnswerDisplay;
    timeLeft = timeLeft - 10;
  }
  if (questionNumber >= 5) {
    viewHighScoreLeaderBoard();
  }
};


function viewHighScoreLeaderBoard() {
  questionText.textContent = 'Please Enter Your Initals to save your HighScore';
  answerResult.textContent = 'Your Score Was ' + timeLeft;
  timeLeft = score;
  answerChoices.textContent = " ";
  var initialsInputBox = document.createElement('input');
  initialsInputBox.setAttribute('type', 'text');
  initialsInputBox.setAttribute('placeholder', 'Enter Initails Here');
  answerChoices.appendChild(initialsInputBox);
}

function counter() {
  var  intervalTimer = setInterval(function () {
  timerEl.textContent = timeLeft;
    timeLeft--;
  if (timeLeft === -1) {
    // viewHighScoreLeaderBoard();
    clearInterval(intervalTimer);
  }
}, 1000)
}

function startQuiz() {
  startBtn.style.display = 'none';
  getQuestions();
 counter();
}





startBtn.addEventListener('click', startQuiz);