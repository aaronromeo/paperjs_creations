const CANVAS_SIZE = [400, 400];
const canvas = new Rectangle(
    0, 
    0, 
    CANVAS_SIZE[0],
    CANVAS_SIZE[1]
);

let myPoint = new Point(200, 200);
let myPath = new Path({
	strokeColor: new Color(0.5, 0, 0.5),
	strokeWidth: 10,
	strokeCap: 'round'
});
myPath.add(myPoint);

function getPoint(start) {
    const myVector = (
        new Point(10,10) * Point.random()
    ).normalize(Math.random() * 100);
    myVector.angle = Math.random() * 360;
    start = start + myVector;
    return start;
}

function onFrame(event) {
    let newPoint = getPoint(myPoint);
    while (!newPoint.isInside(canvas)) {
        newPoint = getPoint(myPoint);
    }
    myPath.add(newPoint);
    if (myPath.segments.length >= 20) {
        myPath.removeSegment(0);
    }
    myPath.strokeColor.hue += 0.5;
    myPath.smooth();
}
