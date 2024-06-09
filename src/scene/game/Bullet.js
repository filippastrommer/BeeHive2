beehive.Bullet = function (x, y, radians) {
    rune.display.Sprite.call(this, x, y, 6, 6, "nectar1", radians);     
    this.radians = radians;
    this.bulletSpeed = 5;
    this.hitbox.set(4, 4, 2, 2);
}

beehive.Bullet.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Bullet.prototype.constructor = beehive.Bullet;

beehive.Bullet.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
}
