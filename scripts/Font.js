export function draw_font(ctx, text, num, x, y) {
    ctx.font = "23px Comic Sans MS";
    ctx.fillStyle = "#214D09";
    ctx.fillText(text + num, x, y);
}