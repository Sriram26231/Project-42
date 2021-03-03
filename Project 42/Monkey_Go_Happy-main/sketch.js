var backImage,backgr;
var monkey, monkey_running;
var ground,ground_img;
var score;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
 

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  score = 0;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);

  }

  if(FoodGroup.isTouching(monkey)){
        
        
    FoodGroup.destroyEach(0);
    score= score + 2; 
    monkey.scale = monkey.scale+0.02
}

if(obstaclesGroup.isTouching(monkey) && monkey.scale >= 0.1){
      
  monkey.scale=0.05;
  obstaclesGroup.destroyEach(0);


}
if(obstaclesGroup.isTouching(monkey) && monkey.scale < 0.1 ){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
   backgr.velocityX=-0;
  stroke("white");
  textSize(20);
  fill("white");
  text("Game Over ", 200,50);
}

  drawSprites();
  spawnObstacles();
  spawnFood();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50); 
}






function spawnObstacles(){

  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -5;
    
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
     
    obstacle.lifetime = 300;
    
    
    obstaclesGroup.add(obstacle);
  }

}



function spawnFood(){

  if (frameCount % 145 === 0) {
    banana = createSprite(800,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    

     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    
    FoodGroup.add(banana);
  }

}