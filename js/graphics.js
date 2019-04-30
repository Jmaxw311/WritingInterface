





var renderer = new THREE.WebGLRenderer({ alpha: true });
//renderer.setSize( window.innerWidth, window.innerHeight );
function canvasSize() { return Math.min(window.innerWidth, window.innerHeight) * 0.9; }
var width = canvasSize();
var height = canvasSize();
resizeCanvas = function () {
    var wsize = canvasSize();
    renderer.setSize( wsize, wsize );
    camera.left = -wsize / 2;
    camera.top = wsize / 2;
    camera.right = wsize / 2;
    camera.bottom = -wsize / 2;
    camera.updateProjectionMatrix();
    width = wsize;
    height = wsize;
    renderer.render( scene, camera );
};
document.getElementById("canvascontainer").appendChild( renderer.domElement );

var camera = new THREE.OrthographicCamera( -width / 2, width / 2, height / 2, -height / 2, 1, 1000 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

var MAX_POINTS = 500;
var geometry = new THREE.BufferGeometry();
var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
drawCount = 0; // draw the first 2 points, only

var lines = [];
var line = null; //new THREE.Line( geometry, material );

renderer.render( scene, camera );

function updateGeometry() {
    scene.remove(line);
    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    line = new THREE.Line(geometry, material);
    scene.add(line)
    renderer.render( scene, camera );
}