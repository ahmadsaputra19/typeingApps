// script.js
let startTime;
let timerInterval;

document.getElementById('startButton').addEventListener('click', startTypingTest);

function startTypingTest() {
    const textInput = document.getElementById('textInput');
    textInput.value = '';
    textInput.disabled = false;
    textInput.focus();

    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 1000);

    textInput.addEventListener('input', checkInput);
}

function updateTime() {
    const currentTime = new Date().getTime();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    document.getElementById('time').innerText = timeElapsed;
}

function checkInput() {
    const textDisplay = document.getElementById('textDisplay').innerText;
    const textInput = document.getElementById('textInput').value;
    const timeElapsed = Math.floor((new Date().getTime() - startTime) / 1000);

    const accuracy = calculateAccuracy(textDisplay, textInput);
    const wpm = calculateWPM(textInput, timeElapsed);

    document.getElementById('accuracy').innerText = accuracy;
    document.getElementById('wpm').innerText = wpm;

    if (textInput === textDisplay) {
        clearInterval(timerInterval);
        textInput.disabled = true;
    }
}

function calculateAccuracy(originalText, typedText) {
    const originalWords = originalText.split('');
    const typedWords = typedText.split('');
    let correctChars = 0;

    for (let i = 0; i < typedWords.length; i++) {
        if (typedWords[i] === originalWords[i]) {
            correctChars++;
        }
    }

    return Math.floor((correctChars / originalWords.length) * 100);
}

function calculateWPM(typedText, timeElapsed) {
    const wordsTyped = typedText.split(' ').length;
    const minutesElapsed = timeElapsed / 60;

    return Math.floor(wordsTyped / minutesElapsed);
}
