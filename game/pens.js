function Pen(x, y) {

  Phaser.Sprite.call(this, game, x, y, 'pen');
  this.hb = new Phaser.Rectangle(x+12, y+12, 24, 24);
  game.add.existing(this);
  penList.push(this);
  actorLayer.add(this);

  this.animal = null;
  this.requirement = null;
  this.satisfied = false;

}
Pen.prototype = Object.create(Phaser.Sprite.prototype);

Pen.prototype.update = function() {

  for(var i = 0; i < animalList.length; i++)
  {
    if(checkCollide(this.hb, animalList[i]))
    {
      if(this.animal === null)
      {
        this.animal = animalList[i];
        this.animal.caged = true;
        this.animal.x = this.x + 8;
        this.animal.y = this.y + 8;
      }
    }

  }

};

Pen.prototype.setRequirement = function(input) {

  if(input === 'horns' || input === 'ant' || input === 'stripes' || input === 'solid' || input === 'biped' || input === 'quad')
    this.requirement = input;
  else
    console.log("Incorrect pen requirement: " + input);

};
