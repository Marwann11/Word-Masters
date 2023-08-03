import { previousGameState, applyPreviousGameState } from "./modules/userProgress.mjs";
import { initialDarkModeCheck } from "./modules/buttons.mjs";
import { addFunctionality, handleButtonsEvents } from "./helper.mjs";
import { isDayPassed, setNewDate, removeYesterdayDate } from './modules/wordOfTheDay.mjs';


function main() {
  // check if it's a new day
  const isNewDay = isDayPassed();
  
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

  // update day if it's a new day
  if (isNewDay) {
    // remove previous date from local storage
    removeYesterdayDate();
    // add the new one
    setNewDate();
  }
}

main();