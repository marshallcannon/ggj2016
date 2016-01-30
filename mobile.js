var MobileState = function() {
};
MobileState.prototype = {

  preload: function() {

  },

  create: function() {

    console.log("Starting mobile app");
    game.scale.setUserScale(window.innerWidth/800, window.innerHeight/600, 0, 0);
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  }

};
