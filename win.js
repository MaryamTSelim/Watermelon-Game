

$(document).ready(function(){

    //show score
    $('#win_score').text("Your Score: " + localStorage.scoreCounter);

    //return home btn
    $('#home').click(
        function () {
            window.location = "index.html";
        }
    );

});