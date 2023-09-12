
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
var initialsInputBox = document.createElement('input');
var InitalSubmitBtn = document.createElement('input');





function getQuestions() {
  var getQuestion = questions[questionNumber];
  questionText.textContent = getQuestion.title;
  answerChoices.textContent = "";
  var answerList = document.createElement('ul');

  getQuestion.choices.forEach(function (choice) {
    var listItem = document.createElement("button");
    listItem.setAttribute('class', 'multiple-choice-answers')
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
};


function viewHighScoreLeaderBoard() {
  questionText.textContent = 'Please Enter Your Initals to save your HighScore';
  var newTime = timeLeft + 1
  answerResult.textContent = 'Your Score Was ' + newTime;
  score = timeLeft;
  answerChoices.textContent = " ";

  initialsInputBox.setAttribute('type', 'text');
  initialsInputBox.setAttribute('placeholder', 'Enter Initails Here');
  answerChoices.appendChild(initialsInputBox);

  InitalSubmitBtn.setAttribute('type', 'submit');
  answerChoices.appendChild(InitalSubmitBtn);
  InitalSubmitBtn.addEventListener('click', submitScore)
  
}

function counter() {
  var intervalTimer = setInterval(function () {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft === 0 || questionNumber >= 5) {
      clearInterval(intervalTimer);
      viewHighScoreLeaderBoard();
    }
  }, 1000)
}

function startQuiz() {
  startBtn.style.display = 'none';
  getQuestions();
  counter();
}

function submitScore() {
  questionText.textContent = 'High Score LeaderBoard!';
  initialsInputBox.textContent = score;

let showUserName = JSON.parse(localStorage.getItem('intials')) || [];
console.log()
showUserName.push(initialsInputBox.value + '_' + score);
localStorage.setItem('intials', JSON.stringify());




  // var  userInput = document.querySelector('input').value;
  // localStorage.setItem('intials', userInput);
  // answerResult.textContent = lastIntials;
  InitalSubmitBtn.remove();
  initialsInputBox.remove();

}


startBtn.addEventListener('click', startQuiz);
