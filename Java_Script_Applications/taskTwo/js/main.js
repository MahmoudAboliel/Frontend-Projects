// Start Scroll
let scroll = document.querySelector(".scroller");

let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

let up = document.querySelector('.up');
// console.log(document.documentElement.scrollHeight);
// console.log(document.documentElement.clientHeight);
// console.log(height);

window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop;
    // console.log(scrollY);
    scroll.style.width = `${(scrollTop / height) * 100}%`;

    window.scrollY >= 1000 ? up.classList.add('active') : up.classList.remove('active') ;
});

up.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
// End Scroll

// Start Api
fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7d19151f150d4d11ae7b0b0db24e693b")
    .then((result) => {
        // console.log(result);
        let myData = result.json();
        // console.log(myData);
        return myData;
    }).then((currency) => {
        // console.log(currency.rates["SYP"]);
        // console.log(currency.rates["EGP"]);

        let amount = document.querySelector(".amount");
        let syPrice = document.querySelector(".sy span");
        let egpPrice = document.querySelector(".egp span");

        syPrice.innerHTML = Math.round(amount.innerHTML * currency.rates["SYP"]);
        egpPrice.innerHTML = Math.round(amount.innerHTML * currency.rates["EGP"]);
    })
// End Api

// Start Header
let headLogo = document.querySelector(".header .logo");
let headMenu = document.querySelector(".header .menu");
let state = 0;

headLogo.onclick = function () {
    if (!state) {
        headMenu.classList.add('open');
        state = 1;
    } else {
        headMenu.classList.remove('open');
        state = 0;
    }
}

let toggle = document.querySelector(".header .toggle");
let nav = document.querySelector(".header nav");
let close = document.querySelector("nav .close");

toggle.onclick = function () {
    nav.classList.add('open');
}
close.onclick = function () {
    nav.classList.remove('open');
}

document.onkeyup = function (e) {

    if (e.key === 'Escape') {
        nav.classList.remove('open');
        headMenu.classList.remove('open');
    }
}
// End Header

// Start Form
let input = document.querySelector('form input');
let progress = document.querySelector('form .progress');
let count = document.querySelector('form .count');
let maxLength = input.getAttribute('maxlength');
count.innerHTML = maxLength;

input.oninput = function () {
    count.innerHTML = maxLength - this.value.length;
    count.innerHTML == 0 ? count.classList.add("zero") : count.classList.remove("zero");

    progress.style.width = `${this.value.length * 100 / maxLength}%`
}
// End Form
// Start Change Background Color
let header = document.querySelector(".header");
let wavy = document.querySelector(".wavy span");
let dotted = document.querySelector(".dotted-loader");
let loading = document.querySelector(".loading");
let typeWriter = document.querySelector(".type-writer");
let card = document.querySelector(".card .img");

let counter = setInterval(() => {
    
    header.style.color = changeColor();

    setColor(changeColor());
    
    loading.style.color = changeColor();
    typeWriter.style.color = changeColor();
    // dotted.style.backgroundColor = changeColor();
    // dotted.style.color = changeColor();
    
}, 10000);
// End Change Background Color

function  setColor(color) {
    wavy.style.backgroundColor = color;
    typeWriter.style.backgroundColor = color;
    card.style.backgroundColor = color;
}



function changeColor() {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let arrayColor = [];

    for (let i = 0; i < 6; i++) {
        arrayColor.push(array[Math.floor(Math.random() * array.length)])
        // console.log(array[Math.floor(Math.random() * array.length)]);
    }
    return `#${arrayColor.join("")}`;
    // console.log(`#${arrayColor.join("")}`);
}


// Start Switch
let allLi = document.querySelectorAll('.switch ul li');
let divCat = document.querySelectorAll('.category div');
// console.log(divCat);

allLi.forEach(li => {
    li.addEventListener('click', removeActive);
    li.addEventListener('click', manageDiv);
});
// End Switch

function removeActive() {
    allLi.forEach(li => {
        li.classList.remove('active');
        this.classList.add('active');
    });
}

function manageDiv() {
    divCat.forEach(div => {
        div.style.display = 'none';

        // if (div.classList.content == this.dataset.cat) {
        //     console.log('good');
        // }

        // document.querySelectorAll(`.${this.dataset.cat}`).forEach(el => {
            //     el.style.display = 'block';
            // });
            
        });
        
    document.querySelectorAll(this.dataset.cat).forEach(el => {
        el.style.display = 'block';
    });
    
}

allLi.forEach(d => {
    
    
});

// Start Generate Serial Number
let serialField = document.querySelector('.g-s-n .serial');
let generateBtn = document.querySelector('.g-s-n .generate');

let serialCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&';
let arraySerialCharacters = Array.from(serialCharacters);
let serialLength = 15;
generateBtn.onclick = () => {
    serialField.innerHTML = '';
    for (let i = 0; i < serialLength; i++) {
        let randomNumber = Math.floor(Math.random() * arraySerialCharacters.length);
        serialField.appendChild(document.createTextNode(arraySerialCharacters[randomNumber]));
    }
};
// End Generate Serial Number
// Start Tabs
let tabsLi = document.querySelectorAll('.tabs ul li');
let tabsContent = document.querySelectorAll('.tabs .content div');

tabsLi.forEach((li, indexLi) => {

    li.addEventListener('click', e => {

        // remove class activate from li
        tabsLi.forEach(li => {
            li.classList.remove('activate');
        });

        // add class activate to li
        li.classList.add('activate');

        tabsContent.forEach((content, indexContent) => {

            // remove class activate from content
            content.classList.remove('activate');

            // add class activate to content
            if (indexContent === indexLi) {
                content.classList.add('activate');
            }
        });
    });
});
// End Tabs
