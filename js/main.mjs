"use strict";
import {handleKeydownEvent, handleKeyupEvent, handleKeyboardClicks, handleSettingsButton} from "./modules/helper.mjs"

function main() {
  handleKeydownEvent();

  handleKeyupEvent();

  handleKeyboardClicks();

  handleSettingsButton();

  // handleThemeButton();

  // handleHowToPlayButton();
}

main();