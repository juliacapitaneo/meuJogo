var bg, bgImgDay, bgImgAfternoon, bgImgNight;
var bottomGround;
var topGround;
var balloon, balloonImg;
var backgroungImg;
//criar variável para carregar som
var theSound;
//criar variáveis de obstáculo
var obstacleTop, obsTop1, obsTop2;
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3;

var gameState = 0;
var start = 0;
var play = 1;
var end = 2;

function preload() {
  bgImgDay = loadImage("assets/dia.jpeg");
  bgImgAfternoon = loadImage("assets/tarde.jpeg");
  bgImgNight = loadImage("assets/noite.jpeg");

  balloonImg = loadAnimation(
    "assets/balloon1.png",
    "assets/balloon2.png",
    "assets/balloon3.png"
  );

  backgroungImg = loadImage("assets/essa.png");
  //carregar som utilizando "loadSound"
  theSound = loadSound("assets/EarthQuake (1).wav");

  //carregar imagens de obstáculos
  obsTop1 = loadImage("assets/obsTop1.png");
  obsTop2 = loadImage("assets/obsTop2.png");

  obsBottom1 = loadImage("assets/obsBottom1.png");
  obsBottom2 = loadImage("assets/obsBottom2.png");
  obsBottom3 = loadImage("assets/obsBottom3.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //imagem de fundo
  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage(bgImgDay);
  bg.scale = 1.3;

  //criar o solo superior e inferior
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //criar o balão
  balloon = createSprite(180, 200, 80, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.4;

  getBackgroundImg();
}

function draw() {
  background(backgroungImg);

  if (gameState === 0) {
    fill("white");
    textSize(30);
    text(
      "Pressione a tecla ENTER para inciar sua aventura!",
      width / 2 - 350,
      height / 2
    );

    textSize(20);
    text(
      "Para que seu balão não caia aperte espaço, não se esqueça.",
      width / 2 - 300,
      height / 2 + 50
    );

    //colocar o nome da váriavel(do som) .play()
    theSound.play();
    //mudando o estado do jogo para play
    if (keyDown("Enter")) {
      gameState = 1;
      //dar sound.stop() na música
      theSound.stop();
    }
  }

  //comportamento do estado play
  if (gameState === 1) {
    //faça o balão de ar quente pular
    if (keyDown("space")) {
      balloon.velocityY = -7;
    }

    //adicione gravidade
    balloon.velocityY = balloon.velocityY + 0.5;

    drawSprites();
  }

  if (gameState === 2) {
    //sweet alert
  }

  Bar();
  //gerar obstáculos superiores
  spawnObstaclesTop();
}

function spawnObstaclesTop() {
  if (World.frameCount % 60 === 0) {
    obstacleTop = createSprite(400, 50, 40, 50);

    //obstacleTop.addImage(obsTop1);

    obstacleTop.scale = 0.3;
    obstacleTop.velocityX = -4;

    //posições y aleatórias para os principais obstáculos
    obstacleTop.y = Math.round(random(50, 400));

    //gerar obstáculos superiores aleatórios
    //var rand = Math.round(random(0,1));
    //var rand = random(1,2);
    var rand = Math.round(random(1, 2));
    //var rand=roundoff(random(1,2))

    switch (rand) {
      case 1:
        obstacleTop.addImage(obsTop1);
        break;
      case 2:
        obstacleTop.addImage(obsTop2);
        break;
      default:
        break;
    }

    //atribuir tempo de vida à variável
    obstacleTop.lifetime = 100;
    obstacleTop.depth = obstacleTop.depth + 1;
    //balloon.depth = balloon.depth + 1;
    //balloon.depth = balloon.depth - 1;
    //obstacleTop.depth=obstacleTop.depth-1;
  }
}

function Bar() {
  if (World.frameCount % 60 === 0) {
    var bar = createSprite(400, 200, 10, 800);
    bar.velocityX = -6;
    bar.depth = balloon.depth;
    bar.lifetime = 70;
    bar.visible = false;
  }
}

async function getBackgroundImg() {
  var response = await fetch(
    "http://worldtimeapi.org/api/timezone/America/Sao_Paulo"
  );
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11, 13);
  if (hour >= 06 && hour <= 12) {
    bg.addImage(bgImgDay);
    bg.scale = 1.48;
  } else if (hour >= 13 && hour <= 19) {
    bg.addImage(bgImgAfternoon);
    bg.scale = 1.48;
    bg.x = width / 2;
    bg.y = height / 2;
  } else {
    bg.addImage(bgImgNight);
    bg.scale = 1.48;
    bg.x = width / 2;
    bg.y = height / 2;
  }
}
