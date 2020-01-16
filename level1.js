var canvas = document.getElementById('myCanvas'), 
ctx = canvas.getContext('2d'), 
heartX = 80, heartY, watermelon_halfX = 80, watermelon_halfY = 100, sliceX, sliceY, seedX, seedY = 0;
var no_level = 1;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.font = "23px Comic Sans MS";
ctx.fillStyle = "#214D09";
ctx.fillText("LEVEL " + no_level, 10, 40);

function draw_background()
{
    background_img = new Image();
    background_img.src = "assets/background.svg";
    background_img.onload = function(){
    ctx.drawImage(background_img, 0, 0);
} }

function draw_score_box(){
    score_box = new Image();
    score_box.src = "assets/scoreBox.svg";
    score_box.onload = function(){
    ctx.drawImage(score_box, 250, 10, 170, 45); //
}}

function draw_heart(no_hearts)
{
    heart = new Image();
    heart.src = "assets/heart.png";
    heart.onload = function(){
    for(var i = 0; i < no_hearts; i++) {
        heartX += 40;
        heartY = 20;
        ctx.drawImage(heart, heartX, heartY, 25, 25);
    }
} }

function draw_watermelon_half()
{
    watermelon_half = new Image();
    watermelon_half.src = "assets/watermelon_half.svg";
    watermelon_half.onload = function(){
        for(let i = 0; i < 7; i++){
            watermelon_halfX += 150;
            watermelon_halfY = 100;
            ctx.drawImage(watermelon_half, watermelon_halfX, watermelon_halfY, 130,130);
            watermelon_halfY = 200;
            ctx.drawImage(watermelon_half, watermelon_halfX, watermelon_halfY, 130,130);
            watermelon_halfY = 300;
            ctx.drawImage(watermelon_half, watermelon_halfX, watermelon_halfY, 130,130);
        }
} }

function draw_slice()
{
    slice = new Image();
    slice.src = "assets/heart.png";
    slice.onload = function(){
    ctx.drawImage(slice, sliceX, sliceY);
} }

function draw_seed()
{
    seed = new Image();
    seed.src = "assets/heart.png";
    seed.onload = function(){
    ctx.drawImage(seed, seedX, seedY);
} }


function draw_knife()
{
    knife = new Image();
    knife.src = "assets/knife.svg";
    knife.onload = function(){
    ctx.drawImage(knife, knifeX, knifeY, 70, 70);
}}

draw_background();
draw_heart(3);
draw_score_box();
draw_watermelon_half();
knifeX = 500;
knifeY = 500;
draw_knife();
