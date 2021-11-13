'use strict'
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.toggle('flip');

    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
    }else {
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    }else {
        unflipCards();
    }
}

function disableCards(){
    firstCard.removeEventListener ('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};

function unflipCards(){
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        },1500);
};

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*10);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));