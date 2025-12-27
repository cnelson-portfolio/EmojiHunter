const gridEl = document.getElementById("grid");
const levelNameEl = document.getElementById("level-name");
const targetEmojiEl = document.getElementById("target-emoji");
const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("overlay-text");
const nextBtn = document.getElementById("next-btn");

/* ---------------- LEVELS ---------------- */

const LEVELS = [
  { name: "Super Easy", size: 3 },
  { name: "Easy", size: 5 },
  { name: "Medium", size: 8 },
  { name: "Hard", size: 12 },
  { name: "Devil", size: 18 },
  { name: "Impossible", size: 25 }
];

let currentLevel = 0;

/* ---------------- EMOJIS ---------------- */

const EMOJIS = [
  "😀","😃","😄","😁","😆","😅","😂","🙂","🙃","😉",
  "😊","😇","🥰","😍","🤪","😎","🥸","😺","😸","😹",
  "😻","😼","🙈","🙉","🙊","🐶","🐱","🐭","🐹","🐰"
];

function randomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

/* ---------------- GAME ---------------- */

function startLevel() {
  overlay.classList.add("hidden");
  gridEl.innerHTML = "";

  const level = LEVELS[currentLevel];
  levelNameEl.textContent = level.name;

  const size = level.size;
  gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  const targetEmoji = randomEmoji();
  targetEmojiEl.textContent = targetEmoji;

  const totalCells = size * size;
  const cells = [];

  // Fill grid with random emojis (excluding target)
  while (cells.length < totalCells) {
    const e = randomEmoji();
    if (e !== targetEmoji) cells.push(e);
  }

  // Insert target emoji once
  const targetIndex = Math.floor(Math.random() * totalCells);
  cells[targetIndex] = targetEmoji;

  // Render grid
  cells.forEach(emoji => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = emoji;

    cell.addEventListener("click", () => {
      if (emoji === targetEmoji) {
        winLevel();
      } else {
        cell.style.opacity = "0.3";
      }
    });

    gridEl.appendChild(cell);
  });
}

function winLevel() {
  overlay.classList.remove("hidden");

  if (currentLevel < LEVELS.length - 1) {
    overlayText.textContent = "🎉 You found it!";
    nextBtn.textContent = "Next Level";
  } else {
    overlayText.textContent = "🏆 You beat IMPOSSIBLE!";
    nextBtn.textContent = "Play Again";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentLevel < LEVELS.length - 1) {
    currentLevel++;
  } else {
    currentLevel = 0;
  }
  startLevel();
});

/* ---------------- START ---------------- */

startLevel();
