
trgs = function(x,y, health, damage, velocity, color){
  tigrillo = game.add.sprite(x, y, 'tigrillo1');
  tigrillo.scale.setTo(0.75);
  tigrillo.anchor.setTo(0.5);
  game.physics.arcade.enable(tigrillo);
  tigrillo.body.gravity.y = gravity;
  tigrillo.tint = color || 0xFFFFFF;
  tigrillo.body.collideWorldBounds = true;
  tigrillo.damage = damage;
  tigrillo.health = health;
  tigrillo.velocity = velocity;
  tigrillo.id = id++;
  tigrillo.died = false;
  tigrillo.punchable = true;
  tigrillo.backToDamage = 800;
  tigrillo.exp = 40;
  tigrillo.attack = false;
  tigrillo.animations.add('Left', [0,1,2,3],10,true);
  tigrillo.animations.add('Right', [4,5,6,7],10,true);
  tigrillo.animations.add('AttackLeft', [2],10,true);
  tigrillo.animations.add('AttackRight', [6],10,true);
  tigrillo.side = "Left";
  tigrillo.body.setSize(tigrillo.width, tigrillo.height, 10, 10);
  this.tigrillo = tigrillo;
}

trgs.prototype.update = function(){
  tigrillo = this.tigrillo;

  if(tigrillo.health <= 0 && tigrillo.died == false){
    tigrillo.died = true;
    let birdTween = game.add.tween(tigrillo).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
    birdTween.onComplete.add(function(){
      tigrillo.kill();
    }, this);
  }else if(tigrillo.health > 0){
    if(tigrillo.side == "Right"){
      if(player.x > tigrillo.x - 50 && inGround){
        // console.log("gato 1");
        tigrillo.animations.play('AttackRight');
        tigrillo.body.velocity.x = tigrillo.velocity;
        tigrillo.attack = true;
      }else{ 
        // console.log("gato 2");
        tigrillo.animations.play('Right');
        tigrillo.body.velocity.x = tigrillo.velocity;
        tigrillo.attack = false;
      }
    }else{
      if(player.x < tigrillo.x - 50 && inGround){
        // console.log("gato 3");
        tigrillo.animations.play('AttackLeft');
        tigrillo.body.velocity.x = -tigrillo.velocity;
        tigrillo.attack = true;
      }else{ 
        // console.log("gato 4");
        tigrillo.animations.play('Left');
        tigrillo.body.velocity.x = -tigrillo.velocity;
        tigrillo.attack = false;
      }
    }
  }
  
  game.physics.arcade.collide(tigrillo, platforms, null, null, this);
  game.physics.arcade.collide(tigrillo, obstacles, changeTigrilloSide, null, this);
  game.physics.arcade.overlap(tigrillo, player, tigrilloAttack, null, this);
}

function changeTigrilloSide(tigrillo, obstacle){
  (tigrillo.side == "Right")? (tigrillo.side = "Left") : (tigrillo.side = "Right");
}

function tigrilloAttack(tigrillo, player){
  if(tigrillo.attack && player.punchable){
    player.health -= tigrillo.damage;
    damageText(player, tigrillo.damage);
    player.punchable = false;
    setTimeout(function(){    
      player.punchable = true;
    },player.backToDamage);
  }
}