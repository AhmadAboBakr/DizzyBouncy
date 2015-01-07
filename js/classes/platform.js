function Platform(x, y, z, width, height, depth, world, physicsMaterial, scene) {
    var that = this;

    //Config
    this.x = x;
    this.y = y;
    this.z = z;

    this.width = width;
    this.height = height;
    this.depth = depth;

    this.world = world;
    this.scene = scene;

    //Create physics
    this.physicsMaterial = physicsMaterial || new CANNON.Material("platformMaterial");

    this.body = new CANNON.Body({ mass: 0, material: this.physicsMaterial });
    this.body.addShape(new CANNON.Box(new CANNON.Vec3(this.width, this.height, this.depth)));
    this.body.position.set(this.x, this.y, this.z);
    this.body.fixedRotation = true;
    this.world.add(this.body);

    //Create display
    this.material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    this.update = function () {
        //this.midBall.applyForce(new CANNON.Vec3(0, 0, -20), this.midBall.position);
        this.body.updateMassProperties();
    }

    this.draw = function () {
        this.mesh.position.copy(this.body.position);
        //nothing so far
    }

}