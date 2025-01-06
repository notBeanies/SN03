const RANDOM_QUOTE_API_URL = 'https://dummyjson.com/quotes/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score'); // To display the score
let score = 0; // Initialize score

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value.split('');

  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
    }
  });

  if (correct) {
    score += 1; // Increase score only when the user types the whole quote correctly
    renderNewQuote();
  }
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.quote);  // Adjust based on the response from the API
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = '';
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null; // Clear input field
  startTimer();
}

let startTime;
function startTimer() {
  timerElement.innerText = 60; // Set the challenge time (e.g., 60 seconds)
  scoreElement.innerText = `Score: ${score}`; // Show current score
  startTime = new Date();
  const interval = setInterval(() => {
    const timeLeft = Math.floor((60 - (new Date() - startTime) / 1000));
    timerElement.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(interval);  // Stop the timer
      showFinalScore(); // Call to show the final score
    }
  }, 1000);
}

function showFinalScore() {
  scoreElement.innerText = `Final Score: ${score}`; // Show the final score
  alert(`Time's up! Your final score is: ${score}`);
}

renderNewQuote();
