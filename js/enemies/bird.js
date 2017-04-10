
var id = 0;

birds = function(x,y){
  bird = game.add.sprite(x, y, 'pajaro');
  bird.scale.setTo(0.65);
  bird.anchor.setTo(0.5);
  game.physics.arcade.enable(bird);
  bird.body.setSize(bird.width-bird.width/10, bird.height-bird.height/10, 0, 0);
  bird.damage = 5;
  bird.minHeigth = rnd(50,150);
  bird.maxHeigth = rnd(200,250);
  bird.minWidth = rnd(50,250);
  bird.maxWidth = rnd(150,400);
  bird.velocityY = rnd(30,60);
  bird.body.velocity.y = bird.velocityY;
  bird.animations.add('fly_left', [ 0 , 0 , 0 ,1, 1, 2, 2, 3, 3, 3, 2 , 2, 1, 1], 25, true);
  bird.animations.add('fly_right', [ 4, 4, 4, 5, 5, 6, 6, 7, 7, 7 , 6 , 6 , 5 , 5], 25, true);
  bird.id = id++;
  bird.died = false;
  bird.health = 75;
  bird.bala = game.add.weapon(30,'bala_pajaro'); 
  bird.bala.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
  bird.bala.bulletSpeed = 400;
  bird.bala.nextFire = 0;
  bird.bala.fireRate = 3000;
  bird.bala.trackSprite(bird, -40, -10, true);
  bird.punchable = true;
  this.bird = bird;
}

birds.prototype.update = function(){
  bird = this.bird;

  let frame;

  if(bird.health <= 0){
    bird.died = true;
  }

  if(bird.died == false){
    frame = bird.frame;
    //console.log(bird.y + " minHeigth: " + bird.minHeigth +  " maxHeigth: "  + bird.maxHeigth + " id " + bird.id);
    if(bird.y <= bird.minHeigth){
        bird.body.velocity.y = +bird.velocityY;
            // console.log("sube 1");
    }else if(bird.y >= bird.maxHeigth){
        bird.body.velocity.y = -bird.velocityY;
            // console.log("sube 2");
    }

    if(bird.x > player.x){
      bird.bala.trackSprite(bird, -40, -10, true);
      bird.animations.play('fly_left');
      if(Math.abs(bird.x - player.x)<= 600){
        if(bird.x <= player.x + bird.maxWidth){
            bird.body.velocity.x = 0;
            // console.log("entra5"); 
        }else{
            bird.body.velocity.x = -bird.minWidth;
            // console.log("entra4"); 
        }
      }
    }else{
      bird.bala.trackSprite(bird, 40, 10, true);
      bird.animations.play('fly_right');
      if(Math.abs(bird.x - player.x)<= 600){
        if(bird.x >= player.x - bird.maxWidth){
            bird.body.velocity.x = 0;
            // console.log("entra2");
        }else{
            bird.body.velocity.x = + bird.minWidth;
            // console.log("entra1");
        }
      }
    }

    birdFire(bird);
    game.physics.arcade.overlap(bird.bala.bullets, player, hitPlayer, null, this);
    game.physics.arcade.overlap(bird, player, hitBird, null, this);
    game.physics.arcade.collide(bird.bala.bullets, platforms, destroyBala, null, this);
    game.physics.arcade.overlap(platforms, bird,  birdTouchesGround, null, this);

  }else{
    let birdTween = game.add.tween(bird).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
    bird.frame = frame;
    bird.animations.stop(null, true);
    bird.body.gravity.y = gravity-200;
  }
}

function birdFire(bird){
  if (game.time.now > bird.bala.nextFire && Math.abs(bird.x - player.x) <= 400){
      bird.bala.nextFire = game.time.now + bird.bala.fireRate;
      bird.bala.fireAtSprite(player);
  }
}

function destroyBala(bala, piso){
    console.log(piso);
    bala.kill();
}

function hitBird(bird, player){
  if(Punch && bird.punchable){
    bird.punchable = false;
    bird.health -= player.damage;
    damageText(bird, player.damage);
  }
}

function hitPlayer(player, bala){
  player.health -= 2;
  bala.kill();
  damageText(player, 2)
}

function birdTouchesGround(bird, platforms){
  console.log(bird);
}

function damageText(hitted, damage){
  var txtdamage;
  if(hitted.anchor.x == 0.5){
    txtdamage = game.add.bitmapText(hitted.x , hitted.y-hitted.height/2, 'myfont', "-" + damage, 15);
  }else{
    txtdamage = game.add.bitmapText(hitted.x + hitted.width/2 , hitted.y, 'myfont', "-" + damage, 15);
  }
  game.add.tween(txtdamage).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
  txtdamage.tint = 0xFF0000;
  setTimeout(function(){    
    hitted.punchable = true;
  },500);
}