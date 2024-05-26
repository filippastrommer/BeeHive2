/**
* Class for the player
* @param {number, number, number, number, string, object}  
*/

beehive.Player = function (x, y, resource, controller, bullets, honeycombs, ownHoneycombs, player1, player2) {
    rune.display.Sprite.call(this, x, y, 22, 28, resource);
    this.controller = controller;
    this.health = 50;
    this.player1 = player1;
    this.player2 = player2;
    this.flippedY = true;
    this.flippedX = true;
    this.bullets = bullets;
    this.honeycombs = honeycombs;
    this.ownHoneycombs = ownHoneycombs;
    this.healthBar = null;
    this.rotationSpeed = 4;
    this.hitbox.set(2, 5, 18, 18);
    this.doubleDamage = false; 
    this.slowShots = false;
};

beehive.Player.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Player.prototype.constructor = beehive.Player;


/**
 * ...
 *
 * 
 */
beehive.Player.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
    this.initPhysics();
    this.initAnimation();

    this.initHealthbar();
    this.initHealthBarAnimation();
};




/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 */


beehive.Player.prototype.initHealthbar = function () {
    this.healthBar = new rune.display.Sprite(0, 0, 49, 11, "50hp");
    this.stage.addChild(this.healthBar);
}


beehive.Player.prototype.initHealthBarAnimation = function () {
    for (var i = 10; i >= 0; i--) {
        var frameIndex = 10 - i; 
        var health = i * 5; 
        var animation = health.toString(); 
        this.healthBar.animation.create(animation, [frameIndex], 1, true); 
    }
}



beehive.Player.prototype.updateHealthBar = function () {
    var currentFrame = Math.floor(this.health / 5); 
    var animation = (currentFrame * 5).toString(); 
    this.healthBar.animation.gotoAndPlay(animation);
}


beehive.Player.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.updateInput();


//"laga" honeycombs
    for (var i = 0; i < this.ownHoneycombs.length; i++) {
        this.ownHoneycombs[i].hitTestObject(this, (function(honeycomb) {
            if (this.controller.pressed(1)) {
                if (!this.addTimer) {
                    var self = this; 
                    this.addTimer = setTimeout(function() {
                        self.addHoneycomb(honeycomb);
                        self.addTimer = null;
                    }, 3000);
                }
            } else {
                if (this.addTimer) {
                    clearTimeout(this.addTimer);
                    this.addTimer = null;
                }
            }
        }).bind(this, this.ownHoneycombs[i]), this);
    }

//hit test honeycombs
    for (var i = 0; i < this.bullets.length; i++) {
        for (var j = 0; j < this.honeycombs.length; j++) {
            if (this.bullets[i].hitTestObject(this.honeycombs[j])) {
                this.bullets[i].dispose(); 
                if (this.doubleDamage) {
                    this.honeycombs[j].health -= 2; // Dubbel skada
                } else {
                    this.honeycombs[j].health -= 1; // Normal skada
                }
            }
        }
    }
    
};




beehive.Player.prototype.addHoneycomb = function (honeycomb) {
    honeycomb.health = 20;
    this.stage.addChild(honeycomb);
}

/**
 * ...
 */
beehive.Player.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);

};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
* ...
*
*/
beehive.Player.prototype.initPhysics = function () {
    this.velocity.drag.x = 0.04;
    this.velocity.drag.y = 0.04;
    this.velocity.max.x = 0.7;
    this.velocity.max.y = 0.7;
};

/**
* ...
*
*/
beehive.Player.prototype.initAnimation = function () {
    this.animation.create("idle", [0, 1], 4, true);
    this.animation.create("fly", [2, 3, 4, 5, 6, 7, 8], 25, true);

};

/**
* ...
*
*/

beehive.Player.prototype.updateInput = function () {
    var threshold = 0.1;
    var x = this.controller.m_axesOne.x;
    var y = this.controller.m_axesOne.y;

    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
        this.rotation = Math.atan2(y, x) * (180 / Math.PI);
        if (this.rotation < 0) {
            this.rotation += 360;
        }
        this.velocity.x += x * this.rotationSpeed;
        this.velocity.y += y * this.rotationSpeed;
    }

    if (this.velocity.x != 0 || this.velocity.y != 0) {
        this.animation.gotoAndPlay("fly");
    } else {
        this.animation.gotoAndPlay("idle");
    }
    
    //TEST PÅ DATOR UTAN KONTROLL
    if (this.keyboard.pressed("UP")) {
        this.y -= 1;
    } else if (this.keyboard.pressed("DOWN")) {
        this.y += 1;
    }


    if (this.controller.justPressed(0) || this.keyboard.justPressed("SPACE")) {
        var radians = this.rotation * (Math.PI / 180);
        this.shootNectar(radians);
    }

};



beehive.Player.prototype.shootNectar = function () {

    var beeOffsetX = 5;
    var beeOffsetY = 8;

    var bulletX = this.x + beeOffsetX;
    var bulletY = this.y + beeOffsetY;

    var radians = this.rotation * (Math.PI / 180);
    var bulletSpeed = this.slowShots ? 1.5 : 3;
    var bulletDirectionX = bulletSpeed * Math.cos(radians);
    var bulletDirectionY = bulletSpeed * Math.sin(radians);

    var nectar = new beehive.Bullet(bulletX, bulletY, radians, this.bullets, this.honeycombs);
    nectar.velocity.x = bulletDirectionX;
    nectar.velocity.y = bulletDirectionY;
    this.bullets.push(nectar);
    this.stage.addChild(nectar); 
    
}