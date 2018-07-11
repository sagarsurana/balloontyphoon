'use strict';

let score = 0;
let balloonColors = ["blue", "green", "purple", "red", "yellow", "orange"]; //colors array
let targets = []; //colors that can be popped
let balloonCurr = [{}]; // all balloons on the screen
let level = 1;
let indices = [];

let startButton = document.querySelector("#start");
startButton.addEventListener('click', function () {
    startButton.style.display = "none";
    startGame();
});

let restartButton = document.querySelector("#restart");
restartButton.addEventListener('click', function () {
    location.reload();
});

function startGame() {
    for (let i = 0; i < level; i++) {
        targetDecider();
        populate(10);
    }
}

function targetDecider() {
    let random = -1;
    while (!indices.includes(random)) {
        console.log(indices);
        random = Math.floor(Math.random() * 6);
        console.log(random);
        if (!indices.includes(random)) {
            indices.push(random);
        }
        console.log(indices);
    }
    createBalloonType(balloonColors[random]);
}

function createBalloonType(color) {
    let div = document.getElementById("targetimages");
    let targetImg = document.createElement("img");
    targetImg.src = "./img/" + color + ".png";
    targetImg.alt = "" + color + " balloon";
    targetImg.classList.add("targetBalloon");
    div.appendChild(targetImg);
    targets.push(color);
}

function populate(number) {
    let bla = setInterval(helper, 450);
    let count = 0;
    function helper() {
        if (count == number) {
            clearInterval(bla);
        } else {
            count++;
            flyTargetBalloon();
        }
    }
}

function flyTargetBalloon() {
    let section = document.getElementsByTagName("section")[0];
    let r = Math.floor(Math.random() * targets.length);
    let balloon = document.createElement("img");
    balloon.src = "./img/" + targets[r] + ".png";
    balloon.alt = "" + targets[r] + " balloon";
    balloon.classList.add("pop");
    let random = Math.floor(Math.random() * screen.width);
    balloon.style.left = random + "px";
    balloon.style.bottom = '0px';
    balloon.id = balloonCurr.length + "";
    section.appendChild(balloon);
    balloonCurr.push({
        'popped': false,
    });
    popBalloon(balloon);
    let position = -50;
    let id = setInterval(balloonFloat, 10);

    function balloonFloat() {
        console.log(balloon.style.display);

        if (balloon.style.display == 'none') {
            clearInterval(id);
        } else if (position == screen.height) {
            clearInterval(id);
            terminateLost();
        } else {
            position++;
            balloon.style.bottom = position + "px";
        }
    }
}

function popBalloon(balloon) {
    balloon.addEventListener('click', function () {

        balloonCurr[balloon.id]['popped'] = true;
        balloon.style.display = 'none';
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
        let response = didWin();
        if (response == true) {
            won();
        }
    });
}

function terminateLost() {
    let sec = document.getElementsByTagName("section")[0];
    sec.style.display = 'none';
    let re = document.getElementById("restart");
    re.style.display = 'block';
}

function didWin() {
    let response = true;
    for (let i = 0; i < balloonCurr.length; i++) {
        if (balloonCurr[i]['popped'] == false) {
            return false;
        }
    }
    return response;
}


let levelUp = document.querySelector("#levelUp");
levelUp.addEventListener('click', function () {
    levelUp.style.display = 'none';
    startGame();
});

let wonGame = document.querySelector("#won");
wonGame.addEventListener('click', function () {
    location.reload();
});

function won() {
    if (level == 2) {
        let wonGame = document.querySelector("#won");
        wonGame.style.display = 'block';
    } else if (level == 1) {
        let sec = document.getElementsByTagName("section")[0];
        sec.innerHTML = "";
        let levelUp = document.querySelector("#levelUp");
        levelUp.style.display = 'block';
        let targetImages = document.querySelector("#targetimages");
        targetImages.innerHTML = "";
        targets = [];
        balloonCurr = [{}];
        balloonColors = ["blue", "green", "purple", "red", "yellow", "orange"];
        level++;
        indices = [];
    }
}




