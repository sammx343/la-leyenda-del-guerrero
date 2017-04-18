function tweenTint(obj, startColor, endColor, time) {    
  // create an object to tween with our step value at 0    }
    var colorBlend = {step: 0};    
  // create the tween on this object and tween its step property to 100    
    var colorTween = game.add.tween(colorBlend).to({step: 100}, time, Phaser.Easing.Linear.None, true, 2000, -1, true);        
  // run the interpolateColor function every time the tween updates, feeding it the    
  // updated value of our tween each time, and set the result as our tint    
    colorTween.onUpdateCallback(function() {      
    obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);       
    });        
  // set the object to the start color straight away    
     obj.tint = startColor;            
  // start the tween    
  colorTween.start();
}