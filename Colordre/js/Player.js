class Player {
  constructor(id, position, grid, ctx, color = "black") {
    this.id = id;
    this.grid = grid;
    this.position = position;

    this.noTrailColor = "rgba(0,0,0,0)";
    this.trailColor = this.noTrailColor;
    this.trails = [];

    this.ctx = ctx;
    this.color = color;
    this.radius = this.grid.size * 0.5;
  }

  detect(x, y) {
    return (
      Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) <=
      this.radius
    );
  }

  move(moveX, moveY, opponentTrail) {
    //wall collision
    if (moveY > 0 && this.position.y >= this.grid.rows - 1) moveY = 0;
    else if (moveY < 0 && this.position.y <= 0) moveY = 0;

    if (moveX > 0 && this.position.x >= this.grid.cols - 1) moveX = 0;
    else if (moveX < 0 && this.position.x <= 0) moveX = 0;

    this.position.x += moveX;
    this.position.y += moveY;

    //opponentTrail collision
    for (let { col, row, trailColor } of opponentTrail) {

      if(trailColor === this.noTrailColor)
        continue;

      // object destructuring
      if (this.position.x === col && this.position.y === row) {
        console.log("player collided", trailColor);
        break;
      }

      // let { x, y } = this.toPixelCoords(col, row);
      // this.ctx.fillStyle = trailColor;
      // this.ctx.fillRect(x, y, this.grid.size, this.grid.size);
    }

    this.trails.push({
      col: this.position.x,
      row: this.position.y,
      trailColor: this.trailColor,
    });
  }

  changeColor(color) {
    let lastTrail = this.trails[this.trails.length - 1];

    if (lastTrail) lastTrail.trailColor = color;

    this.trailColor = color;
  }

  show() {
    let radius = this.grid.size / 2;
    let { x, y } = this.toPixelCoords(this.position.x, this.position.y);
    //
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(x + radius, y + radius, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawTrail() {
    let ctx = this.ctx;
    for (let { col, row, trailColor } of this.trails) {
      // object destructuring

      let { x, y } = this.toPixelCoords(col, row);

      this.ctx.fillStyle = trailColor;
      this.ctx.fillRect(x, y, this.grid.size, this.grid.size);
    }
  }

  toPixelCoords(col, row) {
    return {
      x: this.grid.offset.x + col * this.grid.size,
      y: this.grid.offset.y + row * this.grid.size,
    };
  }
}
