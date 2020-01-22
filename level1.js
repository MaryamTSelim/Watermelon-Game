//import modules
import { draw_font } from "./scripts/Font.js";
import { draw_heart } from "./scripts/Hearts.js";
import { draw_scoreBox } from "./scripts/ScoreBox.js";
import { Watermelon } from "./scripts/Watermelon.js";
import { draw_watermelon_half } from "./scripts/Watermelons.js";
import { draw_knife } from "./scripts/Knife.js";
import { draw_water } from "./scripts/Water.js";
import { seedConstructor } from "./scripts/Seed.js";
import { draw_seed } from "./scripts/Seeds.js";
import { sliceConstructor } from "./scripts/Slice.js";
import { draw_slice } from "./scripts/Slices.js";


//select canavs, set canavs width + height
var canvas = $('#myCanvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//hide cursor
canvas.style.cursor = "none";

//set localstorage values
localStorage.heartCounter = 0, localStorage.scoreCounter = 0;

//declare variables
var level_no = 1, heartCounter = 3, noOfMelons = 21,
    charSpeed = 10, knifeSpeed = 15,
    watermelons = [], scoreCounter = 0, 
    seeds = [], slices = [],winCounter = 0;

//water variables
var waterRX, waterRY, 
    waterLX, waterLY, 
    waterW = 70, waterAppear = false;

//character variables
var charWidth = 80, charHeight = 120, 
    charX = canvas.width / 2 - (charWidth / 2), 
    charY = canvas.height - charHeight;

//knife variables
var wKnife = 45, hKnife = 60, initialY,
    xKnife = charX + (charWidth * 0.85),
    yKnife = initialY = charY + charHeight * 0.55, 
    knifeHitFlag = true;


//draw character function
let character = new Image(); 
character.src = "assets/girlDefault.svg";

function draw_character(charX, charY, charWidth, charHeight) {
    ctx.drawImage(character, charX, charY, charWidth, charHeight)
}


//create watermelon objects function
function createWatermelones() {
    let index2 = 0,
        index3 = 0;
    for (let index = 0; index < noOfMelons; index++) {
        if (index < noOfMelons/3) {
            watermelons.push(new Watermelon((index * 180) + 50, 80, 120, 110));
        } else if (index < (noOfMelons * 2) /3) {
            watermelons.push(new Watermelon((index2 * 180) + 50, 200, 120, 110));
            index2++;
        } else {
            watermelons.push(new Watermelon((index3 * 180) + 50, 310, 120, 110));
            index3++;
        }
    }
}

//create watermelon objects
createWatermelones();


//draw level 1
function draw_game() {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw fonts
    draw_font(ctx, "Level ", level_no, 20, 40);
    draw_font(ctx, "Score: ", scoreCounter, 250, 42);

    //draw hearts
    draw_heart(ctx, heartCounter);

    //draw score box
    draw_scoreBox(ctx);

    //draw watermelons
    draw_watermelon_half(ctx, watermelons, watermelons.length);

    //draw knife
    draw_knife(ctx, xKnife, yKnife, wKnife, hKnife);

    //draw character
    // change_charSource("../assets/girlDefault.svg");
    draw_character(charX, charY, charWidth, charHeight);

    //draw seed
    draw_seed(ctx, seeds);

    //draw slice
    draw_slice(ctx, slices);

    //draw water
    if (waterAppear) {
        draw_water(ctx, waterLX, waterLY, waterRX, waterRY);
    }
}

//control character movement
document.onkeydown = function(e) {
    if (e.keyCode === 39 && charX <= canvas.width - charWidth - 10) {
        charX += charSpeed;
        if (yKnife === initialY) {
            xKnife += charSpeed;
        }
    } else if (e.keyCode === 37 && charX > 10) {
        charX -= charSpeed;
        if (yKnife === initialY) {
            xKnife -= charSpeed;
        }
    }
    draw_game();
}

//throw knife + cut watermelon + draw water + slice
document.onkeyup = function(e) {
        if (e.keyCode === 32) {
            $('#throwKnife')[0].volume = 1;
            $('#throwKnife')[0].play();
            let knifeInterval = window.setInterval(function() {
                if (yKnife > 20 && knifeHitFlag) {
                    yKnife -= knifeSpeed;
                } else {
                    yKnife = initialY;
                    xKnife =  charX + (charWidth * 0.85),
                    knifeHitFlag = true;
                    draw_game();
                    window.clearInterval(knifeInterval)
                }
                draw_game();
                watermelons.forEach(el => {
                    if (el !== null && el.xPoint <= xKnife && (el.xPoint + el.wSize) >= xKnife && el.yPoint <= yKnife && (el.yPoint + el.hSize / 2) >= yKnife) {
                        knifeHitFlag = false;
                        $('#stabWatermelon')[0].volume = 1;
                        $('#stabWatermelon')[0].play();
                        waterLX = el.xPoint, waterLY = el.yPoint;
                        waterRX = el.xPoint + waterW + 20, waterRY = el.yPoint;
                        waterAppear = true;
                        let waterAppearTimeOut = window.setTimeout(() => {
                            waterAppear = false
                        }, 500)
                        slices.push(new sliceConstructor(el.xPoint + el.wSize / 2, el.yPoint));
                        yKnife = initialY
                        watermelons[watermelons.indexOf(el)] = null;
                        scoreCounter += 5;
                        winCounter++;
                    }
                });

                if(winCounter === noOfMelons)
                {
                    localStorage.heartCounter = heartCounter;
                    localStorage.scoreCounter = scoreCounter;
                    setTimeout(() => {
                        window.location = "level2.html"; 
                    }, 5000);
                }

            }, 5);
        }
}


let seedInterval = window.setInterval(() => {
    let check = true //Checks if there is any watermelon left
    watermelons.forEach(w => {
        if (w != null) {
            check = false;
        }
    })
    if (check) {
        window.clearInterval(seedInterval);
    }
    let r = Math.floor(Math.random() * watermelons.length)
    if (watermelons[r] != null) {
        let w = watermelons[r];
        seeds.push(new seedConstructor(w.xPoint + w.wSize/2, w.yPoint + w.hSize))
    }
    draw_game();
}, 1000);


let seedAnimationInterval = window.setInterval(() => {
    seeds.forEach((s, i) => {
        if (s.y > charY && s.y <= (charY + charHeight) && s.x > charX && s.x <= (charX + charWidth)) {
            heartCounter--;
            $('#eatSeed')[0].volume = 1;
            $('#eatSeed')[0].play();
            if (heartCounter < 0) {
                $('#bgMusic').stop();
                setTimeout(() => {
                    window.location = "gameover.html";
                }, 1000);
            }
            seeds.splice(i, 1);
            character.src = "assets/girlSeed.svg";
            // draw_character(charX, charY, charWidth, charHeight);
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
            scoreCounter += 10;
            $('#eatSlice')[0].volume = 1;
            $('#eatSlice')[0].play();
            slices.splice(i, 1);
            // change_charSource("assets/girlEat.svg");
            character.src = "assets/girlEat.svg";
            draw_character(charX, charY, charWidth, charHeight);
        }
        if (s.y == 700) {
            slices.splice(i, 1);
        }

        s.y += 5
    });
    draw_game();
}, 50);


let characterChange = window.setInterval(() => {
    character.src = "assets/girlDefault.svg";
}, 2000);


let newGame = window.setTimeout(() => {
    draw_game();
    window.clearTimeout(newGame)
}, 0);

