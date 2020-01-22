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
var waterRX, waterRY, //Small 
    waterLX, waterLY, //Small
    waterW = 50, //Small
    waterH = 70,
    waterAppear = false;
//character variables
var charWidth = 100,
    charHeight = 150,
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

var wX = canvas.width / 2 - wWidth / 2;
var wY = canvas.height / 2 - wHeight * 0.75;


//draw font function
function draw_font() {
    ctx.font = "23px Comic Sans MS";
    ctx.fillStyle = "#214D09";
    ctx.fillText("LEVEL " + no_level, 10, 40);
}

function drawFont1() {
    ctx.font = "23px Comic Sans MS";
    ctx.fillStyle = "#214D09";
    ctx.fillText("Score: " + counter, 285, 40);
}

//draw slice function
var slice = new Image();
slice.src = "assets/slice.svg";

function draw_slice(sliceX, sliceY) {
    ctx.drawImage(slice, sliceX, sliceY);
}

//draw seed function
let seeds = [];
var seed = new Image();
seed.src = "assets/seed.svg";

function seedConstructor(x, y) {
    this.x = x;
    this.y = y;
}

function draw_seed() {
    seeds.forEach(s => {
        ctx.drawImage(seed, s.x, s.y, 10, 15);
    })

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

var heartCounter = 3;

function draw_heart(no_hearts) {
    heartX = 80;
    for (let index = 0; index < no_hearts; index++) {
        heartX += 40;
        ctx.drawImage(heart, heartX, 20, 25, 25);

    }
}

// draw watermelon function
var watermelon = new Image();
watermelon.src = "assets/watermelon.svg";

function draw_watermelon(wX, wY, wWidth, wHeight) {
    ctx.drawImage(watermelon, wX, wY, wWidth, wHeight);
}

let slices = []

slice = new Image();
slice.src = "assets/slice.svg";

function sliceConstructor(x, y) {
    this.x = x;
    this.y = y;
}

function draw_slice() {
    slices.forEach(s => {
        ctx.drawImage(slice, s.x, s.y, 30, 30)
    })

}



//draw knife function
var knife = new Image();
knife.src = "assets/knife.svg";

function draw_knife(xKnife, yKnife, wKnife, hKnife) {
    ctx.drawImage(knife, xKnife, yKnife, wKnife, hKnife);
}

//draw character function
var character = new Image();
character.src = "assets/girlDefault.svg"

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
function draw_level2() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_font();
    drawFont1()
    draw_heart(heartCounter);
    draw_score_box();
    if (watermelon !== null) draw_watermelon(wX, wY, wWidth, wHeight);

    draw_knife(xKnife, yKnife, wKnife, hKnife);
    draw_character(charX, charY, charWidth, charHeight);

    //draw seed
    draw_seed();

    //draw slice
    draw_slice();
    if (waterAppear) {
        draw_water(waterR, waterRX, waterRY);
        draw_water(waterL, waterLX, waterLY);
    }
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

var counter = 0;
//throw knife + cut watermelon + show water
var knifeFlag = true;

document.onkeyup = function(e) {
    if (e.keyCode === 32) {

        $('#throwKnife')[0].play();
        let knifeInterval = setInterval(function() {
            if (yKnife >= 20 && knifeFlag) {
                yKnife -= 5;
            } else {
                yKnife = initialY;
                knifeFlag = true;
                draw_level2();
                window.clearInterval(knifeInterval)
            }
            draw_level2();
            var r = Math.random();
            var x = Math.floor(r * wWidth);

            if (watermelon !== null && wX <= xKnife && (wX + wWidth) >= xKnife && wY <= yKnife && (wY + wHeight / 2) >= yKnife) {
                knifeFlag = false;
                $('#stabWatermelon')[0].play();

                slices.push(new sliceConstructor(wX + x, wY + 150));
                counter += 5;
                stabs++;

                if (stabs === 20) {
                    watermelon = null;
                    waterLX = wX + 20, waterLY = wY + 20;
                    waterRX = wX + wWidth / 2, waterRY = wY + wHeight * 0.4;
                    waterW = wWidth / 2;
                    waterH = wHeight / 2;
                    waterR = waterL = water;

                } else {
                    draw_watermelon(wX, wY, wWidth, wHeight);
                    waterLX = xKnife, waterLY = yKnife;
                    waterRX = xKnife + 20, waterRY = yKnife;
                }
                waterAppear = true;
                yKnife = initialY;
                draw_level2();
                let waterAppearToggler = window.setTimeout(() => {
                    waterAppear = false;
                }, 1000)
            }
        }, 10);
    }
}

let seedInterval = window.setInterval(() => {
    let check = true //Checks if there is any watermelon left

    var r = Math.random();
    var x = Math.floor(r * wWidth);
    if (watermelon != null) {
        check = false;
        seeds.push(new seedConstructor(wX + x / 2, wY + wHeight))
    }

    if (check) {
        window.clearInterval(seedInterval);
    }

}, 2000)

let seedAnimationInterval = window.setInterval(() => {
    seeds.forEach((s, i) => {
        if (s.y > charY && s.y <= (charY + charHeight) && s.x > charX && s.x <= (charX + charWidth)) {
            $('#eatSeed')[0].play();

            heartCounter--;
            seeds.splice(i, 1);
            character.src = "assets/girlSeed.svg";
        }
        if (s.y == 700) {
            seeds.splice(i, 1);
        }
        s.y += 5
    });
    draw_level2();
}, 50);

let sliceAnimationInterval = window.setInterval(() => {
    slices.forEach((s, i) => {
        if (s.y > charY && s.y <= (charY + charHeight) && s.x > charX && s.x <= (charX + charWidth)) {
            $('#eatSlice')[0].play();
            counter += 10;
            slices.splice(i, 1);
            character.src = "assets/girlEat.svg";
        }
        if (s.y == 700) {
            slices.splice(i, 1);
        }

        s.y += 5
    });
    draw_level2();
}, 50);



let characterChange = window.setInterval(() => {
    character.src = "assets/girlDefault.svg";
}, 2000);