var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update }, false, false);

var socket = io();

var levels = [];

function preload() {

  game.load.image('readyButton', 'assets/readyButton.png');
  game.load.image('waiting', 'assets/waitingButton.png');
  game.load.image('exitButton', 'assets/exitButton.png');

}

function create() {

  //Menu stuff
  waitingSprite = game.add.sprite(game.width/2 - 200, -200, 'waiting');
  readyButton = game.add.button(game.width/2 - 200, -200, 'readyButton', DesktopState.prototype.readyUp);

  game.state.add('desktop', DesktopState, false);
  game.state.add('mobile', MobileState, false);

  //DESKTOP
  if(this.game.device.desktop)
  {
    game.state.start('desktop');
  }
  //MOBILE
  else {
    game.state.start('mobile');
  }

}

function update() {

}
