window.onload = function () {
    document.getElementById('loseMessage').style.display = 'none';
    document.getElementById('matchMessage').style.display = 'none';
    document.getElementById('winMessage').style.display = 'none';
  };
  
  let cards = document.querySelectorAll('.card');
  let clickedCards = [];
  let positions = [];
  let matches = 0;
  let maxMatches = 4;
  let attempts = 0;
  let maxAttempts = 5; 
  let attemptsElement = document.getElementById('attempts');
  let maxAttemptsElement = document.getElementById('maxAttempts');
  let loseMessage = document.getElementById('loseMessage');
  let winMessage = document.getElementById('winMessage');
  let initialColors = ["red", "red", "red",
      "green", "green", "green",
      "blue", "blue", "blue",
      "orange", "orange", "orange"];
  let colors = [...initialColors];
  let variableBorder = document.getElementById('section_2');
  let borderColors = ['blue', 'green', 'yellow', 'orange', 'red'];
  let i = 0;
  
  function changeBorder() {
    setInterval(function () {
      variableBorder.style.border = '.5rem dashed ' + borderColors[i];
      i = (i + 1) % borderColors.length; // This will loop back to the first color after the last one
    }, 125);
  }
  
  
  
  function shuffleColors() {
    for (let i = colors.length - 1; i > 0; i--) {  // this line iterates thru the array from the end and decrements the index as long and index is greater than 0.
         let j = Math.floor(Math.random() * (i + 1));  // this line defines the new index j as Math.floor(lowest whole number)(Math.random() generates a random float 0.0 - 1.0 then that is multiplied by the index, +1.)
         [colors[i], colors[j]] = [colors[j], colors[i]]; // this line assigns j to equal i and i to equal j.
    }
  }  // Fisher-Yates (Knuth) Shuffle Algorithm
  function resetGame() {
    colors = [...initialColors];
    shuffleColors();
    matches = 0;
      document.getElementById('matches').textContent = "Matches: " + matches;; // Update matches element
      attempts = 0;
      attemptsElement.textContent = "Attempts: " + attempts; // Update attempts element
    cards.forEach(function (card, index) {  // resets each card 
      card.style.border = '.125rem solid white';
      card.style.backgroundColor = 'brown';
      card.style.visibility = 'visible';
      card.dataset.isClicked = 'false';
      card.dataset.color = colors[index]; // Assign color from shuffled array
    });
  }  // Reset game function
  
  shuffleColors();
  changeBorder();
  
  cards.forEach(function (card, index) {
    card.dataset.isClicked = 'false';  // checks if card is clicked
    card.dataset.color = colors[index]; // Assign color from shuffled array
    card.dataset.index = index // Store the index of each card
    card.style.backgroundColor = 'brown';
      card.addEventListener('click', function () {
  
        if (attempts >= maxAttempts) {
              return;
          } // If the number of attempts has reached the maximum, return immediately
  
        if (this.dataset.isClicked == 'false' && !clickedCards.includes(this)) {
              this.style.transform = 'rotateY(180deg)';
              this.style.transition = 'transform 0.5s';
              this.style.border = '.125rem solid white'; // This keeps the selected card border white
              this.style.backgroundColor = this.dataset.color; // Reveal color
              this.dataset.isClicked = 'true';
              positions.push(this.dataset.index); // Add the index of the clicked card to positions
  
              if (attempts < maxAttempts) {
                  clickedCards.push(this);
              }  // Only add the clicked card to clickedCards if attempts is less than maxAttempts
          }  // If the card has not been clicked and is not in clickedCards
  
        if (clickedCards.length >= 3) {
              attempts++; // Increment the number of attempts
            attemptsElement.textContent = "Attempts: " + attempts;; // Update attempts element
              let clickedCardsCopy = [...clickedCards]; // Create a copy of clickedCards
  
              if (clickedCards[0].style.backgroundColor ==
                  clickedCards[1].style.backgroundColor &&
                  clickedCards[0].style.backgroundColor ==
                  clickedCards[2].style.backgroundColor) {
                  document.getElementById('matchMessage').style.display = 'flex';
                  matches++;
                  document.getElementById('matches').textContent = "Matches: " + matches;
                  clickedCards[0].style.border = '.125rem solid yellow';
                  clickedCards[1].style.border = '.125rem solid yellow';
                  clickedCards[2].style.border = '.125rem solid yellow';
                  setTimeout(function () {
                      clickedCardsCopy[0].style.visibility = 'hidden';
                      clickedCardsCopy[1].style.visibility = 'hidden';
                      clickedCardsCopy[2].style.visibility = 'hidden';
                      document.getElementById('matchMessage').style.display = 'none'; // Hide #matchMessage
                  }, 1000);  // Hide the cards after a delay if they all match.
              } else {
                  setTimeout(function () {
                      clickedCardsCopy[0].style.backgroundColor = 'brown';
                      clickedCardsCopy[0].dataset.isClicked = 'false';
                      clickedCardsCopy[1].style.backgroundColor = 'brown';
                      clickedCardsCopy[1].dataset.isClicked = 'false';
                      clickedCardsCopy[2].style.backgroundColor = 'brown';
                      clickedCardsCopy[2].dataset.isClicked = 'false';
                  }, 500);  // Reset the cards back to brown after a delay if no match
              }  // If the three cards have the same background color
  
              clickedCards = []; // Reset clickedCards
              positions = []; // Reset positions
          }  // If three cards have been clicked
  
        if (matches == maxMatches) {
          setTimeout(function () {
            winMessage.style.display = 'flex'; // show #winMessage
            setTimeout(function () {
              winMessage.style.display = 'none'; // hide #winMessage
              resetGame();
            }, 1000);
          }, 1000);
      } else {
          winMessage.style.display = 'none';  // hide winMessage
      }   // After each move or after hiding/resetting cards
      
        if (attempts == maxAttempts) {  
            loseMessage.style.display = 'flex';  // Show the "You lose" message
  
            document.getElementById('attempts').textContent = "Attempts: 0";
  
          setTimeout(function () {  // After a delay
          loseMessage.style.display = 'none';  // Hide the "You lose" message
          resetGame();  // Reset the game
        }, 1000);
        } else {
            loseMessage.style.display = 'none';  // Hide the "You lose" message
        }  // If the number of attempts reaches the maximum
      });  // listens for click event
  });  // Executes functions for each card, index
  