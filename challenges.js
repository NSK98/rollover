var scores, roundScore, activePlayer, gamePlaying;

// Initialise the Game
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  var person0 = prompt("Player 1 enter your name");
  if (person0 == null || person0 == "") {
    person0 = "Player 1";
  }
  var person1 = prompt("Player 2 enter your name");
  if (person1 == null || person1 == "") {
    person1 = "Player 2";
  }

  // hiding the dice at the start
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  // set all values to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = person0;
  document.getElementById("name-1").textContent = person1;
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

init();

// adding function to roll dice button
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1 - Random Number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2 - Display the Resut
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";

    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    // 3 - Update the round score only if the rolled number is not 1 and 1
    if (dice1 > 1 && dice2 > 1) {
      // Add the score
      roundScore += dice1 + dice2;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add current score to the global scores
    scores[activePlayer] += roundScore;

    // Display in the UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    var winningScore = parseInt(document.querySelector(".final-score").value);
    if (isNaN(winningScore)) {
      alert("Please input a Winning Score!");
    }

    // See if the player won
    if (scores[activePlayer] >= winningScore) {
      document.getElementById("name-" + activePlayer).textContent = "WINNER!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
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

// New Button Funtion
document.querySelector(".btn-new").addEventListener("click", init);
