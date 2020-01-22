
let character = new Image(); 

export function change_charSource(source) {
    character.src = source;
} 

export function draw_character(ctx, charX, charY, charWidth, charHeight) {
    ctx.drawImage(character, charX, charY, charWidth, charHeight)
}