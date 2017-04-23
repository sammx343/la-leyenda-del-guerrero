var Left;
var Right;
var Jump;
var DoubleJump = false;
var Punch = false;
var Anim;
var jumpKey;
var punch;

function create_player(){
  player = game.add.sprite(0, game.height - 300, 'dude');
  player.scale.setTo(0.75);
  player.health = 100;
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
  player.doubleJumping = false;
  player.jumpVelocity = -550; 
  player.doubleJumpVelocity = -500;
  // player.anchor.setTo(0.5);

  cursors = game.input.keyboard.createCursorKeys();
  punch = game.input.keyboard.addKey(Phaser.Keyboard.C);
  jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.X);

  game.physics.arcade.enable(player);
  player.body.gravity.y = gravity;
  player.body.collideWorldBounds = true;
  player.animations.add('walk-right', [0,1,2,3,2,1], 10, true);
  player.animations.add('walk-left', [5,6,7,8,7,6], 10 , true);
  player.animations.add('punch-right', [10,11,12,13,13,2], 10 , true);
  player.animations.add('punch-left', [14,15,16,17,17,7], 10 , true);
  player.animations.add('dead-right', [18,19,20,21], 8 , true);
  player.animations.add('dead-left', [22,23,24,25], 8 , true);
  player.animations.add('punch-down', [12], 10 , true);
  player.animations.add('jump-right', [26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27], 8 , true);
  player.animations.add('jump-left', [32,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33], 8 , true);
  player.animations.add('rotation-right', [38,39,40,41], 8 , true);
  player.animations.add('rotation-left', [42,43,44,45], 8 , true);
  player.body.setSize(player.body.sourceWidth-35, player.body.sourceHeight-40, 15, 40);

  player.w = player.body.sourceWidth;
  player.h = player.body.sourceHeight;
}

function update_player(){
  player.body.velocity.x = 0;
  if(player.health > 0 && player.win == false){
      //MOVIMIENTO
      Left = cursors.left.isDown;
      Right = cursors.right.isDown;
      Jump = (jumpKey.isDown && player.body.touching.down && inGround);
      punch.isDown? (Punch = true) : null;

      if(Right){
        movePlayerX(player.speed, "Right");
      }else if(Left){
        movePlayerX(-player.speed, "Left");
      }else{
        movePlayerX(0, player.Side); 
      }  

      if(!Punch){
        Jump? (player.body.velocity.y = player.jumpVelocity, jumpKey.isDown = false) : null;
        (jumpKey.isDown && DoubleJump == false)? (player.body.velocity.y = player.doubleJumpVelocity, DoubleJump = true) : null;
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
        jumpKey.isDown = false;
      }else{
        if(inGround){
            Left? player.animations.play('walk-left') : null;
            Right? player.animations.play('walk-right') : null;
            if(!Left && !Right){
              (player.Side == 'Left')? player.frame = 7 : player.frame = 2; 
            }
            DoubleJump = false;
        }else{
          // console.log("entra en el salto mk " + player.animations.currentAnim.frame + " " + player.frame);
          if(DoubleJump){
            if(player.Side == 'Left'){
              player.animations.play('rotation-left') 
            }else{
              player.animations.play('rotation-right');
            } 
          }else{
            if(player.Side == 'Left'){
              player.animations.play('jump-left') 
            }else{
              player.animations.play('jump-right');
            } 
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