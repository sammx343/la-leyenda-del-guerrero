var Left;
var Right;
var Jump;
var DoubleJump;
var Punch;
var Side;
var Anim;

function create_player(){
  player = game.add.sprite(0, game.height - 300, 'dude');
  player.scale.setTo(0.75);
  player.health = 100;
  player.alive = true;
  player.oro = 0;
  player.speed = 180;
  player.died = false;
  player.alive = true;
  player.damage = 25;
  Side = "Right";

  game.physics.arcade.enable(player);
  player.body.gravity.y = gravity;
  player.body.collideWorldBounds = true;
  player.animations.add('walk-right', [0,1,2,3,2,1], 10, true);
  player.animations.add('walk-left', [5,6,7,8,7,6], 10 , true);
  player.animations.add('punch-right', [10,11,12,13,2], 10 , true);
  player.animations.add('punch-left', [14,15,16,17,7], 10 , true);
  player.animations.add('dead-right', [18,19,20,21], 8 , true);
  player.animations.add('dead-left', [22,23,24,25], 8 , true);
  player.animations.add('punch-down', [12], 10 , true);
  player.animations.add('jump-right', [28], 6 , true);
  player.animations.add('jump-left', [34], 6 , true);
  player.body.setSize(player.width-40, player.height+10, 20, 40);
}

function update_player(){
  player.body.velocity.x = 0;
  if(player.health > 0){
      Left = cursors.left.isDown;
      Right = cursors.right.isDown;
      Jump = (cursors.up.isDown && player.body.touching.down && inGround);
      punch.isDown? (Punch = true) : 0;

      if(Right){
        moveCondition(player.speed, "Right", -player.speed/370, -player.speed/52);
      }else if(Left){
        moveCondition(-player.speed, "Left", player.speed/370, player.speed/52);
      }else{
        moveCondition(0, Side, 0, 0); 
      }

      if(!Punch){
        Jump? (player.body.velocity.y = -500, cursors.up.isDown = false, DoubleJump = true) : 0;
        (cursors.up.isDown && DoubleJump)? (player.body.velocity.y = -450, DoubleJump = false) : 0;
      }

      if(Punch){
        (Side == 'Left')? (player.animations.play('punch-left')) : (player.animations.play('punch-right'));
        player.events.onAnimationComplete = new Phaser.Signal();
        console.log(Punch);
        if(player.animations.currentAnim.frame == 2 || player.animations.currentAnim.frame == 7){
          Punch = false;
          player.animations.stop(null, true);
        }
      }else{
        if(inGround){
            Left? player.animations.play('walk-left') : 0;
            Right? player.animations.play('walk-right') : 0;
            if(!Left && !Right){
              (Side == 'Left')? player.frame = 7 : player.frame = 2; 
            }
          
        }else{
          (Side == 'Left')? player.animations.play('jump-left') : player.animations.play('jump-right');
        }
      }
  }else{
    if(!player.died){
      (Side == 'Left')? player.animations.play('dead-left'): player.animations.play('dead-right');
      player.died = true;
      player.alive = false;
    }
  }
  deathHeigthAnimation();
}

function moveCondition(speed, sd, fondoSpeed, platformSpeed){
  player.body.velocity.x = speed;
  Side = sd;

  fondoLight.forEach(function(item){
    (!game.camera.atLimit.x)? (item.tilePosition.x += fondoSpeed) : item;
  });
  platforms2.forEach(function(item){
      (!game.camera.atLimit.x)? (item.cameraOffset.x  += platformSpeed): item;
  });
}

function deathHeigthAnimation(){
  if(player.frame == 21){
    player.animations.stop(null, true);
    player.frame = 21;
  }else if(player.frame == 25){
    player.animations.stop(null, true);
    player.frame = 25;
  }
}