// all quotes
const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, 201user. It is a series of lessons, with the greatest for the last.',
  'This is the Key to the 201worlds.',
  'In the 201worlds you are either the most Powerful being or you are Nothing.',
];
// To store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// Determines starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {
  // gets random quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // Puts the quote into an array of words
  words = quote.split(' ');
  // resets the word index for tracking
  wordIndex = 0;

  // UI updates
  // Creates an array of span elements to set a class
  const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  // Converts into string and sets as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join('');
  // Highlight the first word
  quoteElement.childNodes[0].className = 'highlight';
  // Clears any prior messages
  messageElement.innerText = '';

  // Sets up the textbox
  // Clears the textbox
  typedValueElement.value = '';
  // sets focus
  typedValueElement.focus();
  // sets the event handler

  // Starts the timer
  startTime = new Date().getTime();
});
typedValueElement.addEventListener('input', () => {
  // Gets the current word
  const currentWord = words[wordIndex];
  // gets the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // Display success
    const elapsedTime = new Date().getTime() - startTime;
    const message = `🎉CONGRATULATIONS 201user!🎉 You finished in ${elapsedTime / 1000} seconds.😎`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // end of word
    // clears the typedValueElement for the new word
    typedValueElement.value = '';
    // moves to the next word
    wordIndex++;
    // resets the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    // highlights the new word
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlights the next word
    typedValueElement.className = '';
  } else {
    // error state
    typedValueElement.className = 'error';
  }
});