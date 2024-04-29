/**
* Class for the player
* @param {number, number, string}  
*/
beehive.Honeycomb = function(x, y, resource) {
    rune.display.Sprite.call(this, x, y, 20, 18, resource);

    this.hitbox.set(0, 0, 15, 15);
    this.hitbox.debug = true;
   this.debugColor = rune.util.Palette.GREEN;
  
  //  this.debugColor = rune.util.Palette.RED;
    // this.honeycombHP = null;
    // this.honeycombs1HP = [];
    // this.honeycombs2HP = [];
};

beehive.Honeycomb.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Honeycomb.prototype.constructor = beehive.Honeycomb;

beehive.Honeycomb.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    
};



beehive.Honeycomb.prototype.checkCollision = function(otherObject) {
    // Jämför hitbox för honeycomb och det andra objektet
    return this.hitbox.intersects(otherObject.hitbox);
};


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

beehive.Honeycomb.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    
};

beehive.Honeycomb.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};