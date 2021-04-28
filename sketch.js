var welcome,welImage;
var gameState=1;
var boy;
var boyImage;
var coin,coinImage;
var jungle,jungleImage;
var dra,draImage;
var dragon,dragonImage;
var treasurebox,treasureboxImage;
var treasureopen,treasureopenImage;
var stone,stoneImage;
var play,playImage;
var bg,bgImage;
var ground;
var trea,treaImage;
var bo,boImage;
var get,getImage;
var bomb,bombImage;
var bombGroup;
var boom,boomImage;
var gameOver,gameOverImage;
var coinGroup;
var score=0;
var restart,restartImage;

var win,winImage;
var treasureGroup;


function preload(){
  welImage=loadImage("welcome-removebg-preview (1).png");
  playImage=loadImage("play.png");
  bgImage=loadImage("jungle.jpg");
  boyImage=loadAnimation("boy1-removebg-preview (1).png","boy2-removebg-preview (1).png","boy3-removebg-preview (1).png","boy4-removebg-preview.png","boy5-removebg-preview.png","boy6-removebg-preview.png","boy7-removebg-preview.png","boy8-removebg-preview.png","boy9-removebg-preview.png","boy10-removebg-preview (1).png","boy11-removebg-preview (1).png","boy12-removebg-preview.png");
 dragonImage=loadImage("dragon11-removebg-preview.png");
  treaImage=loadImage("boxopen.png");
  boImage=loadImage("boyb.png");
  getImage=loadImage("get.png");
  bombImage=loadImage("bomb.png");
draImage=loadAnimation("dra1.png","dra2.png","dra3.png","dra4.png","dra5.png","dra6.png","dra7.png","dra8.png","dra9.png","dra10.png","dra11.png","dra12.png",)
  boomImage=loadImage("boom.png");
  gameOverImage=loadImage("gameover.png");
  coinImage=loadImage("coin.png");
  restartImage=loadImage("reset.png");
  treasureopenImage=loadImage("boxopen.png");

  winImage=loadImage("youwin.png");
  
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  welcome=createSprite(width/2,height/2-50);
  welcome.addImage(welImage);
  welcome.scale=2.1;
  welcome.visible=false;
  
  play=createSprite(width/2,height/2+180)
  play.addImage(playImage);
  play.scale=0.3;
  play.visible=false;
  
  bg=createSprite(width-400,height-400,400,400);
  bg.addImage(bgImage);
  bg.scale=2.3;
  bg.visible=false;
  bg.x=width/2;
  
  ground=createSprite(width-800,height-30,1800,20);
  ground.visible=false;
  ground.shapeColor="green";
  ground.x=ground.width/2;
  
  boy=createSprite(width-850,height-100,400,400);
  boy.addAnimation("running",boyImage);
  boy.visible=false;
  boy.scale=1.4;
  
 
  dragon=createSprite(width-200,height-550,10,10);
  dragon.addImage(dragonImage);
  dragon.visible=false;
  dragon.scale=0.6;
  
  trea=createSprite(width-150,height-150,10,10);
  trea.addImage(treaImage);
  trea.visible=false;
  trea.scale=0.5;
  
  bo=createSprite(100,height-170,10,10);
  bo.addImage(boImage);
  bo.visible=false;
  bo.scale=0.6;
  
  get=createSprite(280,height-750,10,10);
  get.addImage(getImage);
  get.visible=false;
  get.scale=0.7;
  
  dra=createSprite(width-350,height-600,10,10);
  dra.addAnimation("flying",draImage);
  dra.visible=false;
  dra.scale=1.4;
  
  bombGroup=new Group();
  
  boom=createSprite(550,300,400,400);
  boom.addImage(boomImage);
  boom.visible=false;
  boom.scale=0.6;
  
  gameOver=createSprite(width-650,height-300,400,400);
  gameOver.addImage(gameOverImage);
  gameOver.visible=false;
  gameOver.scale=4.2;
  
  coinGroup=new Group();
  
  
   restart=createSprite(width/2,height/2+250,10,10)
 restart.addImage(restartImage);
  restart.scale=0.3;
 restart.visible=false;
  
 
   win=createSprite(width/2,height/2,10,10)
 win.addImage(winImage);
  win.scale=2.0;
 win.visible=false;
  
  treasureGroup=new Group();
  

}

function draw() {
  background("yellow");
  
   
  
  if(gameState===1){
    
  
    welcome.visible=true;
    play.visible=true;
    dragon.visible=true;
    trea.visible=true;
    bo.visible=true;
    get.visible=true;
    
   if(touches.length > 0|| mousePressedOver(play)){
     touches=[]
     gameState=2;
   }
    
    
    
  }
  if(gameState===2){

    bg.visible=true;
    ground.visible=true;
    boy.visible=true;
    bo.visible=false;
    trea.visible=false;
    dragon.visible=false;
    get.visible=false;
    dra.visible=true;
  
    bg.velocityX=-6;
    
     
   
    
    if(boy.isTouching(coinGroup)){
      coinGroup.destroyEach()
      score=score+4;
    }
    
    if(keyDown("up_arrow")){
      boy.velocityY=-25;
    }
    
     
    if((touches.length > 0 || keyDown("SPACE")) && boy.y >= height-80) {
     
      boy.velocityY = -25;
       touches = [];
    }
       boy.velocityY+=0.8;
    boy.collide(ground);
    
    if(ground.x<width-200){
      ground.x=ground.width/2;
      
    }
    ground.velocityX=-4;

    if(bg.x<width-920){
      bg.x=bg.width/2;
      
    }
    
    spawnObstacles()
    spawnCoins()
    
    
    if(boy.isTouching(bombGroup)){
      gameState=3;
      ground.velocityX=0;
       }
    
    if(boy.isTouching(treasureGroup)){
      treasurebox.addImage(treasureopen);
    gameState=5;
      
    }
  }
  
  
  if(gameState===3){
    boom.visible=true;
    dra.visible=false;
    boy.visible=false;
    welcome.visible=false;
    ground.visible=false;
    play.visible=false;
    bg.visible=false;
    gameState=4;
    
    
  }
  
  if(gameState===4){
    boom.visible=false;
    gameOver.visible=true;
    bombGroup.destroyEach()
    coinGroup.destroyEach()
    restart.visible=true;
    
     if(touches.length > 0|| mousePressedOver(restart)){
     gameState=1;
     touches=[]
       gameOver.visible=false;
       restart.visible=false;
       score=0;
   }
  }
  
  if(gameState===5){
     
      win.visible=true;
    restart.visible=true;
  }
  
  drawSprites();
  
    textSize(50);
  fill("red");
       text("Score:"+score,50,height-600);
 
}

function spawnObstacles(){
  if(frameCount%300===0){
     bomb=createSprite(width-50,height-100,10,10);
  bomb.addImage(bombImage);
 bomb.velocityX=-3;
  bomb.scale=0.3;
    bombGroup.add(bomb)
     
  }
}


function spawnCoins(){
  if(frameCount%100===0){
    coin=createSprite(width/2+300,height/2,10,10);
  coin.addImage(coinImage);
 coin.velocityX=-3;
    coin.scale=0.2;
    coinGroup.add(coin)
  }
} 
    
  function spawnTreasure(){
    
   
  
    if(frameCount%1500===0){
      
    
    
     treasurebox=createSprite(width-850,height-100,10,10);
  treasurebox.addImage(treasureboxImage);
  treasurebox.visible=true;
  treasurebox.scale=0.3;
      treasureGroup.add(treasurebox);
  }
  }

