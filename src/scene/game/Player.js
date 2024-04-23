/**
* Class for the player
* @param {number, number, number, number, string, object}  
*/

beehive.Player = function (x, y, resource, controller, bullet) {
    rune.display.Sprite.call(this, x, y, 22, 28, resource);
    this.controller = controller;
    this.health = 50;
    this.flippedY = true;
    this.flippedX = true;

    this.rotationSpeed = 2.6;
    this.bullet = null;
    this.bullet = bullet;
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
        
    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {  // Räkna ut rotationen baserat på spakens position                 
        this.rotation = Math.atan2(y, x) * (180 / Math.PI);
            if (this.rotation < 0) {
                this.rotation += 360;
            } // Räkna ut den nya positionen baserat på spakens position och hastigheten
            this.velocity.x += x * this.rotationSpeed;
            this.velocity.y += y * this.rotationSpeed;
    }

    if (this.velocity.x != 0 || this.velocity.y != 0) {
        this.animation.gotoAndPlay("fly");
    } else {
        this.animation.gotoAndPlay("idle");
    }
    
    // Skjut skott framåt i spelarens riktning
    if (this.controller.justPressed(0)) {
        var radians = this.rotation * (Math.PI / 180); // Omvandla rotationen till radianer
        this.shootNectar(radians);
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



beehive.Player.prototype.shootNectar = function () {
    // Beräkna skottets startposition baserat på spelarens position och rotation
    var offsetX = 5; // Justera dessa värden för att matcha skottets startpunkt relativt till spelaren
    var offsetY = -10;
    var radians = this.rotation * (Math.PI / 180); // Omvandla rotationen till radianer
    var bulletX = this.x + offsetX * Math.cos(radians) - offsetY * Math.sin(radians);
    var bulletY = this.y + offsetX * Math.sin(radians) + offsetY * Math.cos(radians);
    
    // Beräkna skottets hastighet baserat på spelarens rotation
    var bulletSpeed = 3;
    var bulletDirectionX = bulletSpeed * Math.cos(radians);
    var bulletDirectionY = bulletSpeed * Math.sin(radians);
    
    // Skapa skottet från den beräknade startpositionen med den beräknade hastigheten
    this.bullet = new rune.display.Sprite(bulletX, bulletY, 7, 7, "nectar");
    this.bullet.velocity.x += bulletDirectionX;
    this.bullet.velocity.y += bulletDirectionY;
    
    // Lägg till skottet på scenen
    this.stage.addChild(this.bullet);
}


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