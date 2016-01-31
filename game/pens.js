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

  if(!this.animal)
  {
    for(var i = 0; i < animalList.length; i++)
    {
      if(checkCollide(this.hb, animalList[i].hb))
      {
        if(!animalList[i].caged)
          this.grabAnimal(animalList[i]);
      }

    }
  }

};

Pen.prototype.setRequirement = function(input) {

  if(input === 'horns' || input === 'ant' || input === 'stripes' || input === 'solid' || input === 'biped' || input === 'quad')
    this.requirement = input;
  else
    console.log("Invalid pen requirement: " + input);

};

Pen.prototype.grabAnimal = function(animal) {

  this.animal = animal;
  this.animal.caged = true;
  this.animal.motX = 0;
  this.animal.motY = 0;
  this.animal.setPosition(this.x + this.width/2, this.y + this.height/4);
  this.animal.pen = this;

  if(this.checkSatisfied())
  {
    this.satisfied = true;
    socket.emit('penUpdate', {id: penList.indexOf(this), satisfied: 1});
  }
  else
  {
    this.satisfied = false;
    socket.emit('penUpdate', {id: penList.indexOf(this), satisfied: 0});
  }

  DesktopState.checkWin();

};

Pen.prototype.releaseAnimal = function(animal) {

  this.animal = null;
  this.satisfied = false;
  socket.emit('penUpdate', {id: penList.indexOf(this), satisfied: -1});

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
