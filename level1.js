//level-1

//select canavs, set canavs width + height
var canvas = $('#myCanvas')[0];
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 7;


//declare variables
var heartX = 80,
    heartY, sliceX, sliceY, seedX, seedY = 0;
var no_level = 1;


//water variables
var waterRX, waterRY,
    waterLX, waterLY,
    waterW = 50,
    waterH = 70;


//character variables
var charWidth = 50,
    charHieght = 60,
    charX = canvas.width / 2 - (charWidth / 2),
    charY = canvas.height - charHieght - 10;

//knife variables
var wKnife = 40,
    hKnife = 55,
    xKnife = charX + charWidth * 0.9 - wKnife / 2,
    yKnife = initialY = charY;


//watermelon function constructor
function Watermelon(xPoint, yPoint, wSize, hSize) {
    this.xPoint = xPoint;
    this.yPoint = yPoint;
    this.wSize = wSize;
    this.hSize = hSize;
}

//create watermelon objects function
function createWatermelones() {
    let index2 = 0,
    index3 = 0;
    for (let index = 0; index < 21; index++) {
        if (index < 7) {
            watermelons.push(new Watermelon((index * 150) + 100, 80, 80, 80));
        } else if (index < 14) {
            watermelons.push(new Watermelon((index2 * 150) + 100, 200, 80, 80));
            index2++;
        } else {
            watermelons.push(new Watermelon((index3 * 150) + 100, 320, 80, 80));
            index3++;
        }
    }
}

var counter = 0;
//draw font function
function drawFont() {
    ctx.font = "23px Comic Sans MS";
    ctx.fillStyle = "#214D09";
    ctx.fillText("LEVEL " + no_level, 10, 40);
}

function drawFont1() {
    ctx.font = "23px Comic Sans MS";
    ctx.fillStyle = "#214D09";
    ctx.fillText("Score: " + counter, 289, 40);
}



//draw character function
var character = new Image();
character.src = "assets/character.png"

function drawCharacter(charX, charY, charWidth, charHieght) {
    ctx.drawImage(character, charX, charY, charWidth, charHieght)
}


//draw background function
// background_img = new Image();
// background_img.src = "assets/background.svg";

// function draw_background() {
    //     ctx.drawImage(background_img, 0, 0);
    // }
    
    
    //draw score box function
var score_box = new Image();
score_box.src = "assets/scoreBox.svg";

function draw_score_box() {
    ctx.drawImage(score_box, 250, 10, 170, 45);

}

//draw heart function
var heart = new Image();
heart.src = "assets/heart.png";

function draw_heart(no_hearts) {
    ctx.drawImage(heart, 120, 20, 25, 25);
    ctx.drawImage(heart, 160, 20, 25, 25);
    ctx.drawImage(heart, 200, 20, 25, 25);
}

//draw watermelon function
var watermelon_half = new Image();
watermelon_half.src = "assets/watermelon_half.svg";

function draw_watermelon_half() {
    for (let i = 0; i < watermelons.length; i++) {
        if (watermelons[i] !== null) {
            ctx.drawImage(watermelon_half, watermelons[i].xPoint, watermelons[i].yPoint, watermelons[i].wSize, watermelons[i].hSize);
        }
    }
}

//draw slice function
var slice = new Image();
slice.src = "assets/slice.svg";

function draw_slice(sliceX, sliceY) {
    ctx.drawImage(slice, sliceX, sliceY);
}

//draw seed function
var seed = new Image();
seed.src = "assets/seed.svg";

function draw_seed() {
    ctx.drawImage(seed, seedX, seedY);
}

//draw water function
var waterL = new Image();
waterL.src = "assets/waterLeft.svg";
var waterR = new Image();
waterR.src = "assets/waterRight.svg";

function draw_water(waterLX, waterLY, waterRX, waterRY) {
    ctx.drawImage(waterL, waterLX, waterLY, waterW, waterH);
    ctx.drawImage(waterR, waterRX, waterRY, waterW, waterH);
}

//draw knife function
var knife = new Image();
knife.src = "assets/knife.svg";

function draw_knife(xKnife, yKnife, wKnife, hKnife) {
    ctx.drawImage(knife, xKnife, yKnife, wKnife, hKnife);
}

//create watermelon objects
var watermelons = [];
createWatermelones();

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFont();
    drawFont1();
    draw_heart(3);
    draw_score_box();

    // draw knife
    draw_knife(xKnife, yKnife, wKnife, hKnife);

    // draw character
    drawCharacter(charX, charY, charWidth, charHieght);

    //draw watermelons
    draw_watermelon_half();
}

drawGame();

//control character movement
document.onkeydown = function(e) {
    if (e.keyCode === 39 && charX <= canvas.width - charWidth - 10) {
        charX = charX + 7;
        xKnife = xKnife + 7;

    } else if (e.keyCode === 37 && charX > 10) {
        charX = charX - 7;
        xKnife = xKnife - 7;
    }
    drawGame();
}
//throw knife + cut watermelon + show water
document.onkeyup = function(e) {
    if (e.keyCode === 32) {

        $('#throwKnife')[0].play();
        var knifeFlag = true;
        setInterval(function() {
            if (yKnife >= 20 && knifeFlag) {
                yKnife -= 5;
                drawGame();

                watermelons.forEach(el => {
                    if (el !== null && el.xPoint <= xKnife && (el.xPoint + el.wSize) >= xKnife && el.yPoint <= yKnife && (el.yPoint + el.hSize / 2) >= yKnife) {
                        knifeFlag = false;
                        $('#stabWatermelon')[0].play();

                        waterLX = el.xPoint, waterLY = el.yPoint;
                        waterRX = el.xPoint + waterW + 20, waterRY = el.yPoint;

                        watermelons[watermelons.indexOf(el)] = null;

                        
                        counter+=5;

                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    

                        yKnife = initialY;

                        drawFont();
                        drawFont1();
                        draw_heart(3);
                        draw_score_box();
                        draw_watermelon_half();
                        draw_water(waterLX, waterLY, waterRX, waterRY);
                        draw_knife(xKnife, yKnife, wKnife, hKnife);
                        drawCharacter(charX, charY, charWidth, charHieght);

                    }
                  
                
                });
            }
        }, 10);
    }
}


