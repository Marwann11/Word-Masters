import {removeFunctionality} from "../helper.mjs"
import { cellAnimation } from "./animations.mjs";
import {userProgress, saveGameState} from "./userProgress.mjs";

//********************* */
//* Global Variables
//********************* */

// track on screen feedback
let feedbackOnScreen = false;

//****************************************************** */
//* Main Functions
//****************************************************** */

/*
  * Function to display feedback messages on screen
  * message => the message displayed in the feedback element
  * stayOnScreen => boolean indicating whether the feedback will stay on screen or not
  * timeOnScreen => only needed if stayOnScreen is false, to represent the time on screen in seconds before removal
*/
function feedbackMessage(message, stayOnScreen, timeOnScreen) {
  const feedbackElement = document.querySelector(".feedback-message");
  feedbackElement.innerHTML = `${message}`;
  if (!feedbackOnScreen) {
    displayFeedback(feedbackElement, stayOnScreen, timeOnScreen);
  }
}

/*
  * the main Function to handle the full process of validating
    ** Checks if row is complete
    ** assembles the word if complete, otherwise does the corresponding animation
    ** handleValidation => returns false => if word is invalid or on server error
    ** => returns an array of boolean and string values indicating similarity between the two words
    ** handle related animations based on handleValidation return value
    ** in case of a successful validation check, Save game state and check if it's "game over"
*/
async function completeValidationCheck(rowCells, keyboardBtns, wordOfTheDay) {
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
      document.querySelectorAll(".game-board__row")[userProgress.currentRow].dataset.state = "DONE";
      // save current game state after animations durations has completed
      setTimeout(() => {
        saveGameState(rowCells);
      }, 1200);
    }
    // check if game ended
    if (similarLetters !== false) {
      endGameCheck();
    }
  }
}

//****************************************************** */
//* Helper Functions
//****************************************************** */

/*
  * function that displays feedback on the screen
  * elem => takes the feedback element as a first argument
  * stayOnScreen => boolean indicating whether the feedback will stay on screen or not
  * timeInSeconds => elapsed time for each feedback message
*/ 
function displayFeedback(elem, stayOnScreen, timeInSeconds) {
  // add entry animation
  elem.classList.add("fade-in-feedback");

  feedbackOnScreen = true;

  if (!stayOnScreen) {
    // remove entry animation, apply and remove exit animation
    setTimeout(() => {
      elem.classList.remove("fade-in-feedback");
      elem.classList.add("fade-out-feedback");
    }, timeInSeconds * 1000)
    setTimeout(() => {
      elem.classList.remove("fade-out-feedback");
      feedbackOnScreen = false;
    }, (timeInSeconds * 1000) + 500)
  }
}

//* Function that checks if row cells are complete
function rowCheck(rowCells) {
  let rowComplete = false;
  for (let i = 0; i < rowCells.length; i++) {
    if (rowCells[i].innerText === "") {
      // Give feedback to the user
      feedbackMessage("Not Enough Letters", false, 1);
      // do rejection animation
      cellAnimation(rowCells, "enter");
      rowComplete = false;
      break;
    } else {
      rowComplete = true;
    }
  }
  return rowComplete;
}

//* Connect row letters into a word
function assembleWord(rowCells) {
  let string = "";
  for (let cell of rowCells) {
    string += cell.textContent;
  }
  return string;
}

/*
  * handleValidation returns:
  * false => in case of invalid user input
  * Array that represents similarity between userInput and word of the day
  * based on index of characters => in case of a valid user input
*/
async function handleValidation(wordOfTheDay, userInput) {
  // if there is no word of the day (i.e Fetch Failed)
  if (wordOfTheDay === undefined) return false;
  // Get similar letters between user input and word of the day
  const similarLetters = await compareWords(wordOfTheDay, userInput);

  // if user input is invalid
  if (similarLetters === false) {
    return false;
  } else {
    // check if word is solved
    for (let letter of similarLetters) {
      if (letter === true) {
        userProgress.isSolved = true;
      } else {
        userProgress.isSolved = false;
        break;
      }
    }

    if (userProgress.isSolved) {
      const winFeedbackTime = 2.5;
      switch (userProgress.currentRow) {
        case 0:
          feedbackMessage("Exceptional", false, winFeedbackTime);
          break;
        case 1:
          feedbackMessage("Incredible", false, winFeedbackTime);
          break;
        case 2:
          feedbackMessage("Impressive", false, winFeedbackTime);
          break;
        case 3:
          feedbackMessage("Great", false, winFeedbackTime);
          break;
        case 4:
          feedbackMessage("Nice", false, winFeedbackTime);
          break;
        default:
          feedbackMessage("Phew", false, winFeedbackTime);
      }
    } else {
      if (userProgress.currentRow === 5) {
        feedbackMessage(`Correct word: ${wordOfTheDay.toUpperCase()}`, true);
      }
    }
    // return similarLetters
    return similarLetters;
  }
}

/*
  * This function compares both words (word of the day - user input) for similarity
  * returns false and displays feedback => if user input is an invalid english word
  * returns false => if the isWord function returns undefined
  * returns false => if the words are not equal in length or the word of the day has any invalid characters
  * returns a mixed array of booleans and strings => in case of a valid check
  * with the three values:
    ** true => for characters available in both words at the same position
    ** "close" => for characters available in both words at different positions
    ** false => for characters missing from one word compared to the other
*/
async function compareWords(wordOfTheDay, userInput) {
  // check if user input is a valid word
  const validWord = await isWord(userInput);

  // if invalid word
  if (validWord === false) {
    feedbackMessage("Not In Word List", false, 1.5);
    return false;
  } else if (validWord === undefined) {
    return false;
  }

  // validate input
  if (/\d/.test(wordOfTheDay) || (wordOfTheDay.length !== userInput.length)) {
    feedbackMessage("Server Error, Enjoy a cookie while we work on it 😙", true);
    return false;
  }

  // initial similarity between user input and word of the day
  let similarLetters = Array.from(userInput, () => false);
  // unify input
  wordOfTheDay = wordOfTheDay.toLowerCase();
  userInput = userInput.toLowerCase();

  // check for similarity between letters
  for (let i = 0; i < wordOfTheDay.length; i++) {
    
    // find indices of all the letters in userInput that's equal to current
    let foundIndices = findLetterIndices(userInput, wordOfTheDay[i]);

    // if one occurrence only in userInput
    if (foundIndices.length === 1) {
      handleSingleOccurrence(foundIndices[0], i, similarLetters);
    } else {
      handleMultipleOccurrences(foundIndices, i, similarLetters);
    }
  }

  return similarLetters;
}

/*
  * This function returns an array of all found indices for the second argument (letter)
  * inside of the first argument (word)
*/
function findLetterIndices(userInput, wordOfTheDayLetter) {
  // initial array to track all found indices
  let foundIndices = [];
  // check for first occurrence of each user word letter in the word of the day
  let currentFound = userInput.indexOf(wordOfTheDayLetter);

  // check for any subsequent occurrences
  while (currentFound !== -1) {
    foundIndices.push(currentFound);
    currentFound = userInput.indexOf(wordOfTheDayLetter, currentFound + 1);
  }
  return foundIndices;
}

/*
  * This function handles single letter occurrence in wordOfTheDay
*/
function handleSingleOccurrence(foundIndex, currentIndex, similarLetters) {
  if (foundIndex === currentIndex) {
    similarLetters[foundIndex] = true;
  } else if (similarLetters[foundIndex] === false) {
    similarLetters[foundIndex] = "close";
  }
}

/*
  * This function handles multiple letter occurrences in wordOfTheDay
*/
function handleMultipleOccurrences(foundIndices, currentIndex, similarLetters) {
  // initial differences between userInput Indices and current word letter map
  let indexDifferences = new Map();

  // get differences
  foundIndices.forEach(index => {
    const currentIndexDifference = Math.abs(index - currentIndex);
    indexDifferences.set(`${index}`, currentIndexDifference);
  })

  let closestIndex = findClosestIndex(indexDifferences);

  // remove entry (to avoid including in future searches)
  indexDifferences.delete(closestIndex);

  if (Number(closestIndex) === currentIndex) {
    similarLetters[closestIndex] = true;
  } else {
    if (similarLetters[closestIndex] === false) {
      similarLetters[closestIndex] = "close";
    } else {
      handleRemainingDifferences(indexDifferences, similarLetters);
    }
  }
}

/*
  * This function return the first index with the lowest difference
*/
function findClosestIndex(differencesMap) {
  // Get closest Index based on smallest difference
  let minEntry = [...differencesMap.entries()].reduce((arr, [index, diff]) => {
    return diff < arr[1] ? [index, diff] : arr;
  }, [null, Infinity]);

  return minEntry[0];
}

/*
  * This function checks for an unprocessed subsequent letter index
  * either handling it (if found) or exhausting and nulling the differences Map
*/
function handleRemainingDifferences(differencesMap, similarLetters) {
  while (differencesMap.size > 0) {
    // find closest index and delete from future searches
    let closestIndex = findClosestIndex(differencesMap);
    differencesMap.delete(closestIndex);

    // if found an unprocessed index handle and break out of loop
    if (similarLetters[closestIndex] === false) {
      similarLetters[closestIndex] = "close";
      break;
    }
  }
}

/*
  * This function check if the user input is a valid word
  * returns undefined => if there is no internet or on API server errors
  * returns true => in case of a valid word
  * returns false => in case of an invalid word
*/
async function isWord(word) {
  // Post to validation API
  const request = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({
      "word": `${word}`,
    }),
    headers: {
      "Content-Type": "application/json",
      "Connection": "keep-alive",
    }
  }).catch(() => {
    feedbackMessage("Server Error, please check your internet connection 😞", false, 3);
  });

  if (request === undefined) { // API error
    return undefined;
  }

  // Get Response Object
  const responseObject = await request.json();
  return responseObject.validWord;
}

/*
  *  Function to check if the word has been solved
    ** removes functionality => if word has been solved
    ** switches to next row => if current row is not last row
*/

function endGameCheck() {
  // update the row
  if (userProgress.isSolved) {
    removeFunctionality();
  } else if (userProgress.currentRow < 6) {
    // increment to next row after animations durations has completed
    setTimeout(() => {
      userProgress.currentRow++;
    }, 1200);
  }
}

export {completeValidationCheck, feedbackMessage};