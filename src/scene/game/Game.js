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
beehive.scene.Game = function(Honeycomb) {
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
beehive.scene.Game.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    
    this.initBackground();
    this.initPlayers();
    this.initHoneycombs();

};

beehive.scene.Game.prototype.initBackground = function() {
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

beehive.scene.Game.prototype.initPlayers = function() {
    //Player 1 (black bee)
    this.player1 = new beehive.Player(100, 150, "bee", this.controller1, this.bullets1, this.honeycombs2);
    this.stage.addChild(this.player1);

    //Player 2 (brown bee)
    this.player2 = new beehive.Player(300, 150, "bee2", this.controller1, this.bullets2, this.honeycombs1);
    this.stage.addChild(this.player2);


};


beehive.scene.Game.prototype.initHoneycombs = function() {
    // this.hitbox.set(0, 0, this.width, this.height);
  
     var y1 = 40;
     var y2 = 10;
 
     for (let i = 0; i < 6; i++) {
         this.honeycomb = new beehive.Honeycomb(10, y1, "honeycomb");
         this.honeycombs1.push(this.honeycomb);
         y1 += 30;
         this.stage.addChild(this.honeycomb); 
     }
 
     for (let j = 0; j < 6; j++) {
         this.honeycomb = new beehive.Honeycomb(365, y2, "honeycomb");
         this.honeycomb.flippedX = true;
         this.honeycombs2.push(this.honeycomb);
         y2 += 30;
         this.stage.addChild(this.honeycomb);
     }
 
 };

// Initiera Bullet-objekten och skicka med referenser till Honeycomb-objekten


// beehive.scene.Game.prototype.initBullets = function() {

//     var radians = Math.atan2(this.player1.y - this.player2.y, this.player1.x - this.player2.x);

//     for (let honeycomb of this.honeycombs1) {
//         var bullet = new beehive.Bullet(20, 18, radians, this.honeycombs1);
//         this.bullets.push(bullet);
//     }

//     for (let honeycomb of this.honeycombs2) {
//         var bullet = new beehive.Bullet(20, 18, radians, this.honeycombs2);
//         this.bullets.push(bullet);
//     }
// };








// beehive.scene.Game.prototype.checkBulletCollision = function() {
//     for (var i = 0; i < this.bullets.length; i++) {
//         var bullet = this.bullets[i];
//         for (var j = 0; j < this.honeycombs1.length; j++) {
//             var honeycomb1 = this.honeycombs1[j];
//             if (bullet.hitbox.intersects(honeycomb1.hitbox)) {
//                 console.log("Collision detected between bullet and honeycomb 1");
//                 // Ta bort honeycomb från scenen och från arrayen
//                 this.stage.removeChild(honeycomb1);
//                 this.honeycombs1.splice(j, 1);
//                 // Ta bort bula från scenen och från arrayen
//                 this.stage.removeChild(bullet);
//                 this.bullets.splice(i, 1);
//                 // Avsluta loopen eftersom bula bara kan träffa en honeycomb
//                 break;
//             }
//         }
//         for (var k = 0; k < this.honeycombs2.length; k++) {
//             var honeycomb2 = this.honeycombs2[k];
//             if (bullet.hitbox.intersects(honeycomb2.hitbox)) {
//                 // Ta bort honeycomb från scenen och från arrayen
//                 this.stage.removeChild(honeycomb2);
//                 this.honeycombs2.splice(k, 1);
//                 // Ta bort bula från scenen och från arrayen
//                 this.stage.removeChild(bullet);
//                 this.bullets.splice(i, 1);
//                 // Avsluta loopen eftersom bula bara kan träffa en honeycomb
//                 break;
//             }
//         }
//     }


// };


//HONEYCOMB SRC UPDATE
// if (this.health == 2) {
//     this.stage.removeChild(this.hearts);
//     this.hearts = new rune.display.Graphic(290, 1, 37, 11, "2");
//     this.stage.addChild(this.hearts);
// }
// if (this.health == 1) {
//     this.stage.removeChild(this.hearts);
//     this.hearts = new rune.display.Graphic(290, 1, 37, 11, "1");
//     this.stage.addChild(this.hearts);
//     this.initExtraHealth();
// }

// beehive.scene.Game.prototype.initProgressbars = function() {

//     for(let i = 0; i < 7; i++) {
//         this.honeycombHP = new rune.ui.Progressbar(3, 15, "#000000", "#07a30c");
//         this.honeycombHP.centerX = this.honeycombs1[i].x - 5;
//         this.honeycombHP.centerY = this.honeycombs1[i].y + 9;
//         this.stage.addChild(this.honeycombHP);
//         this.honeycombs1HP.push(this.honeycombHP);
//     }

//     for(let j = 0; j < 7; j++){
//         this.honeycombHP = new rune.ui.Progressbar(3, 15, "#000000", "#07a30c");
//         this.honeycombHP.centerX = this.honeycombs2[j].x + 30;
//         this.honeycombHP.centerY = this.honeycombs2[j].y + 9;
//         this.stage.addChild(this.honeycombHP);
//         this.honeycombs2HP.push(this.honeycombHP);
//     }
    
// };

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
beehive.scene.Game.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);

    //console.log(this.player1.bullets);

    for (let i = 0; i < this.player1.bullets.length; i++) {
           this.player1.bullets[i].hitTestObject(this.player2, function () {
            this.player2.health--;
            this.player2.flicker.start(); 
            console.log(this.player2.health);
        }, this); 
    }

    for (let j = 0; j < this.player2.bullets.length; j++) {
        this.player2.bullets[j].hitTestObject(this.player1, function () {
         this.player1.health--;
         this.player1.flicker.start(); 
         console.log(this.player1.health);
     }, this); 
 }

    // if (this.player2.health == 0) {
    //     this.timers.create({
    //         duration: 5000,
    //         onTick: this.player2.dispose(),
    //         scope: this
    //     });
    //     //this.player2.dispose();
        
        
    // }

    // for (var i = 0; i < this.bullets.length; i++) {
    //     for (let j = 0; j < this.honeycombs.length; j++) {
    //         this.bullets[i].hitTestObject(this.honeycombs[j], function () {
    //             this.honeycombs[j].dispose();
    //         }, this);
    //     }
    // }

    
    //console.log(this.bullets);

    // if (this.player1.hitTestObject(this.honeycombs1[0])) {
    //     console.log("test")
    // }



    // var threshold = 0.1;
    // var x = this.controller1.m_axesOne.x;
    // var y = this.controller1.m_axesOne.y;
        
    // if (Math.abs(x) > threshold || Math.abs(y) > threshold) {  // Räkna ut rotationen baserat på spakens position                 
    //     this.rotation = Math.atan2(y, x) * (180 / Math.PI);
    //         if (this.rotation < 0) {
    //             this.rotation += 360;
    //         } // Räkna ut den nya positionen baserat på spakens position och hastigheten
    //         this.velocity.x += x * this.rotationSpeed;
    //         this.velocity.y += y * this.rotationSpeed;
    // }

    // if (this.velocity.x != 0 || this.velocity.y != 0) {
    //     this.animation.gotoAndPlay("fly");
    // } else {
    //     this.animation.gotoAndPlay("idle");
    // }
    
    // // Skjut skott framåt i spelarens riktning
    // if (this.controller1.justPressed(0) || this.keyboard.pressed("SPACE")) {
    //     var radians = this.rotation * (Math.PI / 180); // Omvandla rotationen till radianer
    //     this.shootNectar(radians);
    // }

   
    // if (this.Honeycomb && this.hitTest(this.Honeycomb)) {
    //     console.log("Bullet collided with Honeycomb!");
       
    //     // Här kan du lägga till logik för vad som ska hända när en kollision inträffar
    //     // Till exempel, minska Honeycomb-hälsan eller förstöra bullet
    //     // För att förstöra bullet kan du använda: this.destroy();
    // }
     
    // } 

    //PLAYER ONE MOVEMENT
    // if (this.keyboard.pressed("w") || this.controller.stickLeftUp) {
    //     this.player1.velocity.y -= 0.25;
    //     this.player1.animation.gotoAndPlay("fly");
    // } else if (this.keyboard.pressed("a") || this.controller.stickLeftLeft) {
    //     this.player1.velocity.x -= 0.25;
    //     this.player1.flippedX = false;
    //     this.player1.animation.gotoAndPlay("fly");
    // } else if (this.keyboard.pressed("s") || this.controller.stickLeftDown) {
    //     this.player1.velocity.y += 0.25;
    //     this.player1.animation.gotoAndPlay("fly");
    // } else if (this.keyboard.pressed("d") || this.controller.stickLeftRight) {
    //     this.player1.velocity.x += 0.25;
    //     this.player1.flippedX = true;
    //     this.player1.animation.gotoAndPlay("fly");
    // } else {
    //     this.player1.animation.gotoAndPlay("idle");
    // };

    // //Limitations
    // if (this.player1.bottom > 225) {
    //     this.player1.bottom = 225;
    // } else if (this.player1.top < 0) {
    //     this.player1.top = 0;
    // } else if (this.player1.right > 190) {
    //     this.player1.right = 190;
    // } else if (this.player1.left < 48) {
    //     this.player1.left = 48;
    // };

    //PLAYER ONE BULLETS
    // if (this.controller.stickRightUp || this.controller.stickRightDown || this.controller.stickRightLeft || this.controller.stickRightRight) {
    //     var x = this.controller.stickRight.x;
    //     var y = this.controller.stickRight.y;
    //     var radians = Math.atan2(x, y)
    //     this.shootNectar(radians);
    //     // this.bullet = new rune.display.Sprite((this.player1.x + 25), (this.player1.y + 13), 7, 7, "nectar");
    //     // this.bullet.velocity.x += 4;
    //     // this.stage.addChild(this.bullet);
    //     // this.bullets1.push(this.bullet);
    // };
    

    //PLAYER TWO MOVEMENT
    // if (this.controller.stickRightUp) {
    //     this.player2.velocity.y -= 0.25;
    //     this.player2.animation.gotoAndPlay("fly");
    // } else if (this.controller.stickRightLeft) {
    //     this.player2.velocity.x -= 0.25;
    //     this.player2.flippedX = false;
    //     this.player2.animation.gotoAndPlay("fly");
    // } else if (this.controller.stickRightDown) {
    //     this.player2.velocity.y += 0.25;
    //     this.player2.animation.gotoAndPlay("fly");
    // } else if (this.controller.stickRightRight) {
    //     this.player2.velocity.x += 0.25;
    //     this.player2.flippedX = true;
    //     this.player2.animation.gotoAndPlay("fly");
    // } else {
    //     this.player2.animation.gotoAndPlay("idle");
    // };

    // if (this.keyboard.pressed("UP") || this.controller.stickRightUp) {
    //     this.player2.velocity.y -= 0.25;
    //     if (this.player2.flippedY) {
    //         this.player2.flippedY = false;
    //     }
    //     this.player2.animation.gotoAndPlay("vertical");
    // } else if (this.keyboard.pressed("LEFT") || this.controller.stickRightLeft) {
    //     this.player2.velocity.x -= 0.25;
    //     if(this.player1.flippedX) {
    //        this.player2.flippedX = false; 
    //     }
    //     this.player2.animation.gotoAndPlay("horizontal");
    // } else if (this.keyboard.pressed("DOWN") || this.controller.stickRightDown) {
    //     this.player2.velocity.y += 0.25;
    //     this.player2.flippedY = true;
    //     this.player2.animation.gotoAndPlay("vertical");
    // } else if (this.keyboard.pressed("RIGHT") || this.controller.stickRightRight) {
    //     this.player2.velocity.x += 0.25;
    //     this.player2.flippedX = true;
    //     this.player2.animation.gotoAndPlay("horizontal");
    // };

    //Limitations
    // if (this.player2.bottom > 225) {
    //     this.player2.bottom = 225;
    // } else if (this.player2.top < 0) {
    //     this.player2.top = 0;
    // } else if (this.player2.left < 210) {
    //     this.player2.left = 210;
    // } else if (this.player2.right > 355) {
    //     this.player2.right = 355;
    // };

    //PLAYER TWO BULLETS
    // if(this.keyboard.justPressed("LEFT")) {
    //     this.bullet = new rune.display.Sprite((this.player2.x - 5), (this.player2.y + 13), 7, 7, "nectar");
    //     this.bullet.velocity.x -= 4;
    //     this.stage.addChild(this.bullet);
    //     this.bullets2.push(this.bullet);
    // }
};

/**
 * 
 * @param {number}
 */
// beehive.scene.Game.prototype.shootNectar = function (radians) {
//     if (this.player1.flippedX) {
//         this.bullet = new rune.display.Sprite((this.player1.x + 25), (this.player1.y + 13), 7, 7, "nectar", radians);
//         this.bullet.velocity.x += 4;
//         this.stage.addChild(this.bullet);
//         this.bullets1.push(this.bullet);   
//     }

// }
/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
beehive.scene.Game.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};