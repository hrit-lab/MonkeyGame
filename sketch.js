var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime;

var Ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(70, 370, 50,50);
  monkey.addAnimation("running",monkey_running);
monkey.scale = 0.15;


  Ground = createSprite(250, 405, 1000, 10);
  Ground.x = Ground.width/2;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  survivalTime = 0;

}


function draw() {
background("white");
  
   // survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 70,50);

  
  if(gameState === PLAY){
      monkey.collide(Ground);  
  monkey.collide(obstacleGroup);
    
  if(Ground.x<0){
    Ground.x = Ground.width/2;
  }
    
    Ground.velocityX = -(4 + 3* survivalTime/100)
    
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
     if(keyDown("space")&&monkey.y>=100){
    monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY+10;   

    
    SpawnFood();
    
    SpawnObstacle();
  } 
  
if(monkey.isTouching(obstacleGroup)){
  gameState = END;
}  
  else if(gameState === END){
    monkey.velocityY = 0;
    Ground.velocityX = 0;
    
    score = 0;
    
    obstacleGroup.setVlocityXEach = 0;
FoodGroup.setVelocityXEach = 0;
  }

  drawSprites();
}

function SpawnFood() {
  if(frameCount%80 === 0){
    banana = createSprite(500, 0, 10, 20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
    banana.velocityX = -(5+2*survivalTime/100)
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: banana.y = 200;
      break;
      case 2: banana.y = 220;
      break;
      default:break;
    }
      FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    }
       if(monkey.isTouching(FoodGroup)){
FoodGroup.destroyEach();
    }
  }

function SpawnObstacle(){
  if(frameCount%300 === 0){
      obstacle = createSprite(500, 380, 10, 20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
    obstacle.velocityX = -(3+2*survivalTime/100);
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
  }

}


