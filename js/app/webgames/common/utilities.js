// Draw Text onto a canvas
function drawCanvasText(context2D, txt, pX, pY, clr, fnt)
{
	context2D.fillStyle = clr; // color
	context2D.font = fnt; // font
	context2D.fillText(txt, pX, pY); // text at position X, Y
} // end drawCanvasText

// Gets a random number inclusive to the parameters, so if the parameters are 10, 20, the number is between 10 and 20.
function randomFromTo(from, to)
{
    return Math.floor(Math.random() * (to - from + 1) + from);
}

// See if point x, y is inside the box specified by left, top, right, and bottom
function inside(x, y, left, top, right, bottom)
{
	if (x > left && x < right && y > top && y < bottom)
		return true;
	else
		return false;
} // end inside