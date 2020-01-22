let waterL = new Image();
waterL.src = "../assets/waterLeft.svg";
let waterR = new Image();
waterR.src = "../assets/waterRight.svg";

var waterW = 70, waterH = 90;

export function draw_water(ctx, waterLX, waterLY, waterRX, waterRY) {
    ctx.drawImage(waterL, waterLX, waterLY, waterW, waterH);
    ctx.drawImage(waterR, waterRX, waterRY, waterW, waterH);
}