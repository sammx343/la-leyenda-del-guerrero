function update_enemies(birdsLenght, tigrillosLenght){
  for (var i = 0; i < birdsLenght; i++){
    enemies[i].update();
    game.physics.arcade.overlap(enemies[i].bird, player, hitEnemy, null, this);
    if(enemies[i].bird.died == false){
        enemyNumber++;
    }          
  }

  for (var i = 0; i < tigrillosLenght; i++){
    tigrillos[i].update();
    game.physics.arcade.overlap(tigrillos[i].tigrillo, player, hitEnemy, null, this);
    if(tigrillos[i].tigrillo.died == false){
        enemyNumber++;
    }          
  }
}

