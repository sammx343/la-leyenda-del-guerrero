var Mundo2 = {

  preload : function(){

  },

  create : function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.camera.flash('#000000', 500, true);
    game.world.setBounds(0, 0, 6600, 1000);

    fondoJuego = game.add.tileSprite(0, -100, 1400, 1010, 'moon');
    fondoJuego.scale.setTo(0.8 , 0.8);
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
    for(let i=0;i<=6;i++){
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

    obstacles.create(1650-1000, 500, 'totem21');
    obstacles.create(1900-1000, 500, 'totem22');
    obstacles.create(2120-1000, 500, 'totem21');

    obstacles.scale.setTo(0.9);

    obstacles.forEach(function(obstacle) {
        obstacle.body.immovable = true;
        obstacle.body.setSize(obstacle.width-70, obstacle.height-40, 20, 15);
    });

    create_player(0, 200);

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
    game_menu_create(this);
  },

  update: function(){
    enemyNumber = 0;
    var damaged = player.health;
    game.camera.follow(player);
    update_player();

    key_pause(this);
    parallax2();
    changeHealthColor(damaged);   
    // game.physics.arcade.collide(monedas, platforms, null, null, this);
    // game.physics.arcade.collide(monedas, obstacles, null, null, this);
    player.movedX = player.body.x;
  },

  render: function(){
      // platforms.forEachAlive(renderGroup, this);
      // obstacles.forEachAlive(renderGroup, this);
      // game.debug.body(player);
      // for (var i = 0; i < enemies.length; i++){
      //     game.debug.body(enemies[i].bird);
      // }
  },

  pause : function(){
      pause();
  }
}