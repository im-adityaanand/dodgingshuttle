// Info Button
document.querySelector(".info-button").addEventListener("click", function(){
    document.querySelector(".info-div").classList.toggle("na");
});

// Adding Names
document.querySelector(".play-button").addEventListener("click", function(){
    if(document.querySelector("input").value != ""){
        localStorage.setItem("name", document.querySelector('input').value);
        window.location.href = "./game.html";
    } else {
        alert("Please enter Player Name.");
    }
});

// Displaying scores
let score = localStorage.getItem("score");
let highScore = localStorage.getItem("highScore");
console.log(score);
console.log(highScore);
document.querySelector(".score").innerHTML = score;
document.querySelector(".highScore").innerHTML = highScore;