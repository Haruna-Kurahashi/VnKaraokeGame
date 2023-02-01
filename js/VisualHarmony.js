class VisualHarmony {
  constructor(_x, _y, _d) {
    this.posX = _x;
    this.posY = _y;
    this.diameter = _d;
    // this.blur = 30;
    this.color = color(0, 0, 255, 80);
    this.shadowColor = color(0,0, 255);
  }
  draw() {
    blendMode(BLEND);
    drawingContext.shadowColor = color(0);
    blendMode(SCREEN);
    push();
    // fill(0, 80, 100, 80);
    fill(this.color);
    // fill(193, 253, 166, 50);
    noStroke();
    translate(this.posX, this.posY);
    rotate(radians(45));
    drawingContext.shadowBlur = this.blur;
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowColor = this.shadowColor;
    // drawingContext.shadowColor = color(127, 250, 128);
    // drawingContext.shadowColor = color(57, 181, 74);
    square(0, 0, this.diameter, 4);
    pop();
  }

  setBlur(blur) {
    this.blur = blur;
  }

  setColor(color, shadow_color) {
    this.color = color;
    this.shadowColor = shadow_color;
  }
}



class AnimationRectangle {
  constructor() {
    this.size = 10;
  }
  draw() {
    push();
    translate(width / 2, height / 2 - 100);
    rotate(radians(45));
    stroke(255);
    noFill();
    strokeWeight(2);
    square(0, 0, this.size);
    this.size += 30;

    pop();
  }
}

class AnimationCross {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.baseX = random(width);
    this.baseY = random(height);
    this.size = random(20, 80);
    this.color = random(0, 255);
    this.angle = 0;
  }

  draw() {
    blendMode(BLEND);
    drawingContext.shadowColor = color(0);
    blendMode(SCREEN);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowColor = color(255, 255, 255);
    push();
    translate(this.baseX, this.baseY);
    rotate(this.angle);
    noStroke();
    fill(this.color, this.color, 0);
    rect(this.x, this.y, this.size / 5, this.size);
    rect(this.x, this.y, this.size, this.size / 5);
    this.angle = this.angle + 0.08;
    pop();
  }
}

class AnimationSmallRects {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(3, 20));
    this.size = random(1, 60);
    this.opacity = random(100);
    this.randomNumber = random(100);
  }
  draw() {
    blendMode(BLEND);
    // drawingContext.shadowColor = color(0);
    // blendMode(SCREEN);
    // drawingContext.shadowBlur = 20;
    // drawingContext.shadowOffsetX = 0;
    // drawingContext.shadowOffsetY = 0;
    // drawingContext.shadowColor = color(255, 255, 255, 80);
    if (this.randomNumber > 50) {
      fill(255, 255, 255);
      square(this.position.x, this.position.y, this.size);
      square(this.position.x, this.position.y, this.size);
    } else {
      noFill();
      strokeWeight(5);
      stroke(color(255, 255, 255));
      square(this.position.x, this.position.y, this.size);
       square(this.position.x, this.position.y, this.size);
    }
    this.position.add(this.velocity);
  }
}
