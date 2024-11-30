document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const firstPage = document.getElementById("first-page");
    const typedText1 = document.getElementById("typed-text1");
    const typedText2 = document.getElementById("typed-text2");
  
    // Simulate loading screen
    setTimeout(() => {
      loadingScreen.style.display = "none"; // Hide loading screen
      firstPage.classList.remove("hidden"); // Show first page
      startTyping(); // Start typing effect
    }, 3000); // 3 detik untuk animasi loading
  
    // Typing effect
    const textsDesktop = ["Yahooo comel, bosen gkse? klick Next dong", "Main game yok, ben gk bosen klick Play dong"];
    const textsMobile = ["Yahooo comel, bosen gkse? klick Next dong", "Main game yok, ben gk bosen klick Play dong"];
    let currentTextIndex = 0;
  
    function startTyping() {
      const isMobile = window.innerWidth <= 768;
      const texts = isMobile ? textsMobile : textsDesktop;
  
      let i = 0;
      let currentTypedText = currentTextIndex === 0 ? typedText1 : typedText2;
      currentTypedText.textContent = ""; // Clear text
  
      function typeChar() {
        if (i < texts[currentTextIndex].length) {
          currentTypedText.textContent += texts[currentTextIndex].charAt(i);
          i++;
          setTimeout(typeChar, 100); // Typing speed
        } else {
          // After typing is done, add click event
          currentTypedText.addEventListener("click", handleTextClick, { once: true });
        }
      }
  
      typeChar();
    }
  
    function handleTextClick() {
      if (currentTextIndex === 0) {
        typedText1.classList.add("hidden"); // Hide typed-text1
        currentTextIndex++; // Move to the next text
        typedText2.classList.remove("hidden"); // Show typed-text2
        startTyping(); // Start typing the second text
      } else {
       // Redirect to game.html
            window.location.href = "game.html"; // Redirect to game page
      }
    }
  });
  