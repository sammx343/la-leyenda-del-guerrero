var Left;
var Right;
var Jump;
var DoubleJump = false;
var Punch = false;
var Anim;
var jumpKey;
var punch;
var sparks;

var Damage = 20;
var Health = 100;
var Speed = 200;
var PlayerLevel = 1;
var Exp = 0;
var NE = [0, 50, 200, 280, 400];

function create_player(x,y){
  player = game.add.sprite(x,y, 'dude');
  player.scale.setTo(0.75);
  player.totalHealth = Health;
  player.health = Health;
  player.alive = true;
  player.gold = 0;
  player.speed = Speed;
  player.died = false;
  player.damage = Damage;
  player.Side = "Right";
  player.win = false;
  player.exp = Exp;
  player.movedX = 0;
  player.punchable = true;
  player.backToDamage = 500;
  player.doubleJumping = false;
  player.jumpVelocity = -550; 
  player.doubleJumpVelocity = -500;
  player.level = PlayerLevel;
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
  player.animations.add('rotation-right', [38,39,40,41], 11 , true);
  player.animations.add('rotation-left', [42,43,44,45], 11 , true);
  player.body.setSize(player.body.sourceWidth-35, player.body.sourceHeight-30, 15, 25);

  sparks = game.add.group();
  for (var i = 0; i < 10; i++)
  {
      var sparkAnimation = sparks.create(0, 0, 'sparks_hit', [0], false);
      sparkAnimation.scale.setTo(0.65);
      sparkAnimation.anchor.setTo(0.5);
      sparkAnimation.animations.add('sparks_hit');
  }

  player.w = player.body.sourceWidth;
  player.h = player.body.sourceHeight;
}

function update_player(){
  if(player.exp >= NE[player.level]){
    var text;
    text = game.add.bitmapText(player.x , player.y, 'myfont', "Nivel +1", 25);
    game.add.tween(text).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true, 0, 0, false);
    text.tint = 0xFFD700;
    lvlText.tint = 0xFFD700;
    setTimeout(function(){    
      lvlText.tint = 0xffffff;
    },3000);

    player.level++;
    lvlText.text = "Nivel " + player.level;
    player.exp = 0;
    player.damage = Math.floor(player.damage*1.3);
    player.health = Math.floor(player.health*1.1);
    player.totalHealth = Math.floor(player.totalHealth*1.1);
    player.speed = Math.floor(player.speed*1.05);
    sabiduriaText.text = " " + player.exp + "/" + NE[player.level];
  }

  if(player.win){
    Damage = player.damage;
    Health = player.totalHealth;
    Speed = player.speed;
    Exp = player.exp;
    PlayerLevel = player.level;
  }

  player_collisions();
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
      //console.log(player.body.velocity.y);
      if(!Punch){
        if(Jump){
          player.body.velocity.y = player.jumpVelocity;
          jumpKey.isDown = false;
        }
        if(jumpKey.isDown && DoubleJump == false && player.body.velocity.y > -300){
          player.body.velocity.y = player.doubleJumpVelocity;
          DoubleJump = true;
        }
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

function player_collisions(){
  //inGround = game.physics.arcade.collide(player, platforms);
  if((game.physics.arcade.collide(player, platforms) || game.physics.arcade.collide(player, obstacles)) && player.body.touching.down){
      inGround = true;
  }else{
      inGround = false;
  }

  game.physics.arcade.collide(player, obstacles, null, null,this);
  game.physics.arcade.overlap(player, traps, collideTraps, null, this);
  game.physics.arcade.overlap(player, stars, collectStar, null, this);
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

function changeHealthColor(damaged){
    healthText.text = player.health;
    if(player.health < 0){
      player.health = 0;
    }

    if(player.health != damaged){
        healthText.tint = 0xff0000;
        setTimeout(function(){    
          healthText.tint = 0xffffff;
        },200) 
    }
}

function getMonedas(player, moneda){
    //goldText.text = player.gold;
    // goldText.tint = 0xFFFF00;
    var text;
    if(player.died == false && player.win == false){
      if(moneda.key == 'oro_5'){
          player.exp += 5;
          text = game.add.bitmapText(player.x , player.y, 'myfont', "+5", 20);
      }else{
          player.exp += 1;
          text = game.add.bitmapText(player.x , player.y, 'myfont', "+1", 20);
      }
      sabiduriaText.text = player.exp + "/" + NE[player.level];
      game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
      text.tint = 0xFFD700;

      // setTimeout(function(){    
      //   goldText.tint = 0xffffff;
      // },300)

      moneda.kill();
    }
}