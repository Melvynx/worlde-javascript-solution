import { characters } from "./const";
import { currentBoard } from "./main";

const renderBoard = () => {
  const board = document.querySelector("#board");

  if (!board) return;

  for (let i = 0; i < currentBoard.length; i++) {
    const boardLine = currentBoard[i];
    const line = document.createElement("div");
    line.classList.add("line");

    for (let j = 0; j < boardLine.length; j++) {
      const character = boardLine[j];
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${i}-${j}`;
      cell.textContent = character || "";
      cell.style.transitionDelay = `${j * 0.4}s`;
      line.appendChild(cell);
    }

    board.appendChild(line);
  }
};

const renderKeyboard = () => {
  const keyboard = document.querySelector("#keyboard");

  if (!keyboard) return;

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    const key = document.createElement("div");
    key.classList.add("keyboard-key");
    key.id = `key-${i}`;

    key.textContent = character || "↵";
    keyboard.appendChild(key);
  }
};

export const init = () => {
  renderBoard();
  renderKeyboard();
};
