function Poinky(x, y, effect, world) {
    var that = this;

    //Config
    this.effect = effect;
    /// <var type="CANNON.World"/>
    
    this.world = world;
    //changing those values change the shape of Poinky
    this.baseBallStrength = 1.4;
    this.midBallStrength = .8;
    this.topBallStrength = 0.4;

    //Create physics
    this.material = new CANNON.Material("poinkyMaterial");

    this.baseBall = new CANNON.Body({ mass: 10, material: this.material });
    this.baseBall.addShape(new CANNON.Sphere(5));
    this.baseBall.position.set(x, y + 5, 0);
    this.baseBall.fixedRotation = true;
    this.world.add(this.baseBall);


    this.midMaterial = new CANNON.Material("midMaterial");
    this.midBall = new CANNON.Body({ mass: 0.1, material: this.midMaterial });
    this.midBall.addShape(new CANNON.Sphere(5));
    this.midBall.position.set(x, y + 15, 0);
    this.midBall.fixedRotation = true;
    this.world.add(this.midBall);

    this.spring = new CANNON.Spring(this.baseBall, this.midBall, {
        localAnchorA: new CANNON.Vec3(0, 5, 0),
        localAnchorB: new CANNON.Vec3(0, 0, 0),
        restLength: 5,
        stiffness: 150,
        damping: 0.5,
    });

    this.world.addEventListener("postStep", function (event) {
        that.spring.applyForce();
    });


    var flipper = -2000; // :D
    function jump() {
        that.baseBall.applyImpulse(new CANNON.Vec3(flipper = -flipper, 800, 0), that.baseBall.position);
    }

    setTimeout(function () {
        setInterval(jump, 2000);
    }, 2000);

    //this.hinge = new CANNON.HingeConstraint(this.baseBall, this.midBall, {
    //    pivotA: new CANNON.Vec3(0, 5, 0),
    //    pivotB: new CANNON.Vec3(0, 0, 0),
    //    axisA: new CANNON.Vec3(1, 0, 0)
    //});
    //this.world.addConstraint(this.hinge);

    var baseBallPosition, midBallPosition, topBallPosition;

    this.update = function () {
        //Physics
        this.midBall.applyForce(new CANNON.Vec3(2, 150, 0), this.midBall.position);
        this.baseBall.updateMassProperties();
        this.midBall.updateMassProperties();

        //Marching Balls
        baseBallPosition = new three.Vector3(this.baseBall.position.x, this.baseBall.position.y, this.baseBall.position.z);
        this.effect.worldToLocal(baseBallPosition);
        baseBallPosition.x = (baseBallPosition.x + 1) / 2;
        baseBallPosition.y = (baseBallPosition.y + 1) / 2;
        baseBallPosition.z = (baseBallPosition.z + 1) / 2;

        midBallPosition = new three.Vector3(this.midBall.position.x, this.midBall.position.y - 5, this.midBall.position.z);
        this.effect.worldToLocal(midBallPosition);
        midBallPosition.x = (midBallPosition.x + 1) / 2;
        midBallPosition.y = (midBallPosition.y + 1) / 2;
        midBallPosition.z = (midBallPosition.z + 1) / 2;

        topBallPosition = new three.Vector3(this.midBall.position.x, this.midBall.position.y, this.midBall.position.z);
        this.effect.worldToLocal(topBallPosition);
        topBallPosition.x = (topBallPosition.x + 1) / 2;
        topBallPosition.y = (topBallPosition.y + 1) / 2;
        topBallPosition.z = (topBallPosition.z + 1) / 2;

        x = this.baseBall.x;
        y = this.baseBall.y + 5;
        z = this.baseBall.z;
    }

    this.draw = function () {

        this.effect.position.x = this.baseBall.position.x;
        this.effect.position.z = this.baseBall.position.z;

        this.effect.addBall(
            topBallPosition.x,
            topBallPosition.y,
            topBallPosition.z,
            this.topBallStrength, 12
            );
        this.effect.addBall(
            midBallPosition.x,
            midBallPosition.y,
            midBallPosition.z,
            this.midBallStrength, 12
            );
        this.effect.addBall(
            baseBallPosition.x,
            baseBallPosition.y,
            baseBallPosition.z,
            this.baseBallStrength, 12
            );
    }

    this.update();
}