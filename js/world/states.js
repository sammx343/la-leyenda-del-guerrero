var Left;
var Right;
var Jump;
var DoubleJump;
var Punch;
var Side;
var Anim;

function movement(){
  Left = cursors.left.isDown;
  Right = cursors.right.isDown;
  Jump = (cursors.up.isDown && player.body.touching.down && inGround);
  punch.isDown? (Punch = true) : 0;

  moveCondition(Left, -player.speed, "Left", player.speed/400, player.speed/50);
  moveCondition(Right, player.speed, "Right", -player.speed/400, -player.speed/50);
  moveCondition((!Left && !Right), 0, Side, 0, 0);

  if(!Punch){
    Jump? (player.body.velocity.y = -500, cursors.up.isDown = false, DoubleJump = true) : 0;
    (cursors.up.isDown && DoubleJump)? (player.body.velocity.y = -450, DoubleJump = false) : 0;
  }
  if(inGround){
    if(Punch){
      player.speed = 150;
      (Side == 'Left')? (player.animations.play('punch-left')) : (player.animations.play('punch-right'));
      if(player.animations.currentAnim.frame == 20 || player.animations.currentAnim.frame == 16){
        Punch = false;
        player.animations.stop(null, true);
      }
    }else{
      player.speed = 200;
      Left? player.animations.play('walk-left') : 0;
      Right? player.animations.play('walk-right') : 0;
      if(!Left && !Right){
        (Side == 'Left')? player.frame = 6 : player.frame = 0; 
      }
    }
  }else{
    (Side == 'Left')? player.animations.play('jump-left') : player.animations.play('jump-right');
  }
}

function moveCondition(move, speed, sd, fondoSpeed, platformSpeed){
  if(move){
    player.body.velocity.x = speed;
    Side = sd;

    fondoLight.forEach(function(item){
      (!game.camera.atLimit.x)? (item.tilePosition.x += fondoSpeed) : item;
    });
    platforms2.forEach(function(item){
        (!game.camera.atLimit.x)? (item.cameraOffset.x  += platformSpeed): item;
    });
  } 
}