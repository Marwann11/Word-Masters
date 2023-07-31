import { previousGameState, applyPreviousGameState } from "./modules/userProgress.mjs";
import { initialDarkModeCheck } from "./modules/buttons.mjs";
import { getTodayWord } from './modules/wordOfTheDay.mjs';
import { addFunctionality, handleButtonsEvents } from "./helper.mjs";
import { isDayPassed, setNewDate, removeYesterdayDate } from './modules/wordOfTheDay.mjs';

// check if it's a new day
const isNewDay = isDayPassed();

function main() {
  // if there is a saved game state and a day hasn't passed yet
  if (previousGameState.currentRow !== -1 && !isNewDay) {
    applyPreviousGameState(previousGameState);
  }

  // do an initial dark mode check
  initialDarkModeCheck();

  // add input functionality if word hasn't been solved yet for the current day
  if (!previousGameState.isSolved) {
    addFunctionality();
  }

  // add buttons event handlers
  handleButtonsEvents();
}

main();

/*
  * current word of the day
    ** To prevent long flash of unintended light mode for dark mode users (especially on slow networks)
    ** word of the day should be fetched after all functionality has been implemented
*/
export const wordOfTheDay = await getTodayWord();

// update day if it's a new day
if (isNewDay) {
  // remove previous date from local storage
  removeYesterdayDate();
  // add the new one
  setNewDate();
}