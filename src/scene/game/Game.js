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
    this.nectar =  null;
    this.honeycombs1 = [];
    this.honeycombs2 = [];
    this.bullets = [];
    this.birds = [];
    this.beekeepers = [];
    this.leftBeehive = null;
    this.rightBeehive = null;
    this.bullet = null;
    this.bullets1 = [];
    this.bullets2 = [];
    this.powerups = [];
    this.controller1 = this.gamepads.get(0);
    this.controller2 = this.gamepads.get(1);
    this.shields = [];
    this.visualTimer = null;


    //Sound effects 
    this.powerupSound = null;
    this.honeycombSound = null;
    this.backgroundMusic = null;
    this.birdHitSound = null;


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
    this.birdTimer(20000, 2);
    this.initBeekeeper(20000, 40000);

    var firstBeekeeper = Math.random() * (30000 - 10000) + 10000;
    this.timers.create({
        duration: firstBeekeeper,
        onTick: this.spawnBeekeeper,
        scope: this,
        repeat: Infinity
    });
    this.currentPowerup = null;
    this.powerupsTimer();
    this.initBackgroundMusic();

    //Init sounds
    this.powerupSound = this.application.sounds.sound.get("pickupPowerup", true);
    this.honeycombSound = this.application.sounds.sound.get("honeycombExplode", true);
    this.birdHitSound = this.application.sounds.sound.get("birdHit", true);

    

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

    var cobblestone = new rune.display.Graphic(
        187,
        0,
        26, 
        225, 
        "cobble"    
    ); 
    this.stage.addChild(cobblestone); 

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

beehive.scene.Game.prototype.birdTimer = function (duration, maxBirds) {

    var self = this;
    var birdNumber = this.birds.length;

    if (birdNumber < maxBirds) {
        self.spawnBird(self.player1, self.player2);
        self.spawnBird(self.player1, self.player2);
        birdNumber += 1;
    }

    this.timers.create({
        duration: duration,
        onTick: function () {
            birdNumber = self.birds.length; 
            if (birdNumber < maxBirds) {
                self.spawnBird(self.player1, self.player2);
                self.spawnBird(self.player1, self.player2);
            }
        },
        scope: self,
        repeat: true
    });
};


//Honeycombs
beehive.scene.Game.prototype.initHoneycombs = function () {

    var y1 = 40;
    var y2 = 10;

    for (var i = 0; i < 6; i++) {
        this.honeycomb = new beehive.Honeycomb(10, y1, "honeycomb_full");
        this.honeycomb.animation.gotoAndPlay("100");
        this.honeycomb.full = true;
        this.honeycombs1.push(this.honeycomb);
        y1 += 30;
        this.stage.addChild(this.honeycomb);
    }

    for (var j = 0; j < 6; j++) {
        this.honeycomb = new beehive.Honeycomb(365, y2, "honeycomb_full");
        this.honeycomb.flippedX = true;
        this.honeycomb.animation.gotoAndPlay("100");
        this.honeycomb.full = true;
        this.honeycombs2.push(this.honeycomb);
        y2 += 30;
        this.stage.addChild(this.honeycomb);
    }

};

//Spawn birds and movement 
beehive.scene.Game.prototype.spawnBird = function (player1, player2) {

    var bird = new rune.display.Sprite(0, 0, 38, 24, "birdFlying");
    bird.animation.create("move", [0, 1, 2, 3, 4, 5, 6, 7], 12, true);
    bird.animation.gotoAndPlay("move");

    bird.hitbox.set(10, 7, 30, 25);
    bird.x = Math.random() * (400 - bird.width);
    bird.y = -bird.height;
    this.stage.addChild(bird);
    this.birds.push(bird);

    bird.collision = false;
    bird.direction = { x: Math.random() < 0.5 ? -1 : 1, y: 1 }; 

    var angle = Math.atan2(bird.direction.y, bird.direction.x) * (180 / Math.PI);
    bird.rotation = angle; 
    bird.flippedX = bird.direction.x < 0;
    bird.flippedY = bird.direction.x > 0;

    return bird;
};

beehive.scene.Game.prototype.updateBirds = function() {
    var self = this;
    var player1 = this.player1;
    var player2 = this.player2;

    this.birds.forEach(function(bird, index) {
        bird.x += bird.direction.x;
        bird.y += bird.direction.y;

        if (bird.x <= -bird.width || bird.x >= 400 || bird.y >= 225) {
            self.stage.removeChild(bird);
            self.birds.splice(index, 1);
            return;
        }

        if (!bird.collision && (bird.hitTestObject(player1) || bird.hitTestObject(player2))) {
            self.birdCollision(bird.hitTestObject(player1) ? player1 : player2);
            bird.collision = true;
        }
    });
    
};

//Collision between bird and player
beehive.scene.Game.prototype.birdCollision = function (player) {
    player.health -= 5;
    this.birdHitSound.play();
    this.birdHitSound.volume = 0.3;
    player.flicker.start();
    player.updateHealthBar();
};

//Beekeeper
beehive.scene.Game.prototype.initBeekeeper = function (minDuration, maxDuration) {

    var startX = [10, 355];
    this.lastBeekeeperX = startX[Math.floor(Math.random() * startX.length)];

    var firstBeekeeper = this.randomDuration(minDuration, maxDuration);

    this.timers.create({
        duration: firstBeekeeper,
        onTick: this.randomBeekeeper,
        scope: this,
        args: [minDuration, maxDuration],
        repeat: Infinity
    });
}


//Beekeeper spawn at a random time
beehive.scene.Game.prototype.randomDuration = function (minDuration, maxDuration) {
    return Math.random() * (maxDuration - minDuration) + minDuration;
};


beehive.scene.Game.prototype.randomBeekeeper = function (minDuration, maxDuration) {

    this.spawnBeekeeper();
    var duration = this.randomDuration(minDuration, maxDuration);

    this.timers.create({
        duration: duration,
        onTick: this.randomBeekeeper,
        scope: this,
        args: [minDuration, maxDuration],
        repeat: Infinity
    });
};

//Beekeepers position and collision with honeycombs
beehive.scene.Game.prototype.spawnBeekeeper = function () {

    var self = this;
    var startY = -40;

    var startX = this.lastBeekeeperX === 10 ? 355 : 10;
    this.lastBeekeeperX = startX;

    var beekeeper = new rune.display.Sprite(startX, this.startY, 29, 35, "beekeeper");
        beekeeper.animation.create("move", [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true);
        beekeeper.animation.gotoAndPlay("move");
        beekeeper.honeycombTaken = false;
        beekeeper.flippedY = true;
    this.stage.addChild(beekeeper);

    var endY = 250;
    var distanceY = endY - startY;
    var verticalSpeed = distanceY / 400;

    function animateBeekeeper() {
        beekeeper.y += verticalSpeed;

        if (!beekeeper.honeycombTaken) {
            self.takeHoneycomb(beekeeper);
        }
        if (beekeeper.y < endY) {
            requestAnimationFrame(animateBeekeeper);
        } else {
            self.timers.create({
                duration: 1000,
                onTick: function () {
                    self.stage.removeChild(beekeeper);
                },
                scope: self,
                repeat: Infinity
            });
        }
    }

    requestAnimationFrame(animateBeekeeper);
}

//Collision with honeycomb, takes health from them
beehive.scene.Game.prototype.takeHoneycomb = function (beekeeper) {
    var honeycombs = beekeeper.x === 10 ? this.honeycombs1 : this.honeycombs2;

    for (var i = 0; i < honeycombs.length; i++) {
        if (beekeeper.hitTestObject(honeycombs[i])) {
            honeycombs[i].health -= 5;
            if (honeycombs[i].health <= 0) {
                this.honeycombSound.play();
                this.honeycombSound.volume = 0.3;
                this.stage.removeChild(honeycombs[i]);
               // honeycombs.splice(i, 1);
            }
            beekeeper.honeycombTaken = true;
            break;
        }
    }
}


//Powerups 
beehive.scene.Game.prototype.powerupsTimer = function () {

    var self = this;
    var duration = Math.random() * 10000 + 25000;

    this.timers.create({
        duration: duration,
        onTick: function () {
            if (self.currentPowerup === null) {
                self.spawnPowerup();
            }
            self.powerupsTimer();
        },
        scope: self,
        repeat: false
    });

};

beehive.scene.Game.prototype.spawnPowerup = function () {

    var player1Width = 175 - 25;
    var player2Width = 375 - 225;
    var height = 190;

    var x, y;
    var position = Math.random() < 0.5 ? 0 : 1;

    if (position === 0) {
        x = Math.random() * player1Width;
        y = Math.random() * height;
    } else {
        x = 225 + Math.random() * player2Width;
        y = Math.random() * height;
    }

    var powerupType;
    var texture;

    var randomValue = Math.random();
    if (randomValue < 0.33) {
        powerupType = "healthTimes2";
        texture = "doubleAnimation";
    } else if (randomValue < 0.66) {
        powerupType = "shield";
        texture = "shieldAnimation";
    } else {
        powerupType = "slowEnemyShots";
        texture = "slowAnimation";
    }

    var powerup = new rune.display.Sprite(x, y, 22, 26, texture);
    powerup.type = powerupType;

    powerup.animation.create("timer", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, true);
    powerup.animation.gotoAndPlay("timer");

    this.stage.addChild(powerup);
    this.powerups.push(powerup);

    this.currentPowerup = powerup; 

    var self = this;
    this.timers.create({
        duration: 10000,
        onTick: function () {
            var index = self.powerups.indexOf(powerup);
            if (index > -1) {
                self.stage.removeChild(powerup);
                self.powerups.splice(index, 1);
                self.currentPowerup = null; 
            }
        },
        scope: self,
        repeat: false
    });
};

//Powerup for bush/shield
beehive.scene.Game.prototype.shieldPowerup = function (player) {
    var shield = new rune.display.Sprite(0, 0, 13, 172, "bushPowerup");
    this.stage.addChild(shield);


    if (player === this.player1) {
        shield.x = 30;
        shield.y = 40;
    } else if (player === this.player2) {
        shield.x = 355;
        shield.y = 10;
    }

    this.shields.push(shield);

    var self = this;

    this.timers.create({
        duration: 10000,
        onTick: function () {
            self.stage.removeChild(shield);
            var index = self.shields.indexOf(shield);
            if (index !== -1) {
                self.shields.splice(index, 1);
            }
        },
        scope: self,
        repeat: false
    });
};

//Powerups functions
beehive.scene.Game.prototype.handlePowerup = function (player, powerup) {

    var self = this;

    var timerX = 185;
    var timerY = 20;

    this.visualTimer = new rune.display.Sprite(timerX, timerY, 49, 9, "powerup");
    this.stage.addChild(this.visualTimer);
    this.visualTimer.animation.create("timer", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 3, false);
    this.visualTimer.animation.gotoAndPlay("timer");

    this.timers.create({
        duration: 10000,
        onTick: function () {
            self.stage.removeChild(self.visualTimer);
        },
        scope: self,
        repeat: false
    });

    var textX = 160;
    var textY = 30;

    if (powerup.type === "healthTimes2") {
        player.doubleDamage = true;
        var doubleDamageText = new rune.display.Sprite(textX, textY, 162, 150, "doubleDamage");
        this.stage.addChild(doubleDamageText);
        
        this.timers.create({
            duration: 2000,
            onTick: function () {
                self.stage.removeChild(doubleDamageText);
            },
            scope: self,
            repeat: false
        });

        this.timers.create({
            duration: 10000,
            onTick: function () {
                player.doubleDamage = false;
            },
            scope: self,
            repeat: false
        });
    } else if (powerup.type === "shield") {
        var shieldText = new rune.display.Sprite(textX, textY, 162, 150, "shieldText");
        this.stage.addChild(shieldText);

        this.timers.create({
            duration: 2000,
            onTick: function () {
                self.stage.removeChild(shieldText);
            },
            scope: self,
            repeat: false
        });

        this.shieldPowerup(player);

    } else if (powerup.type === "slowEnemyShots") {
        var slowText = new rune.display.Sprite(textX, textY, 162, 150, "slowDownText");
        this.stage.addChild(slowText);

        this.timers.create({
            duration: 2000,
            onTick: function () {
                self.stage.removeChild(slowText);
            },
            scope: self,
            repeat: false
        });

        var opponent = (player === this.player1) ? this.player2 : this.player1;
        opponent.slowShots = true;

        var originalMaxX = opponent.velocity.max.x;
        var originalMaxY = opponent.velocity.max.y;

        opponent.velocity.max.x *= 0.3;
        opponent.velocity.max.y *= 0.3;

        this.timers.create({
            duration: 10000,
            onTick: function () {
                opponent.slowShots = false;
                opponent.velocity.max.x = originalMaxX;
                opponent.velocity.max.y = originalMaxY;
            },
            scope: self,
            repeat: false
        });
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
    this.updateBirds();
//Dispose bullets for shield powerup
    var self = this;
    this.shields.forEach(function (shield) {
        self.player1.bullets.forEach(function (bullet, i) {
            if (bullet.hitTestObject(shield)) {
                bullet.dispose();
                self.player1.bullets.splice(i, 1);
            }
        });

        self.player2.bullets.forEach(function (bullet, i) {
            if (bullet.hitTestObject(shield)) {
                bullet.dispose();
                self.player2.bullets.splice(i, 1);
            }
        });
    });


    //Hit test players bullets and bird 
    for (var i = 0; i < this.player1.bullets.length; i++) {
        var bullet = this.player1.bullets[i];
        for (var k = 0; k < this.birds.length; k++) {
            var bird = this.birds[k];
            if (bullet.hitTestObject(bird)) {
                bullet.dispose();
            }
        }
    }

    //Hit test players bullets and bird 
    for (var j = 0; j < this.player2.bullets.length; j++) {
        var bullet = this.player2.bullets[j];
        for (var l = 0; l < this.birds.length; l++) {
            var bird = this.birds[l];
            if (bullet.hitTestObject(bird)) {
                bullet.dispose();
            }
        }
    }

    //Hit test powerup and player
    var self = this;
    this.powerups.forEach(function (powerup, index) {
        if (self.player1.hitTestObject(powerup)) {
            self.powerupSound.play();
            self.powerupSound.volume = 0.5;
            self.handlePowerup(self.player1, powerup);
            self.stage.removeChild(powerup);
            self.powerups.splice(index, 1);
        }
    });

    this.powerups.forEach(function (powerup, index) {
        if (self.player2.hitTestObject(powerup)) {
            self.powerupSound.play();
            self.powerupSound.volume = 0.5;
            self.handlePowerup(self.player2, powerup);
            self.stage.removeChild(powerup);
            self.powerups.splice(index, 1);
        }
    });



    //Hit test player and bullet
    for (var j = 0; j < this.player2.bullets.length; j++) {
        this.player2.bullets[j].hitTestObject(this.player1, function () {
            this.player2.bullets[j].dispose(this.player2.bullets[j]);
            //this.player1.health--;
            if (this.player2.doubleDamage) {
                this.player1.health -= 2;
            } else {
                this.player1.health -= 1;
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
                this.player2.health -= 2;
            } else {
                this.player2.health -= 1;
            }
            console.log("Spelare 2 health:", this.player2.health);
            this.player2.flicker.start();
            this.player2.updateHealthBar();
        }, this);
    }



    //Honeycombs hit test and sounds for breaking
    var remove = [];
    for (var i = 0; i < this.honeycombs1.length; i++) {
        if (this.honeycombs1[i].health == 0) {
            this.honeycombSound.play();
            this.honeycombSound.volume = 0.5;
            this.honeycombs1[i].full = false;
            remove.push(this.honeycombs1[i]);
            this.stage.removeChild(this.honeycombs1[i]);
            //remove.push(i);
        }
    }

    var damageHoneycombs = [];
    for (var i = 0; i < this.honeycombs2.length; i++) {
        if (this.honeycombs2[i].health == 0) {
            this.honeycombSound.play();
            this.honeycombSound.volume = 0.5;
            this.honeycombs2[i].full = false;
            damageHoneycombs.push(this.honeycombs2[i]);
            this.stage.removeChild(this.honeycombs2[i]);
            //damageHoneycombs.push(i);
        }
    }

    var honeycombs1Empty = true; 
    for (var i = 0; i < this.honeycombs1.length; i++) {
        if (this.honeycombs1[i].full) {
            honeycombs1Empty = false;
            break;
        }
    }

   var honeycombs2Empty = true; 
   for (var i = 0; i < this.honeycombs2.length; i++) {
    if (this.honeycombs2[i].full) {
        honeycombs2Empty = false;
        break;
    }
}

    //Game over when honeycombs is gone
    // if (this.honeycombs1.length === 0) {
    //     this.gameEnd("Player 2");  // Player 2 vinner om alla honeycombs1 är borta
    // } else if (this.honeycombs2.length === 0) {
    //     this.gameEnd("Player 1");  // Player 1 vinner om alla honeycombs2 är borta
    // }
    if (honeycombs1Empty) {
        this.gameEnd("Player 2");  // Player 2 vinner om alla honeycombs1 är borta
    } else if (honeycombs2Empty) {
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

 

//Remove player if 0 hp
    if (this.player1.health <= 0) {

        this.stage.removeChild(this.player1);
        this.timers.create({
            duration: 3000,
            onTick: this.addPlayer1,
            scope: this
        });
        this.player1.health = 0;
    }

    if (this.player2.health <= 0) {
        this.stage.removeChild(this.player2);
        this.timers.create({
            duration: 3000,
            onTick: this.addPlayer2,
            scope: this
        });
        this.player2.health = 0;
    }


};



//Respawn player
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

//background music
beehive.scene.Game.prototype.initBackgroundMusic = function () {
    this.backgroundMusic = this.application.sounds.music.get("music", true);
    this.backgroundMusic.play();
    this.backgroundMusic.volume = 0.2;
    this.backgroundMusic.loop = true;
}

//Gameover
beehive.scene.Game.prototype.gameEnd = function (winner) {
    var self = this;
    this.timers.create({
        duration: 2000,
        onTick: function () {
            self.application.scenes.load([new beehive.scene.GameOverMenu(winner)]);
        },
        scope: self,
        repeat: false
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