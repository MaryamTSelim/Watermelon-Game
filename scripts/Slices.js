var slice = new Image();
slice.src = "../assets/slice.svg";

export function draw_slice(ctx, slices) {
    slices.forEach(s => {
        ctx.drawImage(slice, s.x, s.y, 30, 30)
    })
}