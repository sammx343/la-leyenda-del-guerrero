var moneda;
function create_gold(enemy){
  console.log(enemy.x + "  "+ enemy.y);
  for (var i = 0; i < 20; i++){
    if(i%5==0){
        moneda = monedas.create(enemy.x+enemy.width/2, enemy.y+enemy.height/2, 'oro_5');
        moneda.scale.setTo(0.65);
        moneda.body.acceleration.x = rnd(-130,130);
    }else{
        moneda = monedas.create(enemy.x, enemy.y, 'oro_1');
        moneda.body.acceleration.x = rnd(-40,40);
    }
    //moneda.orientation = rnd(0,1)? (moneda.body.acceleration.x = rnd(-60,60) ) : (moneda.orientation = "left");
    moneda.body.velocity.y = rnd(-100,-400);
    moneda.body.gravity.y = gravity-300;
    moneda.body.bounce.y = 0.8 + Math.random() * 0.2;
  }
}

function getMonedas(player, moneda){
    //goldText.text = player.gold;
    // goldText.tint = 0xFFFF00;

    if(player.died == false && player.win == false){
      if(moneda.key == 'oro_5'){
          player.exp += 5;
      }else{
          player.exp += 1;
      }
      console.log("eche que monda cole");
      sabiduriaText.text = player.exp;
      // setTimeout(function(){    
      //   goldText.tint = 0xffffff;
      // },300)
      moneda.kill();
    }
}