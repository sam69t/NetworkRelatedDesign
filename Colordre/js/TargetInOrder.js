class TargetInOrder extends App {
  get draw() {
    return undefined;
  }
  constructor() {
    super();
    console.log("Target In Order");
    //
    this.targets = [
      new Target(
        0,
        {
          x: 3,
          y: 5,
        },
        this.grid,
        "Lavender",
        this.ctx
      ),
      new Target(
        1,
        {
          x: 4,
          y: 3,
        },
        this.grid,
        "Darkgreen",
        this.ctx
      ),
      new Target(
        2,
        {
          x: 6,
          y: 7,
        },
        this.grid,
        "DarkRed",
        this.ctx
      ),
      new Target(
        3,
        {
          x: 16,
          y: 3,
        },
        this.grid,
        "DarkBlue",
        this.ctx
      ),
    ];
    this.shuffleArray(this.targets);

    //on cre un player pour la demo
    // this.players = [];
    this.player = new Player(0, { x: 0, y: 0 }, this.grid, this.ctx, "black");


    this.opponent = new Player(0, { x: 3, y: 0 }, this.grid, this.ctx, "black");
    // );

    // INDEX POUR LA DETECTION
    this.detectionIndex = 0;

    this.show();
  }

  onKeyDown(e) {
    super.onKeyDown(e);
    // on vérifie la position de tous les target pour pouvoir comparer leur id

    for (let id = 0; id < this.targets.length; id++) {
      let item = this.targets[id];

      if (
        this.player.position.x == item.position.x &&
        this.player.position.y == item.position.y
      ) {
        if (this.targets[this.detectionIndex].id == item.id) {
          console.log("BONNE TARGET. CONTINUE");
          item.detected = true;

          this.player.changeColor(item.color);

          this.detectionIndex++;

          break;
        } else {
          console.log("MAUVAISE TARGET. IL FAUT RECHARGER LA PAGE");
        }
      }
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  show() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    //on affiche les target
    this.targets.forEach((item, id) => {
      item.show();
    });

    this.player.drawTrail();
    //on affiche la grille
    this.grid.show();
    this.opponent.show();
    // on affiche tous les players
    this.player.show();

    this.showOrder();

    requestAnimationFrame(this.show.bind(this));
  }

  showOrder() {
    this.targets.forEach((item, id) => {
      this.ctx.fillStyle = item.detected ? "grey" : item.color;
      const x = this.grid.offset.x + id * this.grid.size;
      const y = this.grid.offset.y - this.grid.size - 20;
      this.ctx.fillRect(x, y, this.grid.size, this.grid.size);
    });
  }
}
