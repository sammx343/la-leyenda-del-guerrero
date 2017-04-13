var stopTransition = false;

var Splash = {

  preload : function(){
    game.stage.backgroundColor = "#FFF";
  },

  create : function(){
    var un = game.add.image(game.width/2, game.height-400, 'uninorte', this);
    un.scale.setTo(0.9);
    un.anchor.setTo(0.5);
    un.alpha = 0;

    var mapuka = game.add.image(game.width/2, game.height-200 , 'mapuka', this);
    mapuka.scale.setTo(0.7);
    mapuka.anchor.setTo(0.5);
    mapuka.alpha = 0;

    game.camera.flash('#000000', 2500);

    tween(un, 4000);
    tween(mapuka, 4000);

    game.camera.onFlashComplete.add(function(){
      if(stopTransition == false){
        setTimeout(function(){
          scene_transition('Menu', 1500);
        },1500);
        stopTransition = true;
      }
    }, game);
  }
};