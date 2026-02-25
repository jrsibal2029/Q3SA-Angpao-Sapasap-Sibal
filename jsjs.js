const foods = ["Waffle","Pie","Pancakes","Macarons","Cake","Cookies","Sorbet","Donut","Cupcake","Croissant"];

const item1 = document.getElementById("item1");
const item2 = document.getElementById("item2");
const ppllefth2 = document.getElementById("peopleleft");
const item3 = document.getElementById("item3");
const item4 = document.getElementById("item4");
const item5 = document.getElementById("item5");
const item6 = document.getElementById("item6");
const timedisplayp = document.getElementById("time");
const timeleftp = document.getElementById("timeleft");
var peopleLeft = 2;
var multi = 0;
var needed = 0;


const difficulties = [
    { name: "Easy", orders: 3, time: 10, people: 7, score: 200, multi: 10},
    { name: "Medium", orders: 4, time: 8, people: 10, score: 300, multi: 12 },
    { name: "Hard", orders: 6, time: 8, people: 15, score: 400, multi: 20 },
]



function closeabt(){
  document.getElementById("abtdevs").style.display = 'none';
}

var difficulty;

var score = 0;

var scorefromtime = 0;

let currentorder = [];

let orderInterval = null;
var timeLeft;

function pickRandom(array, count) {
  const result = [];

  for (let i = 0; i < count; i++) {
    const random = Math.floor(Math.random() * array.length);
    result.push(array[random]);
  }

  return result;
}

document.getElementById("abt").onclick = function () {
    if (document.getElementById("abtdevs").style.display === "block") {
        document.getElementById("abtdevs").style.display = "none";
    } else {    
    document.getElementById("abtdevs").style.display = "block";
    }
};

document.getElementById("startbtn").onclick = function () {
  playmusic();
    document.getElementById("startbtn").style.display = "none";
    document.getElementById("intro").style.display = "none";
}

for (const element of document.getElementsByClassName("diff")) { 
  element.onclick = function () {
    document.getElementById("buttondivs").style.display = "none";
    difficulty = element.id;
    peopleLeft = difficulties.find(diff => diff.name === difficulty).people;
    multi = difficulties.find(diff => diff.name === difficulty).multi;
    needed = difficulties.find(diff => diff.name === difficulty).score;

    makeOrder();
  };

}

function makeOrder() {
  clearInterval(orderInterval); 

  currentorder = pickRandom(foods, difficulties.find(diff => diff.name === difficulty).orders);
  updatethings();
  ordertime();
}


function updatethings() {
  item1.innerHTML = currentorder[0];
  item2.innerHTML = currentorder[1];
  item3.innerHTML = currentorder[2];
  item4.innerHTML = currentorder[3] || "";  
  item5.innerHTML = currentorder[4] || "";  
  item6.innerHTML = currentorder[5] || "";  
  ppllefth2.innerHTML = peopleLeft;
  
}


function ordertime() {
  timeLeft = difficulties.find(diff => diff.name === difficulty).time;
  timeleftp.innerHTML = timeLeft;

  orderInterval = setInterval(() => {
    timeLeft--;
    timeleftp.innerHTML = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(orderInterval);

      if (!currentorder.every(item => item === "Done!")) {
        currentorder = currentorder.map(() => "Failed!");
        updatethings();
        peopleleft();

        setTimeout(() => {
          resetCountdown();
        }, 1000);
      }
    }
  }, 1000);
}



function resetCountdown() {
  let resetTime = 5;
  timedisplayp.innerHTML = resetTime;

  const resetInterval = setInterval(() => {
    resetTime--;
    timedisplayp.innerHTML = resetTime;

    if (resetTime <= 0) {
      clearInterval(resetInterval);
      makeOrder();
    }
  }, 1000);
}

function playmusic() {
  const bgm = document.getElementById("bgmusic");
  bgm.play();
}

function peopleleft(){
    peopleLeft--;
        
        if (peopleLeft <= 0) {
            if (scorefromtime < needed){
              alert("You lost! Your score: " + scorefromtime);
            } else {
              alert("Congrats! Your score: " + scorefromtime);
            }
          location.reload();
        }
}



for (const element of document.getElementsByClassName("order")) {
  element.onclick = function () {
    if (currentorder.includes(element.id)) {
        
        

      const index = currentorder.indexOf(element.id);
      currentorder[index] = "Done!";

      updatethings();


      if (currentorder.every(item => item === "Done!")) {
        
        clearInterval(orderInterval);
        scorefromtime += timeLeft*multi;
        document.getElementById("score").innerHTML = scorefromtime;
        resetCountdown();
        peopleleft();
      }
    }
  };
}

