function parallax1(){
  if(Right && player.movedX != player.body.x){
    move_parallax(-player.speed/350, -player.speed/52);
  }else if(Left && player.movedX != player.body.x){
    move_parallax(player.speed/350, player.speed/52);
  }else{
    move_parallax(0, 0); 
  }
}

function parallax2(){
  if(Right && player.movedX != player.body.x){
    move_parallax2(0.4, -player.speed/500);
  }else if(Left && player.movedX != player.body.x){
    move_parallax2(-0.4, player.speed/500);
  }else{
    move_parallax2(0, 0); 
  }
}

function move_parallax(fondoSpeed, platformSpeed){
  fondoLight.forEach(function(item){
    (!game.camera.atLimit.x)? (item.tilePosition.x += fondoSpeed) : item;
  });
  platforms2.forEach(function(item){
      (!game.camera.atLimit.x)? (item.cameraOffset.x  += platformSpeed): item;
  });
}

function move_parallax2(fondoSpeed, platformSpeed){
  fondoLight.forEach(function(item){
    (!game.camera.atLimit.x)? (item.x += fondoSpeed) : item;
  });
  platforms2.forEach(function(item){
      (!game.camera.atLimit.x)? (item.x  += platformSpeed): item;
  });
}

function moveInstructions(){
  instructions.forEach(function(item){
    if(Right && player.movedX != player.body.x){
      (!game.camera.atLimit.x)? (item.x += -player.speed/500) : item;
    }else if(Left && player.movedX != player.body.x){
      (!game.camera.atLimit.x)? (item.x += player.speed/500) : item;
    }else{
      (!game.camera.atLimit.x)? (item.x += 0) : item;
    }
  });
}