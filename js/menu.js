var Menu = {

  preload : function(){
    game.stage.backgroundColor = "#FCF5D6";
    game.load.image('titulo', 'assets/la_leyenda/menu/identificador.png');
    game.load.image('fondo', 'assets/la_leyenda/menu/fondo.png');
    game.load.atlasJSONHash('jugarButton', 'assets/la_leyenda/menu/botones-jugar.png', 'js/atlas/menu_button.json');
  },

  create : function(){
    var fondo = game.add.tileSprite(0, 0, 1480, 920, 'fondo');
    fondo.fixedToCamera = true;
    fondo.scale.setTo(0.7,0.7);

    var titulo = game.add.sprite(game.width/2, game.height/3 , 'titulo', this);
    titulo.scale.setTo(0.8, 0.8);
    titulo.anchor.setTo(0.5);

    var jugarButton = game.add.button(game.width/2, game.height/2+100, 'jugarButton', Menu.iniciarJuego, Menu , 0, 1, 1);
    jugarButton.anchor.setTo(0.5);
    jugarButton.scale.setTo(0.7, 0.7);
  },

  iniciarJuego : function(){
    this.state.start('Game');
  }
};