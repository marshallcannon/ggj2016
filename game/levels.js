var level1 = {

  loadDesktop: function() {

    player.setPosition(100, 100);

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
    var animal1 = new Animal(300, 300);
    var animal2 = new Animal(400, 100);

  },

  loadMobile: function() {

  }

};
