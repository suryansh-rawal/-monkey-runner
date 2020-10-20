var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey1,monkey;
var path1,path,path2,path3,path4;
var back,back1,background1;
var gr,grImg,grGroup;
var banana,bananaImg,bananaGroup
var score =0;
var scorelogoImg,scorelogo;
var obstacleImg,obstacle,obstacleGroup;
var prisionImg,prision,prisionGroup;

function preload(){
  monkey1 =             loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  back=loadImage("jungle1.jpg");
  background1=loadImage("jungle2.png");
  path =loadImage("path.png");
  grImg=loadImage("middle_gr.png");
  bananaImg=loadImage("banana.png");
  scorelogoImg=loadImage("banana_coin.png");
  obstacleImg=loadImage("obstacle.png");
  prisionImg=loadImage("jail.jpg");
  
}
function setup() {
  createCanvas(windowWidth, windowHeight);
 
  
  
  
  

  
  
  back2= createSprite(windowWidth+670/2 ,windowHeight/2);
  back2.scale=2
  back2.addImage(back);
  
   back1  =createSprite(windowWidth/2,windowHeight/2);
  back1.addImage(back);
  back1.scale=2;
  
  
  
  path1=createSprite(windowWidth/2,windowHeight/2);
  path1.addImage(path);
 
  path1.setCollider("rectangle",0,320);
  
   path2=createSprite(windowWidth+670/2,windowHeight/2);
  path2.addImage(path);
 
  path2.setCollider("rectangle",0,320);
  
   path3=createSprite(windowWidth+670/2+windowWidth,windowHeight/2);
  path3.addImage(path);
  
  path3.setCollider("rectangle",0,320);
  
   path4=createSprite(3*(windowWidth)+670/2,windowHeight/2);
  path4.addImage(path);
  
  path4.setCollider("rectangle",0,320);
  
  monkey=createSprite(windowWidth-560,windowHeight/2);
  monkey.addAnimation("monkey",monkey1);
  monkey.scale=0.14;
  
  
  scorelogo=createSprite(520,23);
  scorelogo.addImage(scorelogoImg);
  scorelogo.scale=0.1;
  
  
  grGroup=createGroup();
  bananaGroup=createGroup();
  obstaclesGroup=createGroup();
  prisionGroup=createGroup();
  
  
  
  back1.velocityX=-10;
  back2.velocityX=-10;

  path1.velocityX=-10;
   path2.velocityX=-10;
   path3.velocityX=-10;
  path4.velocityX=-10;
  
  
  
  
}

function draw() {
  background(220);
  
  if(gameState===PLAY){
    
    back1.velocityX=-10;
  back2.velocityX=-10;

  path1.velocityX=-10;
   path2.velocityX=-10;
   path3.velocityX=-10;
  path4.velocityX=-10;
  
  monkey.collide(path1);
  monkey.collide(path2);
  monkey.collide(path3);
  monkey.collide(path4);
  
  
  if(back1.x<=-(windowWidth/2))
    {
    back1.x=windowWidth/2+windowWidth;
      path1.x=windowWidth/2+windowWidth;
    }
    
     if(back2.x<=-(windowWidth/2))
        {
    back2.x=windowWidth/2+windowWidth;
          path2.x=windowWidth/2+windowWidth;
          path3.x=windowWidth+670/2+windowWidth;
          path4.x=3*(windowWidth)+670/2;
          
        }
  
  if(keyDown("space")&&monkey.y>=0)
  {
    monkey.velocityY=-10;  
  }
  spawnpath();
    spawnBanana();
    spawnObstacles();
  
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score=score+1; 
    }
    
  monkey.collide(grGroup);
  
  monkey.velocityY=monkey.velocityY+1 ;
    
    if(obstaclesGroup.isTouching(monkey)||monkey.y>windowHeight){
      back1.velocityX=0;
      back2.velocityX=0;
      bananaGroup.setVelocityXEach(0);
      grGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
      path1.velocityX=0;
      path2.velocityX=0;
      path3.velocityX=0;
      path4.velocityX=0;
      obstaclesGroup.setLifetimeEach(-1);
      gameState=END;
    }
  }
  else if(gameState===END){
   
    
    monkey.collide(path1);
  monkey.collide(path2);
  monkey.collide(path3);
  monkey.collide(path4);
    grGroup.destroyEach();
    bananaGroup.destroyEach();
    restart(); 
    
  }
  
  
  drawSprites();
  stroke("green");
  textSize(20);
  text(" : "+score,540,30);
}
function spawnpath(){
  if(frameCount%100===0){
  gr = createSprite(windowWidth,windowHeight/2);
    gr.y=Math.round(random(100,300));
  gr.addImage(grImg);
  gr.debug=true;
  gr.setCollider("rectangle",0,6,275,40);
  gr.velocityX=-10;
    grGroup.add(gr);
    gr.lifetime =windowWidth/10;
    
  }
}
function spawnBanana(){
  if(frameCount%100===0){
    banana=createSprite(windowWidth,windowHeight/2);
     banana.scale=0.1;
    banana.y =Math.round(random(100,300));
    banana.addImage(bananaImg);
    banana.velocityX=-10;
    bananaGroup.add(banana);
    banana.lifetime=windowWidth/10;
  }
}
function spawnObstacles(){
  if(frameCount%100===0){
  obstacle=createSprite(windowWidth,windowHeight/2+80);
  obstacle.addImage(obstacleImg);
    obstacle.scale=0.2;
  obstacle.velocityX=-10;
  obstacle.lifetime=windowWidth/10;
    obstaclesGroup.add(obstacle);
  }
}
function restart(){
  prision=createSprite(windowWidth/2,windowHeight/2);
  prision.addImage(prisionImg);

  prisionGroup.add(prision);
  
  
  
  
  if(keyDown("r")){
    prisionGroup.destroyEach();
    gameState=PLAY;
    obstaclesGroup.destroyEach();
    score=0;
  }
  
}
