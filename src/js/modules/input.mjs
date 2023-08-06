import {cellAnimation} from './animations.mjs'


//********************* */
//* Main Functions
//********************* */

/*
  * all input functions returns true only if any change has been made
    ** eg. added a letter, removed a letter or pressed enter (has no effect, just for consistency sake)
*/
function handleInput(rowCells, key) {
  // unify input
  key = key.toLowerCase();
  // check cases
  if (key === "backspace") { // remove a letter
    return animateAndRemoveLetter(rowCells);
  } else if (key === "enter") { // skip enter and return true
    return true;
  } else if (isLetter(key)) return addLetter(rowCells, key); // add a letter
}

//********************* */
//* Helper Functions
//********************* */

/*
  * Function that animates the last occupied cell and then removes it's content
    ** this is the only function that applies a side effect in input functions
    ** due to the fact that the animation needs to be applied before removing the letter
*/
function animateAndRemoveLetter(rowCells) {
  // iterate backwards on row
  for (let i = rowCells.length - 1; i >= 0; i--) {
    // find last occupied cell
    if (rowCells[i].innerText !== "") {
      // Add animation and remove cell content
      cellAnimation(rowCells[i], "backspace");
      break;
    }
  }
  return true;
}

//* Function that adds a letter to the next empty cell in the current row
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

  // get cell span element
  let emptyCellText = lastEmptyCell.childNodes[0];
  // add content to span
  emptyCellText.innerText = keyValue.toUpperCase();
  return true;
}


//* Function to check if a character is an uppercase or lowercase letter
const isLetter = (letter) => {
  const regex = /^[a-zA-Z]$/;
  return regex.test(letter);
}

export {handleInput}