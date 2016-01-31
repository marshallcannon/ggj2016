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
        this.grabAnimal(animalList[i]);
    }

  }

};

Pen.prototype.setRequirement = function(input) {

  if(input === 'horns' || input === 'ant' || input === 'stripes' || input === 'solid' || input === 'biped' || input === 'quad')
    this.requirement = input;
  else
    console.log("Ivalid pen requirement: " + input);

};

Pen.prototype.grabAnimal = function(animal) {

  this.animal = animal;
  this.animal.caged = true;
  this.animal.x = this.x + 8;
  this.animal.y = this.y + 8;

  if(this.checkSatisfied())
    socket.emit('penUpdate', {id: penList.indexOf(this), satisfied: true});
  else
    socket.emit('penUpdate', {id: penList.indexOf(this), satisfied: false});

};

Pen.prototype.releaseAnimal = function(animal) {

};

Pen.prototype.checkSatisfied = function() {

  if(this.animal)
  {
    if(this.animal.head === this.requirement || this.animal.coat === this.requirement || this.animal.ped === this.requirement)
    {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }

};
