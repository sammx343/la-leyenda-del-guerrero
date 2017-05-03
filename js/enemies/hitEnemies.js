function hitEnemy(enemy, player){
  if(Punch && enemy.punchable && enemy.died == false){

    var sparkAnimation = sparks.getFirstExists(false);
    sparkAnimation.reset(player.x+player.width/2, player.y+player.height/2);
    sparkAnimation.play('sparks_hit', 30, false, true);

    enemy.punchable = false;
    enemy.health -= player.damage;
    damageText(enemy, player.damage);

    if(enemy.health <= 0){
      create_gold(enemy);
    }
  }
}

function damageText(hitted, damage){
  var txtdamage;
  if(hitted.anchor.x == 0.5){
    txtdamage = game.add.bitmapText(hitted.x , hitted.y-hitted.height/2, 'myfont', "-" + damage, 15);
  }else{
    txtdamage = game.add.bitmapText(hitted.x + hitted.width/2 , hitted.y, 'myfont', "-" + damage, 15);
  }
  game.add.tween(txtdamage).to( { alpha: 0 }, 1400, Phaser.Easing.Linear.None, true, 0, 0, false);
  txtdamage.tint = 0xFF0000;
  setTimeout(function(){    
    hitted.punchable = true;
  },hitted.backToDamage);
}