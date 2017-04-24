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
var showMenuOnce;
var enemyNumber;
var birdsNumber;
var obstacles;
var traps;
var music2;

var Mundo0 = {

  create : function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.camera.flash('#000000', 500, true);

    game.world.setBounds(0, 0, 4500, 1000);

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

    create_player();
    game_menu_create();

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
  },

  update : function(){

    var damaged = player.health;
    game.camera.follow(player);
    //inGround = game.physics.arcade.collide(player, platforms);
    if((game.physics.arcade.collide(player, platforms)) && player.body.touching.down){
        inGround = true;
    }else{
        inGround = false;
    }

    update_player();

    if(Right && player.movedX != player.body.x){
      move_parallax2(0.3, -player.speed/500);
    }else if(Left && player.movedX != player.body.x){
      move_parallax2(-0.3, player.speed/500);
    }else{
      move_parallax2(0, 0); 
    }
    changeHealthColor(damaged);   

    player.movedX = player.body.x;
  },

  pause : function(){

  }
}

function move_parallax2(fondoSpeed, platformSpeed){
  fondoLight.forEach(function(item){
    (!game.camera.atLimit.x)? (item.x += fondoSpeed) : item;
  });
  platforms2.forEach(function(item){
      (!game.camera.atLimit.x)? (item.x  += platformSpeed): item;
  });
}