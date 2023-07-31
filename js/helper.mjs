"use strict";

import { wordOfTheDay } from './main.mjs';
import { handleInput } from './modules/input.mjs';
import { cellAnimation, keyboardAnimation, removeKeyboardAnimations } from './modules/animations.mjs';
import { completeValidationCheck } from './modules/validation.mjs';
import { handleSettingsButton, handleThemeButton, handleHowToPlayButton } from './modules/buttons.mjs';
import { userProgress } from './modules/userProgress.mjs';

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
  handleKeydownEvent()
  handleKeyupEvent()
  handleKeyboardClicks()
}

function removeFunctionality() {
  document.body.removeEventListener("keydown", onKeyDown);
  document.body.removeEventListener("keyup", onKeyUp);
  keyboardContainer.removeEventListener("click", onKeyboardClick);
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

function handleKeydownEvent() {
  // pressing user keyboard buttons event
  document.body.addEventListener("keydown", onKeyDown);
}

function onKeyDown(ev) {
  if (userProgress.currentRow < 6) {
    // current active gameBoard row
    const rowCells = document.querySelectorAll(".game-board__row")[userProgress.currentRow].children;
    // pressed key value
    const key = ev.key;
    // check if gameBoard values has been changed
    cellsChanged = handleInput(rowCells, key);
  
    if (cellsChanged) {
      // typing animation only
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

function onKeyboardClick(ev) {
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

//* Export functions 
export { addFunctionality, removeFunctionality, handleButtonsEvents }