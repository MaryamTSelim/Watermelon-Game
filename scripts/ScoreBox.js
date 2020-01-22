let score_box = new Image();
score_box.src = "../assets/scoreBox.svg";

export function draw_scoreBox(ctx) {
    ctx.drawImage(score_box, 220, 10, 170, 47);

}