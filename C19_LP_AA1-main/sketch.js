var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImgJumping, ghostImgJumpingRight, ghostImgStanding, ghostImgStandingRight;
var invisibleBlock, invisibleBlock2, invisibleBlock3, invisibleBlock4;
var gameOver, gameOverImg;
var gameState = "play";

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImgStanding=loadImage("ghost-standing.png");
  ghostImgStandingRight=loadImage("ghost-standingRight.png");
  ghostImgJumping=loadImage("ghost-jumping.png");
  ghostImgJumpingRight=loadImage("ghost-jumpingRight.png");
  doorsGroup=createGroup();
  climbersGroup=createGroup();
  gameOverImg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(600,600);

  tower = createSprite(300, 300);
  tower.addImage("towerImg", towerImg);
  ghost = createSprite(250, 250);
  ghost.scale = 0.4;
  ghost.addImage("ghostImgJumping", ghostImgJumping);
  ghost.addImage("ghostImgStanding", ghostImgStanding);
  ghost.addImage("ghostImgStandingRight", ghostImgStandingRight);
  ghost.addImage("ghostImgJumpRight", ghostImgJumpingRight);
  invisibleBlock = createSprite(540, 300, 5, 600);
  invisibleBlock.visible = false;
  invisibleBlock2 = createSprite(60, 300, 5, 600);
  invisibleBlock2.visible = false;
  invisibleBlock3 = createSprite(300, 600, 600, 5);
  invisibleBlock3.visible = false;
  invisibleBlock4 = createSprite(300, -29, 600, 5);
  invisibleBlock4.visible = false;
  gameOver = createSprite(300,300);
  gameOver.addImage("gameOverImg", gameOverImg);
  gameOver.visible = false;
  gameOver.depth = ghost.depth
  gameOver.depth += 2
}

function draw() {
  background("white");
  drawSprites();


  if(gameState === "play"){
    ghost.bounceOff(invisibleBlock);
    ghost.bounceOff(invisibleBlock2);
    ghost.bounceOff(invisibleBlock3);
    ghost.bounceOff(invisibleBlock4);
    movementGhost();
    movementTower();
    doors();
    cambioEstado();
  }
  if(gameState === "death"){
    gameOver.changeImage("gameOverImg", gameOverImg);
    gameOver.visible = true
  }
}

function movementGhost(){
  if (keyDown("W")){
    ghost.y+=-5;
    ghost.changeImage("ghostImgJumping", ghostImgJumping);
  }

  if(keyWentUp("W")){
    ghost.changeImage("ghostImgStanding", ghostImgStanding)
  }

  if (keyDown("S")){
    ghost.y+=5;
  }

  if (keyWentUp("S")){
    ghost.changeImage("ghostImgStanding", ghostImgStanding);
  }

  if (keyDown("A")) {
    ghost.x+=-5;
    ghost.changeImage("ghostImgStanding", ghostImgStanding);
  }

  if (keyDown("D")) {
    ghost.x+=5;
    ghost.changeImage("ghostImgStandingRight", ghostImgStandingRight);
  }

  if(keyWentUp("D")){
    ghost.changeImage("ghostImgStandingRight", ghostImgStandingRight);
  }

  if(keyDown("A") && keyDown("D")){
    ghost.changeImage("ghostImgStanding", ghostImgStanding);
  }

  if(keyDown("W") && keyDown("A")){
    ghost.changeImage("ghostImgJumping", ghostImgJumping);
  }

  if(keyDown("W") && keyDown("D")){
    ghost.changeImage("ghostImgJumpRight", ghostImgJumpingRight);
  }
}

function movementTower(){
  tower.y-=3
  if(tower.y < 0){
    tower.y=tower.height / 2
  }
}

function doors(){
  if(frameCount % 150 === 0){
  door = createSprite(Math.round(random(150, 500)), -73);
  doorsGroup.add(door);
  climber = createSprite(door.x, 0);
  climbersGroup.add(climber)
  door.depth = ghost.depth;
  ghost.depth += 1;
  climber.depth = door.depth;
  door.addImage("doorImg", doorImg);
  climber.addImage("climberImg", climberImg)
  door.velocityY+=3
  climber.velocityY+=3
  door.lifetime = 225
  climber.lifetime = 225
  }
}

function cambioEstado(){
  if(ghost.isTouching(climbersGroup || doorsGroup)){
    gameState = "death"
    doorsGroup.setVelocityYEach(0);
    climbersGroup.setVelocityYEach(0);
  } 
}