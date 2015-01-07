//Assumes the whole game is set around the world center (0,0,0)
function PlatformManager(sceneWidth, sceneDepth, world, platformsMaterial, scene) {
    var that = this;

    //Config
    this.sceneWidth = sceneWidth;
    this.sceneDepth = sceneDepth;

    this.world = world;
    this.scene = scene;

    this.platformsMaterial = platformsMaterial || new CANNON.Material("platformMaterial");

    //Globals
    this.scrollSpeed = 0.5;
    this.sidewaySpeed = 30;
    this.platformsGap = 40;

    //Platforms array
    this.platforms = [];


    function createPlatform() {
        //calculate position from gap
        var zPos = that.platforms.length == 0 ? -sceneWidth / 2 : that.platforms[that.platforms.length - 1].z - that.platformsGap;
        that.platforms.push(new Platform(0, -12, zPos, 30, 3, 12, world, platformsMaterial, scene));
        console.log("created a platform", zPos);
    }

    function shouldCreate() {
        return that.platforms.length == 0 || that.platforms[that.platforms.length - 1].z > (-sceneDepth / 2 + that.platformsGap);
    }

    function shouldDestory() {
        return that.platforms[0].z > sceneDepth / 2;
    }

    function destoryPlatform() {
        //Optimize by moving the cube back instead of deleting it and creating a new one
        that.platforms[0].remove();
        that.platforms.splice(0, 1);
    }

    function updatePlatforms() {
        //if no platforms or gap is achieved create a platform
        if (shouldCreate())
            createPlatform();

        while(shouldDestory())
            destoryPlatform();
    }

    this.update = function () {
        updatePlatforms();
        for (var i = 0; i < this.platforms.length; i++) {
            this.platforms[i].translate(0, 0, this.scrollSpeed);
            this.platforms[i].update();
        }
    }
    this.movePlatforms = function (x) {
        for (var i = 0; i < this.platforms.length; i++) {
            this.platforms[i].translate(x, 0, 0);
            this.platforms[i].update();
        }

    }
    this.draw = function () {
        for (var i = 0; i < this.platforms.length; i++)
            this.platforms[i].draw();
    }

}