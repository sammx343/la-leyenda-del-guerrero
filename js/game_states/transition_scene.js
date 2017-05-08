var button;
var transitions;
var text;
var texts;
var n;

var Transition = {

  preload: function(){
  },

  create : function(){
    // texts = ["Lorem ipsum tua sit amet tua", 
    //          "lorem ipsum 2", 
    //          "lorem ipsum 1", 
    //          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed \ndo eiusmod tempor consectetur adipiscing elit, sed. Duis aute \nirure dolor in reprehenderit  in voluptate."];
    // transitions = 0;
    // n = 0;

    var text1;
    var transFondo;

    if(Level == "Mundo0"){
      text1 = "Akho es el guerrero Malibú encargado de ayudar a-su tribu. Muchos animales han sido infectados-por algún tipo de brujería maligna, y solo el puede-blandir su Makana para salvar a su tribu  -de los salvajes ataques de estos animales infectados.";
      transFondo = "trans1";
    }
    else if(Level == "Mundo3"){
      text1 = "En los caminos y lugares donde solían almacenar comida,-agua y otras provisiones,se colocaban puyas en el-suelo, untadas en veneno de muchos animales y yerbas,-como sapos, serpientes y la leche de un árbol al que-llaman Manzanillo";
      transFondo = "trans1";
    } else if(Level == "Mundo2"){
      text1 = "Los Malibú vivían en constantes enfrentamientos con-sus vecinos. El objetivo era tomar posesión de cosas-de las otras aldeas e incediar y matar a la población"
      transFondo = "trans2";
    } else if(Level == "Mundo1"){
      text1 = "Los Malibú vivían en aldeas cerca al río Magdalena y-algunas ciénagas, cercados por palizadas a modo de -murallas, cubiertas por ramas espinozas. Sus -viviendas eran semiesféricas cubiertas de paja y -yerba enredada, con entradas bajas y estrechas";
      transFondo = "trans3";
    }

    var res = text1.split('-');
    texts = [];
    textsIndex = 0;
    for(let i=0; i<=res.length-1;i++){
      if(i%3 == 0 && i != 0){
        textsIndex++;
      }
      if(texts[textsIndex] == null){
        texts[textsIndex] = res[i];
      }else{
        texts[textsIndex] = texts[textsIndex] + "\n" + res[i];
      }
    }

    transitions = 0;
    n = 0;
    var fondo1 = game.add.image(0, 0 , transFondo);
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
    text.text = texts[transitions];
    transitions++;
  }
}

function change_transition(){
  if(transitions >= texts.length){
    scene_transition(Level, 1500);
  }

  if(transitions <= texts.length-1 ){
    n = 0;
    text.text = "";
    text.text = texts[transitions];
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