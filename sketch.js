let drImg;
let bgImg;
// let bgImg1;
let monsterImg;
let monsters = [];

//spriteSheets and animations
let dog;
let dogStartImage;
let dogJSON;
let dogSpritesheet;
let dogAnimation = [];
//start menu
let state = 'title';
let cnv;
let w = 600;
let h = 600;
//bg Scrolling Image
var x1 = 0;
var x2;
var scrollSpeed = 2;
//sound
let bgsound;


function preload() {
  //spriteSheets
  dogJSON = loadJSON('assests/dog/dog.json');
  dogSpritesheet = loadImage('assests/dog/dog.png');

  // drImg = loadImage('assests/dog64.png');
  monsterImg = loadImage('assests/monster.png');

  //background
  bgImg = loadImage('assests/forest.jpeg');
  //startdogImage
  dogStartImage = loadImage('assests/dogStart.png');
  // bgImg1 = loadImage('assests/bg.png');--test

  //bgSound
  bgsound = loadSound("assests/sound/bgsound.mp3");
}

function setup() {

  //---//
  cnv = createCanvas(w, h);
  //scroll
  x2 = width;
  textFont('monospace');
  //----//
  frameRate(12);
  let dogFrames = dogJSON.frames;
  //dog frames
  for (let i = 0; i < dogFrames.length; i++) {
    let pos = dogFrames[i].frame;
    let img = dogSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    dogAnimation.push(img);

  }
  dog = new Dog();

  //bg music & loop & slider
  bgsound.loop();
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.position(w + 100, h / 10);
  // slider.style('width', '100px');

}


function keyPressed() {
  if (key == ' ') {
    dog.jump();
  }
}

function draw() {
  //switch scene
  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;

    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      //excute code
      break;

    case 'lose!':
      youLose();
      cnv.mouseClicked(youLoseMouseClicked);
      break;

    default:
      break;
  }

  //music Volume
  bgsound.setVolume(slider.value());
  //--spot


}

function title() {
  background(0);
  textSize(80);
  stroke(255);
  textAlign(CENTER);
  fill(255);
  text('Jump! Dog!', w / 2, h / 4);

  textSize(20);
  text('click anywhere to start', w / 2, w / 2);
  noStroke();

  image(dogStartImage, w/10, h-150, dogStartImage.width/4, dogStartImage.height/4);


}

function titleMouseClicked() {
  // console.log('canvas is clicked on title page');
  state = 'level 1'

}


function level1() {
  //scrolling background
  image(bgImg, x1, 0, width, height);
  image(bgImg, x2, 0, width, height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }
  //monster
  if (random(1) < 0.002) {
    monsters.push(new Monsters());
  }

  for (let m of monsters) {
    m.move();
    m.show();
    if (dog.hits(m)) {
      // console.log('gameover');
      // *** noLoop(); game state -> game over
      state = 'lose!'
    }
  }
  // dog show on the sketch
  dog.show();
  dog.move();
  return;
}

function youLose() {
  background(0);
  textSize(80);
  stroke(255);
  text('Fail', w / 2, h / 4);

  textSize(20);
  text('click anywhere to restart', w / 2, h / 3);

}

function level1MouseClicked() {
  //  points += 1;
  // console.log('points = ' + points);
  //
  // if (points >= 10) {
  //   state = 'you win'
  // }
}

//---You Never Win this is endless game unless you losee :)
// function youWinMouseClicked() {
//   state = 'level 1';
//   // points = 0;
// }

function youLoseMouseClicked() {
  state = 'title';
}
