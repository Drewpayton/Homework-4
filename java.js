var timerElement = document.querySelector(".timer");
var startButton = document.getElementById("start-quiz");


var timerCount;


function startGame() {
    timerCount = 60;
    setTime();
}

function setTime() {
    
    var timerInterval = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
  
      if(timerCount === 0) {
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }



    startButton.addEventListener("click", startGame)