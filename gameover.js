// Play Again Button
document.querySelector("button").addEventListener("click", function(){
    window.location.href = "./game.html"
});

// Getting Scores and Name
document.querySelector(".playerName").innerHTML = "Player: " + localStorage.getItem("name");
document.querySelector(".score").innerHTML = localStorage.getItem("score");
document.querySelector(".highScore").innerHTML = localStorage.getItem("highScore");