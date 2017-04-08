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

var stars;
var score = 0;
var scoreText;
var healthText;
var goldText;
var goldAmount;

var gravity = 850;

var fondoJuego;
var jumped = false;
var doubleJumped = false;
var cont = 0;
var lastSide;
var punch;
var isPunching = false;
var isRunning = false;
var inGround = true;

var Juego = {

    preload : function() {
        game.load.image('sky', 'assets/la_leyenda/nivel1/capas_piso/fondo-estatico.png');
        game.load.image('capa11', 'assets/la_leyenda/nivel1/capas_piso/capa-1-sector-1.png');
        game.load.image('capa12', 'assets/la_leyenda/nivel1/capas_piso/capa-1-sector-2.png');
        game.load.image('capa21', 'assets/la_leyenda/nivel1/capas_piso/capa-2-sector-1.png');
        game.load.image('capa22', 'assets/la_leyenda/nivel1/capas_piso/capa-2-sector-2.png');
        game.load.image('capa23', 'assets/la_leyenda/nivel1/capas_piso/capa-2-sector-3.png');
        game.load.image('capa31', 'assets/la_leyenda/nivel1/capas_piso/capa-3-sector-1.png');
        game.load.image('capa32', 'assets/la_leyenda/nivel1/capas_piso/capa-3-sector-2.png');

        game.load.bitmapFont('myfont', 'assets/font5/font.png', 'assets/font5/font.fnt');

        game.load.image('star', 'assets/star.png');

        game.load.spritesheet('pause_button', 'assets/la_leyenda/menu/pause_menu/pause_button.png', 75, 90);
        game.load.image('vida', 'assets/la_leyenda/menu/vida.png');
        game.load.image('oro', 'assets/la_leyenda/menu/oro.png');

        game.load.image('oro_5', 'assets/la_leyenda/objetos_mundos/oro/oro_pieza_grande.png');
        game.load.image('oro_1', 'assets/la_leyenda/objetos_mundos/oro/oro_pieza_pequeña.png');

        game.load.image('pause_menu', 'assets/la_leyenda/menu/pause_menu/pausa-back.png');
        game.load.spritesheet('continue_button', 'assets/la_leyenda/menu/pause_menu/continue_button.png', 306, 131);
        game.load.spritesheet('exit_button', 'assets/la_leyenda/menu/pause_menu/exit_button.png', 119, 139);
        game.load.spritesheet('retry_button', 'assets/la_leyenda/menu/pause_menu/retry_button.png', 118 , 131);

        game.load.image('pause_menu_lose', 'assets/la_leyenda/perdiste/fondo_perdiste.png');
        game.load.spritesheet('head', 'assets/la_leyenda/perdiste/personaje/head_animation.png', 385, 353);
        game.load.spritesheet('button_exit_lose', 'assets/la_leyenda/perdiste/button_exit_lose.png', 115, 123);
        game.load.spritesheet('button_retry_lose', 'assets/la_leyenda/perdiste/button_retry_lose.png', 315, 128);

        //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        //game.load.spritesheet('dude', ['assets/main/main1.png'], 84, 99);
        //game.load.atlas('dude', 'assets/main/main0.png', null, null);
        game.load.atlasJSONHash('dude', 'assets/main/main.png', 'js/atlas/main.json');
        game.load.spritesheet('pajaro', 'assets/la_leyenda/enemigos/pajaro_spritesheet.png', 255, 229);
        game.load.image('bala_pajaro', 'assets/la_leyenda/enemigos/bala_pajaro.png');
        //game.load.atlasJSONHash('buttons', 'assets/la_leyenda/menu/options_stylesheet.png', 'js/atlas/game_options_atlas.json');
    },

    create: function(){
        var tam = -100;
        goldAmount = 0;
        lastSide = 'right';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.camera.flash('#000000', 500, true);
        game.world.setBounds(0, 0, 10000, 500);

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

        ground.scale.setTo(1, 1);
        ground.body.immovable = true;

        /*var ledge = platforms.create(300, 500, 'ground');
        ledge.body.immovable = true;
        //ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;*/

        player = game.add.sprite(0, game.height - 300, 'dude');
        player.scale.setTo(0.9, 0.9);
        player.health = 100;
        player.alive = true;
        player.oro = 0;
        player.speed = 200;
        pajaro = game.add.sprite(1000, game.height - 500, 'pajaro');
        pajaro.scale.setTo(0.8, 0.8);
        pajaro.anchor.setTo(0.5);
        
        monedas = game.add.group();

        monedas.enableBody = true;

        for (var i = 0; i < 40; i++){
            var moneda;
            if(i%4==0){
                moneda = monedas.create(i * 10, 0, 'oro_5');
                moneda.scale.setTo(0.65, 0.65);
                moneda.body.acceleration.x = rnd(-100,100);
            }else{
                moneda = monedas.create(i * 10, 0, 'oro_1');
                moneda.body.acceleration.x = rnd(-30,30);
            }
            //moneda.orientation = rnd(0,1)? (moneda.body.acceleration.x = rnd(-60,60) ) : (moneda.orientation = "left");
          
            moneda.body.gravity.y = gravity-300;
            moneda.body.bounce.y = 0.8 + Math.random() * 0.2;
        }

        platforms2 = game.add.group();
        platforms2.enableBody = true;

        for(let i=0;i<=12;i++){
            var piso2;
            if(i%2==0){
                piso2 = platforms2.create(i*1280, game.world.height - 146 - tam , 'capa11');
            }else{
                piso2 = platforms2.create(i*1280, game.world.height - 153  - tam , 'capa12');
            }
            piso2.fixedToCamera = true;
        }

        game.physics.arcade.enable(player);
        game.physics.arcade.enable(pajaro);
        pajaro.body.setSize(pajaro.width-pajaro.width/10, pajaro.height-pajaro.height/10, 0, 0);
        pajaro.damage = 5;
        player.body.gravity.y = gravity;
        player.body.collideWorldBounds = true;

        player.animations.add('walk-right', [1,2,3,4,5], 20 , true);
        player.animations.add('walk-left', [7,8,9,10,11], 15 , true);
        player.animations.add('punch-down', [12], 10 , true);
        player.animations.add('punch-right', [13,14,15,16], 6 , true);
        player.animations.add('punch-left', [17,18,19,20], 6 , true);
        player.animations.add('jump-right', [21], 6 , true);
        player.animations.add('jump-left', [22], 6 , true);
        player.animations.add('dead', [23], 6 , true);

        pajaro.animations.add('fly_left', [ 0 , 0 , 0 ,1, 1, 2, 2, 3, 3, 3, 2 , 2, 1, 1], 25, true);
        pajaro.animations.add('fly_right', [ 4, 4, 4, 5, 5, 6, 6, 7, 7, 7 , 6 , 6 , 5 , 5], 25, true);


        bala = game.add.weapon(30,'bala_pajaro'); 

        bala.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;

        //  The speed at which the bullet is fired
        bala.bulletSpeed = 600;
        bala.nextFire = 0;
        bala.fireRate = 1000;
        bala.trackSprite(pajaro, -40, -10, true);

        //scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        cursors = game.input.keyboard.createCursorKeys();
        punch = game.input.keyboard.addKey(Phaser.Keyboard.C);

        var move = 20;
        pause_menu = game.add.sprite(game.width/2, game.height/2, 'pause_menu');
        pause_menu.scale.setTo(0.8, 0.8);
        pause_menu.anchor.setTo(0.5);
        pause_menu.fixedToCamera = true;
        pause_menu.visible = false;

        pause_button = game.add.button(game.width/20, move*3 , 'pause_button' , Juego.pause , this, 0, 0 , 1, 0);
        pause_button.scale.setTo(0.9, 0.9);
        pause_button.anchor.setTo(0.5);
        pause_button.fixedToCamera = true;
        
        vida = game.add.sprite(game.width/6, move*3 , 'vida');
        vida.anchor.setTo(0.5);
        vida.fixedToCamera = true;

        healthText = game.add.bitmapText(game.width/5.2, move*3 , 'myfont', '', 35);
        healthText.anchor.setTo(0.5);
        healthText.fixedToCamera = true;

        oro = game.add.sprite(game.width/2, move*3 , 'oro');
        oro.anchor.setTo(0.5);
        oro.scale.setTo(0.6, 0.6);
        oro.fixedToCamera = true;

        goldText = game.add.bitmapText(game.width/2 + oro.width/1.3, move*3 + 5 , 'myfont', '', 40);
        goldText.anchor.setTo(0.5);
        goldText.fixedToCamera = true;

        continue_button = game.add.button(game.width/2 + game.width/10 + move, game.height/2 + game.height/20, 'continue_button' , null , this);
        continue_button.anchor.setTo(0.5);
        continue_button.scale.setTo(0.85, 0.85);
        continue_button.fixedToCamera = true;
        continue_button.visible = false;

        retry_button = game.add.button(game.width/2 - game.width/12 + move, game.height/2 + game.height/20, 'retry_button' , null , this);
        retry_button.anchor.setTo(0.5);
        retry_button.scale.setTo(0.85, 0.85);
        retry_button.fixedToCamera = true;
        retry_button.visible = false;

        exit_button = game.add.button(game.width/2 - game.width/5 + move, game.height/2 + game.height/20  , 'exit_button' , null , this);
        exit_button.anchor.setTo(0.5);
        exit_button.scale.setTo(0.85, 0.85);
        exit_button.fixedToCamera = true;
        exit_button.visible = false;

        retry_button.events.onInputDown.add(listener, this);

        pause_menu_lose = game.add.sprite(game.width/2, game.height/2, 'pause_menu_lose');
        pause_menu_lose.scale.setTo(0.8, 0.8);
        pause_menu_lose.anchor.setTo(0.5);
        pause_menu_lose.fixedToCamera = true;
        pause_menu_lose.visible = false;
        pause_menu_lose.alpha = 0;

        head = game.add.sprite(game.width/4.4, game.height/2, 'head');
        head.scale.setTo(0.8, 0.8);
        head.anchor.setTo(0.5);
        head.fixedToCamera = true;
        head.visible = false;
        head.alpha = 0;
        head.animations.add('negation', [0,1,2,1], 7 , true);

        button_exit_lose = game.add.button(game.width/2 - game.width/12 + move, game.height/2 + game.height/7, 'button_exit_lose' , null , this);
        button_exit_lose.anchor.setTo(0.5);
        button_exit_lose.scale.setTo(0.8, 0.8);
        button_exit_lose.fixedToCamera = true;
        button_exit_lose.visible = false;
        button_exit_lose.alpha = 0;
        button_exit_lose.upAction = function(){game.state.start('Menu')};
        button_exit_lose.onInputDown.add(button_sprite_down);
        button_exit_lose.onInputUp.add(button_sprite_up);

        button_retry_lose = game.add.button(game.width/2 + game.width/10 + move, game.height/2 + game.height/7, 'button_retry_lose' , null , this);
        button_retry_lose.anchor.setTo(0.5);
        button_retry_lose.scale.setTo(0.8, 0.8);
        button_retry_lose.fixedToCamera = true;
        button_retry_lose.visible = false;
        button_retry_lose.alpha = 0;
        button_retry_lose.upAction = function(){game.state.start('Game')};
        button_retry_lose.onInputDown.add(button_sprite_down);
        button_retry_lose.onInputUp.add(button_sprite_up);
    },

    update: function(){
        var damaged = player.health;

        healthText.text = player.health;
        goldText.text = player.oro;
        fondoJuego.tilePosition.x -= 0.1;
        game.camera.follow(player);
        inGround = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);

        game.physics.arcade.collide(monedas, platforms, null, null, this);
        game.physics.arcade.overlap(monedas, player, getMonedas, null, this);

        game.physics.arcade.overlap(bala.bullets, player, hitPlayer, null, this);
        game.physics.arcade.collide(bala.bullets, platforms, destroyBala, null, this);

        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        game.physics.arcade.overlap(player, pajaro, touchingEnemy, null, this);
        //console.log(game.camera.atLimit);

        player.body.velocity.x = 0;

        if(player.health <= 0){
           player.animations.play('dead');
           player.alive = false; 
           player.body.setSize(player.width, player.height-10, 0, 0);
        }

        if(player.alive){
            //playerMovement();
            movement();
        }else{
           tween(pause_menu_lose);
           tween(head);
           tween(button_retry_lose);
           tween(button_exit_lose);
           head.animations.play('negation');
        }
        

        game.input.keyboard.onUpCallback = function (e) {
            if(e.keyCode == Phaser.Keyboard.ENTER || e.keyCode == Phaser.Keyboard.ESC){
                if(game.paused == false){
                    Juego.pause();
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
        fire();
        movePajaro();
        changeHealthColor(damaged);

    },

    render: function(){
        // platforms.forEachAlive(renderGroup, this);
        // game.debug.body(pajaro);
        // game.debug.body(player);
        bala.debug(200,200);
    },

    pause : function(){
        if(player.alive){
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

function fire() {
    if (game.time.now > bala.nextFire && Math.abs(pajaro.x - player.x) <= 400){
        bala.nextFire = game.time.now + bala.fireRate;
        bala.fireAtSprite(player);
    }
}

function movePajaro(){
    // console.log(pajaro.x + " " + pajaro.y);
    if(pajaro.y <= 100){
        pajaro.body.velocity.y = +50;

            // console.log("sube 1");

    }else if(pajaro.y >= 200){
        pajaro.body.velocity.y = -50;
            // console.log("sube 2");
    }

    if(pajaro.x > player.x){
        bala.trackSprite(pajaro, -40, -10, true);
        if(pajaro.x <= player.x + 200){
            pajaro.animations.play('fly_left');
            // console.log("entra6");
        }else if(pajaro.x <= player.x + 300){
            pajaro.body.velocity.x = 0;
            // console.log("entra5"); 
        }else{
            pajaro.animations.play('fly_left');
            pajaro.body.velocity.x = -200;
            // console.log("entra4"); 
        }
    }else{
        bala.trackSprite(pajaro, 40, -10, true);
        if(pajaro.x >= player.x-200){
            pajaro.animations.play('fly_right');
            // console.log("entra3");
        }else if(pajaro.x >= player.x - 300){
            pajaro.body.velocity.x = 0;
            // console.log("entra2");
        }else{
            pajaro.animations.play('fly_right');
            pajaro.body.velocity.x = +200;
            // console.log("entra1");
        }
    }
}

function touchingEnemy(player, enemy){
    //console.log(enemy.key);
}

function renderGroup(member) {
    game.debug.body(member);
}

function pressed_buttons(event){
    if(game.paused){
        if(clicked(event, continue_button, 1)){
        }else if(clicked(event, retry_button, 1)){
        }else if(clicked(event, exit_button, 1)){
        }else if(clicked(event, pause_button, 1)){
        }   
    }
}

function released_buttons(event){
    if(game.paused){
        if(clicked(event, continue_button, 0)){
            unpause();
        }else if(clicked(event, retry_button, 0)){
            game.state.start('Game');
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
    //scoreText.text = 'Score: ' + score;
}

function destroyBala(bala, piso){
    bala.kill();
}

function hitPlayer(player, bala){
    player.health -= pajaro.damage;
    bala.kill();
}

function listener () {
}

function tween(Sprite){
    Sprite.visible = true;
    game.add.tween(Sprite).to( { alpha: 1.2 }, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
}

function getMonedas(player, moneda){
    moneda.kill();
    if(moneda.key == 'oro_5'){
        player.oro += 5;
    }else{
        player.oro += 1;
    }
    goldText.tint = 0xFFFF00;
    setTimeout(function(){    
      goldText.tint = 0xffffff;
    },300)
}

function changeHealthColor(damaged){
    if(player.health != damaged){
        healthText.tint = 0xff0000;
        setTimeout(function(){    
          healthText.tint = 0xffffff;
        },300)  
    }

    if(player.health < 0){
        player.health = 0;
    }
}
