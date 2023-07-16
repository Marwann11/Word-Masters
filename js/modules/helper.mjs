//****************************************************** */
//* Main Variables
//****************************************************** */

// Get word of the day
const wordOfTheDay = await fetchWordOfTheDay();

// track gameBoard Changes and user solving progress
let cellsChanged = false;
let currentRow = 0;
let isSolved = false;

// keyboardElement And keyboard buttons
const keyboardContainer = document.querySelector(".keyboard");
const keyboardBtns = document.querySelectorAll(".keyboard__letter");

//****************************************************** */
//* Main Functions
//****************************************************** */

function handleKeydownEvent() {
  document.body.addEventListener("keydown", onKeyDown);
}

async function onKeyDown(ev) {
  // current active gameBoard row
  const rowCells = document.querySelectorAll(".game-board__row")[currentRow].children;
  // pressed key value
  const key = ev.key;
  // check if gameBoard values has been changed
  cellsChanged = handleInput(rowCells, key);

  if (cellsChanged) {
    // typing animation only
    if (key !== "Backspace" && key !== "Enter") cellAnimation(rowCells, key);

    keyboardAnimation(keyboardBtns, key);

    // if validation
    if (key === "Enter") {
      // check for row completeness
      let rowComplete = rowCheck(rowCells);

      if (rowComplete) {
        // get user input and handle validation and animation
        const userInput = assembleWord(rowCells);
        const similarLetters = await handleValidation(wordOfTheDay, userInput, rowCells, keyboardBtns);

        if (similarLetters === false) {
          // do invalid word animation
          cellAnimation(rowCells, "enter");
        } else {
          // Animate changes to row cells and keyboard buttons based on their similarity
          cellAnimation(rowCells, "enter", similarLetters, keyboardBtns);
          // Mark row as completed
          document.querySelectorAll(".game-board__row")[currentRow].dataset.state = "Done";
          // update the row
          if (isSolved) {
            document.body.removeEventListener("keydown", onKeyDown);
            document.body.removeEventListener("keyup", onKeyUp);
            keyboardContainer.removeEventListener("click", onKeyboardClick);
          }
          if (currentRow < 6 && !isSolved) {
            currentRow++;
          }
        }
      }
    }
  }
}

function handleKeyupEvent() {
  document.body.addEventListener("keyup", onKeyUp);
}

function onKeyUp(ev) {
  const key = ev.key;
  removeKeyboardAnimations(keyboardBtns, key);
}

function handleKeyboardClicks() {
  // clicking keyboard buttons
  keyboardContainer.addEventListener("click", onKeyboardClick);
}

async function onKeyboardClick(ev) {
  // current active gameBoard row
  const rowCells = document.querySelector(".game-board__row[data-state='TBD']").children;
  // current clicked button
  const clickedButton = ev.target;

  // if not a button
  if (!(clickedButton instanceof HTMLButtonElement || clickedButton instanceof HTMLImageElement)) {
    return;
  }

  if (clickedButton instanceof HTMLImageElement || clickedButton.querySelector("img") !== null) { // if Deleting letters (Backspace)
    cellsChanged = handleInput(rowCells, "Backspace");
  } else if (clickedButton.innerHTML === "ENTER") { // if Validating (Enter)
    cellsChanged = handleInput(rowCells, "Enter");
    // check for row completeness
    let rowComplete = rowCheck(rowCells);
    if (rowComplete) {
      // get user input word
      const userInput = assembleWord(rowCells);
      // validate and animate feedback
      const similarLetters = await handleValidation(wordOfTheDay, userInput, rowCells, keyboardBtns);

      if (similarLetters === false) {
        // do invalid word animation
        cellAnimation(rowCells, "enter");
      } else {
        // Animate changes to row cells and keyboard buttons based on their similarity
        cellAnimation(rowCells, "enter", similarLetters, keyboardBtns);
        // Mark row as completed
        document.querySelectorAll(".game-board__row")[currentRow].dataset.state = "Done";
        // update the row
        if (isSolved) {
          document.body.removeEventListener("keydown", onKeyDown);
          document.body.removeEventListener("keyup", onKeyUp);
          keyboardContainer.removeEventListener("click", onKeyboardClick);
        }
        if (currentRow < 6 && !isSolved) {
          currentRow++;
        }
      }
    }
  } else { // for other buttons
    cellsChanged = handleInput(rowCells, clickedButton.innerHTML);

    if (cellsChanged) cellAnimation(rowCells, clickedButton.innerHTML);
  }
}

//* Export functions 
export {handleKeydownEvent, handleKeyupEvent, handleKeyboardClicks};

//****************************************************** */
//* Typing Functions
//****************************************************** */

/*
* all input functions returns true only if any change has been made
* eg. added a letter, removed a letter or (pressed enter (has no effect, just for consistency))
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

//****************************************************** */
//* Animations Functions
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

    // animate gameBoard cell
    currentCell.classList.add("game-board-validation");
    keyboardButton.classList.add("keyboard-validation");
    // give different delay between cells and keyboard buttons
    currentCell.style.animationDelay = `${i * animationDelay}s`;
    keyboardButton.style.animationDelay = `${i * animationDelay}s`;
    setTimeout(() => {
      if (validationCell === true) {
        currentCell.classList.add("game-board__letter--correct");
        keyboardButton.classList.add("keyboard__letter--correct");
      } else if (validationCell === "close") {
        currentCell.classList.add("game-board__letter--close");
        keyboardButton.classList.add("keyboard__letter--close");
      } else {
        currentCell.classList.add("game-board__letter--missing");
        keyboardButton.classList.add("keyboard__letter--missing");
      }
    }, 500 + (i * (animationDelay * 1000)));
    // remove keyboard animation after finishing
    setTimeout(() => {
      keyboardButton.classList.remove("keyboard-validation");
      keyboardButton.style.removeProperty("animation-delay");
    }, 1000 + (i * (animationDelay * 1000)));
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

//****************************************************** */
//* Validation Functions
//****************************************************** */

async function fetchWordOfTheDay() {
  const promise = fetch("https://words.dev-apis.com/word-of-the-day");

  return promise
    .then((response) => response.json())
    .then((responseObject) => responseObject.word)
    .catch(() => {
      feedbackErrorMessage(`Network error: Please Check Your Internet Connection Or Try Again Later 😐`);
    })
}

function feedbackErrorMessage(message) {
  const feedbackElement = document.querySelector(".feedback-message");
  feedbackElement.innerHTML = `${message}`;
  feedbackElement.classList.add("fade-in-feedback");
}

//* Row check for completion
function rowCheck(rowCells) {
  let rowComplete = false;
  for (let i = 0; i < rowCells.length; i++) {
    if (rowCells[i].innerText === "") {
      rowComplete = false;
      break;
    } else {
      rowComplete = true;
    }
  }
  return rowComplete;
}

//* Connect row letters into a word
function assembleWord(rowCells) {
  let string = "";
  for (let cell of rowCells) {
    string += cell.textContent;
  }
  return string;
}

//* Check word validity
async function isWord(word) {
  // Post to validation API
  const request = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({
      "word": `${word}`,
    }),
    headers: {
      "Content-Type": "application/json",
      "Connection": "keep-alive",
    }
  })

  if (request.status >= 400 && request.status <= 499) {
    feedbackErrorMessage();
    return;
  }
  // Get Response Object
  const responseObject = await request.json();
  return responseObject.validWord;
}

async function checkWord(wordOfTheDay, userInput) {
  // check if user input is a valid word
  const validWord = await isWord(userInput);
  if (!validWord || validWord === undefined) return false;

  // initial similarity between user input and word of the day
  let similarLetters = Array.from(userInput, () => false);
  console.log(similarLetters);
  // unify input
  wordOfTheDay = wordOfTheDay.toLowerCase();
  userInput = userInput.toLowerCase();

  // check similarity between user input and word of the day
  for (let i = 0; i < wordOfTheDay.length; i++) {
    for (let j = 0; j < userInput.length; j++) {
      // if guessed letter in word at correct position
      if (userInput[j] === wordOfTheDay[i] && i === j) {
        similarLetters[j] = true;
        break;
      } else if (userInput[j] === wordOfTheDay[i] && i !== j && similarLetters[j] === false) { // if guessed letter in word at another position
        similarLetters[j] = "close";
        break;
      }
    }
  }

  return similarLetters;
}

/*
  * handleValidation returns:
  * false => in case of invalid user input
  * Array that represents similarity between userInput and word of the day
  * based on index of characters => in case of valid user input
*/

async function handleValidation(wordOfTheDay, userInput) {
  // if there is no word of the day (i.e Fetch Failed)
  if (wordOfTheDay === undefined) return false;
  // Get similar letters between user input and word of the day
  const similarLetters = await checkWord(wordOfTheDay, userInput);

  // if user input is invalid
  if (!similarLetters) {
    return false;
  } else {
    // check if word is solved
    for (let letter of similarLetters) {
      if (letter === true) {
        isSolved = true;
      } else {
        isSolved = false;
        break;
      }
    }
    // return similarLetters
    return similarLetters;
  }
}