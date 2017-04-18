var Left;
var Right;
var Jump;
var DoubleJump;
var Punch;
var Anim;
var jumpKey;
var punch;

function create_player(){
  player = game.add.sprite(0, game.height - 300, 'dude');
  player.scale.setTo(0.75);
  player.health = 10000;
  player.alive = true;
  player.gold = 0;
  player.speed = 180;
  player.died = false;
  player.damage = 20;
  player.Side = "Right";
  player.win = false;
  player.exp = 0;
  player.movedX = 0;
  player.punchable = true;
  player.backToDamage = 500;

  cursors = game.input.keyboard.createCursorKeys();
  punch = game.input.keyboard.addKey(Phaser.Keyboard.C);
  jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.X);

  game.physics.arcade.enable(player);
  player.body.gravity.y = gravity;
  player.body.collideWorldBounds = true;
  player.animations.add('walk-right', [0,1,2,3,2,1], 10, true);
  player.animations.add('walk-left', [5,6,7,8,7,6], 10 , true);
  player.animations.add('punch-right', [10,11,12,13,13,2], 9 , true);
  player.animations.add('punch-left', [14,15,16,17,17,7], 9 , true);
  player.animations.add('dead-right', [18,19,20,21], 8 , true);
  player.animations.add('dead-left', [22,23,24,25], 8 , true);
  player.animations.add('punch-down', [12], 10 , true);
  player.animations.add('jump-right', [26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27], 8 , true);
  player.animations.add('jump-left', [32,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33], 8 , true);
  // player.animations.add('jump-right', [26,27,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29], 10 , true);
  // player.animations.add('jump-left', [32,33,34,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35], 10 , true);
  player.animations.add('rotation-right', [26,27,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29], 10 , true);
  player.animations.add('rotation-left', [32,33,34,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35], 10 , true);
}

function update_player(){
  player.body.velocity.x = 0;
  if(player.health > 0 && player.win == false){
      //MOVIMIENTO
      Left = cursors.left.isDown;
      Right = cursors.right.isDown;
      Jump = (jumpKey.isDown && player.body.touching.down && inGround);
      punch.isDown? (Punch = true) : null;

      // if(Right && (!Punch || (Punch && player.Side == "Right"))){
      //   movePlayerX(player.speed, "Right");
      // }else if(Left && (!Punch || (Punch && player.Side == "Left"))){
      //   movePlayerX(-player.speed, "Left");
      // }else{
      //   movePlayerX(0, player.Side); 
      // }

      if(Right){
        movePlayerX(player.speed, "Right");
      }else if(Left){
        movePlayerX(-player.speed, "Left");
      }else{
        movePlayerX(0, player.Side); 
      }

      // if(Right){
      //   player.body.velocity.x = player.speed;
      // }else if(Left){
      //   player.body.velocity.x = -player.speed;
      // }else{
      //   player.body.velocity.x = 0;
      // }

      // if(Punch){
      //   if(Right && player.Side == "Left" ){
      //     player.Side = "Right";
      //   }else if(Right && player.Side == "Right" ){
      //     player.Side = "Left";
      //   }
      // }else{
      //   if(Right){
      //     player.Side = "Right";
      //   }else if(Left){
      //     player.Side = "Left";
      //   }
      // }      

      if(!Punch){
        Jump? (player.body.velocity.y = -500, jumpKey.isDown = false, DoubleJump = true) : null;
        (jumpKey.isDown && DoubleJump)? (player.body.velocity.y = -450, DoubleJump = false) : null;
      }

      //SPRITES
      if(Punch){
        if(player.Side == 'Left'){
          player.animations.play('punch-left');
        }else{
          player.animations.play('punch-right')
        }
        player.events.onAnimationComplete = new Phaser.Signal();
        if(player.animations.currentAnim.frame == 2 || player.animations.currentAnim.frame == 7){
          Punch = false;
          player.animations.stop(null, true);
        }
      }else{
        if(inGround){
            Left? player.animations.play('walk-left') : null;
            Right? player.animations.play('walk-right') : null;
            if(!Left && !Right){
              (player.Side == 'Left')? player.frame = 7 : player.frame = 2; 
            }
        }else{
          console.log("entra en el salto mk " + player.animations.currentAnim.frame + " " + player.frame);
          if(player.Side == 'Left'){
            player.animations.play('jump-left') 
          }else{
            player.animations.play('jump-right');
          } 
        }
      }
  }else if(player.health > 0 && player.win){
  }else{
    if(!player.died){
      (player.Side == 'Left')? player.animations.play('dead-left'): player.animations.play('dead-right');
      player.died = true;
      player.alive = false;
    }
  }
  deathHeigthAnimation();
  changeSize();
}

function movePlayerX(speed, sd){
  player.body.velocity.x = speed;
  if(Punch == false){
    player.Side = sd;
  }
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

function changeSize(){
  if(Punch){
    if(player.Side == "Left"){
      player.body.setSize(player.width-20, player.height, 0, 40);
    }else{
      player.body.setSize(player.width, player.height, 20, 40);
    }
  }else{
    if(player.Side == "Left"){
      player.body.setSize(player.width-45, player.height, 60, 40);
    }else{
      player.body.setSize(player.width-50, player.height, 20, 40);
    }
  }
}