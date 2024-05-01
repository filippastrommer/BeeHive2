/**
* Class for the player
* @param {number, number, number, number, string, object}  
*/

beehive.Player = function (x, y, resource, controller, bullets, honeycombs) {
    rune.display.Sprite.call(this, x, y, 22, 28, resource);
    this.controller = controller;
    this.health = 50;
    this.flippedY = true;
    this.flippedX = true;
    this.bullets = bullets;
    this.honeycombs = honeycombs;
    this.rotationSpeed = 2.6;
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
    rune.display.Sprite.prototype.init.call(this);
    this.initPhysics();
    this.initAnimation();
  
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 */
beehive.Player.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.updateInput();
    
    // for (let i = 0; i < this.bullets.length; i++) {
    //     this.bullets
    // }
};

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
    
    // Skjut skott framåt i spelarens riktning, om en skjutning inte redan är igång
    if (this.controller.justPressed(0) && !this.isShooting) {
        var radians = this.rotation * (Math.PI / 180); 
        this.shootNectar(radians);
        this.isShooting = true; // Markera att en skjutning är igång
    } else if (!this.controller.justPressed(0)) {
        this.isShooting = false; // Återställ skjutningsflaggan när knappen släpps
    }

  

    // if (this.controller.stickRightUp || this.controller.stickRightDown || this.controller.stickRightLeft || this.controller.stickRightRight) {
    //     var x = this.controller.stickRight.x;
    //     var y = this.controller.stickRight.y;
    //     var radians = Math.atan2(y, x); // Använd spelarens riktning för skottens riktning
    //     this.shootNectar(radians);
    //     // this.bullet = new rune.display.Sprite((this.x + 25), (this.y + 13), 7, 7, "nectar");
    //     // this.bullet.rotation = this.rotation; // Sätt skottens rotation till spelarens rotation
    //     // this.bullet.velocity.x += 4 * Math.cos(radians); // Beräkna x-komponenten av skottens hastighet baserat på riktningen
    //     // this.bullet.velocity.y += 4 * Math.sin(radians); // Beräkna y-komponenten av skottens hastighet baserat på riktningen
    //     // this.stage.addChild(this.bullet);
    //     //  this.push(this.bullet);
    // }

};

beehive.Player.prototype.shootNectar = function() {
    var beeOffsetX = 2.5; 
    var beeOffsetY = 2.5; 

    // Beräkna skottets startposition baserat på fördefinierad offset och biet position
    var bulletX = this.x + (this.width / 2) - (7 / 2) + beeOffsetX; // Centrera på x-axeln
    var bulletY = this.y + (this.height / 2) - (7 / 2) + beeOffsetY; // Centrera på y-axeln

    // Beräkna skottets hastighet baserat på spelarens rotation
    var radians = this.rotation * (Math.PI / 180); // Omvandla rotationen till radianer
    var bulletSpeed = 5; // Justera hastigheten efter behov
    var bulletDirectionX = bulletSpeed * Math.cos(radians); // x-komponent av hastighet
    var bulletDirectionY = bulletSpeed * Math.sin(radians); // y-komponent av hastighet

    // Skapa skottet som en ny instans av beehive.Bullet
    var nectar = new beehive.Bullet(bulletX, bulletY, radians, this.bullets, this.honeycombs);
    nectar.velocity.x = bulletDirectionX;
    nectar.velocity.y = bulletDirectionY;
    console.log(this.honeycombs);

    this.stage.addChild(nectar); // Lägg till skottet på scenen

    
// //       // Beräkna x och y för skottets riktning
// //    var dx = Math.cos(this.radians) * this.bulletSpeed;
// //    var dy = Math.sin(this.radians) * this.bulletSpeed;

// //    // Uppdatera skottets position
// //    this.position.x += dx;
// //    this.position.y += dy;



//     // Definiera en fördefinierad offset framför biet där skottet ska skapas
//     var beeOffsetX = -2.5; 
//     var beeOffsetY = -2.5; 
//     var bulletSpeed = 20;

//     // Beräkna skottets startposition baserat på fördefinierad offset och biet position
//     var bulletX = this.x + (this.width / 2) - (7 / 2) + beeOffsetX; // Centrera på x-axeln
//     var bulletY = this.y + (this.height / 2) - (7 / 2) + beeOffsetY; // Centrera på y-axeln

//     // Skapa skottet som en ny instans av rune.display.Sprite
//     var nectar = new rune.display.Sprite(bulletX, bulletY, 7, 7, "nectar");
//     nectar.hitbox.set(0, 0, 5, 5);
//     nectar.hitbox.debug = true;
    
//     // Beräkna skottets hastighet baserat på spelarens rotation
//     var radians = this.rotation * (Math.PI / 180); // Omvandla rotationen till radianer
//     var bulletSpeed = 5; // Justera hastigheten efter behov
//     var bulletDirectionX = bulletSpeed * Math.cos(radians);
//     var bulletDirectionY = bulletSpeed * Math.sin(radians);

//     // Tilldela skottets hastighet
//     nectar.velocity.x = bulletDirectionX;
//     nectar.velocity.y = bulletDirectionY;
    


//     this.bullet = new beehive.Bullet(this.x, this.y);
//     this.stage.addChild(this.bullet);


}  

//     // Definiera en fördefinierad offset framför biet där skottet ska skapas
//     var beeOffsetX = -2.5; 
//     var beeOffsetY = -2.5; 
//     var bulletSpeed = 20;

//     // Beräkna skottets startposition baserat på fördefinierad offset och biet position
//     var bulletX = this.x + (this.width / 2) - (7 / 2) + beeOffsetX; // Centrera på x-axeln
//     var bulletY = this.y + (this.height / 2) - (7 / 2) + beeOffsetY; // Centrera på y-axeln

//     // Skapa skottet som en ny instans av rune.display.Sprite
//     var nectar = new rune.display.Sprite(bulletX, bulletY, 7, 7, "nectar");
//     nectar.hitbox.set(0, 0, 5, 5);
//     nectar.hitbox.debug = true;
    
//     // Beräkna skottets hastighet baserat på spelarens rotation
//     var radians = this.rotation * (Math.PI / 180); // Omvandla rotationen till radianer
//     var bulletSpeed = 5; // Justera hastigheten efter behov
//     var bulletDirectionX = bulletSpeed * Math.cos(radians);
//     var bulletDirectionY = bulletSpeed * Math.sin(radians);

//     // Tilldela skottets hastighet
//     nectar.velocity.x = bulletDirectionX;
//     nectar.velocity.y = bulletDirectionY;
    
//     // Lägg till skottet på scenen
//     this.stage.addChild(nectar);
//     this.bullets.push(nectar);
//   //  this.hitbox.set(0, 0, 50, 50);
//    // this.debug = true;
        
    












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