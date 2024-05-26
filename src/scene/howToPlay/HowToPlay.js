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
    this.menu.x = 235; 
    this.menu.centerY = 190; 
    this.stage.addChild(this.menu); 



    var shoot = new rune.text.BitmapField("- Shoot opponents and honeycombs"); 
    shoot.autoSize = true; 
    shoot.x = 190; 
    shoot.y = 35; 

    var shootLine = new rune.display.Graphics();
    this.stage.addChild(shootLine);

    shootLine.drawLine(
        150, 
        60,  
        shoot.x,
        shoot.y, 
        "#FFFFFF", 
        2 
    );


//     var move = new rune.text.BitmapField("- Move with the left joystick");
//     move.autoSize = true; 
//     move.x = 190; 
//     move.y = 65; 

//     var health = new rune.text.BitmapField("- Collision with birds give -5 hp, \ncollision with bullet gives -1 hp"); 
//     health.autoSize = true; 
//     health.x = 190; 
//     health.y = 80; 

//     honeycombs = new rune.text.BitmapField("- Shoot apart the opponents \nhoneycombs to win. Honeycombs have \n20 health and bullets give -1hp"); 
//     honeycombs.autoSize = true; 
//     honeycombs.x = 190; 
//     honeycombs.y = 110; 

//     repair = new rune.text.BitmapField("- Repair and place new honeycombs \nby pressing B for 3s"); 
//     repair.autoSize = true; 
//     repair.x = 190; 
//     repair.y = 150; 

//     var beekeeperText = new rune.text.BitmapField("-5hp on one Honeycomb"); 
//     beekeeperText.autoSize = true; 
//     beekeeperText.x = 45; 
//     beekeeperText.y = 123; 

  
//    var x2Text = new rune.text.BitmapField("Bullets damage doubles"); 
//    x2Text.autoSize = true; 
//    x2Text.x = 35; 
//    x2Text.y = 160; 

   

//    shieldText = new rune.text.BitmapField("Gives shield for Honeycombs"); 
//    shieldText.autoSize = true; 
//    shieldText.x = 35; 
//    shieldText.y = 190; 


//     this.stage.addChild(title); 
//     this.stage.addChild(shoot); 
//     this.stage.addChild(move); 
//     this.stage.addChild(health); 
//     this.stage.addChild(honeycombs);
//     this.stage.addChild(repair);


//     this.stage.addChild(beekeeperText); 
//     this.stage.addChild(x2Text);
//     this.stage.addChild(shieldText); 
 
}; 

beehive.scene.HowToPlay.prototype.initGraphics = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        400, 
        225, 
        "howtoplay"
        ); 

        this.stage.addChild(this.background); 

        this.controllerImg = new rune.display.Graphic(
            115, 
            35, 
            160, 
            80, 
            "controller"
        ); 
        this.stage.addChild(this.controllerImg); 

        // this.beekeeper = new rune.display.Graphic(
        //     10, 
        //     110, 
        //     30, 
        //     35, 
        //     "beekeeper"
        // ); 
        // this.stage.addChild(this.beekeeper); 

        // this.x2Bullets = new rune.display.Graphic(
        //     15, 
        //     155, 
        //     20, 
        //     20, 
        //     "x2"
        // ); 
        // this.stage.addChild(this.x2Bullets); 

        // this.shield = new rune.display.Graphic(
        //     10, 
        //     185, 
        //     20, 
        //     20, 
        //     "shieldpower"
        // ); 
        // this.stage.addChild(this.shield); 
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
