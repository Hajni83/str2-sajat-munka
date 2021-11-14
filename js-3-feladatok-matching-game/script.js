'use strict'
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard;
let firstCardFlip = false;
let sec = 0;
let min = 0;
let numOfFoundPairs = 0;
let intervalId;
let clickNumber = 0;

function flipCard() {
    if (!firstCardFlip) {
        intervalId = setInterval(()=>{
            sec = parseInt(sec);
            min = parseInt(min);
            sec +=1;
            if (sec === 60) {
                min += 1;
                sec = 0;
            }

            if (sec < 10) { sec = '0' + sec; }
            if (min < 10) { min = '0' + min; }
            document.getElementById("time").innerHTML = min + ":" + sec;
        }, 1000);
        firstCardFlip = true;
    }
    if (clickNumber < 2) {

        if (!hasFlippedCard){
            this.classList.toggle('flip');
            hasFlippedCard = true;
            firstCard = this;
            clickNumber++;
        }else {
            if (firstCard != this) {
                this.classList.toggle('flip');
                hasFlippedCard = false;
                secondCard = this;
                clickNumber++;
                checkForMatch();
            }
        }
    }
}

function checkForMatch() {
    if ((firstCard != secondCard) && (firstCard.dataset.framework === secondCard.dataset.framework)) {
        disableCards();
        numOfFoundPairs++;
        checkEndGame();
    }else {
        unflipCards();
    }
}

const checkEndGame = () => {
    if (numOfFoundPairs === 5) {
        clearInterval(intervalId);
        setTimeout(()=>{
            document.getElementById("time").innerHTML = "00:00";
        }, 5000);
        unflipAllCards();
        shuffle();
        numOfFoundPairs = 0;
        firstCardFlip = false;
    }
}

function disableCards(){
    firstCard.removeEventListener ('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    clickNumber = 0;
};

function unflipCards(){
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        clickNumber = 0;
        },1000);
};

function unflipAllCards() {
    setTimeout(() =>{
        cards.forEach(card => card.classList.remove('flip'));
    },3000);
}

function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*10);
        card.style.order = randomPos;
        card.addEventListener('click', flipCard)
    });
};

shuffle();