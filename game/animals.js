function Animal(x, y, key) {
  this.texture = key || 'animalDefault';
  Phaser.Sprite.call(this, game, x, y, this.texture);
}
Animal.prototype = Object.create(Phaser.Sprite.prototype);

Animal.prototype.update = function() {

};
