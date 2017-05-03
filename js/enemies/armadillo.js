armdll = function(x,y){
  armadillo = game.add.sprite(x, y, 'armadillo');
  game.physics.arcade.enable(armadillo);
  armadillo.body.gravity.y = gravity;
  armadillo.body.collideWorldBounds = true;
  armadillo.damage = 10;
  armadillo.id = id++;
  armadillo.died = false;
  armadillo.health = 20;
  armadillo.punchable = true;
  armadillo.backToDamage = 800;
  armadillo.exp = 40;
  armadillo.immovable = true;
  armadillo.animations.add('Left', [0],10,true);
  armadillo.animations.add('Right', [2],10,true);
  armadillo.animations.add('attackLeft', [0,1,1,1,1],10,true);
  armadillo.animations.add('attackRight', [2,3,3,3,3],10,true);
  armadillo.side = "Left";
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
  }

  game.physics.arcade.overlap(armadillo, player, armadilloPush, null, this);
  game.physics.arcade.collide(armadillo, platforms, null, null, this);
  game.physics.arcade.collide(armadillo, obstacles, null, null, this);
}

function armadilloPush(armadillo, player){
  if(Punch == false && armadillo.died == false){
    player.body.acceleration.x -= 60000;
    player.health -= armadillo.damage;
    damageText(player, armadillo.damage)
  }

  armadillo.animations.play('attackLeft');
  setTimeout(function(){    
    armadillo.animations.play('Left');
    player.body.acceleration.x = 0;
  },600);
}