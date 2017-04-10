var fondo;
var titulo;
var jugarButton;
var mouse;
var Menu = {

  preload : function(){
    game.stage.backgroundColor = "#000000";
  },

  create : function(){
    fondo = game.add.tileSprite(0, 0, 1480, 920, 'fondo');
    fondo.fixedToCamera = true;
    fondo.scale.setTo(0.7,0.7);
    
    titulo = game.add.sprite(game.width/2, game.height/3 , 'titulo', this);
    titulo.scale.setTo(0.8, 0.8);
    titulo.anchor.setTo(0.5);
    titulo.alpha = 0;

    jugarButton = game.add.button(game.width/2, game.height/2+100, 'jugarButton', Menu.iniciarJuego, Menu , 1,0,0,1);
    jugarButton.anchor.setTo(0.5);
    jugarButton.scale.setTo(0.7, 0.7);
    jugarButton.alpha = 0;

    game.camera.flash('#000000', 1000);

    game.camera.onFlashComplete.add(function(){
      game.add.tween(titulo).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
      game.add.tween(jugarButton).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
    }, game);
  },

  update : function(){
  },

  iniciarJuego : function(){
    scene_transition('Mapa', 500);
  }
};


