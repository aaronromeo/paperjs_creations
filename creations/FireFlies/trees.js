FIELD_COLOUR = '#666666';
TREE_TRUNK_COLOUR = '#444444';
CANVAS_WIDTH = document.querySelector('#starsCanvas').clientWidth;
CANVAS_HEIGHT = document.querySelector('#starsCanvas').clientHeight;
TERRA_CURVE_HEIGHT = CANVAS_WIDTH / 28.8;
TREE_LINE = CANVAS_HEIGHT * 0.66;
GRASS_LINE = CANVAS_HEIGHT * 0.5;
TREE_HEIGHT = CANVAS_HEIGHT * 0.20;

class TreeLine {
  drawTree(pointX) {
    // console.log(TREE_LINE, GRASS_LINE);
    // const p01TopPoint = new Point(150, 200);
    // const p01BotPoint = new Point(200, 700);
    // const p01seg01hOunt = new Point(150, 150);
    // console.log(TREE_HEIGHT, TREE_LINE, TREE_LINE - TREE_HEIGHT);
    const treeHeight = TREE_HEIGHT + ((TREE_HEIGHT / 2.0) * Math.random());
    const treeBottom = GRASS_LINE + 20;
    const segmentCount = [2, 3, 5, 3][Math.round(Math.random() * 3)];
    console.log(treeHeight, segmentCount);

    const p01TopX = pointX;
    const p01BotX = pointX + (treeBottom - treeHeight) / 10;
    const p01TopPoint = new Point(p01TopX, treeHeight);
    const p01BotPoint = new Point(p01BotX, treeBottom);
    const p01seg01hOunt = new Point(treeHeight / segmentCount, treeHeight / segmentCount);
    const p01seg01hIn = new Point(0, 0);
    const p01r1seg = new Segment(p01TopPoint, null, p01seg01hOunt);
    const p01r2seg = new Segment(p01BotPoint, p01seg01hIn, null);
    const p01 = new Path(p01r1seg, p01r2seg);

    const p02TopPoint = p01.getPointAt(p01.length / segmentCount);
    const p02BotPoint = p01.getPointAt(p01.length / segmentCount) + new Point((p01BotX - p01TopX) * segmentCount, -(p01BotX - p01TopX) * (segmentCount / 2));
    const p02seg01hOunt = new Point(p01.length / (segmentCount * 3), -(p01.length / (segmentCount * 3)));
    const p02seg01hIn = new Point(-(p01.length / (segmentCount * 3)), -(p01.length / (segmentCount * 3)));
    const p02r1seg = new Segment(p02TopPoint, null, p02seg01hOunt);
    const p02r2seg = new Segment(p02BotPoint, p02seg01hIn, null);
    const p02 = new Path(p02r1seg, p02r2seg);

    const path = new CompoundPath({
      children: [
        new Path(p01r1seg, p01r2seg),
        new Path(p02r1seg, p02r2seg)
      ],
    });

    path.strokeColor = TREE_TRUNK_COLOUR;
    path.strokeWidth = 4 * Math.random() + 6;

    let l01 = p01TopPoint.clone();
    const t01bounds = new Path.Circle(l01, p01.length / 3)
    for (let i = 0; i < p01.length * 1.5; i++) {
      let c01 = new Path.Circle(l01, 10);
      c01.strokeColor = FIELD_COLOUR;
      if (Math.random() > 0.6) {
        c01.fillColor = 'black';
        c01.opacity = 0.5;
      }
      l01 = p01TopPoint.clone() + new Point(
        (Math.random() * 300.0) - 150.0,
        (Math.random() * 300.0) - 150.0
      );
      while (!t01bounds.contains(l01)) {
        l01 = p01TopPoint.clone() + new Point(
          (Math.random() * 300.0) - 150.0,
          (Math.random() * 300.0) - 150.0
        );
      }
    }

    let l02 = p02BotPoint.clone();
    const t02bounds = new Path.Circle(l02, p02.length / 3);
    for (let i = 0; i < p02.length * 1.5; i++) {
      let c02 = new Path.Circle(l02, 10);
      c02.strokeColor = FIELD_COLOUR;
      if (Math.random() > 0.6) {
        c02.fillColor = 'black';
        c02.opacity = 0.5;
      }
      l02 = p02BotPoint.clone() + new Point(
        (Math.random() * 200.0) - 100.0,
        (Math.random() * 200.0) - 100.0
      );
      while (!t02bounds.contains(l02)) {
        l02 = p02BotPoint.clone() + new Point(
          (Math.random() * 200.0) - 100.0,
          (Math.random() * 200.0) - 100.0
        );
      }
    }

    path.bringToFront();
  }

  draw() {
    let currentPosition = 50;
    const treePositions = [];
    while (currentPosition < CANVAS_WIDTH) {
      treePositions.push(currentPosition);
      currentPosition = currentPosition + (20 + 80 * Math.random());
    }

    treePositions.sort(() => Math.random() - 0.5).forEach(pos => this.drawTree(pos));
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
  const field = new Field();
  field.draw();

  const treeLine = new TreeLine();
  treeLine.draw();
}

generateTerra();
