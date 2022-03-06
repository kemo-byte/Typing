// Array of words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin"
  ];


  // Setting Levels
const lvls = {
  "Easy" : 5,
  "Normal":3,
  "Hard":2
  };
  
  // Default Level
  let defaultLevelName = "Normal"; // Change Level From Here
  let defaultLevelSeconds = lvls[defaultLevelName];

  // Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable past event
input.onpaste = function () {
  return false;
  }
  
  // Start game
  startButton.onclick = function () {
  this.remove();
  input.focus();
  //Generate word function 
  genWords();
  }
  
  function genWords() {
  // Get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get word index
  let wordIndex = words.indexOf(randomWord);
  // Remove word from array
  words.splice(wordIndex,1);
  // Show the random word
  theWord.innerHTML = randomWord;
  // Empty upcoming words
  upcomingWords.innerHTML = '';
  // Generate words
  for (let i=0; i < words.length; i++) {
  // Create div element
  let div = document.createElement("div");
  let txt = document.createTextNode(words[i]);
  div.appendChild(txt);
  upcomingWords.appendChild(div);
  }
  // Call start play function
startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
  timeLeftSpan.innerHTML--;
  if(timeLeftSpan.innerHTML == "0") {
  // Stop Timer
  clearInterval(start);
  // Compare words
  if( theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
  // Empty input field
  input.value = '';
  // Increase score
  scoreGot.innerHTML++;
  if(words.length > 0) {
    // Call generate word function
    genWords();
  } else {
    let span = document.createElement("span");
    span.className = 'good';
    let spanText = document.createTextNode("Congratulations !");
    span.appendChild(spanText);
    finishMessage.appendChild(span);
    // Remove upcoming words box
    upcomingWords.remove();
    }
  } else {
  let span = document.createElement("span");
  span.className = 'bad';
  let spanText = document.createTextNode("Game Over");
  span.appendChild(spanText);
  finishMessage.appendChild(span);
  }
  }
  },1000);
}
