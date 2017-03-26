//var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'bloque_juego');


var player;
var platforms;
var fondoLight;
var cursors;
var ground;

var vida;
var oro;
var continue_button;
var pause_button;
var retry_button;
var exit_button;

var pause_p;

var stars;
var score = 0;
var scoreText;

var gravity = 850;

var fondoJuego;
var jumped = false;
var doubleJumped = false;
var cont = 0;
var lastSide;
var punch;
var isPunching = false;
var isRunning = false;
var isJumping = false;

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

        game.load.image('star', 'assets/star.png');

        game.load.spritesheet('pause_button', 'assets/la_leyenda/menu/pause_menu/pause_button.png', 75, 90);
        game.load.image('vida', 'assets/la_leyenda/menu/vida.png');
        game.load.image('oro', 'assets/la_leyenda/menu/oro.png');

        game.load.image('pause_menu', 'assets/la_leyenda/menu/pause_menu/pausa-back.png');
        game.load.spritesheet('continue_button', 'assets/la_leyenda/menu/pause_menu/continue_button.png', 306, 131);
        game.load.spritesheet('exit_button', 'assets/la_leyenda/menu/pause_menu/exit_button.png', 119, 139);
        game.load.spritesheet('retry_button', 'assets/la_leyenda/menu/pause_menu/retry_button.png', 118 , 131);

        //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        //game.load.spritesheet('dude', ['assets/main/main1.png'], 84, 99);
        //game.load.atlas('dude', 'assets/main/main0.png', null, null);
        game.load.atlasJSONHash('dude', 'assets/main/main.png', 'js/atlas/main.json');
        //game.load.atlasJSONHash('buttons', 'assets/la_leyenda/menu/options_stylesheet.png', 'js/atlas/game_options_atlas.json');
    },

    create: function() {

        var tam = 40;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 10000, 500);

        fondoJuego = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');
        fondoJuego.fixedToCamera = true;

        fondoLight = game.add.group();
        fondo1 = game.add.tileSprite(1280*0, -tam - 10, 1400, 1010, 'capa32');
        //fondo2 = game.add.tileSprite(1280*1, 8, 1400, 1010, 'capa31');
        fondoLight.add(fondo1);
        //fondoLight.add(fondo2)
        /*for(let i=0; i<=12; i++){
            let fondo1;
            if(i%2==0){
                fondo1 = game.add.tileSprite(1280*i, 0, 1400, 1010, 'capa32');
                //plantasFondo1.scale.setTo(0.7 , 0.6);
                //plantasFondo1.fixedToCamera = true;
            }else{
                fondo1 = game.add.tileSprite(1280*i, 8, 1400, 1010, 'capa31');
                //plantasFondo2.scale.setTo(0.7 , 0.6);
                //plantasFondo2.fixedToCamera = true;
            }
            fondoLight.add(fondo1)
        }
*/
        fondoLight.scale.setTo(0.72 , 0.62);
        fondoLight.fixedToCamera = true;
        /*fondoLight.forEachAlive(function(item){
            item.scale.setTo(0.7 , 0.6);
        });*/

        //fondoJuego.scale.setTo(1.5,1.3);

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

        player = game.add.sprite(32, game.height - 400, 'dude');
        player.anchor.setTo(0.5);
        player.scale.setTo(0.9, 0.9);

        for(let i=0;i<=6;i++){
            if(i%2==0){
                game.add.sprite(i*1280, game.world.height - 142 - tam , 'capa11');
            }else{
                game.add.sprite(i*1280, game.world.height - 149  - tam , 'capa12');
            }
        }

        game.physics.arcade.enable(player);

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

        stars = game.add.group();

        stars.enableBody = true;

        for (var i = 0; i < 12; i++){
            var star = stars.create(i * 70, 0, 'star');

            star.body.gravity.y = gravity;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
            star.body.bounce.x = 0.5 + Math.random() * 0.2;
        }

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

        oro = game.add.sprite(game.width/2, move*3 , 'oro');
        oro.anchor.setTo(0.5);
        oro.scale.setTo(0.7, 0.7);
        oro.fixedToCamera = true;

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
    },

    update: function() {
        fondoJuego.tilePosition.x -= 0.1;
        game.camera.follow(player);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.overlap(player, stars, collectStar, null, this);

        //console.log(game.camera.atLimit);

        player.body.velocity.x = 0;

        if (cursors.left.isDown){   
            isRunning = true;
            player.body.velocity.x = -200;
            isPunching = false;
            fondoLight.forEach(function(item){
                if(!game.camera.atLimit.x){
                    item.tilePosition.x += 0.5;
                } 
            });

            lastSide = 'left';
            if(player.body.touching.down){
                isJumping = false;
                player.animations.play('walk-left');
            }else{
                isJumping = true;
                player.animations.play('jump-left');
            }
        }
        else if (cursors.right.isDown){
            isRunning = true;
            player.body.velocity.x = 200;
            isPunching = false;
            fondoLight.forEach(function(item){
                if(!game.camera.atLimit.x){
                    item.tilePosition.x -= 0.5;
                }
            });

            lastSide = 'right';
            if(player.body.touching.down){
                isJumping = false;
                player.animations.play('walk-right');
            }else{
                isJumping = true;
                player.animations.play('jump-right');
            }
        }
        else{
            isRunning = false;
            if(player.body.touching.down){
                isJumping = false;
                if(punch.isDown){
                    isPunching = true;
                    if(lastSide == 'left'){ 
                        player.animations.play('punch-left');
                    }else { 
                        player.animations.play('punch-right');
                    }
                }else{
                    if(isPunching == false){ 
                        if(lastSide == 'left'){  
                            player.frame = 6;
                        }else { 
                            player.frame = 0;
                        }
                    }
                }
            }else{
                if(lastSide == 'left'){ 
                    player.animations.play('jump-left');
                }else { 
                    player.animations.play('jump-right');
                }
            }
        }
       /* console.log(isPunching);
        console.log(player.animations.currentAnim.frame);*/
        if(player.animations.currentAnim.frame == 20 || player.animations.currentAnim.frame == 16){
            isPunching = false;
            player.animations.stop(null, true);
        }

        if(player.body.touching.down){
            jump = false;
            doubleJumped = false;
        }else{
            jump = true;
        }

        if (cursors.up.isDown && player.body.touching.down && jump == false)
        {   
            isPunching = false;
            jump = true;
            player.body.velocity.y = -500;
            cursors.up.isDown = false;
        }else{
            if(jump){
                if(doubleJumped == false && cursors.up.isDown){
                    player.body.velocity.y = -450;
                    doubleJumped = true;
                }
            }
        }

        game.input.keyboard.onUpCallback = function (e) {
            if(e.keyCode == Phaser.Keyboard.ENTER || e.keyCode == Phaser.Keyboard.ESC){
                if(!game.paused){
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

                console.log("message");
            }
        };
    },

    render: function(){
       /* game.debug.body(player);
        platforms.forEachAlive(renderGroup, this);*/
    },

    pause : function(){
        game.input.onDown.add(pressed_buttons, self);
        game.input.onUp.add(released_buttons, self);
        pause_menu.visible = true;
        continue_button.visible = true;
        retry_button.visible = true;
        exit_button.visible = true;
        game.paused = true;
    }
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

function collectStar (player, star) {
    star.destroy();
    score += 10;
    //scoreText.text = 'Score: ' + score;
}

function listener () {
    console.log("message");
}