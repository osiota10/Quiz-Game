const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnsers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '12',
        answer: 2,
    },
    {
        question: 'Where is Stephen Keshi Stadium located?',
        choice1: 'Anambra State',
        choice2: 'Kogi State',
        choice3: 'Plateau State',
        choice4: 'Delta State',
        answer: 4,
    },
    {
        question: 'When did Nigeria Gained her independence?',
        choice1: '1906',
        choice2: '1999',
        choice3: '1960',
        choice4: '1963',
        answer: 3,
    },
    {
        question: 'Who is the 100m record holder for male?',
        choice1: 'Tyson Gay',
        choice2: 'Usian Bolt',
        choice3: 'Usain Bolt',
        choice4: 'Michael Rodgers',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerHTML = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerHTML = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnsers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnsers) return

        acceptingAnsers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })

})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()