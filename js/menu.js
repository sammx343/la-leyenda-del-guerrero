var Menu = {

  preload : function(){
    game.stage.backgroundColor = "#FCF5D6";
    game.load.image('titulo', 'assets/la_leyenda/menu/titulo.png');
    game.load.image('jugarButton', 'assets/la_leyenda/menu/jugar_button.png');
  },

  create : function(){
    var titulo = game.add.sprite(0, 0, 'titulo', this);
    titulo.scale.setTo(0.9, 0.8);

    var jugarButton = game.add.button(game.width/2, game.height/2+50, 'jugarButton', Menu.iniciarJuego, Menu , 'titulo', 'titulo', 'titulo', 'titulo' )
    jugarButton.anchor.setTo(0.5);
    jugarButton.scale.setTo(0.3, 0.3);
  },

  iniciarJuego : function(){
    this.state.start('Game');
  }
};