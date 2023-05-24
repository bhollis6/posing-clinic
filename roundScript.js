/* Array of four possible quarter turns.
*  Quarter turns are called linearly 
*  from front relaxed to left relaxed.
*/
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

/* Array of five possible classic poses. Classic poses 
*  are called at random. (Even with duplicate calls). 
*  However, the fifth and last pose is always 
*  your favorite classic pose.
*/
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

let endTime, timer;
let index = -1;
let round = 1;
let randomNumber;

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
        // Randomized callout from judge (exclusive of Favorite Classic Pose).
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
                window.location.href = 'main.html';
            }
        }
    }
}

function rest(){
    content.innerHTML = `<h2>Rest</h2>;
    <div class="countdown"></div>`;
    header.style.backgroundImage = `url('img/rest.jpg')`;
    // Minute of rest given in between rounds.
    countDownTimer(45);
}


function nextRound(){
    rest();
    round++;
    index= -1;
}

// Modifies HTML & CSS while using recursion.
function mandatory(index, round, pose) {
    content.innerHTML = `<h1>ROUND<span>${round}</h1>
    <h2>${pose[index].name}</h2>
    <div class="countdown"></div>`;
    header.style.backgroundImage = `url('${pose[index].img}')`;
    startPosing();
}

function startPosing() {
    // Judges require holding for anywhere from 10-15 seconds.
    let randomNumber = Math.floor(Math.random() * 6) + 10;
    countDownTimer(randomNumber);
}

function countDownTimer(countdownSeconds){
    countdownMilliseconds = countdownSeconds * 1000;
    endTime = new Date().getTime() + countdownMilliseconds;
    clearInterval(timer);
    timer = setInterval(tick, 1);
}

// MAIN.
countDownTimer(10);