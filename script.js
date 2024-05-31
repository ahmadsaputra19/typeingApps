// script.js
let words = [];
let currentIndex = 0;
let timeLeft = 60;
let timerInterval;
const wordContainer = document.getElementById('word-container');
const inputField = document.getElementById('input-field');
const timer = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const languageSelect = document.getElementById('language');

async function fetchWords(language) {
  const apiUrl = language === 'en' ? 'https://api.datamuse.com/words?ml=test' : 'https://api.datamuse.com/words?ml=coba&v=indonesia';
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.map((wordObj) => wordObj.word);
}

function startTimer() {
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

async function startGame() {
  words = await fetchWords(languageSelect.value);
  currentIndex = 0;
  wordContainer.textContent = words[currentIndex];
  inputField.value = '';
  inputField.disabled = false;
  inputField.focus();
  timeLeft = 60;
  timer.textContent = `Waktu: ${timeLeft} detik`;
  startTimer();
}

inputField.addEventListener('input', () => {
  if (inputField.value.trim() === words[currentIndex]) {
    currentIndex = (currentIndex + 1) % words.length;
    wordContainer.textContent = words[currentIndex];
    inputField.value = '';
  }
});

startButton.addEventListener('click', startGame);
