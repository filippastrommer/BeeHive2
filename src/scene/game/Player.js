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
    this.rotationSpeed = 2.6;
    this.hitbox.set(2, 5, 18, 18);
   // this.healthBar = healthBar;
    //this.hitbox.debug = true;
    //this.bullet = null;
    //this.bullet = bullet;
    //this.bullets = [];

    // this.game = game;
    // this.bulletTimer = 0;
    // this.bulletCooldown = 300;
    // this.walking = false;
};

beehive.Player.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Player.prototype.constructor = beehive.Player;


/**
 * ...
 *
 * 
 */
beehive.Player.prototype.init = function () {
   //this.initProgressbars();
    rune.display.Sprite.prototype.init.call(this);
    
    this.initPhysics();
    this.initAnimation();
  
   // this.updateHealthBar();

};

// beehive.Player.prototype.initProgressbars = function() {
//     this.healthBar = new rune.ui.Progressbar(25, 5, "#000000", "#ff0000");
//     this.healthBar.x = 80; 
//     this.healthBar.y = 10;
//     this.stage.addChild(this.healthBar);
// };

// beehive.Player.prototype.Initprogressbars = function() {
//   // Skapa healthbars för player1
//   player1.healthBar = new rune.ui.Progressbar(3, 15, "#000000", "#ff0000");
//   player1.healthBar.centerX = player1.x;
//   player1.healthBar.centerY = player1.y - 10;
//   this.stage.addChild(player1.healthBar);

//   // Skapa healthbars för player2
//   player2.healthBar = new rune.ui.Progressbar(3, 15, "#000000", "#ff0000");
//   player2.healthBar.centerX = player2.x;
//   player2.healthBar.centerY = player2.y - 10;
//   this.stage.addChild(player2.healthBar);

// }

// beehive.Player.prototype.updateHealthBar = function() {
//     // Beräkna förhållandet mellan nuvarande hälsa och maxhälsa för att bestämma fyllnadsgraden av healthbaren
//     var healthRatio = this.health / this.maxHealth; // Förutsatt att du har en variabel för maxhälsa

//     // Uppdatera healthbaren med det nya förhållandet
//     this.playerHealthBar.setRatio(healthRatio);
// };

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 */

// beehive.Player.prototype.initProgressbar = function () {
// this.player1.healthBar = new rune.ui.Progressbar(25, 5, "#000000", "#ff0000");
// this.player1.healthBar.x = 80; 
// this.player1.healthBar.y = 10;
// this.stage.addChild(this.player1.healthBar);

// // Skapa healthbar för player2
// this.player2.healthBar = new rune.ui.Progressbar(25, 5, "#000000", "#ff0000");
// this.player2.healthBar.x = 300;
// this.player2.healthBar.y = 10;
// this.stage.addChild(this.player2.healthBar);

// }


// beehive.scene.Game.prototype.updateHealthBar = function(player, health) {
//     if (player.healthBar) {
//         var maxHealth = 50; // Maximal hälsa för spelaren
//         var healthRatio = health / maxHealth; // Beräkna förhållandet mellan aktuell hälsa och maximal hälsa
//         var progressBarWidth = 25; // Bredden på healthbaren

//         // Uppdatera healthbaren baserat på hälsostatusen
//         player.healthBar.graphics.clear(); // Rensa tidigare ritad healthbar
//         player.healthBar.graphics.beginFill("#ff0000"); // Sätt färgen för aktuell hälsa
//         player.healthBar.graphics.drawRect(0, 0, progressBarWidth * healthRatio, 5); // Rita förgrundsfärgen baserat på hälsostatusen
//         player.healthBar.graphics.endFill(); // Avsluta ritning
//     } else {
//         console.error("Health bar is not defined for player:", player);
//     }
// };



beehive.Player.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.updateInput();

    for (var i = 0; i < this.ownHoneycombs.length; i++) {
        this.ownHoneycombs[i].hitTestObject(this, function () {
            if (this.controller.justPressed(1)) {
                setTimeout(this.addHoneycomb(this.ownHoneycombs[i]), 10000);
            }
        }, this);
    }
    //duration: 5000,
    //         onTick: addHoneycomb,
    //         scope: this
    //     }, this);
    // for (let i = 0; i < this.bullets.length; i++) {
    //     this.bullets
    // }


    for (var i = 0; i < this.bullets.length; i++) {
        for (var j = 0; j < this.honeycombs.length; j++) {
            if (this.bullets[i].hitTestObject(this.honeycombs[j])) {
                this.bullets[i].dispose(); 
                console.log("träff");
                this.honeycombs[j].health--;
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
    this.velocity.max.x = 0.5;
    this.velocity.max.y = 0.5;

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


    if (this.controller.justPressed(0)) {
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
    var bulletSpeed = 5;
    var bulletDirectionX = bulletSpeed * Math.cos(radians);
    var bulletDirectionY = bulletSpeed * Math.sin(radians);

    // Skapa skottet som en ny instans
    var nectar = new beehive.Bullet(bulletX, bulletY, radians, this.bullets, this.honeycombs);
    nectar.velocity.x = bulletDirectionX;
    nectar.velocity.y = bulletDirectionY;
    this.bullets.push(nectar);
    this.stage.addChild(nectar); // Lägg till skottet på scenen

    // for (var i = 0; i < this.bullets.length; i++) {
    //     var bullet = this.bullets[i];
    //     for (var j = 0; j < this.honeycombs.length; j++) {
    //         var honeycomb = this.honeycombs[j];
    //         console.log("Testing collision for bullet", i, "and honeycomb", j);
    //         if (bullet.hitTestObject(honeycomb)) {
    //             console.log("Collision detected for bullet", i, "and honeycomb", j);
    //             honeycomb.health--;
    //             break;
    //         }
    //     }
    // }
    
  
    // for (var i = 0; i < this.bullets.length; i++) {
    //     for (var j = 0; j < this.honeycombs.length; j++) {
    //         this.bullets[i].hitTestObject(this.honeycombs[j], function () {
    //             // this.stage.removeChild(this.bullets[i]);
    //             console.log("träff");
    //             this.honeycombs[j].health--;
    //         }, this);
    //     }
    // }



    // for (var i = 0; i < this.bullets.length; i++) {
    //     var bullet = this.bullets[i];
    //     for (var j = 0; j < this.honeycombs.length; j++) {
    //         var honeycomb = this.honeycombs[j];
    //         console.log("Testing collision for bullet", i, "and honeycomb", j);
    //         var hitTestResult = bullet.hitTestObject(honeycomb);
    //         console.log("Hit test result:", hitTestResult);
    //         if (hitTestResult) {
    //             console.log("Collision detected for bullet", i, "and honeycomb", j);
    //             honeycomb.health--;
    //             break;
    //         }
    //     }
    // }
    
    
}
















// beehive.Player.prototype.shootNectar = function () {
//     var beeOffsetX = 5;
//     var beeOffsetY = 8;


//     var bulletX = this.x + beeOffsetX;
//     var bulletY = this.y + beeOffsetY;

//     var radians = this.rotation * (Math.PI / 180); // Omvandla rotationen till radianer
//     var bulletSpeed = 5;
//     var bulletDirectionX = bulletSpeed * Math.cos(radians);
//     var bulletDirectionY = bulletSpeed * Math.sin(radians);

//     // Skapa skottet som en ny instans
//     var nectar = new beehive.Bullet(bulletX, bulletY, radians, this.bullets, this.honeycombs);
//     nectar.velocity.x = bulletDirectionX;
//     nectar.velocity.y = bulletDirectionY;
//     this.bullets.push(nectar);
//     //console.log(this.bullets);
//     this.stage.addChild(nectar); // Lägg till skottet på scenen

  
//     for (var i = 0; i < this.bullets.length; i++) {
//         var bullet = this.bullets[i];
//         for (var j = 0; j < this.honeycombs.length; j++) {
//             var honeycomb = this.honeycombs[j];
//             if (bullet.hitTestObject(honeycomb)) {
//                 console.log("träff");
//                 honeycomb.health--;
//                 break; // Bryt loopen när en träff har upptäckts
//             }
//         }
//     }
    

   


//     // for (var i = 0; i < this.bullets.length; i++) {
//     //     for (var j = 0; j < this.honeycombs.length; j++) {
//     //         this.bullets[i].hitTestObject(this.honeycombs[j], function () {
//     //             // this.stage.removeChild(this.bullets[i]);
//     //             console.log("träff");
//     //             this.honeycombs[j].health--;
//     //         } );
//     //     }
//     // }
// }













// //GAMMAL STYRNING
// if (this.pressed.stickRightUp) {
//     this.velocity.y -= 0.25;
//     this.animation.gotoAndPlay("fly");
// } else if (this.pressed.stickRightLeft) {
//     this.velocity.x -= 0.25;
//     console.log("hej");
//     if(this.flippedX) {
//        this.flippedX = false;
//     }
//     this.animation.gotoAndPlay("fly");
// } else if (this.pressed.stickRightDown) {
//     this.velocity.y += 0.25;
//     this.animation.gotoAndPlay("fly");
// } else if (this.pressed.stickRightRight) {
//     this.velocity.x += 0.25;
//     this.flippedX = true;
//     this.animation.gotoAndPlay("fly");
// } else {
//     this.animation.gotoAndPlay("idle")
// };


// var threshold = 0.1;
// var x = 0;
// var y = 0;

// // Kontrollera tangentbordsinput för att ändra x- och y-värdena
// if (this.keyboard.pressed("LEFT")) {
//     x -= 1;
// }
// if (this.keyboard.pressed("RIGHT")) {
//     x += 1;
// }
// if (this.keyboard.pressed("UP")) {
//     y -= 1;
// }
// if (this.keyboard.pressed("DOWN")) {
//     y += 1;
// }

// if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
//     this.rotation = Math.atan2(y, x) * (180 / Math.PI);
//     if (this.rotation < 0) {
//         this.rotation += 360;
//     }
//     this.velocity.x += x * this.rotationSpeed;
//     this.velocity.y += y * this.rotationSpeed;
// }

// if (this.velocity.x != 0 || this.velocity.y != 0) {
//     this.animation.gotoAndPlay("fly");
// } else {
//     this.animation.gotoAndPlay("idle");
// }