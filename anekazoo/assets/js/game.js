document.addEventListener("DOMContentLoaded", () => {
    const letterGrid = document.getElementById("letter-grid");
    const targetContainer = document.getElementById("target-container");
    const messageDiv = document.getElementById("message");
    const selamatMessage = document.getElementById("selamat-message");
    const loadingScreen = document.getElementById("loading-screen");
  
    // Simulate loading screen for 3 seconds
    setTimeout(() => {
      loadingScreen.classList.add("hidden"); // Hide loading screen after 3 seconds
    }, 3000); // Loading time (3 seconds)
  
    const letters = ["M", "E", "R", "I", "A", "N", "G", "M", "E", "R", "I", "A", "N", "G"];
    const shuffledLetters = shuffleArray([...letters]);
    let selectedLetters = [];
    let correctMatches = 0;
  
    // Create letter grid
    function generateGrid() {
      shuffledLetters.forEach(letter => {
        const letterBox = document.createElement("div");
        letterBox.classList.add("letter-box");
        letterBox.setAttribute("data-letter", letter);
        const letterElement = document.createElement("div");
        letterElement.classList.add("letter");
        letterElement.textContent = letter;
        letterBox.appendChild(letterElement);
  
        letterBox.addEventListener("click", handleLetterClick);
        letterGrid.appendChild(letterBox);
      });
    }
  
    // Create target boxes for each letter
    function generateTargets() {
      const uniqueLetters = [...new Set(letters)];
      uniqueLetters.forEach(letter => {
        const targetBox = document.createElement("div");
        targetBox.classList.add("target-box");
        targetBox.setAttribute("data-letter", letter);
        targetContainer.appendChild(targetBox);
      });
    }
  
    // Shuffle array function
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    // Handle letter selection
    function handleLetterClick(e) {
      const clickedLetter = e.target;
  
      // Skip if the letter is already in target or already open
      if (clickedLetter.classList.contains("open") || clickedLetter.classList.contains("in-target")) {
        return;
      }
  
      if (selectedLetters.length < 2) {
        clickedLetter.classList.add("open");
        selectedLetters.push(clickedLetter);
  
        if (selectedLetters.length === 2) {
          checkMatch();
        }
      }
    }
  
    // Check if the selected letters match
    function checkMatch() {
      const [firstLetter, secondLetter] = selectedLetters;
      const firstLetterValue = firstLetter.textContent;
      const secondLetterValue = secondLetter.textContent;
  
      if (firstLetterValue === secondLetterValue) {
        moveLetterToTarget(firstLetter, secondLetter);
        correctMatches++;
  
        if (correctMatches === 7) {
          showFinalMessage();
        }
  
        selectedLetters = []; // Reset selected letters for next pair
      } else {
        // If not match, close the cards again after delay
        setTimeout(() => {
          firstLetter.classList.remove("open");
          secondLetter.classList.remove("open");
          selectedLetters = []; // Reset selected letters for next pair
        }, 400);
      }
    }
  
    // Move letter to target position
    function moveLetterToTarget(firstLetter, secondLetter) {
      const letter = firstLetter.textContent;
      const targetBox = targetContainer.querySelector(`[data-letter="${letter}"]`);
      targetBox.textContent = letter;
      firstLetter.classList.add("in-target");
      secondLetter.classList.add("in-target");
    }
  
    // Show final message with typing effect
    function showFinalMessage() {
      // Show the final message container
      messageDiv.classList.remove("hidden");
      messageDiv.classList.add("fade-in"); // Trigger fade-in animation
  
      // Show and start typing the first message
      const messageText = document.getElementById("selamat-message");
      messageText.textContent = "Congratulations!"; // Set the text for the first message
      messageText.classList.add("typing"); // Start typing effect for the first message
  
      // After the first message finishes typing, start typing the second message
      setTimeout(() => {
        const finalMessageText = document.getElementById("final-message");
        finalMessageText.textContent = "Meriang has been detected! wkwkwkwk"; // Set the text for the second message
        finalMessageText.classList.add("typing"); // Start typing effect for the second message
      }, 3000); // Delay this by 3 seconds (the duration of the first message typing effect)
      // After the second message finishes typing, redirect to love.html after 5 seconds
    setTimeout(() => {
        window.location.href = "love.html"; // Redirect to love.html
      }, 8000); // 3000ms for first message, 3000ms for second message, and 2000ms delay
    }
  
    // Initialize the game
    generateGrid();
    generateTargets();
  });
  