const canvas = document.getElementById('canvas');
const lavaCanvas = document.getElementById('lava-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image();
img.src = './images/galaxy.jpg';
img.onload = () => {
    document.body.style.background = `#fff url(${img.src})  no-repeat bottom right`;
    document.body.style.backgroundSize='cover';
    landSurface(400);
    volcano();
    landSurface(100);
}

const landSurface = (noOfLandObjects) => {
    const landColor = ['#0c0404',
                       '#200102', '#000']//#310600 '#4d1104'
    for(let i=0; i < noOfLandObjects; i++){
        const x = Math.random()*canvas.width + 0;
        const y = Math.random()*(canvas.height - (canvas.height)*(70/100)) + (canvas.height)*(70/100);
        ctx.fillStyle = landColor[Math.ceil(Math.random()*3+0)];
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+20,y+20);
        ctx.lineTo(x, y+50);
        ctx.lineTo(x-50, y+20);
        ctx.closePath();
        ctx.fill();
    }
}

const lavaEffect = (volPosX) => {
    const lavaCtx = lavaCanvas.getContext('2d');
    lavaCanvas.width = window.innerWidth;
    lavaCanvas.height = window.innerHeight;
    let lavaParticlesArray = [];
    const lavaColor = ["red", "#fa7510"]

    class LavaParticle{
        constructor(){
            //this.lavaPosX = Math.random()*((lavaCanvas.width/2 + 50)-(lavaCanvas.width/2  - 10))+(lavaCanvas.width/2 - 10);
            this.lavaPosX = Math.random()*((volPosX+50) - (volPosX-5))+volPosX-5;
            this.lavaPosY = lavaCanvas.height/2 - 90;
            this.lavaSize = 10;
            this.speedY = Math.random()*(0.9 - 0.1)+0.1;
            this.lavaColor = lavaColor[Math.random()*(1-0)-0];
        }

        updateLava(){
            this.lavaPosY -= this.speedY;
            if(this.lavaSize > 0.1 ){
                this.lavaSize -= 0.09;
            }
        }

        drawLava(){
            lavaCtx.beginPath();
            lavaCtx.fillStyle = "red";
            lavaCtx.arc(this.lavaPosX, this.lavaPosY,this.lavaSize, 0, Math.PI*2);
            lavaCtx.fill();
            lavaCtx.closePath();
        }
    }

    const createLava = () => {
        for(let i=0; i < 10; i++){
            lavaParticlesArray.push(new LavaParticle());
        }
    }

    const animateLava = () => {
        lavaCtx.clearRect(0,0,lavaCanvas.width, lavaCanvas.height);
        for(let i=0; i < lavaParticlesArray.length; i++){
            lavaParticlesArray[i].updateLava();
            lavaParticlesArray[i].drawLava();
        }
        lavaParticlesArray = lavaParticlesArray.filter(lavaParticle => {
            return lavaParticle.lavaSize > 0.1; 
        })

        if(lavaParticlesArray.length === 0){
            createLava();
        }

        requestAnimationFrame(animateLava);
    }

    createLava();
    animateLava();
}

const volcano = () => {
    const volPosX = canvas.width*50/100;
    const volPosY = canvas.height*75/100;
    const volcanoBase = 250;
    const volcanoHeight = 400;
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.moveTo(volPosX, volPosY);
    ctx.lineTo(volPosX-(volcanoBase/2)-30, volPosY);
    ctx.lineTo(volPosX-(volcanoBase/2), volPosY-(volcanoHeight-350));
    ctx.lineTo(volPosX-(volcanoBase/2)+20, volPosY-(volcanoHeight-320));
    ctx.lineTo(volPosX-(volcanoBase/2)+32, volPosY-(volcanoHeight-300));
    ctx.lineTo(volPosX-(volcanoBase/2)+60, volPosY-(volcanoHeight-250));
    ctx.lineTo(volPosX-(volcanoBase/2)+100, volPosY-(volcanoHeight-180));
    ctx.lineTo(volPosX-(volcanoBase/2)+110, volPosY-(volcanoHeight-175));
    ctx.lineTo(volPosX-(volcanoBase/2)+120, volPosY-(volcanoHeight-170));
    ctx.lineTo(volPosX-(volcanoBase/2)+140, volPosY-(volcanoHeight-170));
    ctx.lineTo(volPosX-(volcanoBase/2)+170, volPosY-(volcanoHeight-168));
    ctx.lineTo(volPosX-(volcanoBase/2)+190, volPosY-(volcanoHeight-172));
    ctx.lineTo(volPosX-(volcanoBase/2)+210, volPosY-(volcanoHeight-200));
    ctx.lineTo(volPosX-(volcanoBase/2)+240, volPosY-(volcanoHeight-240));
    ctx.lineTo(volPosX-(volcanoBase/2)+250, volPosY-(volcanoHeight-260));
    ctx.lineTo(volPosX-(volcanoBase/2)+280, volPosY-(volcanoHeight-300));
    ctx.lineTo(volPosX-(volcanoBase/2)+310, volPosY-(volcanoHeight-340));
    ctx.lineTo(volPosX-(volcanoBase/2)+325, volPosY-(volcanoHeight-360));
    ctx.lineTo(volPosX-(volcanoBase/2)+350, volPosY-(volcanoHeight-400));
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = '#fa7510';
    ctx.moveTo(volPosX-(volcanoBase/2)+170, volPosY-(volcanoHeight-175));
    ctx.lineTo(volPosX-(volcanoBase/2)+180, volPosY-(volcanoHeight-180));
    ctx.lineTo(volPosX-(volcanoBase/2)+180, volPosY-(volcanoHeight-190));
    ctx.lineTo(volPosX-(volcanoBase/2)+170, volPosY-(volcanoHeight-195));
    ctx.lineTo(volPosX-(volcanoBase/2)+160, volPosY-(volcanoHeight-195));
    ctx.lineTo(volPosX-(volcanoBase/2)+150, volPosY-(volcanoHeight-195));
    ctx.lineTo(volPosX-(volcanoBase/2)+140, volPosY-(volcanoHeight-195));
    ctx.lineTo(volPosX-(volcanoBase/2)+120, volPosY-(volcanoHeight-190));
    ctx.lineTo(volPosX-(volcanoBase/2)+115, volPosY-(volcanoHeight-180));
    ctx.lineTo(volPosX-(volcanoBase/2)+120, volPosY-(volcanoHeight-178));
    ctx.fill();
    ctx.closePath();

    lavaEffect(volPosX, volPosY);
}


const lavaFlow = () => {
    let FlowingLavaParticlesArray = [];
    class FlowingLavaParticle{
        constructor(){
            this.x = volPosX;
            this.y = volposY - (volcanoHeight-170);
            this.size = 10;
            this.color = '#f00';
        }

        update(){
            this.y += 0.1;
        }

        draw(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y,this.size, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
    }

    const createLavaParticles = () => {
        ctx.clearRect(0,0,)
    }
}


window.addEventListener('resize',() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    lavaCanvas.width = 200;
    lavaCanvas.height = 300;
    landSurface(400);
    volcano();  
    landSurface(100);
})