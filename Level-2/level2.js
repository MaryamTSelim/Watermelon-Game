//level 2

//select canavs, set canavs width + height
var canvas = $('#myCanvas')[0];
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 7;

//variables
var heartX = 80,
    heartY, sliceX, sliceY, seedX, seedY = 0;
var no_level = 1;
var stabs = 0;

//water variables
var waterRX, waterRY,
    waterLX, waterLY,
    waterW = 50,
    waterH = 70;


//character variables
var charWidth = 100,
    charHieght = 150,
    charX = canvas.width / 2 - (charWidth / 2),
    charY = canvas.height - charHeight;

//knife variables
var wKnife = 65,
    hKnife = 80,
    xKnife = charX + (charWidth * 0.85),
    yKnife = initialY = charY + charHeight * 0.55;


//variables
var wWidth = 350;
var wHeight = 350;

var wX = canvas.width / 2 - wWidth / 2 ;
var wY = canvas.height / 2 - wHeight * 0.75;


//draw font function
function draw_font() {
    ctx.font = "23px Comic Sans MS";
    ctx.fillStyle = "#214D09";
    ctx.fillText("LEVEL " + no_level, 10, 40);
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

// draw watermelon function
var watermelon = new Image();
watermelon.src = "assets/watermelon.svg";

function draw_watermelon(wX, wY, wWidth, wHeight) {
    ctx.drawImage(watermelon, wX, wY, wWidth, wHeight);
}

//draw knife function
var knife = new Image();
knife.src = "assets/knife.svg";

function draw_knife(xKnife, yKnife, wKnife, hKnife) {
    ctx.drawImage(knife, xKnife, yKnife, wKnife, hKnife);
}

//draw character function
var character = new Image();
character.src = "assets/character.svg"

function draw_character(charX, charY, charWidth, charHeight) {
    ctx.drawImage(character, charX, charY, charWidth, charHeight)
}

//draw water function
var waterL = new Image();
waterL.src = "assets/waterLeft.svg";
var waterR = new Image();
waterR.src = "assets/waterRight.svg";

var water = new Image();
water.src = "assets/water.svg";

function draw_water(src, waterX, waterY) {
    ctx.drawImage(src, waterX, waterY, waterW, waterH);
}

//draw level2 function
function draw_level2()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_font();
    draw_heart();
    draw_score_box();
    if (watermelon !== null) draw_watermelon(wX, wY, wWidth, wHeight);
    draw_knife(xKnife, yKnife, wKnife, hKnife);
    draw_character(charX, charY, charWidth, charHeight);
}

//draw level2
draw_level2();

//control character movement
document.onkeydown = function(e) {
    if (e.keyCode === 39 && charX <= canvas.width - charWidth - 10) {
        charX = charX + 7;
        xKnife = xKnife + 7;

    } else if (e.keyCode === 37 && charX > 10) {
        charX = charX - 7;
        xKnife = xKnife - 7;
    }

    draw_level2();
}
    
//throw knife + cut watermelon + show water
document.onkeyup = function(e) {
    if (e.keyCode === 32) {

        $('#throwKnife')[0].play();
        var knifeFlag = true;
        setInterval(function() {
            if (yKnife >= 20 && knifeFlag) {
                yKnife -= 5;

                draw_level2();
                
                if (watermelon !== null && wX <= xKnife && (wX + wWidth) >= xKnife && wY <= yKnife && (wY + wHeight / 2) >= yKnife ) {
                    knifeFlag = false;
                    $('#stabWatermelon')[0].play();

                    stabs++;
                    
                    if(stabs === 20)
                    {
                        watermelon = null;
                        waterLX = wX + 20, waterLY = wY + 20;
                        waterRX = wX + wWidth/2, waterRY = wY + wHeight * 0.4; 

                        waterW = wWidth / 2;
                        waterH = wHeight / 2;

                        waterR = waterL = water;
                    }

                    else{
                    
                        draw_watermelon(wX, wY, wWidth, wHeight);
                        waterLX = xKnife, waterLY = yKnife;
                        waterRX = xKnife + 20, waterRY = yKnife;
                    } 

                    yKnife = initialY;
                    draw_level2();
                    draw_water(waterR, waterRX, waterRY);
                    draw_water(waterL, waterLX, waterLY);
                }
            }
        }, 10);
    }
}