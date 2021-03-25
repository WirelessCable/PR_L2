let preQuestions = null;

fetch('https://quiztai.herokuapp.com/api/quiz')
    	.then(resp => resp.json())
    	.then(resp => {
        	preQuestions = resp;
            setQuestion(index);
});

let next = document.querySelector('.next');
let previous = document.querySelector('.previous');

let question = document.querySelector('.question');
let answers = document.querySelectorAll('.list-group-item');

let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');
let index = 18;
let points = 0;

let list = document.querySelector('.list');
let results = document.querySelector('.results');

let question_number = document.querySelector('.question');
let userScorePoint = document.querySelector('.userScorePoint');
let average = document.querySelector('.average');


for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', doAction);
}

function doAction(event) {
    if (event.target.innerHTML === preQuestions[index].correct_answer) {
        points++;
        pointsElem.innerText = points;
        markCorrect(event.target);
    }
    else {
        markInCorrect(event.target);
    }
    disableAnswers();
}



restart.addEventListener('click', function (event) {
    event.preventDefault();

    index = 0;
    points = 0;
    let userScorePoint = document.querySelector('.score');
    userScorePoint.innerHTML = points;
    setQuestion(index);
    activateAnswers();
    list.style.display = 'block';
    results.style.display = 'none';
});

function clearClass(){
	
	for (let i = 0; i < answers.length; i++) {
		if( answers[i].classList.contains('correct') ){
			answers[i].classList.remove('correct');
		}
		if( answers[i].classList.contains('incorrect') ){
			answers[i].classList.remove('incorrect');
		}
	}
	
}

function setQuestion(index){
	clearClass();
	question.innerHTML = preQuestions[index].question;
	
	if(preQuestions[index].answers.length === 2){
		answers[2].style.display = 'none';
		answers[3].style.display = 'none';
	}else{
		answers[2].style.display = 'block';
		answers[3].style.display = 'block';
	}
	
	answers[0].innerHTML = preQuestions[index].answers[0];
	answers[1].innerHTML = preQuestions[index].answers[1];
	answers[2].innerHTML = preQuestions[index].answers[2];
	answers[3].innerHTML = preQuestions[index].answers[3];
}


next.addEventListener('click', function () {
//	if(index < 19){
		index++;
		if(index >= preQuestions.length){
			list.style.display = 'none';
			results.style.display = 'block';
			userScorePoint.innerHTML = points;
			
			let currentPoints = localStorage.getItem("punkty");
			if( currentPoints ){
				currentPoints = +currentPoints;
			}
			points = ( points + currentPoints ) / 2;
			localStorage.setItem("punkty", points);
			average.innerHTML = points;
			question_number.innerHTML = index;
		}else{
			setQuestion(index);
			activateAnswers();
		}
//	}
});

previous.addEventListener('click', function () {
	if(index > 0){
		index--;
		setQuestion(index);
		activateAnswers();		
	}
});

function activateAnswers(){
	for( let i = 0 ; i < answers.length ; i++ ){
		answers[ i ].addEventListener('click', doAction);
	}
}
function disableAnswers(){
	for( let i = 0 ; i < answers.length ; i++ ){
		answers[ i ].removeEventListener('click', doAction);
	}
}
activateAnswers();

function markCorrect(elem){
	elem.classList.add('correct');
}
function markInCorrect(elem){
	elem.classList.add('incorrect');
}



