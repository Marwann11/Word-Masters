import { feedbackMessage } from './validation.mjs';
import { getTodayWord, isDayPassed } from "./wordOfTheDay.mjs";

//********************* */
//* Global Variables
//********************* */

// track user progress
const userProgress = {
  currentRow: 0,
  isSolved: false
}

const previousGameState = JSON.parse(handlePreviousGameState());

//****************************************************** */
//* Main Functions
//****************************************************** */

/*
  * Function that retrieves previous user progress or creates new one
  * if first session or a new day => initiate a new userProgress object
  * otherwise => get previous user progress object
*/
function handlePreviousGameState() {
  if (localStorage.getItem("userProgress") === null || isDayPassed()) {
    return initUserProgress();
  } else {
    return localStorage.getItem('userProgress');
  }
}

/*
  * This function saves the current user progress in the local storage
    ** Saves current row number
    ** Saves added cells text and classes
    ** Saves added keyboard buttons classes
    ** tracks if the game has been solved or not
*/
function saveGameState(rowCells) {
  // save last finished row number
  previousGameState.currentRow = userProgress.currentRow;
  // save cells data
  saveCellsState(rowCells);
  // save keyboard data
  saveKeyboardState();
  // save if the user solved the puzzle
  if (userProgress.isSolved) { previousGameState.isSolved = true }

  // push the new game state back to the local storage
  localStorage.setItem("userProgress", JSON.stringify(previousGameState));
}

/*
  * This function applies last user session game state
*/
async function applyPreviousGameState(previousGameState) {
  // set user current row
  userProgress.currentRow = previousGameState.currentRow + 1;
  // set if the user solved the game or not
  userProgress.isSolved = previousGameState.isSolved;
  // set cells to previous state (text - classes)
  setPreviousCellsState();
  // set keyboard button to previous state (classes)
  setPreviousKeyboardState();

  // if user lost at previous session
  if (previousGameState.currentRow === 5 && (!previousGameState.isSolved)) {
    // display correct word
    const todayWord = await getTodayWord();
    feedbackMessage(`Correct word: ${todayWord.toUpperCase()}`, true);
  } else if (previousGameState.isSolved) {
    const positions = ["first", "second", "third", "fourth", "fifth", "sixth"];
    feedbackMessage(`Excellent work!, You solved today's word in the ${positions[previousGameState.currentRow]} row`, true);
  }
}

/*
  * This function removes last user session game state
*/
function removePreviousGameState() {
  localStorage.removeItem("userProgress");
}

//****************************************************** */
//* Helper Functions
//****************************************************** */

/*
  * this function initiates a user progress Object in the local storage and returns it
*/
function initUserProgress() {
  // initialize initial variables
  const totalRows = 6;
  const totalRowCells = 5;
  const totalKeyboardBtns = 26;
  const [rowsData, rowsClasses, keyboardBtnsClasses] = [[], [], []];

  // for each row
  for (let i = 0; i < totalRows; i++) {
    // set initial cells text data
    rowsData[i] = Array(totalRowCells).fill("");
    // set initial cells applied classes
    rowsClasses[i] = Array(totalRowCells).fill("");
  }

  // for each keyboard button
  const allButtons = document.querySelectorAll(".keyboard__letter:not(.enter-button):not(.backspace-button)");
  // set buttons classes initial values
  for (let i = 0; i < totalKeyboardBtns; i++) {
    keyboardBtnsClasses[i] = [allButtons[i].innerText, ""];
  }

  /*
    * currentRow => the guess row the user is currently at
    * rowsData => the text data for each cell, with a total of five cells for each row
    * rowsClasses => the applied class for each cell on each row
    * keyboardClasses => the applied class for each keyboard button
    * isSolved => boolean indicating whether the puzzle is solved or not
  */
  localStorage.setItem("userProgress", JSON.stringify({
    currentRow: -1,
    rowsData: rowsData,
    rowsClasses: rowsClasses,
    keyboardClasses: keyboardBtnsClasses,
    isSolved: false
  }))

  return localStorage.getItem("userProgress");
}

/*
  * Helper function to set previous cells state (text - classes)
*/

function setPreviousCellsState() {
  // set completed rows data and classes to previous game state
  // get all rows
  const allRows = document.querySelectorAll(".game-board__row");
  for (let i = 0; i <= previousGameState.currentRow; i++) {
    // get current completed row and his children (cells)
    const currentRow = allRows[i];
    const rowChildren = currentRow.children;
    // mark as done
    currentRow.setAttribute("data-state", "DONE");

    // for each cell 
    for (let j = 0; j < rowChildren.length; j++) {
      // get current cell and it's span
      const currentCell = rowChildren[j];
      const currentCellSpan = currentCell.childNodes[0];

      // add cell text from previous session to current cell
      currentCellSpan.innerText = previousGameState.rowsData[i][j];

      // get the cell class used in the previous session
      const correspondingCellClass = previousGameState.rowsClasses[i][j];
      // apply the validation animation to cell
      currentCell.classList.add("game-board-validation");
      // add animation duration
      currentCell.style.animationDelay = `${i * 0.03}s`;
      // add the color class to the cell
      currentCell.classList.add(correspondingCellClass);
    }
  }
}

/*
  * Helper function to set previous keyboard state (classes)
*/
function setPreviousKeyboardState() {
  // Get all buttons (without enter and backspace buttons)
  const allButtons = document.querySelectorAll(".keyboard__letter:not(.enter-button):not(.backspace-button)");

  // iterate over each button
  for (let i = 0; i < allButtons.length; i++) {
    const currentBtn = allButtons[i];
    // get corresponding previous class for the current button
    const btnPreviousClass = previousGameState.keyboardClasses[i][1];

    // if button has been chosen in previous session
    if (btnPreviousClass !== "") {
      // apply the validation animation to cell
      currentBtn.classList.add("keyboard-validation");
      // add animation duration
      currentBtn.style.animationDelay = `${i * 0.03}s`;
      // add the color class to the cell
      currentBtn.classList.add(btnPreviousClass);

      // remove animation and delay for future animations
      setTimeout(() => {
        currentBtn.classList.remove("keyboard-validation");
        currentBtn.style.removeProperty("animation-delay");
      }, 1000 + (i * (0.03 * 1000)));
    }
  }
}

function saveCellsState(rowCells) {
  //* save cells text and classes data
  const totalRowCells = 5;
  // for each row cell
  for (let i = 0; i < totalRowCells; i++) {
    // for each cell in the current row add the corresponding cell text
    previousGameState.rowsData[previousGameState.currentRow][i] =
      rowCells[i].childNodes[0].innerText;

    // save the corresponding cells Classes
    const cellClasses = rowCells[i].classList;
    const cellClassGenre = "game-board__letter--";

    if (cellClasses.contains(`${cellClassGenre}correct`)) {
      previousGameState.rowsClasses[previousGameState.currentRow][i] =
        `${cellClassGenre}correct`;
    } else if (cellClasses.contains(`${cellClassGenre}close`)) {
      previousGameState.rowsClasses[previousGameState.currentRow][i] =
        `${cellClassGenre}close`;
    } else if (cellClasses.contains(`${cellClassGenre}missing`)) {
      previousGameState.rowsClasses[previousGameState.currentRow][i] =
        `${cellClassGenre}missing`;
    }
  }
}

function saveKeyboardState() {
  // total keyboard buttons (without enter and backspace)
  const totalKeyboardBtns = 26;
  const keyboardBtns = document.querySelectorAll(".keyboard__letter:not(.enter-button):not(.backspace-button)");

  // save the corresponding keyboard buttons classes
  const keyboardClassGenre = "keyboard__letter--"
  // add the keyboard buttons classes
  for (let i = 0; i < totalKeyboardBtns; i++) {
    const currentBtnClasses = keyboardBtns[i].classList;

    if (currentBtnClasses.contains(`${keyboardClassGenre}correct`)) {
      previousGameState.keyboardClasses[i][1] = `${keyboardClassGenre}correct`;
    } else if (currentBtnClasses.contains(`${keyboardClassGenre}close`)) {
      previousGameState.keyboardClasses[i][1] = `${keyboardClassGenre}close`;
    } else if (currentBtnClasses.contains(`${keyboardClassGenre}missing`)) {
      previousGameState.keyboardClasses[i][1] = `${keyboardClassGenre}missing`;
    }
  }
}

export { userProgress, previousGameState, handlePreviousGameState, applyPreviousGameState, saveGameState, removePreviousGameState}