function Poinky(baseBall, midBall, effect) {
    this.baseBall = baseBall;
    this.midBall = midBall;
    this.effect = effect
    this.baseBallStrength = 1.2;
    this.midBallStrength = .8;
    this.topBallStrength = 0.4;
    var baseBallPosition, midBallPosition, topBallPosition;
    this.update = function () {
        baseBallPosition = new three.Vector3(baseBall.position.x, baseBall.position.y, baseBall.position.z);
        this.effect.worldToLocal(baseBallPosition);
        baseBallPosition.x = (baseBallPosition.x + 1) / 2;
        baseBallPosition.y = (baseBallPosition.y + 1) / 2;
        baseBallPosition.z = (baseBallPosition.z + 1) / 2;

        midBallPosition = new three.Vector3(midBall.position.x, midBall.position.y-5, midBall.position.z);
        this.effect.worldToLocal(midBallPosition);
        midBallPosition.x = (midBallPosition.x + 1) / 2;
        midBallPosition.y = (midBallPosition.y + 1) / 2;
        midBallPosition.z = (midBallPosition.z + 1) / 2;

        topBallPosition = new three.Vector3(midBall.position.x, midBall.position.y, midBall.position.z);
        this.effect.worldToLocal(topBallPosition);
        topBallPosition.x = (topBallPosition.x + 1) / 2;
        topBallPosition.y = (topBallPosition.y + 1) / 2;
        topBallPosition.z = (topBallPosition.z + 1) / 2;
    }
    this.draw = function () {
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