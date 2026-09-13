let cardsList = [
  {
    id: 0,
    img: "img/The-Fool.jpg",
  },
  {
    id: 1,
    img: "img/The-Door.jpg",
  },
  {
    id: 2,
    img: "img/The-Error.jpg",
  },
  {
    id: 3,
    img: "img/The-Hermit.jpg",
  },
  {
    id: 4,
    img: "img/The-Moon.jpg",
  },
  {
    id: 5,
    img: "img/The-Sun.jpg",
  },
  {
    id: 6,
    img: "img/The-Tyrant.jpg",
  },
  {
    id: 7,
    img: "img/The-Visionary.jpg",
  },
  {
    id: 8,
    img: "img/The-Wheel-Of-Fortune.jpg",
  },
  {
    id: 9,
    img: "img/The-White-Tower.jpg",
  },
];
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const devToolsShortcut =
    event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
    (event.ctrlKey && key === "u");

  if (devToolsShortcut) {
    event.preventDefault();
  }
});

let difficaltyLevel;

const introMusic = new Audio("audio/intro.mp3");
introMusic.loop = true;
introMusic.volume = 0.37;
let musicMuted = false;

function shuffleArray(array) {
  const shuffled = [...array]; // copy of the array

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function renderLeaderboard(leaderboard) {
  const leaderboardContainer = document
    .getElementById("leaderboard")
    .getElementsByTagName("ol")[0];
  leaderboardContainer.innerHTML = "";
  for (let i = 0; i < leaderboard.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${leaderboard[i].name}</span><span>${leaderboard[i].score} pt</span><span>${leaderboard[i].time}</span>
      <strong>${leaderboard[i].moves} moves</strong>
    `;
    leaderboardContainer.appendChild(li);
  }
}

function renderCards() {
  const shuffledCards = shuffleArray(cardsList);
  const container = document.getElementById("cards-container");
  container.innerHTML = "";
  let outputCards = [];
  for (let i = 0; i < difficaltyLevel; i++) {
    outputCards.push(shuffledCards[i]);
    outputCards.push(shuffledCards[difficaltyLevel - 1 - i]);
  }
  outputCards = shuffleArray(outputCards);
  for (let i = 0; i < outputCards.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(
      difficaltyLevel === 6
        ? "easy"
        : difficaltyLevel === 8
          ? "medium"
          : "hard",
    );
    card.dataset.id = outputCards[i].id;
    card.innerHTML = `
        <div class="card-inner">
              <div class="card-front">
                <img src="${outputCards[i].img}"/>
              </div>
              <div class="card-back">
                <img src="img/Card-Back.jpg" alt="Face-down tarot card" />
              </div>
            </div>
        `;
    container.appendChild(card);
  }
}
function showWinnerMessege() {
  let winScreen = document.getElementById("win-screen");
  let winner = document.getElementById("player-name").value.toUpperCase();
  let score = document.getElementById("score").textContent;
  let time = document.getElementById("timer").textContent;
  let moves = document.getElementById("moves-counter").textContent;
  introMusic.pause();
  winningMusic.currentTime = 0;
  winScreen.innerHTML = `
  
      <div id="msg-container">
        <h2>Congratulations ${winner}!!</h2>
        <p>You Scored ${score} pt in ${time} time with ${moves} moves</p>
        <div id="btn-container-win">
          <button id="Menu-btn" onclick="backToMenu()">Main Menu</button>
          <button id="save-score" onclick="saveScore()">Save Score</button>
        </div>
  `;
  setTimeout(() => {
    winScreen.style.display = "flex";
  }, 1000);
  setTimeout(() => {
    winningMusic.play().catch(() => {});
  }, 1300);
}
function resetInput() {
  document.getElementById("player-name").value = "";
  document.getElementById("player-name").style.border =
    "1px solid rgba(212, 184, 121, 0.42)";
}
document.getElementById("start-game").addEventListener("click", () => {
  let playerName = document.getElementById("player-name").value;
  if (playerName.trim() === "") {
    document.getElementById("player-name").style.border = "2px solid red";
    return;
  }
  document.getElementById("header").querySelector("h2").innerText = playerName;
  introMusic.play().catch(() => {});
  document.getElementById("main-menu").classList.add("hide");
  document.getElementById("game-page").classList.add("show");
  difficaltyLevel =
    document.getElementById("difficulty").value === "easy"
      ? 6
      : document.getElementById("difficulty").value === "medium"
        ? 8
        : 10;
  resetFirstClick();
  startGame();
});
document.getElementById("back").addEventListener("click", () => {
  stopTimer();
  introMusic.pause();
  introMusic.currentTime = 0;
  resetInput();
  document.getElementById("main-menu").classList.remove("hide");
  document.getElementById("game-page").classList.remove("show");
});

document.getElementById("mute").addEventListener("click", () => {
  musicMuted = !musicMuted;
  introMusic.muted = musicMuted;
  flippedMusic.muted = musicMuted;
  matchingMusic.muted = musicMuted;
  notMatchingMusic.muted = musicMuted;
  winningMusic.muted = musicMuted;
  document.getElementById("mute").classList.toggle("muted", musicMuted);
});

function backToMenu() {
  stopTimer();
  introMusic.pause();
  introMusic.currentTime = 0;
  resetInput();
  document.getElementById("main-menu").classList.remove("hide");
  document.getElementById("game-page").classList.remove("show");
  document.getElementById("win-screen").style.display = "none";
}
