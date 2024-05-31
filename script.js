// script.js
let startTime;
let timerInterval;
let textToType = [];
let currentWordIndex = 0;
let totalWordsTyped = 0;
let correctCharsTyped = 0;

const textDisplay = document.getElementById('textDisplay');
const textInput = document.getElementById('textInput');
const timeDisplay = document.getElementById('time');
const accuracyDisplay = document.getElementById('accuracy');
const wpmDisplay = document.getElementById('wpm');

document.getElementById('startButton').addEventListener('click', startTypingTest);

async function startTypingTest() {
    // Reset all values
    startTime = new Date().getTime();
    currentWordIndex = 0;
    totalWordsTyped = 0;
    correctCharsTyped = 0;
    textToType = await generateText();
    
    textInput.value = '';
    textInput.disabled = false;
    textInput.focus();
    textDisplay.innerText = textToType[currentWordIndex];

    timerInterval = setInterval(updateTime, 1000);
    textInput.addEventListener('input', checkInput);
}

async function generateText() {
    const words = await fetchRandomWords(100);
    return words;
}

async function fetchRandomWords(number) {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${number}`);
    const data = await response.json();
    return data;
}

function updateTime() {
    const currentTime = new Date().getTime();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    timeDisplay.innerText = timeElapsed;

    if (timeElapsed >= 60) {
        clearInterval(timerInterval);
        textInput.disabled = true;
        textInput.removeEventListener('input', checkInput);
    }
}

function checkInput() {
    const currentText = textToType[currentWordIndex];
    const typedText = textInput.value.trim();
    totalWordsTyped = textInput.value.split(' ').length - 1;

    if (typedText === currentText) {
        correctCharsTyped += currentText.length;
        textInput.value = '';
        currentWordIndex++;
        if (currentWordIndex < textToType.length) {
            textDisplay.innerText = textToType[currentWordIndex];
        } else {
            textDisplay.innerText = 'Well done!';
            clearInterval(timerInterval);
            textInput.disabled = true;
            textInput.removeEventListener('input', checkInput);
        }
    }

    const accuracy = calculateAccuracy();
    const wpm = calculateWPM();

    accuracyDisplay.innerText = accuracy;
    wpmDisplay.innerText = wpm;
}

function calculateAccuracy() {
    return Math.floor((correctCharsTyped / (totalWordsTyped * 5)) * 100);
}

function calculateWPM() {
    const currentTime = new Date().getTime();
    const timeElapsed = (currentTime - startTime) / 1000 / 60;
    return Math.floor(totalWordsTyped / timeElapsed);
}
