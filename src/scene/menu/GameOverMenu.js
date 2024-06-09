

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */

beehive.scene.GameOverMenu = function (winner) {
    this.menu = null; 
    this.controller1 = this.gamepads.get(0);
    this.controller2 = this.gamepads.get(1);
    this.background = null;
    this.winner = winner; 
    this.backgroundMusic = null;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */

    rune.scene.Scene.call(this);
}

beehive.scene.GameOverMenu.prototype = Object.create(rune.scene.Scene.prototype); 
beehive.scene.GameOverMenu.prototype.constructor = beehive.scene.GameOverMenu;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */


beehive.scene.GameOverMenu.prototype.init = function () {

    rune.scene.Scene.prototype.init.call(this);

    this.initBackground();
    this.initBackgroundMusic();
    this.menu = new rune.ui.VTMenu (); 
    this.menu.onSelect(this.selectionSwitch, this); 
    this.menu.add("Play Again");
    this.menu.add("Back to Main Menu"); 
    this.menu.centerX = this.application.screen.centerX; 
    this.menu.centerY = 190; 


    var winnerText = new rune.text.BitmapField(this.winner + " is the winner!"); 
    winnerText.fontSize = 144;
//   winnerText.autoSize = true; 
     winnerText.x = 120; 
     winnerText.y = 150; 
    this.stage.addChild(winnerText); 

    this.stage.addChild(this.menu); 
};

beehive.scene.GameOverMenu.prototype.initBackground = function() {
    this.background = new rune.display.Graphic (
        0, 
        0, 
        400, 
        225, 
        "gameover"
    ); 
    this.stage.addChild(this.background); 
}; 

beehive.scene.GameOverMenu.prototype.initBackgroundMusic = function () {
    this.backgroundMusic = this.application.sounds.music.get("gameover", true);
    this.backgroundMusic.play();
    this.backgroundMusic.volume = 0.2;
    this.backgroundMusic.loop = true;
}

beehive.scene.GameOverMenu.prototype.selectionSwitch = function (element) {
switch (element.text) {
    case "Play Again":
        this.application.scenes.load([new beehive.scene.Game()]); 
        break; 
    case "Back to Main Menu":
        this.application.scenes.load ([new beehive.scene.Menu()]); 
        break; 
}
}; 

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */

beehive.scene.GameOverMenu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step); 

    if (this.controller1.justPressed(0)) {
        this.menu.select(); 
    }

    if (this.controller1.stickLeftJustDown) {
        this.menu.down();
    }

    if (this.controller1.stickLeftJustUp) {
        this.menu.up(); 
    }

    if (this.controller2.justPressed(0)) {
        this.menu.select(); 
    }

    if (this.controller2.stickLeftJustDown) {
        this.menu.down();
    }

    if (this.controller2.stickLeftJustUp) {
        this.menu.up(); 
    }
}; 

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */

beehive.scene.GameOverMenu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this); 
}; 