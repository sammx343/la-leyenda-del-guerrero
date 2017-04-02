function button_hover(button){
  var x1 = button.x - button.width/2;
  var x2 = button.x + button.width/2;
  var y1 = button.y - button.height/2;
  var y2 = button.y + button.height/2;

  var m_x = game.input.mousePointer.x;
  var m_y = game.input.mousePointer.y;

  var hover = m_x > x1 && m_x < x2 && m_y > y1 && m_y < y2;

  if(hover){
    this.game.canvas.style.cursor = "url('assets/la_leyenda/menu/identificador.png'), pointer";
  }else{
    this.game.canvas.style.cursor = "url('assets/la_leyenda/menu/identificador.png'), default";
  }
}