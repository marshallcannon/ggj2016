function Player() {

  Phaser.Sprite.call(this, game, 100, 100, 'player');

}
Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.speed = 2;

Player.prototype.update = function() {

  if(cursors.up.isDown)
  {
    player.y -= this.speed;
  }
  else if(cursors.down.isDown)
  {
    player.y += this.speed;
  }

  if(cursors.left.isDown)
  {
    player.x -= this.speed;
  }
  else if(cursors.right.isDown)
  {
    player.x += this.speed;
  }


};
