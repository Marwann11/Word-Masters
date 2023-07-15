"use strict";
import {handleKeydownEvent, handleKeyupEvent, handleKeyboardClicks} from "./modules/helper.mjs"

function main() {
  handleKeydownEvent();

  handleKeyupEvent();

  handleKeyboardClicks();
}

main();