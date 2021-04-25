class Fly {
    constructor(maxWidth, maxHeight) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight * 0.25;
        this.position = (
                            new Point(this.maxWidth, this.maxHeight) *  Point.random()
                        ) + new Point(0, maxHeight * 0.75);
        this.speed = (Math.random() * 20.0) - 10.0;
        this.size = Math.random() * 3.0;
        this.intervalBetweenFlash = (Math.random() * 50) + 475;
        const deltaToLastFlash = Math.random() * 15000;
        this.timeOfLastFlash = Date.now() - deltaToLastFlash;
        this.flashCount = deltaToLastFlash < this.intervalBetweenFlash ? (Math.random() * 6) : 0;
        this.shape = null;

        this.flashOff = this.flashOff.bind(this);
    }

    draw() {
        this.shape = new Shape.Circle(
            this.position,
            this.size,
        );
        this.shape.fillColor = '#eef2ae';
        this.shape.fillColor.hue = this.shape.fillColor.hue + (Math.random() * 10) - 5;
        this.shape.opacity = 0;
    }

    queueFlash() {
        // if ((this.shape.opacity + this.brightness) < 0 || (this.shape.opacity + this.brightness) > 1) {
        //     this.brightness = this.brightness * -1;
        // }
        // this.shape.opacity = this.shape.opacity + this.brightness;

        const now = Date.now();
        const randomDuration = (Math.random() * 15000) + 3000;
        const halfishASecond = this.intervalBetweenFlash;
        const flashDeltaToNow = now - this.timeOfLastFlash;

        // debugger;
        // console.log(`this.flashCount ${this.flashCount} flashDeltaToNow ${flashDeltaToNow} randomDuration ${randomDuration} this.timeOfLastFlash ${this.timeOfLastFlash}`);
        if (flashDeltaToNow > halfishASecond && this.flashCount > 0 && this.flashCount < 6) { // Ligthning bugs flash 6 times about every 1/2 second
            window.setInterval(this.flashOff, 100);
            this.shape.opacity = 1;
            this.timeOfLastFlash = now;
            this.flashCount = (this.flashCount + 1) % 6;
        } else if (flashDeltaToNow > randomDuration && this.flashCount === 0) {
            window.setInterval(this.flashOff, 100);
            this.shape.opacity = 1;
            this.timeOfLastFlash = now;
            this.flashCount = 1;
        }
    }

    flashOff() {
        this.shape.opacity = 0;
    }

    move() {
        // const newRadiusDelta = (Math.random() * 0.1) - 0.05;
        // console.log(this.shape.radius, newRadiusDelta);
        // this.shape.radius = this.shape.radius + newRadiusDelta;

        // const myVector = (
        //     new Point(this.speed, this.speed) * Point.random()
        // ).normalize(Math.random() * 10);
        // myVector.angle = Math.random() * 30;
        // const newPosition = (this.shape.position + myVector) % new Point(this.maxWidth, this.maxHeight);
        // this.shape.position = newPosition;
    }
}

const CANVAS_SIZE = [window.innerWidth, window.innerHeight];
const canvas = new Rectangle(
    0, 
    0, 
    CANVAS_SIZE[0],
    CANVAS_SIZE[1]
);

const generateFireFlies = function(flyCount = 150) {
    const flies = []
    for(let fly = 0; fly < flyCount; fly++) {        
        flies[fly] = new Fly(CANVAS_SIZE[0], CANVAS_SIZE[1]);
        flies[fly].draw();
    }
    return flies;
}

const flies = generateFireFlies();

function onFrame(_event) {
    if (_event.count > 2000) {
        return;
    }
    flies.forEach(fly => {
        fly.queueFlash();
        fly.move();
    });
}


// let myPoint = new Point(200, 200);
// let myPath = new Path({
//     strokeColor: new Color(0.5, 0, 0.5),
//     strokeWidth: 10,
//     strokeCap: 'round'
// });
// myPath.add(myPoint);

// function getPoint(start) {
//     const myVector = (
//         new Point(10,10) * Point.random()
//     ).normalize(Math.random() * 100);
//     myVector.angle = Math.random() * 360;
//     start = start + myVector;
//     return start;
// }

// function onFrame(event) {
//     let newPoint = getPoint(myPoint);
//     while (!newPoint.isInside(canvas)) {
//         newPoint = getPoint(myPoint);
//     }
//     myPath.add(newPoint);
//     if (myPath.segments.length >= 20) {
//         myPath.removeSegment(0);
//     }
//     myPath.strokeColor.hue += 0.5;
//     myPath.smooth();
// }

