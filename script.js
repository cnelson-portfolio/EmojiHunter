const overlay = document.getElementById("overlay");
const overlayMessage = document.getElementById("overlayMessage");
const actionButton = document.getElementById("actionButton");

const levelNameEl = document.getElementById("levelName");
const targetEmojiEl = document.getElementById("targetEmoji");
const gridEl = document.getElementById("grid");

/* ---------------- DATA ---------------- */

const LEVELS = [
  { name: "Super Easy", size: 2 },
  { name: "Easy", size: 3 },
  { name: "Medium", size: 5 },
  { name: "Hard", size: 10 },
  { name: "Devil", size: 16 },
  { name: "Impossible", size: 20 },
  { name: "BONUS: 0% People Make This", size: 25 }
];

const EMOJIS = [
  "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊",
  "😍","🥰","😘","😜","🤪","😎","🤩","🥳","😈","👻",
  "💀","👽","🤖","🎃","🐶","🐱","🐭","🐹","🐰","🦊",
  "🐻","🐼","🐸","🦄","🐷","🐵","🐔","🐧","🐦","🐤",
  "🍎","🍌","🍇","🍉","🍓","🍒","🍍","🥝","🥑","🍕",
  "🍔","🌮","🍩","🍪","🎂","🍿","⚽","🏀","🏈","🎾",
  "🎲","🎮","🎯","🚗","🚀","✈️","🚁","🛸","⛵","🚲",
  "🏖️","🏕️","🌋","🌈","🔥","💎","⭐","🌙","☀️","⚡"
];

let currentLevel = 0;
let targetEmoji = "";
let gameActive = false;

/* ---------------- OVERLAY ---------------- */

function showOverlay(message, buttonText) {
  overlayMessage.textContent = message;
  actionButton.textContent = buttonText;
  overlay.style.display = "flex";
}

function hideOverlay() {
  overlay.style.display = "none";
}

/* ---------------- GRID SCALING ---------------- */

function scaleEmojis() {
  const cell = document.querySelector(".cell");
  if (!cell) return;

  const size = Math.min(cell.offsetWidth, cell.offsetHeight);
  const fontSize = size * 0.8;

  document.querySelectorAll(".cell").forEach(c => {
    c.style.fontSize = `${fontSize}px`;
  });
}

/* ---------------- GAME ---------------- */

function startLevel() {
  gameActive = true;
  hideOverlay();

  const level = LEVELS[currentLevel];
  levelNameEl.textContent = level.name;

  const totalCells = level.size * level.size;
  targetEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  targetEmojiEl.textContent = targetEmoji;

  const nonTargets = EMOJIS.filter(e => e !== targetEmoji);
  const emojis = [];

  for (let i = 0; i < totalCells - 1; i++) {
    emojis.push(nonTargets[Math.floor(Math.random() * nonTargets.length)]);
  }

  emojis.push(targetEmoji);
  emojis.sort(() => Math.random() - 0.5);

  gridEl.innerHTML = "";
  gridEl.style.gridTemplateColumns = `repeat(${level.size}, 1fr)`;
  gridEl.style.gridTemplateRows = `repeat(${level.size}, 1fr)`;

  emojis.forEach(emoji => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = emoji;

    cell.addEventListener("click", () => {
      if (!gameActive) return;
      if (emoji === targetEmoji) {
        gameActive = false;
        handleWin();
      }
    });

    gridEl.appendChild(cell);
  });

  // 🔑 scale after render
  requestAnimationFrame(scaleEmojis);
}

function handleWin() {
  currentLevel++;
  if (currentLevel >= LEVELS.length) {
    showOverlay("You beat ALL levels! 🎉", "Play Again");
  } else {
    showOverlay("Level Complete!", "Next Level");
  }
}

/* ---------------- BUTTON ---------------- */

actionButton.addEventListener("click", () => {
  if (currentLevel >= LEVELS.length) currentLevel = 0;
  startLevel();
});

/* ---------------- RESIZE SUPPORT ---------------- */

window.addEventListener("resize", scaleEmojis);
window.addEventListener("orientationchange", scaleEmojis);

/* ---------------- INIT ---------------- */

showOverlay("Can YOU Find the Emoji??", "Start");
