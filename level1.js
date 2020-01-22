//select canavs, set canavs width + height
var canvas = $('#myCanvas')[0];
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 7;


//declare variables
var heartX = 80,
    heartY, sliceX, sliceY;
var no_level = 1;


//water variables
var waterRX, waterRY,
    waterLX, waterLY,
    waterW = 70,
    waterH = 90,
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
    yKnife = initialY = charY + charHeight * 0.55,
    knifeHitFlag = true;


var watermelons = [];
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
createWatermelones();
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
character = new Image();
character.src = "assets/girlDefault.svg";

function drawCharacter(charX, charY, charWidth, charHeight) {
    ctx.drawImage(character, charX, charY, charWidth, charHeight)

}

//draw background function
// background_img = new Image();
// background_img.src = "assets/background.svg";

// function draw_background() {
//     ctx.drawImage(background_img, 0, 0);

// }

//draw score box function
score_box = new Image();
score_box.src = "assets/scoreBox.svg";

function draw_score_box() {
    ctx.drawImage(score_box, 250, 10, 170, 45);

}

//draw heart function
heart = new Image();
heart.src = "assets/heart.png";
var heartCounter = 3;

function draw_heart(no_hearts) {
    heartX = 80;
    for (let index = 0; index < no_hearts; index++) {
        heartX += 40;
        ctx.drawImage(heart, heartX, 20, 25, 25);

    }

}

//draw watermelon function
watermelon_half = new Image();
watermelon_half.src = "assets/watermelon_half.svg";

function draw_watermelon_half() {
    for (let i = 0; i < watermelons.length; i++) {
        if (watermelons[i] !== null) {
            ctx.drawImage(watermelon_half, watermelons[i].xPoint, watermelons[i].yPoint, watermelons[i].wSize, watermelons[i].hSize);
        }
    }

}

//draw slice function
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


//draw seed function
let seeds = [];
seed = new Image();
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


//draw water function
waterL = new Image();
waterL.src = "assets/waterLeft.svg";
waterR = new Image();
waterR.src = "assets/waterRight.svg";

function draw_water(waterLX, waterLY, waterRX, waterRY) {
    ctx.drawImage(waterL, waterLX, waterLY, waterW, waterH);
    ctx.drawImage(waterR, waterRX, waterRY, waterW, waterH);

}


//draw knife function
knife = new Image();
knife.src = "assets/knife.svg";

function draw_knife(xKnife, yKnife, wKnife, hKnife) {
    ctx.drawImage(knife, xKnife, yKnife, wKnife, hKnife);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFont();
    drawFont1()
    draw_heart(heartCounter);
    draw_score_box();
    //draw knife
    draw_knife(xKnife, yKnife, wKnife, hKnife);
    //draw character
    drawCharacter(charX, charY, charWidth, charHeight);

    //draw watermelons
    draw_watermelon_half()

    //draw seed
    draw_seed();

    //draw slice
    draw_slice();

    //draw water
    if (waterAppear) {
        draw_water(waterLX, waterLY, waterRX, waterRY);
    }
}

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

document.onkeyup = function(e) {
        if (e.keyCode === 32) {
            $('#throwKnife')[0].play();
            let knifeInterval = window.setInterval(function() {
                if (yKnife > 20 && knifeHitFlag) {
                    yKnife -= 5;
                } else {
                    yKnife = initialY;
                    knifeHitFlag = true;
                    drawGame();
                    window.clearInterval(knifeInterval)
                }
                drawGame();
                watermelons.forEach(el => {
                    if (el !== null && el.xPoint <= xKnife && (el.xPoint + el.wSize) >= xKnife && el.yPoint <= yKnife && (el.yPoint + el.hSize / 2) >= yKnife) {
                        knifeHitFlag = false;
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
                        counter += 5;
                    }
                });
            }, 10);
        }
    }
    // console.log(char.x,char.y);
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
        seeds.push(new seedConstructor(w.xPoint + w.wSize / 2, w.yPoint + w.hSize))
    }
    drawGame();
}, 1000)

let seedAnimationInterval = window.setInterval(() => {
    seeds.forEach((s, i) => {
        if (s.y > charY && s.y <= (charY + charHeight) && s.x > charX && s.x <= (charX + charWidth)) {
            heartCounter--;
            seeds.splice(i, 1);
            character.src = "assets/girlSeed.svg";
        }
        if (s.y == 700) {
            seeds.splice(i, 1);
        }
        s.y += 5
    });
    drawGame();
}, 50);

let sliceAnimationInterval = window.setInterval(() => {
    slices.forEach((s, i) => {
        if (s.y > charY && s.y <= (charY + charHeight) && s.x > charX && s.x <= (charX + charWidth)) {
            counter += 10;
            slices.splice(i, 1);
            character.src = "assets/girlEat.svg";
        }
        if (s.y == 700) {
            slices.splice(i, 1);
        }

        s.y += 5
    });
    drawGame();
}, 50);

let characterChange = window.setInterval(() => {
    character.src = "assets/girlDefault.svg";
}, 2000);

let newGame = window.setTimeout(() => {
    // document.getElementById("bgMusic").play();
    drawGame();
    window.clearTimeout(newGame)
}, 0);
