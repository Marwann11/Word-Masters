import { handleInput } from './modules/input.mjs';
import { cellAnimation, keyboardAnimation, removeKeyboardAnimations } from './modules/animations.mjs';
import { completeValidationCheck } from './modules/validation.mjs';
import { handleSettingsButton, handleThemeButton, handleHowToPlayButton } from './modules/dialogs.mjs';
import { userProgress } from './modules/userProgress.mjs';
import { getTodayWord } from './modules/wordOfTheDay.mjs';

//********************* */
//* Global Variables
//********************* */
// keyboardElement And keyboard buttons
const keyboardContainer = document.querySelector(".keyboard");
const keyboardBtns = document.querySelectorAll(".keyboard__letter");

// row cells first change state
let cellsChanged = false;

//****************************************************** */
//* Main Functions
//****************************************************** */

/*
  * Double Functions which switches application's functionality on and off
*/
function addFunctionality() {
  handleKeyDown();
  handleKeyupEvent();
  handleKeyboardClicks();
}

function removeFunctionality() {
  document.body.removeEventListener("keydown", onKeyDownEvent);
  document.body.removeEventListener("keyup", onKeyUp);
  keyboardContainer.removeEventListener("click", keyboardClickEvent);
}

/*
  * function that handles all buttons events in the app
*/
function handleButtonsEvents() {
  handleSettingsButton();
  handleThemeButton();
  handleHowToPlayButton();
}

//****************************************************** */
//* Helper Functions
//****************************************************** */
async function handleKeyDown() {
  // get current word of the day
  const wordOfTheDay = await getTodayWord();
  document.body.addEventListener("keydown", onKeyDown(wordOfTheDay));
}

// reference to keyDown event function
let onKeyDownEvent;

function onKeyDown(wordOfTheDay) {
  onKeyDownEvent = function onKeyDownEvent(ev) {
    if (userProgress.currentRow < 6) {
      // current active gameBoard row
      const rowCells = document.querySelectorAll(".game-board__row")[userProgress.currentRow].children;
      // pressed key value
      const key = ev.key;
      // check if gameBoard values has been changed
      cellsChanged = handleInput(rowCells, key);

      if (cellsChanged) {
        /*
          * handle cells adding animation only here
            ** backspace animation is handled in the handleInput function
            ** enter animation is handled in the enter block (completeValidationCheck)
        */ 
        if (key !== "Backspace" && key !== "Enter") cellAnimation(rowCells, key);

        // handle enter key animation in the enter validation block
        if (key !== "Enter") {
          keyboardAnimation(keyboardBtns, key);
        }

        // if validation
        if (key === "Enter") {
          // check the current focused element
          const currentFocusedElement = document.activeElement;
          // apply only if the focused element is the body or the Enter button
          if (currentFocusedElement instanceof HTMLBodyElement ||
            currentFocusedElement.classList.contains(".enter-button")) {
            // handle enter keyboard animation
            keyboardAnimation(keyboardBtns, key);
            // do a complete validation check
            completeValidationCheck(rowCells, keyboardBtns, wordOfTheDay);
          }
        }
      }
    }
  }
  return onKeyDownEvent;
}


function handleKeyupEvent() {
  // releasing user keyboard buttons event
  document.body.addEventListener("keyup", onKeyUp);
}

function onKeyUp(ev) {
  const key = ev.key;
  removeKeyboardAnimations(keyboardBtns, key);
}

async function handleKeyboardClicks() {
  const wordOfTheDay = await getTodayWord();
  keyboardContainer.addEventListener("click", onKeyboardClick(wordOfTheDay));
}

// reference to the event function (for removal purposes)
let keyboardClickEvent;

function onKeyboardClick(wordOfTheDay) {
  // store function
  keyboardClickEvent = function keyboardClickEvent(ev) {
    if (userProgress.currentRow < 6) {
      // current active gameBoard row
      const rowCells = document.querySelector(".game-board__row[data-state='TBD']").children;
      // current clicked button
      const clickedButton = ev.target;

      // if not a button
      if (!(clickedButton instanceof HTMLButtonElement || clickedButton instanceof HTMLImageElement)) {
        return;
      }

      if (clickedButton instanceof HTMLImageElement || clickedButton.classList.contains("backspace-button")) { // if Deleting letters (Backspace)
        cellsChanged = handleInput(rowCells, "Backspace");
      } else if (clickedButton.classList.contains("enter-button")) { // if Validating (Enter)
        cellsChanged = handleInput(rowCells, "Enter");
        // do a complete validation check
        completeValidationCheck(rowCells, keyboardBtns, wordOfTheDay);
      } else { // for other buttons
        cellsChanged = handleInput(rowCells, clickedButton.innerHTML);

        if (cellsChanged) cellAnimation(rowCells, clickedButton.innerHTML);
      }

      // deFocus from the clicked button
      clickedButton.blur();
    }
  }
  // return to the currying function
  return keyboardClickEvent;
}

//* Export functions 
export { addFunctionality, removeFunctionality, handleButtonsEvents }