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
  //  this.health = health;
    this.honeycombs1 = [];
    this.honeycombs2 = [];
    this.bullets = [];
    this.beekeepers = [];
    this.beekeeperPlayer1 = null;
    this.beekeeperPlayer2 = null;
  
    this.leftBeehive = null;
    this.rightBeehive = null;
    this.bullet = null;
    this.bullets1 = [];
    this.bullets2 = [];
    this.controller1 = this.gamepads.get(0);
    this.controller2 = this.gamepads.get(1);
    // this.enemys = [];
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
    this.initEnemyTimer(25000);
  //  this.initHealthbarAnimation();
  //  this.updateHealthbar();

 // this.spawnBeekeeper();
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
    this.player1 = new beehive.Player(9, 8, "bee", this.controller1, this.bullets1, this.honeycombs2, this.honeycombs1, this.healthbarplayer1);
    this.stage.addChild(this.player1);

    this.player1.healthBar.x = 75;
    this.player1.healthBar.y = 10;
    
    

    //Player 2 (brown bee)
    this.player2 = new beehive.Player(364, 190, "bee2", this.controller2, this.bullets2, this.honeycombs1, this.honeycombs2, this.healthbarplayer2);
    this.stage.addChild(this.player2);
    
    this.player2.healthBar.x = 300;
    this.player2.healthBar.y = 10;
};

beehive.scene.Game.prototype.initEnemyTimer = function (duration) {


    var self = this;
    this.timers.create({
        duration: duration,
        onTick: function () {
            self.beekeeperPlayer1 = self.spawnBeekeeper1(self.player1);
            self.beekeeperPlayer2 = self.spawnBeekeeper2(self.player2);
        },
        scope: this,
        repeat: Infinity
    });

    // Skapa beekeeper-objekt och spara referenserna
    this.beekeeperPlayer1 = this.spawnBeekeeper1(this.player1);
    this.beekeeperPlayer2 = this.spawnBeekeeper2(this.player2);
};





//     };
//  };





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


// Skapa en prototyp för Beekeeper1
beehive.scene.Game.prototype.spawnBeekeeper1 = function (player1) {

    var verticalSpeed = 0.04;

    var beekeeper1 = new rune.display.Sprite(0, 0, 40, 40, "birdtest");
    beekeeper1.hitbox.set(10, 7, 30, 25);
    beekeeper1.x = 80;
    beekeeper1.y = -beekeeper1.height;
    this.stage.addChild(beekeeper1);

    var collisionOccurred = false;

    beekeeper1.update = function (step) {
        this.y += verticalSpeed * step;

        if (this.y > this.stage.height) {
            this.y = -this.height;
            collisionOccurred = false;
        }

        if (!collisionOccurred && this.hitTestObject(player1)) {
            handleCollision(player1);
        }
    };

    function handleCollision(player) {
        player.health -= 5;
        console.log("Spelare 1 health:", player.health);
        player.flicker.start();
        collisionOccurred = true;
        player.updateHealthbarPlayer1();
    }

    // Returnera referensen till beekeeper-objektet
    return beekeeper1;
};

// Skapa en prototyp för Beekeeper2
beehive.scene.Game.prototype.spawnBeekeeper2 = function (player2) {

    var verticalSpeed = 0.04;

    var beekeeper2 = new rune.display.Sprite(0, 0, 40, 40, "birdtest");
    beekeeper2.hitbox.set(10, 7, 30, 25);
    beekeeper2.x = 270;
    beekeeper2.y = -beekeeper2.height;
    this.stage.addChild(beekeeper2);

    var collisionOccurred = false;

    beekeeper2.update = function (step) {
        this.y += verticalSpeed * step;

        if (this.y > this.stage.height) {
            this.y = -this.height;
            collisionOccurred = false;
        }

        if (!collisionOccurred && this.hitTestObject(player2)) {
            handleCollision(player2);
        }
    };

    function handleCollision(player) {
        player.health -= 5;
        console.log("Spelare 2 health:", player.health);
        player.flicker.start();
        collisionOccurred = true;
        player.updateHealthbarPlayer2();
    }

    // Returnera referensen till beekeeper-objektet
    return beekeeper2;
};





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



 // Hit-test för spelarens skott mot beekeeper
    // För spelare 1
    for (var i = 0; i < this.player1.bullets.length; i++) {
        var bullet = this.player1.bullets[i];
        if (bullet.hitTestObject(this.beekeeperPlayer1) || bullet.hitTestObject(this.beekeeperPlayer2)) {
            bullet.dispose();
        }
    }

    // För spelare 2
    for (var j = 0; j < this.player2.bullets.length; j++) {
        var bullet = this.player2.bullets[j];
        if (bullet.hitTestObject(this.beekeeperPlayer1) || bullet.hitTestObject(this.beekeeperPlayer2)) {
            bullet.dispose();
        }
    }


    for (var i = 0; i < this.player1.bullets.length; i++) {
        this.player1.bullets[i].hitTestObject(this.player2, function () {
            this.player1.bullets[i].dispose(this.player1.bullets[i]);
            this.player2.health--;
            console.log("Spelare 2 health:", this.player2.health);
           // this.updateHealthbar(this.player2, this.healthbarPlayer2);
            this.player2.flicker.start();
           // this.player2.updateHealthbars();
             this.player2.updateHealthBar();
        }, this);
    }

    for (var j = 0; j < this.player2.bullets.length; j++) {
        this.player2.bullets[j].hitTestObject(this.player1, function () {
            this.player2.bullets[j].dispose(this.player2.bullets[j]);
            this.player1.health--;
            console.log("Spealre 1 health:", this.player1.health);
          //  this.updateHealthbar(this.player1, this.healthbarPlayer1);
        //  this.updateHealthbar(this.player1, this.healthbarPlayer1);
            this.player1.flicker.start();
           // this.player1.updateHealthbars();

            this.player1.updateHealthBar();
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
            duration: 3000,
            onTick: this.addPlayer1,
            scope: this
        })
    }

    if (this.player2.health == 0) {
        this.stage.removeChild(this.player2);
        //this.player2.dispose();
        this.timers.create({
            duration: 3000,
            onTick: this.addPlayer2,
            scope: this
        })
    }


};




// beehive.scene.Game.prototype.spawnBeekeeper = function (player1, player2) {
//     var verticalSpeed = 0.04; 

//     this.beekeeperPlayer1 = new rune.display.Sprite(0, 0, 40, 40, "birdtest");
//     this.beekeeperPlayer1.hitbox.set(10, 7, 30, 25);
//   //  this.beekeeperPlayer1.hitbox.debug = true;

//     this.beekeeperPlayer1.x = 80;

//     this.beekeeperPlayer1.y = -this.beekeeperPlayer1.height; 

    
//     this.stage.addChild(this.beekeeperPlayer1);

//     this.beekeeperPlayer2 = new rune.display.Sprite(0, 0, 40, 40, "birdtest");
//     this.beekeeperPlayer2.hitbox.set(10, 7, 30, 25);
//    // this.beekeeperPlayer2.hitbox.debug = true;

//     this.beekeeperPlayer2.x = 270;

//     this.beekeeperPlayer2.y = -this.beekeeperPlayer2.height;

  
//     this.stage.addChild(this.beekeeperPlayer2);

//     var collisionOccurredPlayer1 = false;

   
//     var collisionOccurredPlayer2 = false;

   
//     this.beekeeperPlayer1.update = function (step) {
     
//         this.y += verticalSpeed * step;

        
//         if (this.y > this.stage.height) {
//             this.y = -this.height; 
//             collisionOccurredPlayer1 = false; 
//         }

       
//         if (!collisionOccurredPlayer1 && this.hitTestObject(player1)) {
//             player1.health -= 5; 
//             console.log("Spelare 1 health:", player1.health);
//             player1.flicker.start();
//             collisionOccurredPlayer1 = true; 
//         //    player1.updateHealthbarPlayer1();      
//       }
//     };

  
//     this.beekeeperPlayer2.update = function (step) {
       
//         this.y += verticalSpeed * step;

//         if (this.y > this.stage.height) {
//             this.y = -this.height; 
//             collisionOccurredPlayer2 = false; 
//         }

//         if (!collisionOccurredPlayer2 && this.hitTestObject(player2)) {

            
//             player2.health -= 5; 
//             console.log("Spelare 2 health:", player2.health);
//             player2.flicker.start();
//             collisionOccurredPlayer2 = true; 
//            // player2.updateHealthbarPlayer2();       
//          }
//     };

    
// };



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