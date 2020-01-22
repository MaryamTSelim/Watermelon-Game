let heart = new Image();
heart.src = "../assets/heart.png";

export function draw_heart(ctx, noOfHearts) {
    let heartX = 80;
    for (let i = 0; i < noOfHearts; i++) {
        heartX += 40;
        ctx.drawImage(heart, heartX, 20, 25, 25);
    }
}