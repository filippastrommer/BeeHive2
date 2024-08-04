// beehive.Bird = function(x, y) {
//     rune.display.Sprite.call(this, x, y, 38, 24, "birdFlying");
//     this.init();
// };

// beehive.Bird.prototype = Object.create(rune.display.Sprite.prototype);
// beehive.Bird.prototype.constructor = beehive.Bird;

// beehive.Bird.prototype.init = function() {
//     this.animation.create("move", [0, 1, 2, 3, 4, 5, 6, 7], 12, true);
//     this.animation.gotoAndPlay("move");
//     this.hitbox.set(10, 7, 30, 25);
//     this.direction = { x: Math.random() < 0.5 ? -1 : 1, y: 1 };
//     this.flippedX = this.direction.x < 0;
// };

// beehive.Bird.prototype.update = function() {
//     this.x += this.direction.x;
//     this.y += this.direction.y;
// };

// beehive.Bird = function(x, y) {
//     rune.display.Sprite.call(this, x, y, 38, 24, "birdFlying");
//     this.init();
// };

// beehive.Bird.prototype = Object.create(rune.display.Sprite.prototype);
// beehive.Bird.prototype.constructor = beehive.Bird;

// beehive.Bird.prototype.init = function() {
//     this.animation.create("move", [0, 1, 2, 3, 4, 5, 6, 7], 12, true);
//     this.animation.gotoAndPlay("move");
//     this.hitbox.set(10, 7, 30, 25);
//     this.collision = false;
//     this.direction = { x: Math.random() < 0.5 ? -1 : 1, y: 1 };
//     this.rotation = Math.atan2(this.direction.y, this.direction.x) * (180 / Math.PI);
//     this.flippedX = this.direction.x < 0;
//     this.x = Math.random() * (400 - this.width);
//     this.y = -this.height;
// };

// beehive.Bird.prototype.removeBird = function(game) {
//     game.stage.removeChild(this);
//     const index = game.birds.indexOf(this);
//     if (index > -1) {
//         game.birds.splice(index, 1);
//     }
// };

// beehive.Bird.prototype.update = function(game) {
//     this.x += this.direction.x;
//     this.y += this.direction.y;

//     // if (this.x <= -this.width || this.x >= 400 || this.y >= 225) {
//     //     game.stage.removeChild(this);
//     //     game.birds.splice(game.birds.indexOf(this), 1);
//     //     return;
//     // }
//     console.log("Updating bird at position", this.x, this.y);
// if (this.x <= -this.width || this.x >= 400 || this.y >= 225) {
//     console.log("Removing bird at position", this.x, this.y);
//     this.removeBird(game);
//     return;
// }

//     if (!this.collision && (this.hitTestObject(game.player1) || this.hitTestObject(game.player2))) {
//         game.birdCollision(this.hitTestObject(game.player1) ? game.player1 : game.player2);
//         this.collision = true;
//     }
// };


beehive.Bird = function(x, y) {
    rune.display.Sprite.call(this, x, y, 38, 24, "birdFlying");
    this.init();
};

beehive.Bird.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Bird.prototype.constructor = beehive.Bird;

beehive.Bird.prototype.init = function() {
    this.initAnimation();
    this.hitbox.set(10, 7, 30, 25);
    this.collision = false;
    this.direction = { x: Math.random() < 0.5 ? -1 : 1, y: 1 };
    this.rotation = Math.atan2(this.direction.y, this.direction.x) * (180 / Math.PI);
    this.flippedX = this.direction.x < 0;
    this.x = Math.random() * (400 - this.width);
    this.y = -this.height;
    this.flippedX = this.direction.x < 0;
    this.flippedY = this.direction.x > 0;


//     var angle = Math.atan2(bird.direction.y, bird.direction.x) * (180 / Math.PI);
//     bird.rotation = angle; 
//     bird.flippedX = bird.direction.x < 0;
//     bird.flippedY = bird.direction.x > 0;
//     return bird;
};

beehive.Bird.prototype.initAnimation = function() {
    this.animation.create("move", [0, 1, 2, 3, 4, 5, 6, 7], 12, true);

};

beehive.Bird.prototype.update = function(game) {
    this.x += this.direction.x;
    this.y += this.direction.y;
    this.animation.gotoAndPlay("move");

    // if (this.x <= -this.width || this.x >= 400 || this.y >= 225) {
    //     this.removeBird(game);
    //     return;
    // }

    if (!this.collision && (this.hitTestObject(game.player1) || this.hitTestObject(game.player2))) {
        game.birdCollision(this.hitTestObject(game.player1) ? game.player1 : game.player2);
        this.collision = true;
    }
};

// beehive.Bird.prototype.removeBird = function(game) {
//     if (game && game.stage) {
//         game.stage.removeChild(this);
//     }
//     const index = game.birds.indexOf(this);
//     if (index > -1) {
//         game.birds.splice(index, 1);
//     }
// };
