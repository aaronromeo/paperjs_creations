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
CANVAS_WIDTH = document.querySelector('#fireflyCanvas').clientWidth;
CANVAS_HEIGHT = document.querySelector('#fireflyCanvas').clientHeight;
CANVAS_OFFSET = CANVAS_HEIGHT * 0.5;

NUMBER_OF_FLIES = Math.ceil(CANVAS_WIDTH * CANVAS_HEIGHT / 400);
// NUMBER_OF_FLIES = 1;
FLASH_SEGMENTS = Math.floor(FLASH_CYCLE_DURATION / MIN_FLICKER_DURATION);

class Macdermotti {
    constructor() {
        this.male =
            Math.random() < 0.3 ? true : false;
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
        let posY = CANVAS_OFFSET - CANVAS_OFFSET * Math.pow(Math.random(), 8);
        this.shape = new Shape.Circle(
            new Point(0, 0),
            0,
        );
        // this.shape = new PointText(new Point(0, 0));
        this.shape.position = (
            new Point(posX, CANVAS_HEIGHT - posY)
        );

        this.shape.radius =
            (Math.pow((this.shape.position.y - CANVAS_OFFSET), 1.3) / (CANVAS_HEIGHT - CANVAS_OFFSET)) + 0.5;

            this.shape.fillColor = {
            gradient: {
                stops: [FLASH_COLOUR, FLASH_BLUR_COLOUR, 'black'],
                radial: true
            },
            origin: this.shape.position,
            destination: this.shape.bounds.rightCenter
           }
        this.shape.fillColor.highlight = this.shape.position;
        this.shape.opacity = 0;
        this.shape.blendMode = 'soft-light';
    }

    initSpeed() {
        this.initialAngle = Math.pow(Math.random(), 2) * (Math.random() >  0.5 ? -45.0 : -135.0);
        this.speed = new Point((this.shape.radius * 0.5) + 0.5, (this.shape.radius * 0.125) + 0.125);
        this.speed.angle = this.initialAngle;
    }

    currentSegment(ceil = false) {
        let dateMultiplier = Date.now() / MIN_FLICKER_DURATION;
        dateMultiplier = ceil ? Math.ceil(dateMultiplier) : dateMultiplier;
        const dateMultiplierWithOffset =
            dateMultiplier + this.flashOffset;
        return dateMultiplierWithOffset % FLASH_SEGMENTS;
    }

    flicker() {
        this.shape.opacity = this.opacity();
    }

    opacity() {
        const segment = this.currentSegment();
        return Math.max(
            this.maxOpacity - Math.pow( segment - this.flash1Pos, 2),
            this.maxOpacity - Math.pow( segment - this.flash2Pos, 2),
            0,
        );
    }

    move() {
        // this.shape.content = Math.round(this.shape.radius) * 10
        if (!this.male) {
            return;
        }

        const segment = this.currentSegment();
        const ceilSegment = Math.ceil(segment);
        if (ceilSegment === this.flash2Pos) {
            this.speed.angle = this.initialAngle + (Math.abs(this.initialAngle) - 90) * Math.pow((segment % 1), 2.0);
        } else if (ceilSegment === 0) {
            this.initSpeed();
        } else if (ceilSegment === this.flash1Pos) {
            this.speed.angle = this.initialAngle;
        }
        this.shape.position = this.shape.position + this.speed;

        const boundingBox = new Rectangle(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        if (ceilSegment > this.flash2Pos && !boundingBox.contains(this.shape.position)) {
            this.shape.remove();
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
