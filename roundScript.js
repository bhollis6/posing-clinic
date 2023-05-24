const quarterTurns = [
    {
        name: "Front Relaxed",
        img: "img/front_relaxed.jpg",
    },
    {
        name: "Right Relaxed",
        img: "img/right_relaxed.jpg",
    },
    {
        name: "Rear Relaxed",
        img: "img/rear_relaxed.jpg",
    },
    {
        name: "Left Relaxed",
        img: "img/left_relaxed.jpg",
    },
];

const classicPoses = [
    {
        name: "Front Double Biceps",
        img: "img/front_double.jpg",
    },
    {
        name: "Side Chest",
        img: "img/side_chest.jpg",
    },
    {
        name: "Back Double Biceps",
        img: "img/back_double.jpg",
    },
    {
        name: "Abdominal and Thighs",
        img: "img/abs.jpg",
    },
    {
        name: "Favorite Classic Pose",
        img: "img/favorite.jpg",
    },
];

const content = document.querySelector('.content');
const header = document.querySelector('header');
const roundNumber = document.getElementById('roundNumber');
const qTLength = quarterTurns.length;
const cPLength = classicPoses.length;
const preloadedImages = [];

let endTime, timer;
let index = -1;
let round = 1;
let randomNumber;

function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

function tick() {
    let now = new Date().getTime();
    let t = endTime - now;

    if (t > 0) {
        let milliseconds = Math.floor((t % 1000) / 10);
        if (milliseconds < 10) {
            milliseconds = "0" + milliseconds;
        }

        let seconds = Math.floor(t / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        let time = seconds + " : " + milliseconds;
        document.querySelector(".countdown").innerText = time;
    
    } else {
        clearInterval(timer);
        index++;
        randomNumber = Math.floor(Math.random() * 4) ;

        // Round 1.
        if (round == 1){
            if (index < qTLength) {
                mandatory(index, 'ONE', quarterTurns);
            } else if (index == qTLength){
                nextRound();
            }
        // Round 2.
        } else if (round == 2){
            if (index < cPLength - 1) {
                mandatory(randomNumber, 'TWO', classicPoses);
            } else if (index == cPLength -1) {
                mandatory(index, 'TWO', classicPoses);
            } else if (index == cPLength){
                nextRound()
            }
        // Round 3.
        } else if (round == 3){
            if (index < cPLength - 1) {
                mandatory(randomNumber, 'THREE', classicPoses);
            } else if (index == cPLength - 1) {
                mandatory(index, 'THREE', classicPoses);
            } else if (index == cPLength){
                window.location.href = 'index.html';
            }
        }
    }
}

function rest(){
    // Preloader.
    preloadImage('img/rest.jpg').then(image => {
        header.style.backgroundImage = `url('${image.src}')`;
    
    content.innerHTML = `<h2>Rest</h2>;
    <div class="countdown"></div>`;
    });
    countDownTimer(45);
}

function nextRound(){
    rest();
    round++;
    index= -1;
}

async function mandatory(index, round, pose) {
    // Preloader.
    const image = await preloadImage(pose[index].img);
    preloadedImages.push(image);
    header.style.backgroundImage = `url('${image.src}')`;

    content.innerHTML = `<h1>ROUND<span>${round}</h1>
    <h2>${pose[index].name}</h2>
    <div class="countdown"></div>`;
    header.style.backgroundImage = `url('${pose[index].img}')`;
    startPosing();
}

function startPosing() {
    let randomNumber = Math.floor(Math.random() * 6) + 10;
    countDownTimer(randomNumber);
}

function countDownTimer(countdownSeconds){
    countdownMilliseconds = countdownSeconds * 1000;
    endTime = new Date().getTime() + countdownMilliseconds;
    clearInterval(timer);
    timer = setInterval(tick, 1);
}

// Get ready.
countDownTimer(10);