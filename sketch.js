var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;
var obstacle, obstacleImage;
var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");

  obstacleImage = loadImage("images/obstacle1.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(500,300);
path.addImage(pathImg);
path.velocityX = -10;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("Running",mainRacerImg1);
mainCyclist.scale=0.1;
  
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",0,0,40,40);
  
gameOver = createSprite(150,300);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
obstacleG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/30);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,4));
  
  if (World.frameCount % 60 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else if (select_oppPlayer == 3) {
      spawnObstacles();
    }else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    if(obstacleG.isTouching(mainCyclist)){
      gameState = END;
      obstcale.velocityY = 0;
      obstcale.addImage(obstacleImage);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 200,300);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("Running",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    obstacleG.setVelocityXEach(0);
    obstacleG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }

}

}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 500)));
        player1.scale =0.1;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 500)));
        player2.scale =0.1;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 500)));
        player3.scale =0.1;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function spawnObstacles(){
    obstacle = createSprite(1100,Math.round(random(50, 500)));
    obstacle.scale = 0.1;
    obstacle.velocityX = -(6 + 2*distance/150);
    obstacle.addImage(obstacleImage);
    obstacle.setLifetime=170;
    obstacleG.add(obstacle);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("Running",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  obstacleG.destroyEach();

  distance = 0;
}
