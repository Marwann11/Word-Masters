import { cellAnimation } from "./animations.mjs";

//********************* */
//* Global Variables
//********************* */

// track on screen feedback
let feedbackOnScreen = false;
// track user progress
export const userProgress = {
  currentRow: 0,
  isSolved: false
}

//************************************* */

async function fetchWordOfTheDay() {
  const promise = fetch("https://words.dev-apis.com/word-of-the-day");

  return promise
    .then((response) => response.json())
    .then((responseObject) => responseObject.word)
    .catch(() => {
      feedbackMessage(`Server error 😐`, false);
    })
}

function feedbackMessage(message, stayOnScreen) {
  const feedbackElement = document.querySelector(".feedback-message");
  feedbackElement.innerHTML = `${message}`;
  if (!feedbackOnScreen) {
    displayFeedback(feedbackElement, stayOnScreen);
  }
}

function displayFeedback(elem, stayOnScreen) {
  // add entry animation
  elem.classList.add("fade-in-feedback");

  // if (darkMode) elem.classList.add("feedback-message--dark");
  feedbackOnScreen = true;

  if (!stayOnScreen) {
    // remove entry animation, apply and remove exit animation
    setTimeout(() => {
      elem.classList.remove("fade-in-feedback");
      elem.classList.add("fade-out-feedback");
    }, 2500)
    setTimeout(() => {
      elem.classList.remove("fade-out-feedback");
      feedbackOnScreen = false;
    }, 3000)
  }
}

//* Row check for completion
function rowCheck(rowCells) {
  let rowComplete = false;
  for (let i = 0; i < rowCells.length; i++) {
    if (rowCells[i].innerText === "") {
      // Give feedback to the user
      feedbackMessage("NOT ENOUGH LETTERS", false);
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

//* Check word validity
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
    feedbackMessage("Server error: Check Again Later 😞", false);
  });

  if (request === undefined) { // API error
    return;
  }

  // Get Response Object
  const responseObject = await request.json();
  return responseObject.validWord;
}

async function checkWord(wordOfTheDay, userInput) {
  // check if user input is a valid word
  const validWord = await isWord(userInput);

  // if invalid word
  if (validWord === false) {
    feedbackMessage("Not in word list", false);
    return false;
  } else if (validWord === undefined) {
    return false;
  }

  // validate input
  if (/\d/.test(wordOfTheDay) || (wordOfTheDay.length !== userInput.length)) {
    feedbackMessage("Server Error, enjoy a cookie while we work on it 😙", true);
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
  * handleValidation returns:
  * false => in case of invalid user input
  * Array that represents similarity between userInput and word of the day
  * based on index of characters => in case of a valid user input
*/

async function handleValidation(wordOfTheDay, userInput) {
  // if there is no word of the day (i.e Fetch Failed)
  if (wordOfTheDay === undefined) return false;
  // Get similar letters between user input and word of the day
  const similarLetters = await checkWord(wordOfTheDay, userInput);

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
      switch (userProgress.currentRow) {
        case 0:
          feedbackMessage("Exceptional", false);
          break;
        case 1:
          feedbackMessage("Incredible", false);
          break;
        case 2:
          feedbackMessage("Impressive", false);
          break;
        case 3:
          feedbackMessage("Great", false);
          break;
        case 4:
          feedbackMessage("Nice", false);
          break;
        default:
          feedbackMessage("Phew", false);
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

export { fetchWordOfTheDay, rowCheck, assembleWord, handleValidation };