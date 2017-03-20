//var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'bloque_juego');


var player;
var platforms;
var cursors;

var buttonPause;
var buttonContinue;

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
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/piso0.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('pause_button', 'assets/la_leyenda/menu/pause_button.png');
        game.load.image('continue_button', 'assets/la_leyenda/menu/continue_button.png');
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
        fondoJuego.scale.setTo(4,4);

        platforms = game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(0, game.world.height - 64, 'ground');

        ground.scale.setTo(2, 2);

        ground.body.immovable = true;


        var ground = platforms.create(500, game.world.height - 100, 'ground');


        ground.scale.setTo(1, 0.5);

        ground.body.immovable = true;

        var ledge = platforms.create(300, 500, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');


        ledge.body.immovable = true;


        var ledge = platforms.create(100, 200, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.4, 0.5);

        player = game.add.sprite(32, game.height - 200, 'dude');
        player.scale.setTo(0.4, 0.5);

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

        for (var i = 0; i < 12; i++)
        {
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


        buttonContinue = game.add.button(game.width/2, game.height/2 , 'continue_button' , null , this);
        buttonContinue.anchor.setTo(0.5);
        buttonContinue.fixedToCamera = true;
        buttonContinue.visible = false;
    },

    update: function() {
        game.camera.follow(player);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);

        game.physics.arcade.overlap(player, stars, collectStar, null, this);

        player.body.velocity.x = 0;
        fondoJuego.tilePosition.x +=1;

        if (cursors.left.isDown){   
            isRunning = true;
            player.body.velocity.x = -150;
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
            player.body.velocity.x = 150;
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

        if(player.animations.currentAnim.frame == 20 || player.animations.currentAnim.frame == 16 || isRunning || isJumping){
            isPunching = false;
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
            player.body.velocity.y = -300;
            cursors.up.isDown = false;
        }else{
            if(jump){
                if(doubleJumped == false && cursors.up.isDown){
                    player.body.velocity.y = -200;
                    doubleJumped = true;
                }
            }
        }
    },

    pause : function(){
        buttonContinue.visible = true;
        game.input.onDown.add(unpause, self);
        game.paused = true;
    }
}

function unpause(event){
    console.log(event);
    buttonContinue.visible = false;
    game.paused = false;
}

function collectStar (player, star) {
    star.destroy();
    score += 10;
    scoreText.text = 'Score: ' + score;

}
