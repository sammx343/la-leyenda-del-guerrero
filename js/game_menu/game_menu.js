
function game_menu_create(Mundo){
  var move = 20;
  showMenuOnce = false;
  worldName = Mundo.key;
  pause_menu = createItem(game.width/2, game.height/2, 'pause_menu', 0.5, 0.8, true, false);

  pause_button = game.add.button(game.width/20, move*3 , 'pause_button' , Mundo.pause , this, 0, 0 , 1, 0);
  pause_button.scale.setTo(0.9);
  pause_button.anchor.setTo(0.5);
  pause_button.fixedToCamera = true;
  
  vida = game.add.sprite(game.width/6, move*3 , 'vida');
  vida.anchor.setTo(0.5);
  vida.fixedToCamera = true;

  healthText = game.add.bitmapText(game.width/5.2, move*3 , 'myfont', '', 35);
  healthText.anchor.setTo(0.5);
  healthText.fixedToCamera = true;

  // oro = game.add.sprite(game.width/2, move*3 , 'oro');
  // oro.anchor.setTo(0.5);
  // oro.scale.setTo(0.6);
  // oro.fixedToCamera = true;
  
  // goldText = game.add.bitmapText(game.width/2 + oro.width/1.3, move*3 + 5 , 'myfont', '', 40);
  // goldText.anchor.setTo(0.5);
  // goldText.fixedToCamera = true;

  sabiduria = game.add.sprite(game.width/1.2, move*3 , 'sabiduria');
  sabiduria.anchor.setTo(0.5);
  sabiduria.scale.setTo(0.58);
  sabiduria.fixedToCamera = true;

  sabiduriaText = game.add.bitmapText(game.width/1.08, move*3  , 'myfont', '0', 35);
  sabiduriaText.anchor.setTo(0.5);
  sabiduriaText.fixedToCamera = true;

  continue_button = createItem(game.width/2 + game.width/10 + move, game.height/2 + game.height/20, 'continue_button' , 0.5, 0.85, true, false);

  retry_button = createItem(game.width/2 - game.width/12 + move, game.height/2 + game.height/20, 'retry_button' , 0.5, 0.85, true, false);
  retry_button.events.onInputDown.add(listener, this);

  exit_button = createItem(game.width/2 - game.width/5 + move, game.height/2 + game.height/20  , 'exit_button', 0.5, 0.85, true, false);
  
  pause_menu_lose = createItem(game.width/2, game.height/2, 'pause_menu_lose', 0.5, 0.8, true, false, 0);

  head = createItem(game.width/4.4, game.height/2, 'head', 0.5, 0.8, true, false, 0);
  head.animations.add('negation', [0,1,2,1], 7 , true);

  button_exit_lose = createItem(game.width/2 - game.width/12 + move, game.height/2 + game.height/7, 'button_exit_lose', 0.5, 0.8, true, false, 0);
  button_exit_lose.upAction = function(){game.state.start('Menu')};
  button_exit_lose.onInputDown.add(button_sprite_down);
  button_exit_lose.onInputUp.add(button_sprite_up);

  button_retry_lose = createItem(game.width/2 + game.width/10 + move, game.height/2 + game.height/7, 'button_retry_lose', 0.5, 0.8, true, false, 0);
  button_retry_lose.upAction = function(){game.state.start(Mundo.key)};
  button_retry_lose.onInputDown.add(button_sprite_down);
  button_retry_lose.onInputUp.add(button_sprite_up);

  menu_win = createItem(game.width/2, game.height/2, 'menu_win', 0.5, 0.8, true, false, 0);

  head_win = createItem(game.width/4.4, game.height/2, 'head_win', 0.5, 0.8, true, false, 0);
  head_win.animations.add('smile', [0,1,2,3,2,1], 6 , true);

  button_retry_win = createItem(game.width/2 - game.width/12 + move, game.height/2 + game.height/7, 'button_retry_win', 0.5, 0.8, true, false, 0);
  button_retry_win.upAction = function(){game.state.start(Mundo.key)};
  button_retry_win.onInputDown.add(button_sprite_down);
  button_retry_win.onInputUp.add(button_sprite_up);

  button_continue_win = createItem(game.width/2 + game.width/10 + move, game.height/2 + game.height/7, 'button_continue_win', 0.5, 0.8, true, false, 0);
  button_continue_win.upAction = function(){game.state.start('Mapa')};
  button_continue_win.onInputDown.add(button_sprite_down);
  button_continue_win.onInputUp.add(button_sprite_up);
}

function createItem(x, y , key, anchor, scale, fixed, visible, alpha){
  element = game.add.button(x, y, key, null, this);
  element.anchor.setTo(anchor);
  element.scale.setTo(scale);
  element.fixedToCamera = fixed;
  element.visible = visible;
  element.alpha = alpha;
  //console.log(key + " anchor " + anchor );
  return element;
}