// List of words for the game
const words = [
    "hangman",
    "javascript",
    "programming",
    "openai",
    "computer"
  ];
  
  let selectedWord = "";
  let guesses = [];
  let wrongGuesses = 0;
  
  // DOM Elements
  const wordContainer = document.getElementById("word-container");
  const guessesContainer = document.getElementById("guesses-container");
  const hangmanImage = document.getElementById("hangman-image");
  const message = document.getElementById("message");
  const guessInput = document.getElementById("guess-input");
  const guessButton = document.getElementById("guess-button");
  
  // Initialize the game
  function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guesses = [];
    wrongGuesses = 0;
    message.textContent = "";
  
    // Create blank spaces for the word
    wordContainer.innerHTML = "";
    for (let i = 0; i < selectedWord.length; i++) {
      const span = document.createElement("span");
      span.innerText = "_";
      wordContainer.appendChild(span);
    }
  
    // Clear previous guesses
    guessesContainer.textContent = "Guesses: ";
  
    // Clear guess input field
    guessInput.value = "";
  
    // Enable guess button
    guessButton.disabled = false;
  
    // Reset hangman image
    hangmanImage.style.backgroundPositionX = "0";
  }
  
  // Handle user's guess
  function handleGuess() {
    const guess = guessInput.value.toLowerCase();
    if (!guess.match(/[a-z]/i)) {
      return; // Ignore non-alphabet characters
    }
  
    if (guesses.includes(guess)) {
      message.textContent = "You already guessed that letter!";
      return;
    }
  
    guesses.push(guess);
  
    if (selectedWord.includes(guess)) {
      // Update the word with correctly guessed letters
      const spans = wordContainer.getElementsByTagName("span");
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guess) {
          spans[i].innerText = guess;
        }
      }
  
      // Check if the word is complete
      if (spansNotVisible(spans)) {
        message.textContent = "Congratulations! You won!";
        guessButton.disabled = true; // Disable guess button
      }
    } else {
      // Update wrong guesses count and display hangman image
      wrongGuesses++;
      hangmanImage.style.backgroundPositionX = -200 * wrongGuesses + "px";
  
      // Check if the player lost
      if (wrongGuesses === 6) {
        message.textContent = "Game Over. You lost!";
        revealWord();
        guessButton.disabled = true; // Disable guess button
      }
    }
  
    // Display guesses
    guessesContainer.textContent = "Guesses: " + guesses.join(", ");
  
    // Clear guess input field
    guessInput.value = "";
  }
  
  // Helper function to check if all the spans are hidden
  function spansNotVisible(spans) {
    for (let i = 0; i < spans.length; i++) {
      if (spans[i].innerText === "_") {
        return true;
      }
    }
    return false;
  }
  
  // Function to reveal the word when the player loses
  function revealWord() {
    const spans = wordContainer.getElementsByTagName("span");
    for (let i = 0; i < selectedWord.length; i++) {
      spans[i].innerText = selectedWord[i];
    }
  }
  
  // Event listener for guess button click
  guessButton.addEventListener("click", handleGuess);
  
  // Event listener for Enter key press in guess input field
  guessInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      handleGuess();
    }
  });
  
  // Start the game
  initializeGame();
  