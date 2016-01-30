function Player() {

  Phaser.Sprite.call(this, game, 100, 100, 'player');

}
Player.prototype = Object.create(Phaser.Sprite.prototype);
