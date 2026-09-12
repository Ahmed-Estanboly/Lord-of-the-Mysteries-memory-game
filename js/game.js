const winningMusic = new Audio("audio/win-game.mp3");
winningMusic.loop = false;
winningMusic.volume = 0.7;

const matchingMusic = new Audio("audio/match.mp3");
matchingMusic.loop = false;
matchingMusic.volume = 0.5;

const notMatchingMusic = new Audio("audio/wrong.mp3");
notMatchingMusic.loop = false;
notMatchingMusic.volume = 0.5;

const flippedMusic = new Audio("audio/card-flip.mp3");
flippedMusic.loop = false;
flippedMusic.volume = 0.5;

let seconds = 0;
let timerInterval;
let clickCount = 0;
let lastCard = null;
let firstClick = false;

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    updateScore();
    updateMoves();
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  document.getElementById("timer").textContent = display;
}

function updateScore() {
  let score = 1000 - clickCount * 5 - seconds * 2;
  document.getElementById("score").textContent = score < 0 ? 0 : score;
}

function updateMoves() {
  document.getElementById("moves-counter").innerHTML = Math.floor(
    clickCount / 2,
  );
}

function startGame() {
  stopTimer();
  seconds = 0;
  clickCount = 0;
  score = 1000;
  updateMoves();
  updateScore();
  updateTimerDisplay();
  renderLeaderboard(leaderboard);
  introMusic.play().catch(()=>{});
  firstClick = false;
}

function checkMatching(card1, card2) {
  let cards = document.getElementsByClassName("card");
  for (c of cards) {
    c.style.pointerEvents = "none";
  }
  if (card1.dataset.id === card2.dataset.id) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    setTimeout(() => {
      matchingMusic.currentTime = 0;
      matchingMusic.play().catch(() => {});
    }, 400);
  } else {
    setTimeout(() => {
      card1.classList.add("wrong-match");
      card2.classList.add("wrong-match");
      notMatchingMusic.currentTime = 0;
      notMatchingMusic.play().catch(() => {});
    }, 700);
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.classList.remove("wrong-match");
      card2.classList.remove("wrong-match");
    }, 1100);
  }
  setTimeout(() => {
    for (c of cards) {
      c.style.pointerEvents = "auto";
    }
  }, 1200);
}

document
  .getElementById("cards-container")
  .addEventListener("click", (event) => {
    const card = event.target.closest(".card");

    if (!card || card.classList.contains("matched") || lastCard === card)
      return;
    if (!firstClick) {
      startGame();
      startTimer();
    }
    firstClick = true;
    card.classList.add("flipped");
    flippedMusic.currentTime = 0;
    flippedMusic.play().catch(() => {});

    if (clickCount % 2 === 1) {
      checkMatching(lastCard, card);
    }
    lastCard = card;
    clickCount++;
    if (
      document.getElementsByClassName("card").length ===
      document.getElementsByClassName("matched").length
    ) {
      stopTimer();
      showWinnerMessege();
    }
  });

function restartGame() {
  stopTimer();
  firstClick = false;
  startGame();
  let cards = document.getElementsByClassName("card");
  for (card of cards) {
    card.classList.remove("matched");
  }
  renderCards(difficaltyLevel);
}
