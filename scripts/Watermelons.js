var watermelon_half = new Image();
watermelon_half.src = "assets/watermelon_half.svg";

export function draw_watermelon_half(ctx, watermelons, length) {
    for (let i = 0; i < length; i++) {
        if (watermelons[i] !== null) {
            ctx.drawImage(watermelon_half, watermelons[i].xPoint, watermelons[i].yPoint, watermelons[i].wSize, watermelons[i].hSize);
        }
    }

}