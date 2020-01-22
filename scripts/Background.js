var background_img = new Image();
background_img.src = "../assets/background.png";

export function draw_background(ctx) {
    ctx.drawImage(background_img, 0, 0);
}
