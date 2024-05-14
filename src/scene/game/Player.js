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
  //  this.initHealthbar();
    this.initPhysics();
    this.initAnimation();

    this.initHealthbar();
    // this.initHealthbar2();
    this.initHealthBarAnimation();
    // this.initHealthbarAnimation2();

     // Uppdatera healthbaren baserat på spelarens hälsa
   //  this.updateHealthbar();
//    this.updateHealthbarPlayer1();
//    this.updateHealthbarPlayer2();
//this.initHealthbarAnimation();
//this.updateHealthbarPlayer1();
//this.updateHealthbarPlayer2();

   // this.updateHealthBar();

};




/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 */





// beehive.Player.prototype.initHealthbar = function () {
//     this.healthbarplayer1 = new rune.display.Sprite(0, 0, 49, 49, "50hp2");
//     this.healthbarplayer1.x = 100;
//     this.healthbarplayer1.y = 10;
//    // this.healthbarplayer1.animation.create("31", [0], 1, true); // Skapa animationer för healthbarplayer1
//     this.stage.addChild(this.healthbarplayer1);

//     this.healthbarplayer2 = new rune.display.Sprite(0, 0, 49, 49, "50hp");
//     this.healthbarplayer2.x = 250;
//     this.healthbarplayer2.y = 10;
//    // this.healthbarplayer2.animation.create("31", [0], 1, true); // Skapa animationer för healthbarplayer2
//     this.stage.addChild(this.healthbarplayer2);
//     // Skapa animationer för healthbarplayer1 och healthbarplayer2 genom att anropa initHealthbarAnimation-metoden
//     this.initHealthbarAnimation();

// }


// beehive.Player.prototype.initHealthbarAnimation = function () {

//     for (var i = 0; i <= 10; i++) {
//         var frameIndex = 10 - i; // Ramar räknas baklänges från 10 till 0
//         var health = i * 5; // Hälsogränsen för varje frame
//         var animationName = health.toString(); // Namnet på animationen baseras på hälsan
//         this.healthbarplayer1.animation.create(animationName, [frameIndex], 1, true); // Skapa animation för healthbarplayer1
//         this.healthbarplayer2.animation.create(animationName, [frameIndex], 1, true); // Skapa animation för healthbarplayer2
//     }

// }





// beehive.Player.prototype.updateHealthbarPlayer1 = function () {
//     var currentFrame = Math.floor(this.health / 5); // Beräkna vilken frame som ska visas baserat på hälsan
//     var animationName = (currentFrame * 5).toString(); // Namnet på animationen baseras på hälsan

//     // Spela upp rätt animation för healthbarplayer1
//     this.healthbarplayer1.animation.gotoAndPlay(animationName);
// }

// beehive.Player.prototype.updateHealthbarPlayer2 = function () {
//     var currentFrame = Math.floor(this.health / 5); // Beräkna vilken frame som ska visas baserat på hälsan
//     var animationName = (currentFrame * 5).toString(); // Namnet på animationen baseras på hälsan

//     // Spela upp rätt animation för healthbarplayer2
//     this.healthbarplayer2.animation.gotoAndPlay(animationName);
// }

beehive.Player.prototype.initHealthbar = function () {
    this.healthBar = new rune.display.Sprite(0, 0, 49, 11, "50hp");
    this.stage.addChild(this.healthBar);
}

// beehive.Player.prototype.initHealthbar1 = function () {
//     this.healthbarplayer1 = new rune.display.Sprite(0, 0, 49, 49, "50hp2");
//     this.healthbarplayer1.x = 100;
//     this.healthbarplayer1.y = 10;
//     this.stage.addChild(this.healthbarplayer1);

//     this.initHealthbarAnimation1();
// }

// beehive.Player.prototype.initHealthbar2 = function () {
//     this.healthbarplayer2 = new rune.display.Sprite(0, 0, 49, 49, "50hp");
//     this.healthbarplayer2.x = 250;
//     this.healthbarplayer2.y = 10;
//     this.stage.addChild(this.healthbarplayer2);

//     this.initHealthbarAnimation2();
// }
beehive.Player.prototype.initHealthBarAnimation = function () {
    for (var i = 10; i >= 0; i--) {
        var frameIndex = 10 - i; // Ramar räknas baklänges från 10 till 0
        var health = i * 5; // Hälsogränsen för varje frame
        var animationName = health.toString(); // Namnet på animationen baseras på hälsan
        this.healthBar.animation.create(animationName, [frameIndex], 1, true); // Skapa animation för hp-bar
    }
}

// beehive.Player.prototype.initHealthbarAnimation2 = function () {
//     for (var i = 10; i >= 0; i--) {
//         var frameIndex = 10 - i; // Ramar räknas baklänges från 10 till 0
//         var health = i * 5; // Hälsogränsen för varje frame
//         var animationName = health.toString(); // Namnet på animationen baseras på hälsan
//         this.healthbarplayer2.animation.create(animationName, [frameIndex], 1, true); // Skapa animation för healthbarplayer2
//     }
// }


beehive.Player.prototype.updateHealthBar = function () {
    var currentFrame = Math.floor(this.health / 5); // Beräkna vilken frame som ska visas baserat på hälsan
    var animationName = (currentFrame * 5).toString(); // Namnet på animationen baseras på hälsan

    // Starta och spela upp rätt animation för healthbarplayer1
    this.healthBar.animation.gotoAndPlay(animationName);
}

// beehive.Player.prototype.updateHealthbarPlayer2 = function () {
//     var currentFrame = Math.floor(this.health / 5); // Beräkna vilken frame som ska visas baserat på hälsan
//     var animationName = (currentFrame * 5).toString(); // Namnet på animationen baseras på hälsan

//     // Starta och spela upp rätt animation för healthbarplayer2
//     this.healthbarplayer2.animation.gotoAndPlay(animationName);
// }


// beehive.Player.prototype.resetHealthBar = function () {
//     this.health = 50; // Återställ hälsan till full
//     this.updateHealthBar(); // Uppdatera hälsobaren med den nya hälsan
// };







beehive.Player.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.updateInput();
    for (var i = 0; i < this.ownHoneycombs.length; i++) {
        this.ownHoneycombs[i].hitTestObject(this, function (honeycomb) {
            if (this.controller.pressed(1)) {
                if (!this.addTimer) {
                    this.addTimer = setTimeout(() => {
                        this.addHoneycomb(honeycomb);
                        this.addTimer = null; 
                    }, 3000);
                }
            } else {
                if (this.addTimer) {
                    clearTimeout(this.addTimer); 
                    this.addTimer = null;
                }
            }
        }.bind(this, this.ownHoneycombs[i]), this); 
    }



    // for (var i = 0; i < this.ownHoneycombs.length; i++) {
    //     var honeycomb = this.ownHoneycombs[i];
    //     honeycomb.hitTestObject(this, function () {
    //         if (this.controller.pressed(1)) {
    //             this.timers.create({
    //                 duration: 10000, // Tid för fördröjning i millisekunder
    //                 onTick: function() {
    //                     this.addHoneycomb(honeycomb); // Anropa funktionen för att lägga till honungskakan
    //                 },
    //                 scope: this // Ange kontexten för funktionen
    //             });
    //         }
    //     }, this);
    // }




    // for (var i = 0; i < this.ownHoneycombs.length; i++) {
    //     this.ownHoneycombs[i].hitTestObject(this, function () {
    //         if (this.controller.pressed(1)) {
    //             setTimeout(this.addHoneycomb(this.ownHoneycombs[i]), 10000);
    //             // this.timers.create({
    //             //     duration: 5000,
    //             //     onTick: this.addHoneycomb,
    //             //     scope: this
    //             // });
    //         }
    //     }, this);
    // }
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