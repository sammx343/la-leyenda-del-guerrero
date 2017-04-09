function playerMovement(){
    if (cursors.left.isDown){
        sideMovement(-200, 0.5, 4.5, 'left','walk-left', 'jump-left', inGround);
    }
    else if (cursors.right.isDown){
        sideMovement(200, -0.5, -4.5, 'right','walk-right', 'jump-right', inGround);
    }
    else{
        if(player.body.touching.down && inGround){
            if(punch.isDown){
                isPunching = true;
                conditionForAnimation(lastSide, 'left','punch-left', 'punch-right');
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
            conditionForAnimation(lastSide, 'left','jump-left', 'jump-right');
        }
    }

    if(player.animations.currentAnim.frame == 20 || player.animations.currentAnim.frame == 16){
        isPunching = false;
        player.animations.stop(null, true);
    }

    if(player.body.touching.down && inGround){
        doubleJumped = false;
    }

    if (cursors.up.isDown && player.body.touching.down && inGround){   
        isPunching = false;
        player.body.velocity.y = -500;
        cursors.up.isDown = false;
    }else if(doubleJumped == false && cursors.up.isDown){
        player.body.velocity.y = -450;
        doubleJumped = true;
    }
}

function sideMovement(speed, fondoSpeed, platformSpeed, side, run_animation, jump_animation, inGround){
    player.body.velocity.x = speed;
    isPunching = false;
    fondoLight.forEach(function(item){
        if(!game.camera.atLimit.x){
            item.tilePosition.x += fondoSpeed;
        }
    });
    platforms2.forEach(function(item){
        if(!game.camera.atLimit.x){
            item.cameraOffset.x  += platformSpeed;
        }
    });
    lastSide = side;
    if(player.body.touching.down && inGround){
        player.animations.play(run_animation);
    }else{
        player.animations.play(jump_animation);
    }
}

function conditionForAnimation(cond1, cond2, animation1, animation2){
    if(cond1 == cond2){ 
        player.animations.play(animation1);
    }else{ 
        player.animations.play(animation2);
    }
}