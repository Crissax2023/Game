//canvas
const canvas = document.getElementById("canvasG");
const ctx = canvas.getContext("2d");

canvas.width = "3000";
canvas.height = "2000";

let puntaje =0;
let gameFrame=0;
ctx.font ="100px Arial";
let gameSpeed =1;
let gameOver = false;

// mouse
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    //posicion del circulo
    x:canvas.width/2,
    y:canvas.height/2,
    click:false
}

canvas.addEventListener('mouseup',function(e)
{
    mouse.click = false
})

canvas.addEventListener('mousedown',function(e)
{
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;

}
);

//jugador
const perrijo1 = new Image();
perrijo1.src = '/img/imagen1.png';
const perrijo2 = new Image();
perrijo2.src = '/img/imagen2.png';


class Dirty{
    constructor()
    {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 100;
        this.angle = 0;
        this.frameX =0;
        this.frameY =0;
        this.frame =0;
        this.spriteWidth =408;
        this.spriteHeight=327;

    }
    update()
    {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        let theta = Math.atan2(dy,dx);
        this.angle= theta;


        if(mouse.x !=this.x)
        {
            this.x -=dx/10;
        }
        if(mouse.y != this.y)
        {
            this.y -=dy/10;
        }
    }

    draw()
    {
        if(mouse.click)
        
        {
            ctx.lineWidth = .1;
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();

        }
       /* ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI *2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x,this.y,this.radius,10);
        */
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle)

            if(this.x >= mouse.x)
            {
                ctx.drawImage(perrijo1,this.frameX * this.spriteWidth,this.frameY * this.spriteHeight, 350,350 ,0-165,0-145, 250,250)

            }
            else{
                ctx.drawImage(perrijo2,this.frameX * this.spriteWidth,this.frameY * this.spriteHeight, 350,350 ,0-165,0-145, 250,250)

            }

            ctx.restore();
       

    }

}

const dirty = new Dirty();

const jabonArray = [];

const jabonImagen = new Image();
jabonImagen.src ='/img/bubble_pop_frame_02.png'


    class jabon{
            constructor()
            {
                this.x= Math.random()*canvas.width;
                this.y = canvas.height+100+Math.random()*canvas.height;
                this.radius = 50;
                this.speed = Math.random() * 10+1;
                this.distance;
                this.counted = false;
                this.sound = Math.random() <=0.5 ? 'sonido' : 'sonido2';
            }
            update()
            {
                this.y -=this.speed;
                const dx = this.x - dirty.x;
                const dy = this.y - dirty.y;
                this.distance = Math.sqrt(dx * dx + dy*dy);
            }
            draw()
            {
                ctx.fillStyle ='pink';
                ctx.beginPath();
                ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
                ctx.fill();
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(jabonImagen,this.x-100,this.y-100, 200,200)
            }

    }

const sonido = document.createElement('audio');
sonido.src =  '/music/perro.wav'
const sonido2 = document.createElement('audio');
sonido2.src = '/music/jab.wav';


const sonido3 = document.createElement('audio');
sonido3.src = '/music/JungleSouthAmerica EE201201.mp3';

function jabonesM()
{
    if(gameFrame % 99 == 0)
    {
        jabonArray.push(new jabon());
    }
    for(let i=0; i<jabonArray.length;i++)
    {

        jabonArray[i].update();
        jabonArray[i].draw();

        if(jabonArray[i].y < 0 - jabonArray[i].radius*2)
        {
            jabonArray.splice(i,1);
            i--;
        }

        else

            if(jabonArray[i].distance < jabonArray[i].radius + dirty.radius){

                //console.log("collision");
                if(!jabonArray[i].counted)
                {
                    if(jabonArray[i].sound == 'sonido')
                    {
                        sonido.play();
                    }else{
                        sonido2.play();
                    }
                    puntaje++;
                    jabonArray[i].counted = true;
                    jabonArray.splice(i,1);
                    i--;

                }
               
            }
        
       

        
    }

}



const puntos = new Image();
puntos.src = '/img/long.png';

function fondo_puntos(){
    ctx.drawImage(puntos,1050,0,1000,300);
}


const fondo1 = new Image();
fondo1.src = '/img/parque.jpg';

function parque(){
    ctx.drawImage(fondo1,0,0,3000,2000);
}


const fondo2 = new Image();
fondo2.src = '/img/branch.png';

function branch(){
    ctx.drawImage(fondo2,500,1800,3000,150);
}

const fondo3 = new Image();
fondo3.src = '/img/CLOUDSsprite.png';



const F3 ={
    x1:0,
    y:100,
    width:900,
    height:700
}

function nube(){
    F3.x1-=gameSpeed;
if(F3.x1 < -F3.width) F3.x1 = canvas.width;

    ctx.drawImage(fondo3,F3.x1,F3.y,F3.width,F3.height);
}


//enemigos - lodo

const fondo4 = new Image();
fondo4.src = '/img/pngwing.com (1).png';

class Enemy{
    constructor(){
        this.x = canvas.width -200;
        this.y = Math.random()* (canvas.height-150)+90;
        this.radius = 100;
        this.speed = Math.random()*10+5;
        this.frameX =0;
        this.frameY =0;
        this.frame =0;

    }
    draw()
    {
        /*ctx.fillStyle='green';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();   */
        ctx.drawImage(fondo4,this.x-100, this.y-100, 250,250);    
    }
    update(){
        this.x -= this.speed;
        if(this.x < 0 -this.radius * 2)
        {
            this.x = canvas.width +200;
            this.y = Math.random()* (canvas.height-150)+90;
            this.speed = Math.random()*2+2;
        }
      //colision
        const dx = this.x - dirty.x;
        const dy = this.y - dirty.y;
        const distance = Math.sqrt(dx*dx+dy*dy);
        if(distance < this.radius + dirty.radius)
        {
            findeljuego();
        }
    }
}

const enemigo1 = new Enemy();
function enemigos()
{
   
    enemigo1.draw();
    enemigo1.update();
}


const gameover_fondo = new Image();
gameover_fondo.src = '/img/mid_ground_cloud_2.png';

function fondo_perdio(){
    ctx.drawImage(gameover_fondo,500,750,2000,400);
}




//fin
function findeljuego(){
    fondo_perdio()
    ctx.fillStyle = 'red';
    ctx.font='Bold serif 50px'   
    ctx.fillText('Game Over',1250,1000);
    ctx.font='Bold serif 50px'
    ctx.fillStyle = 'Green';
    ctx.fillText('Tus puntos obtenidos son: '+ puntaje,900,1100);
    sonido3.pause();

   
    
    gameOver = true;
}

//start
document.getElementById("startgame").onclick = function()
{
    gameOver = requestAnimationFrame(animate);
    gameOver=false;
    puntaje = 0;
    dirty.x=0;
    dirty.y=0;


    enemigo1.speed = Math.random()*10+5;
    enemigo1.x = canvas.width -200;
    enemigo1.y = Math.random()* (canvas.height-150)+90;
    enemigo1.speed = Math.random()*10+5;
    
    jabon.speed = Math.random() * 10+1;
    F3.x1=0;
    gameSpeed = 1;
}

function animate()
{
    sonido3.play();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    parque();
    fondo_puntos();
    enemigos();
    jabonesM();
    nube();
    branch();
    dirty.update();
    dirty.draw();
    ctx.fillStyle = "yellow"
    ctx.fillText('Puntuación: '+ puntaje,1250,140);
    gameFrame++;
    if(!gameOver)  requestAnimationFrame(animate);
}
animate();


window.addEventListener('resize', function()
{
    canvasPosition = canvas.getBoundingClientRect();

})