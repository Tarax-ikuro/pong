// SELECTION DE L'ELEMENT CANVAS//
const canvas = document.getElementById("test");

//
const context = canvas.getContext('2d');





// CREATION DU PADDLE COTE USER //////////////////////////////////////////
// A GAUCHE DU CANVAS //
const user = {
    
    x : 0,
    y : (canvas.height -100)/2, // -100 DE HAUTEUR du PADDLE
    width: 10,
    height: 100,
    score: 0,
    color:"WHITE"



}




//// CREATION DU PADDLE DU COTE COMPUTER ////////////////////////////////////
const com = {
x : canvas.width - 10,
y : (canvas.height - 100)/2,
width : 10,
height :100,
score :0,
color : "WHITE"


}



///////// CREATION DE LA BALL /////// ///////////////////////////////////////////////////

const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}



//NET//
const net = {
    x:(canvas.width -2)/2,
    y : 0,
    height: 10,
    width : 2,
    color :"WHITE"

}

// drawRect(100,100,50,50,"white");
// drawRect(user.x, user.y, user.width, user.height, user.color);
// console.log(user);

//////////////////////////////////////////////REMPLISSAGE DES PADDLE///// /////////////////////////////////////////
    // Draw players //
function drawRect(x,y,w,h,color){

context.fillStyle = color;
context.fillRect(x, y, w, h);

}
// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,true);
    context.closePath();
    context.fill();
}

///CREATION DE LA MOVEMOUSE //////////////////////////////////////////////////////
// CREATION DE LA FONCTION MOVE//CREATION DE LA COLLISONJ AVEC LA PRISE E NBCO!M:PTE 

 
//CREATION D'UNE  FONCTION MOVEPADDLE//
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}


//// QUAND LE BOT OU LE JOUEUR MARQUE/////
// fonction reset de la ball //
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

//// CREATION DE LA LIGNE CENTRALE /////
function drawNet(){
    for(let i=0; i <= canvas.height; i+=15){
        drawRect(net.x , net.y +i, net.width, net.height, net.color  );

    }
}
// draw text //
function drawText(text,x,y){
    context.fillStyle = "#FFF";
    context.font = "75px fantasy";
    context.fillText(text, x, y);
}




///// CREATION DE LA FONCTION DE COLLISON AVEC LA PRISE EN COMPTE DU TOP BOTTOM LEFT ET RIGHT //////
    function collision(b,p){
       
        b.top = b.y - b.radius;
        b.bottom = b.y + b.radius;
        b.left = b.x - b.radius;
        b.right = b.y + b.radius;
       
       
        p.top = p.y;
        p.bottom = p.y + p.height;
        p.left = p.x;
        p.right = p.x + p.width;

       

       return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
    
    
    
    
    }


//////////////////////////////////////// MAJ DE LA FONCTION LA FONCTION VA TOUT EXECUTER ///////////////////////////////////
function update(){


/////////////////////VELOCITE de la BALL/////////////
ball.x += ball.velocityX;
ball.y += ball.velocityY;






// LE COMPUTER JOUE LUI MEME ET IL EST CHEATE //
let computerLevel = 0.1;
com.y += (ball.y-(com.y + com.height/2))*0.1;


  //quand la touche le haut et le bas nous inversons les y de la velocité//
if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
    ball.velocityY = -ball.velocityY;
   





// chagnge le score du player si la ball a été envoyé de la gauche donc 
   if(ball.x - ball.radius < 0){
        com.score++;
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();
    }








}


////////////VERIFICATION SI LA PADDLE ET LE COM PADDLE TOUCHENT LA BALL//////////////////////////////////
let player = (ball.x + ball.radius < canvas.witdth/2) ? user : com;


// if la ball hits le paddle //
if(collision(ball,player)){
    
   
    // we check where the ball hits the paddle
    let collidePoint = ball.y - (player.y + player.height/2);
    // normalize the value of collidePoint, we need to get numbers between -1 and 1.
    // -player.height/2 < collide Point < player.height/2
    collidePoint = collidePoint /(player.height/2);

    // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
    // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
    // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
//    let Math.PI/4 =45;
    let angleRad = (Math.PI/4) * collidePoint;

   
   
   
    // change the X and Y velocity direction
    let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
  
  
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    // speed up the ball everytime a paddle hits it.
    ball.speed += 0.1;

}
}










/////////////////////////////////////////////RENDU////////////////////////////
function render(){
    //clear the canvas//
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    
   

    //draw   score user //
    drawText(user.score,canvas.width/4, canvas.height/5,"WHITE");
   //draw  COM score //
    drawText(com.score,3*canvas.width/4, canvas.height/5,"WHITE");
     
    //draw the net//
     drawNet();
    
    //draw user and com paddle// 
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

  


    // draw the ball //
    drawArc(ball.x, ball.y, ball.radius, ball.color);

}

// game init::
function game(){
    update();
    render();
}

// FPS///
let framePerSecond = 50;

//APPEL DE LA FONCTION GAME 50 FOIS TOUS LES 1 SECONDE//
// creation d'un looping//
let loop = setInterval(game,1000/framePerSecond);










