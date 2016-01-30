function Player() {

  Phaser.Sprite.call(this, game, 100, 100, 'player');

}
Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.speed = 2;

Player.prototype.update = function() {

  if(cursors.up.isDown)
  {
    this.move(0, this.speed*-1);
  }
  else if(cursors.down.isDown)
  {
    this.move(0, this.speed);
  }

  if(cursors.left.isDown)
  {
    this.move(this.speed*-1, 0);
  }
  else if(cursors.right.isDown)
  {
    this.move(this.speed, 0);
  }

};

Player.prototype.move = function(x, y) {

  if(this.x + this.width + x < game.world.width && this.x + x > 0)
    this.x += x;
  if(this.y + this.height + y < game.world.height && this.y + y > 0)
    this.y += y;

};
