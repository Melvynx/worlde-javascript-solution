import { characters } from "./const";
import {
  currentBoard,
  existingCharactersSet,
  perfectCharactersIndexSet,
  perfectCharactersSet,
  wrongCharactersSet,
} from "./main";

const addBoardClassNames = () => {
  for (let i = 0; i < currentBoard.length; i++) {
    const line = currentBoard[i];
    for (let j = 0; j < line.length; j++) {
      const cell = document.querySelector(`#cell-${i}-${j}`);

      if (!cell) return;

      if (wrongCharactersSet.has(line[j])) {
        cell.classList.add("wrong");
      }

      if (existingCharactersSet.has(line[j])) {
        cell.classList.add("correct");
      }

      console.log(perfectCharactersIndexSet, cell.id);
      if (perfectCharactersIndexSet.has(cell.id)) {
        cell.classList.add("perfect");
      }
    }
  }
};

const addKeyboardClassName = () => {
  // make the same for the keyboard
  for (let i = 0; i < characters.length; i++) {
    const key = document.querySelector(`#key-${i}`);

    if (!key) continue;

    if (wrongCharactersSet.has(characters[i])) {
      key.classList.add("wrong");
      continue;
    }

    if (perfectCharactersSet.has(characters[i])) {
      key.classList.add("perfect");
      continue;
    }

    if (existingCharactersSet.has(characters[i])) {
      key.classList.add("correct");
    }
  }
};

export const addCellClassNames = () => {
  addBoardClassNames();
  addKeyboardClassName();
};
