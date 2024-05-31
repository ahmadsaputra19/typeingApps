// script.js
let words = [];
let currentIndex = 0;
let timeLeft = 60;
let timerInterval;
let timerStarted = false;
const wordContainer = document.getElementById('word-container');
const inputField = document.getElementById('input-field');
const timer = document.getElementById('timer');
const restartButton = document.getElementById('restart-button');
const languageSelect = document.getElementById('language');

async function fetchWords(language) {
    const apiUrl = language === 'en'
        ? 'https://api.datamuse.com/words?ml=test'
        : 'https://api.datamuse.com/words?ml=coba&v=indonesia';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.map(wordObj => wordObj.word);
}

function startTimer() {
    if (!timerStarted) {
        timerStarted = true;
        timerInterval = setInterval(() => {
            timeLeft--;
            timer.textContent = `Waktu: ${timeLeft} detik`;
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                inputField.disabled = true;
                alert('Waktu habis!');
            }
        }, 1000);
    }
}

async function startGame() {
    words = await fetchWords(languageSelect.value);
    currentIndex = 0;
    wordContainer.textContent = words[currentIndex];
    inputField.value = '';
    inputField.disabled = false;
    inputField.focus();
    timeLeft = 60;
    timer.textContent = `Waktu: ${timeLeft} detik`;
    timerStarted = false;
    clearInterval(timerInterval);
    inputField.addEventListener('input', startTimer);
}

inputField.addEventListener('input', () => {
    const currentWord = words[currentIndex];
    const inputText = inputField.value.trim();
    if (inputText === currentWord) {
        currentIndex = (currentIndex + 1) % words.length;
        wordContainer.textContent = words[currentIndex];
        inputField.value = '';
        wordContainer.classList.remove('wrong');
        wordContainer.classList.add('right');
    } else if (!currentWord.startsWith(inputText)) {
        wordContainer.classList.add('wrong');
        wordContainer.classList.remove('right');
    } else {
        wordContainer.classList.remove('wrong');
        wordContainer.classList.remove('right');
    }
});

restartButton.addEventListener('click', startGame);

// Inisialisasi pertama kali
document.addEventListener('DOMContentLoaded', () => {
    inputField.disabled = true;
    wordContainer.textContent = 'Tekan tombol "Restart" untuk memulai';
});
