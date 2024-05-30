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
    // this.menu = null; 
    // this.controller1 = this.gamepads.get(0); 
    // this.controller2 = this.gamepads.get(1);
    // this.background = null; 
    // this.controllerImg = null; 
    // this.beekeeper = null; 
    // this.birds = null; 
    // this.powerups = null; 
    // this.beekeeper = null; 
    // this.x2Bullets = null; 
    // this.shield = null; 


    this.menu = null; 
    this.controller1 = this.gamepads.get(0); 
    this.controller2 = this.gamepads.get(1);
    this.background = null; 
    this.controllerImg = null; 
    this.beekeeper = null; 
    this.birds = null; 
    this.powerups = null; 
    this.beekeeper = null; 
    this.x2Bullets = null; 
    this.shield = null; 

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
    this.menu.x = 25; 
    this.menu.centerY = 190; 
    this.stage.addChild(this.menu); 

    var goal = new rune.text.BitmapField("- Destroy the opponents \nhoneycombs to win."); 
    goal.autoSize = true; 
    goal.x = 220; 
    goal.y = 52; 

    var health = new rune.text.BitmapField("- You lose 1hp when \nhit by the opponent's \nbullet and 5hp when \nyou collide with a bird."); 
    health.autoSize = true; 
    health.x = 220; 
    health.y = 80; 

    // honeycombs = new rune.text.BitmapField("- Destroy all your opponent's \nhoneycombs to win the game!"); 
    // honeycombs.autoSize = true; 
    // honeycombs.x = 220; 
    // honeycombs.y = 55; 


    var beekeeperText = new rune.text.BitmapField("-5 hp on one Honeycomb"); 
    beekeeperText.autoSize = true; 
    beekeeperText.x = 255; 
    beekeeperText.y = 133; 

  
   var x2Text = new rune.text.BitmapField("Double damage"); 
   x2Text.autoSize = true; 
   x2Text.x = 255; 
   x2Text.y = 161; 

   

   shieldText = new rune.text.BitmapField("Shields honeycombs"); 
   shieldText.autoSize = true; 
   shieldText.x = 255; 
   shieldText.y = 183; 

   slowText = new rune.text.BitmapField("Opponent moves slower"); 
   slowText.autoSize = true; 
   slowText.x = 255; 
   slowText.y = 207; 


   this.stage.addChild(beekeeperText); 
   this.stage.addChild(x2Text);
   this.stage.addChild(shieldText);
   this.stage.addChild(slowText); 
   this.stage.addChild(health); 
   this.stage.addChild(goal); 


 
}; 

beehive.scene.HowToPlay.prototype.initGraphics = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        400, 
        225, 
        "htp"
        ); 

        this.stage.addChild(this.background); 

    

        this.beekeeper = new rune.display.Graphic(
            220, 
            118, 
            30, 
            35, 
            "beekeeper"
        ); 
        this.stage.addChild(this.beekeeper); 

        this.x2Bullets = new rune.display.Graphic(
            227, 
            157, 
            20, 
            20, 
            "x2"
        ); 
        this.stage.addChild(this.x2Bullets); 

        this.shield = new rune.display.Graphic(
            224, 
            177, 
            20, 
            20, 
            "shield_PU"
        ); 
        this.stage.addChild(this.shield); 

        this.slow = new rune.display.Graphic(
            223, 
            201, 
            22, 
            26, 
            "slow"
        ); 
        this.stage.addChild(this.slow); 

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

beehive.scene.HowToPlay.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
}; 
