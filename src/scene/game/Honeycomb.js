/**
* Class for the player
* @param {number, number, string}  
*/
beehive.Honeycomb = function (x, y, resource, bullets) {
    rune.display.Sprite.call(this, x, y, 20, 18, resource);

    this.bullets = bullets;
    this.health = 20;
    this.hitbox.set(2, 2, 15, 13);
    //this.hitbox.debug = true;
    this.debugColor = rune.util.Palette.GREEN;

    //Sound effect
    this.breakSound = null; 

};

beehive.Honeycomb.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Honeycomb.prototype.constructor = beehive.Honeycomb;

beehive.Honeycomb.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
    this.initAnimation();
    this.breakSound = this.application.sounds.sound.get("breakSound", true); 

};

beehive.Honeycomb.prototype.initAnimation = function () {
    this.animation.create("100", [0], 1, true);
    this.animation.create("75", [1], 1, true);
    this.animation.create("50", [2], 1, true);
    this.animation.create("25", [3], 1, true);
}

/**
 * 
 * @param {number} step 
 */

beehive.Honeycomb.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);

    //Stoppa sound effect från att upprepas
    if (!this.soundPlayed) {
        this.soundPlayed = {}; 
    }

    //Animation för honeycombs
    if (this.health == 20 ) {
        this.animation.gotoAndPlay("100")
    } else if (this.health == 15 && !this.soundPlayed[15]) {
        this.animation.gotoAndPlay("75");
        this.breakSound.play(); 
        this.breakSound.volume = 0.3; 
        this.soundPlayed[15] = true;
    } else if (this.health == 10 && !this.soundPlayed[10]) {
        this.breakSound.play(); 
        this.breakSound.volume = 0.3;
        this.animation.gotoAndPlay("50");
        this.soundPlayed[10] = true;
    } else if (this.health == 5 && !this.soundPlayed[5]) {
        this.breakSound.play(); 
        this.breakSound.volume = 0.3;
        this.animation.gotoAndPlay("25");
        this.soundPlayed[5] = true;
    }

};

beehive.Honeycomb.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};