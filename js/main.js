function start(){
const front=document.querySelector(".flappy-intro");
const bird=document.querySelector(".bird");
const score=document.getElementById("score");
const ground = document.querySelector('.ground-moving');
const gamebox = document.querySelector('.game-box');
const game_over=document.querySelector(".game-over");
front.classList.add("hide");
let birdbottom=200;
let gap = 480;
let isGameOver=false;
let scorecount=0;

function fall()
{ if(birdbottom>15)birdbottom-=3;
bird.style.bottom=birdbottom+'px';
}

let game=setInterval(fall,20);
function control(e) {
    if (e.keyCode === 32) {
        jump()
    }
}

function jump() {  
    if (birdbottom < 500) birdbottom += 50
    bird.style.bottom = birdbottom + 'px';
    // console.log(birdbottom);
}
document.addEventListener('keydown', control);
// const pipe=document.querySelector(".pipe");
function getpipes()
{
    let pipeleft=600;
    let randomHeight = Math.floor(Math.random() * 60);
    let pipebottom = randomHeight+60;
    console.log(pipebottom);
    const pipe = document.createElement('div')
    const toppipe = document.createElement('div')
    if (!isGameOver) {
        pipe.classList.add('pipe')
        toppipe.classList.add('top-pipe')
    }
    gamebox.appendChild(pipe)
    gamebox.appendChild(toppipe)
    pipe.style.left = pipeleft + 'px'
    toppipe.style.left = pipeleft + 'px'
    pipe.style.bottom = pipebottom + 'px'
    toppipe.style.bottom = pipebottom + gap + 'px'

    function movepipe() {
        pipeleft -=2
        pipe.style.left = pipeleft + 'px'
        toppipe.style.left = pipeleft + 'px'

        if (pipeleft === -60) {
            clearInterval(timerId)
            gamebox.removeChild(pipe)
            gamebox.removeChild(toppipe)
        }
        if((pipeleft > 180 && pipeleft < 280&&(birdbottom < pipebottom + 110||birdbottom>pipebottom+gap+112))||birdbottom< 18)
        {
            isGameOver = true;
            clearInterval(timerId);
            gameOver();
             document.removeEventListener('keydown',control);
        }
         if(pipeleft==170)
        { console.log("pipeleft");
            scorecount++;
            score.innerHTML=scorecount;
            
        }
        if(isGameOver)
        {
            clearInterval(timerId);
        }
    }
    // console.log(isGameOver);
var timerId = setInterval(movepipe, 18);
if (!isGameOver) setTimeout(getpipes, 2500);
 
    }
    getpipes();
    function gameOver() {
        clearInterval(game);
        console.log('game over');
        setTimeout(function(){
            game_over.innerHTML="<h1>Game Over<h1>";
            game_over.innerHTML+="<h2>Reload to play again<h2>";
        },200)
           document.removeEventListener('keyup', control)
        ground.classList.add('ground-stop')
        ground.classList.remove('ground-moving')
    }
}