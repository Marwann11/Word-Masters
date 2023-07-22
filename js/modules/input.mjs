import {cellAnimation} from './animations.mjs'

/*
* all input functions returns true only if any change has been made
* eg. added a letter, removed a letter or (pressed enter (has no effect, just for consistency))
*/

export function handleInput(rowCells, key) {
  // unify input
  key = key.toLowerCase();
  // check cases
  if (key === "backspace") { // remove a letter
    return animateAndRemoveLetter(rowCells);
  } else if (key === "enter") { // skip enter and return true
    return true;
  } else if (isLetter(key)) return addLetter(rowCells, key); // add a letter
}

function addLetter(rowCells, keyValue) {
  // initial value for last empty cell
  let lastEmptyCell;

  // find last empty cell
  for (let cell of rowCells) {
    if (cell.innerText === "") {
      // set last empty cell and break
      lastEmptyCell = cell;
      break;
    }
  }

  // if all cells are occupied
  if (lastEmptyCell === undefined) return false;

  let emptyCellText = lastEmptyCell.childNodes[0];
  // add animation and letter to cell
  emptyCellText.innerText = keyValue.toUpperCase();
  return true;
}

/*
  * animateAndRemoveLetter function is the only function that applies a side effect also in 
  * it's declaration (it does the animation in addition to removing the letter) 
  * due to the fact that the animation needs to be applied before removing the letter
*/

function animateAndRemoveLetter(rowCells) {
  // iterate backwards on row
  for (let i = rowCells.length - 1; i >= 0; i--) {
    // find last occupied cell
    if (rowCells[i].innerText !== "") {
      // Add animation 
      cellAnimation(rowCells[i], "backspace");
      break;
    }
  }
  return true;
}

const isLetter = (letter) => {
  const regex = /^[a-zA-Z]$/;
  return regex.test(letter);
}
