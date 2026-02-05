console.log("JS connected successfully");

const currentVal = 0;
const preVal = 0;
const history = [];
let numbers = document.getElementById("btn");

numbers.addEventListener("click", add)

function add(e){
    console.log("hello", typeof(e.target.value))
}