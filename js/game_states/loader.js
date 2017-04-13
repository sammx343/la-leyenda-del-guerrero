var loadText;

var Loader = {

  preload : function(){
    game.load.image('loader_fondo', 'assets/la_leyenda/loader/fondo_cargando.png');
    game.load.bitmapFont('myfont', 'assets/font5/font.png', 'assets/font5/font.fnt');
  },

  create : function(){
    fondoLoader = game.add.tileSprite(0, 0, 1070, 602, 'loader_fondo');

    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(loadComplete, this);

    loadText = game.add.bitmapText(game.width/2, game.height/2 , 'myfont', '0%', 50);
    loadText.anchor.setTo(0.5);

    start();
  }
};

function start(){
  //LOADER LOADER
  game.load.image('uninorte', 'assets/la_leyenda/loader/uninorte_logo.png');
  game.load.image('mapuka', 'assets/la_leyenda/loader/malibu-proyecto.png');

  //MENU LOADER
  game.load.image('titulo', 'assets/la_leyenda/menu/identificador.png');
  game.load.image('fondo', 'assets/la_leyenda/menu/fondo.png');
  game.load.atlasJSONHash('jugarButton', 'assets/la_leyenda/menu/botones-jugar.png', 'js/atlas/menu_button.json');

  //MAPA LOADER
  game.load.image('mapa', 'assets/la_leyenda/mapa/MAPA.png');
  game.load.image('selector', 'assets/la_leyenda/mapa/selector.png');
  game.load.spritesheet('jugar_buttons', 'assets/la_leyenda/mapa/jugar_buttons.png', 212 , 78);
  game.load.spritesheet('nivel_1', 'assets/la_leyenda/mapa/nivel_1.png', 97 , 92);

  //TRANSITION_SCENE LOADER
  game.load.image('panel', 'assets/la_leyenda/transition/panel.png');
  game.load.image('fondo1', 'assets/la_leyenda/transition/fondo_aldea1.png');
  game.load.spritesheet('buttons', 'assets/la_leyenda/transition/buttons.png', 107, 108);

  //MUNDO 1 LOADER
  game.load.image('sky', 'assets/la_leyenda/nivel1/capas_piso/fondo-estatico.png');
  game.load.image('capa11', 'assets/la_leyenda/nivel1/capas_piso/capa-1-sector-1.png');
  game.load.image('capa12', 'assets/la_leyenda/nivel1/capas_piso/capa-1-sector-2.png');
  game.load.image('capa21', 'assets/la_leyenda/nivel1/capas_piso/capa-2-sector-1.png');
  game.load.image('capa22', 'assets/la_leyenda/nivel1/capas_piso/capa-2-sector-2.png');
  game.load.image('capa23', 'assets/la_leyenda/nivel1/capas_piso/capa-2-sector-3.png');
  game.load.image('capa31', 'assets/la_leyenda/nivel1/capas_piso/capa-3-sector-1.png');
  game.load.image('capa32', 'assets/la_leyenda/nivel1/capas_piso/capa-3-sector-2.png');
  game.load.image('puas1', 'assets/la_leyenda/nivel1/obstaculos/puas1.png');
  game.load.image('puas2', 'assets/la_leyenda/nivel1/obstaculos/puas2.png');
  game.load.image('puas3', 'assets/la_leyenda/nivel1/obstaculos/puas3.png');
  game.load.image('puas-piso', 'assets/la_leyenda/nivel1/obstaculos/puas-piso.png');
  game.load.image('totem1', 'assets/la_leyenda/nivel1/obstaculos/totem1.png');
  game.load.image('totem2', 'assets/la_leyenda/nivel1/obstaculos/totem2.png');

  game.load.spritesheet('pause_button', 'assets/la_leyenda/menu/pause_menu/pause_button.png', 75, 90);
  game.load.image('vida', 'assets/la_leyenda/menu/vida.png');
  game.load.image('oro', 'assets/la_leyenda/menu/oro.png');
  game.load.image('sabiduria', 'assets/la_leyenda/menu/sabiduria.png');

  game.load.image('oro_5', 'assets/la_leyenda/objetos_mundos/oro/oro_pieza_grande.png');
  game.load.image('oro_1', 'assets/la_leyenda/objetos_mundos/oro/oro_pieza_pequeña.png');

  game.load.image('pause_menu', 'assets/la_leyenda/menu/pause_menu/pausa-back.png');
  game.load.spritesheet('continue_button', 'assets/la_leyenda/menu/pause_menu/continue_button.png', 306, 131);
  game.load.spritesheet('exit_button', 'assets/la_leyenda/menu/pause_menu/exit_button.png', 119, 139);
  game.load.spritesheet('retry_button', 'assets/la_leyenda/menu/pause_menu/retry_button.png', 118 , 131);

  game.load.image('pause_menu_lose', 'assets/la_leyenda/perdiste/fondo_perdiste.png');
  game.load.spritesheet('head', 'assets/la_leyenda/perdiste/personaje/head_animation.png', 393, 353);
  game.load.spritesheet('button_exit_lose', 'assets/la_leyenda/perdiste/button_exit_lose.png', 115, 123);
  game.load.spritesheet('button_retry_lose', 'assets/la_leyenda/perdiste/button_retry_lose.png', 315, 128);

  game.load.image('menu_win', 'assets/la_leyenda/Ganaste/menu_win.png');
  game.load.spritesheet('head_win', 'assets/la_leyenda/Ganaste/personaje/head_win.png', 315, 450);
  game.load.spritesheet('button_retry_win', 'assets/la_leyenda/Ganaste/button_retry_win.png', 127, 139);
  game.load.spritesheet('button_continue_win', 'assets/la_leyenda/Ganaste/button_continue_win.png', 306, 139);

  game.load.atlasJSONHash('dude', 'assets/la_leyenda/heroe/heroe.png', 'js/atlas/heroe.json');
  game.load.spritesheet('pajaro', 'assets/la_leyenda/enemigos/pajaro_spritesheet.png', 255, 229);
  game.load.image('bala_pajaro', 'assets/la_leyenda/enemigos/bala_pajaro.png');

  game.load.start();
}

function loadStart() {
  loadText.setText("Loading ...");
}

//  This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
  loadText.setText( progress + "%");
}

function loadComplete() {
  scene_transition('Mundo1', 50);
}