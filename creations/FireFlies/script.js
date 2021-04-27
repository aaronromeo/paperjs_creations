// Photinus macdermotti a.k.a. Father Mac’s firefly 
// From https://www.nps.gov/grsm/learn/nature/firefly-flash-patterns.htm
// The pattern for this species is a double flash of yellow light 
// with the two flashes about 1½-2 seconds apart with a brief 4-5 second pause 
// and a repeat of the double flash. 
// https://conference.ifas.ufl.edu/firefly/Poster%20Presentations/9%20-%20De%20Cock%20-%20Call%20for%20a%20Discussion.pdf

// Colour converter https://academo.org/demos/wavelength-to-colour-relationship/

FLASH_COLOUR = '#deff00'; 
FLASH_CYCLE_DURATION = 6000.0;
FLASH_CYCLE_1_ON = 0.0;
FLASH_CYCLE_1_OFF = 500.0;
FLASH_CYCLE_2_ON = 1500.0
FLASH_CYCLE_2_OFF = 2000.0;
FLASH_STATES = 3;
MIN_FLASH_DURATION = 200;
FLASH_DURATION_VARIABILITY = 800;
NUMBER_OF_FLIES = 15;

class Macdermotti {
    constructor(maxWidth, maxHeight, offsetHeight) {
        this.male = Math.random() < 0.5 ? true : false;
        this.offsetHeight = offsetHeight;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;

        this.initShape();
        this.initPositionAttributes();
        this.initFlashAttributes();
        this.initSpeed();
    }

    initFlashAttributes() {
        this.flashCycleOffset = this.male ? 
            Math.random() * FLASH_CYCLE_DURATION * 0.75 :
            (Math.random() * FLASH_CYCLE_DURATION * 0.5) + FLASH_CYCLE_DURATION * 0.5;
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
        if (this.male) {
            this.shape.position = (
                new Point(this.maxWidth, this.maxHeight * 0.5) *  Point.random()
            ) + new Point(0, this.offsetHeight);
        } else {
            this.shape.position = (
                new Point(this.maxWidth, this.maxHeight * 0.5) *  Point.random()
            ) + new Point(0, this.maxHeight * 0.5 + this.offsetHeight);
        }
    }

    initShape() {
        this.size = Math.random() * 4.5;
        this.shape = new Shape.Circle(
            new Point(0, 0),
            this.size,
        );

        this.shape.fillColor = FLASH_COLOUR;
        this.shape.opacity = 0;
    }

    initSpeed() {
        this.speed = new Point(this.size * 1.0, this.size * 0.25) * Point.random();
        this.speed.angle = Math.random() < 0.5 ? Math.random() * -20 : 180 + (Math.random() * 20);
    }

    flicker() {
        const now = Date.now();
        const flashCyclePosition = (now + this.flashCycleOffset) % FLASH_CYCLE_DURATION;
        const flashDuration = this.male ? (MIN_FLASH_DURATION + Math.random() * FLASH_DURATION_VARIABILITY) : MIN_FLASH_DURATION;

        if (this.shape.opacity && (now - this.lastFlashOn) > flashDuration) {
            this.shape.opacity = 0;
            this.lastFlashOn = 0;
        } else if (this.male && flashCyclePosition > FLASH_CYCLE_1_ON && flashCyclePosition < FLASH_CYCLE_1_OFF && this.flashCount < 1) {
            this.shape.opacity = 1;
            this.lastFlashOn = now;
            this.flashCount = 1;
        } else if (flashCyclePosition > FLASH_CYCLE_2_ON && flashCyclePosition < FLASH_CYCLE_2_OFF && this.flashCount < 2) {
            this.shape.opacity = 1;
            this.lastFlashOn = now;
            this.flashCount = 2;
        } else if (flashCyclePosition > FLASH_CYCLE_2_OFF && this.flashCount === 2) {
            this.flashCount = 0;
        }
    }

    move() {
        if (!this.male) {
            return;
        }
        
        if (this.flashCount === 2) {
            this.speed.angle = this.speed.angle > -90 ? this.speed.angle - 2 : this.speed.angle + 2;
        } else if (this.flashCount == 0) {
            this.initSpeed();
        }
        this.shape.position = this.shape.position + this.speed;        
        
        const boundingBox = new Rectangle(0, this.offsetHeight, this.maxWidth, this.maxHeight);
        if (this.flashCount == 0 && !boundingBox.contains(this.shape.position)) {
            this.initPositionAttributes();
        }
    }
}

const CANVAS_SIZE = [
    document.querySelector('#myCanvas').clientWidth, 
    document.querySelector('#myCanvas').clientHeight * 0.5,
];
const CANVAS_OFFSET = document.querySelector('#myCanvas').clientHeight * 0.5;

const generateFireFlies = function(flyCount = NUMBER_OF_FLIES) {
    const flies = []
    for(let fly = 0; fly < flyCount; fly++) {        
        flies[fly] = new Macdermotti(CANVAS_SIZE[0], CANVAS_SIZE[1], CANVAS_OFFSET);
    }
    return flies;
}

const flies = generateFireFlies();

function onFrame(event) {
    flies.forEach(fly => {
        fly.flicker();
        fly.move();
    });
}
