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
var showMenuOnce;
var enemyNumber;
var birdsNumber;
var obstacles;
var traps;

var Mundo1 = {

    preload : function() {
        
    },

    create: function(){
        var tam = -100;
        showMenuOnce = false;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.camera.flash('#000000', 500, true);
        game.world.setBounds(0, 0, 4500, 500);

        fondoJuego = game.add.tileSprite(0, -10, game.world.width, game.world.height, 'sky');
        fondoJuego.fixedToCamera = true;

        fondoLight = game.add.group();
        fondo1 = game.add.tileSprite(1280*0, 0, 1400, 1010, 'capa32');
        fondoLight.add(fondo1);

        fondoLight.scale.setTo(0.72 , 0.62);
        fondoLight.fixedToCamera = true;

        platforms = game.add.group();
        platforms.enableBodyDebug = true;
        platforms.renderable = true;
        platforms.enableBody = true;

        for(let i=0;i<=6;i++){
            if(i%3==0){
                ground = platforms.create(i*1280, game.world.height - 350  - tam , 'capa21');
                ground.body.immovable = true;
                ground.body.setSize(ground.width, ground.height, 0, 230);
            }else if(i%2==0){
                ground = platforms.create(i*1280, game.world.height - 324 - tam , 'capa22');
                ground.body.immovable = true;
                ground.body.setSize(ground.width, ground.height, 0, 204);
            }else{
                ground = platforms.create(i*1280, game.world.height - 194 - tam , 'capa23');
                ground.body.immovable = true;
                ground.body.setSize(ground.width, ground.height, 0, 74);
            }
        }


        obstacles = game.add.group();
        obstacles.enableBody = true;
        obstacles.physicsBodyType = Phaser.Physics.ARCADE;
        obstacles.enableBodyDebug = true;
        obstacles.renderable = true;

        obstacles.create(300, game.world.height - 190, 'totem1');
        obstacles.create(1100, game.world.height - 190, 'totem2');
        obstacles.create(2100, game.world.height - 190, 'totem2');

        obstacles.forEach(function(obstacle) {
            obstacle.body.immovable = true;
            obstacle.body.setSize(obstacle.width-60, obstacle.height, 15, 15);
        });

        traps = game.add.group();
        traps.enableBody = true;
        traps.physicsBodyType = Phaser.Physics.ARCADE;
        traps.enableBodyDebug = true;
        traps.renderable = true;
        
        traps.create(1500, game.world.height - 60, 'puas-piso');
        traps.create(2300, game.world.height - 60, 'puas-piso');
        traps.create(3000, game.world.height - 60, 'puas-piso');

        traps.forEach(function(trap) {
            trap.body.immovable = true;
            trap.body.setSize(trap.width-50, trap.height, 10, 15);
        });

        monedas = game.add.group();
        monedas.enableBody = true;

        for (var i = 0; i < 40; i++){
            var moneda;
            if(i%4==0){
                moneda = monedas.create(i * 10, 0, 'oro_5');
                moneda.scale.setTo(0.65);
                moneda.body.acceleration.x = rnd(-100,100);
            }else{
                moneda = monedas.create(i * 10, 0, 'oro_1');
                moneda.body.acceleration.x = rnd(-30,30);
            }
            //moneda.orientation = rnd(0,1)? (moneda.body.acceleration.x = rnd(-60,60) ) : (moneda.orientation = "left");
          
            moneda.body.gravity.y = gravity-300;
            moneda.body.bounce.y = 0.8 + Math.random() * 0.2;
        }

        birdsNumber = 8;
        enemies = [];

        for (var i = 0; i < birdsNumber; i++){
          enemies.push(new birds(500*(i+1), game.height - 500));
        }

        create_player();

        platforms2 = game.add.group();
        platforms2.enableBody = true;

        var min = 10;
        for(let i=0;i<=12;i++){
            var piso2;
            if(i%2==0){
                piso2 = platforms2.create(i*1280-500, game.world.height - 146 - tam - min, 'capa11');
            }else{
                piso2 = platforms2.create(i*1280-500, game.world.height - 153  - tam - min, 'capa12');
            }
            piso2.fixedToCamera = true;
        }

        game_menu_create();
    },

    update: function(){
        var damaged = player.health;
        enemyNumber = 0;

        fondoJuego.tilePosition.x -= 0.1;
        game.camera.follow(player);
        //inGround = game.physics.arcade.collide(player, platforms);
        if((game.physics.arcade.collide(player, platforms) || game.physics.arcade.collide(player, obstacles)) && player.body.touching.down){
            inGround = true;
        }else{
            inGround = false;
        }

        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.collide(player, obstacles, null, null,this);
        game.physics.arcade.collide(player, traps, collideTraps, null, this);
        
        game.physics.arcade.collide(monedas, platforms, null, null, this);
        game.physics.arcade.collide(monedas, obstacles, null, null, this);
        game.physics.arcade.overlap(monedas, player, getMonedas, null, this);

        // game.physics.arcade.overlap(bala.bullets, player, hitPlayer, null, this);
        // game.physics.arcade.collide(bala.bullets, platforms, destroyBala, null, this);

        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        //game.physics.arcade.overlap(player, pajaro, touchingEnemy, null, this);
        //console.log(game.camera.atLimit);

        for (var i = 0; i < enemies.length; i++){
            enemies[i].update();
            game.physics.arcade.overlap(enemies[i].bird, player, hitEnemy, null, this);
            if(enemies[i].bird.died == false){
                enemyNumber++;
            }
        }

        update_player();

        if(enemyNumber<= 0 && showMenuOnce == false ){
            showWin();
        }

        if(player.alive == false && showMenuOnce == false ){
            showLose();        
        }

        if(enemyNumber <= 0 || player.alive == false){
            finalGoldText.text = player.gold;
        }

        game.input.keyboard.onUpCallback = function (e) {
            if(e.keyCode == Phaser.Keyboard.ENTER || e.keyCode == Phaser.Keyboard.ESC){
                if(game.paused == false){
                    Mundo1.pause();
                }else{
                    unpause();
                }
            }
            if(e.keyCode == Phaser.Keyboard.P){
                if(player.animations.getAnimation('walk-right').delay == 120){
                    player.animations.getAnimation('walk-right').delay = 50
                    player.animations.getAnimation('walk-left').delay = 50
                }else if(player.animations.getAnimation('walk-right').delay == 50){
                    player.animations.getAnimation('walk-right').delay = 120
                    player.animations.getAnimation('walk-left').delay = 120
                }
            }
        };

        if(player.Side == "Right"  && player.movedX != player.body.x && (Left || Right)){
          move_parallax(-player.speed/350, -player.speed/52);
        }else if(player.Side == "Left" && player.movedX != player.body.x && (Left || Right)){
          move_parallax(player.speed/350, player.speed/52);
        }else{
          move_parallax(0, 0); 
        }
        changeHealthColor(damaged);   

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
        if(player.died == false && enemyNumber>0){
            game.input.onDown.add(pressed_buttons, self);
            game.input.onUp.add(released_buttons, self);
            pause_menu.visible = true;
            continue_button.visible = true;
            retry_button.visible = true;
            exit_button.visible = true;
            game.paused = true;
        }
    }
}

function touchingEnemy(player, enemy){
    //console.log(enemy.key);
}

function collideTraps(){
    console.log(player.punchable);
    if(player.punchable && player.body.touching.down){
        inGround = true;
        player.health -= 5;
        player.punchable = false;
        damageText(player, "5");
    }
}

function renderGroup(member) {
    game.debug.body(member);
}

function move_parallax(fondoSpeed, platformSpeed){
  fondoLight.forEach(function(item){
    (!game.camera.atLimit.x)? (item.tilePosition.x += fondoSpeed) : item;
  });
  platforms2.forEach(function(item){
      (!game.camera.atLimit.x)? (item.cameraOffset.x  += platformSpeed): item;
  });
}

function pressed_buttons(event){
    if(game.paused){
        clicked(event, continue_button, 1);
        clicked(event, retry_button, 1);
        clicked(event, exit_button, 1);
        clicked(event, pause_button, 1);
    }
}

function released_buttons(event){
    if(game.paused){
        if(clicked(event, continue_button, 0)){
            unpause();
        }else if(clicked(event, retry_button, 0)){
            game.state.start('Mundo1');
            unpause();
        }else if(clicked(event, exit_button, 0)){
            game.state.start('Menu');
            unpause();
        }else if(clicked(event, pause_button, 0)){
            unpause();
        }   
    }
}

function clicked(event, button , fr){
    var x1 = button.cameraOffset.x - button.width/2;
    var x2 = button.cameraOffset.x + button.width/2;
    var y1 = button.cameraOffset.y - button.height/2;
    var y2 = button.cameraOffset.y + button.height/2;

    var pressed = event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2;
    if(pressed){ button.frame = fr};
    return (pressed);
}

function unpause(){
    continue_button.visible = false;
    retry_button.visible = false;
    exit_button.visible = false;
    pause_menu.visible = false;
    game.paused = false;
}

function collectStar(player, star){
    star.destroy();
    score += 10;
}

function listener () {
}

function getMonedas(player, moneda){
    moneda.kill();
    goldText.text = player.gold;
    if(moneda.key == 'oro_5'){
        player.gold += 5;
    }else{
        player.gold += 1;
    }
    goldText.tint = 0xFFFF00;
    setTimeout(function(){    
      goldText.tint = 0xffffff;
    },300)
}

function changeHealthColor(damaged){
    if(player.health >= 0){
       healthText.text = player.health;
    }
    if(player.health != damaged){
        healthText.tint = 0xff0000;
        setTimeout(function(){    
          healthText.tint = 0xffffff;
        },200)  
    }
}
