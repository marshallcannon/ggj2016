function Animal(x, y, key) {

  this.texture = key || 'animalDefault';
  Phaser.Sprite.call(this, game, x, y, this.texture);
  this.anchor.setTo(0.5, 0.5);
  game.add.existing(this);
  animalList.push(this);
  actorLayer.add(this);

  this.flying = false;
  this.caged = false;
  this.pen = null;
  this.motX = 0;
  this.motY = 0;
  this.hb = new Phaser.Rectangle(0, 0, this.width, this.height);
  this.hb.offsetX = Math.abs(this.width)/2;
  this.hb.offsetY = Math.abs(this.height)/2;
  this.updateHB();

  //Animations
  this.animations.add('run', [0,1], 5, true);
  this.animations.add('fly', [2,3], 10, true);
  this.animations.add('idle', [4,5], 5, true);

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
  if(this.motX === 0 && this.motY === 0)
  {
    this.flying = false;
    this.animations.play('idle');
  }
  else {
    if(this.flying)
      this.animations.play('fly');
    else
      this.animations.play('run');
    //Change Direction
    if(this.motX > 0)
      this.scale.x = -1;
    else
      this.scale.x = 1;
  }

};

Animal.prototype.booted = function(xSpeed, ySpeed) {

  this.motX = xSpeed;
  this.motY = ySpeed;
  this.flying = true;
  this.caged = false;
  if(this.pen)
    this.pen.releaseAnimal();

};

//Move animal relative to its current position
Animal.prototype.move = function(x, y) {

  if(this.hb.x + this.hb.width + x < game.world.width && this.hb.x + x > 0)
    this.x += x;
  else {
    this.motX *= -1;
  }
  if(this.hb.y + this.hb.height + y < game.world.height && this.hb.y + y > 0)
    this.y += y;
  else {
    this.motY *= -1;
  }
  this.updateHB();

};

//Move animal to absolute position
Animal.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
  this.updateHB();
};

Animal.prototype.setAttributes = function(head, coat, ped) {

  if(head === 'horns' || head === 'ant')
    this.head = head;
  else
    console.log('Invalid head type: ' + head);
  if(coat === 'solid' || coat === 'stripes')
    this.coat = coat;
  else
    console.log('Invalid coat type: ' + coat);
  if(ped === 'biped' || ped === 'quad')
    this.ped = ped;
  else
    console.log('Invalid ped type: ' + ped);

};

Animal.prototype.updateHB = function() {
  this.hb.x = this.x-this.hb.offsetX;
  this.hb.y = this.y-this.hb.offsetY;
};


/***************************************
**********ANIMAL VARIATIONS*************
***************************************/

function HornsSolidQuad(x, y) {
  Animal.call(this, x, y, 'horns-solid-quad');
  this.setAttributes('horns', 'solid', 'quad');
  this.hb = new Phaser.Rectangle(this.x-25, this.y-3, 50, 35);
  this.hb.offsetX = 25;
  this.hb.offsetY = 3;
}
HornsSolidQuad.prototype = Object.create(Animal.prototype);

function AntSolidQuad(x, y) {
  Animal.call(this, x, y, 'ant-solid-quad');
  this.setAttributes('ant', 'solid', 'quad');
  this.hb = new Phaser.Rectangle(this.x-15, this.y+1, 33, 32);
  this.hb.offsetX = 15;
  this.hb.offsetY = -1;
}
AntSolidQuad.prototype = Object.create(Animal.prototype);
