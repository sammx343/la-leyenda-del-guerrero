function tween(Sprite, time){
  Sprite.visible = true;
  game.add.tween(Sprite).to( { alpha: 1 }, (time || 800), Phaser.Easing.Linear.None, true, 0, 0, false);
}