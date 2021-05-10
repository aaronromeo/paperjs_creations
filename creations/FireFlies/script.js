// Photinus macdermotti a.k.a. Father Mac’s firefly 
// From https://www.nps.gov/grsm/learn/nature/firefly-flash-patterns.htm
// The pattern for this species is a double flash of yellow light 
// with the two flashes about 1½-2 seconds apart with a brief 4-5 second pause 
// and a repeat of the double flash. 
// https://conference.ifas.ufl.edu/firefly/Poster%20Presentations/9%20-%20De%20Cock%20-%20Call%20for%20a%20Discussion.pdf

// Colour converter https://academo.org/demos/wavelength-to-colour-relationship/

FLASH_COLOUR = '#deff00'; 
FLASH_BLUR_COLOUR = '#909666';
FLASH_CYCLE_DURATION = 6000;
FLASH_CYCLE_1_ON = 0.0;
FLASH_CYCLE_1_OFF = 500;
FLASH_CYCLE_2_ON = 1500
FLASH_CYCLE_2_OFF = 2000;
MIN_FLICKER_DURATION = 300;
FLASH_DURATION_VARIABILITY = 800;
NUMBER_OF_FLIES = 15;
CANVAS_BORDER = 10;
CANVAS_WIDTH = document.querySelector('#myCanvas').clientWidth - CANVAS_BORDER;
CANVAS_HEIGHT = document.querySelector('#myCanvas').clientHeight - CANVAS_BORDER;
CANVAS_OFFSET = CANVAS_HEIGHT * 0.4;
NUMBER_OF_FLIES = Math.ceil(CANVAS_WIDTH / 100.0);

FLASH_SEGMENTS = Math.floor(FLASH_CYCLE_DURATION / MIN_FLICKER_DURATION);

class Macdermotti {
    constructor() {
        this.male = 
            Math.random() < 0.5 ? 
            true : 
            false;
        this.reset();
    }

    reset() {
        this.initPositionAttributes();
        this.initFlashAttributes();
        this.initSpeed();
    }

    initFlashAttributes() {
        this.maxOpacity = (0.7 * Math.random()) + 0.3;
        this.flashOffset = Math.floor(FLASH_SEGMENTS * Math.random());
        this.flash1Pos = Math.floor(
            (FLASH_CYCLE_1_ON + ((FLASH_CYCLE_1_OFF - FLASH_CYCLE_1_ON) * Math.random())) / MIN_FLICKER_DURATION
        );
        this.flash2Pos = this.male ? Math.floor(
            (FLASH_CYCLE_2_ON + ((FLASH_CYCLE_2_OFF - FLASH_CYCLE_2_ON) * Math.random())) / MIN_FLICKER_DURATION
        ) : this.flash1Pos;
    }

    initPositionAttributes() {
        let posX = CANVAS_WIDTH * 1.0 * Math.random();
        let posY = CANVAS_HEIGHT * 0.40 * Math.random();
        this.shape = new Shape.Circle(
            new Point(0, 0),
            0,
        );
        this.shape.position = (
            new Point(posX, CANVAS_HEIGHT - posY)
        );

        this.shape.radius = 
            (((this.shape.position.y - CANVAS_OFFSET) * 4.0) / (CANVAS_HEIGHT - CANVAS_OFFSET)) + 0.5;
        this.shape.shadowBlur = 20 - this.shape.radius;
        this.shape.shadowColor = FLASH_BLUR_COLOUR;
        this.shape.fillColor = FLASH_COLOUR;
        this.shape.opacity = 0;
        this.shape.blendMode = 'soft-light';
    }

    initSpeed() {
        this.speed = new Point((this.shape.radius * 0.5) + 0.5, (this.shape.radius * 0.125) + 0.125);
        this.speed.angle = Math.random() < 0.5 ? (Math.random() * -20) - 10 : 180 + (Math.random() * 20) + 10;
    }

    currentSegment() {
        return (Math.ceil(Date.now() / MIN_FLICKER_DURATION) + this.flashOffset) % FLASH_SEGMENTS;        
    }

    flicker() {
        if (this.currentSegment() === this.flash1Pos || this.currentSegment() === this.flash2Pos) {
            this.shape.opacity = this.maxOpacity;
        } else {
            this.shape.opacity = 0;
        }
    }

    move() {
        if (!this.male) {
            return;
        }
        
        if (this.currentSegment() === this.flash2Pos) {
            this.speed.angle = this.speed.angle > -90 ? this.speed.angle - 2 : this.speed.angle + 2;
        } else if (this.currentSegment() > this.flash2Pos) {
            this.initSpeed();
        }
        this.shape.position = this.shape.position + this.speed;        

        const boundingBox = new Rectangle(0, CANVAS_OFFSET, CANVAS_WIDTH, CANVAS_HEIGHT - CANVAS_OFFSET);    
        if (this.currentSegment() > this.flash2Pos && !boundingBox.contains(this.shape.position)) {
            this.reset();
        }
    }
}

const generateFireFlies = function(flyCount = NUMBER_OF_FLIES) {
    const flies = []
    for(let fly = 0; fly < flyCount; fly++) {        
        flies[fly] = new Macdermotti();
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
