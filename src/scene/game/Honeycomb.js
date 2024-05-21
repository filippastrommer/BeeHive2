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





// if (this.health == 2) {
//         this.stage.removeChild(this.hearts);
//         this.hearts = new rune.display.Graphic(290, 1, 37, 11, "2");
//         this.stage.addChild(this.hearts);
//     }
//     if (this.health == 1) {
//         this.stage.removeChild(this.hearts);
//         this.hearts = new rune.display.Graphic(290, 1, 37, 11, "1");
//         this.stage.addChild(this.hearts);
//         this.initExtraHealth();
//     }

//     beehive.Honeycomb.prototype.initProgressbars = function() {

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
 * 
 * @param {number} step 
 */

beehive.Honeycomb.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);

    if (!this.soundPlayed) {
        this.soundPlayed = {}; 
    }

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

    // if (this.health == 0) {
    //     this.stage.removeChild(this);
    // }
};

beehive.Honeycomb.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};