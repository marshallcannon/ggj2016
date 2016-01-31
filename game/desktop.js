var DesktopState = function() {
};

DesktopState.prototype.preload = function() {

  game.load.spritesheet('player', 'assets/player.png', 64, 80);
  game.load.spritesheet('animalDefault', 'assets/animal.png', 32, 32);
  game.load.image('pen', 'assets/pen.png');
  game.load.image('background', 'assets/backGround.png');
  game.load.image('shadow', 'assets/shadow.png');


  //Load animals
  game.load.spritesheet('horns-solid-quad', 'assets/animals/animal-horns-solid-quadruped.png', 64, 64);
  game.load.spritesheet('ant-solid-quad', 'assets/animals/animal-ant-solid-quadruped.png', 64, 64);
  //game.load.spritesheet('horns-stripes-quad', 'assets/animals/horns-stripes-quadruped.png', 64, 64);
  game.load.spritesheet('ant-stripes-quad', 'assets/animals/animal-ant-stripes-quadruped.png', 64, 64);

  game.load.spritesheet('ant-stripes-biped', 'assets/animals/animal-ant-stripes-biped.png', 64, 64);

};

DesktopState.prototype.create = function() {

  console.log("Starting desktop app");

  //Create groups
  backgroundLayer = game.add.group();
  shadowLayer = game.add.group();
  actorLayer = game.add.group();
  guiLayer = game.add.group();

  //Create arrays
  animalList = [];
  penList = [];

  //Flags to Keep Devices in Sync
  desktopReady = false;
  mobileReady = false;

  //Create player
  player = new Player();
  game.add.existing(player);
  actorLayer.add(player);

  //Background
  var background = game.add.sprite(0, 0, 'background');
  backgroundLayer.add(background);

  this.currentLevel = levels[0];
  this.startLevel();

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

DesktopState.prototype.checkWin = function() {

  for(var i = 0; i < penList.length; i++)
  {
    if(!penList[i].satisfied)
      return false;
  }
  var self = this;
  setTimeout(function(){
    self.nextLevel();
    self.clearStage();}, 500);
  return true;

};

DesktopState.prototype.nextLevel = function() {
  this.currentLevel = levels[levels.indexOf(this.currentLevel)+1];
  socket.emit('setLevel', levels.indexOf(this.currentLevel));
};

DesktopState.prototype.clearStage = function() {
  actorLayer.removeAll();
  shadowLayer.removeAll();
  animalList = [];
  penList = [];
};

DesktopState.prototype.startLevel = function() {

  this.currentLevel.loadDesktop();

};

DesktopState.prototype.readyUp = function() {

  readyButton.y = -200;
  socket.emit('readyUp', {});

};

showWinMenu = function() {

  waitingSprite.y = game.height/2-waitingSprite.height/2;
  readyButton.y = game.height/2-readyButton.height/2;

};

hideWinMenu = function() {

  waitingSprite.y = -200;
  readyButton.y = -200;

};

showLoseMenu = function() {

};

hideLoseMenu = function() {

};

showCompleteMenu = function() {

};

hideCompleteMenu = function() {

};



//Socket.io events
socket.on('readyUp', function(msg){
  mobileReady = true;
});
