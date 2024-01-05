let controlStart = document.querySelector(".control-start");
let startButton = document.querySelector(".control-start button");
let homePage = document.querySelector(".home-page");
let Name = document.querySelector(".name span");
let tries = document.querySelector(".tries span");
let containerBlocks = document.querySelector(".container-blocks");
let arrayBlocks = Array.from(containerBlocks.children);



let duration = 1000;
let wrongTries = 0;


// let orderArray = [...Array(arrayBlocks.length).keys()];
let orderArray = Array.from(arrayBlocks.keys());
shuffle(orderArray);
console.log(orderArray);


arrayBlocks.forEach((block, index) => {

    block.style.order = orderArray[index];

    block.addEventListener('click', () => {

        flipClick(block);
        
    });
});




startButton.onclick = () => {

    let myName;

    let input = prompt('Enter Your Name');

    if (input == null || input == '') {
        myName = 'Unknown';
    } else {
        myName = input;
    }

    Name.innerHTML = myName;

    controlStart.classList.add('end');

}

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    
    while (current > 0) {

        current--;
        random = Math.floor(Math.random() * current);

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array

}

function flipClick(block) {

    block.classList.add('is-flipped');

    let allFlippedBlock = arrayBlocks.filter(flip => flip.classList.contains('is-flipped'));
    // console.log(allFlippedBlock.length);

    if (allFlippedBlock.length === 2) {

        closeClicking();

        checkBlocks(allFlippedBlock[0], allFlippedBlock[1]);
    }
}

function closeClicking() {

    containerBlocks.classList.add('closing');

    setTimeout(() => {

        containerBlocks.classList.remove('closing');

    }, duration);
    
}

function checkBlocks(firstBlock, secondBlock) {

    if (firstBlock.dataset.work === secondBlock.dataset.work) {
        
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

    let allMatch = arrayBlocks.filter(match => match.classList.contains('has-match'));
    
    if (allMatch.length === arrayBlocks.length) {
        endGame(1);
    }

    } else {

        wrongTries++;
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');  
            
        }, duration);

    }

    if (wrongTries === 16) {

        endGame(0);
    }

}
console.log(arrayBlocks.length);

function endGame(state) {

    homePage.classList.add('end');

    let mainDiv = document.createElement('div');
    mainDiv.className = 'popup';

    let div = document.createElement('div');
    let btn = document.createElement('button');
    let inDiv = document.createElement('div');

    if (state === 1) {
        let divText = document.createTextNode(`You are Awesome, You Have: ${wrongTries} Wrong Tries`);
        let btnText = document.createTextNode('Play Again');
        div.appendChild(divText);
        btn.appendChild(btnText);
    } else if (state === 0) {
        let divText = document.createTextNode(`Game Over, You Have: ${wrongTries} Tries`);
        let btnText = document.createTextNode('Try Again');
        div.appendChild(divText);
        btn.appendChild(btnText);
    }


    btn.onclick = () => {
        document.location.reload();
    }
    
    inDiv.appendChild(div);
    inDiv.appendChild(btn);
    
    mainDiv.appendChild(inDiv);

    document.body.append(mainDiv);
}