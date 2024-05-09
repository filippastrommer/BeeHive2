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
    this.add("50hp", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhsAAAALCAYAAADWbk8PAAAAAXNSR0IArs4c6QAAAyZJREFUeF7tnL9K5UAUhyM2F5sFQYsL+g7b7yMIFumtLbbZYhF8AkHstltfQLGw8BEEsbOx2GpZWG4jayfYKROTOJnNTc7MnDPzixwbbyZzJ/Odk9x8nPxZKd7/XuqPKyNt1mq4j8qAkRLNg+aBKwK6L3FFMm4czUNc/Li+Pdk8NGLx8r0OxfHbf9PutnEFi3OcjhgpA2dovcbSPHiFS6yz5kEstF4Dax68wiXWWfMgFlqvgas8tFJxdHpa/L28LH5cXRVGOMyJ+8vGRjXi9cND1XY2mxXbn9e7W5nPustbziTc5U1n/afu8q+11U7Db6f7/dO/tuVi93GSDD/3nlqGxWIxCYZDa87ubobKUO4/k48IFIbygD5nlDyUJ+FzzsVQnvPNORVDeSM3ZymG8g/5EGTvGHpMf1t3znHsM6MPGMIwn8/pG0jQs2FoZePrzk5xd3vbykUjGsiyYeZWC0clR1NhsGXDMNTJgGYYkg1UBh/ZQGGIkY1cDJyykYpBUjakGFLKBhdDTtkIZUCSjRAGNNloGFrZsOXClR3UyoYrG1NhGJINVAYf2UBhiJGNXAycspGKQVI2pBhSygYXQ07ZCGVAkg0qA7JsUBhUNhqDYbyMorJhaaHw5SyVjfdYS8q3yka30kf5cQ25vKuyMV4/tyuuoXlQ2RiP81gP3zwgy4ZhrW4G7duh7B9W0xHpng1LNgYrNGgMSyob0AxE2YBiCKxsZGVgko2kDEKVDVGGRLLBypCpshHFACIbXgyglQ0SA6Jo2JdRGrH6TzjckzS4bPRKEyLDgGzAMnjIBgxDhGxkY2CUjWQMgrIhxpBQNtgYMspGMAOQbJAZgGVjkAFVNPpkowPSd5JGkw3raRS7EtVKEyrDkqdRoBmIT6NAMfjIhnXXd1aGGNnIxcApG6kYJGVDiiGlbHAx5JSNUAYk2aAyoIuGefLVfg65U+Go37cxdjkp9/q++bfSpAzJ0qN5SBbqwQ1pHjQPXBHQfYkrknHjfJg8LAWp38ERF6a83zZvWlvGl3dm9K0rAz1Wkj01D5LRpY+teaDHSrKn5kEyuvSxJ5WHV4UhHEOmZ3ynAAAAAElFTkSuQmCC");
	this.add("background-Recovered", "data:image/png;base64,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");
	this.add("background", "data:image/png;base64,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");
	this.add("bee", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAAcCAYAAAA6PsAUAAAAAXNSR0IArs4c6QAAAupJREFUeF7tXDt2wyAQRGVK9z6Lr5Cz5gq5kN34JR15fIUQNrPK8gxm3URypPFqmFlWgLQo/KP9oQt+CnTkaLjQRclB3TFA0hkqcn29Xu2Vnk4n8wc9r8bOcLjZBXHxUONplv8H8Ybr5eKXrDP0h7XWWt1uN3W/39X5fOYyh+Cukk9FgbbLKw3TIt5u9IA0gA02fBjNIbiJKQLHhl/mXtn8CqmMANwW244x3q70IMYAVOAPadVwVripMVr1yoyGaxFvK34P4ZKNYVqRqdfYBDwx7sYYjDwEy4+S3bvSA2KMlg13yM1AkhfctmXa2/MbjGFq0Gcm6crNvmZuEW8rHl6FW0xqQEn1qniP6ow9XiOuGuiuSyZ09wg2NfsgmEd6uXfFpd7DvCsPJJ09MkY+nhyGZ0vfp5VNmsVLBAuuY0t46JyHkjGss5bFaVx/K7VcVu3/fCn18en2zbb5hP3EIYLryBAeBuUhv8fQuRHMvm3hizNJ2A6mSfdT03iTRHxG3FRsnPEK7l7E0/Kblz5R/Gl9hBrDiP/3GnuQILTY8+SY/8CN5UgwK1O8grsOwthyb1Z+85EdmyGYBWz5FVyXH4SHMXgQY2x7uJATRMCOiWl5kFJqb4ypS4hkPmtqHuTm24+wZSNI0950Cg+DDqMVJiRleDmUPTLM7so/Bh5kgm8daZAJSW+wwvKg6SYkZUnIc2OUBuhISwsaLrlBl27ELGo2gJXRKO5oPJDilUWEW+nXRNHNIjcfdi3ejSmCMWQRYT1ByLLz8rTNo29JWYcA3Qp311sApkDCbhVvN7iIMY5myRrBgpuUcY0eHx7JGF3pgWwMoEatGWKdRJNnyXdcMPK7wWZ8Npt6zzKkHsQYaLMlz2WDN7E4cvbMN1O5k/6+vAzBs4EmHsQYMUOgoARF2O5TcC1jLV5HQ2gK8qEt4u1GD7Ax5IVrO/GaL1D+yKqb9IThXriWZjRuMXB387G29hvc8U6q2eEvm6SzPxXuKo/LQv0fAAAAAElFTkSuQmCC");
	this.add("bee2", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAAcCAYAAAA6PsAUAAAAAXNSR0IArs4c6QAAAzpJREFUeF7tXDFSw0AMdB4QnkBPBU+gDyUlPRVfoOALfIGSEnqeAF/gA2TIZIYORnYUy4qT0x06ONvrBhxsIe/tSjrdObPKeCxO59906fPbama8xXTZ0OyaHgoXFYdALM9MJCejDy/v9cNenR+7iWOIduWIeweJ4tj0xw4xefnfeuGbwjOzMJ5eP6vlclmt1+vqenHiIg5yGHYbGkhSeBEiJ69z+FsSH4LCYGcZZC9xwG5LW4kF4euZlaXovASXw9/S+ABhGMNqroFj4lLmpMMr8PBjySjsJTgtDI8qIhe+qXajheE1eNrhqdrVwvDCQQuD7XqII5Vsh2JQaXwICiPnwOUAGP526TeFsieU9FN4VguDbjxUf5am5lz+js3uviARyhpjwyGFv7MQCH0p2ZruLbZj1WyxmZI1xmo3dg4zVhxiedYrDNmKkz3lvs9lGpNZpw9g2N1tzQLfbiFEHCqBZzvCYGVdnB3VHj/dr6qLm/nW+8e7VXV525zT73TwuR5kLRTqvMBus3YDHMrGoTPHqEWhhEDndJA45O8sGv4bC0WKhIXhaZcjCv/08hd2m2AHHBoctl0pTl9Mfj3TtwiD7v36aDKITomedrluluL08Bd2m3EDDvNWGNtJ2iZDeBENdttNl5w5NbbWjKwDD9uB3Xbu5hWAO+sYANgf4J15FgJPvTzgReBc+KKUEqUfSgiUUjwVwOR702HDpBOTb9lxRbtWdWI6dTvaqk3ZM0EcsMC3UQIWJNv5ld4eNMWFWWwJOSCMvu5R7NaC/95ise0KGre1/7e/peCLTYSC/SFSpGxGY2Lm2KQZ8leLgs4tL0KF7A4NhxR/se28Ly3s+Sw2mllN57Lbly1CO2stPufytyS7QWGkqC0FXI5mv30bbGj+7ovqv8VBNxGs2SJl7DzeOixt3KKF4QFCTjKUFHUsJIudA1htamFYSiirbYnxWPkAYRjZkEtwucod+VjcVcKXIdjfqQ8KQw6cV3Toi2ZepcMQ/WWfGRcvAhs1n3SZbOF6+cvBpwSemYWBL1zrfvcTscmLEEnMHOFNer3EC1+yG8tfkzBkRPNyVmaNHCTzLh9GyMNJPVIsH34ALWIyBHrYmp0AAAAASUVORK5CYIIA");
	this.add("bee3", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAAcCAYAAAA6PsAUAAAAAXNSR0IArs4c6QAAAsFJREFUeF7tXEFuwjAQDA+gEnf+0P6jHPuNfqGHfqHf4Ej/0b4kqAipt1SLs8SYQHZTr7ROJicIzmgznvGuHYdFhQMMgIErBhZSTuq6bqjtarUSXyPBLg1Xck9o448Brc7EIm+aptnv99XxeKzW67X4uiGKgDvE0Lx+96IHkcApWO6enOYAbid65oL4zZ2VLaxlEa8nPcAYCtVYdRyFEAvNKivnNJxFvFb8jsFVG4M6MVfWiAOeM25sjJw8sOdLGd096UFkDMuOG+NmySAPXNsyber8nozx/LhsPr8Pd03iyc1W8U4Rt29QGyqppsiDVr8LCQlpSpameym2ZvSRYmqz3JRxNXOYKfOg0VmvMYictFyhjNJ3Pm4XZ50+goEb2AIP/nm4MgZ12u7rp9o8PZyi330cqs3r8qz/7fuhenkL3+kzHfydG7GJUqMAN5gCPPjn4WKOceq0xAj0nQ4yR/yZTcO/sVFik7AxcuLGpgNumBuCh/w8nCfcnN5Z/GkpJTEGXftbhwySll45ceNyBLih7AUPeXm4WInikadvOXSMMRgHuF1NnVvAPEgAty3P2grnvwM7jBFlOBg5ZHrwsKxQSiXGsCgpUfp1hiuFX0y+2xU2TOrDSiN4CDxguTYRw0UZgWXr2S4v4wFf6wQ8kOwWCNLtQXN8IIktIXeM0bc6R+c0Wws8bLGIYx7aGe0hXg/8YhNhpH6JKLSb0XjibbFJUxJvn5GxiXD41QlsO7+VFm6c14xmGmgr3DRbDJlCGrNVvF5wRcYYM0pKCAZux5KVIEoyhic9qI0xVKNKDMFtrMRQGq5mDqDhN+Y597vkeLVVOdnUdFxpAraK12pU1/SFtm0pr8tqF0uYB1HGYPCc2SIdzaz+AKAUXK0wp9qeDOdBZ2JjaP+wStpxpeFK7wvtfDGg1ZnYGL5uE9GAAVsG/gAU+m/muTtWawAAAABJRU5ErkJgggAA");
	this.add("beehive", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAb9JREFUSEulljFLQzEQx/M2i4vQsYN0E4R+BCm4ObsLTkInv4CCH0FwrGAHXZxdW5wcXQTBoQh2rJvUrfJPcuFyuSRPzdI+kne/5P53/7zGVMZwd3NdWjJ7+WpK88VJBL8+60bv97d79nn+vrC/xxdLU4KoANo1BaegpmPM/HVh8Hx1swzg+0cH00AJQO7aBu8oSVi5UzzMNiKQhEQACs53XNPIrNyKXMoCINn5jst1q+EhBOK6RIDpeODiaSmpkXzKpPAWgN0f7vXMwfDbhum33T0LyrVADAgPPZqcqKiWy7u1eX77TPY+vfUnlTNMDwABCQBZLafnH2pwihkgCCpT6k8GLaITAIJqQIqqgPHArRWNJ8vWApB/DGhAJ6kB0ITZcl4Z24ghRSQwT1NrgFJx0C/SIABY9fwZwDo8PcF/AaJsIwA0GJ1459zar7WVs4enSdAMlkF2QUJbADWatGVJkM1HeR4ddRPTixqNAiVGRxMtbAMwGiQuuapqdlmLziWu4KiJXWslWxTE554uIfIgeke9cCKI5q7CnrmoxQuH64H/EiRvMFr/qyuTpyN7CWW8X0tl8auCSrikQe2z5QeruUDQeUAAmAAAAABJRU5ErkJgggAA");
	this.add("block", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABRJREFUGFdjZGBg+M/AwMDACGMAABMaAgGSv1r4AAAAAElFTkSuQmCC");
	this.add("health", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkkAAAALCAYAAABrjxl6AAAAAXNSR0IArs4c6QAAA2JJREFUeF7tnL9u00Acx126VFmoKpUhEn0DHgCJR+jmgaXqzMAAA0LiCZBQNzb6Au3UoQMPgISyVd2YWCBCygx0QUXn2Jdzcne+O//+RfplqeM650+/+bn++M7nnWr1um8XdwbWOb9mX1Rmmq9Ac9acQwlobWhtaG3Q1IDmzJBzJ0T3b9qdf1j+NOvX1zHgbeyyJ3DKjPaVaM5o0fYa1pw151ACWhtaG1obNDUQzdnK0Pvz8+rH1VX18fq6MqJkBOTZ4WHz4S+LRbPuYm/PNnb0ZLpq+MjZx+PA8iNn/cPV8rfJrn3z3dnk9sEf++7v4l+z/Pn5r57ASWaenSwvsOfzuWjmT6e/NwpEIvM7D6cLLoW5fnGXfFhzMtdv0zk5c67PyjipmevL8ZwUzPVXWE4s5vonHick8+uDg+TjHWrDkv8b06lzvoYCyWhnm5mtJL08Pq5uZjMrRZ0gSZIkR5QaiZPM3EmSI0oimX2SJJF5SJKkMOdIEidzqSRRM0NIEgUztCRhMWNKEiQzlSSNZeaQpBJmbknaZmYrSa4UrQuilJ6kdUmSzBySJGnMKZIkgTlXkriYx0gSJTOUJGEzY0gSBjO2JEExU0rSGGYuScplliBJKczSJGmbmFWSjHkhDBGqJLWqDTQUq5IEO+StkuQfKyi9IFRJWubZDqv0btfwJT2Us0pSfCwrN2eVpIyxQWdTk3Pvxm2f3XXF/Gp/v3p6txon5rgnyelJisqdBGaPJIlkHuhJEsOcIUmszIU9SeTMAJJEwgzck4TGjChJoMxEPUmjmRkkqYiZuScpmflyMimzBMBPrd+XFPMNCVLXSf/GDArfvUhGkMxLmCQZpGYGnkTmgCSJY06QJBHMmZLExjxCkkiZgSQJnRlBklCYkSUJjJlQkkYxM0lSNrMASUpiFiZJUWYpguSTpB642xvTySS3JDmz21y/taIkidkzu00k88DsNjHMQ5LkXKWwMudIEidzqSRRM0NIEgUztCRhMWNKEiQzlSSNZeaQpBJmbklKZZYmSOZxSG5PUndyaaSjfV4SYGcbSFM+Xit3ygySsWlEcwaLMtqQ5qw5hxLQ2tDa0NqgqYFozsEDMXKi5MUO7908mCj09ygzXAKaM1yWsZY0Z805lIDWhtaG1gZNDVT/AVdcPVLahNvUAAAAAElFTkSuQmCC");
	this.add("honeycomb1", "./../asset/png/honeycomb1.png");
	this.add("honeycomb2", "./../asset/png/honeycomb2.png");
	this.add("honeycomb3", "./../asset/png/honeycomb3.png");
	this.add("honeycomb_full", "./../asset/png/honeycomb_full.png");
	this.add("nectar", "./../asset/png/nectar.png");
	this.add("small_beehive", "./../asset/png/small_beehive.png");
	this.add("tempBackground", "./../asset/png/tempBackground.png");
};