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

    game.scale.setUserScale(window.innerWidth/480, window.innerHeight/800, 0, 0);
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  }

}

function update() {

}
