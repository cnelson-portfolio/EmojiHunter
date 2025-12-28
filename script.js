const overlay = document.getElementById("overlay");
const overlayMessage = document.getElementById("overlayMessage");
const actionButton = document.getElementById("actionButton");

const levelNameEl = document.getElementById("levelName");
const targetEmojiEl = document.getElementById("targetEmoji");
const gridEl = document.getElementById("grid");

/* ---------------- Data ---------------- */

const LEVELS = [
  { name: "Super Easy", size: 2 },
  { name: "Easy", size: 3 },
  { name: "Medium", size: 5 },
  { name: "Hard", size: 10 },
  { name: "Devil", size: 16 },
  { name: "Impossible", size: 20 }
];

/* 100 unique emojis */
const EMOJIS = [
  "😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇",
  "🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚",
  "😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔",
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯",
  "🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🐤","🐣",
  "🍎","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍒","🥝",
  "🍕","🍔","🌭","🍟","🍿","🧀","🥨","🥐","🍩","🍪",
  "⚽","🏀","🏈","⚾","🎾","🏐","🎱","🚗","🚕","🚙"
];

let currentLevel = 0;
let targetEmoji = "";
let gameActive = false;

/* ---------------- Overlay ---------------- */

function showOverlay(message, buttonText) {
  overlayMessage.textContent = message;
  actionButton.textContent = buttonText;
  overlay.style.display = "flex";
}

function hideOverlay() {
  overlay.style.display = "none";
}

/* ---------------- Game Logic ---------------- */

function startLevel() {
  gameActive = true;
  hideOverlay();

  const level = LEVELS[currentLevel];
  levelNameEl.textContent = level.name;

  const totalCells = level.size * level.size;
  targetEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  targetEmojiEl.textContent = targetEmoji;

  const emojis = [];
  const nonTargetEmojis = EMOJIS.filter(e => e !== targetEmoji);

  for (let i = 0; i < totalCells - 1; i++) {
    emojis.push(
      nonTargetEmojis[Math.floor(Math.random() * nonTargetEmojis.length)]
    );
  }

  emojis.push(targetEmoji);
  emojis.sort(() => Math.random() - 0.5);

  buildGrid(level.size, emojis);
}

function buildGrid(size, emojis) {
  gridEl.innerHTML = "";
  gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  // Calculate emoji size dynamically
  const gridSize = gridEl.clientWidth;
  const cellSize = gridSize / size;
  const emojiSize = Math.floor(cellSize * 0.65);

  emojis.forEach(emoji => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = emoji;
    cell.style.fontSize = `${emojiSize}px`;

    cell.addEventListener("click", () => {
      if (!gameActive) return;
      if (emoji === targetEmoji) {
        gameActive = false;
        handleWin();
      }
    });

    gridEl.appendChild(cell);
  });
}

function handleWin() {
  currentLevel++;
  if (currentLevel >= LEVELS.length) {
    showOverlay("You beat ALL levels! 🎉", "Play Again");
  } else {
    showOverlay("Level Complete!", "Next Level");
  }
}

/* ---------------- Button ---------------- */

actionButton.addEventListener("click", () => {
  if (currentLevel >= LEVELS.length) currentLevel = 0;
  startLevel();
});

/* ---------------- Init ---------------- */

showOverlay("Can YOU Find the Emoji", "Start");
