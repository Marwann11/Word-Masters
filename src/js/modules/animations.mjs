//********************** */
//* Global variables
//********************** */

// loading spinner Element
const loadingElement = document.body.querySelector(".loading-container");

//*********************************************** */
//* Game board cells and keyboard Functions
//*********************************************** */

//********************* */
//* Main Functions
//********************* */

/*
  * cell animation function takes four arguments:
    ** rowCells => which is one cell or all cells (one cell for removing, all cells for adding or validating)
    ** keyValue => the value of the pressed key either on user keyboard or virtual one
    ** validationArray, keyboardButtons => only used in the enter key to 
    ** animate when validating in both game board cells and keyboard buttons
*/
function cellAnimation(rowCells, keyValue, validationArray, keyboardButtons) {
  // unify input
  keyValue = keyValue.toLowerCase();

  if (keyValue === "enter") { // if validating input
    if (validationArray === undefined) {
      rejectionAnimation(rowCells);
    } else {
      validationAnimation(rowCells, validationArray, keyboardButtons);
    }
  } else if (keyValue === "backspace") { // if deleting letters
    // rowCells is only 1 cell in this block, so it's more logical that the variable represents it's meaning
    const rowCell = rowCells;
    animateAndRemove(rowCell);
  } else { // if adding letters
    addingAnimation(rowCells);
  }
}

//********************* */
//* Helper Functions
//********************* */

/*
  * This function handles the animation of wrong input for the Enter key
    ** RowCells => the cells that the animation is applied to
*/
function rejectionAnimation(rowCells) {
  // Get Cells Parent => (row)
  let row = rowCells[0].parentNode;
  // add row animation
  row.classList.add("row-rejection");
  // add cells animation
  for (let cell of rowCells) cell.classList.add("cell-rejection");
  // remove the row and cells animations after duration ends
  setTimeout(() => {
    row.classList.remove("row-rejection");
    for (let cell of rowCells) cell.classList.remove("cell-rejection");
  }, 1000);
}

/*
  * This function handles the animation of valid input for the Enter key
    ** RowCells => the cells that the animation is applied to
    ** validationArray => the array that determines how each cell will be changed (true => correct, "close" => close, false => missing)
    ** keyboardButtons => all keyboard buttons (to apply animation to corresponding buttons)
*/
function validationAnimation(rowCells, validationArray, keyboardButtons) {
  // animation delay for each cell
  let animationDelay = 0.15;

  // for each value in validationArray
  for (let i = 0; i < validationArray.length; i++) {
    // current cell in row
    let currentCell = rowCells[i];
    // find relative keyboard button in the on-screen keyboard
    let keyboardButton;
    for (let button of keyboardButtons) {
      // toUpperCase is mostly unnecessary here but just for strict checking
      if (button.innerText.toUpperCase() === currentCell.innerText.toUpperCase()) {
        keyboardButton = button;
      }
    }
    // current validation cell value
    let validationCell = validationArray[i];
    // get the current theme
    const currentTheme = document.querySelector(".switch__checkbox").getAttribute("data-theme");

    // animate current row cell and keyboard button
    currentCell.classList.add("game-board-validation");
    keyboardButton.classList.add("keyboard-validation");

    // give different delay between each cell and each keyboard button
    currentCell.style.animationDelay = `${i * animationDelay}s`;
    keyboardButton.style.animationDelay = `${i * animationDelay}s`;

    // after half of the animation time passes, add the validation relative colors
    setTimeout(() => {
      // change cells and keyboard colors for visual feedback
      handleValidationColors(currentCell, keyboardButton, validationCell, currentTheme);
    }, 500 + (i * (animationDelay * 1000)));

    // remove keyboard animation after finishing
    setTimeout(() => {
      keyboardButton.classList.remove("keyboard-validation");
      keyboardButton.style.removeProperty("animation-delay");
    }, 1000 + (i * (animationDelay * 1000)));
  }
}

/*
  * This function adds the relative coloring class to current cell and current keyboard button
    ** based on the values of validationCell and currentTheme
*/
function handleValidationColors(currentCell, currentKeyboardButton, validationCell, currentTheme) {
  // general cell and keyboard button classes
  const cellClass = "game-board__letter"
  const btnClass = "keyboard__letter"

  if (validationCell === true) {
    // correct state classes
    const correctCellClass = `${cellClass}--correct`;
    const correctBtnClass = `${btnClass}--correct`;

    // add default classes
    currentCell.classList.add(correctCellClass);
    currentKeyboardButton.classList.add(correctBtnClass);

    // check for dark theme and apply related classes if found
    if (currentTheme === "dark") {
      currentCell.classList.add(`${correctCellClass}-dark`);
      currentKeyboardButton.classList.add(`${correctBtnClass}-dark`);
    }
  } else if (validationCell === "close") {
    // close state classes
    const closeCellClass = `${cellClass}--close`;
    const closeBtnClass = `${btnClass}--close`;

    currentCell.classList.add(closeCellClass);
    currentKeyboardButton.classList.add(closeBtnClass);

    if (currentTheme === "dark") {
      currentCell.classList.add(`${closeCellClass}-dark`);
      currentKeyboardButton.classList.add(`${closeBtnClass}-dark`);
    }
  } else {
    // missing state classes
    const missingCellClass = `${cellClass}--missing`;
    const missingBtnClass = `${btnClass}--missing`;

    currentCell.classList.add(missingCellClass);
    currentKeyboardButton.classList.add(missingBtnClass);

    if (currentTheme === "dark") {
      currentCell.classList.add(`${missingCellClass}-dark`);
      currentKeyboardButton.classList.add(`${missingBtnClass}-dark`);
    }
  }
}

/*
  * This function takes as argument one cell, adds removal animation and removes it's content
    ** Just as specified in animateAndRemoveLetter function (input.mjs)
    ** this function handles both the input functionality and animation functionality
*/
function animateAndRemove(rowCell) {
  // choose the cell span element
  let cellText = rowCell.querySelector(".letter-text");

  // add removing animation to span
  cellText.classList.add("letter-removing");

  // after animation ends
  setTimeout(() => {
    // remove cell content
    cellText.innerText = "";
    // remove animation to allow for future animations
    cellText.classList.remove("letter-removing");
  }, 200);
}

//* Function to add the insertion animation on the last occupied cell
function addingAnimation(rowCells) {
  // find last occupied cell
  let lastOccupiedCell;

  for (let cell of rowCells) if (cell.innerText !== "") lastOccupiedCell = cell

  // choose cell span Element
  let cellText = lastOccupiedCell.querySelector(".letter-text");
  // add animations to the cell
  cellText.classList.add("letter-adding");
  // remove animations from the cell after animation ends
  setTimeout(() => cellText.classList.remove("letter-adding"), 200);
}

//* Function to mimic validation animation for how to play dialog fake game row
function fakeValidationAnimation(rowCells) {
  let animationDelay = 150;

  for (let i = 0; i < rowCells.length; i++) {
    // get current cell
    let currentCell = rowCells[i];

    // animate fake cell
    setTimeout(() => {
      currentCell.classList.add("game-board-validation");
    }, 200 + (i * (animationDelay)))

    // remove cell animation after finishing
    setTimeout(() => {
      currentCell.classList.remove("game-board-validation")
    }, 1200 + (i * (animationDelay)));
  }
}

/*
  * Function to handle keyboard animations on different keydown events
    ** backspace event
    ** enter
    ** other uppercase-lowercase letters
*/
function keyboardAnimation(keyboardButtons, keyValue) {
  // set initial variables
  let pressedButton;
  let keyLowerCased = keyValue.toLowerCase();

  // Get corresponding pressed button on keyboard
  if (keyLowerCased === "backspace") {
    //* if removing a letter
    // get backspace button
    pressedButton = document.querySelector(".backspace-button");
    // Add animation
    pressedButton.classList.add("backspace-typing");
  } else if (keyLowerCased === "enter") {
    //* if submitting a guess
    // get enter button
    pressedButton = document.querySelector(".enter-button");
    // Add animation
    pressedButton.classList.add("enter-typing");
  } else {
    //* for other buttons
    // find relative button on keyboard
    for (let button of keyboardButtons) {
      //* button text lowercasing is unnecessary for most cases only for stricter checking
      if (button.innerHTML.toLowerCase() === keyLowerCased) {
        pressedButton = button;
        break;
      }
    }
    // Add animation
    pressedButton.classList.add("letter-typing");
  }

  // for other keys (symbols, numbers...etc)
  if (pressedButton === undefined) { fun(); return; }
}

/*
  * Function to remove keyboard animations on keyup event
    ** the animation on each button is added once with keyboardAnimation function
    ** and removed only with key is released
*/
function removeKeyboardAnimations(keyboardButtons, keyValue) {
  // Get pressed button and unify input
  let pressedButton;
  let keyLowerCased = keyValue.toLowerCase();
  // check cases
  if (keyLowerCased === "backspace") {
    pressedButton = document.querySelector(".backspace-button");
  } else if (keyLowerCased === "enter") {
    pressedButton = document.querySelector(".enter-button");
  } else {
    for (let button of keyboardButtons) {
      if (button.innerHTML.toLowerCase() === keyLowerCased) {
        pressedButton = button;
        break;
      }
    }
  }

  // if other buttons are pressed
  if (pressedButton === undefined) { fun(); return; }

  // remove after animation duration is complete
  setTimeout(() => {
    if (pressedButton.classList.contains("backspace-typing")) {
      pressedButton.classList.remove("backspace-typing");
    } else if (pressedButton.classList.contains("enter-typing")) {
      pressedButton.classList.remove("enter-typing");
    } else if (pressedButton.classList.contains("letter-typing")) {
      pressedButton.classList.remove("letter-typing");
    }
  }, 150);
}
 
const fun = () => {
  console.log(`Know what the button said to the clicker? 
~crying in sadness~ 
it just feels like, you're always pushing me away 😢`);
}

//************************************** */
//* Dialogs Functions
//************************************** */

//* Function that adds the entry animation to a dialog
function dialogsEntryAnimation(dialog) {
  dialog.classList.add("dialog-entry");
}

//* Function that adds the exit animation to a dialog and removes hanging animations classes
function dialogsExitAnimation(dialog) {
  dialog.classList.remove("dialog-entry");
  dialog.classList.add("dialog-exit");
  setTimeout(() => {
    dialog.classList.remove("dialog-exit");
  }, 500)
}

//************************************** */
//* loading element Functions
//************************************** */

//* Function to show loading spinner element
function showLoading() {
  loadingElement.style.visibility = "visible";
}
//* Function to hide loading spinner element
function hideLoading() {
  loadingElement.style.visibility = "hidden";
}


export {
  cellAnimation, keyboardAnimation, removeKeyboardAnimations,
  dialogsEntryAnimation, dialogsExitAnimation, fakeValidationAnimation,
  showLoading, hideLoading
};