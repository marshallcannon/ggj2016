var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

  game.load.image('player', 'assets/player.png');

}

var player;

function create() {

  //DESKTOP
  if(this.game.device.desktop)
  {

  }
  //MOBILE
  else {

  }

}

function update() {

}
