const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        }
}

const fundo = {
    spriteX: 389, 
    spriteY: 0,
    largura: 276,
    altura: 204,
    x: 0,
    y: 276,
        back() {
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
                fundo.largura, fundo.altura,);
        }
}

const chao = {
    spriteX: 0, 
    spriteY: 612,
    largura: 225,
    altura: 109,
    x: 0,
    y: 371,
        chao() {
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
        }
}

contexto.fillStyle = '#70c5ce';
contexto.fillRect(0,0, canvas.clientWidth, canvas.height)

function loop(){
    flappyBird.desenha();
    fundo.back();
    chao.chao();

    requestAnimationFrame(loop);
}

loop();

