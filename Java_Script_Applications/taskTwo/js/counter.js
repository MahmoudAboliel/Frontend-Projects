// Start Counter
let nums = document.querySelectorAll(".nums .num");
let section = document.querySelector(".three");
let started = false;

window.onscroll = function () {
    if (window.scrollY >= section.offsetTop) {

        if (!started) {
            nums.forEach(num => startCount(num));
        }
        started = true;
    }
}


function startCount(element) {
    let myGoal = element.dataset.goal;
    // console.log(myGoal);

    let count = setInterval(() => {
        element.textContent++;

        if (element.textContent === myGoal) {
            clearInterval(count);
        }
    }, 1000 / myGoal);
}

// End Counter