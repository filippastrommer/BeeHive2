//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new Requests object.
 * 
 * @constructor
 * @extends rune.resource.Requests
 * 
 * @class
 * @classdesc
 * 
 * This class includes (bakes) resource files used by the application. A 
 * resource file is made available by reference (URI) or base64-encoded string. 
 * Tip: Use Rune-tools to easily bake resource files into this class.
 */
beehive.data.Requests = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.resource.Requests
     */
    rune.resource.Requests.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

beehive.data.Requests.prototype = Object.create(rune.resource.Requests.prototype);
beehive.data.Requests.prototype.constructor = beehive.data.Requests;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
beehive.data.Requests.prototype.m_construct = function() {
    rune.resource.Requests.prototype.m_construct.call(this);
    this.add("background-Recovered", "./../asset/png/background-Recovered.png");
	this.add("background", "./../asset/png/background.png");
	this.add("bee", "./../asset/png/bee.png");
	this.add("bee2", "./../asset/png/bee2.png");
	this.add("bee3", "./../asset/png/bee3.png");
	this.add("beehive", "./../asset/png/beehive.png");
	this.add("birdtest", "./../asset/png/birdtest.png");
	this.add("block", "./../asset/png/block.png");
	this.add("healthbartest", "./../asset/png/healthbartest.png");
	this.add("honeycomb", "./../asset/png/honeycomb.png");
	this.add("honeycomb1", "./../asset/png/honeycomb1.png");
	this.add("honeycomb2", "./../asset/png/honeycomb2.png");
	this.add("honeycomb3", "./../asset/png/honeycomb3.png");
	this.add("honeycomb_full", "./../asset/png/honeycomb_full.png");
	this.add("nectar", "./../asset/png/nectar.png");
	this.add("small_beehive", "./../asset/png/small_beehive.png");
	this.add("tempBackground", "./../asset/png/tempBackground.png");
};