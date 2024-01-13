const FRONT = "card-front"
const BACK = "card-back"
const CARD = "card"
const ICON = "icon"

startGame()

function startGame() {
    document.getElementById('number').innerHTML = 0
    initializeCards(game.createCardsFromTechs())
}
function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement)

}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face == FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add("icon");
        iconElement.src = "./assets/images/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = '&lt/&gt'
    }
    element.appendChild(cardElementFace)
}

function initializeCards() {

    let gameBoard = document.getElementById('gameBoard')
    gameBoard.innerHTML = '' 
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function flipCard() {

  
    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            game.scoreCounter()
            document.getElementById('number').innerHTML = game.counter
            if (game.checkMatch()){
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameBoardView = document.getElementById('gameOver');
                    gameBoardView.style.display = 'flex'
                    listRank();
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards()
                }, 500)
            }
        }
    }
}
function listRank(){
    let ranking = game.saveScore();
    let rank = document.getElementById("ranking")
    rank.innerHTML = ''
    ranking.forEach(position => {
        let rankLi = document.createElement('li')
        rankLi.innerHTML = position

        rank.appendChild(rankLi)
    })
}
function restart(){
    game.clearCards();
    startGame();
    let gameBoardView = document.getElementById('gameOver');
    gameBoardView.style.display = 'none'
    game.counter = 0
}


