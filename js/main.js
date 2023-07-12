"use strict";
import {handleInput, cellAnimation, keyboardAnimation, removeKeyboardAnimations} from "./modules/helper.js"

function main() {
  console.log("happened");
  // track gameBoard Changes
  let cellsChanged = false;
  // current active gameBoard row, keyboardElement And keyboard buttons
  const rowCells = document.querySelector(".game-board__row[data-state='TBD']").children;
  const keyboardContainer = document.querySelector("#keyboard");
  const keyboardBtns = document.querySelectorAll(".keyboard__letter");
  
  document.body.addEventListener("keydown", (ev) => {
    // pressed key value
    const key = ev.key;
    // check if gameBoard values has been changed
    cellsChanged = handleInput(rowCells, key);

    if (cellsChanged) {
      // no animation in cells for deleting letters
      if (key !== "Backspace") cellAnimation(rowCells, key);

      keyboardAnimation(keyboardBtns, key);
    }
  });

  keyboardContainer.addEventListener("click", (ev) => {
    const clickedButton = ev.target;
    
    // if not a button
    if (!(clickedButton instanceof HTMLButtonElement || clickedButton instanceof HTMLImageElement)) {
      return;
    }
    
    if (clickedButton instanceof HTMLImageElement || clickedButton.querySelector("img") !== null) { // if Deleting letters
      cellsChanged = handleInput(rowCells, "Backspace");
    } else if (clickedButton.innerHTML === "ENTER") { // if Validating
      cellsChanged = handleInput(rowCells, "Enter"); 
    } else {
      cellsChanged = handleInput(rowCells, clickedButton.innerHTML);

      if (cellsChanged) cellAnimation(rowCells, clickedButton.innerHTML);
    }
  })

  document.body.addEventListener("keyup", (ev) => {
    const key = ev.key;
    removeKeyboardAnimations(keyboardBtns, key);
  })
}


main();