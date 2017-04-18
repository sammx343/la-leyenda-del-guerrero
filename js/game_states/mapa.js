var jugar_buttons;
var nivel_1; 
var selector;
var my_game;
var button_group;
var tweenBack;
var toggle;
var shouldLevel;
var levelButtons;

var Mapa = {

  preload : function(){
  },

  create : function(){
    var map = game.add.image(0, 0 , 'mapa');

    map.scale.setTo(0.67);
    toggle = false;

    jugar_buttons = createItem(game.width-130, game.height-50,'jugar_buttons', 0.5, 1, true, true, 0.3);
    jugar_buttons.frame = 1;
    jugar_buttons.onInputDown.add(frame, this, 0);
    jugar_buttons.onInputUp.add(play);

    nivel_1 = createItem(game.width/2-50, game.height/2-20, 'nivel_1', 0.5, 0.7, true, true, 0.3);
    nivel_1.events.onInputUp.add(addSelector);
    nivel_1.frame = 1;
    nivel_1.level = 1;

    nivel_2 = createItem(game.width/2+60, game.height/2+20, 'nivel_2', 0.5, 0.7, true, true, 0.3);
    nivel_2.events.onInputUp.add(addSelector);
    nivel_2.frame = 1;
    nivel_2.level = 2;

    nivel_3 = createItem(game.width/2+80, game.height/2+120, 'nivel_3', 0.5, 0.7, true, true, 0.3);
    nivel_3.events.onInputUp.add(addSelector);
    nivel_3.frame = 1;
    nivel_3.level = 3;

    levelButtons = [nivel_1, nivel_2, nivel_3];
    for(let i=0;i<levelButtons.length;i++){
      if(levelButtons[i].level == game.global.level){
        tweenBack = game.add.tween(levelButtons[i]).to( { alpha: 1 }, 600, Phaser.Easing.Linear.None, true, 1000, -1, true);
      }
    }

    console.log(game.global.level);
    tweenTint(jugar_buttons, 0xFFFFFF, 0xffcccc, 1000)
    selector = game.add.image(100, 100 , 'selector');
    selector.anchor.setTo(0.5,0.5);
    selector.visible = false;

    game.camera.flash('#000000', 500);
  },

  update: function(){
  }
}

function addSelector(button){
  shouldLevel = button.level;
  if(toggle == false){
    toggle = true;
    selector.visible = true;
    selector.x = button.x;
    selector.y = button.y;
    if(shouldLevel <= game.global.level){
      console.log("eche cole que");
      game.add.tween(jugar_buttons).to( { alpha: 1 }, 350, Phaser.Easing.Linear.None, true, 0, 0, false); 
      game.add.tween(button).to( { alpha: 1 }, 350, Phaser.Easing.Linear.None, true, 0, 0, false); 
    }
    if(tweenBack != null && button.level == game.global.level){
      tweenBack.pause();
    }
  }else{
    toggle = false;
    selector.visible = false;
    if(shouldLevel <= game.global.level){
      game.add.tween(jugar_buttons).to( { alpha: 0.3 }, 350, Phaser.Easing.Linear.None, true, 0, 0, false);   
    }
    var mytween = game.add.tween(button).to( { alpha: 0.3 }, 350, Phaser.Easing.Linear.None, true, 0, 0, false);
    mytween.onComplete.add(function(){
      if(tweenBack != null){
        tweenBack.resume();
        tweenBack.repeat();
      }
    }, this);
  }
}

function play(button){
  if(selector.visible && shouldLevel <= game.global.level){
    scene_transition('Transition');
  }
}

function frame(){
  if(selector.visible == true){
    jugar_buttons.frame = 0;
  }
}

/*function clicked(event, button , fr){
    var x1 = button.x - button.width/2;
    var x2 = button.x + button.width/2;
    var y1 = button.y - button.height/2;
    var y2 = button.y + button.height/2;

    var pressed = event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2;
    if(pressed){ button.frame = fr};

    return (pressed);
}*/