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

beehive.scene.HowToPlay = function () {
    this.menu = null; 
    this.controller1 = this.gamepads.get(0); 
    this.background = null; 
    this.controllerImg = null; 
    this.beekeeper = null; 
    this.birds = null; 
    this.powerups = null; 

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------


beehive.scene.HowToPlay.prototype = Object.create(rune.scene.Scene.prototype); 
beehive.scene.HowToPlay.prototype.constructor = beehive.scene.HowToPlay; 

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */

beehive.scene.HowToPlay.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this); 

    this.initGraphics(); 
    this.menu = new rune.ui.VTMenu(); 
    this.menu.onSelect(this.selectionSwitch, this); 
    this.menu.add("Start Game"); 
    this.menu.add("Back to Main Menu"); 
    this.menu.x = 20; 
    this.menu.centerY = 30; 

    this.stage.addChild(this.menu); 

    var title = new rune.text.BitmapField("Welcome to Beehive!"); 
    title.autoSize = true; 
    title.x = 200;
    title.y = 45; 

    // var shoot = new rune.text.BitmapField("Shoot opponents and honeycombs by pressing A"); 
    // shoot.autoSize = true; 
    // shoot.x = 100; 
    // shoot.y = 60; 

    // var move = new rune.text.BitmapField("Move with the left joystick");
    // move.autoSize = true; 
    // move.x = 200; 
    // move.y = 75; 



    // this.stage.addChild(title); 
    // this.stage.addChild(shoot); 
    // this.stage.addChild(move); 
}; 

beehive.scene.HowToPlay.prototype.initGraphics = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        400, 
        225, 
        "tempBackground"
        ); 

        this.stage.addChild(this.background); 
}

beehive.scene.HowToPlay.prototype.selectionSwitch = function (element) {
    switch (element.text) {
        case "Start Game":
            this.application.scenes.load([new beehive.scene.Game()]);
            break; 

            case "Back to Main Menu": 
            this.application.scenes.load([new beehive.scene.Menu()]); 
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

beehive.scene.HowToPlay.prototype.update = function (step) {
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
}; 

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */

beehive.scene.HowToPlay.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
}; 
