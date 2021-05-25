// Create a white rectangle in the background
// with the same dimensions as the view:
var background = new Path.Rectangle(view.bounds);
background.fillColor = 'white';

var circle = new Path.Circle({
    center: [80, 50],
    radius: 35,
    fillColor: 'red'
});

var circle2 = new Path.Circle({
    center: new Point(120, 50),
    radius: 35,
    fillColor: 'blue'
});

const blendModes = ['normal', 'multiply', 'screen', 'overlay',
            'soft-light', 'hard-light', 'color-dodge',
            'color-burn', 'darken', 'lighten', 'difference',
            'exclusion', 'hue', 'saturation', 'luminosity',
            'color', 'add', 'subtract', 'average', 'pin-light',
            'negation', 'source-over', 'source-in', 'source-out',
            'source-atop', 'destination-over', 'destination-in',
            'destination-out', 'destination-atop', 'lighter',
            'darker', 'copy', 'xor']

// Set the blend mode of circle2:

var text = new PointText(new Point(50, 10));
var lastRun = Date.now();

text.content = blendModes[0];
circle2. blendMode = blendModes[0];

function onFrame(event) {
    if ((Date.now() - lastRun) > 2000) {
        blendModes.push(blendModes.shift());
        text.content = blendModes[0];
        circle2. blendMode = blendModes[0];
        lastRun = Date.now();
    }
}


