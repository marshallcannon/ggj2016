var level1 = {

  loadDesktop: function() {

    //player
    if(!player)
      player = new Player();
    player.setPosition(100, 100);
    game.add.existing(player);
    actorLayer.add(player);

    //pens
    var pen1 = new Pen(200, 200);
    pen1.setRequirement('horns');
    var pen2 = new Pen(500, 200);
    pen2.setRequirement('stripes');
    var pen3 = new Pen(200, 400);
    pen3.setRequirement('quad');
    var pen4 = new Pen(500, 400);
    pen4.setRequirement('ant');

    //animals
    var animal1 = new HornsSolidQuad(300, 300);
    var animal2 = new AntSolidQuad(400, 100);
    var animal3 = new AntStripesQuad(350, 500);
    var animal4 = new AntStripesQuad(400, 500);

  },

  loadMobile: function() {

    //clues
    var clue1 = new CluePen(200, 200, 'horns');
    var clue2 = new CluePen(500, 200, 'stripes');
    var clue3 = new CluePen(200, 400, 'quad');
    var clue4 = new CluePen(500, 400, 'ant');

  }

};

var level2 = {

  loadDesktop: function() {

  },

  loadMobile: function() {
    
  }

};

//Add levels to array
levels.push(level1);
levels.push(level2);
