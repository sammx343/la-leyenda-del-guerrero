var jugar_buttons;
var nivel_1; 
var selector;

var Mapa = {

  preload : function(){
    game.load.image('mapa', 'assets/la_leyenda/mapa/MAPA.png');
    game.load.image('selector', 'assets/la_leyenda/mapa/selector.png');
    game.load.spritesheet('jugar_buttons', 'assets/la_leyenda/mapa/jugar_buttons.png', 212 , 78);
    game.load.spritesheet('nivel_1', 'assets/la_leyenda/mapa/nivel_1.png', 97 , 92);
  },

  create : function(){
    var map = game.add.image(-200, -240 , 'mapa');
    map.scale.setTo(1.3,1.3);

    jugar_buttons = game.add.button(game.width-150, game.height-100, 'jugar_buttons', null, Mapa);
    jugar_buttons.anchor.setTo(0.5,0.5);
    jugar_buttons.onInputDown.add(frame, this, 0);
    jugar_buttons.onInputUp.add(play);

    nivel_1 = game.add.button(game.width/2-100, game.height/2, 'nivel_1', null, Mapa);
    nivel_1.events.onInputUp.add(addSelector, {a: "wdawd"});
    nivel_1.scale.setTo(0.7,0.7);
    nivel_1.anchor.setTo(0.5,0.5);

    selector = game.add.image(100, 100 , 'selector');
    selector.anchor.setTo(0.5,0.5);
    selector.visible = false;
  },

  update: function(){
  /*  if(game.input.onUp.add(clicked, self, nivel_1, 0)){
      console.log("message");
    }*/
  }
}

function addSelector(){
  if(nivel_1.frame == 0){
    selector.visible = true;
    selector.x = nivel_1.x;
    selector.y = nivel_1.y;
    jugar_buttons.frame = 1;
    nivel_1.frame = 1;
  }else{
    selector.visible = false;
    jugar_buttons.frame = 0;
    nivel_1.frame = 0;
  }
}

function play(){
  if(selector.visible){
    //Mapa.state.start('Game');
    Mapa.state.start('Transition');
  }
}

function frame(){
  jugar_buttons.frame = 0;
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