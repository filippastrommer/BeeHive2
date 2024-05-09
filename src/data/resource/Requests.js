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
	this.add("health", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkkAAAALCAYAAABrjxl6AAAAAXNSR0IArs4c6QAAA2JJREFUeF7tnL9u00Acx126VFmoKpUhEn0DHgCJR+jmgaXqzMAAA0LiCZBQNzb6Au3UoQMPgISyVd2YWCBCygx0QUXn2Jdzcne+O//+RfplqeM650+/+bn++M7nnWr1um8XdwbWOb9mX1Rmmq9Ac9acQwlobWhtaG3Q1IDmzJBzJ0T3b9qdf1j+NOvX1zHgbeyyJ3DKjPaVaM5o0fYa1pw151ACWhtaG1obNDUQzdnK0Pvz8+rH1VX18fq6MqJkBOTZ4WHz4S+LRbPuYm/PNnb0ZLpq+MjZx+PA8iNn/cPV8rfJrn3z3dnk9sEf++7v4l+z/Pn5r57ASWaenSwvsOfzuWjmT6e/NwpEIvM7D6cLLoW5fnGXfFhzMtdv0zk5c67PyjipmevL8ZwUzPVXWE4s5vonHick8+uDg+TjHWrDkv8b06lzvoYCyWhnm5mtJL08Pq5uZjMrRZ0gSZIkR5QaiZPM3EmSI0oimX2SJJF5SJKkMOdIEidzqSRRM0NIEgUztCRhMWNKEiQzlSSNZeaQpBJmbknaZmYrSa4UrQuilJ6kdUmSzBySJGnMKZIkgTlXkriYx0gSJTOUJGEzY0gSBjO2JEExU0rSGGYuScplliBJKczSJGmbmFWSjHkhDBGqJLWqDTQUq5IEO+StkuQfKyi9IFRJWubZDqv0btfwJT2Us0pSfCwrN2eVpIyxQWdTk3Pvxm2f3XXF/Gp/v3p6txon5rgnyelJisqdBGaPJIlkHuhJEsOcIUmszIU9SeTMAJJEwgzck4TGjChJoMxEPUmjmRkkqYiZuScpmflyMimzBMBPrd+XFPMNCVLXSf/GDArfvUhGkMxLmCQZpGYGnkTmgCSJY06QJBHMmZLExjxCkkiZgSQJnRlBklCYkSUJjJlQkkYxM0lSNrMASUpiFiZJUWYpguSTpB642xvTySS3JDmz21y/taIkidkzu00k88DsNjHMQ5LkXKWwMudIEidzqSRRM0NIEgUztCRhMWNKEiQzlSSNZeaQpBJmbklKZZYmSOZxSG5PUndyaaSjfV4SYGcbSFM+Xit3ygySsWlEcwaLMtqQ5qw5hxLQ2tDa0NqgqYFozsEDMXKi5MUO7908mCj09ygzXAKaM1yWsZY0Z805lIDWhtaG1gZNDVT/AVdcPVLahNvUAAAAAElFTkSuQmCC");
	this.add("honeycomb1", "./../asset/png/honeycomb1.png");
	this.add("honeycomb2", "./../asset/png/honeycomb2.png");
	this.add("honeycomb3", "./../asset/png/honeycomb3.png");
	this.add("honeycomb_full", "./../asset/png/honeycomb_full.png");
	this.add("nectar", "./../asset/png/nectar.png");
	this.add("small_beehive", "./../asset/png/small_beehive.png");
	this.add("tempBackground", "./../asset/png/tempBackground.png");
};