const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#id');
const inputDiv = document.getElementById("input-div");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = ; 60// or any other starting value
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  

// startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", function() {
  

  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    score.textContent='Enter Your name and id to start the quiz.'
    return;
  }

  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;

function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= finalMarks- totalMarks
// Create a new pie chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Marks", "Total Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ["#36A9EB", "#546D6A"],
      },
    ],
  },
});

      }
    }, 1000);

    timerStarted = true;
  }
}


function startQuiz() {

nameField.disabled=true
idField.textContent =`Id:${idField.value}`
idField.disabled=true
  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);

  
}



function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    yourScore.textContent = "Your final score is " + marks;
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}



function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
    console.log(finalMarks);
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "In what year was the UN established.",
    answers: [
      { text: "1957", correct: false },
      { text: "1945", correct: true },
      { text: "1997", correct: false },
      { text: "1990", correct: false },
    ],
  },
  {
    question: "What show on netflix had the most streaming views in 2021?"?',
    answers: [
      { text: "Bridgeton", correct: false },
      { text: "Squid Game", correct: true },
      { text: "Eternals", correct: false },
      { text: "Blacklist", correct: false },
    ],
  },
  {
    question: "What is the world's fastest bird?",
    answers: [
      { text: " Panda", correct: false },
      { text: "Hawks", correct: false },
      { text: "Peregrine Falcon", correct: true },
      { text: "squable", correct: false },
    ],
  },
  {
    question: "What is the capital of Ghana?",
    answers: [
      { text: "Lagos", correct: false },
      { text: "Kumasi", correct: false },
      { text: "Accra", correct: true },
      { text: "Dakar", correct: false },
    ],
  },
  {
    question: "The body part that is fully grown from birth is........",
    answers: [
      { text: "The eye", correct: true },
      { text: "The genitalia", correct: false },
      { text: "the torso", correct: false },
      { text: "the head", correct: false },
    ],
  },
  {
    question: "How many dots appear on a pair of dice?",
    answers: [
      { text: "22", correct: false },
      { text: "78", correct: false },
      { text: "42", correct: true },
      { text: "15", correct: false },
    ],
  },
];
