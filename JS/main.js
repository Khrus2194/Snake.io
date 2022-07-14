const cvs = document.getElementById("game");
const ctx = cvs.getContext('2d');

const ground = new Image();
ground.src = "IMG/Main.jpg";

const apple = new Image();
apple.src = "IMG/APPLE.png";

let box = 32;
let score = 0;

 let speed = prompt("Какая скорость?")

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener("keydown", direction)
let dir;
function direction(event){
  if(event.keyCode == 65 &&  dir != "right"){
    dir = "left";
  }

  if(event.keyCode == 68 &&  dir != "left"){
    dir = "right";
  }


  if(event.keyCode == 87 &&  dir != "down"){
    dir = "up";
  }


  if(event.keyCode == 83 &&  dir != "up"){
    dir = "down";
  }
}

function eatTail(head, arr){
  for(let i = 0; i < arr.length; i++){
    if(head.x == arr[i].x && head.y == arr[i].y){
      clearInterval(game);
    }
  }
}

function dropGame(){
   ctx.drawImage(ground,0,0)
   ctx.drawImage(apple, food.x,food.y)



   for(let i = 0; i < snake.length; i++){
     ctx.fillStyle = i == 0 ? "aqua" : "blue";
     ctx.fillRect(snake[i].x, snake[i].y, box, box);

   }


   ctx.fillStyle = "white";
   ctx.font = "20px Arial";
   ctx.fillText(score, box * 1.12, box * 1.6);

   let snakeX = snake[0].x;
   let snakeY = snake[0].y;


   if(snakeX == food.x && snakeY == food.y){
    score ++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box
  }  
  }
  
  else{
    snake.pop();
   }

  if(snakeX <box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17){
   clearInterval(game);
   alert("Hamburger")
  }

   if(dir == "left"){
    snakeX -= box;
   }

   if(dir == "right"){
    snakeX += box;
   }


   if(dir == "up"){
    snakeY -= box;
   }


   if(dir == "down"){
    snakeY += box;
   }

  let newhead = {
    x: snakeX,
    y: snakeY
  }
  eatTail(newhead, snake)

  snake.unshift(newhead);
}


let game = setInterval(dropGame, speed)
