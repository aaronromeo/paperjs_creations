import paper from 'paper';

paper.install(window);
window.onload = function() {

    paper.setup('myCanvas');
    // var path = new Path.Rectangle([75, 75], [100, 100]);
    // path.strokeColor = 'black';

    const getPoint = function(start) {
        debugger;
        const myVector = new Point(10,10);
        const temp = myVector * Point.random();
        // (
        //     new Point(10,10) * Point.random()
        // );

        // (
        //     new Point(10,10) * Point.random()
        // ).normalize(Math.random() * 100)
        myVector.angle = Math.random() * 360;
        start = start + myVector;
        return start;
    }
        
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

    view.onFrame = function(event) {
        // On each frame, rotate the path by 3 degrees:
        // myPath.rotate(3);

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
}

// const getPoint = (start) => {
//     const myVector = (
//         new Point(10,10) * Point.random()
//     ).normalize(Math.random() * 100);
//     myVector.angle = Math.random() * 360;
//     start = start + myVector;
//     return start;
// }

// window.onload = function() {
// 	// Setup directly from canvas id:
// 	paper.setup('myCanvas');

//     const CANVAS_SIZE = [400, 400];
//     const canvas = new Rectangle(
//         0, 
//         0, 
//         CANVAS_SIZE[0],
//         CANVAS_SIZE[1]
//     );
    
//     let myPoint = new Point(200, 200);
//     let myPath = new Path({
//         strokeColor: new Color(0.5, 0, 0.5),
//         strokeWidth: 10,
//         strokeCap: 'round'
//     });
//     myPath.add(myPoint);

//     view.onFrame = function(event) {
//         let newPoint = getPoint(myPoint);
//         while (!newPoint.isInside(canvas)) {
//             newPoint = getPoint(myPoint);
//         }
//         myPath.add(newPoint);
//         if (myPath.segments.length >= 20) {
//             myPath.removeSegment(0);
//         }
//         myPath.strokeColor.hue += 0.5;
//         myPath.smooth();
//     }
//         // view.draw();
// }
