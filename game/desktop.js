var DesktopState = function() {
};

DesktopState.prototype.preload = function() {

  game.load.image('player', 'assets/player.png');

};

DesktopState.prototype.create = function() {

  console.log("Starting desktop app");

  //Create player
  this.player = new Player();
  game.add.existing(this.player);

};
