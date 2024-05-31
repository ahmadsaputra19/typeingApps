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

function startTypingTest() {
    // Reset all values
    startTime = new Date().getTime();
    currentWordIndex = 0;
    totalWordsTyped = 0;
    correctCharsTyped = 0;
    textToType = generateText();
    
    textInput.value = '';
    textInput.disabled = false;
    textInput.focus();
    textDisplay.innerText = textToType[currentWordIndex];

    timerInterval = setInterval(updateTime, 1000);
    textInput.addEventListener('input', checkInput);
}

function generateText() {
    const words = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog", "and", "then", "runs", "away"];
    let textArray = [];
    for (let i = 0; i < 100; i++) {
        textArray.push(words[Math.floor(Math.random() * words.length)]);
    }
    return textArray;
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
