// CODE JS
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.display = "none";
    document.body.appendChild(this.canvas);
    //ctx
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx.strokeStyle = "black";

    //mémoire pour stocker tous les players
    //player qui suivra les touches clavier
    this.player = null;
    this.opponent = null;
    this.listener();
    this.setup();
  }

  listener() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("click", this.onClick.bind(this));


    window.addEventListener("resize", () => {
      this.canvas.width = this.w = window.innerWidth;
      this.canvas.height = this.h = window.innerHeight;
      this.grid.resizeGrid();
    });
  }

  onClick(e) {
    this.canvas.style.display = "block";

  }
  onKeyDown(e) {
    //les interactions du clavier pour naviguer dans la grille haut-bas-gauche-droite
    let moveX, moveY;

    moveX = 0;
    moveY = 0;

    switch (e.key) {
      case "ArrowDown":
        moveY = 1;
        break;
      case "ArrowUp":
        moveY = -1;
        break;
      case "ArrowLeft":
        moveX = -1;
        break;
      case "ArrowRight":
        moveX = 1;
        break;
    }

    this.player.move(moveX, moveY, this.opponent.trails);

    moveX = 0;
    moveY = 0;

    switch (e.key) {
      case "s":
        moveY = 1;
        break;
      case "z":
        moveY = -1;
        break;
      case "q":
        moveX = -1;
        break;
      case "d":
        moveX = 1;
        break;
    }

    this.opponent.move(moveX, moveY, this.player.trails);
  }

  setup() {
    // on définit des dimensions de grille (ligne, colonne, dimension, context)
    this.grid = new Grid(10, 20, 75, this.ctx);
    //Ajouter 3 players, sur 3 cases différentes, de 3 couleurs différentes
    // this.player = new Player(0, { x: 0, y: 0 }, this.grid, this.ctx, "violet");

    if (this.draw) this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    //on affiche la grille
    this.grid.show();
    this.player.show();

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = () => {
  // new App();
  new TargetInOrder();
};