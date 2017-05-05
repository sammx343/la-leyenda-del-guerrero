armdll = function(x,y, health, damage){
  armadillo = game.add.sprite(x, y, 'armadillo');
  game.physics.arcade.enable(armadillo);
  armadillo.body.gravity.y = gravity;
  armadillo.body.collideWorldBounds = true;
  armadillo.damage = damage;
  armadillo.id = id++;
  armadillo.died = false;
  armadillo.health = health;
  armadillo.punchable = true;
  armadillo.backToDamage = 800;
  armadillo.fire = true;
  armadillo.exp = 40;
  armadillo.immovable = true;
  armadillo.animations.add('Left', [0],10,true);
  armadillo.animations.add('Right', [2],10,true);
  armadillo.animations.add('attackLeft', [0,1,1,1,1],10,true);
  armadillo.animations.add('attackRight', [2,3,3,3,3],10,true);
  armadillo.side = -1;
  armadillo.body.setSize(armadillo.width-20, armadillo.height-20, 10, 10);
  this.armadillo = armadillo;
}

armdll.prototype.update = function(){
  armadillo = this.armadillo;
  
  if(armadillo.health <= 0 && armadillo.died == false){
    armadillo.died = true;
    let birdTween = game.add.tween(armadillo).to( { alpha: 0 }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
    birdTween.onComplete.add(function(){
      armadillo.kill();
    }, this);
  }else{
    if(armadillo.x > player.x){
      armadillo.animations.play('Left');
      armadillo.side = -1;
    }else{
      armadillo.animations.play('Right');
      armadillo.side = 1;
    }
  }

  game.physics.arcade.overlap(armadillo, player, armadilloPush, null, this);
  game.physics.arcade.collide(armadillo, platforms, null, null, this);
  game.physics.arcade.collide(armadillo, obstacles, null, null, this);
}

function armadilloPush(armadillo, player){
  if(Punch == false && armadillo.died == false && armadillo.fire){
    player.body.acceleration.x += 60000*armadillo.side;
    player.health -= armadillo.damage;
    damageText(player, armadillo.damage);
    armadillo.fire = false;

    if(armadillo.side == -1){
      armadillo.animations.play('attackLeft');
    }else{
      armadillo.animations.play('attackRight');
    }
    
    setTimeout(function(){    
      armadillo.animations.play('Left');
      player.body.acceleration.x = 0;
      armadillo.fire = true;
    },600);
  }
}