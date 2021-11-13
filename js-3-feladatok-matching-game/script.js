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

        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            firstCard.removeEventListener ('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        }else {
            setTimeout(() =>{
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            },1500);
        }
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));