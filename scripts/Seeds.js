var seed = new Image();
seed.src = "assets/seed.svg";

export function draw_seed(ctx, seeds) {
    seeds.forEach(s => {
        ctx.drawImage(seed, s.x, s.y, 18, 23);
    })

}

