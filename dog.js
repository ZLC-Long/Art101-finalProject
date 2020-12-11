class Dog {
  constructor() {
    this.r = 85;
    this.x = this.r;
    this.y = height - 150;
    this.vy = 0;
    this.gravity = 1.9;
  }

  hits(monsters) {
    let x1 = this.x + this.r * 0.5;
    let y1 = this.y + this.r * 0.5;
    let x2 = monsters.x + monsters.r * 0.5;
    let y2 = monsters.y + monsters.r * 0.5;
    return collideCircleCircle(x1, y1, this.r, x2, y2, monsters.r);
  }

  jump() {
    if (this.y == height - this.r) {
      this.vy = -22;
    }
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);

  }

  show() {

    image(dogAnimation[frameCount % dogAnimation.length], this.x, this.y - 25, this.r, this.r);
    // fill(255, 50);
    // ellipseMode(CORNER);
    // ellipse(this.x, this.y - 25, this.r, this.r);
  }
}
