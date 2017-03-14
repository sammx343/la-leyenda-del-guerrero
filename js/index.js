var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'bloque_juego');


var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

var gravity = 300;

var fondoJuego;
var jumped = false;
var doubleJumped = false;
var cont = 0;
var lastSide;
var punch;
var estadoPrincipal = {

    preload : function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/piso0.png');
        game.load.image('star', 'assets/star.png');
        //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        //game.load.spritesheet('dude', ['assets/main/main1.png'], 84, 99);
        //game.load.atlas('dude', 'assets/main/main0.png', null, null);
        game.load.atlasJSONHash('dude', 'assets/main/main.png', 'js/main.json');
    },

    create: function() {

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 5000, 500);
        //  A simple background for our game
        fondoJuego = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');
        fondoJuego.scale.setTo(4,4);
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;


        var ground = platforms.create(500, game.world.height - 100, 'ground');


        ground.scale.setTo(1, 0.5);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;


        //  Now let's create two ledges
        var ledge = platforms.create(300, 500, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');


        ledge.body.immovable = true;


        var ledge = platforms.create(100, 200, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.4, 0.5);

        // The player and its settings
        player = game.add.sprite(32, game.world.height - 300 , 'dude');
        player.scale.setTo(0.5,0.5);
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        //player.body.bounce.y = 0.2;
        player.body.gravity.y = gravity;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('walk-right', [1,2,3,4,5], 10 , true);
        player.animations.add('walk-left', [7,8,9,10,11], 10 , true);
        player.animations.add('punch-down', [12], 10 , true);
        player.animations.add('punch-right', [13,14,15,16], 6 , true);
        player.animations.add('punch-left', [17,18,19,20], 6 , true);
        player.animations.add('jump-right', [21], 6 , true);
        player.animations.add('jump-left', [22], 6 , true);
        player.animations.add('dead', [23], 6 , true);

        //  Finally some stars to collect
        stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = gravity;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        //  The score
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        punch = game.input.keyboard.addKey(Phaser.Keyboard.C);
    },

    update: function() {

        
        game.camera.follow(player);
        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(player, stars, collectStar, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        fondoJuego.tilePosition.x +=1;

        

        if (cursors.left.isDown){   
            player.body.velocity.x = -150;
            lastSide = 'left';
            if(player.body.touching.down){
                player.animations.play('walk-left');
            }else{
                player.animations.play('jump-left');
            }
        }
        else if (cursors.right.isDown){
            player.body.velocity.x = 150;
            lastSide = 'right';
            if(player.body.touching.down){
                player.animations.play('walk-right');
            }else{
                player.animations.play('jump-right');
            }
        }
        else{
            if(player.body.touching.down){
                if(punch.isDown){
                    if(lastSide == 'left'){ 
                        player.animations.play('punch-left');
                    }else { 
                        player.animations.play('punch-right');
                    }
                }else{
                    if(lastSide == 'left'){  
                        player.frame = 6;
                    }else { 
                        player.frame = 0;
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

        if(player.body.touching.down){

            jump = false;
            doubleJumped = false;

            
        }else{
            jump = true;
        }


        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && jump == false)
        {   
            jump = true;
            player.body.velocity.y = -300;
            cursors.up.isDown = false;
        }else{
            if(jump){
                if(doubleJumped == false && cursors.up.isDown){
                    player.body.velocity.y = -400;
                    doubleJumped = true;
                }
            }
        }
    }
}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

game.state.add('principal', estadoPrincipal);
game.state.start('principal');