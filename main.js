$('#newGame').click(
    function () {
        window.location = "level1.html";
    }
);


$('#credits').click(
    function () {
        $('.container').css("display", "none");
        $('.credits_container').css("display", "flex");
    }
);



$('#back').click(
    function () {
        window.location = "index.html";
        $('.credits_container').css("display", "none");
    }
);