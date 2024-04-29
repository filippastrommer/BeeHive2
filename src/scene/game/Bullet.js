beehive.Bullet = function (x, y, radians) {
    rune.display.Sprite.call(this, x, y, 7, 7, "nectar", radians);
    //this.bulletSpeed = 5;
    this.radians = radians;
    this.bulletSpeed = 5;
}

beehive.Bullet.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Bullet.prototype.constructor = beehive.Bullet;

beehive.Bullet.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);

    this.velocity.x += this.bulletSpeed;
    this.velocity.y += this.bulletSpeed;

}
