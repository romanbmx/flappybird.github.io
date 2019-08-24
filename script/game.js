alert('Use any keywords to play the game')
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Об'єкти фоток
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

// Звідки берем фотки
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Об'єкти аудіо
var fly = new Audio();
var score_audio = new Audio();

// Звідки берем аудіо
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";


// Змінна розриву між перешкодами
var gap = 100;

// Нажимання на кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 30; // На скільки пікселів підлітає вгору
 fly.play(); // Грає пісня/звук
}

// Створення блоків
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

// Змінна рахунку за замовчуванням = 0
var score = 0;

// Позиція пташки
var xPos = 10;
var yPos = 150;
var grav = 1.4; // З якою швидкістю падає пташка


// !!! Функція DRAW() яка відповідає за відображення цілої гри на екрані !!!
function draw() {
 ctx.drawImage(bg, 0, 0); // Відображення bg

 yPos += grav; // yPos падає вниз по параметрах grav(1.3)

// Створення перешкод(колон зверху і знизу)
 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;

// Створення колон за межами екрану з gap розривом у випадковому місці
 if(pipe[i].x == 100) { // Значення x міняє відстань між перешкодами(колонами)
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Дотики до об'єктів
 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height)
  {
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    ctx.fillStyle = "red";
    ctx.font = "55px Stencil";
    ctx.fillText("You LOSE!", 15, cvs.height - 290);

    ctx.fillStyle = "white";
    ctx.font = "25px Cooper Black";
    ctx.fillText("Refresh the game", 35, cvs.height - 260);

    ctx.fillStyle = "#333399";
    ctx.font = "40px Showcard Gothic";
    ctx.fillText("Score : " + score, 40, cvs.height - 210);

    location.replace(); // Перезагрузка страницы
 }

// Коли проходить колону то додає +1 очко
 if(pipe[i].x == 5) {
 score++;
 score_audio.play(); // Коли є +1 очко то грає музика
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height); // Відображення fg
 ctx.drawImage(bird, xPos, yPos); // Відображення bird

// Стилі і розміщення тексту
 ctx.fillStyle = "#333399";
 ctx.font = "30px Stencil";
 ctx.fillText("Score: " + score, 15, cvs.height - 15);

// !!! Метод який весь викликається, весь час спрацьовує yPos += grav, bird падає !!!
 requestAnimationFrame(draw);
}

pipeBottom.onload = draw; // Коли остання фотографія прогрузилася, гра запускається
