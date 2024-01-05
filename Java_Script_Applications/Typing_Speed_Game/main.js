let levelContainer = document.querySelector(".level");
let levelName = document.querySelector(".level .lvl");
let levelSeconds = document.querySelector(".level .seconds");
let btnPlay = document.querySelector(".container button");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWord = document.querySelector(".upcoming-word");
let control = document.querySelector(".control");
let controlTime = document.querySelector(".control .time .time-left");
let score = document.querySelector(".score .your-score");
let totalScore = document.querySelector(".score .total");
let finish = document.querySelector(".finish");


const level = {
    "easy": 8,
    "normal": 6,
    "hard": 4
}; 



getData();

function getData() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {

        if (myRequest.readyState === 4 && myRequest.status === 200) {
            
            let data = JSON.parse(myRequest.responseText);
            let arrayData = Array.from(data);
            // console.log(arrayData);

            
            btnPlay.onclick = function () {

                let defaultLevel;

                let chooseLevel = prompt('Select The Level\nFor Easy Enter [1]\nFor Normal Enter [2]\nFor Hard Enter [3]');
                
                if (chooseLevel == 1) {
                    defaultLevel = 'easy';
                } else if (chooseLevel == 3) {
                    defaultLevel = 'hard';
                } else {
                    defaultLevel = 'normal';
                }

                btnPlay.remove();
                input.focus();
                generateData(arrayData);
            }

            setDefaultData(arrayData.length);

        }
    }

    myRequest.open('GET', 'dataBase.json', true);
    myRequest.send();
}

function setDefaultData(length) {
    levelName.innerHTML = defaultLevel;
    levelSeconds.innerHTML = level[defaultLevel];
    controlTime.innerHTML = level[defaultLevel];
    totalScore.innerHTML = length;
    
}

function generateData(data) {

    let randomIndex = Math.floor(Math.random() * data.length);
    let randomWord = data[randomIndex];
    data.splice(randomIndex, 1);
    
    theWord.innerHTML = randomWord;

    // console.log(randomWord);
    upcomingWord.innerHTML = '';

    input.value = '';

    // console.log(data.length);
    data.forEach(word => {
        let divWord = document.createElement('div');
        let txt = document.createTextNode(word);
        divWord.appendChild(txt);
        upcomingWord.appendChild(divWord);
        // divWord.appendChild(word);
    });

    startPlay(data, randomWord);
}

function startPlay(data, word) {

    if (score.innerHTML === '0') {
        controlTime.innerHTML = level[defaultLevel] + 3;
    } else {
        controlTime.innerHTML = level[defaultLevel];
    }


    let interval = setInterval(() => {
        controlTime.innerHTML--;

        if (controlTime.innerHTML === '0') {
            // console.log('done');
            
            clearInterval(interval);
            
            checkInput(data, word);

        }
    }, 1000);
}

function checkInput(data, word) {
    // console.log(data.length);
    let inputData = input.value.toLowerCase(); 
    let myWord = word.toLowerCase();
    // console.log(theWord);
    if (inputData === myWord) {

        score.innerHTML++;

        if (data.length > 0) {
            generateData(data);
        } else {

            levelContainer.remove();
            theWord.remove();
            input.remove();
            upcomingWord.remove();
            control.remove();

            let span = document.createElement('span');
            span.className = 'good';
            let textSpan = document.createTextNode('Very Good !');
            span.appendChild(textSpan);
            finish.appendChild(span);
        }

    } else {

        levelContainer.remove();
        theWord.remove();
        input.remove();
        upcomingWord.remove();
        control.remove();

        let span = document.createElement('span');
        span.className = 'bad';
        let textSpan = document.createTextNode('Game Over');
        span.appendChild(textSpan);
        finish.appendChild(span);

        let div = document.createElement('div');
        let textDiv = document.createTextNode('Try Again');
        div.appendChild(textDiv);
        finish.appendChild(div);

        div.onclick = function () {
            document.location.reload();
        }
    }

}