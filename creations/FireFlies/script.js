// Photinus macdermotti a.k.a. Father Mac’s firefly 
// From https://www.nps.gov/grsm/learn/nature/firefly-flash-patterns.htm
// The pattern for this species is a double flash of yellow light 
// with the two flashes about 1½-2 seconds apart with a brief 4-5 second pause 
// and a repeat of the double flash. 

FLASH_CYCLE_DURATION = 5000.0;
FLASH_CYCLE_1_ON = 0.0;
FLASH_CYCLE_1_OFF = 500.0;
FLASH_CYCLE_2_ON = 1500.0
FLASH_CYCLE_2_OFF = 2000.0;
FLASH_STATES = 3;
FLASH_DURATION = 75;
NUMBER_OF_FLIES = 20;

class Fly {
    constructor(maxWidth, maxHeight) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.speed = (Math.random() * 20.0) - 10.0;
        this.initPositionAttributes();
        this.initFlashAttributes();

        this.shape = null;
    }

    initFlashAttributes() {
        this.size = (Math.random() * 2.5) + 2.0;

        this.flashCycleOffset = Math.random() * FLASH_CYCLE_DURATION
        if (this.flashCycleOffset < FLASH_CYCLE_1_OFF) {
            this.flashCount = 1;
        } else if (this.flashCycleOffset < FLASH_CYCLE_2_OFF) {
            this.flashCount = 2;
        } else {
            this.flashCount = 0;
        }
        this.lastFlashOn = 0;
    }

    initPositionAttributes() {
        // this.maxHeight = maxHeight * 0.3;
        // this.position = (
        //             new Point(this.maxWidth, this.maxHeight) *  Point.random()
        //         ) + new Point(0, maxHeight * 0.5);
        // this.maxHeight = maxHeight;
        this.position = (
                    new Point(this.maxWidth, this.maxHeight) *  Point.random()
                );
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

    flicker() {
        const now = Date.now();
        const flashCyclePosition = (now + this.flashCycleOffset) % FLASH_CYCLE_DURATION;

        if (this.shape.opacity && (now - this.lastFlashOn) > FLASH_DURATION) {
            this.shape.opacity = 0;
            this.lastFlashOn = 0;
        } else if (flashCyclePosition > FLASH_CYCLE_1_ON && flashCyclePosition < FLASH_CYCLE_1_OFF && this.flashCount < 1) {
            this.shape.opacity = 1;
            this.lastFlashOn = now;
            // window.setInterval(() => this.shape.opacity = 0, FLASH_DURATION);
            this.flashCount = 1;
            // window.setInterval(() => this.shape.opacity = 1, durationToNextFlash);
            // window.setInterval(() => {this.shape.opacity = 0; this.flashActive = false}, durationToNextFlash +  durationToNextFlash);
        } else if (flashCyclePosition > FLASH_CYCLE_2_ON && flashCyclePosition < FLASH_CYCLE_2_OFF && this.flashCount < 2) {
            this.shape.opacity = 1;
            this.lastFlashOn = now;
            // window.setInterval(() => this.shape.opacity = 0, FLASH_DURATION);
            this.flashCount = 2;
        } else if (flashCyclePosition > FLASH_CYCLE_2_OFF && this.flashCount === 2) {
            this.flashCount = 0;
        }
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

const generateFireFlies = function(flyCount = NUMBER_OF_FLIES) {
    const flies = []
    for(let fly = 0; fly < flyCount; fly++) {        
        flies[fly] = new Fly(CANVAS_SIZE[0], CANVAS_SIZE[1]);
        flies[fly].draw();
    }
    return flies;
}

const flies = generateFireFlies();

function onFrame(event) {
    if (event.count > 2000) {
        return;
    }
    flies.forEach(fly => {
        fly.flicker();
        // fly.move();
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

