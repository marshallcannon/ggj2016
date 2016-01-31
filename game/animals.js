function Animal(x, y, key) {

  this.texture = key || 'animalDefault';
  Phaser.Sprite.call(this, game, x, y, this.texture);
  game.add.existing(this);
  animalList.push(this);
  actorLayer.add(this);

  this.flying = false;
  this.caged = false;
  this.motX = 0;
  this.motY = 0;

  //Attributes
  this.head = null;
  this.coat = null;
  this.ped = null;

}
Animal.prototype = Object.create(Phaser.Sprite.prototype);

Animal.prototype.update = function() {

  if(!this.caged)
  {
    if(this.flying)
    {
      this.move(this.motX, this.motY);
      this.motX *= 0.95;
      this.motY *= 0.95;

      if(Math.abs(this.motX) < 0.5 && Math.abs(this.motY) < 0.5)
      {
        this.motX = 0;
        this.motY = 0;
      }
    }
  }

};

Animal.prototype.booted = function(xSpeed, ySpeed) {

  this.motX = xSpeed;
  this.motY = ySpeed;
  this.flying = true;

};

Animal.prototype.move = function(x, y) {

  if(this.x + this.width + x < game.world.width && this.x + x > 0)
    this.x += x;
  else {
    this.motX *= -1;
  }
  if(this.y + this.height + y < game.world.height && this.y + y > 0)
    this.y += y;
  else {
    this.motY *= -1;
  }

};

Animal.prototype.setAttributes = function(head, coat, ped) {

  if(head === 'horns' || head === 'ant')
    this.head = head;
  else
    console.log("Incorrect head type");

};
