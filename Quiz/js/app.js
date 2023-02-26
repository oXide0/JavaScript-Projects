const questionContent = document.querySelectorAll('.quiz__question');
const answerBtn = document.querySelectorAll('.answer__btn');
const answerContent = document.querySelectorAll('.answer__text');
const quizAnswer = document.querySelectorAll('.quiz__answer');


let trueAnswer = 0, j = 0, numberAnswers = 0;

const questions = {
    questionOne: {
        answers: ['1854', '1912', '1834', '1612', '1988'],
        answer: '1912',
    },
    questionTwo: {
        answers: ['George Washington', 'Thomas Jefferson', 'Thomas Edison', 'James Monroe', "I don't know"],
        answer: 'George Washington',
    },
    questionThree: {
        answers: ['Java', 'Python', 'JavaScript', 'C#', "PHP"],
        answer: 'C#',
    },
    questionFour: {
        answers: ['Stockholm', 'Oslo', 'Amsterdam', 'Helsinki', "Luxembourg"],
        answer: 'Luxembourg',
    },
    questionFive: {
        answers: ['Germany', 'France', 'Brazil', 'Argentina', "Croatia"],
        answer: 'Argentina',
    },
}

for(let i = 0; i < answerContent.length; i++) {
    answerContent[i].textContent = questions.questionOne.answers[i];
}

for(let i = 0; i < answerBtn.length; i++) {
    answerBtn[i].addEventListener('click', () => {
        numberAnswers++;

        if(numberAnswers == 1) {
            if(answerContent[i].textContent == questions.questionOne.answer) {
                trueAnswer++;
            }
            for(let i = 0; i < answerBtn.length; i++) {
                answerContent[i].textContent = questions.questionTwo.answers[i];
            }
        }else if(numberAnswers == 2) {
            if(answerContent[i].textContent == questions.questionTwo.answer) {
                trueAnswer++;
            }
            for(let i = 0; i < answerBtn.length; i++) {
                answerContent[i].textContent = questions.questionThree.answers[i];
            }
        }else if(numberAnswers == 3) {
            if(answerContent[i].textContent == questions.questionThree.answer) {
                trueAnswer++;
            }
            for(let i = 0; i < answerBtn.length; i++) {
                answerContent[i].textContent = questions.questionFour.answers[i];
            }
        }else if(numberAnswers == 4) {
            if(answerContent[i].textContent == questions.questionFour.answer) {
                trueAnswer++;
            }
            for(let i = 0; i < answerBtn.length; i++) {
                answerContent[i].textContent = questions.questionFive.answers[i];
            }
        }else if(numberAnswers == 5) {
            console.log(answerContent[i].textContent);
            if(answerContent[i].textContent == questions.questionFive.answer) {
                trueAnswer++;
            }
            questionContent[j].classList.remove('active'); 
            for(let i = 0; i < answerBtn.length; i++) {
                quizAnswer[i].style.display = 'none';
            }
            document.querySelector('.result').textContent = `Your result: ${trueAnswer}`;
            document.querySelector('.result').style.display = 'block';
        }
        
        questionContent[j].classList.remove('active');
        
        j++;
        if(j <= 4) {
            questionContent[j].classList.add('active');
        }
    });
}