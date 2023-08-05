import { feedbackMessage } from "./validation.mjs";
import { openHowToPlayDialog } from './buttons.mjs';


//****************************************************** */
//* Main Functions
//****************************************************** */

async function getTodayWord() {
  // check if a day has passed since the last session
  const isNewDay = isDayPassed();

  // if first user session or a day has passed
  if (localStorage.getItem("wordOfTheDay") === null || isNewDay) {
    // initialize a new word in local storage and return it
    return await initNewWord();
  } else { // if the same day
    return decodeWord(localStorage.getItem("wordOfTheDay"));
  }
}

//****************************************************** */
//* Helper Functions
//****************************************************** */
async function initNewWord() {
  // get new word
  const wordOfTheDay = await requestWordOfTheDay();

  localStorage.setItem("wordOfTheDay", encodeWord(wordOfTheDay));

  return wordOfTheDay;
}

async function requestWordOfTheDay() {
  const promise = fetch("https://words.dev-apis.com/word-of-the-day");

  return promise
    .then((response) => response.json())
    .then((responseObject) => responseObject.word)
    .catch(() => {
      feedbackMessage(`Server error 😐`, false);
    })
}

/*
  * This function compares current day vs day saved in local storage
  * true => if first user session or a day has passed
  * false => if still the same day
*/

function isDayPassed() {
  // if first user session
  const firstSession = isDayNotFound();
  if (firstSession) {
    // set new date key
    setNewDate();
    
    

    delayedOpenDialog();

    return true;
  } else { // on other sessions
    const todayDate = getTodayDate();
    // compare current day against localStorage saved day
    return todayDate !== localStorage.getItem("currentDay");
  }
}

// get current day as a string "day/month/year" relative to GMT+0000 (UTC) => reset time for word of the day
function getTodayDate() {
  const currentDate = new Date();
  const currentDay = `${currentDate.getUTCDate()}/${currentDate.getUTCMonth() + 1}/${currentDate.getUTCFullYear()}`;

  return currentDay;
}

// Function to set a new date
function setNewDate() {
  localStorage.setItem("currentDay", getTodayDate());
}

// Function to remove the current date from the local storage
function removeYesterdayDate() {
  localStorage.removeItem("currentDay");
}

/*
  * Function to check if a day key exists in localStorage
  * if not found => return true
  * otherwise => return false
*/
function isDayNotFound() {
  if (localStorage.getItem("currentDay") === null) {
    return true;
  } else {
    return false;
  }
}

/*
  * Double functions that handle scrambling the word when stored in local storage
  * and unscrambling it when retrieved
*/

function encodeWord(word) {
  // fake array to add additional characters from to the encoded string
  const fakeHashArr = ["!", "$", "7", "&", "?", "p", "q", "r", "/", "<", "g", ".", "5", "i",
    " ", "9", "4", "-", ")", "D", "T", "R", "{", "}", "U", "Z", "t", "K", "P", "~", ";", "|",
    ":", "z", "V", "W", "X", "+", "=", "G", "H", "I", "@", "#", "%", "3",
    ">", "^", "c", "d"
  ];
  const hashArrLen = fakeHashArr.length;

  // initial value for number of letters in encoded word to each letter from original
  let addedCharsForLetter = 26;
  // the index at which resides the real letter
  const OriginalLetterIndex = 11;
  let encodedWord = "";

  // for each letter
  for (let letter of word) {
    // add the additional characters
    for (let i = 0; i < addedCharsForLetter; i++) {
      if (i === OriginalLetterIndex) {
        encodedWord += String.fromCharCode(letter.charCodeAt(0) - 64);
      } else {
        encodedWord += fakeHashArr[parseInt(Math.random() * 100) % hashArrLen];
      }
    }
    // arbitrarily increment added chars for next letters
    addedCharsForLetter += 17;
  }
  return encodedWord;
}

function decodeWord(encodedWord) {
  // initial variables
  let addedCharsForLetter = 26;
  const OriginalLetterIndex = 11;

  let decodedWord = "";
  // array to store each chunk in encodedWord holding a letter
  let letters = [];

  // split encoded word until zero letters in length
  while (encodedWord !== "") {
    letters.push(encodedWord.substring(0, addedCharsForLetter))
    encodedWord = encodedWord.slice(addedCharsForLetter);
    addedCharsForLetter += 17;
  }

  // add only from the encoding key index
  for (let letter of letters) {
    decodedWord += String.fromCharCode(letter[OriginalLetterIndex].charCodeAt(0) + 64);
  }

  return decodedWord;
}

/*
  * This is a function that delays the opening of how to play dialog
  * based on network speeds
*/ 
async function delayedOpenDialog() {
  // calculate network speed based on how fast word of the day is fetched
  const startTime = performance.now();
  // get today word and save it in local storage
  await getTodayWord();
  const endTime = performance.now();

  const timeTaken = endTime - startTime;
  /*
    *  the main function execution time in seconds
      ** after some testing, this is roughly the JS execution time
      ** based on network speed alone (not device processing power)
      
    * safety delay is also arbitrarily set after some network speed testing
  */
  const jsExecutionTime = timeTaken * 2;
  const additionalSafetyDelay = 500;

  //* delay dialog opening based on network speed
  await new Promise(resolve => setTimeout(resolve, jsExecutionTime + additionalSafetyDelay));

  openHowToPlayDialog();
}

export { getTodayWord, isDayPassed, setNewDate, removeYesterdayDate }