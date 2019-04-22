/*
 * Extend interface.js with support for touch screen input
 */

function onTouchStart(event) {
    if (event.touches.length == 1 && event.targetTouches.length == 1)
        onMouseDown(event.changedTouches[0]);
}

function onTouchEnd(event) {
    if (event.touches.length == 0)
        onMouseUp(event.changedTouches[0]);
}

function onTouchMove(event) {
    if (event.touches.length == 1 && event.targetTouches.length == 1) {
        onMouseMove(event.changedTouches[0]);
        event.preventDefault(); // block page refresh gesture when pulling down on touch screen
    }
}

renderer.domElement.addEventListener('touchstart', onTouchStart);
renderer.domElement.addEventListener('touchend', onTouchEnd);
renderer.domElement.addEventListener('touchmove', onTouchMove);