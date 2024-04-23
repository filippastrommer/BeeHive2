/**
* Class for the player
* @param {number, number, string}  
*/
beehive.Honeycomb = function(x, y, resource) {
    rune.display.Sprite.call(this, x, y, 20, 18, resource);
    this.hitbox.set(0, 0, 5, 5);
    this.debug = true;
};

beehive.Honeycomb.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Honeycomb.prototype.constructor = beehive.Honeycomb;

beehive.Honeycomb.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);

};

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