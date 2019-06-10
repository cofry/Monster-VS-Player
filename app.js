new Vue({

    el: "#app" ,
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning: false,
        turns:[]
    },
    methods:{
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        attack: function(){

            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift(
                {   isPlayer:true,
                    text: 'Player hits Monster for ' + damage
                }
            );
            this.monsterAttack();
        },
        monsterAttack: function(){

            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift(
                {   isPlayer:false,
                    text: 'Monster hits Player for ' + damage
                }
            );

        },
        attackSpecial: function(){
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift(
                {   isPlayer:true,
                    text: 'Player using Special Attack for ' + damage
                }
            );
            this.monsterAttack();
        },
        heal: function(){
            if (this.playerHealth <= 96){
                this.playerHealth += 10;
                this.turns.unshift(
                {   isPlayer:true,
                    text: 'Player HEAL for ' + 10
                }
                
            );
            }
            this.monsterAttack();
        },
        ganador: function(){
            if (this.monsterHealth <=0){
                return this.endgame('PUTo');
            }else if(this.playerHealth <=0){
                return this.endgame('PENDEJO');
            }
            return true;
        },
        endgame:function (resultado){
            if (confirm('Tu' + resultado + 'Jugar de nuez?')){
                this.startGame();
            }else{
                this.gameIsRunning = false;
            }
            return true;
        }
        
    }
});