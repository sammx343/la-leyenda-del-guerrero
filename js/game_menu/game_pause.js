function pause(){
  if(player.died == false && player.win == false){
      game.input.onDown.add(pressed_buttons, self);
      game.input.onUp.add(released_buttons, self);
      pause_menu.visible = true;
      continue_button.visible = true;
      retry_button.visible = true;
      exit_button.visible = true;
      game.paused = true;
  }
}

function key_pause(world){
  game.input.keyboard.onUpCallback = function (e) {
      if(e.keyCode == Phaser.Keyboard.ENTER || e.keyCode == Phaser.Keyboard.ESC){
          if(game.paused == false){
              world.pause();
          }else{
              unpause();
          }
      }
  };
}

function pressed_buttons(event){
    if(game.paused){
        clicked(event, continue_button, 1);
        clicked(event, retry_button, 1);
        clicked(event, exit_button, 1);
        clicked(event, pause_button, 1);
    }
}

function released_buttons(event){
    if(game.paused){
        if(clicked(event, continue_button, 0)){
            unpause();
        }else if(clicked(event, retry_button, 0)){
            console.log(worldName);
            game.state.start(worldName);
            unpause();
        }else if(clicked(event, exit_button, 0)){
            game.state.start('Mapa');
            unpause();
        }else if(clicked(event, pause_button, 0)){
            unpause();
        }   
    }
}

function clicked(event, button , fr){
    var x1 = button.cameraOffset.x - button.width/2;
    var x2 = button.cameraOffset.x + button.width/2;
    var y1 = button.cameraOffset.y - button.height/2;
    var y2 = button.cameraOffset.y + button.height/2;

    var pressed = event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2;
    if(pressed){ button.frame = fr};
    return (pressed);
}

function unpause(){
    continue_button.visible = false;
    retry_button.visible = false;
    exit_button.visible = false;
    pause_menu.visible = false;
    game.paused = false;
}