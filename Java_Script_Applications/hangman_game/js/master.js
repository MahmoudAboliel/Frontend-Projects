let letters = "abcdefghijklmnopqrstuvwxyz";

// convert string to array
let arrayLetters = Array.from(letters);
// console.log(arrayLetters);

let containerLetters = document.querySelector(".letters");

// append letter to container
arrayLetters.forEach(letter => {
    let span = document.createElement("span");

    let textSpan = document.createTextNode(letter.toUpperCase());

    span.appendChild(textSpan);
    span.className = "letter-box";

    containerLetters.appendChild(span);
});

const words = {
    people: ["Ahmad", "Khald", "Mahmood", "Kram", "Zied", "Noor", "Ammar"],
    country: ["Syria", "Egypt", "Sudi", "USA", "Qutar", "Auman"],
    programming: ["python", "jscript", "php", "java", "mysql", "jquery", "laravel"],
    skills: ["problem solving", "communication", "learn continue"]
};

// get name key from object
let allKeys = Object.keys(words);
// console.log("all Keys: " + allKeys);

let randomIndexKeys = Math.floor(Math.random() * allKeys.length);
// console.log("Random Index Keys: " + randomIndexKeys);

let randomKeyName = allKeys[randomIndexKeys];
// console.log("Random Key Name: " + randomKeyName);

let randomValue = words[randomKeyName];
// console.log("Random Value: " + randomValue);

let randomIndexValue = Math.floor(Math.random() * randomValue.length);
// console.log("Random Index Value: " + randomIndexValue);

let randomValueName = randomValue[randomIndexValue];
// console.log("Random Value Name: " + randomValueName);

// insert Key Name To Title
let wordClass = document.querySelector(".className");
wordClass.innerHTML = randomKeyName;

// Get Letters Chosen And Convert To Array
let letterAndSpacing = Array.from(randomValueName);
// console.log("Array From Letters: " + letterAndSpacing);

let containerGuessLetters = document.querySelector(".guess-letters");



// Append box Letter To container Guess
letterAndSpacing.forEach(element => {

    let emptySpan = document.createElement("span");

    if (element === ' ') {
        emptySpan.className = 'space';
    }

    containerGuessLetters.appendChild(emptySpan);

});

let guessSpans = document.querySelectorAll(".guess-letters span");

let Draw = document.querySelector(".draw");

let wrongNumber = 0;

let currentNumber = 0;

document.addEventListener("click", (event) => {

    let Status = false;

    // Add Class Clicked To Span Selected
    if (event.target.className === 'letter-box') {
        event.target.classList.add("clicked");

        // Get Clicked Letter
        let clickedLetter = event.target.innerHTML.toLowerCase();
        // console.log("Clicked Letter: " + clickedLetter);

        // Get Chosen Word
        let chosenWord = Array.from(randomValueName.toLowerCase());
        // console.log("length: " + chosenWord.length);

        chosenWord.forEach((letterWord, indexWord) => {
            
            if (letterWord === clickedLetter) {
                Status = true;
                currentNumber++;
                console.log(`At Found In ${indexWord}`);
                guessSpans.forEach((span, spanIndex) => {
                    
                    if (indexWord === spanIndex) {
                        span.innerHTML = clickedLetter.toUpperCase();
                    }
                });
                if (currentNumber === chosenWord.length) {
                    endSuccessGame();

                    containerLetters.classList.add("finished");
                }
            } 
        });

        if (Status !== true) {
            wrongNumber++;
            Draw.classList.add(`wrong-${wrongNumber}`);

            if (wrongNumber === 8) {
                endFailGame();

                containerLetters.classList.add("finished");
            }
        }

    }


});

function endFailGame() {
    
    let Div = document.createElement("div");

    let textDiv = document.createTextNode(`Game Over, The Word Is : ${randomValueName}`);

    Div.appendChild(textDiv);

    let button = document.createElement("button");

    let buttonText = document.createTextNode("Try agin");

    button.appendChild(buttonText);

    button.addEventListener("click", (event) => {
        document.location.reload();
    });

    Div.appendChild(button);

    Div.className = "popup";

    document.body.appendChild(Div);
}

function endSuccessGame() {
    
    let Div = document.createElement("div");

    let textDiv = document.createTextNode(`You are Awesome, You have : ${wrongNumber} Mistake`);

    Div.appendChild(textDiv);

    let button = document.createElement("button");

    let buttonText = document.createTextNode("Play agin");

    button.appendChild(buttonText);

    button.addEventListener("click", (event) => {
        document.location.reload();
    });

    Div.appendChild(button);

    Div.className = "popup";

    document.body.appendChild(Div);
}

