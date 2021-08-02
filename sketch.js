var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,500,20,20)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.5

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
  background(200);
  if(gameState == "play"){

  
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3
  }
  if(keyDown("space")){
    ghost.velocityY = -5
  }
  ghost.velocityY = ghost.velocityY + 1 
spawnObjects()
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    gameState = "end"
    ghost.destroy()
  }
  }
  if(gameState == "end" ){
    textSize(25)
    fill ("red")
    text("Game Over", 300,300)
    doorsGroup.setVelocityEach(0)
    climbersGroup.setVelocityEach(0)
    invisibleBlock.setVelocityEach(0)
  }


    drawSprites()
}

function spawnObjects(){
  
  if(frameCount % 200 === 0){
  door = createSprite(300,10,20,20)
  door.addImage(doorImg)
  door.velocityY = 2
  door.x = Math.round(random(100,500))
  door.lifetime = 250
  doorsGroup.add(door)

  climber = createSprite(300,50,20,20)
  climber.addImage(climberImg)
  climber.velocityY = 2
  climber.x =door.x
  climber.lifetime = 250
  climbersGroup.add(climber)

  invisibleBlock = createSprite(300,70,20,20)
  invisibleBlock.velocityY = 2
  invisibleBlock.x = door.x
  invisibleBlock.width = climber.width
  invisibleBlock.height = 10
  invisibleBlock.debug = true
  invisibleBlock.lifetime = 250
  invisibleBlockGroup.add(invisibleBlock)
  
    door.depth = ghost.depth
    ghost.depth  +=1

  }



}