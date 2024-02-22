let timerelement = document.getElementById("timer");
let gamebody = document.getElementById("game-body");
timerelement.innerHTML = 60;
let timerspan = 60;

let zombiearray = [
  "./assets/zombie-1.png",
  "./assets/zombie-2.png",
  "./assets/zombie-3.png",
  "./assets/zombie-4.png",
  "./assets/zombie-6.png",
  "./assets/zombie-5.png",
];

let lives = 4;
let uniqueid = 0;

gamebody.addEventListener("click", function () {
  let shotgunsound = new Audio("./assets/shotgun.wav");
  shotgunsound.play();
});

let bgm = new Audio("./assets/bgm.mp3");
bgm.play();
bgm.loop = true;

let createzombie = function () {
  let zombierandom = zombiearray[Math.floor(Math.random() * 6)];
  let randomsec = Math.floor(Math.random() * (10 - 3)) + 3;
  let screenoccupiedrandom = Math.floor(Math.random() * (80 - 20)) + 20;

  gamebody.innerHTML += `<img src="${zombierandom}" alt="" id="zombieId-${uniqueid}" class="zombie-image">`;
  let getzombieimg = document.getElementById(`zombieId-${uniqueid}`);

  getzombieimg.style.transform = `translateX(${screenoccupiedrandom}vw)`;
  getzombieimg.style.animationDuration = `${randomsec}s`;
  getzombieimg.addEventListener("click", () => destroyzombie(getzombieimg));
  uniqueid++;
};

function destroyzombie(getzombieimg) {
  getzombieimg.style.display = "none";
  createzombie();
}

setInterval(() => {
  timerspan -= 1;
  document.getElementById("timer").innerHTML = timerspan;

  let getzombieimg = document.getElementById(`zombieId-${uniqueid - 1}`);
  if (getzombieimg && getzombieimg.getBoundingClientRect().top <= 0) {
    lives--;
    destroyzombie(getzombieimg);
  }

  if (timerspan == 0) {
    window.location.href = "./win.html";
  }

  if (lives == 3) {
    document.querySelector("#max-lives").style.width = "75%";
  } else if (lives == 2) {
    document.querySelector("#max-lives").style.width = "50%";
  } else if (lives == 1) {
    document.querySelector("#max-lives").style.width = "25%";
  } else if (lives == 0) {
    document.querySelector("#max-lives").style.width = "0%";
    window.location.href = "./game-over.html";
  }
}, 1000);

createzombie();
