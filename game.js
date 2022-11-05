// Requirements
let speed = 0.7;
let score = 0;
let highScore;
let started = false;
let gameBody = document.querySelector(".game-body");
let ship;
let moveBy = 80;

const bgSound = new Audio("./assets/bg-sound.wav");
const asteroidSound = new Audio("./assets/asteroid.wav");
const collisionSound = new Audio("./assets/collision.m4a");


// Creating Asteroid
function summonAsteroid(){
    if(started){
        gameBody.innerHTML += `<div><img class='asteroid na' src='./assets/asteroid.png' /></div>`;

            let asteroid = document.querySelector(".asteroid");
            asteroid.style.animationDuration = speed + "s";
            asteroid.style.left = Math.random()*80 + "vw";
            asteroid.classList.remove("na");

            asteroidSound.play();
    }
}

// Terminating Asteroid
function destory(){
    document.querySelector(".asteroid").parentNode.remove();
    score++;
    document.querySelector("#score").innerHTML = score;
}

// Starting the Game
function startGame(){
    window.addEventListener("load", function(){
        document.addEventListener("click", function(){
            if(!started){
                started = true;
                gameBody.innerHTML += `<div><img id="shuttle" src='./assets/shuttle.png'></div>`;
                document.querySelector(".click-to-start").classList.add("na");
                summonAsteroid();
                highScore = 0;
                bgSound.play();
                bgSound.loop = true;
            }    
        });
    });
}
startGame();


// Spawning Asteroids
let spawnInterval = setInterval(function(){
    if(started){
        destory();
        summonAsteroid();
        
    }
    speed -= 0.01;
}, 1000)


// Controlling the Spaceship
window.addEventListener("keydown", function(event){
    ship = document.querySelector("#shuttle");
    let rect = ship.getBoundingClientRect();
    // console.log(rect);
    switch(event.key){
        case "ArrowLeft":
            if(parseInt(rect.left) > 50){
                ship.style.left = (parseInt(rect.left) - moveBy) + "px";
            }
            break;
        case "ArrowRight":
            if(parseInt(rect.left) < screen.width){
                ship.style.left = (parseInt(rect.left) + moveBy) + "px";
            }
            break;
    }
});

// Detecting Collision / Game Over
setInterval(function(){
    if(started){
        let asteroid = document.querySelector(".asteroid");
        let ship = document.querySelector("#shuttle");
        let aRect = asteroid.getBoundingClientRect();
        let sRect = ship.getBoundingClientRect();

        if(
            sRect.x > aRect.x + aRect.width ||
            sRect.x + sRect.width < aRect.x ||
            sRect.y > aRect.y + aRect.height ||
            sRect.y + sRect.height < aRect.y
        ) {
            // do nothing
        } else {
            localStorage.setItem("score", score);
            if(score > localStorage.getItem("highScore")){
                highScore = score
                localStorage.setItem("highScore", highScore);
            }
            clearInterval(spawnInterval);
            asteroid.remove();
            ship.remove();
            started = false;
            bgSound.pause();
            collisionSound.play();
            setTimeout(function(){
                window.location.href = "./gameover.html";
            }, 1300);       
        }
    }
}, 10);



