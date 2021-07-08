FIELD_COLOUR = '#666666';
CANVAS_WIDTH = document.querySelector('#starsCanvas').clientWidth;
CANVAS_HEIGHT = document.querySelector('#starsCanvas').clientHeight;
TERRA_CURVE_HEIGHT = CANVAS_WIDTH / 28.8;
TREE_LINE = CANVAS_HEIGHT * 0.66;
GRASS_LINE = CANVAS_HEIGHT * 0.5;
TREE_HEIGHT = CANVAS_HEIGHT * 0.20;

class TreeLine {
  drawTree() {
    console.log(TREE_LINE, GRASS_LINE);
    // const p01seg01point = new Point(150, 200);
    // const p01seg02point = new Point(200, 700);
    // const p01seg01hOunt = new Point(150, 150);
    console.log(TREE_HEIGHT, TREE_LINE, TREE_LINE - TREE_HEIGHT);
    const p01seg01point = new Point(150, TREE_HEIGHT);
    const p01seg02point = new Point(150 + (GRASS_LINE - TREE_HEIGHT) / 10, GRASS_LINE);
    const p01seg01hOunt = new Point(150, 150);
    const p01seg01hIn = new Point(0, 0);
    const p01r1seg = new Segment(p01seg01point, null, p01seg01hOunt);
    const p01r2seg = new Segment(p01seg02point, p01seg01hIn, null);

    const p01 = new Path(p01r1seg, p01r2seg);

    const p02seg01point = p01.getPointAt(p01.length / 3);
    const p02seg02point = p01.getPointAt(p01.length / 3) + new Point(100, -50);
    const p02seg01hOunt = new Point(25, -25);
    const p02seg01hIn = new Point(-25, -25);
    const p02r1seg = new Segment(p02seg01point, null, p02seg01hOunt);
    const p02r2seg = new Segment(p02seg02point, p02seg01hIn, null);

    const p02 = new Path(p02r1seg, p02r2seg);

    const path = new CompoundPath({
      children: [
        new Path(p01r1seg, p01r2seg),
        new Path(p02r1seg, p02r2seg)
      ],
    });

    path.strokeColor = FIELD_COLOUR;
    path.strokeWidth = 10;

    let l01 = p01seg01point.clone();
    const t01bounds = new Path.Circle(l01, 100)
    for (let i = 0; i < 500; i++) {
      let c01 = new Path.Circle(l01, 10);
      c01.strokeColor = FIELD_COLOUR;
      if (Math.random() > 0.6) {
        c01.fillColor = 'black';
        c01.opacity = 0.5;
      }
      l01 = p01seg01point.clone() + new Point(
        (Math.random() * 300.0) - 150.0,
        (Math.random() * 300.0) - 150.0
      );
      while (!t01bounds.contains(l01)) {
        l01 = p01seg01point.clone() + new Point(
          (Math.random() * 300.0) - 150.0,
          (Math.random() * 300.0) - 150.0
        );
      }
    }

    let l02 = p02seg02point.clone();
    const t02bounds = new Path.Circle(l02, 75);
    for (let i = 0; i < 300; i++) {
      let c02 = new Path.Circle(l02, 10);
      c02.strokeColor = FIELD_COLOUR;
      if (Math.random() > 0.6) {
        c02.fillColor = 'black';
        c02.opacity = 0.5;
      }
      l02 = p02seg02point.clone() + new Point(
        (Math.random() * 200.0) - 100.0,
        (Math.random() * 200.0) - 100.0
      );
      while (!t02bounds.contains(l02)) {
        l02 = p02seg02point.clone() + new Point(
          (Math.random() * 200.0) - 100.0,
          (Math.random() * 200.0) - 100.0
        );
      }
    }
  }

  draw() {
    this.drawTree();
  }
}

class Field {
  constructor() {
    self.drawingPoint = new Point(0, GRASS_LINE);

    self.path = new Path();
    // self.path.fillColor = FIELD_COLOUR;
    // self.path.fillColor = {
    //     gradient: {
    //         stops: [FIELD_COLOUR, 'black'],
    //         stops: [[FIELD_COLOUR, 0.05], ['black', 0.2], ['black', 1]],
    //         // stops: ['black', 'black'],
    //         // radial: true
    //     },
    //     origin: new Point(CANVAS_WIDTH / 2.0, GRASS_LINE),
    //     destination: new Point(CANVAS_WIDTH / 2.0, TREE_LINE)
    //    };
    self.path.fillColor = {
      //     gradient: {
      //         stops: [FIELD_COLOUR, 'black'],
      //         stops: [[FIELD_COLOUR, 0.05], ['black', 0.2], ['black', 1]],
      //         // stops: ['black', 'black'],
      //         // radial: true
      //     },
      origin: new Point(CANVAS_WIDTH / 2.0, GRASS_LINE),
      destination: new Point(CANVAS_WIDTH / 2.0, TREE_LINE)
    };

    self.path.strokeColor = FIELD_COLOUR;
    self.path.add(self.drawingPoint);
  }

  draw() {
    for (let x = 0; x <= CANVAS_WIDTH + 40; x = x + (Math.random() * 5.0)) {
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
  // field.draw();
}

generateTerra();
