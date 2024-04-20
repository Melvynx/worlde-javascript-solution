import { addCellClassNames } from "./board-style";
import { Board, Character, MOTS, characters } from "./const";
import { init } from "./init";

// Game constantes
export const currentBoard: Board = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];
let currentLine = 0;
let currentKeyIndex = 0;
let secretWord = MOTS[Math.floor(Math.random() * MOTS.length)]
  .split("")
  .map((p) => p.toUpperCase());

export let existingCharactersSet = new Set();
export let perfectCharactersSet = new Set();
export let wrongCharactersSet = new Set();
export let perfectCharactersIndexSet = new Set();

const onLineFinish = () => {
  const currentWorld = currentBoard[currentLine];

  for (let i = 0; i < currentWorld.length; i++) {
    const character = currentWorld[i];

    if (character === null) continue;

    if (secretWord.includes(character)) {
      existingCharactersSet.add(character);

      if (secretWord[i] === character) {
        perfectCharactersIndexSet.add(`cell-${currentLine}-${i}`);
        perfectCharactersSet.add(character);
        existingCharactersSet.delete(character);
      }
    } else {
      wrongCharactersSet.add(character);
    }
  }

  addCellClassNames();

  const isCorrect = currentWorld.every(
    (character, index) => character === secretWord[index]
  );

  if (isCorrect) {
    setTimeout(() => {
      alert("You have finished the game");
    }, 1000);
  }

  currentLine += 1;
  currentKeyIndex = 0;
};

const onKeyDown = (event: KeyboardEvent) => {
  const key = event.key.toUpperCase();

  if (currentLine >= currentBoard.length) return;

  if (key === "ENTER") {
    if (currentKeyIndex !== 5) {
      alert("You must complete the line before going to the next one");
      return;
    }

    onLineFinish();
    return;
  }

  if (key === "BACKSPACE") {
    if (currentKeyIndex === 0) return;

    currentKeyIndex -= 1;

    const cell = document.querySelector(
      `#cell-${currentLine}-${currentKeyIndex}`
    );
    if (!cell) return;

    cell.textContent = "";

    return;
  }

  const cell = document.querySelector(
    `#cell-${currentLine}-${currentKeyIndex}`
  );
  if (!cell) return;

  // verify that the key is include inside the characters array
  if (!characters.includes(key as Character)) {
    return;
  }

  cell.textContent = key;

  currentBoard[currentLine][currentKeyIndex] = key as Character;

  currentKeyIndex += 1;
};

const onDocumentLoad = () => {
  init();
};

document.addEventListener("keydown", onKeyDown);
document.addEventListener("DOMContentLoaded", onDocumentLoad);
