var fondo;
var titulo;
var jugarButton;
var mouse;
var player;
var music;

var Menu = {

  preload : function(){
    game.stage.backgroundColor = "#000000";
  },

  create : function(){
    music = game.add.audio('music1',0.2,true);
    music.play();

    fondo = game.add.tileSprite(0, 0, 1480, 920, 'fondo');
    fondo.fixedToCamera = true;
    fondo.scale.setTo(0.7);
    
    titulo = game.add.sprite(game.width/2, game.height/3 , 'titulo', this);
    titulo.scale.setTo(0.8);
    titulo.anchor.setTo(0.5);
    titulo.alpha = 0;

    jugarButton = game.add.button(game.width/2, game.height/2+100, 'jugarButton', Menu.iniciarJuego, Menu , 1,0,0,1);
    jugarButton.anchor.setTo(0.5);
    jugarButton.scale.setTo(0.7, 0.7);
    jugarButton.alpha = 0;

    game.camera.flash('#000000', 1000);

    platform = game.add.sprite(0, game.height - 130, 'capa11');
    platform.enableBody = true;
    platform.alpha = 0;

    player = game.add.sprite(-800, game.height - 245, 'dude');
    player.animations.add('walk-right', [0,1,2,3,2,1], 10, true);
    player.animations.add('punch-right', [10,11,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,2], 6 , true);
    player.scale.setTo(1.05);

    game.camera.onFlashComplete.add(function(){
      // game.add.tween(titulo).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 1000, -1, true);
      game.add.tween(titulo).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
      game.add.tween(jugarButton).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
      game.add.tween(platform).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 700, 0, false);
    }, game);
  },

  update : function(){
    if(player.x <= 150){
      player.x += 3;
      player.animations.play('walk-right');
    }else{
      player.animations.play('punch-right');
    }
  },

  iniciarJuego : function(){
    scene_transition('Mapa', 500);
  }
};


