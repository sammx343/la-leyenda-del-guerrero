function scene_transition(Stage, time){
    game.camera.fade('#000000', time || 500);
    game.camera.onFadeComplete.add(function(){game.state.start(Stage)}, game);
}