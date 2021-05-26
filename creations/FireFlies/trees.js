FIELD_COLOUR = '#15361b';
CANVAS_WIDTH = document.querySelector('#starsCanvas').clientWidth;
CANVAS_HEIGHT = document.querySelector('#starsCanvas').clientHeight;
TERRA_CURVE_HEIGHT = CANVAS_WIDTH / 28.8;
TREE_LINE = CANVAS_HEIGHT * 0.66;
GRASS_LINE = CANVAS_HEIGHT * 0.5;

class TreeLine {
    draw() {
        const path = new Path();
        path.fillColor = 'black';
        path.add(new Point(0, TREE_LINE));

        const xAxis = 100.0;
        for(let xAxis = 0; xAxis <= CANVAS_WIDTH + 40; xAxis = xAxis + (Math.random() * 10.0)) {
            const heightMax = TREE_LINE - Math.random() * GRASS_LINE;

            const point = new Point(xAxis, TREE_LINE)
            path.add(point);

            let yAxis = TREE_LINE;
            for (; yAxis > heightMax - 5.0; yAxis = yAxis - 2.0) {
                const spacer = Math.abs(yAxis - heightMax);
                const left = new Point(xAxis - (Math.random() * spacer), yAxis);
                // const left = new Point(x + 5 + 35.0, yAxis);

                path.add(left);
                // console.log("left", left);
            }
            path.add(new Point(xAxis, heightMax));
            for (; yAxis < TREE_LINE; yAxis = yAxis + 2.0) {
                const spacer = Math.abs(yAxis - heightMax);
                const right = new Point(xAxis + (Math.random() * spacer), yAxis);
                path.add(right);
                // console.log("right", right);
            }
        }
        path.smooth();
    }
}

class Field {
    constructor() {
        self.drawingPoint = new Point(0, GRASS_LINE);

        self.path = new Path();
        // self.path.fillColor = FIELD_COLOUR;
        self.path.fillColor = {
            gradient: {
                stops: [FIELD_COLOUR, 'black'],
                // stops: ['black', 'black'],
                // radial: true
            },
            origin: new Point(CANVAS_WIDTH / 2.0, GRASS_LINE),
            destination: new Point(CANVAS_WIDTH / 2.0, TREE_LINE)
           };

        self.path.add(self.drawingPoint);
    }

    draw() {
        for(let x = 0; x <= CANVAS_WIDTH + 40; x = x + (Math.random() * 5.0)) {
            var heightDelta = (Math.random() * 10.0) - 5.0;
            // var top = self.drawingPoint + new Point(x, heightDelta) + this.parabolaPoint(x);
            var top = self.drawingPoint + new Point(x, heightDelta);
            var bottom = new Point(x, CANVAS_HEIGHT);

            path.add(top);
            path.insert(0, bottom);
        }
        path.smooth();
    }

    // parabolaPoint(x) {
    //     const a = TERRA_CURVE_HEIGHT / Math.pow(CANVAS_WIDTH/2, 2);
    //     const b = TERRA_CURVE_HEIGHT;
    //     const c = CANVAS_WIDTH/2;

    //     return new Point(0, (a * Math.pow(x - c, 2)) + b);
    // }
}

const generateTerra = () => {
    const treeLine = new TreeLine();
    treeLine.draw();

    const field = new Field();
    field.draw();
}

generateTerra();
