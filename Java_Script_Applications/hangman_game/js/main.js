// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);
// console.log(lettersArray);

// Select Letters Container
let container = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {

    // Create Span
    let span = document.createElement("span");

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append The Letter To Span
    span.appendChild(theLetter);

    // Append Class On Span
    span.className = "letter-box";

    // append Span To The Letter Container
    container.appendChild(span);
});

// Object Of Words + Gategories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qater"]
};

// Get Random Property
let allKeys = Object.keys(words);
    // console.log(allKeys);
    
let randomPropertyIndex = Math.floor(Math.random() * allKeys.length);
    // console.log(randomPropertyNumber);

let randomPropName = allKeys[randomPropertyIndex];
    console.log(randomPropName);

let randomProValue = words[randomPropName];
    // console.log(randomProValue);

let randomValueIndex = Math.floor(Math.random() * randomProValue.length);
    // console.log(randomValueNumber);

let randomValueName = randomProValue[randomValueIndex];
    console.log(randomValueName);

// Set Category Info
document.querySelector(".gategory span").innerHTML = randomPropName;

// select Letters Guess Element
let letterGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueName);
    // console.log(lettersAndSpace);

// Create Spans Depend On Word
lettersAndSpace.forEach(letter => {
    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If Letter Is Space
    if (letter === ' ') {
        // Add Class To Span
        emptySpan.className = 'with-space';
    }

    // Append Span To The Letters Guess Container
    letterGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");
    // console.log(guessSpans);

// Set Wrong Attempts
let wrongAttempts = 0; 

// Select The Draw Element 
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking Letters 
document.addEventListener("click", (e) => { 

    // Set The Chose Status
    let theStatus = false;

    // Add Clicked Class 
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
    }

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    console.log(theClickedLetter);

    // The Chosen Word
    let theChosenWord = Array.from(randomValueName.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
        
        // If The Clicked Letter Equal To One Of The Chosen Word Letter
        if (theClickedLetter === wordLetter) {
            console.log(`Found At Index Number ${wordIndex}`);

            // Set Status To Correct
            theStatus = true;

            // Loop On All Guess Spans
            guessSpans.forEach((span, spanIndex) => {

                if (wordIndex === spanIndex) {
                    span.innerHTML = theClickedLetter;
                }
            });

        }
    });
    // If Letter Is Wrong
    if (theStatus !== true) {
        // Increase The Wrong Attempts
        wrongAttempts++;

        // Add Class Wrong On The Draw Element
        theDraw.classList.add(`wrong-${wrongAttempts}`);

        // Play Fail Sound
        // document.getElementById("fail").play();

        if (wrongAttempts === 8) {
            endFailGame();

            container.classList.add("finished");
        }

    } else {
        // endSuccessGame();
        // Play Success Sound
        // document.getElementById("success").play();
    }
    
});


// End Game Function 
function endFailGame() {

    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueName}`);

    // Append Text To Text
    div.appendChild(divText);

    // Add Class On Div
    div.className = 'popup';

    // Append To The body
    document.body.appendChild(div);
}

function endSuccessGame() {

    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(`Your Amazing, You Have ${wrongAttempts} Wrong`);

    // Append Text To Text
    div.appendChild(divText);

    // Add Class On Div
    div.className = 'popup';

    // Append To The body
    document.body.appendChild(div);
}