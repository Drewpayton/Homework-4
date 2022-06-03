var timerElement = document.querySelector(".timer");
var timerTextElement = document.querySelector(".timer-text");
var startButton = document.getElementById("start-quiz");
var questionElement = document.querySelector(".question-container");
var cardBodyElement = document.querySelector(".card-text");
var cardHeaderElement = document.querySelector(".card-header");
var questionAsked = document.querySelector(".question-asked");
var buttonOneElement = document.querySelector(".btn-1");
var buttonTwoElement = document.querySelector(".btn-2");
var buttonThreeElement = document.querySelector(".btn-3");
var buttonFourElement = document.querySelector(".btn-4");
var answerBtn = document.querySelector(".btn-2");
var answerEl = document.querySelector(".answer-container");
var endGameContainer = document.querySelector(".endGame-container");
var highScoreBtn = document.querySelector(".highscore-btn")
var highscoreEl = document.getElementById("highscore-name");
var resetGameEl = document.getElementById("reset-game");
var enterBtnEl = document.getElementById("enter-btn");
var valueArray = []
var shuffledQuestions, currentQuetionsIndex;
var timerCount;
var highscore = 0
var score = 0

var questions = [
    {
        question: "Which built-in method combines the text of two strings and returns a new string?",
        answers: [
            { text: "append()", correct: false},
            { text: "concat()", correct: true},
            { text: "attach()", correct: false},
            { text: "None of the above.", correct: false}    
        ]
    },
    {
        question: "Which built-in method returns the calling string value converted to upper case?",
        answers: [
            { text: "changeCase(case)", correct: false},
            { text: "toUpper()", correct: false},
            { text: "toUpperCase()", correct: true},
            { text: "None of the above.", correct: false}    
        ]
    },
    {
        question: "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
        answers: [
            { text: "pop()", correct: false},
            { text: "map()", correct: false},
            { text: "join()", correct: false},
            { text: "push()", correct: true}    
        ]
    },
    {
        question: "Which of the following function of Array object extracts a section of an array and returns a new array?",
        answers: [
            { text: "reverse()", correct: false},
            { text: "shift()", correct: false},
            { text: "slice()", correct: true},
            { text: "some()", correct: false}    
        ]
    },
    {
        question: "Which built-in method calls a function for each element in the array?",
        answers: [
            { text: "while()", correct: false},
            { text: "toUpper()", correct: false},
            { text: "forEach()", correct: true},
            { text: "None of the above.", correct: false}    
        ]
    }
]

function setUpQuestions() {
    startButton.classList.add('hide');
    cardBodyElement.classList.add('hide');
    questionElement.classList.remove('hide');
    cardHeaderElement.classList.add('hide');
    questionAsked.classList.remove('hide');
}

startButton.addEventListener("click", startGame)

function startGame() {
    timerCount = 60;
    shuffledQuestions = questions
    currentQuetionsIndex = 0;
    setTime();
    setUpQuestions();
    showQuestion(shuffledQuestions[currentQuetionsIndex]) 
    highScoreBtn.disabled = true
}

function showQuestion(question) {
    questionAsked.innerHTML = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn-2")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerEl.appendChild(button)
    
    })  
}

function setNextQuestion(){
    updateAnswer();
    showQuestion(shuffledQuestions[currentQuetionsIndex])
    
}

function updateAnswer(){
    
    let answerList = answerEl.children;

    while(answerList.length > 0) {
        answerEl.removeChild(answerList[answerList.length-1]);
        answerList = answerEl.children;
    }
}



    function selectAnswer(e) {
        var selectedButton = e.target
        var correct = selectedButton.dataset.correct

        setStatusClass(document.body, correct)
        Array.from(answerBtn.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
        })
    }

    function setStatusClass(element, correct) {
        
        if (correct) {
            score = score + 5;
            console.log(score)
        }else {
            timerCount = timerCount - 10
        }
        currentQuetionsIndex++;
        if (currentQuetionsIndex > 4) {
            endGame();
            return;
        }else{
        setNextQuestion();
        }
    }

function endGame() {
    questionAsked.remove();
    answerEl.remove();
    addEndGameButton()
    highScoreBtn.disabled = false;

}

function addEndGameButton() {
    var highscoreEl = document.getElementById("highscore-name");
    var resetGameEl = document.getElementById("reset-game");
    var enterBtnEl = document.getElementById("enter-btn");

    highscoreEl.classList.remove("hide");
    resetGameEl.classList.remove("hide");
    enterBtnEl.classList.remove("hide");

        
}

function getValue() {
    var value = document.getElementById("highscore-name").value
    valueArray.push(value)
    document.getElementById("highscore-list").innerHTML = valueArray + " Score: " + score
}

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const maxHighScores = 5;

function donePage() {
    
    const scoreVal = {
        score: score,
        name: highscoreEl.value
    }
    highScores.push(scoreVal)
    console.log(highScores)
    highScores.sort( (a,b) =>  b.score - a.score)
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores))
    highscoreEl.classList.add('hide')
    highscoreEl.classList.add('hide')
    enterBtnEl.classList.add('hide')
    resetGameEl.classList.add('centering')
}


function setTime() {
    var timerInterval = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      startButton.disabled = true
  
      if(timerCount === 0 || currentQuetionsIndex > 4) {
        clearInterval(timerInterval);
        endGame();
        
      }
    }, 1000);
}

function resetGameState() {
    window.location.reload()
}

resetGameEl.addEventListener("click", resetGameState)
enterBtnEl.addEventListener("click", getValue)
enterBtnEl.addEventListener("click", donePage)