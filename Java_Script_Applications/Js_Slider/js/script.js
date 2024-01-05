let imageNumber = document.querySelector(".slider-number");
let containerImage = document.querySelector(".container-slider");
let prevButton = document.querySelector(".controls-slider .previous");
let bullets = document.querySelector(".bullets");
let nextButton = document.querySelector(".controls-slider .next");



let currentIndex = 1;



function getData() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = () => {
        if (myRequest.readyState === 4 && myRequest.status === 200) {

            let responseObject = JSON.parse(myRequest.response);
            let responseCount = responseObject.length;
            

            
            
            let bulletUl = document.createElement("ul");
            bullets.appendChild(bulletUl);
            
            for (let i = 0; i < responseCount; i++) {
                
                let img = document.createElement("img");
                img.src = responseObject[i].content;

                containerImage.appendChild(img);

                let bulletLi = document.createElement("li");
                bulletLi.setAttribute('data-index', (i + 1));
                let bulletLiText = document.createTextNode(i + 1);

                bulletLi.appendChild(bulletLiText);
                bulletUl.appendChild(bulletLi);
            }

            let arrayImages = Array.from(document.querySelectorAll(".container-slider img"));
            let arrayBullets = Array.from(document.querySelectorAll(".bullets ul li"));

            arrayBullets.forEach((bullet, bulletIndex) => {
                bullet.addEventListener("click", () => {
                    currentIndex = bulletIndex + 1;

                    console.log(currentIndex);
                    checkerData(responseCount, arrayImages, arrayBullets);

                });
            });

            checkerData(responseCount, arrayImages, arrayBullets);
            
            prevButton.onclick = function () {
                
                if (prevButton.classList.contains('disabled')) {
                    return false;
                } else {
                    currentIndex--;
                    checkerData(responseCount, arrayImages, arrayBullets);
                }
    
            }
            nextButton.onclick = function () {
                if (nextButton.classList.contains('disabled')) {
                    return false;
                } else {
                    currentIndex++;
                    
                    checkerData(responseCount, arrayImages, arrayBullets);
                }
    
            }
            
        }
    }

    myRequest.open("GET", "database.json", true);
    myRequest.send();
}

getData();

function checkerData(count, arrayImg, arrayBul) {
    
    imageNumber.innerHTML = `Slider #${currentIndex} From ${count}`;

    removeActive(arrayImg, arrayBul);

    arrayImg.forEach((img, imgIndex) => {
        if ((currentIndex - 1) === imgIndex) {
            img.classList.add('active');
        }
    });

    arrayBul.forEach((bul, bulIndex) => {
        if ((currentIndex - 1) === bulIndex) {
            bul.classList.add('active');
        }
    });

    if (currentIndex === 1) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }
    if (currentIndex === count) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }

}

function removeActive(arrayImg, arrayBul) {

    arrayImg.forEach(img => {
        img.classList.remove('active');
    });
    // console.log(arrayImages);
    
    arrayBul.forEach(bullet => {
        bullet.classList.remove('active');
    });
}


