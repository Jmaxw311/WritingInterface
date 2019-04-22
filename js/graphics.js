const width = 480;
const height = 480;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height ); //renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("canvascontainer").appendChild( renderer.domElement );

var camera = new THREE.OrthographicCamera( 0, width, 0, height, 1, 1000 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

var scene = new THREE.Scene();

var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

var MAX_POINTS = 500;
var geometry = new THREE.BufferGeometry();
var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
drawCount = 0; // draw the first 2 points, only

var lines = [];
var line = null; //new THREE.Line( geometry, material );

function updateGeometry() {
    scene.remove(line);
    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    line = new THREE.Line(geometry, material);
    scene.add(line)
    renderer.render( scene, camera );
}