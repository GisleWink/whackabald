const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const hpBoard = document.querySelector('.hp');
const people = document.querySelectorAll('.person');
console.log(people)

const candidates = ['bård','bård2','golden','pernille'];
let currentCandidate = '';
let timeUp = false; 
let score = 0; 
let hp = 0; 
let holeNmbr = 0
let hole = holes[0]
let running=false

//funksjon for å velge et tilfeldig hull personen skal dukke opp fra
function randomHole(holes){
    holeNmbr  = Math.floor(Math.random() * holes.length);
    hole = holes[holeNmbr];
    return hole;
}

//funskjon for å velge en tilfeldig person til å dukke opp
function randomCandidate(){
    return candidates[Math.floor(Math.random() * candidates.length)]

}

function peep() {
    const time = 3**(6.5-(score/20))+250; //tiden man har på å trykke er en funskjon av score
    const hole = randomHole(holes); //henter et tilfeldig hull
    child = hole.childNodes[1];
    window.currentCandidate = randomCandidate() //velger en tilfeldig person
    child.classList.add(window.currentCandidate);
    console.log(child)
    hole.classList.add('up'); //legger til css klassen "up" så personen kan dukke opp
    setTimeout(() => {
        if(window.currentCandidate!='pernille'&&hole.classList.contains('up')){ //hvis personen i hullet ikke er pernille
            hp = hp-1; //og du ikke rekker å trykke mister du et liv
            hpBoard.textContent = hp;
        }
        hole.classList.remove('up');
        child.classList.remove(window.currentCandidate);
        if(hp>0) {
            peep(); //hvis du har liv>0 fortsetter spillet
        }
        else{
            running==false;
        }
    }, time);
    
}

function startGame() { //funskjon for å starte spilet
    scoreBoard.textContent = 0;
    hpBoard.textContent = 3;
    timeUp = false;
    score = 0;
    difficulty = 200;
    peep();
    hp = 3;
    running=true;
}

function wack(e){ //funksjon for å registrere trykk med mus
    if(!e.isTrusted) return;
    if(window.currentCandidate=='pernille'){ //hvis du trykker, og personen er pernille mister du et liv
        hp = hp-1
        hpBoard.textContent = hp;
    }
    else{ //hvis du trykker og personen ikke er pernille blir spillet vanskeligere og du får et poeng
        score++;
    }
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

window.onkeydown = function(inn){ //funksjon for å registrere trykk på knapper
    if (running==false){
        startGame()
    }
    else{
        input = inn.key-1
        console.log(inn,input,holeNmbr+1)
        if (input == holeNmbr){
            console.log("test")
            if(window.currentCandidate=='pernille'){
                hp = hp-1
                hpBoard.textContent = hp;
            }
            else{
                score++;
            }
            
            hole.classList.remove('up');
            scoreBoard.textContent = score;
            holeNmbr = -1;
        }
    }
    if (hp<=0){
        running==false
    }

}
people.forEach(person => person.addEventListener('click', wack))