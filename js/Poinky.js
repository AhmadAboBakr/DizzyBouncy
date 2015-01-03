function Poinky(baseBall, midBall, effect) {
    this.baseBall = baseBall;
    this.midBall = midBall;
    this.effect = effect
    this.baseBallStrength = 1.2;
    this.midBallStrength = .8;
    var baseBallPosition, midBallPosition;
    this.update = function () {
        baseBallPosition = new three.Vector3(midBall.position.x, midBall.position.y, midBall.position.z);
        this.effect.worldToLocal(baseBallPosition);
        baseBallPosition.x = (baseBallPosition.x + 1) / 2;
        baseBallPosition.y = (baseBallPosition.y + 1) / 2;
        baseBallPosition.z = (baseBallPosition.z + 1) / 2;

        midBallPosition = new three.Vector3(midBall.position.x, midBall.position.y, midBall.position.z);
        this.effect.worldToLocal(midBallPosition);
        midBallPosition.x = (midBallPosition.x + 1) / 2;
        midBallPosition.y = (midBallPosition.y + 1) / 2;
        midBallPosition.z = (midBallPosition.z + 1) / 2;
    }
    this.draw = function () {
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
}