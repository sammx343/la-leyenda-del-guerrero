function button_sprite_down(myButton){
  myButton.frame = 1;
}

function button_sprite_up(myButton){
  myButton.frame = 0; 
  console.log(" agregar parametro upAction como función ");
  myButton.upAction();
}