var knife = new Image();
knife.src = "../assets/knife.svg";

export function draw_knife(ctx, xKnife, yKnife, wKnife, hKnife) {
    ctx.drawImage(knife, xKnife, yKnife, wKnife, hKnife);
}