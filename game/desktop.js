var DesktopState = function() {
};

DesktopState.prototype.preload = function() {

  game.load.spritesheet('player', 'assets/player.png', 64, 80);
  game.load.image('animalDefault', 'assets/animal.png');
  game.load.image('pen', 'assets/pen.png');
  game.load.image('background', 'assets/backGround.png');

};

DesktopState.prototype.create = function() {

  console.log("Starting desktop app");

  //Create groups
  backgroundLayer = game.add.group();
  actorLayer = game.add.group();
  guiLayer = game.add.group();

  //Create arrays
  animalList = [];
  penList = [];

  //Background
  var background = game.add.sprite(0, 0, 'background');
  backgroundLayer.add(background);

  //Create player
  player = new Player();
  game.add.existing(player);
  actorLayer.add(player);


  this.currentLevel = level1;
  this.currentLevel.loadDesktop();

  cursors = game.input.keyboard.createCursorKeys();

};

DesktopState.prototype.update = function() {

  actorLayer.sort('y', Phaser.Group.SORT_ASCENDING);

};

DesktopState.prototype.render = function() {

  //game.debug.geom(player.hb, 'rgba(255, 0, 0, .5)');

};
