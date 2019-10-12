

class Spark extends Particle {

    constructor(x, y, colour, screenWidth, screenHeight, gravity, trailLen, velFactor, timeToLive) {
        var angle = Math.random() * (Math.PI * 2);
        var xVel = Math.cos(angle) * velFactor;
        var yVel = Math.sin(angle) * velFactor;
        var radius = 1;

        super(x, y, radius, screenWidth, screenHeight, xVel, yVel, gravity, trailLen, timeToLive);
        this.colour = colour;
        this.timeLeft = timeToLive;
        this.lifespan = timeToLive;
    }

    remove() {
        return (
            this.x < 0 ||
            this.x > this.maxX ||
            this.y < 0 ||
            this.y > this.maxY ||
            this.timeLeft == 0
        )
    }

    update(delta) {
        this.lastTimeLeft = this.timeLeft;
        this.timeLeft -= delta;
        if (this.timeLeft < 0) {
            this.timeLeft = 0;
        }
        super.update(delta);
    }

    draw(ctx) {
        var alpha = this.timeLeft / this.lifespan;
        var trailAlpha = this.lastTimeLeft / this.lifespan;
        var colour = "hsl(" + this.colour + ")"
        super.draw(ctx, colour, alpha, trailAlpha);
    }


}
