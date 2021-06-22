 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;
 var rex;
 var piso;
 var pisoinvisible;
 var clou;
 var cactus;
 var clousGroup;
 var cactusGroup;
 var gameOver;
 var restart;

 function preload(){
   
  rex_running= loadAnimation("trex1.png", "trex3.png", "trex4.png");
   
  piso_Imagen = loadImage("ground2.png");
   
  clou_Imagen = loadImage("cloud.png");
   
  cactus1_Image = loadImage("obstacle1.png");
  cactus2_Image = loadImage("obstacle2.png");
  cactus3_Image = loadImage("obstacle3.png");
  cactus4_Image = loadImage("obstacle4.png");
  cactus5_Image = loadImage("obstacle5.png");
  cactus6_Image = loadImage("obstacle6.png");
   
  rex_Triste= loadAnimation("trex_collided.png");
   
  game_Over = loadImage("gameOver.png");
  restart1 = loadImage("restart.png");
   
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  points = loadSound("checkPoint.mp3");
  
 }
 function setup() {
  
 createCanvas (600,200);
  
  rex= createSprite (50,160,20,50);
  piso= createSprite (200,180,400,10);
  pisoinvisible= createSprite (200,190,300,10);
  pisoinvisible.visible= false;
  rex.addAnimation ("running", rex_running); 
  rex.addAnimation ("Triste", rex_Triste);
  piso.addImage ("ground" , piso_Imagen);
  
  piso.x = piso.width/2;
  
  rex.scale=0.5;
  
  edges = createEdgeSprites();
   
 var asar = Math.round (random(1,100));
   
  console.log(asar);
   
 console.log("h"+"o"+"la"+"r"+"e"+"x"+"xd");
   
 score = 0;
  
 cactusGroup = new Group();
 clousGroup  = new Group();
 
 //Deben chocar con los obstaculos;
 // rex.debug = true;
  rex.setCollider("circle",0,0,50);
   
  gameOver = createSprite(300,50,10,10);
   gameOver.addImage(game_Over);
  restart = createSprite(300,140,10,10);
   restart.addImage(restart1);
   
 }
 function draw() {
  
 background ("white");
  
  drawSprites (); 

  console.log(rex.y);

  rex.collide([ pisoinvisible]);
   
  console.log(frameCount);
   
  text("Score: "+ score,100,50);
  score = score + Math.round(getFrameRate()/60);
   
  if(gameState === PLAY){
    
   piso.velocityX = -2; 
    
   score = score + Math.round(frameCount/60);
    
  if (keyDown("space")&& rex.y>=150){
    jump.play();
    
  rex.velocityY = -7;}
    
  if(piso.x<0){
    
  piso.x = piso.width/2;}
    
  rex.velocityY = rex.velocityY + 0.5;
    
    spawnClouds();
    spawnCactus();
  
  if(cactusGroup.isTouching(rex)){
    die.play();
    gameState = END;
    
  }
    
  gameOver.visible = false;
  restart.visible = false;
    
 if(score>0 && score % 1000 === 0){
   points.play();
   }
    
  }
  else if(gameState === END){
    
    piso.velocityX = 0;
    rex.velocityY = 0;
    
    cactusGroup.setVelocityXEach(0);
    clousGroup.setVelocityXEach(0);
    
    cactusGroup.setLifetimeEach(-1);
    clousGroup.setLifetimeEach(-1);
    
    rex.changeAnimation("Triste", rex_Triste);
    
    gameOver.visible = true;
    restart.visible = true;
    
   if(mousePressedOver(restart)){
     
     console.log("Maravilloso");
     reiniciar();
     
     
 }
 }
 }

 function reiniciar(){ 
   
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
   
  cactusGroup.destroyEach();
  clousGroup.destroyEach();
  rex.changeAnimation("running", rex_running);
  score = 0;
 }


 function spawnClouds(){
   
 if(frameCount % 180 === 0){


  clou = createSprite(600,50,40,10);
  clou.velocityX = -2;
  clou.addImage (clou_Imagen);
  clou.lifetime = 320;
  clou.depth = rex.depth;
  rex.depth = rex.depth + 1;
   
  clousGroup.add(clou);
  
 }
 }
 function spawnCactus(){
   
   if(frameCount % 110 === 0){
   
   cactus =createSprite(660,165,10,40);
   cactus.velocityX = -2;
  
   var azar = Math.round(random(1, 6));
   
   switch(azar){
       
     case 1 : cactus.addImage(cactus1_Image);
     break;
     case 2 : cactus.addImage(cactus2_Image);
     break;
     case 3 : cactus.addImage(cactus3_Image);
     break;
     case 4 : cactus.addImage(cactus4_Image);
     break;
     case 5 : cactus.addImage(cactus5_Image);
     break;
     case 6 : cactus.addImage(cactus6_Image);
     break;
     default:break;
     
 
 }
     
  cactus.scale = 0.5;
  cactus.lifetime = 330;
     
  cactusGroup.add(cactus);
     
     
     
     

 }
 }