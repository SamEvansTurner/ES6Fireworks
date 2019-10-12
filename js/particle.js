

class Particle {

    constructor(x, y, radius, screenWidth, screenHeight, xVel, yVel, gravity, trailLen) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.gravity = gravity;
        this.trailLen = trailLen
        this.xVel = xVel;
        this.yVel = yVel;

        this.xAccel = 0;
        this.yAccel = 0;
        this.xtVel = 0;
        this.ytVel = 0;

        this.maxX = screenWidth;
        this.maxY = screenHeight;

        //percentage of the trail to show
        //used to fix the weird ugliness in the first few frames
        this.trailPct = 0;
        //time until the trail len is at full value (seconds)
        this.fullTrailLen = 0.5;
    }

    remove() {
        return (
            this.x < 0 ||
            this.x > this.maxX ||
            this.y < 0 || 
            this.y > this.maxY
        )
    }

    update(delta) {
        this.xtVel = this.xVel
        this.ytVel = this.yVel
        this.yAccel = this.gravity;
        this.xVel += (this.xAccel) * delta;
        this.yVel += (this.yAccel) * delta;
        this.x += (this.xtVel + this.xVel) * 0.5 * delta;
        this.y += (this.ytVel + this.yVel) * 0.5 * delta;
        this.trailPct += (delta / this.fullTrailLen)
        if (this.trailPct > 1) {
            this.trailPct = 1;
        }
    }

    draw(ctx, colour, alpha, trailAlpha) {
        //colour is a string like h,s%,l%.
        ctx.save();
        ctx.fillStyle =  colour;
        ctx.strokeStyle = ctx.fillStyle
        ctx.globalAlpha = trailAlpha;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.xtVel * this.trailLen * this.trailPct, this.y - this.ytVel * this.trailLen * this.trailPct)
        ctx.lineWidth = this.radius;
        ctx.stroke();
        ctx.globalAlpha = alpha;
        ctx.translate(this.x, this.y);
        ctx.scale(1, 1)
        //ctx.drawImage(this.sprite, -0.5, -0.5, 1, 1);
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }


}
