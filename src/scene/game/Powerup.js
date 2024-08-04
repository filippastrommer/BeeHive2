beehive.Powerup = function(x, y, type) {
    rune.display.Sprite.call(this, x, y, 22, 26, this.chooseTexture(type));
    this.type = type;
    this.init();

};

beehive.Powerup.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Powerup.prototype.constructor = beehive.Powerup;

beehive.Powerup.prototype.init = function() {
    this.animation.create("active", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, true);
    this.animation.gotoAndPlay("active");
};

beehive.Powerup.prototype.chooseTexture = function(type) {
    switch (type) {
        case "healthTimes2":
            return "doubleAnimation";
        case "shield":
            return "shieldAnimation";
        case "slowEnemyShots":
            return "slowAnimation";
        default:
            return "defaultTexture"; 
    }
};

beehive.Powerup.prototype.activate = function(player) {

    switch (this.type) {
        case "healthTimes2":
            player.doubleDamage();
            break;
        case "shield":
            player.activateShield();
            break;
        case "slowEnemyShots":
            player.slowEnemyShots();
            break;
    }
};
