var strokes = [];
const frameRate = 60.0; // update fps
const frameTime = 1000.0 / frameRate;
var clockt = Date.now();

var isMouseDown = false;
var mouseX = 0.0;
var mouseY = 0.0;

function frameReady() {
    var n = Date.now();
    if (n - clockt > frameTime) {
        clockt = n;
        return true;
    }
    return false;
}

function startStroke() {
    var stroke = { xcoordinates: [], ycoordinates: [] };
    strokes.push(stroke);
    drawCount = 0;
    MAX_COUNT = 500;
    geometry = new THREE.BufferGeometry();
    positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    line = new THREE.Line(geometry, material);
    lines.push(line);
    return stroke;
}

function currentStroke() {
    if (strokes.length < 1)
        return null;
    return strokes[strokes.length - 1];
}

function addPoint(x, y) {

    var stroke = currentStroke();
    if (stroke == null)
        stroke = startStroke();
    stroke.xcoordinates.push(x);
    stroke.ycoordinates.push(y);

    if (drawCount >= MAX_POINTS) {
        MAX_POINTS += 500;
        var newbuf = new Float32Array( MAX_POINTS * 3 );
        newbuf.set(positions);
        positions = newbuf;
    }
    drawCount += 1;
    positions[drawCount * 3] = x;
    positions[drawCount * 3 + 1] = y;
    positions[drawCount * 3 + 2] = 0;
    geometry.verticesNeedUpdate = true;
    geometry.setDrawRange(1, drawCount);
}

function onMouseDown(event) {
    if (!event.button || event.button == 0) {
        console.log("mouse down");
        isMouseDown = true;
        startStroke();

        var $div = $(event.target);
        var offset = $div.offset();
        var x = (event.clientX - offset.left) + $(window).scrollLeft();
        var y = (event.clientY - offset.top) + $(window).scrollTop();
        
        addPoint(x - width/2, -y + height/2);
    }
}

function cancelStroke() {
    strokes.pop();
    scene.remove(line);
    lines.pop();
    renderer.render( scene, camera );
}

function onMouseUp(event) {
    if ((!event.button || event.button == 0) && isMouseDown) {
        console.log("mouse up");
        isMouseDown = false;
        if (drawCount < 3) { /* remove this stroke if it is too short to be a line */
            cancelStroke();
        }
    }
}

function onMouseMove(event) {
    if (isMouseDown && frameReady()) {
        var $div = $(event.target);
        var offset = $div.offset();
        var x = (event.clientX - offset.left) + $(window).scrollLeft();
        var y = (event.clientY - offset.top) + $(window).scrollTop();
        addPoint(x - width/2, -y + height/2);
        console.log("mouse moved " + x + ", " + y);
        updateGeometry();
    }
}

function clearStrokes() {
    console.log("clearing");
    for( var i = scene.children.length - 1; i >= 0; i--) { 
        obj = scene.children[i];
        scene.remove(obj);
    }
    lines.length = 0;
    strokes = new Array();
    renderer.render( scene, camera );
}

renderer.domElement.addEventListener('mousedown', onMouseDown);
renderer.domElement.addEventListener('mouseup', onMouseUp);
renderer.domElement.addEventListener('mouseout', onMouseUp);
renderer.domElement.addEventListener('mousemove', onMouseMove);