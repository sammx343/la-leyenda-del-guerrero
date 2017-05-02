
trgs = function(x,y){
  tigrillo = game.add.sprite(x, y, 'tigrillo1');
  tigrillo.scale.setTo(0.75);
  game.physics.arcade.enable(tigrillo);
  tigrillo.body.gravity.y = gravity;
  tigrillo.body.collideWorldBounds = true;
  tigrillo.damage = 5;
  tigrillo.id = id++;
  tigrillo.died = false;
  tigrillo.health = 120;
  tigrillo.punchable = true;
  tigrillo.backToDamage = 800;
  tigrillo.exp = 40;
  tigrillo.animations.add('Left', [0,1,2,3],10,true);
  tigrillo.animations.add('Right', [4,5,6,7],10,true);
  tigrillo.side = "Left";
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
  }

  if(tigrillo.side == "Right"){
    tigrillo.animations.play('Right');
    tigrillo.body.velocity.x = 200;
  }else{
    tigrillo.animations.play('Left');
    tigrillo.body.velocity.x = -200;
  }

  
  game.physics.arcade.collide(tigrillo, platforms, null, null, this);
  game.physics.arcade.collide(tigrillo, obstacles, changeTigrilloSide, null, this);
}

function changeTigrilloSide(tigrillo, obstacle){
  (tigrillo.side == "Right")? (tigrillo.side = "Left") : (tigrillo.side = "Right");
}