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

beehive.scene.Menu = function() {
    this.menu = null; 
    this.controller1 = this.gamepads.get(0);
    this.controller2 = this.gamepads.get(1);    
    this.background = null; 


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

beehive.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype); 
beehive.scene.Menu.prototype.constructor = beehive.scene.Menu; 


//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */

beehive.scene.Menu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this); 

    this.initBackground(); 
    this.menu = new rune.ui.VTMenu(); 
    this.menu.onSelect(this.selectionSwitch, this); 
    this.menu.add("Start Game"); 
    this.menu.add("How to Play"); 
    this.menu.centerX = this.application.screen.centerX; 
    this.menu.centerY = 135; 

    this.stage.addChild(this.menu); 
}; 

beehive.scene.Menu.prototype.initBackground = function () {
this.background = new rune.display.Graphic (
    0,
    0,
    400,
    225,
    "start"
); 
this.stage.addChild(this.background); 
};

beehive.scene.Menu.prototype.selectionSwitch = function (element) {
    switch (element.text) {
        case "Start Game":
        this.application.scenes.load([new beehive.scene.Game()]); 
        break;

        case "How to Play": 
        this.application.scenes.load([new beehive.scene.HowToPlay()]);
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

beehive.scene.Menu.prototype.update = function (step) {
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


beehive.scene.Menu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
}; 