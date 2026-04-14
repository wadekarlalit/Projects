// let a = "Tic Tac Toe";
// console.log(a)

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "0";
let isGameover = false;

const changeTurn = () => {
  return turn === "x" ? "0" : "x";
};

const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, -48, -92, 0],
    [3, 4, 5, -44, 58, 0],
    [6, 7, 8, -48, 176, 0],
    [0, 3, 6, -88, 83, 90],
    [1, 4, 7, 42, 107, 90],
    [2, 5, 8, 174, 97, 90],
    [0, 4, 8, -1, 47, 47],
    [2, 4, 6, -89, 82, -49],
  ];
  wins.forEach((e) => {
    if (
      (boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
      (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
      (boxtext[e[0]].innerText !== "")
    ){
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " is Won";
    isGameover = true;
    document.querySelector('.line').style.width = '440px';
    document.querySelector('.line').style.transform  = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`;
    // document.querySelector('.line').style.transform  = `translate(-44px, 58px) rotate(0deg)`;
    gameover.play();
    setTimeout(function() {
      music.play()
      document.getElementById('won-img').classList.add('img');
    }, 3000)
    

  }
});
};

// Main Logic
// music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");

  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      

    }
       if(!isGameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn For " + turn;
          

      }
  });
});

let rst = document.getElementById('reset');
rst.addEventListener('click', ()=>{
  location.reload();
});

