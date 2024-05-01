beehive.Bullet = function (x, y, radians, Honeycomb) {
    rune.display.Sprite.call(this, x, y, 7, 7, "nectar", radians);
    //this.bulletSpeed = 5;

      // Sätt startposition för skottet
     
    this.radians = radians;
    this.bulletSpeed = 1;
  //  this.Honeycomb = Honeycomb;
  this.hitbox.set(4, 4, 2, 2);
  this.hitbox.debug = true;
  this.Honeycomb = Honeycomb;
  this.bullets = [];
  this.Honeycombs = [];

 //console.log("Honeycomb reference in Bullet:", this.Honeycomb);
}

beehive.Bullet.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Bullet.prototype.constructor = beehive.Bullet;

beehive.Bullet.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);


    // this.velocity.x += this.bulletSpeed;
    // this.velocity.y += this.bulletSpeed;
 









//     this.velocity.x += this.bulletSpeed;
//     this.velocity.y += this.bulletSpeed;

// // Loopa över bullets arrayen
// for (var j = 0; j < this.bullets.length; j++) {
//   // Hämta en referens till det aktuella bullet-objektet
//   var currentBullet = this.bullets[j];
  
//   // Loopa över Honeycombs arrayen
//   for (var i = 0; i < this.Honeycombs.length; i++) {
//       // Hämta en referens till det aktuella Honeycomb-objektet
//       var currentHoneycomb = this.Honeycombs[i];

//       // Kolla om bullet träffar Honeycomb
//       if (currentBullet.hitTestObject(currentHoneycomb)) {
//        console.log(kollison)
//       }
//   }
// }

   
    // if (this.Honeycomb && this.hitTest(this.Honeycomb)) {
    //     console.log("Bullet collided with Honeycomb!");
       
    //     // Här kan du lägga till logik för vad som ska hända när en kollision inträffar
    //     // Till exempel, minska Honeycomb-hälsan eller förstöra bullet
    //     // För att förstöra bullet kan du använda: this.destroy();
        
    // } 
}
