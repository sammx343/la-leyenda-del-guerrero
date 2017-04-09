var game = new Phaser.Game(980, 600, Phaser.CANVAS, 'bloque_juego');

game.state.add('Menu', Menu);
game.state.add('Mapa', Mapa);
game.state.add('Transition', Transition);
game.state.add('Mundo1', Mundo1);
//game.state.add('Game_Over', Game_Over);

//game.state.start('Menu');
game.state.start('Mundo1');