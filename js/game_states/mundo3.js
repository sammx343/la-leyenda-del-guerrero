var Mundo3 = {

  preload : function(){
    game.stage.backgroundColor = "#000000"
  },

  create : function(){
    worldNow = 3;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.camera.flash('#000000', 500, true);
    game.world.setBounds(0, 0, 8000, 1000);
    //create_world();

    fondoLight = game.add.group();
    for(let i=0;i<=20;i++){
        var fondo1;
        if(i%2==0){
            fondo1 = fondoLight.create(1280*i, -0, 'tarde11');
        }else{
            fondo1 = fondoLight.create(1280*i, 0, 'tarde12');
        }
    }

    fondoJuego = game.add.tileSprite(-200, -200, 1400, 1010, 'evening');
    fondoJuego.scale.setTo(0.85 , 0.85);
    fondoJuego.fixedToCamera = true;
    //fondoLight.scale.setTo(0.65 , 0.65);

    platforms = game.add.group();
    platforms.enableBodyDebug = true;
    platforms.renderable = true;
    platforms.enableBody = true;
    for(let i=0;i<=20;i++){
      var ground;
      if(i%3==0){
          ground = platforms.create(i*1280, 200, 'tarde23');
          ground.body.setSize(ground.width, ground.height, 0, 472);
      }
      else if(i%2==0){
          ground = platforms.create(i*1280, 200, 'tarde22');
          ground.body.setSize(ground.width, ground.height, 0, 472);
      }else{
          ground = platforms.create(i*1280, 200 , 'tarde21');
          ground.body.setSize(ground.width, ground.height, 0, 472);
      }
      ground.body.immovable = true;
    }
    platforms.scale.setTo(0.64 , 0.64);

    obstacles = game.add.group();
    obstacles.enableBody = true;
    obstacles.physicsBodyType = Phaser.Physics.ARCADE;
    obstacles.enableBodyDebug = true;
    obstacles.renderable = true;

    traps = game.add.group();
    traps.enableBody = true;
    traps.physicsBodyType = Phaser.Physics.ARCADE;
    traps.enableBodyDebug = true;
    traps.renderable = true;

    monedas = game.add.group();
    monedas.enableBody = true;
    create_player(0, 300);

    platforms2 = game.add.group();
    platforms2.enableBody = true;
    for(let i=0;i<=20;i++){
      var piso2;
      if(i%2==0){
          piso2 = platforms2.create(i*1280, 200, 'tarde11');
      }else{
          piso2 = platforms2.create(i*1280, 200, 'tarde12');
      }
    }
    platforms2.scale.setTo(0.64 , 0.64);

    armadillos = [];
    enemies = [];
    tigrillos = [];

    obstacles.create(650, 500, 'totem31');
    obstacles.create(950, 500, 'totem32');
    obstacles.create(1250, 500, 'totem31');
    enemies.push(new birds(1000, game.height - 100, 250, 20, rnd(150,250), rnd(350,400), 0x222222));
    enemies.push(new birds(1100, game.height - 100, 120, 12, rnd(150,250), rnd(270,320)));
    enemies.push(new birds(2000, game.height - 100, 250, 20, rnd(150,250), rnd(350,400), 0x222222));

    armadillos.push(new armdll(2150, 320, 30, 20));
    armadillos.push(new armdll(2300, 320, 50, 20, 0x222222));
    armadillos.push(new armdll(2410, 320, 50, 20, 0x222222));
    armadillos.push(new armdll(2530, 320, 50, 20, 0x222222));

    tigrillos.push(new trgs(2000, 400, 120, 15, 220, 0x222222));

    obstacles.create(2900, 500, 'piedras3');
    tigrillos.push(new trgs(2900, 400, 120, 13, 220));
    tigrillos.push(new trgs(3300, 400, 120, 13, 220));
    obstacles.create(3900, 520, 'puas31');
    obstacles.create(3920, 370, 'totem31');

    traps.create(3800, 570, 'puas-piso');
    obstacles.create(4400, 520, 'totem31');
    obstacles.create(4400, 380, 'totem31');
    obstacles.create(4400, 240, 'totem31');
    armadillos.push(new armdll(3920, 100, 50, 17, 0x222222));

    obstacles.create(5000, 520, 'totem31');
    obstacles.create(5000, 380, 'totem31');
    obstacles.create(5000, 240, 'totem31');
    traps.create(5000, 570, 'puas-piso');
    traps.create(5200, 570, 'puas-piso');
    obstacles.create(5500, 520, 'totem31');
    obstacles.create(5500, 380, 'totem31');
    obstacles.create(5500, 240, 'totem31');
    traps.create(5500, 570, 'puas-piso');
    traps.create(5700, 570, 'puas-piso');
    obstacles.create(6000, 520, 'totem31');
    obstacles.create(6000, 380, 'totem31');
    obstacles.create(6000, 240, 'totem31');

    obstacles.create(6650, 520, 'totem31');
    obstacles.create(6650, 380, 'totem31');
    obstacles.create(6650, 240, 'totem31');

    enemies.push(new birds(5900, game.height - 100, 250, 24, rnd(150,250), rnd(350,400), 0x222222));

    var finalBird = new bossBird(7000, game.height - 100, 500, 30, rnd(150,250), rnd(350,400), 0x222222);
    enemies.push(finalBird);

    obstacles.scale.setTo(0.9);
    obstacles.forEach(function(obstacle){
      obstacle.body.immovable = true;
      obstacle.body.setSize(obstacle.width-70, obstacle.height-40, 20, 15);
    });

    traps.create(650, 570, 'puas-piso');
    traps.forEach(function(trap) {
        trap.body.immovable = true;
        trap.body.setSize(trap.width-50, trap.height, 10, 15);
    });

    instructions = game.add.group();
    createInstruction(300 , 650, "Si no te esforzaste antes ... Esto te sera dificil ", 30);
    createInstruction(4500 , 650, "Por si todavia no has aprendido ... ", 35);
    createInstruction(4900 , 650, "Muchas veces es mejor devolverse ", 35);
    createInstruction(6700 , 650, "Derrota a esta ave para completar el juego ", 35);

    //DON'T TOUCH //////////////////////////////////////////
    tigrillos.push(new trgs(3800, game.height, 120, 15, 220));
    armadillos.push(new armdll(0, 1000, 50, 20, 0x222222));
    ///////////////////////////////////////////////

    tween(instructions.children[0], 1500);
    game_menu_create(this);
  },

  update: function(){
    enemyNumber = 1;
    var damaged = player.health;
    game.camera.follow(player);
    update_player();

    update_enemies(enemies.length, tigrillos.length);

    for (var i = 0; i < armadillos.length; i++){
      armadillos[i].update();
      game.physics.arcade.overlap(armadillos[i].armadillo, player, hitEnemy, null, this);
      if(armadillos[i].armadillo.died == false){
        enemyNumber++;
      }        
    }

    if(player.win == true && showMenuOnce == false ){
        showWin();
    }

    if(player.alive == false && showMenuOnce == false ){
        showLose();        
    }

    if(player.x >= 4500){
      tween(instructions.children[1], 1500);
      setTimeout(function(){    
        tween(instructions.children[2], 1500);
      },3000);
    }

    if(player.x >= 6700){
      tween(instructions.children[3], 1500);
    }

    if(enemies[enemies.length-1].bird.died == true){
      setTimeout(function(){    
        player.win = true;
      },5000);
    }

    key_pause(this);
    parallax2();
    changeHealthColor(damaged);
    player.movedX = player.body.x;
    game.physics.arcade.collide(monedas, platforms, null, null, this);
    game.physics.arcade.collide(monedas, obstacles, null, null, this);
    game.physics.arcade.overlap(monedas, player, getMonedas, null, this);

    var alone = true;

  },

  render: function(){
      // platforms.forEachAlive(renderGroup, this);
      // obstacles.forEachAlive(renderGroup, this);
      // game.debug.body(player);
      // for (var i = 0; i < armadillos.length; i++){
      //     game.debug.body(armadillos[i].armadillo);
      // }
      for (var i = 0; i < tigrillos.length; i++){
          game.debug.body(tigrillos[i].tigrillo);
      }
  },

  pause : function(){
      pause();
  }
}

function tintTotem(x, y, key, color1, color2){
  var totem = game.add.sprite(x, y, key);
  tweenTint(totem, color1, color2, 1000);
  return totem;
}
function stuff(){
  console.log("coleeeeeeeeeeeeeeeeee");
}