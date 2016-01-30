var DesktopState = function() {
};

DesktopState.prototype.preload = function() {

  game.load.image('player', 'assets/player.png');

};

DesktopState.prototype.create = function() {

  console.log("Starting desktop app");

  //Create player
  player = new Player();
  game.add.existing(player);

  cursors = game.input.keyboard.createCursorKeys();

};

DesktopState.prototype.update = function() {

  

};
