var button;
var transitions;
var text;
var texts;
var typewriter = new Typewriter();

var Transition = {

  preload: function(){
    game.load.image('panel', 'assets/la_leyenda/transition/panel.png');
    game.load.image('fondo1', 'assets/la_leyenda/transition/fondo_aldea1.png');
    game.load.spritesheet('buttons', 'assets/la_leyenda/transition/buttons.png', 107, 108);
  },

  create : function(){
    texts = ["lorem ipsum 3" , "lorem ipsum 2", "lorem ipsum 1", "loremp ipsum0"];
    transitions = 3;
    var fondo1 = game.add.image(0, 0 , 'fondo1');
    var panel = game.add.image(15, 400, 'panel');

    
    button = game.add.button(860, 490, 'buttons', null, Transition);
    button.anchor.setTo(0.5,0.5);
    button.scale.setTo(0.8,0.8);

    button.onInputDown.add(my_frame);
    button.onInputUp.add(my_play);
    //button.onInputUp.add(my_frame);

    text = game.add.text(240, 460, texts[transitions], { font: "25px Arial", fill: "#000", align: "center" });

    game.camera.flash('#000000', 1000);
  },

  update : function(){
    //
  }
}

function my_play(){
  button.frame = 0;
  if(transitions == 0){
    scene_transition('Game');
  }
}

function my_frame(){
  if(transitions>0){
    transitions--;
    button.frame = 1;
    text.text = texts[transitions];
  }
}