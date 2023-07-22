import {handleInput} from './input.mjs';
import {cellAnimation, keyboardAnimation, removeKeyboardAnimations} from './animations.mjs';
import {fetchWordOfTheDay, rowCheck, assembleWord, handleValidation, userProgress} from './validation.mjs';
// import {} from './modules/buttons.mjs';


//********************* */
//* Global Variables
//********************* */

// Get word of the day
const wordOfTheDay = await fetchWordOfTheDay();

// keyboardElement And keyboard buttons
const keyboardContainer = document.querySelector(".keyboard");
const keyboardBtns = document.querySelectorAll(".keyboard__letter");

// cells state
let cellsChanged = false;

//****************************************************** */
//* Main Functions
//****************************************************** */

function handleKeydownEvent() {
  // pressing user keyboard buttons event
  document.body.addEventListener("keydown", onKeyDown);

  async function onKeyDown(ev) {
    // current active gameBoard row
    const rowCells = document.querySelectorAll(".game-board__row")[userProgress.currentRow].children;
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
            document.querySelectorAll(".game-board__row")[userProgress.currentRow].dataset.state = "Done";
            // update the row
            if (userProgress.isSolved) {
              document.body.removeEventListener("keydown", onKeyDown);
              document.body.removeEventListener("keyup", onKeyUp);
              keyboardContainer.removeEventListener("click", onKeyboardClick);
            }
            if (userProgress.currentRow < 6 && !userProgress.isSolved) {
              userProgress.currentRow++;
            }
          }
        }
      }
    }
  }
}


function handleKeyupEvent() {
  // releasing user keyboard buttons event
  document.body.addEventListener("keyup", onKeyUp);

}

function onKeyUp(ev) {
  const key = ev.key;
  removeKeyboardAnimations(keyboardBtns, key);
}


function handleKeyboardClicks() {
  // clicking keyboard buttons event
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
        if (userProgress.isSolved) {
          document.body.removeEventListener("keydown", onKeyDown);
          document.body.removeEventListener("keyup", onKeyUp);
          keyboardContainer.removeEventListener("click", onKeyboardClick);
        }
        if (userProgress.currentRow < 6 && !userProgress.isSolved) {
          userProgress.currentRow++;
        }
      }
    }
  } else { // for other buttons
    cellsChanged = handleInput(rowCells, clickedButton.innerHTML);

    if (cellsChanged) cellAnimation(rowCells, clickedButton.innerHTML);
  }
}

function handleSettingsButton() {
  console.log("some settings button clicked");
}


//* Export functions 
export {handleKeydownEvent, handleKeyupEvent, handleKeyboardClicks, handleSettingsButton};