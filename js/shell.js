

class Shell extends Particle {

    constructor(screenWidth, screenHeight, yVel, trailLen) {
        var x, y, gravity
        x = 10 + Math.floor(Math.random() * screenWidth - 20) 
        y = screenHeight

        var xVelScale = screenWidth;
        var gravity = 350;
        var xVel = 0
        if (x < (screenWidth * 0.33)) {
            xVel =  Math.random() * (xVelScale / 8)
        } else if (x > screenWidth * 0.66) {
            xVel = Math.random() * (-xVelScale / 8)
        } else {
            xVel = (-xVelScale / 32) + Math.random() * (- xVelScale / 16)
        }    
        var radius = 2.5

        super(x, y, radius, screenWidth, screenHeight, xVel, yVel, gravity, trailLen);

        this.alpha = 0.66 + (Math.random() * 0.33)
    }

    remove() {
        return this.yVel > -50 || this.y < -30
    }

    update(delta) {
        var oxAccel = this.xAccel;
        var oyAccel = this.yAccel;
        this.yAccel = this.gravity;
        var oxVel = this.xVel;
        var oyVel = this.yVel;
        this.xVel += (oxAccel + this.xAccel) * 0.5 * delta;
        this.yVel += (oyAccel + this.yAccel) * 0.5 * delta;
        this.x += (oxVel + this.xVel) * 0.5 * delta;
        this.y += (oyVel + this.yVel) * 0.5 * delta;

        this.trailPct += (delta / this.fullTrailLen)
        if (this.trailPct > 1) {
            this.trailPct = 1;
        }
    }

    draw(ctx) {
        ctx.save()
        var style = "rgb(255,255,255)";
        ctx.fillStyle = style;
        ctx.strokeStyle = ctx.fillStyle
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.xVel * this.trailLen, this.y - this.ytVel * this.trailLen)
        ctx.lineWidth = this.radius;
        ctx.stroke();
        ctx.globalAlpha = this.alpha
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.scale(1,1);
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }


}

