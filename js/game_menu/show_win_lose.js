function showWin(){
  showMenuOnce = true
  finalGoldText = game.add.bitmapText(game.width/2 + 160, game.height/2 - 20 , 'myfont', player.gold + "", 39);
  finalGoldText.visible = false;
  game.global.level++;
  setTimeout(function(){
     tween(menu_win, 1000);
     tween(head_win);
     tween(button_continue_win);
     tween(button_retry_win);
     sabiduriaFinalText = game.add.bitmapText(game.width/2 + 10, game.height/2 - 20  , 'myfont', player.exp + "", 39);
     sabiduriaFinalText.anchor.setTo(0.5);
     sabiduriaFinalText.fixedToCamera = true;
     sabiduriaFinalText.tint = 0x444444;
     head_win.animations.play('smile');
     finalGoldText.fixedToCamera = true;
     finalGoldText.anchor.setTo(0.5);
     finalGoldText.visible = true;
     finalGoldText.tint = 0x444444;
  },500)
}

function showLose(){
  showMenuOnce = true
  finalGoldText = game.add.bitmapText(game.width/2 + 80, game.height/2 + 15 , 'myfont', player.gold + "", 39);
  finalGoldText.visible = false;
  setTimeout(function(){    
     tween(pause_menu_lose);
     tween(head);
     tween(button_retry_lose);
     tween(button_exit_lose);
     sabiduriaFinalText = game.add.bitmapText(game.width/2 + 80, game.height/2 - 35  , 'myfont', player.exp + "", 39);
     sabiduriaFinalText.anchor.setTo(0.5);
     sabiduriaFinalText.fixedToCamera = true;
     sabiduriaFinalText.tint = 0x444444;
     head.animations.play('negation');
     finalGoldText.fixedToCamera = true;
     finalGoldText.anchor.setTo(0.5);
     finalGoldText.visible = true;
     finalGoldText.tint = 0x444444;
  },2000)  
}