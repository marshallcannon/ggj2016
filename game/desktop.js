var DesktopState = function() {
};

DesktopState.prototype.preload = function() {

  game.load.spritesheet('player', 'assets/player.png', 64, 80);
  game.load.spritesheet('animalDefault', 'assets/animal.png', 32, 32);
  game.load.image('pen', 'assets/pen.png');
  game.load.image('background', 'assets/backGround.png');
  game.load.image('shadow', 'assets/shadow.png');

  game.load.image('readyButton', 'assets/readyButton.png');
  game.load.image('waiting', 'assets/waitingButton.png');
  game.load.image('exitButton', 'assets/exitButton.png');
  game.load.image('winText', 'assets/winText.png');
  game.load.image('loseText', 'assets/loseText.png');
  game.load.image('completeText', 'assets/completeText.png');

  //Load animals
  game.load.spritesheet('horns-solid-quad', 'assets/animals/animal-horns-solid-quadruped.png', 64, 64);
  game.load.spritesheet('ant-solid-quad', 'assets/animals/animal-ant-solid-quadruped.png', 64, 64);
  //game.load.spritesheet('horns-stripes-quad', 'assets/animals/horns-stripes-quadruped.png', 64, 64);
  game.load.spritesheet('ant-stripes-quad', 'assets/animals/animal-ant-stripes-quadruped.png', 64, 64);

  game.load.spritesheet('ant-stripes-biped', 'assets/animals/animal-ant-stripes-biped.png', 64, 64);

  //Music
  //game.load.audio('song', 'assets/song.wav');

};

DesktopState.prototype.create = function() {

  console.log("Starting desktop app");

  //song = game.add.audio('song');
  //song.play();

  //Create groups
  backgroundLayer = game.add.group();
  shadowLayer = game.add.group();
  actorLayer = game.add.group();
  guiLayer = game.add.group();

  //Menu Stuff
  winText = game.add.sprite(game.width/2 - 200, -200, 'winText');
  loseText = game.add.sprite(game.width/2 - 200, -200, 'loseText');
  completeText = game.add.sprite(game.width/2 - 200, -200, 'completeText');
  waitingSprite = game.add.sprite(game.width/2 - 200, -200, 'waiting');
  desktopReadyButton = game.add.button(game.width/2 - 200, -200, 'readyButton', DesktopState.prototype.readyUp);
  desktopExitButton = game.add.button(game.width/2 - 200, -200, 'exitButton', DesktopState.prototype.restart);
  mobileReadyButton = game.add.button(game.width/2 - 200, -200, 'readyButton', MobileState.prototype.readyUp);
  mobileExitButton = game.add.button(game.width/2 - 200, -200, 'exitButton', MobileState.prototype.restart);

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

  if(mobileReady && desktopReady)
    this.startLevel();

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
    self.clearStage();
    self.showWinMenu();
    socket.emit('win', {});}, 500);
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

  desktopReadyButton.y = -200;
  socket.emit('readyUp', {});

};

DesktopState.prototype.showWinMenu = function() {

  console.log('win!');
  winText.y = game.height/2-80-200;
  console.log(winText.x, winText.y);
  waitingSprite.y = game.height/2-waitingSprite.height/2;
  desktopReadyButton.y = game.height/2-80;

};

DesktopState.prototype.hideWinMenu = function() {

  winText.y = -200;
  waitingSprite.y = -200;
  desktopReadyButton.y = -200;

};

DesktopState.prototype.showLoseMenu = function() {

  loseText.y = game.height/2-80-200;
  waitingSprite.y = game.height/2-waitingSprite.height/2;
  desktopReadyButton.y = game.height/2-waitingSprite.height/2;
  desktopExitButton.y = game.height/2-waitingSprite.height/2+200;

};

DesktopState.prototype.hideLoseMenu = function() {

  loseText.y = -200;
  waitingSprite.y = -200;
  desktopReadyButton.y = -200;
  desktopExitButton.y = -200;

};

DesktopState.prototype.showCompleteMenu = function() {

  completeText.y = game.height/2-80-200;
  desktopExitButton.y = game.height/2-80;

};

DesktopState.prototype.hideCompleteMenu = function() {

  completeText.y = -200;
  desktopExitButton.y = -200;

};

DesktopState.prototype.restart = function() {

  DesktopState.clearStage();
  game.state.start('desktop');

};



//Socket.io events
socket.on('readyUp', function(msg){
  mobileReady = true;
});
socket.on('restart', function(msg){
  Desktop.prototype.restart();
});
