class Controller {

    constructor(canvas, ctx) {
        this.shells = [];
        this.maxShells = 8;
        this.initialShells = 5;

        this.sparks = [];
        this.shell_sparksMin = 200;
        this.shell_sparksMax = 300;

        this.whiteChance = 1/15;

        this.minColours = 6;
        this.maxColours = 10;

        this.canvas = canvas;
        this.ctx = ctx;

        this.width = canvas.width
        this.height = canvas.height

        var yVelScale = this.height / 1.3;
        var yVel = -yVelScale + Math.random() * (yVelScale / 4)

        for (var i = 0; i < this.initialShells; i++) {
            yVel += (-Math.random() + (Math.random() * 2)) * (yVelScale / 30)
            this.shells.push(new Shell(this.width, this.height, yVel))
        }
    }

    update(delta) {

        delta = delta / 16;

        if (this.shells.length < this.maxShells &&
            (Math.random()) < (delta)) {
                var numShells = 1 + Math.floor(Math.random() * 5);
                var yVelScale = this.height / 1.3;
                var yVel = -yVelScale + Math.random() * (yVelScale / 4)
                for (var i = 0; i < numShells; i ++) {
                    yVel += (-Math.random() + (Math.random() * 2)) * (yVelScale / 30)
                    this.shells.push(new Shell(this.width, this.height, yVel))
                }
        }


        for (var i = this.shells.length - 1; i >= 0; i--) {
            var shell = this.shells[i];

            if (shell.remove()) {
                const numSparks = this.shell_sparksMin + Math.floor(Math.random() * (this.shell_sparksMax - this.shell_sparksMin));
                const colours = [];
                const numColours = this.minColours + Math.round(Math.random() * (this.maxColours - this.minColours));

                // Choose a random set of colors for a shell when it explodes
                var startHue = Math.floor(Math.random() * 361)
                for (var c = 0; c < numColours; c++) {
                    var lightness
                    // Some percentage of the time, bump saturation to 0 to get some white sparks
                    if (Math.random() < this.whiteChance && numColours > 2) {
                        lightness = 100;
                    } else {
                        lightness = 60 + Math.floor(Math.random() * 20);
                    }
                    var hue = startHue + (-5 * Math.random() * 10);

                    colours.push("" + hue + ", 100%, " + lightness + "%");
                }
             
                for (var s = 0; s < numSparks; s++) {
                    const colour = colours[Math.floor(Math.random() * numColours)];
                    // get a copy of the parent shells position so everything is independent
                    const sparkX = shell.x;
                    const sparkY = shell.y;
                    var grav = Math.random() * (this.height / 30)
                    var trailLen = Math.random() / 5
                    var timeToLive = Math.floor(Math.random() * 3)
                    var randRange = Math.floor(Math.random() * 101)
                    var velFactor = (randRange/2) + (Math.random() * randRange/2)
                    this.sparks.push(new Spark(sparkX, sparkY, colour, this.width, this.height, grav, trailLen, velFactor, timeToLive));
                }

                // remove the spent shell and continue so we don't call update/render on it
                this.shells.splice(i, 1);
                continue;
            }

            shell.update(delta);
        }

        for (var i = this.sparks.length - 1; i >= 0; i--) {
            var spark = this.sparks[i];

            if (spark.remove()) {
                this.sparks.splice(i, 1)
                spark = null;
                //newSparks = sparks.filter((x, i) => i !== index);
                continue;
            }

            spark.update(delta);
        }

    }

    draw() {
        for (var i = this.shells.length - 1; i >= 0; i--) {
            const shell = this.shells[i];
            shell.draw(this.ctx);
        }
        for (var i = this.sparks.length - 1; i >= 0; i--) {
            const spark = this.sparks[i];
            spark.draw(this.ctx);
        }
    }
}