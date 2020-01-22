//import modules
import { draw_font } from "./scripts/Font.js";
import { draw_heart } from "./scripts/Hearts.js";
import { draw_scoreBox } from "./scripts/ScoreBox.js";
import { draw_knife } from "./scripts/Knife.js";
import { seedConstructor } from "./scripts/Seed.js";
import { draw_seed } from "./scripts/Seeds.js";
import { sliceConstructor } from "./scripts/Slice.js";
import { draw_slice } from "./scripts/Slices.js";

//select canavs, set canavs width + height
var canvas = $('#myCanvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 7;

//hide cursor
canvas.style.cursor = "none";


//variables
var level_no = 2, heartCounter = 3, 
    seeds = [], slices = [],
    stabs = 0, counter = 0;


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
var wKnife = 65, hKnife = 80, initialY,
    xKnife = charX + (charWidth * 0.85),
    yKnife = initialY = charY + charHeight * 0.55,
    knifeFlag = true;

//variables
var wWidth = 350, wHeight = 350,
    wX = canvas.width / 2 - wWidth / 2,
    wY = canvas.height / 2 - wHeight * 0.75;


//draw character function
var character = new Image();
character.src = "assets/girlDefault.svg"

function draw_character(charX, charY, charWidth, charHeight) {
    ctx.drawImage(character, charX, charY, charWidth, charHeight)
}

//draw watermelon
var watermelon = new Image();
watermelon.src = "assets/watermelon.svg";

function draw_watermelon(ctx, wX, wY, wWidth, wHeight) {
    ctx.drawImage(watermelon, wX, wY, wWidth, wHeight);
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
function draw_game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_font(ctx, "Level ", level_no, 10, 40);
    draw_font(ctx, "Score: ", counter, 280, 40);
    draw_heart(ctx, heartCounter);
    draw_scoreBox(ctx);

    //draw watermelon
    if (watermelon !== null) draw_watermelon(ctx, wX, wY, wWidth, wHeight);

    //draw knife
    draw_knife(ctx, xKnife, yKnife, wKnife, hKnife);

    //draw character
    draw_character(charX, charY, charWidth, charHeight);

    //draw seed
    draw_seed(ctx, seeds);

    //draw slice
    draw_slice(ctx, slices);

    if (waterAppear) {
        draw_water(waterR, waterRX, waterRY);
        draw_water(waterL, waterLX, waterLY);
    }
}


//draw level2
draw_game();


//control character movement
document.onkeydown = function(e) {
    if (e.keyCode === 39 && charX <= canvas.width - charWidth - 10) {
        charX = charX + 7;
        if (yKnife === initialY) {
            xKnife = xKnife + 7;
        }
    } 
    
    else if (e.keyCode === 37 && charX > 10) {
        charX = charX - 7;
        if (yKnife === initialY) {
            xKnife = xKnife - 7;
        }
    }

    draw_game();
}


//throw knife + cut watermelon + show water
document.onkeyup = function(e) {
    if (e.keyCode === 32) {
        $('#throwKnife')[0].play();
        let knifeInterval = setInterval(function() {
            if (yKnife >= 20 && knifeFlag) {
                yKnife -= 15;
            } 
            else {
                yKnife = initialY;
                knifeFlag = true;
                draw_game();
                window.clearInterval(knifeInterval)
            }

            draw_game();
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
                    for (let i = 0; i < 15; i++) {
                        let x = Math.floor(Math.random() * wX)
                        let y = Math.floor(Math.random() * wY)
                        slices.push(new sliceConstructor(wX + x, wY + y))
                    }

                } 
                else {
                    draw_watermelon(wX, wY, wWidth, wHeight);
                    waterLX = xKnife, waterLY = yKnife;
                    waterRX = xKnife + 20, waterRY = yKnife;
                }
                waterAppear = true;
                yKnife = initialY;
                draw_game();
                let waterAppearToggler = window.setTimeout(() => {
                    waterAppear = false;
                }, 1000)
            }
            else if (watermelon === null) {
                window.location = "win.html";
            }
        }, 5);
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
            $('#eatSeed')[0].volume = 1;
            $('#eatSeed')[0].play();
            heartCounter--;
            if (heartCounter == 0) {
                $('.gameover_container')[0].style.display = "flex";
            }

            seeds.splice(i, 1);
            character.src = "assets/girlSeed.svg";
        }

        if (s.y == 700) {
            seeds.splice(i, 1);
        }
        s.y += 5
    });
    draw_game();
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
    draw_game();
}, 50);


let characterChange = window.setInterval(() => {
    document.getElementById("bgMusic").play();
    character.src = "assets/girlDefault.svg";
}, 2000);


let newGame = window.setTimeout(() => {
    // document.getElementById('bgMusic').play();
    draw_game();
    window.clearTimeout(newGame)
}, 0);


//retun home "game over"
$('#home-2').click(
    function () { window.location = "index.html"; }
);
