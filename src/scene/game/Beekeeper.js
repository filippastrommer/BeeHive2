beehive.Beekeeper = function(x, y, honeycombs) {
    rune.display.Sprite.call(this, x, y, 29, 35, "beekeeper"); this.honeycombs = honeycombs;

    this.init();
};

beehive.Beekeeper.prototype = Object.create(rune.display.Sprite.prototype);
beehive.Beekeeper.prototype.constructor = beehive.Beekeeper;

beehive.Beekeeper.prototype.init = function() {
    this.animation.create("move", [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true);
    this.animation.gotoAndPlay("move");
    this.flippedY = true;
    this.honeycombTaken = false;
};

beehive.Beekeeper.prototype.update = function() {
    var verticalSpeed = 0.5;  
    this.y += verticalSpeed;
};

// beehive.Beekeeper.prototype.takeHoneycomb = function(honeycombs) {
//     if (!this.honeycombTaken && honeycombs.length > 0) {
//         var randomIndex = Math.floor(Math.random() * honeycombs.length);
//         var targetHoneycomb = honeycombs[randomIndex];
//         if (targetHoneycomb.full && this.hitTestObject(targetHoneycomb)) {
//             targetHoneycomb.health -= 5;
//             if (targetHoneycomb.health <= 0) {
//                 targetHoneycomb.full = false; 
//                 targetHoneycomb.dispose();
//             }
//             this.honeycombTaken = true;
//         }
//     }
// };

beehive.scene.Game.prototype.takeHoneycomb = function (beekeeper) {

    var honeycombs = beekeeper.x === 10 ? this.honeycombs1 : this.honeycombs2;

    if (honeycombs.length > 0) {
        var randomIndex = Math.floor(Math.random() * honeycombs.length);
        var targetHoneycomb = honeycombs[randomIndex];

       if (targetHoneycomb.full && beekeeper.hitTestObject(targetHoneycomb)) {
        console.log("Collision detected");
            targetHoneycomb.health -= 5;
            console.log("Honeycomb health: ", targetHoneycomb.health); 
            if (targetHoneycomb.health <= 0) {
                this.honeycombSound.play();
                this.honeycombSound.volume = 0.3;
                targetHoneycomb.full = false; 
                this.stage.removeChild(targetHoneycomb);
            }
            beekeeper.honeycombTaken = true;
        }
    }
}



// beehive.Beekeeper.prototype.takeHoneycomb = function(honeycombs) {
//     if (!this.honeycombTaken && honeycombs.length > 0) {
//         var randomIndex = Math.floor(Math.random() * honeycombs.length);
//         var targetHoneycomb = honeycombs[randomIndex];
//         if (targetHoneycomb.full && this.hitTestObject(targetHoneycomb)) {
//             console.log("Collision detected");
//             targetHoneycomb.health -= 5;
//             console.log("Honeycomb health after beekeeper interaction:", targetHoneycomb.health); // Loggar den aktuella hälsan
//             if (targetHoneycomb.health <= 0) {
//                 targetHoneycomb.full = false; 
//                 targetHoneycomb.dispose();
//             }
//             this.honeycombTaken = true;
//         }
//     }
// };


