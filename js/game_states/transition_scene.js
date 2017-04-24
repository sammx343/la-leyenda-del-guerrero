var button;
var transitions;
var text;
var texts;
var n;

var Transition = {

  preload: function(){
  },

  create : function(){
    texts = ["Lorem ipsum tua sit amet tua", 
             "lorem ipsum 2", 
             "lorem ipsum 1", 
             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed \ndo eiusmod tempor consectetur adipiscing elit, sed. Duis aute \nirure dolor in reprehenderit  in voluptate."];
    transitions = 0;
    n = 0;
    var fondo1 = game.add.image(0, 0 , 'fondo1');
    var panel = game.add.image(15, 400, 'panel');

    
    button = game.add.button(860, 490, 'buttons', null, Transition);
    button.anchor.setTo(0.5,0.5);
    button.scale.setTo(0.8,0.8);

    button.onInputDown.add(button_sprite_down);
    button.onInputUp.add(button_sprite_up);
    //button.onInputUp.add(my_frame);

    text = game.add.text(240, 455, '', { font: "20px Arial", fill: "#1E335F", stroke: "#000000", align: "left" });
    
    // text = game.add.bitmapText(240, 460, 'myfont', texts[transitions], 35);
    // text.tint = 0x20A0C7;

    button.upAction = change_transition;

    game.camera.flash('#000000', 1000);
    typeWriter(texts[transitions]);
    transitions++;
  }
}

function change_transition(){
  if(transitions >= texts.length){
    scene_transition(Level, 1500);
  }

  if(transitions <= texts.length-1 ){
    console.log(texts[transitions]);
    n = 0;
    text.text = "";
    typeWriter(texts[transitions]);
  }
  transitions++;
}

function typeWriter(txt){  
  if(n< txt.length){  
    text.text +=  txt.charAt(n);  
    n++;  
    setTimeout(function(){    
      typeWriter(txt)
    },30);  
  }
}