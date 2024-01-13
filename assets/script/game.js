let game = {

    lockMode: false,
    firstCard:null,
    secondCard: null,
    counter: 0,
    setCard: function(id){

        let card = this.cards.filter(card => card.id === id)[0];
        if(card.flipped || this.lockMode){
            return false
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true
            return true
        }

    },
    unflipCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards()
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
           return false;
         }
        return this.firstCard.icon === this.secondCard.icon;
    },
    scoreCounter: function(){
        return this.counter++
    },
    saveScore: function(){

        let ranking = []
        if(localStorage !== 'undefined'){
            const storage = localStorage.getItem("ranking");
            if(storage){
                ranking = JSON.parse(storage)
            }
        }
        
        ranking.push(this.counter)
        ranking.sort((a,b) => a-b)
        localStorage.setItem("ranking", JSON.stringify(ranking))
        return ranking
    },
    clearCards: function(){
        this.lockMode = false;
        this.firstCard = null;
        this.secondCard = null;
    },

    checkGameOver: function(){
      return this.cards.filter(card => !card.flipped).length == 0;
    },

    techs:['bootstrap',
        'css',
        'electron',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react',
        'firebase'],

        cards: null,

        createCardsFromTechs: function(){

            this.cards = []
        
            this.techs.forEach(tech => {
                this.cards.push(this.createPairFromTech(tech))
            })
            this.cards = this.cards.flatMap(card => card)
            this.shuffleCards();
            return this.cards
        
        },
        createPairFromTech: function(tech){
            return[{
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped:false
            }
            ,{
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped:false
                }]
        },
        createIdWithTech: function (tech) {
            return tech + parseInt(Math.random() * 1000)
        },
        shuffleCards: function (){
            let currentIndex = this.cards.length;
            let randomIndex = 0;
        
            while (currentIndex !== 0){
        
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        
            }
        }



}