var player;

var pajaro;
var bala;

var platforms;
var platforms2;
var fondoLight;
var cursors;
var ground;

//MENU DE PAUSA
var vida;
var oro;
var sabiduria;
var sabiduriaText;
var continue_button;
var pause_button;
var retry_button;
var exit_button;

var pause_p;

//MENU DE DERROTA
var pause_menu_lose;
var head;
var button_exit_lose;
var button_retry_lose;

//MENU DE VICTORIA

var menu_win;
var head_win;
var button_retry_win;
var button_continue_win;

var stars;
var score = 0;
var scoreText;
var healthText;
var goldText;
var finalGoldText;

var gravity = 850;

var fondoJuego;
var jumped = false;
var doubleJumped = false;
var cont = 0;
var isPunching = false;
var isRunning = false;
var inGround = true;

var enemies;
var tigrillos;
var armadillos;
var birdsNumber;
var enemyNumber;

var showMenuOnce;
var obstacles;
var traps;
var music2;
var worldName;
var instructions;
var monedas;

var Mundo0 = {

  create : function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.camera.flash('#000000', 500, true);
    create_world();
    game.world.setBounds(0, 0, 6600, 1000);

    fondoJuego = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
    fondoJuego.fixedToCamera = true;
    
    fondoLight = game.add.group();
    for(let i=0;i<=12;i++){
        var fondo1;
        if(i%2==0){
            fondo1 = fondoLight.create(1280*i, -10, 'capa32');
        }else{
            fondo1 = fondoLight.create(1280*i, 4, 'capa31');
        }
    }

    fondoLight.scale.setTo(0.72 , 0.62);

    platforms = game.add.group();
    platforms.enableBodyDebug = true;
    platforms.renderable = true;
    platforms.enableBody = true;
    for(let i=0;i<=6;i++){
      var ground;
      if(i%3==0){
          ground = platforms.create(i*1280, 630 - 350 , 'capa21');
          ground.body.setSize(ground.width, ground.height, 0, 230);
      }else if(i%2==0){
          ground = platforms.create(i*1280, 630 - 324, 'capa22');
          ground.body.setSize(ground.width, ground.height, 0, 204);
      }else{
          ground = platforms.create(i*1280, 630 - 194, 'capa23');
          ground.body.setSize(ground.width, ground.height, 0, 74);
      }
      ground.body.immovable = true;
    }

    obstacles = game.add.group();
    obstacles.enableBody = true;
    obstacles.physicsBodyType = Phaser.Physics.ARCADE;
    obstacles.enableBodyDebug = true;
    obstacles.renderable = true;

    obstacles.create(1600, 360, 'totem1');
    obstacles.create(1850, 360, 'totem1');
    obstacles.create(2330, 360, 'totem2');

    obstacles.create(2900, 360, 'totem2');
    obstacles.create(2900, 250, 'totem2');

    obstacles.create(3800, -30, 'totem2');
    obstacles.create(3800, 100, 'totem2');
    obstacles.create(3800, 220, 'totem2');
    obstacles.create(5300, 360, 'totem2');

    obstacles.forEach(function(obstacle) {
        obstacle.body.immovable = true;
        obstacle.body.setSize(obstacle.width-70, obstacle.height-40, 20, 15);
    });

    traps = game.add.group();
    traps.enableBody = true;
    traps.physicsBodyType = Phaser.Physics.ARCADE;
    traps.enableBodyDebug = true;
    traps.renderable = true;
    
    traps.create(1650, 485, 'puas-piso');
    traps.create(1900, 485, 'puas-piso');
    traps.create(2120, 485, 'puas-piso');
    traps.create(3000, 485, 'puas-piso');

    traps.forEach(function(trap) {
        trap.body.immovable = true;
        trap.body.setSize(trap.width-50, trap.height, 10, 15);
    });
    
    monedas = game.add.group();
    monedas.enableBody = true;
    create_player(0, 300);

    armadillos = [];
    armadillos.push(new armdll(3800, 400, 20, 5));

    platforms2 = game.add.group();
    platforms2.enableBody = true;
    for(let i=0;i<=12;i++){
      var piso2;
      if(i%2==0){
          piso2 = platforms2.create(i*1280-500, 630 - 146, 'capa11');
      }else{
          piso2 = platforms2.create(i*1280-500, 630 - 153, 'capa12');
      }
    }
    enemyNumber = 1;
    instructions = game.add.group();
    createInstruction(300 , 550, "Muevete hacia los lados con los cursores Izquierda y Derecha", 30);
    createInstruction(1400 , 550, "Presiona X para saltar", 30);
    createInstruction(2120 , 550, "Presiona de nuevo X en el aire para hacer Doble Salto", 30);
    createInstruction(3700 , 550, "Presiona C para golpear...", 30);
    createInstruction(3970 , 550, "No sera tan facil como crees", 30);
    createInstruction(4400 , 540, "Sigue hacia adelante, derrota al siguiente enemigo para ganar", 30);
    createInstruction(5200 , 535, "Cada enemigo derrotado te da sabiduria. \nRecoge tanta como puedas, la vas a necesitar", 30);

    tween(instructions.children[0], 3500);
    birdsNumber = 1;
    enemies = [];

    for (var i = 0; i < birdsNumber; i++){
      enemies.push(new birds(4300*(i+1)+1500, game.height - 500, 200, 8));
    }
    game_menu_create(this);
  },

  update : function(){
    enemyNumber = 0;
    var damaged = player.health;
    game.camera.follow(player);

    if(game.physics.arcade.overlap(player, obstacles.children[0], null, null,this)){
      tween(instructions.children[1], 1500);
    }

    if(game.physics.arcade.overlap(player, obstacles.children[1], null, null,this)){
      tween(instructions.children[2], 1500);
    }

    for (var i = 0; i < armadillos.length; i++){
        armadillos[i].update();
        if(game.physics.arcade.overlap(armadillos[i].armadillo, player, hitEnemy, null, this)){
          tween(instructions.children[3], 1500);
        }
        if(armadillos[i].armadillo.died == false){
          enemyNumber++;
        }else{
          tween(instructions.children[4], 1500);
        }          
    }

    for (var i = 0; i < enemies.length; i++){
      enemies[i].update();
      game.physics.arcade.overlap(enemies[i].bird, player, hitEnemy, null, this);
      if(enemies[i].bird.died == false){
          enemyNumber++;
      }          
    }

    if(player.x >= 4200){
      tween(instructions.children[5], 1500);
    }

    if(player.x >= 4800){
      tween(instructions.children[6], 1500);    
    }

    update_player();

    if(enemyNumber <= 0){
      setTimeout(function(){
        player.win  = true;
      },4000);
    }

    if(player.win && showMenuOnce == false ){
      showWin();
    }

    if(player.alive == false && showMenuOnce == false ){
      showLose();        
    }

    key_pause(this);
    parallax2();
    moveInstructions();
    changeHealthColor(damaged);   
    game.physics.arcade.collide(monedas, platforms, null, null, this);
    game.physics.arcade.collide(monedas, obstacles, null, null, this);
    game.physics.arcade.overlap(monedas, player, getMonedas, null, this);
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

function createInstruction(x, y, text, size){
    var instruction;
    instruction = game.add.bitmapText(x, y, 'myfont', text, size);
    instruction.alpha = 0;
    instructions.add(instruction);
}