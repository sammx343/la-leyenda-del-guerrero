var Mundo3 = {

  preload : function(){

  },

  create : function(){
    worldNow = 3;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.camera.flash('#000000', 500, true);
    game.world.setBounds(0, 0, 6600, 1000);
    //create_world();

    fondoLight = game.add.group();
    for(let i=0;i<=12;i++){
        var fondo1;
        if(i%2==0){
            fondo1 = fondoLight.create(1280*i, -10, 'tarde11');
        }else{
            fondo1 = fondoLight.create(1280*i, 4, 'tarde12');
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
    for(let i=0;i<=7;i++){
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

    obstacles.create(650, 500, 'totem31');
    obstacles.create(950, 500, 'totem32');
    obstacles.create(1250, 500, 'totem31');

    obstacles.scale.setTo(0.9);

    obstacles.forEach(function(obstacle) {
      obstacle.body.immovable = true;
      obstacle.body.setSize(obstacle.width-70, obstacle.height-40, 20, 15);
    });

    traps = game.add.group();
    traps.enableBody = true;
    traps.physicsBodyType = Phaser.Physics.ARCADE;
    traps.enableBodyDebug = true;
    traps.renderable = true;
    
    traps.create(650, 570, 'puas-piso');

    traps.forEach(function(trap) {
        trap.body.immovable = true;
        trap.body.setSize(trap.width-50, trap.height, 10, 15);
    });

    monedas = game.add.group();
    monedas.enableBody = true;
    create_player(0, 300);

    platforms2 = game.add.group();
    platforms2.enableBody = true;
    for(let i=0;i<=12;i++){
      var piso2;
      if(i%2==0){
          piso2 = platforms2.create(i*1280, 200, 'tarde11');
      }else{
          piso2 = platforms2.create(i*1280, 200, 'tarde12');
      }
    }
    platforms2.scale.setTo(0.64 , 0.64);

    armadillos = [];
    armadillos.push(new armdll(3150, 320, 20, 8));

    enemies = [];

    var newBird = new birds(2000, game.height - 500, 200, 18);
    newBird.bird.tint = 0x222222;
    enemies.push(newBird);
    enemies.push(new birds(2300, game.height - 500, 120, 12));


    instructions = game.add.group();
    createInstruction(300 , 300, "Si no te esforzaste antes ... Esto te sera dificil ", 30);

    tween(instructions.children[0], 1500);
    game_menu_create(this);
  },

  update: function(){
    enemyNumber = 1;
    var damaged = player.health;
    game.camera.follow(player);
    update_player();

    for (var i = 0; i < enemies.length; i++){
      enemies[i].update();
      game.physics.arcade.overlap(enemies[i].bird, player, hitEnemy, null, this);
      if(enemies[i].bird.died == false){
          enemyNumber++;
      }          
    }

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

    key_pause(this);
    parallax2();
    changeHealthColor(damaged); 
    player.movedX = player.body.x;
    game.physics.arcade.collide(monedas, platforms, null, null, this);
    game.physics.arcade.collide(monedas, obstacles, null, null, this);
    game.physics.arcade.overlap(monedas, player, getMonedas, null, this);

    var alone = true;
    enemies.forEach(function(bird) {
        if((Math.abs(bird.bird.x - player.x)<= 1350 && bird.bird.died == false) && player.x >= 6000){
          alone = false ;
          tween(instructions.children[3], 1000);
        }
    });
  },

  render: function(){
      // platforms.forEachAlive(renderGroup, this);
      // obstacles.forEachAlive(renderGroup, this);
      // game.debug.body(player);
      // for (var i = 0; i < armadillos.length; i++){
      //     game.debug.body(armadillos[i].armadillo);
      // }
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