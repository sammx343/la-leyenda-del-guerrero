bossBird = function(x,y, health, damage, minHeigth, maxHeigth, color){
  this.name = "bird";
  bird = game.add.sprite(x, y, 'pajaro');
  bird.tint = 0x111111;
  bird.scale.setTo(1.1);
  bird.anchor.setTo(0.5);
  game.physics.arcade.enable(bird);
  bird.damage = damage || 5;
  bird.minHeigth = minHeigth || rnd(50,150) ;
  bird.maxHeigth = maxHeigth || rnd(200,250);
  bird.minWidth = rnd(50,250);
  bird.maxWidth = rnd(150,400);
  bird.velocityY = rnd(30,60);
  bird.body.velocity.y = bird.velocityY;
  bird.animations.add('fly_left', [ 0 , 0 , 0 ,1, 1, 2, 2, 3, 3, 3, 2 , 2, 1, 1], 25, true);
  bird.animations.add('fly_right', [ 4, 4, 4, 5, 5, 6, 6, 7, 7, 7 , 6 , 6 , 5 , 5], 25, true);
  bird.id = id++;
  bird.died = false;
  bird.health = health || 100;
  bird.bala = game.add.weapon(30,'bala_pajaro'); 
  bird.bala.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
  bird.backToDamage = 500;
  bird.bala.bulletSpeed = 250;
  bird.bala.nextFire = 0;
  bird.bala.fireRate = 500;
  bird.fireStuff = 0;
  bird.canFire = true;
  bird.bala.trackSprite(bird, -40, -10, true);
  bird.punchable = true;
  bird.exp = 30;
  
  explosions = game.add.group();
  for (var i = 0; i < 10; i++)
  {
      var explosionAnimation = explosions.create(0, 0, 'bala_effect', [0], false);
      explosionAnimation.scale.setTo(0.65);
      explosionAnimation.anchor.setTo(0.5);
      explosionAnimation.animations.add('bala_effect');
  }

  bird.body.setSize(bird.width-bird.width/10, bird.height-bird.height/10, 40, 40);
  this.bird = bird;
}

bossBird.prototype.update = function(){
  bird = this.bird;

  let frame;

  if(bird.health <= 0 && bird.died == false){
    bird.died = true;
    bird.body.velocity.y = -300;
    create_boss_gold(bird.body)
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
    
    bossFire(bird);
    game.physics.arcade.overlap(bird.bala.bullets, player, hitPlayer, null, this);
    game.physics.arcade.collide(bird.bala.bullets, platforms, destroyBala, null, this);
    game.physics.arcade.overlap(platforms, bird,  birdTouchesGround, null, this);
  }else{
    let birdTween = game.add.tween(bird).to( { alpha: 0 }, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
    bird.frame = frame;
    bird.animations.stop(null, true);
    bird.body.gravity.y = gravity-200;
  }
}

function bossFire(bird){
  if (game.time.now > bird.bala.nextFire && Math.abs(bird.x - player.x) <= 500 && bird.canFire){
      bird.bala.nextFire = game.time.now + bird.bala.fireRate;
      bird.bala.fireAtXY(player.x+40, player.y+50)
      bird.fireStuff++;
      if(bird.fireStuff >= 6){
        bird.canFire = false;
        setTimeout(function(){ 
          bird.fireStuff = 0;   
          bird.canFire = true
        },5000);
      }
  }
}

function create_boss_gold(enemy){
  console.log(enemy.x + "  "+ enemy.y);
  for (var i = 0; i < 200; i++){
    if(i%5==0){
        moneda = monedas.create(enemy.x+enemy.width/2, enemy.y+enemy.height/2, 'oro_5');
        moneda.scale.setTo(0.65);
        moneda.body.acceleration.x = rnd(-130,130);
    }else{
        moneda = monedas.create(enemy.x, enemy.y, 'oro_1');
        moneda.body.acceleration.x = rnd(-40,40);
    }
    //moneda.orientation = rnd(0,1)? (moneda.body.acceleration.x = rnd(-60,60) ) : (moneda.orientation = "left");
    moneda.body.velocity.y = rnd(-100,-400);
    moneda.body.gravity.y = gravity-300;
    moneda.body.bounce.y = 0.8 + Math.random() * 0.2;
  }
}