const overlay = document.getElementById("overlay");
const overlayMessage = document.getElementById("overlayMessage");
const actionButton = document.getElementById("actionButton");

const levelNameEl = document.getElementById("levelName");
const targetEmojiEl = document.getElementById("targetEmoji");
const gridEl = document.getElementById("grid");

/* ---------------- Data ---------------- */

const LEVELS = [
  { name: "Super Easy", size: 3 },
  { name: "Easy", size: 4 },
  { name: "Medium", size: 6 },
  { name: "Hard", size: 8 },
  { name: "Devil", size: 10 },
  { name: "Impossible", size: 12 }
];

const EMOJIS = ["😀","😈","👻","🐸","🍕","🚀","🎈","🦄","🐶","🐱","🍎","⚽"];

let currentLevel = 0;
let targetEmoji = "";
let gameActive = false;

/* ---------------- Game Flow ---------------- */

function showOverlay(message, buttonText) {
  overlay.style.display.remove("none");
  overlayMessage.style.display.remove("none");
  actionButton.style.display.remove("none");
  
  overlayMessage.textContent = message;
  actionButton.textContent = buttonText;
  overlay.style.display = "flex";
}

function hideOverlay() {
  overlay.style.display = "none";
  overlayMessage.style.display = "none";
  actionButton.style.display = "none";
}

function startLevel() {
  gameActive = true;
  hideOverlay();

  const level = LEVELS[currentLevel];
  levelNameEl.textContent = level.name;

  const totalCells = level.size * level.size;
  targetEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  targetEmojiEl.textContent = targetEmoji;

  const emojis = [];

  // Fill grid with random emojis
  for (let i = 0; i < totalCells - 1; i++) {
    emojis.push(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
  }

  // Insert target emoji exactly once
  emojis.push(targetEmoji);

  // Shuffle
  emojis.sort(() => Math.random() - 0.5);

  // Build grid
  gridEl.innerHTML = "";
  gridEl.style.gridTemplateColumns = `repeat(${level.size}, 1fr)`;

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
}

function handleWin() {
  currentLevel++;

  if (currentLevel >= LEVELS.length) {
    showOverlay("You beat ALL levels! 🎉", "Play Again");
  } else {
    showOverlay("Level Complete!", "Next Level");
  }
}

/* ---------------- Button Logic ---------------- */

actionButton.addEventListener("click", () => {
  if (currentLevel >= LEVELS.length) {
    currentLevel = 0;
  }

  startLevel();
});

/* ---------------- Initial State ---------------- */

showOverlay("Are You Ready to Find the Emoji", "Start");
