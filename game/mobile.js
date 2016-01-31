var MobileState = function() {
};

MobileState.prototype.preload = function() {

};

MobileState.prototype.create = function() {

    console.log("Starting mobile app");
    game.scale.setUserScale(window.innerWidth/800, window.innerHeight/600, 0, 0);
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.fullScreenScaleMod = Phaser.ScaleManager.EXACT_FIT;
    game.input.onDown.add(gofull, this);

};

MobileState.prototype.update = function() {

};

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}

//Socket.io events
socket.on('penUpdate', function(msg){
  console.log(msg);
});
