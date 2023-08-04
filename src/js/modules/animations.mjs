//********************** */
//* Global variables
//********************** */

// loading Element
const loadingElement = document.body.querySelector(".loading-container");

//****************************************************** */
//* Main Functions
//****************************************************** */

/*
  * cell animation function takes for parameters:
  * rowCells => which is 1 cell or all cells (1 cell for adding and removing, all for validating)
  * keyValue => the value of the pressed key either on user keyboard or virtual one
  * validationArray, keyboardButtons => only used in the enter key to 
  * animate when validating in both game board cells and keyboard buttons
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
    animateAndRemove(rowCells);
  } else {
    addingAnimation(rowCells);
  }
}

function addingAnimation(rowCells) {
  // find last occupied cell
  let lastOccupiedCell;
  for (let cell of rowCells) if (cell.innerText !== "") lastOccupiedCell = cell
  
  // choose cell Text Element
  let cellText = lastOccupiedCell.querySelector(".letter-text");
  // add animations to the cell
  cellText.classList.add("letter-adding");
  // remove animations from the cell after specified duration
  setTimeout(() => cellText.classList.remove("letter-adding"), 200);
}

function animateAndRemove(rowCells) {
  let cellText = rowCells.querySelector(".letter-text");
  // add animations to the removed cell
  cellText.classList.add("letter-removing");
  // remove occupied cell content
  setTimeout(() => cellText.innerText = "", 200);
  // remove animations
  setTimeout(() => cellText.classList.remove("letter-removing"), 200);
}

function rejectionAnimation(rowCells) {
  // Get Cells Parent => (row)
  let row = rowCells[0].parentNode;
  // add animation
  row.classList.add("row-rejection");
  for (let cell of rowCells) cell.classList.add("cell-rejection");
  setTimeout(() => {
    row.classList.remove("row-rejection");
    for (let cell of rowCells) cell.classList.remove("cell-rejection");
  }, 1000);
}

function validationAnimation(rowCells, validationArray, keyboardButtons) {
  let animationDelay = 0.15;
  for (let i = 0; i < validationArray.length; i++) {
    // current cell in gameBoard
    let currentCell = rowCells[i];
    // find relative keyboard button in virtual keyboard
    let keyboardButton;
    for (let button of keyboardButtons) {
      if (button.innerText.toLowerCase() === currentCell.innerText.toLowerCase()) {
        keyboardButton = button;
      }
    }
    // current relative validation cell value
    let validationCell = validationArray[i];
    const currentTheme = document.querySelector(".switch__checkbox").getAttribute("data-theme");

    // animate gameBoard cell
    currentCell.classList.add("game-board-validation");
    keyboardButton.classList.add("keyboard-validation");
    // give different delay between cells and keyboard buttons
    currentCell.style.animationDelay = `${i * animationDelay}s`;
    keyboardButton.style.animationDelay = `${i * animationDelay}s`;
    setTimeout(() => {
      if (validationCell === true) {
        // add default classes
        currentCell.classList.add("game-board__letter--correct");
        keyboardButton.classList.add("keyboard__letter--correct");

        // check for dark theme and apply related classes if so
        if (currentTheme === "dark") {
          currentCell.classList.add("game-board__letter--correct-dark");
          keyboardButton.classList.add("keyboard__letter--correct-dark");
        }
      } else if (validationCell === "close") {
        currentCell.classList.add("game-board__letter--close");
        keyboardButton.classList.add("keyboard__letter--close");

        if (currentTheme === "dark") {
          currentCell.classList.add("game-board__letter--close-dark");
          keyboardButton.classList.add("keyboard__letter--close-dark");
        }
      } else {
        currentCell.classList.add("game-board__letter--missing");
        keyboardButton.classList.add("keyboard__letter--missing");

        if (currentTheme === "dark") {
          currentCell.classList.add("game-board__letter--missing-dark");
          keyboardButton.classList.add("keyboard__letter--missing-dark");
        }
      }
    }, 500 + (i * (animationDelay * 1000)));

    // remove keyboard animation after finishing
    setTimeout(() => {
      keyboardButton.classList.remove("keyboard-validation");
      keyboardButton.style.removeProperty("animation-delay");
    }, 1000 + (i * (animationDelay * 1000)));
  }
}

// function to mimic validation animation for dialog test cells
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

function keyboardAnimation(keyboardButtons, keyValue) {
  // set initial variables
  let pressedButton;
  let keyLowerCased = keyValue.toLowerCase();

  // Get corresponding pressed button on keyboard
  if (keyLowerCased === "backspace") { //* if removing a letter
    pressedButton = document.querySelector(".backspace-button");
    // Animation
    pressedButton.classList.add("backspace-typing");
  } else if (keyLowerCased === "enter") { //* if submitting a guess
    pressedButton = document.querySelector(".enter-button");
    // Animation
    pressedButton.classList.add("enter-typing");
  } else { //* if adding a letter
    // find relative button on keyboard
    for (let button of keyboardButtons) { //* for other letters
      /*
        * button text lowercasing is unnecessary for most cases
        * only for stricter checking
      */
      if (button.innerHTML.toLowerCase() === keyLowerCased) {
        pressedButton = button;
        break;
      }
    }

    // Animation
    pressedButton.classList.add("letter-typing");
  }

  // if DOM was changed and the button wasn't found (probably never 😆)
  if (pressedButton === undefined) { fun(); return; }
}

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

function dialogsEntryAnimation(dialog) {
  dialog.classList.add("dialog-entry");
}

function dialogsExitAnimation(dialog) {
  dialog.classList.remove("dialog-entry");
  dialog.classList.add("dialog-exit");
  setTimeout(() => {
    dialog.classList.remove("dialog-exit");
  }, 500)
}

//* Function to show loading spinner element
function showLoading() {
  loadingElement.style.visibility = "visible";
}
//* Function to hide loading spinner element
function hideLoading() {
  loadingElement.style.visibility = "hidden";
}

export {cellAnimation, keyboardAnimation, removeKeyboardAnimations,
       dialogsEntryAnimation, dialogsExitAnimation, fakeValidationAnimation,
       showLoading, hideLoading};