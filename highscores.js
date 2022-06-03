const highscoresList = document.querySelector('#highscoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

console.log(highScores)


// for (i = 0; i = highscores.length; i++) {

// }

highscoresList.innerHTML = highScores.map(score => {
    return (`<li class='center-text'>${score.name} - ${score.score}</li>`)
}).join('')
