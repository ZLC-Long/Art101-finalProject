class Monsters {

  constructor() {
    this.r = 55;
    this.x = width;
    this.y = height - this.r;

  }
  move() {
    this.x -= 10;
  }

  show() {
    image(monsterImg, this.x, this.y - 25, this.r, this.r);
    fill(255, 100);
    ellipseMode(CORNER);
    //test monster attack range
    // ellipse(this.x, this.y - 25, this.r, this.r);
  }
}
