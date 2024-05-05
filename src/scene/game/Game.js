//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
beehive.scene.Game = function () {
    this.background = null;
    this.player1 = null;
    this.player2 = null;
    this.honeycomb = null;
    
    this.honeycombs1 = [];
    this.honeycombs2 = [];
    this.bullets = [];
  
    this.leftBeehive = null;
    this.rightBeehive = null;
    this.bullet = null;
    this.bullets1 = [];
    this.bullets2 = [];
    this.controller1 = this.gamepads.get(0);
    this.controller2 = this.gamepads.get(1);
  //  this.enemys = [];
   // this.enemyGravity = 4.99;
    
    // this.Honeycomb = Honeycomb;

    //  console.log("Honeycomb reference in Game:", this.Honeycomb);
    // this.honeycombHP = null;
    // this.honeycombs1HP = [];
    // this.honeycombs2HP = [];

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

beehive.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
beehive.scene.Game.prototype.constructor = beehive.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
beehive.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.initBackground();
    this.initHoneycombs();
    this.initPlayers();
 //  this.spawnBeekeeper();
  //  this.initProgressbars();
   // this.updateHealthBar();
   

};

beehive.scene.Game.prototype.initBackground = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        400,
        225,
        "background"
    );
    this.stage.addChild(this.background);

    this.leftBeehive = new rune.display.Graphic(
        9, 8, 24, 24, "beehive"
    );
    this.stage.addChild(this.leftBeehive);

    this.rightBeehive = new rune.display.Graphic(
        364, 190, 24, 24, "beehive"
    );
    this.stage.addChild(this.rightBeehive);
};

beehive.scene.Game.prototype.initPlayers = function () {
    //Player 1 (black bee)
    this.player1 = new beehive.Player(9, 8, "bee", this.controller1, this.bullets1, this.honeycombs2, this.honeycombs1);
    this.stage.addChild(this.player1);
    
    

    //Player 2 (brown bee)
    this.player2 = new beehive.Player(364, 190, "bee2", this.controller2, this.bullets2, this.honeycombs1, this.honeycombs2);
    this.stage.addChild(this.player2);
    

};






beehive.scene.Game.prototype.initHoneycombs = function () {
    // this.hitbox.set(0, 0, this.width, this.height);

    var y1 = 40;
    var y2 = 10;

    for (var i = 0; i < 6; i++) {
        this.honeycomb = new beehive.Honeycomb(10, y1, "honeycomb_full");
        this.honeycomb.animation.gotoAndPlay("100");
        this.honeycombs1.push(this.honeycomb);
        y1 += 30;
        this.stage.addChild(this.honeycomb);
    }

    for (var j = 0; j < 6; j++) {
        this.honeycomb = new beehive.Honeycomb(365, y2, "honeycomb_full");
        this.honeycomb.flippedX = true;
        this.honeycomb.animation.gotoAndPlay("100");
        this.honeycombs2.push(this.honeycomb);
        y2 += 30;
        this.stage.addChild(this.honeycomb);
    }

};




beehive.scene.Game.prototype.initProgressbars = function() {
//     this.health = 50;

//     this.player1.healthBar = new rune.ui.Progressbar(25, 5, "#000000", "#ff0000");
// this.player1.healthBar.x = 80; 
// this.player1.healthBar.y = 10;
// this.stage.addChild(this.player1.healthBar);


// this.player2.healthBar = new rune.ui.Progressbar(25, 5, "#000000", "ff0000");
// this.player2.healthBar.x = 300;
// this.player2.healthBar.y = 10;
// this.stage.addChild(this.player2.healthBar);
//    // Hämta hälsan för player1 och player2
//    var player1Health = this.player1.health;
//    var player2Health = this.player2.health;

//    // Logga hälsan för player1 och player2
//    console.log("Health value for player 1:", player1Health);
//    console.log("Health value for player 2:", player2Health);
    // // Skapa health bar för player 1 med röd fyllnadsfärg
    // this.player1.healthBar = this.createHealthBar("#ff0000");
    // this.player1.healthBar.x = 80;
    // this.stage.addChild(this.player1.healthBar);

    // // Skapa health bar för player 2 med röd fyllnadsfärg
    // this.player2.healthBar = this.createHealthBar("#ff0000");
    // this.player2.healthBar.x = 300;
    // this.stage.addChild(this.player2.healthBar);
};




// beehive.scene.Game.prototype.initProgressbars = function() {




// this.player1.healthBar = new rune.ui.Progressbar(25, 5, "#000000", "#ff0000");
// this.player1.healthBar.x = 80; 
// this.player1.healthBar.y = 10;
// this.stage.addChild(this.player1.healthBar);


// this.player2.healthBar = new rune.ui.Progressbar(25, 5, "#000000", "ff0000");
// this.player2.healthBar.x = 300;
// this.player2.healthBar.y = 10;
// this.stage.addChild(this.player2.healthBar);



// };

// beehive.scene.Game.prototype.spawnBeekeeper = function () {
//     this.beekeeper = new rune.display.Sprite(0,0, 10, 10, "block");
//     this.beekeeper. y = this.actualY;//Math.random () * 225;

//     this.stage.addChild(this.beekeeper);
//     this.enemys.push(this.beekeeper);
// }


/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
beehive.scene.Game.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    
    for (var i = 0; i < this.player1.bullets.length; i++) {
        this.player1.bullets[i].hitTestObject(this.player2, function () {
            this.player1.bullets[i].dispose(this.player1.bullets[i]);
            this.player2.health--;
            
            this.player2.flicker.start();
        }, this);
    }

    for (var j = 0; j < this.player2.bullets.length; j++) {
        this.player2.bullets[j].hitTestObject(this.player1, function () {
            this.player2.bullets[j].dispose(this.player2.bullets[j]);
            this.player1.health--;
            
            this.player1.flicker.start();
        }, this);
    }
   
  



    for (var i = 0; i < this.honeycombs1.length; i++) {
        //console.log(this.honeycombs1[i].health);
        // if (this.honeycombs1[i].health == 6) {
        //     console.log("3");
        // }
        // if (this.honeycombs1[i].health == 4) {
        //     console.log("2");
        // }
        // if (this.honeycombs1[i].health == 2) {
        //     console.log("1");
        // }
        if (this.honeycombs1[i].health == 0) {
            this.stage.removeChild(this.honeycombs1[i]);
        }

    }

    for (var i = 0; i < this.honeycombs2.length; i++) {
        //console.log(this.honeycombs2[i].health);
        // if (this.honeycombs2[i].health == 6) {
        //     console.log("3");
        // }
        // if (this.honeycombs2[i].health == 4) {
        //     console.log("2");
        // }
        // if (this.honeycombs2[i].health == 2) {
        //     console.log("1");
        // }
        if (this.honeycombs2[i].health == 0) {
            this.stage.removeChild(this.honeycombs2[i]);
        }

        // if (this.controller.justPressed(1)) {
        //     this.timers.create({
        //         duration: 5000,
        //         onTick: addHoneycomb,
        //         scope: this
        //     }, this);
        // } 


    //    for (var i = 0; i < this.enemys.lenght; i++) {
    //     this.enemys[i].x -2.5;
    //     this.enemys[i].y += this.enemyGravity;
        
    //    }

    }


    //Limitations
    if (this.player1.bottom > 225) {
        this.player1.bottom = 225;
    } else if (this.player1.y < 0) {
        this.player1.y = 0;
    } else if (this.player1.x > 175) {
        this.player1.x = 175;
    } else if (this.player1.x < 0) {
        this.player1.x = 0;
    };

    //Limitations
    if (this.player2.bottom > 225) {
        this.player2.bottom = 225;
    } else if (this.player2.y < 0) {
        this.player2.y = 0;
    } else if (this.player2.x < 225) {
        this.player2.x = 225;
    } else if (this.player2.right > 399) {
        this.player2.right = 399;
    };

    //Lägg in flicker innan removeChild

    if (this.player1.health == 0) {
        //this.player1.flicker.start();
        this.stage.removeChild(this.player1);
        //this.player1.dispose();
        this.timers.create({
            duration: 1000,
            onTick: this.addPlayer1,
            scope: this
        })
    }

    if (this.player2.health == 0) {
        this.stage.removeChild(this.player2);
        //this.player2.dispose();
        this.timers.create({
            duration: 1000,
            onTick: this.addPlayer2,
            scope: this
        })
    }


};











beehive.scene.Game.prototype.addPlayer1 = function () {
    this.player1.x = 9;
    this.player1.y = 8;
    this.player1.health = 50;
    this.stage.addChild(this.player1);
    this.player1.flicker.start();
};

beehive.scene.Game.prototype.addPlayer2 = function () {
    this.player2.x = 364;
    this.player2.y = 190;
    this.player2.health = 50;
    this.stage.addChild(this.player2);
    this.player2.flicker.start();
};

















// 

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
beehive.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};