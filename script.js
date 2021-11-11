const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const hpBoard = document.querySelector('.hp');
const bårds = document.querySelectorAll('.bård');
const goldens = document.querySelectorAll('.golden');
const pernilles = document.querySelectorAll('.pernille');
const people = document.querySelectorAll('.person');
console.log(people)
const candidates = ['bård','golden','pernille']
const currentCandidate = ''

let lastHole;
let timeUp = false;
let score = 0;
let hp = 0;
let difficulty = 200
let holeNmbr = 0
let hole = holes[0]

//create a function to make a random time for bård to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    holeNmbr  = Math.floor(Math.random() * holes.length);
    hole = holes[holeNmbr];
    return hole;
}

function randomCandidate(){
    return candidates[Math.floor(Math.random() * candidates.length)]

}

function peep() {
    const time = 1000*difficulty/100;
    const hole = randomHole(holes); //get the random hole from the randomHole function
    child = hole.childNodes[1];
    window.currentCandidate = randomCandidate()
    child.classList.add(window.currentCandidate);
    console.log(child)
    hole.classList.add('up'); //add the CSS class so selected bård can "pop up"
    setTimeout(() => {
        if(window.currentCandidate!='pernille'&&hole.classList.contains('up')){
            hp = hp-1;
            hpBoard.textContent = hp;
        }
        hole.classList.remove('up');
        child.classList.remove(window.currentCandidate);
        if(hp>0) {
            peep();
        }
    }, time);
    
}

function startGame() {
    scoreBoard.textContent = 0;
    hpBoard.textContent = 3;
    timeUp = false;
    score = 0;
    peep();
    hp = 3;
}

function wack(e){
    if(!e.isTrusted) return;
    if(window.currentCandidate=='pernille'){
        hp = hp-1
        hpBoard.textContent = hp;
        score = score -1
    }
    else{
        if (score<20){
            difficulty = difficulty*0.85+10
        }
        else{
            difficulty = difficulty*0.95
        }
    }
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

window.onkeydown = function(inn){
    input = inn.key-1
    console.log(inn,input,holeNmbr+1)
    if (input == holeNmbr){
        console.log("test")
        if(window.currentCandidate=='pernille'){
            hp = hp-1
            hpBoard.textContent = hp;
            score = score -1
        }
        else{
            if (score<20){
                difficulty = difficulty*0.85+10
            }
            else{
                difficulty = difficulty*0.95
            }
        }
        score++;
        hole.classList.remove('up');
        scoreBoard.textContent = score;
    }
    else{
        hp = hp-1
        hpBoard.textContent = hp;
    }
    
}
people.forEach(person => person.addEventListener('click', wack))
//people.forEach(person => person.addEventListener('keydown', test))