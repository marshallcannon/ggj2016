var DesktopState = function() {
};

DesktopState.prototype.preload = function() {

  game.load.spritesheet('player', 'assets/player.png', 64, 80);
  game.load.spritesheet('animalDefault', 'assets/animal.png', 32, 32);
  game.load.image('pen', 'assets/pen.png');
  game.load.image('background', 'assets/backGround.png');

  //Load animals
  game.load.spritesheet('horns-solid-quad', 'assets/animals/animal-horns-solid-quadruped.png', 64, 64);
  game.load.spritesheet('ant-solid-quad', 'assets/animals/animal-ant-solid-quadruped.png', 64, 64);
  //game.load.spritesheet('horns-stripes-quad', 'assets/animals/horns-stripes-quadruped.png', 64, 64);
  game.load.spritesheet('ant-stripes-quad', 'assets/animals/animal-ant-stripes-quadruped.png', 64, 64);

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


  this.currentLevel = levels[0];
  this.currentLevel.loadDesktop();

  cursors = game.input.keyboard.createCursorKeys();
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  spacebar.onDown.add(Player.prototype.kick, player);

};

DesktopState.prototype.update = function() {

  actorLayer.sort('y', Phaser.Group.SORT_ASCENDING);

};

DesktopState.prototype.render = function() {

  //game.debug.geom(player.hb, 'rgba(255, 0, 0, .5)');

  //for(var i = 0; i < animalList.length; i++)
  //{
  //  game.debug.geom(animalList[i].hb, 'rgba(255, 0, 0, .5)');
  //}

};

DesktopState.checkWin = function() {

  for(var i = 0; i < penList.length; i++)
  {
    if(!penList[i].satisfied)
      return false;
  }
  console.log('Win!');
  return true;

};
