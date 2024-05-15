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
    this.birds = [];
    this.beekeepers = [];
    this.birdPlayer1 = null;
    this.birdPlayer2 = null;
   // this.healthbarplayer1 = null;
    //this.healthbarplayer2 = null;
    this.leftBeehive = null;
    this.rightBeehive = null;
    this.bullet = null;
    this.bullets1 = [];
    this.bullets2 = [];
    this.powerups = [];
    this.controller1 = this.gamepads.get(0);
    this.controller2 = this.gamepads.get(1);
    this.shields = []; 
   // this.doubleDamage = false; 

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
    this.initEnemyTimer(15000);
    this.initEnemyRandom(20000, 50000);
    var self = this;
    var initialDelay = Math.random() * (30000 - 10000) + 10000;
    setTimeout(function() {
        self.spawnBeekeeper();
    }, initialDelay);

  
    this.initPowerups();
    // this.spawnBeekeeper();
  //  this.initHealthbarAnimation();
  //  this.updateHealthbar();

 // this.spawnBeekeeper();
  //  this.initProgressbars();
   // this.updateHealthBar();
//    this.initHealthbar1();
//    this.initHealthbar2();
//    this.initHealthbarAnimation1();
//    this.initHealthbarAnimation2();
 //  this.updateHealthbarPlayer1();
  // this.updateHealthbarPlayer2();

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

    this.player1.healthBar.x = 75;
    this.player1.healthBar.y = 10;

    

    //Player 2 (brown bee)
    this.player2 = new beehive.Player(364, 190, "bee2", this.controller2, this.bullets2, this.honeycombs1, this.honeycombs2);
    
    this.stage.addChild(this.player2);
    
    this.player2.healthBar.x = 300;
    this.player2.healthBar.y = 10;


};

beehive.scene.Game.prototype.initEnemyTimer = function (duration) {


    var self = this;
    this.timers.create({
        duration: duration,
        onTick: function () {
            self.birdPlayer1 = self.spawnBird1(self.player1);
            self.birdPlayer2 = self.spawnBird2(self.player2);
        },
        scope: this,
        repeat: Infinity
    });

    this.birdPlayer1 = this.spawnBird1(this.player1);
    this.birdPlayer2 = this.spawnBird2(this.player2);
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



beehive.scene.Game.prototype.spawnBird1 = function (player1) {

    var verticalSpeed = 0.04;

    var bird1 = new rune.display.Sprite(0, 0, 40, 40, "birdtest");
    bird1.hitbox.set(10, 7, 30, 25);
    bird1.x = 160;
    bird1.y = -bird1.height;
    this.stage.addChild(bird1);

    var collisionOccurred = false;

    bird1.update = function (step) {
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
        player.updateHealthBar();
     //   player.updateHealthbarPlayer1();
    }


    return bird1;
};


beehive.scene.Game.prototype.spawnBird2 = function (player2) {

    var verticalSpeed = 0.04;

    var bird2 = new rune.display.Sprite(0, 0, 40, 40, "birdtest");
    bird2.hitbox.set(10, 7, 30, 25);
    bird2.x = 215;
    bird2.y = -bird2.height;
    this.stage.addChild(bird2);

    var collisionOccurred = false;

    bird2.update = function (step) {
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
        player.updateHealthBar();
      //  player.updateHealthbarPlayer2();
    }

    
    return bird2;
};

beehive.scene.Game.prototype.initEnemyRandom = function (minDuration, maxDuration) {
    var startXOptions = [10, 345];
    this.lastBeekeeperX = startXOptions[Math.floor(Math.random() * startXOptions.length)];


    var self = this;

    function getRandomDuration() {
        return Math.random() * (maxDuration - minDuration) + minDuration;
    }

    function spawnRandomBeekeeper() {
        self.spawnBeekeeper();
        var duration = getRandomDuration();
        self.enemyRandom = setTimeout(spawnRandomBeekeeper, duration);
    }

    // Initial fördröjning innan den första beekeeper spawnas
    var initialDelay = getRandomDuration();
    self.enemyRandom = setTimeout(spawnRandomBeekeeper, initialDelay);
}


beehive.scene.Game.prototype.spawnBeekeeper = function () {
    var self = this;
    var startY = -40;

    // Välj startX baserat på lastBeekeeperX, växla mellan de två
    var startX = this.lastBeekeeperX === 10 ? 345 : 10;
    this.lastBeekeeperX = startX; // Uppdatera lastBeekeeperX för nästa gång

    var beekeeper = new rune.display.Sprite(startX, startY, 30, 35, "beekeeper");
    beekeeper.honeycombTaken = false;
    this.stage.addChild(beekeeper);

    var endY = 250;
    var distanceY = endY - startY;
    var verticalSpeed = distanceY / 400;

    function moveBeekeeper() {
        var interval = setInterval(function () {
            beekeeper.y += verticalSpeed;

          

            if (!beekeeper.honeycombTaken) {
                self.takeHoneycomb(beekeeper);
            }
            if (beekeeper.y >= endY) {
                clearInterval(interval);
                console.log("Beekeeper har nått slutpositionen:", beekeeper.x, beekeeper.y);
                setTimeout(function () {
                    self.stage.removeChild(beekeeper);
                }, 1000);
            }
        }, 16);
    }

    moveBeekeeper();
}


beehive.scene.Game.prototype.takeHoneycomb = function (beekeeper) {
    var honeycombs = beekeeper.x === 10 ? this.honeycombs1 : this.honeycombs2;

    for (var i = 0; i < honeycombs.length; i++) {
        if (beekeeper.hitTestObject(honeycombs[i])) {
            honeycombs[i].health -= 5; 

            
            if (honeycombs[i].health <= 0) {
                this.stage.removeChild(honeycombs[i]);
                honeycombs.splice(i, 1); 
            }
            beekeeper.honeycombTaken = true; 
            break; 
        }
    }
}



beehive.scene.Game.prototype.initPowerups = function() {
    var self = this;

    function spawnPowerup() {
        var width = 400; 
        var height = 225; 

        var x = Math.random() * width; // Slumpmässig X-position inom scenens bredd
        var y = Math.random() * height; // Slumpmässig Y-position inom scenens höjd

        var powerupType = Math.random() < 0.5 ? "healthTimes2" : "shield"; 
        var texture = powerupType === "healthTimes2"
 ? "x2" : "shieldpower"; 

        var powerup = new rune.display.Sprite(x, y, 20, 20, texture);
        powerup.type = powerupType;
        this.stage.addChild(powerup);
        this.powerups.push(powerup);
        

        setTimeout(function() {
            var index = self.powerups.indexOf(powerup);
            if (index > -1) {
                self.stage.removeChild(powerup);
                self.powerups.splice(index, 1);
            }
        }, 10000); // Ta bort power-up efter 10 sekunder om den inte plockats upp
    }

    // Slumpmässigt spawnar en powerup varje 30 till 60 sekunder
    setInterval(spawnPowerup.bind(this), Math.random() * 15000 + 25000);
};

beehive.scene.Game.prototype.shieldPowerup = function (player) {
    var shield = new rune.display.Sprite(0,0,20,400, "shieldbush"); 
    this.stage.addChild(shield); 


    if (player === this.player1) {
        shield.x = 30; 
        shield.y = 10;
    } else if (player === this.player2) {
        shield.x = 345; 
        shield.y = 10; 
    }

    this.shields.push(shield); 

    var self = this; 
setTimeout(function() {
    self.stage.removeChild(shield);
    var index = self.shields.indexOf(shield); 
    if (index !== -1) {
        self.shields.splice(index, 1); 
    }
}, 10000);
}; 


beehive.scene.Game.prototype.handlePowerup = function (player, powerup) {


    if (powerup.type === "healthTimes2") {
        player.doubleDamage = true;
        // var self = this;
        setTimeout(function() {
            player.doubleDamage = false;
        }, 10000);
    } else if (powerup.type === "shield") {
        this.shieldPowerup(player); 
    }
    
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

    var self = this;
this.shields.forEach(function(shield) {
    self.player1.bullets.forEach(function(bullet, i) {
        if (bullet.hitTestObject(shield)) {
            bullet.dispose();
            self.player1.bullets.splice(i, 1);
        }
    });

    self.player2.bullets.forEach(function(bullet, i) {
        if (bullet.hitTestObject(shield)) {
            bullet.dispose();
            self.player2.bullets.splice(i, 1);
        }
    });
});

 // Hit-test för spelarens skott mot beekeeper
    // För spelare 1
    for (var i = 0; i < this.player1.bullets.length; i++) {
        var bullet = this.player1.bullets[i];
        if (bullet.hitTestObject(this.birdPlayer1) || bullet.hitTestObject(this.birdPlayer2)) {
            bullet.dispose();
        }
    }

    // För spelare 2
    for (var j = 0; j < this.player2.bullets.length; j++) {
        var bullet = this.player2.bullets[j];
        if (bullet.hitTestObject(this.birdPlayer1) || bullet.hitTestObject(this.birdPlayer2)) {
            bullet.dispose();
        }
    }



    var self = this;
    this.powerups.forEach(function(powerup, index) {
        if (self.player1.hitTestObject(powerup)) {
            self.handlePowerup(self.player1, powerup);
            self.stage.removeChild(powerup);
            self.powerups.splice(index, 1);
        }
    });

    // Hantera power-ups för player2
    this.powerups.forEach((powerup, index) => {
        if (this.player2.hitTestObject(powerup)) {
            this.handlePowerup(this.player2, powerup);
            this.stage.removeChild(powerup);
            this.powerups.splice(index, 1);
        }
    });


    for (var j = 0; j < this.player2.bullets.length; j++) {
        this.player2.bullets[j].hitTestObject(this.player1, function () {
            this.player2.bullets[j].dispose(this.player2.bullets[j]);
            //this.player1.health--;
            if (this.player2.doubleDamage) {
                this.player1.health -=2; 
            } else {
                this.player1.health -=1; 
            }
            console.log("Spelare 1 health:", this.player1.health);
            this.player1.flicker.start();
            this.player1.updateHealthBar();

        }, this);
    }
  
    for (var i = 0; i < this.player1.bullets.length; i++) {
        this.player1.bullets[i].hitTestObject(this.player2, function () {
            this.player1.bullets[i].dispose(this.player1.bullets[i]);
           // this.player2.health--;
           if (this.player1.doubleDamage) {
            this.player2.health -=2; 
        } else {
            this.player2.health -=1; 
        }
            console.log("Spelare 2 health:", this.player2.health);
            this.player2.flicker.start();
             this.player2.updateHealthBar();
        }, this);
    }



    // for (var i = 0; i < this.honeycombs1.length; i++) {
   
    //     if (this.honeycombs1[i].health == 0) {
    //         this.stage.removeChild(this.honeycombs1[i]);
    //     }

    // }

    // for (var i = 0; i < this.honeycombs2.length; i++) {
  
    //     if (this.honeycombs2[i].health == 0) {
    //         this.stage.removeChild(this.honeycombs2[i]);
    //     }
    // }


    // let toRemove1 = [];
    // for (let i = 0; i < this.honeycombs1.length; i++) {
    //     if (this.honeycombs1[i].health <= 0) {
    //         this.stage.removeChild(this.honeycombs1[i]);
    //         toRemove1.push(i);
    //     }
    // }

    // for (let i = toRemove1.length - 1; i >= 0; i--) {
    //     this.honeycombs1.splice(toRemove1[i], 1);
    // }

    // let toRemove2 = [];
    // for (let i = 0; i < this.honeycombs2.length; i++) {
    //     if (this.honeycombs2[i].health <= 0) {
    //         this.stage.removeChild(this.honeycombs2[i]);
    //         toRemove2.push(i);
    //     }
    // }

    // for (let i = toRemove2.length - 1; i >= 0; i--) {
    //     this.honeycombs2.splice(toRemove2[i], 1);
    // }

    // if (this.honeycombs1.length === 0) {
    //     this.gameEnd("Player 2");  // Player 2 vinner om alla honeycombs1 är borta
    // } else if (this.honeycombs2.length === 0) {
    //     this.gameEnd("Player 1");  // Player 1 vinner om alla honeycombs2 är borta
    // }

    var toRemove1 = [];
    for (var i = 0; i < this.honeycombs1.length; i++) {
        if (this.honeycombs1[i].health <= 0) {
            this.stage.removeChild(this.honeycombs1[i]);
            toRemove1.push(i);
        }
    }
    for (var i = toRemove1.length - 1; i >= 0; i--) {
        this.honeycombs1.splice(toRemove1[i], 1);
    }
    var toRemove2 = [];
for (var i = 0; i < this.honeycombs2.length; i++) {
    if (this.honeycombs2[i].health <= 0) {
        this.stage.removeChild(this.honeycombs2[i]);
        toRemove2.push(i);
    }
}

for (var i = toRemove2.length - 1; i >= 0; i--) {
    this.honeycombs2.splice(toRemove2[i], 1);
}

if (this.honeycombs1.length === 0) {
    this.gameEnd("Player 2");  // Player 2 vinner om alla honeycombs1 är borta
} else if (this.honeycombs2.length === 0) {
    this.gameEnd("Player 1");  // Player 1 vinner om alla honeycombs2 är borta
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

    if (this.player1.health <= 0) {
        // Ta bort spelaren från scenen endast om hälsan är noll eller mindre
        this.stage.removeChild(this.player1);
        this.timers.create({
            duration: 1000,
            onTick: this.addPlayer1,
            scope: this
        });
        this.player1.health = 0;
    }
    
    if (this.player2.health <= 0) {
        // Ta bort spelaren från scenen endast om hälsan är noll eller mindre
        this.stage.removeChild(this.player2);
        this.timers.create({
            duration: 1000,
            onTick: this.addPlayer2,
            scope: this
        });
        this.player2.health = 0;
    }





    // if (this.player1.health == 0) {
    //     //this.player1.flicker.start();
    //     this.stage.removeChild(this.player1);
    //     //this.player1.dispose();
    //     this.timers.create({
    //         duration: 3000,
    //         onTick: this.addPlayer1,
    //         scope: this
    //     })

    // }

    // if (this.player2.health == 0) {
    //     this.stage.removeChild(this.player2);
    //     //this.player2.dispose();
    //     this.timers.create({
    //         duration: 3000,
    //         onTick: this.addPlayer2,
    //         scope: this
            
    //     })

    // }


};




beehive.scene.Game.prototype.addPlayer1 = function () {
    this.player1.x = 9;
    this.player1.y = 8;
    this.player1.health = 50;
    this.stage.addChild(this.player1);
    this.player1.flicker.start();
    this.player1.healthBar.x = 75;
    this.player1.healthBar.y = 10;
};

beehive.scene.Game.prototype.addPlayer2 = function () {
    this.player2.x = 364;
    this.player2.y = 190;
    this.player2.health = 50;
    this.stage.addChild(this.player2);
    this.player2.flicker.start();
    this.player2.healthBar.x = 300;
    this.player2.healthBar.y = 10;
};


beehive.scene.Game.prototype.gameEnd = function(winner) {
    console.log("Spelet är slut!");

    var self = this;
    this.timers.create({
        duration: 2000,
        onComplete: function() {
            self.application.scenes.load([new beehive.scene.GameOverMenu(winner)]);
        }
    });

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