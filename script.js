// object that stores the content for all the questions, choices, and answers
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

// variables in the global scope - can be used anywhere
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
var HighScorePageResults = document.querySelector('#high-score-page-results');
var HighScoresLink = document.querySelector('.view-high-scores-link');
var refreshBtn = document.querySelector('.play-again');
var clearStorageBtn = document.querySelector('.clear-storage');




// function that displays the questions and multiple choices
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

// function that checks to make sure if the answer is correct or wrong
function checkAnswer(choices, correctChoice) {
  questionNumber++;
  if (questionNumber < questions.length) {
    getQuestions();
  }
  if (choices === correctChoice) {
    answerResult.textContent = correctAnswerDisplay;
    score = score + 10;
  } else {
    answerResult.textContent = wrongAnswerDisplay;
    timeLeft = timeLeft - 10;
  }
};

// function that displays the highscore leaderboard
function viewHighScoreLeaderBoard() {
  questionText.textContent = 'Please Enter Your Initals to save your HighScore';
  var newTime = timeLeft + 1
  answerResult.textContent = 'Your Score Was ' + score;
  answerChoices.textContent = " ";

  initialsInputBox.setAttribute('type', 'text');
  initialsInputBox.setAttribute('placeholder', 'Enter Initails Here');
  answerChoices.appendChild(initialsInputBox);

  InitalSubmitBtn.setAttribute('type', 'submit');
  answerChoices.appendChild(InitalSubmitBtn);
  InitalSubmitBtn.addEventListener('click', submitScore)
  timerEl.textContent = 0;
}

// function that runs the timer for the quiz
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

// function that starts the quiz when start button is clicked
function startQuiz() {
  startBtn.style.display = 'none';
  getQuestions();
  counter();
}

// function that saves local storage and creates the actual names and scores on the high score leader board

function submitScore() {
  questionText.textContent = 'High Score LeaderBoard!';
  
  
  let showHighScore = JSON.parse(localStorage.getItem('intials')) || [];
  if (initialsInputBox.value === null) {
    console.log('ajhsdkahsd')
    return;
  } else {
    initialsInputBox.textContent = score;
    showHighScore.push(initialsInputBox.value + ' - ' + score + ' points');
    localStorage.setItem('intials', JSON.stringify(showHighScore));
    for (let i = 0; i < showHighScore.length; i++) {
      var scoreListEl = document.createElement('li');
      scoreListEl.textContent = showHighScore[i];
      HighScorePageResults.appendChild(scoreListEl);   
    }
  
  }
  InitalSubmitBtn.classList.add('hide');
  initialsInputBox.classList.add('hide');
  refreshBtn.classList.remove('hide');
  clearStorageBtn.classList.remove('hide');
  
}

// function that links you to the highscores page from the starter screen
function linkToHighScore(){
startBtn.remove();
answerChoices.remove();
submitScore();
HighScoresLink.remove(); 
}

// function that allows the user to play again
function refreshPage() {
  window.location.reload();
}

function clearScore() {
  localStorage.removeItem('intials');
  HighScorePageResults.classList.add('hide');
}


// start quiz start btn
startBtn.addEventListener('click', startQuiz);
// view high scores button
HighScoresLink.addEventListener('click', linkToHighScore);
