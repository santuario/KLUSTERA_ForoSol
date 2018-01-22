/*
 *
 * Coca-Cola
 * Store Distribution (January 2017)
 * Klustera
 * Adrian Santuario
 *
 */


/*
 *****************************************
 *****************************************
 * VARIABLES
 *****************************************
 *************
 */


// Background
var backgroundImage;

// Points
var points = [];

// Key Points
var keyPoints = [];

// Items
var items = [];
var itemsCount = 16;

// Font
var geoMidFont
var geoSmallFont;

var currentPosition;



/*
 *****************************************
 *****************************************
 * LYFE CYCLE METHODS
 *****************************************
 *****************************************
 */


function preload() {
  // Backgrund
  backgroundImage = loadImage("assets/images/MapDark.png");


  // Fuemtes
  geoMidFont = loadFont('assets/fonts/Geogtq-Md.otf');
  geoSmallFont = loadFont('assets/fonts/Geogtq-Ul.otf');


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializePoints();
  initializeKeyPoints();
}


function setup() {

  createCanvas(displayWidth, displayHeight);

  initialize();
}

function draw() {


  drawBackground();
  drawPoints();
  drawKeyPoints();
  drawClock();
  drawItems();

}




/*
 *****************************************
 *****************************************
 * INITIALIZE METHODS
 *****************************************
 *****************************************
 */

function initialize() {

  initializeBackground();
  initializePoints();
  initializeClock();
  initializeKeyPoints();
  initializeItems();

}



/*
 *****************************************
 *****************************************
 * BACKGROUND METHODS
 *****************************************
 *****************************************
 */


function initializeBackground() {


}



function drawBackground() {


  var correctionXS = (windowWidth / 2) - (backgroundImage.width / 2);
  var correctionYS = (windowHeight / 2) - (backgroundImage.height / 2);

  image(backgroundImage, correctionXS, correctionYS);

}



/*
 *****************************************
 *****************************************
 * POINTS METHODS
 *****************************************
 *****************************************
 */


function initializePoints() {
  points.length = 0;
  for (var i = 0; i < 10; i++) {
    var p = createVector(random(0, windowWidth), random(0, windowHeight));
    points.push(p);
  }
}



function drawPoints() {

  noFill();
  stroke(128);
  beginShape();

  for (var i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);


  var progress = map(mouseX, 0, windowWidth, 0, points.length - 1);
  var index = floor(progress);

  var firstP = points[index];
  var secondP = points[index + 1];

  var px = lerp(firstP.x, secondP.x, progress - index);
  var py = lerp(firstP.y, secondP.y, progress - index);


  fill(255);
  noStroke();

  ellipse(px, py, 20, 20);

  currentPosition = createVector(px, py);




  for (var i = 0; i < random(30); i++) {



    var deltaX = random(-i * 5, i * 5);
    var deltaY = random(-i * 5, i * 5);
    ellipse(px + deltaX, py + deltaY, 5, 5); // Draw the point we were looking for



  }


}


/*
 *****************************************
 *****************************************
 * CLOCK METHODS
 *****************************************
 *****************************************
 */


function initializeClock() {

}


function drawClock() {

  fill(255);
  textAlign(LEFT, TOP);
  noStroke();
  //Title
  textFont(geoMidFont);
  textSize(30);
  text("Coca Cola", 30, 20);

  //Subtitle
  textFont(geoSmallFont);
  textSize(20);
  text("Store distribution", 30, 60, (windowWidth / 2) - 50, windowHeight);

  //Clock
  textAlign(RIGHT, TOP);
  textFont(geoMidFont);
  textSize(50);
  var timeText = "";
  var timeSupportText = "";
  var hourFloat = round(map(mouseX, 0, windowWidth, 0, 23));
  var minFloat = round(map(mouseX, 0, windowWidth, 0, 1440));
  minFloat = minFloat % 60;

  var hourText = str(hourFloat);
  var minText = str(minFloat);

  if (hourFloat < 10) {
    hourText = "0" + hourText;
  }

  if (hourFloat < 12) {
    timeSupportText = "AM";
  } else {
    timeSupportText = "PM";
  }

  if (minFloat < 10) {
    minText = "0" + minText;
  }




  timeText = hourText + ":" + minText;
  text(timeText, windowWidth - 60, 20);

  textAlign(LEFT, TOP);
  textFont(geoSmallFont);
  textSize(25);
  text(timeSupportText, windowWidth - 55, 30);



}




/*
 *****************************************
 *****************************************
 * KEYPOINTS METHODS
 *****************************************
 *****************************************
 */



function initializeKeyPoints() {
    keyPoints.length = 0;

  for (var i = 0; i < 5; i++) {
    var p = createVector(random(0, windowWidth), random(0, windowHeight));
    keyPoints.push(points[i]);
  }
}



function drawKeyPoints() {

  //var progress = map(mouseX, 0, windowWidth, 0, 100);

  // print(currentPosition.x + ", " + currentPosition.y);

  for (var i = 0; i < keyPoints.length; i++) {


    var d = dist(keyPoints[i].x, keyPoints[i].y, currentPosition.x, currentPosition.y);

    if (d < 20) {
      ellipse(keyPoints[i].x, keyPoints[i].y, 50, 50);

    }

  }

}


/*
 *****************************************
 *****************************************
 * ITEMS METHODS
 *****************************************
 *****************************************
 */


function initializeItems() {

  items.length = 0;

  for (var i = 0; i < itemsCount; i++) {
    var s = floor(random(5, 25));
    items.push(new Item(floor(random(s, windowWidth - s)), floor(random(s, windowHeight - s)), s));

  }

}


function drawItems() {
  for (var i = 0; i < items.length; i++) {
    items[i].targetPosition = currentPosition;
    items[i].update();
    items[i].display();
    items[i].checkBoundaryCollision();
    for (var j = 0; j < items.length; j++) {
      items[j].checkCollision(items[i]);
    }
  }
}




/*
 *****************************************
 *****************************************
 * UI METHODS
 *****************************************
 *****************************************
 */

function mouseClicked() {
  initializeItems();
  //print("MIAU");
  //print(((windowWidth / 2) - mouseX) + " :: " + mouseX + " , " + ((windowHeight / 2) - mouseY) + " :: " + mouseY);
}