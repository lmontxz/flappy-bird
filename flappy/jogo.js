const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

const punch = new Audio();
punch.src = 'punch.wav';

let animation_frame = 0;

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
        flappyBird.velocidade = -flappyBird.pulo;
    },
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        },
        movimentos: [
            {spriteX: 0, spriteY: 0,},
            {spriteX: 0, spriteY: 26,},
            {spriteX: 0, spriteY: 52,},
            {spriteX: 0, spriteY: 26,},
       ],
        gravidade: 0,
        velocidade: 0,
        atualiza(){
            if(fazColisao()){
                punch.play();
                telaAtiva = TelaInicio;
                return;
            }
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade; 
            flappyBird.atualizaFrame();
        },   
        frameAtual: 0,
        atualizaFrame(){
          if((animation_frame % 10) === 0 ){
            flappyBird.frameAtual = flappyBird.frameAtual + 1;
            flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
            flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX
            flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY
          }
        }
}

function fazColisao(){
    if (flappyBird.y + flappyBird.altura > chao.y) {
        return true;
    }

    return false;
}

const fundo = {
    spriteX: 391, 
    spriteY: 0,
    largura: 274,
    altura: 203,
    x: 0,
    y: 274,
        desenha() {
            contexto.drawImage(
                sprites,
                fundo.spriteX, fundo.spriteY,
                fundo.largura, fundo.altura,
                fundo.x, fundo.y,
                fundo.largura, fundo.altura,
            );
            contexto.drawImage(
                sprites,
                fundo.spriteX, fundo.spriteY,
                fundo.largura, fundo.altura,
                fundo.x + fundo.largura + -1, fundo.y,
                fundo.largura, fundo.altura,
            );
            contexto.drawImage(
                    sprites,
                    fundo.spriteX, fundo.spriteY,
                    fundo.largura * 2, fundo.altura,
                    fundo.x + fundo.largura * 2 + -1, fundo.y,
                    fundo.largura * 2, fundo.altura,);
        },
        atualiza() {
            if((animation_frame % 4) === 0 ){
                fundo.x = fundo.x - 1;
                fundo.x = fundo.x % (fundo.largura);
            }     
        }
}

const chao = {
    spriteX: 0, 
    spriteY: 612,
    largura: 225,
    altura: 109,
    x: 0,
    y: 371,
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x + chao.largura + -1, chao.y,
                chao.largura, chao.altura,
            );
            },
        atualiza() {
            chao.x = chao.x - 1;
            chao.x = chao.x % (chao.largura / 2);        
        }
}

const inicio = {
    spriteX:130, 
    spriteY: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,
    desenha() {
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
        );

    }
}

const TelaInicio = {
    desenha(){
        fundo.desenha();
        chao.desenha();
        flappyBird.desenha();
        inicio.desenha()
    },
    click(){
        telaAtiva = TelaJogo;
    }
}

const TelaJogo = {
    desenha(){
        fundo.desenha();
        fundo.atualiza();
        chao.desenha();
        chao.atualiza();
        flappyBird.desenha();
        flappyBird.atualiza();
    },
    click(){
        flappyBird.pula();
    }
}

var telaAtiva = TelaInicio;

function loop(){
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0,0, canvas.clientWidth, canvas.height);
    telaAtiva.desenha()
    requestAnimationFrame(loop);
    animation_frame =  animation_frame +1;
}

function mudaTelaAtiva(){
    telaAtiva.click();
}

window.addEventListener("click", mudaTelaAtiva);

loop();
