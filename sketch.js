//namespacing
//criar uma variável de nome menor para referir a algo de nome maior
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint


//variaveis
var engine;
var world;
var solo, bola;
var parado;
var mexendo;
var b1;
var conexao;
var botaoImg, fundoImg, coelhoImg, corda;
var blink, sad, eat;
var coelho;
var somComer, somCorte, somFundo, somAr;
var mutarImg, balaoImg;

function preload(){
    fundoImg = loadImage("planodefundo.png");
    frutaImg = loadImage("fruta.png");
    coelhoImg = loadImage("coelho.png");

    blink = loadAnimation("piscar1.png", "piscar2.png", "piscar3.png");
    sad = loadAnimation("triste1.png","triste2.png","triste3.png");
    eat = loadAnimation("comer1.png","comer2.png","comer3.png","comer4.png","comer5.png")
    
    somFundo = loadSound("fundo.mp3");
}

function setup() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if(isMobile){
        canW = displayWidth;
        canH = displayHeight;
    }else{
        canW = windowWidth;
        canH = windowHeight;
    }
    createCanvas(canW, canH);
    //cria o motor
    engine = Engine.create();
    world = engine.world;

    blink.looping = true;
    blink.frameDelay = 20;

    sad.playing = true;
    sad.looping = false;
    sad.frameDelay = 20;

    eat.looping = false;
    eat.frameDelay = 20;


    var parado = {isStatic:true};
    //cria corpo retangular
    solo = Bodies.rectangle(width/2,height-10,width,20, parado);  
    //adiciona no mundo
    World.add(world, solo);

    //criar um objeto da classe Bola
    bola = new Bola(100);
    corda = new Corda({x:width/9,y:height/9},bola.body);
    corda2 = new Corda({x:width/1.5,y:height/5},bola.body);

    botaoImg = createImg("cortar.png");
    botaoImg.size(60,60);
    botaoImg.position(width/9-30,height/9-30);
    botaoImg.mouseClicked(cortar);

    botaoImg2 = createImg("cortar.png");
    botaoImg2.size(60,60);
    botaoImg2.position(width/1.5-30,height/5-30);
    botaoImg2.mouseClicked(cortar2);


    coelho = createSprite(width/2,height-150);
   // coelho.addImage(coelhoImg);
    coelho.addAnimation("blinking", blink);
    coelho.addAnimation("eating", eat);
    coelho.addAnimation("sad", sad);
    coelho.scale = 0.2

    rectMode(CENTER);
    ellipseMode(RADIUS);
    imageMode(CENTER);
    //checar se o som NÃO está tocando
    if(!somFundo.isPlaying()){
        somFundo.setVolume(0.2)
        somFundo.stop()

    }
}


function draw() {
    
    background("cyan");    
    image(fundoImg, width/2, height/2,width,height);
    //atualiza o motor
    Engine.update(engine);

    //pinta o solo
    fill("brown")
    //desenha o retângulo no corpo
    rect (solo.position.x, solo.position.y, width,20);
    
    drawSprites()

    corda.show();
    corda2.show()
    bola.show();

    if(detectarColisao(bola.body, coelho)){
        //mudar a animação do coelho
        coelho.changeAnimation("eating");
    }

    if(bola.body != null){
        //detecta colisao entre corpos do Matter.js
        var colisao = Matter.SAT.collides(bola.body, solo);
        if(colisao.collided){
            bola.erase()
            coelho.changeAnimation("sad");
        }        
    }


   
}

function cortar(){
    corda.cut();
}
function cortar2(){
    corda2.cut()
}



function detectarColisao(corpo, sprite){
    if(bola.body !== null){
        //calcula a distância e guarda o resultado
        var distancia = dist(corpo.position.x,corpo.position.y,sprite.position.x,sprite.position.y);
        if(distancia<=80){
            bola.erase();
            return true;
        }else{
            return false;
        }
    }
    
}

function keyPressed(){
    if(keyCode==32){
        Body.applyForce(bola.body, {x:0, y:0}, {x:1,y:0})
    }
}