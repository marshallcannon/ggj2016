var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var socket = io();

function preload() {

}

var player;

function create() {

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
