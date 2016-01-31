var MobileState = function() {
};

MobileState.prototype.preload = function() {

  game.load.spritesheet('cluePen', 'assets/mobile/cluepen.png', 64, 64);
  game.load.image('horns', 'assets/mobile/horns.png');
  game.load.image('ant', 'assets/mobile/ant.png');
  game.load.image('quad', 'assets/mobile/quad.png');
  game.load.image('biped', 'assets/mobile/biped.png');
  game.load.image('stripes', 'assets/mobile/stripes.png');
  game.load.image('solid', 'assets/mobile/solid.png');

};

MobileState.prototype.create = function() {

    console.log("Starting mobile app");
    game.scale.setUserScale(window.innerWidth/800, window.innerHeight/600, 0, 0);
    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.scale.pageAlignHorizontally = true;
    game.scale.fullScreenScaleMod = Phaser.ScaleManager.EXACT_FIT;
    game.input.onDown.add(gofull, this);
    game.stage.backgroundColor = '#FFCC99';

    clueList = [];

    this.currentLevel = levels[0];
    this.currentLevel.loadMobile();

};

MobileState.prototype.update = function() {

};

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}

//Socket.io events
socket.on('penUpdate', function(msg){
  console.log(msg);
  if(msg.satisfied)
    clueList[msg.id].frame = 2;
  else {
    clueList[msg.id].frame = 1;
  }
});

//Clue Pens
function CluePen(x, y, clue) {

  Phaser.Sprite.call(this, game, x, y, 'cluePen');
  game.add.existing(this);
  clueList.push(this);

  if(clue === 'horns' || clue === 'ant' || clue === 'stripes' || clue === 'solid' || clue === 'biped' || clue === 'quad')
    this.clue = clue;
  else
    console.log('Invalid clue: ' + clue);

  this.clueImage = game.add.sprite(this.x, this.y, this.clue);

}
CluePen.prototype = Object.create(Phaser.Sprite.prototype);
