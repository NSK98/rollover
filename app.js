/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

// hiding the dice at the start
document.querySelector(".dice").style.display = "none";

// set all values to 0
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

// adding function to roll dice button
document.querySelector(".btn-roll").addEventListener("click", function() {
  // 1 - Random Number
  var dice = Math.floor(Math.random() * 6) + 1;

  // 2 - Display the Resut
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";

  diceDOM.src = "dice-" + dice + ".png";

  // 3 - Update the round score only if the rolled number is not 1 and 1

  if (dice > 1) {
    // Add the score
    roundScore += dice;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    // Next Player
    nextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  // Add current score to the global scores
  scores[activePlayer] += roundScore;

  // Display in the UI
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  // See if the player won

  // Next Player
  nextPlayer();
});

// Next Player
function nextPlayer() {
  // change the active player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}
