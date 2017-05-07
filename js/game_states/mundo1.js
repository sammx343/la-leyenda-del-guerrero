var Mundo1 = {

    preload : function() {
        
    },

    create: function(){
        var tam = -100;

        // music.removeMarker("music1")
        // music.stop();

        // music2 = game.add.audio('music2',0.2,true);

        // console.log(music2);

        // if(music2.isPlaying){
        //  console.log("entra aqui alguna hpta vez");
        //  music2.stop();
        // }else{
        //  music2.play();
        // }
        create_world()
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
            obstacle.body.setSize(obstacle.width-70, obstacle.height, 20, 15);
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

        birdsNumber = 5;
        enemies = [];

        for (var i = 0; i < birdsNumber; i++){
          enemies.push(new birds(500*(i+1)+1500, game.height - 500, 120, 10));
        }

        tigrillos = [];
        tigrillos.push(new trgs(600, game.height - 200));

        create_player(0,300);

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

        instructions = game.add.group();
        createInstruction(300 , 500, "Derrota a TODOS los enemigos para completar el nivel ", 30);
        tween(instructions.children[0], 1500);
        game_menu_create(this);
    },

    update: function(){
        var damaged = player.health;
        enemyNumber = 0;

        fondoJuego.tilePosition.x -= 0.1;
        game.camera.follow(player);

        game.physics.arcade.collide(stars, platforms);
        
        game.physics.arcade.collide(monedas, platforms, null, null, this);
        game.physics.arcade.collide(monedas, obstacles, null, null, this);
        game.physics.arcade.overlap(monedas, player, getMonedas, null, this);

        // game.physics.arcade.overlap(bala.bullets, player, hitPlayer, null, this);
        // game.physics.arcade.collide(bala.bullets, platforms, destroyBala, null, this);

        //game.physics.arcade.overlap(player, pajaro, touchingEnemy, null, this);
        //console.log(game.camera.atLimit);

        update_enemies(enemies.length, tigrillos.length);

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

        if(enemyNumber <= 0 || player.alive == false){
            finalGoldText.text = player.gold;
        }

        key_pause(this);
        parallax1();
        changeHealthColor(damaged);   

        moveInstructions();
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

function collectStar(player, star){
    star.destroy();
    score += 10;
}

function listener () {
}