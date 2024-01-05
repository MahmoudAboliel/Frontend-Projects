let countQuestion = document.querySelector(".info-quiz .count span");
let questionAreaMain = document.querySelector(".question-area");
let questionArea = document.querySelector(".question-area .container");
let answersAreaMain = document.querySelector(".answers-area");
let answersArea = document.querySelector(".answers-area .container");
let bullets = document.querySelector(".bullets");
let bulletsContainer = document.querySelector(".bullets .container-spans");
let countdownElement = document.querySelector(".bullets .countdown");
let submitButton = document.querySelector(".submit-button");
let result = document.querySelector(".result");


let questionIndex = 0;
let rightAnswers = 0;
let countdownInterval;


function getData() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (myRequest.readyState === 4 && myRequest.status === 200) {

            let responseObject = JSON.parse(myRequest.responseText);
            let responseCount = responseObject.length;

            countQuestion.innerHTML = responseCount;
            // console.log(responseObject[questionIndex]);

            addData(responseObject[questionIndex], responseCount);
            
            createBullets(responseCount);

            countdown(5, responseCount);
            
            submitButton.onclick = function () {

                let rightAnswer = responseObject[questionIndex].right_answer;

                questionIndex++;

                checkAnswer(rightAnswer, responseCount);
                
                handelBullets(responseCount);
                
                questionArea.innerHTML = '';
                answersArea.innerHTML = '';
                addData(responseObject[questionIndex], responseCount);
                
                clearInterval(countdownInterval);
                countdown(5, responseCount);

                showResult(responseCount);
            }
        }
    }

    myRequest.open("GET", "question.json", true);
    myRequest.send();

    
}

getData();

function addData (data, count) {
    if (questionIndex < count) {

        let h2 = document.createElement("h2");
        let textQuestion = document.createTextNode(data.question_title);
        h2.appendChild(textQuestion);
        questionArea.appendChild(h2);
        
        for (let i = 1; i <= 4; i++) {

            let answer = document.createElement("div");
            answer.className = "answer";

            let radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "question";
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = data[`answer_${i}`];

            let labelInput = document.createElement("label");
            let labelText = document.createTextNode(data[`answer_${i}`]); 
            labelInput.htmlFor = `answer_${i}`;
            labelInput.appendChild(labelText);

            answer.appendChild(radioInput);
            answer.appendChild(labelInput);

            answersArea.appendChild(answer);
        }

        
        
    }
}

function checkAnswer(rAnswer, count) {

    if (questionIndex < count) {
        let choosenAnswer;
        let allAnswers = document.getElementsByName("question");
        
        for (let i = 0; i < allAnswers.length; i++) {

            if (allAnswers[i].checked) {
                choosenAnswer = allAnswers[i].dataset.answer;
            }
        }

        if (rAnswer === choosenAnswer) {
            rightAnswers++;
        }
    }
}

function createBullets(count) {

    for (let i = 0; i < count; i++) {
        
        let span = document.createElement("span");
        if (i === 0) {
            span.className = "on";
        }
        bulletsContainer.appendChild(span);
    }

}

function handelBullets(count) {
    let allBullets = document.querySelectorAll(".bullets .container-spans span");
    let bulletsArray = Array.from(allBullets);

    if (questionIndex < count) {
        bulletsArray.forEach((span, spanIndex) => {
            if (questionIndex === spanIndex) {
                span.className = "on";
            }
        });
    }
}

function countdown(duration, count) {
    
    if (questionIndex < count) {
        let minutes, seconds;

        
        countdownInterval = setInterval(function () {
            
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
    
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countdownElement.innerHTML = `${minutes}:${seconds}`;

            if (--duration < 0) {

                clearInterval(countdownInterval);
                console.log("finished");
                submitButton.click();
            }

        }, 1000);
    }
}

function showResult(count) {
    let theResult;
    if (questionIndex === count) {
        questionAreaMain.remove();
        answersAreaMain.remove();
        bullets.remove();
        submitButton.remove();

        if (rightAnswers > (count / 2) && rightAnswers < count) {
            theResult = `<span class="good">Good</span>, You Answered ${rightAnswers} From ${count}`;
        } else if (rightAnswers === count) {
            theResult = `<span class="perfect">Perfect</span>, You Answered ${rightAnswers} From ${count}`;
        } else {
            theResult = `<span class="bad">Bad</span>, You Answered ${rightAnswers} From ${count}`;
        }

        result.innerHTML = theResult;
    }
}