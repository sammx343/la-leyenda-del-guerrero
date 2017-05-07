
var Mundo2 = {

  preload : function(){

  },

  create : function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.camera.flash('#000000', 500, true);
    game.world.setBounds(0, 0, 6600, 1000);
    //create_world();

    fondoJuego = game.add.tileSprite(-200, -200, 1400, 1010, 'moon');
    fondoJuego.scale.setTo(0.85 , 0.85);
    fondoJuego.fixedToCamera = true;

    fondoLight = game.add.group();
    for(let i=0;i<=12;i++){
        var fondo1;
        if(i%2==0){
            fondo1 = fondoLight.create(1280*i, -10, 'noche11');
        }else{
            fondo1 = fondoLight.create(1280*i, 4, 'noche12');
        }
    }
    //fondoLight.scale.setTo(0.65 , 0.65);

    platforms = game.add.group();
    platforms.enableBodyDebug = true;
    platforms.renderable = true;
    platforms.enableBody = true;
    for(let i=0;i<=7;i++){
      var ground;
      if(i%2==0){
          ground = platforms.create(i*1280, 200, 'noche21');
          ground.body.setSize(ground.width, ground.height, 0, 472);
      }else{
          ground = platforms.create(i*1280, 200 , 'noche22');
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

    obstacles.create(650, 500, 'totem21');
    obstacles.create(950, 500, 'totem22');
    obstacles.create(1250, 500, 'totem21');
    obstacles.create(1550, 500, 'totem21');
    obstacles.create(1840, 500, 'totem22');
    obstacles.create(2445, 500, 'totem21');

    obstacles.create(3000, 500, 'totem21');
    obstacles.create(3000, 350, 'totem21');


    obstacles.create(3500, 500, 'totem22');
    obstacles.create(3500, 350, 'totem22');

    obstacles.create(4000, 500, 'totem21');
    obstacles.create(4000, 350, 'totem21');

    obstacles.create(4500, 500, 'totem21');
    obstacles.create(4500, 350, 'totem21');

    obstacles.create(5000, 500, 'totem21');
    obstacles.create(5000, 350, 'totem21');

    obstacles.create(5700, 500, 'totem22');
    obstacles.create(5700, 350, 'totem21');
    
    obstacles.add(tintTotem(7200, 200, 'totem22', 0xffaaaa, 0xff8888));
    obstacles.add(tintTotem(7200, 350, 'totem22', 0xffaaaa, 0xff8888));
    obstacles.add(tintTotem(7200, 500, 'totem22', 0xffaaaa, 0xff8888));

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
    traps.create(930, 570, 'puas-piso');
    traps.create(1190, 570, 'puas-piso');
    traps.create(1460, 570, 'puas-piso');
    traps.create(1790, 570, 'puas-piso');
    traps.create(1930, 570, 'puas-piso');
    traps.create(4050, 570, 'puas-piso');
    traps.create(4350, 570, 'puas-piso');
    traps.create(4550, 570, 'puas-piso');
    traps.create(4900, 570, 'puas-piso');

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
          piso2 = platforms2.create(i*1280, 200, 'noche31');
      }else{
          piso2 = platforms2.create(i*1280, 200, 'noche32');
      }
    }
    platforms2.scale.setTo(0.64 , 0.64);

    armadillos = [];
    armadillos.push(new armdll(3150, 320, 20, 5));
    armadillos.push(new armdll(3450, 320, 20, 5));
    armadillos.push(new armdll(3550, 200, 30, 10));
    armadillos.push(new armdll(4050, 200, 30, 10));
    armadillos.push(new armdll(-1000, -1000, 20, 10));

    enemies = [];
    enemies.push(new birds(1500, game.height - 500, 120, 12));
    enemies.push(new birds(2300, game.height - 500, 120, 12));
    enemies.push(new birds(5100, game.height - 500, 120, 12));

    instructions = game.add.group();
    createInstruction(300 , 300, "Esta vez ... ", 30);
    createInstruction(430 , 300, "intenta no perder mucha vida", 30);
    createInstruction(1000 , 300, "Llega solo a el totem rojizo para completar el nivel", 30);
    createInstruction(6000 , 300, "¿Intentando el camino rapido? \nDebes llegar al totem tu solo", 30);

    tween(instructions.children[0], 1500);
    game_menu_create(this);
  },

  update: function(){
    enemyNumber = 1;
    var damaged = player.health;
    game.camera.follow(player);
    update_player();

    setTimeout(function(){    
      tween(instructions.children[1], 500);
    },2000);

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

    if(player.x >= 1000){
      tween(instructions.children[2], 1500);
    }

    var alone = true;
    enemies.forEach(function(bird) {
        if((Math.abs(bird.bird.x - player.x)<= 1000) && player.x >= 6000){
          alone = false 
          tween(instructions.children[3], 1000);
        }
    });

    if(player.x >= 6400 && alone == true){
      player.win = true;
    }
  },

  render: function(){
      // platforms.forEachAlive(renderGroup, this);
      // obstacles.forEachAlive(renderGroup, this);
      // game.debug.body(player);
      for (var i = 0; i < armadillos.length; i++){
          game.debug.body(armadillos[i].armadillo);
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