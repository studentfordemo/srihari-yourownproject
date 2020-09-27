var playerName;
var gameState = "START"
var input;
var start,startimage,rocket1,rocket1image,rocket2,rocket2image;
var player,startrocket,launchimage;
var a;
var meteorsGroup,meteorsGroup2;
var bgr;
var score = 0;
var bullet ;
var meteorimage;
var powerGroup;
var b;

function preload(){
  startimage = loadImage("dark green start button.jpg")
  rocket1image = loadImage("rocket1.png")
  rocket2image = loadImage("rocket3.png")
  launchimage = loadImage("green-start-button.jpg")
  bgrimage = loadImage("bacground 2.jpg")
  meteorimage = loadImage("meteor.png")
  bgrimage2 = loadImage("bacground 1.jpg")
  asteroidimage = loadImage("asteroid2.png")
  alienimage = loadImage("alien.png")
}

function setup() {
  createCanvas(displayWidth-20,displayHeight - 120);
  bgr = createSprite(displayWidth/2,displayHeight/2,2,1)
  start = createSprite(displayWidth/2, displayHeight/2 + 60, 1, 1);
  rocket1 = createSprite(200,400, 1, 1);
  rocket2 = createSprite(500,400, 1, 1);
  startrocket = createSprite(800,200,1,1);
   startrocket.scale = 0.4
  player = createSprite(300,400,1,1);

  powerGroup = new Group();
  meteorsGroup = new Group();
  meteorsGroup2 = new Group();
  asteroidsGroup = new Group();
  alienGroup = new Group();
  

  input = createInput();
}

function draw() {
  background(100,55,255);  
  image(bgrimage,0,-displayHeight * 4,displayWidth,displayHeight * 5)
  if(gameState === "START"){
    input.position(displayWidth/2 - 20,displayHeight/2 - 20);
    playerName = input.value()
    text("Hello"+playerName,displayWidth/2 + 10,displayHeight/2 + 20);
    start.addImage(startimage);
    start.scale = 0.2;
    if(mousePressedOver(start)){
      gameState = "screen1"
    }
    drawSprites();
    

  }
if(gameState === "screen1"){
  image(bgrimage,0,-displayHeight * 4,displayWidth,displayHeight * 5)
  background(155,50,25)
  start.destroy();
  rocket1.addImage(rocket1image)
  rocket1.scale = 0.3
  rocket2.addImage(rocket2image)
  rocket2.scale = 0.3
  input.hide();
  startrocket.addImage(launchimage)
  startrocket.scale = 0.3
  startrocket.visible = false;
  textSize(20)
  text("Some rockets go faster than the speed of sound (Mach 1)",640,100)
  text("and may reach speeds of up to 30'000 km/hr (Mach 25) when in orbit",640,120)
  text("Most rockets still use solid fuel to make the fire. The biggest ones use liquid fuel",640,180);
  text("because it makes a hotter fire so the rocket is more powerful.",640,200);
  text("However, handling the liquid fuel safely is difficult and expensive.",640,220)

    
    if(mousePressedOver(rocket1)){
    gameState = "bhaskara1"
    player.addImage("player",rocket1image)
    bgr.addImage("bgr1",bgrimage)
    bgr.visible=false
  }
  if(mousePressedOver(rocket2)){
    gameState = "bhaskara1"
    player.addImage("player2",rocket2image)
    bgr.addImage("bgr1",bgrimage2)
    bgr.visible=false
  }
  drawSprites();  
}
if(gameState === "bhaskara1"){
  //image(bgrimage,0,-displayHeight * 4,displayWidth,displayHeight * 5)
  background(120,20,75)
 // player.debug = true;
  player.setCollider("rectangle",0,0,200,450)
  rocket1.destroy();
  rocket2.destroy();
  input.hide();
  startrocket.visible = true
 
  player.scale = 0.3;
  
  if(mousePressedOver(startrocket)){
    //bgr.addImage(bgrimage)
   bgr.visible=true
    bgr.scale = 4;
    a = 1
    startrocket.destroy();
    
  }
  
if(a == 1){
  bgr.velocityY = 4;
  if(bgr.y>displayHeight){
  bgr.y = 200;
  }
  
  if(keyDown(LEFT_ARROW)){
    player.velocityX = -5;
    player.velocityY = 0;
  }

  if(keyDown(RIGHT_ARROW)){
    player.velocityX = 5;
    player.velocityY = 0;
  }

  if(keyWentUp(RIGHT_ARROW)||keyWentUp(LEFT_ARROW)){
  player.velocityX = 0;
  player.velocityY = 0;  
  }
}
    if(frameCount % 60 === 0 && a === 1)  {
      var meteors = createSprite(250,0,50,36)
      meteors.addImage(meteorimage)
      //meteors.debug = true
      meteors.scale = 0.1
      meteors.x = random(0,400);
      meteors.setCollider("circle",0,0,200)
      meteors.velocityY = 3
      meteorsGroup.add(meteors);
      if(player.isTouching(meteorsGroup)){
       player.destroy();
      b = 1;
      }
     
    }
    if(frameCount % 100 === 0 && score>=4)  {
      var asteroids = createSprite(250,0,50,36)
      asteroids.addImage(asteroidimage)
      //asteroids.debug = true
      asteroids.scale = 0.2
      asteroids.x = random(0,400);
      asteroids.setCollider("circle",0,0,200)
      asteroids.velocityY = 5
      asteroidsGroup.add(asteroids);
      if(player.isTouching(asteroidsGroup)){
       player.destroy();
      b = 2;
      }
  
    }


    if(frameCount % 100 === 0 && score >= 6)  {
      var alien = createSprite(250,0,50,36)
      alien.addImage(alienimage)
     // alien.debug = true
      alien.scale = 0.1;
      alien.x = random(0,400);
      alien.setCollider("circle",0,0,600)
      alien.velocityY = 5
      alienGroup.add(alien);
      if(player.isTouching(alienGroup)){
       player.destroy();
      b = 3;
      }
    
    }
    if(frameCount % 40 === 0 && a === 1)  {
      var power = createSprite(250,0,50,36)
      power.x = random(0,400);
      power.velocityY = 3
      powerGroup.add(power)
      if(player.isTouching(powerGroup)){
        bgr.velocityY = bgr.velocityY + 9;
        //console.log(bgr.velocityY)
       score = score + 2
      }
    
     
    }

 //console.log(score) 
 drawSprites();
 fill("white")
 text("Score"+ score,700,400)
 if(b === 1||b===2||b===3){
  text("Rocket has been destroyed , please relaunch it",400,500)
  bgr.velocityY = 0;
}


}

/*if(gameState === "bhaskara2"){
  background(100,250,35)
  player.debug = true;
  player.setCollider("rectangle",0,0,200,450)
  rocket1.destroy();
  rocket2.destroy();
  input.hide();
  startrocket.visible = true
  player.addImage("player2",rocket2image)
  player.scale = 0.4;
  textSize(20)
  text("This is bhaskara 2",900,600)
  if(mousePressedOver(startrocket)){
    bgr.addImage(bgrimage2)
    fill("white")
    text("Score"+ score,700,400)
    bgr.scale = 4;
    a = 1
    startrocket.destroy();
    
  }
  //console.log(a);
if(a === 1){
  bgr.velocityY = 3;
  if(bgr.y>displayHeight){
  bgr.y = 400;
  }
  
  if(keyDown(LEFT_ARROW)){
    player.velocityX = -5;
    player.velocityY = 0;
  }

  if(keyDown(RIGHT_ARROW)){
    player.velocityX = 5;
    player.velocityY = 0;
  }

  if(keyWentUp(RIGHT_ARROW)||keyWentUp(LEFT_ARROW)){
  player.velocityX = 0;
  player.velocityY = 0;  
  }
}
    if(frameCount % 100 === 0 && a === 1)  {
      var meteors = createSprite(250,0,50,36)
      meteors.addImage(meteorimage)
      meteors.debug = true
      meteors.scale = 0.2
      meteors.x = random(0,400);
      meteors.setCollider("circle",0,0,200)
      meteors.velocityY = 3
      meteorsGroup2.add(meteors);
      if(player.isTouching(meteorsGroup2)){
        console.log("hey")
  b=1
      }

     if(b === 1){
       text("Rocket has been destroyed , please relaunch it",400,500)
       console.log("hi")
     }
    }

    if(frameCount % 100 === 0 && score>= 4)  {
      var asteroids = createSprite(250,0,50,36)
      asteroids.addImage(asteroidimage)
      asteroids.debug = true
      asteroids.scale = 0.05
      asteroids.x = random(0,400);
      asteroids.setCollider("circle",0,0,40)
      asteroids.velocityY = 5
      asteroidsGroup.add(asteroids);
      if(player.isTouching(asteroidsGroup)){
       player.destroy();
      b = 2;
      }
     if(b === 2){
       text("Rocket has been destroyed , please relaunch it",400,500)
     }
    }

    if(frameCount % 100 === 0 && score>=6)  {
      var alien = createSprite(250,0,50,36)
      alien.addImage(alienimage)
      alien.debug = true
      alien.scale = 0.05
      alien.x = random(0,400);
      alien.setCollider("circle",0,0,40)
      alien.velocityY = 5
      alienGroup.add(alien);
      if(player.isTouching(alienGroup)){
       player.destroy();
      b = 3;
      }
     if(b === 3){
       text("Rocket has been destroyed , please relaunch it",400,500)
     }
    }
    if(frameCount % 140 === 0 && a === 1)  {
      var power = createSprite(250,0,50,36)
      power.x = random(0,400);
      power.velocityY = 3
      powerGroup.add(power);
      if(player.isTouching(powerGroup)){
        bgr.velocityY = bgr.velocityY + 99;
        //console.log(bgr.velocityY)
       score = score + 2
      }
    
     
    }
    
 //console.log(score) 
 drawSprites(); 
 fill("white")
 text("Score"+ score,700,400) 
}*/


  
}