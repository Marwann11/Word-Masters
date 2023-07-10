"use strict";

function main() {
  document.body.addEventListener("keydown", (ev) => {
    // get current active gameBoard row, keyboard buttons and pressed key value
    const rowCells = document.querySelector(".game-board__row[data-state='TBD']").children;
    const keyboardBtns = document.querySelectorAll(".keyboard__letter");
    const key = ev.key;
    
    // check if letter was successfully added to gameBoard
    const cellsChanged = handleInput(rowCells, key);

    if (cellsChanged) {
      if (key !== "Backspace") cellAnimation(rowCells);
      keyboardAnimation(keyboardBtns, key);
    }
  });
}


/*
* handleInput function returns true only if a letter was successfully added
*/

function handleInput(rowCells, key) {
  // remove a letter
  if (key === "Backspace") { 
    return removeLetter(rowCells);
  }

  // add a letter
  if (isLetter(key)) return addLetter(rowCells, key);
}

const isLetter = (letter) => {
  const regex = /^[a-zA-Z]$/;
  return regex.test(letter);
}

function addLetter(rowCells, keyValue) {
  // initial value for last empty cell
  let lastEmptyCell;

  // find last empty cell
  for (let cell of rowCells) {
    if (cell.innerHTML === "") {
      // set last empty cell and break
      lastEmptyCell = cell; 
      break;
    }
  }

  // if all cells are occupied
  if (lastEmptyCell === undefined) return false;

  // set cell value to pressed key value
  lastEmptyCell.innerHTML = keyValue.toUpperCase()
  return true;
}

function removeLetter(rowCells) {
  // iterate backwards on row
  for (let i = rowCells.length - 1; i >= 0; i--) {
    // find last occupied cell
    if (rowCells[i].innerHTML !== "") {
      // remove occupied cell content and break
      rowCells[i].innerHTML = "";
      break;
    }
  }
  return true;
}

function cellAnimation(rowCells) {
  // find last occupied cell
  let lastOccupiedCell;
  for (let cell of rowCells) {if (cell.innerHTML !== "") lastOccupiedCell = cell;}

  // add animations to the cell
  lastOccupiedCell.style.animation = "pop-box 0.20s ease-out"
  // remove animations from the cell after specified duration
  setTimeout(() => lastOccupiedCell.removeAttribute("style"), 200);
}

function keyboardAnimation(keyboardButtons, keyValue) {
  // set initial variables
  let pressedButton;
  let keyValueUppercased = keyValue.toUpperCase();

  // Get corresponding pressed button on keyboard
  if (keyValue === "Backspace") { // if removing a letter
    pressedButton = document.querySelector(".keyboard__letter[aria-label='Backspace']");
  } else if (keyValue === "Enter") { // if submitting a guess
    pressedButton = document.querySelector(".keyboard__letter[aria-label='Enter']");
  } else {
    // find relative button on keyboard
    for (let button of keyboardButtons) {
      // button text uppercasing is unnecessary for most cases
      // only for stricter checking
      if (button.innerHTML.toUpperCase() === keyValueUppercased) {
        pressedButton = button;
        break;
      }
    }
  }
  
  // if DOM was changed and the button wasn't found (probably never 😆)
  if (pressedButton === undefined) {fun(); return;}

  // add animation
  pressedButton.style.animation = "push-button 0.20s ease-out";
  // remove animation after duration
  setTimeout(() => pressedButton.removeAttribute("style"), 200);
}

const fun = () => {
  console.log(`Know what the button said to the clicker? 
~crying in sadness~ 
it just feels like, you're always pushing me away 😢`);
}

main();


