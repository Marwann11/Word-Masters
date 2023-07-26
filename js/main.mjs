"use strict";
import {handleKeydownEvent, handleKeyupEvent, handleKeyboardClicks, handleButtonsEvents} from "./modules/helper.mjs"

function main() {
  handleKeydownEvent();

  handleKeyupEvent();

  handleKeyboardClicks();

  handleButtonsEvents();
}

main();