FLASH_COLOUR = '#ece8fc'; 
FLASH_BLUR_COLOUR = '#a9a4bd';
CANVAS_WIDTH = document.querySelector('#starsCanvas').clientWidth;
CANVAS_HEIGHT = document.querySelector('#starsCanvas').clientHeight;
NUMBER_OF_STARS = Math.ceil(CANVAS_WIDTH / 10.0);

class Star {
    constructor() {
        this.maxOpacity = (0.9 * Math.random()) + 0.1;
        this.skipFlicker = this.maxOpacity > 0.4 ? true : false;
        this.offsetX = 200.0 * Math.random();
        this.draw();
    }

    draw() {
        let posX = CANVAS_WIDTH * 1.0 * Math.random();
        let posY = CANVAS_HEIGHT * 1.0 * Math.random();
        this.shape = new Shape.Circle(
            new Point(posX, CANVAS_HEIGHT - posY),
            1.5 * Math.random() + 0.5,
        );
        this.shape.shadowBlur = 20 - this.shape.radius;
        this.shape.shadowColor = FLASH_BLUR_COLOUR;
        this.shape.fillColor = FLASH_COLOUR;
        this.shape.opacity = this.opacity();
        this.shape.blendMode = 'soft-light';
    }

    flicker() {
        if (this.skipFlicker) {
            return;
        }
        this.shape.opacity = this.opacity();
    }

    opacity() {
        return (
            (
                Math.sin(Math.round(Date.now() / 300.0) + this.offsetX) + 1.0
            ) / 2.0
        ) * this.maxOpacity;
    }
}

const generateStars = function(starCount = NUMBER_OF_STARS) {
    const stars = []
    for(let star = 0; star < starCount; star++) {        
        stars[star] = new Star();
    }
    return stars;
}

const stars = generateStars();

function onFrame(event) {
    stars.forEach(star => {
        star.flicker();
    });
}
