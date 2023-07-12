//****************************************************** */
//* Typing Functions
//****************************************************** */

/*
* all input functions returns true only if any change has been made
* eg. added a letter, removed a letter
*/

export function handleInput(rowCells, key) {
  // unify input
  key = key.toLowerCase();
  // check cases
  if (key === "backspace") { // remove a letter
    return removeLetter(rowCells);
  } else if (key === "enter") { // validate input
    return true;
  } else if (isLetter(key)) return addLetter(rowCells, key); // add a letter
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
  
  // add animation and letter to cell
  lastEmptyCell.innerHTML = keyValue.toUpperCase();
  return true;
}

function removeLetter(rowCells) {
  // iterate backwards on row
  for (let i = rowCells.length - 1; i >= 0; i--) {
    // find last occupied cell
    if (rowCells[i].innerHTML !== "") {
      // add animation and remove cell
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

//****************************************************** */
//* Animations Functions
//****************************************************** */

export function cellAnimation(rowCells, keyValue) {
  // unify input
  keyValue = keyValue.toLowerCase();

  if (keyValue === "enter") { // if validating input
    // Validation animation
  } else if (keyValue === "backspace") { // if deleting letters
    // add animations to the removed cell
    rowCells.style.animation = "swipe-left 0.3s ease-in";
    // remove occupied cell content
    setTimeout(() => rowCells.innerHTML = "", 200);
    // remove animations
    setTimeout(() => rowCells.removeAttribute("style"), 300);
  } else { // if typing input
    // find last occupied cell
    let lastOccupiedCell;
    for (let cell of rowCells) {if (cell.innerHTML !== "") lastOccupiedCell = cell;}

    // add animations to the cell
    lastOccupiedCell.style.animation = "pop-box 0.20s ease-out, swipe-right 0.20s ease-out";
    // remove animations from the cell after specified duration
    setTimeout(() => lastOccupiedCell.removeAttribute("style"), 200);
  }
}

export function keyboardAnimation(keyboardButtons, keyValue) {
  // set initial variables
  let pressedButton;
  let keyUpperCased = keyValue.toUpperCase();

  // Get corresponding pressed button on keyboard
  if (keyValue === "Backspace") { // if removing a letter
    pressedButton = document.querySelector(".keyboard__letter[aria-label='Backspace']");
    // Animation (using transition to preserve state on hold)
    pressedButton.style.backgroundColor = "#B22222";
    pressedButton.style.scale = "0.9";
    pressedButton.style.translate = "0 2px";
  } else if (keyValue === "Enter") { // if submitting a guess
    pressedButton = document.querySelector(".keyboard__letter[aria-label='Enter']");
    // Animation
    pressedButton.style.backgroundColor = "#5d9b55";
    pressedButton.style.scale = "0.9";
    pressedButton.style.translate = "0 2px";
  } else {
    // find relative button on keyboard
    for (let button of keyboardButtons) {
      // button text uppercasing is unnecessary for most cases
      // only for stricter checking
      if (button.innerHTML.toUpperCase() === keyUpperCased) {
        pressedButton = button;
        break;
      }
    }
    // Animation
    pressedButton.style.opacity = "0.8";
    pressedButton.style.scale = "0.9";
    pressedButton.style.translate = "0 3px";
  }
  
  // if DOM was changed and the button wasn't found (probably never 😆)
  if (pressedButton === undefined) {fun(); return;}
}

export function removeKeyboardAnimations(keyboardButtons, keyValue) {
  let pressedButton;
  let keyUpperCased = keyValue.toUpperCase();
  if (keyValue === "Backspace") {
    pressedButton = document.querySelector(".keyboard__letter[aria-label='Backspace']");
  } else if (keyValue === "Enter") {
    pressedButton = document.querySelector(".keyboard__letter[aria-label='Enter']");
  } else {
    for (let button of keyboardButtons) {
      if (button.innerHTML.toUpperCase() === keyUpperCased) {
        pressedButton = button;
        break;
      }
    }
  }

  // if other buttons are pressed
  if (pressedButton === undefined) {fun(); return;}

  // remove after transition duration is complete
  if (keyValue === "Enter" || keyValue === "Backspace") {
    setTimeout(() => pressedButton.removeAttribute("style"), 200);
  } else {
    setTimeout(() => pressedButton.removeAttribute("style"), 150);
  }
}

const fun = () => {
  console.log(`Know what the button said to the clicker? 
~crying in sadness~ 
it just feels like, you're always pushing me away 😢`);
}