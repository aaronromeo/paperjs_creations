// Create a white rectangle in the background
// with the same dimensions as the view:
var background = new Path.Rectangle(view.bounds);
background.fillColor = 'white';

const blendModes = ['normal', 'multiply', 'screen', 'overlay',
            'soft-light', 'hard-light', 'color-dodge',
            'color-burn', 'darken', 'lighten', 'difference',
            'exclusion', 'hue', 'saturation', 'luminosity',
            'color', 'add', 'subtract', 'average', 'pin-light',
            'negation', 'source-over',
            // 'source-in', 'source-out',
            'source-atop',
            'destination-over',
            // 'destination-in',
            'destination-out',
            // 'destination-atop',
            'lighter',
            'darker', 'xor'
]

blendModes.forEach((blendMode, i) => {
    console.log(blendMode, i, 50 + (60 * i));
    const circle = new Path.Circle({
        center: new Point(80, 50 + (60 * i)),
        radius: 20,
        fillColor: 'red'
    });

    const circle2 = new Path.Circle({
        center: new Point(100, 50 + (60 * i)),
        radius: 20,
        fillColor: 'blue'
    });

    const text = new PointText(new Point(50, 30 + (60 * i)));
    text.content = blendMode;

    // Set the blend mode of circle2:
    circle2.blendMode = blendMode;
});
