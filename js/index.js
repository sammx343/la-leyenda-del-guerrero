//var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'bloque_juego');


var player;
var platforms;
var cursors;
var ground;

var continue_button;
var buttonPause;
var retry_button;
var exit_button;

var pause_p;

var stars;
var score = 0;
var scoreText;

var gravity = 400;

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
        game.load.image('sky', 'assets/la_leyenda/nivel1/fondo_3.png');
        game.load.image('ground', 'assets/la_leyenda/nivel1/piso3.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('pause_button', 'assets/la_leyenda/menu/pause_button.png');

        game.load.image('continue_button', 'assets/la_leyenda/menu/continue_button.png');
        game.load.image('exit_button', 'assets/la_leyenda/menu/exit_button.png');
        game.load.image('retry_button', 'assets/la_leyenda/menu/retry_button.png');

        //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        //game.load.spritesheet('dude', ['assets/main/main1.png'], 84, 99);
        //game.load.atlas('dude', 'assets/main/main0.png', null, null);
        game.load.atlasJSONHash('dude', 'assets/main/main.png', 'js/atlas/main.json');
        game.load.atlasJSONHash('buttons', 'assets/la_leyenda/menu/options_stylesheet.png', 'js/atlas/game_options_atlas.json');
    },

    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 5000, 500);

        fondoJuego = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');
        fondoJuego.fixedToCamera = true;
        //fondoJuego.scale.setTo(1.5,1.3);

        platforms = game.add.group();
        platforms.enableBody = true;

        for(let i=0;i<=4;i++){
            ground = platforms.create(i*640, game.world.height - 100, 'ground');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
            ground.body.setSize(ground.width, ground.height, 0, 30);
        }

        ground.scale.setTo(1, 1);
        ground.body.immovable = true;

        /*var ledge = platforms.create(300, 500, 'ground');
        ledge.body.immovable = true;

        //ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;*/

        player = game.add.sprite(32, game.height - 200, 'dude');
        player.anchor.setTo(0.5);
        player.scale.setTo(0.9, 0.9);

        game.physics.arcade.enable(player);

        player.body.gravity.y = gravity;
        player.body.collideWorldBounds = true;

        player.animations.add('walk-right', [1,2,3,4,5], 10 , true);
        player.animations.add('walk-left', [7,8,9,10,11], 10 , true);
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

        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        cursors = game.input.keyboard.createCursorKeys();
        punch = game.input.keyboard.addKey(Phaser.Keyboard.C);

        buttonPause = game.add.button(game.width-100, 10 , 'pause_button' , Juego.pause , this);
        buttonPause.scale.setTo(0.5, 0.5);
        buttonPause.fixedToCamera = true;

        pause_p = game.input.keyboard.addKey(Phaser.Keyboard.P);
        
        game.input.keyboard.onUpCallback = function (e) {
            if(e.keyCode == Phaser.Keyboard.P || e.keyCode == Phaser.Keyboard.ESC){
                if(!game.paused){
                    Juego.pause();
                }else{
                    unpause();
                }
            }
        };

        continue_button = game.add.button(game.width/2, game.height/2 - game.height/7, 'continue_button' , null , this);
        continue_button.anchor.setTo(0.5);
        continue_button.fixedToCamera = true;
        continue_button.visible = false;

        retry_button = game.add.button(game.width/2 + game.width/10 , game.height/2 + game.height/20, 'retry_button' , null , this);
        retry_button.anchor.setTo(0.5);
        retry_button.scale.setTo(0.7, 0.7);
        retry_button.fixedToCamera = true;
        retry_button.visible = false;

        exit_button = game.add.button(game.width/2 - game.width/10, game.height/2 + game.height/20  , 'exit_button' , null , this);
        exit_button.anchor.setTo(0.5);
        exit_button.scale.setTo(0.7, 0.7);
        exit_button.fixedToCamera = true;
        exit_button.visible = false;

        retry_button.events.onInputDown.add(listener, this);
    }n,

    update: function() {
        fondoJuego.tilePosition.x -= 0.1;
        game.camera.follow(player);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.overlap(player, stars, collectStar, null, this);

        player.body.velocity.x = 0;

        if (cursors.left.isDown){   
            isRunning = true;
            player.body.velocity.x = -200;
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
        console.log(isPunching);
        console.log(player.animations.currentAnim.frame);
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
            jump = true;
            player.body.velocity.y = -400;
            cursors.up.isDown = false;
        }else{
            if(jump){
                if(doubleJumped == false && cursors.up.isDown){
                    player.body.velocity.y = -300;
                    doubleJumped = true;
                }
            }
        }
    },

    render: function(){
        game.debug.body(player);
        game.debug.body(ground);
    },

    pause : function(){
        game.input.onDown.add(paused_buttons, self);
        continue_button.visible = true;
        retry_button.visible = true;
        exit_button.visible = true;
        game.paused = true;
    }
}

function paused_buttons(event){
    if(game.paused){
        if(clicked(event, continue_button)){
            unpause();
        }else if(clicked(event, retry_button)){
            game.state.start('Game');
            unpause();
        }else if(clicked(event, exit_button)){
            game.state.start('Menu');
            unpause();
        }   
    }
}

function clicked(event, button){
    var x1 = button.cameraOffset.x - button.width/2;
    var x2 = button.cameraOffset.x + button.width/2;
    var y1 = button.cameraOffset.y - button.height/2;
    var y2 = button.cameraOffset.y + button.height/2;
    return (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 );
}

function unpause(){
    continue_button.visible = false;
    retry_button.visible = false;
    exit_button.visible = false;
    game.paused = false;
}

function collectStar (player, star) {
    star.destroy();
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function listener () {
    console.log("message");
}