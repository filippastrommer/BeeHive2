beehive.Bullet = function (x, y, radians, Honeycomb) {
    rune.display.Sprite.call(this, x, y, 7, 7, "nectar", radians);
    //this.bulletSpeed = 5;

      // Sätt startposition för skottet
     
    this.radians = radians;
    this.bulletSpeed = 1;
  //  this.Honeycomb = Honeycomb;
  this.hitbox.set(4, 4, 2, 2);
  //this.hitbox.debug = true;
  this.Honeycomb = Honeycomb;
  this.bullets = [];
  this.Honeycombs = [];

 //console.log("Honeycomb reference in Bullet:", this.Honeycomb);
}

beehive.Bullet.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Bullet.prototype.constructor = beehive.Bullet;

beehive.Bullet.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
}
