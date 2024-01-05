let started = false;
// Start Skills
let sectionSkills = document.querySelector(".our-skills");
let skillsSpan = document.querySelectorAll(".our-skills .skill .the-progress span");
let progressPresent = document.querySelectorAll(".skill h3 span span");


// End Skills
// Start Stats
let sectionStats = document.querySelector(".stats");
let statsNumbers = document.querySelectorAll(".stats .box .number");
let state = 1;

window.onscroll = function () {
    if (window.scrollY >= sectionSkills.offsetTop) {
        
        if (!started) {
            skillsSpan.forEach(skill => {
            skill.style.width = skill.dataset.width;
            });
            
            progressPresent.forEach(present => startCount(present));
        }
        started = true;

    }
    if (window.scrollY >= sectionStats.offsetTop - 300) {
        if (state === 1) {
            started = false;
            state = 0;
        }
        if (!started) {
            statsNumbers.forEach(number => startCount(number));
        }
        started = true;
    }
}


function startCount(element) {
    let goal = element.dataset.goal;

    let count = setInterval(() => {
        element.textContent++;

        if (element.textContent === goal) {
            clearInterval(count);
        }
    }, 2000 / goal);
}
// End Stats
// Start Events
let days = document.querySelector(".unit .days");
let hours = document.querySelector(".unit .hours");
let minutes = document.querySelector(".unit .minutes");
let seconds = document.querySelector(".unit .seconds");

let countDownDate = new Date("Aug 19, 2024 00:00:00").getTime();



let counter = setInterval(() => {
    let dateNow = new Date().getTime();
    
    let dateDiff = countDownDate - dateNow;
    // console.log(dateNow);
    
    let theDays = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    days.innerHTML = theDays < 10 ? `00${theDays}` : theDays < 100 ? `0${theDays}` : theDays;
    let theHours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    hours.innerHTML = theHours < 10 ? `0${theHours}` : theHours;
    let theMinutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    minutes.innerHTML = theMinutes < 10 ? `0${theMinutes}` : theMinutes;
    let theSeconds = Math.floor((dateDiff % (1000 * 60)) / (1000));
    seconds.innerHTML = theSeconds < 10 ? `0${theSeconds}` : theSeconds;
    // console.log(theSeconds);

    if (dateDiff <= 0) {
        clearInterval(counter);
    }
}, 1000);
// End Events