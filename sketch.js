var trex, trex_running, trex_collided, cloudImage;
var ground, invisibleGround, groundImage, obstacle1, obstacle2,obstacle3,obstacle4,obstacle5,obstacle6, Score;

var CloudGroup;
var ObstacleGroup;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  CloudGroup = new Group();
  ObstacleGroup = new Group();
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(150);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  Score = Math.round(frameCount/4);
  textSize(15);
  text("Score : " + Score, 510, 20);
  
  spawnClouds();
  spawnObstacles();
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,20,40,10);
    cloud.y = random(10,100);
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 210;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    var rand = Math.round(random(1,6));
    
    switch(rand){
        case 1: obstacle.addImage(obstacle1);
        break;
        case 2 : obstacle.addImage(obstacle2);
        break;
        case 3 : obstacle.addImage(obstacle3);
        break;
        case 4 : obstacle.addImage(obstacle4);
        break;
        case 5 : obstacle.addImage(obstacle5);
        break;
        case 6 : obstacle.addImage(obstacle6);
        break;
        
    }
             
    obstacle.scale = 0.5;
    obstacle.lifetime = 110;
    ObstacleGroup.add(obstacle);
  }
}