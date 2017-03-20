var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'bloque_juego');

game.state.add('Menu', Menu);
game.state.add('Game', Juego);
//game.state.add('Game_Over', Game_Over);

game.state.start('Menu');