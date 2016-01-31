function Player() {

  Phaser.Sprite.call(this, game, 100, 100, 'player');
  this.hb = new Phaser.Rectangle(0, 0, 32, 30);
  this.updateHB();
  this.anchor.setTo(0.5, 0.5);
  this.kicking = false;

  this.animations.add('idle', [11,12,13,14,15], 5, true);
  this.animations.add('run', [0,1,2,3,4,5,6,7,8,9,10], 20, true);
  this.animations.play('idle');

}
Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.speed = 4;

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

  //Sloppy animation check, next time I'll just keep track of his speed with a variable
  if(!this.kicking && !cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown)
    this.animations.play('idle');


  for(var i = 0; i < animalList.length; i++)
  {
    if(checkCollide(this.hb, animalList[i]))
      player.kick(animalList[i]);
  }

};

Player.prototype.move = function(x, y) {

  if(this.hb.x + this.hb.width + x < game.world.width && this.hb.x + x > 0)
    this.x += x;
  if(this.hb.y + this.hb.height + y < game.world.height && this.hb.y + y > 0)
    this.y += y;

  if(x > 0)
    this.scale.x = 1;
  else {
    this.scale.x = -1;
  }
  this.animations.play('run');

  this.updateHB();

};

Player.prototype.kick = function(target) {

  target.booted((target.x - this.hb.x) * 0.5, (target.y - this.hb.y) * 0.5);

};

Player.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
  this.updateHB();
};

Player.prototype.updateHB = function() {

  this.hb.x = this.x - 16;
  this.hb.y = this.y+4;

};
