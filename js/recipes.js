//rating stars
const stars = document.querySelectorAll(".stars i");

stars.forEach((star, index1) => {
   star.addEventListener("click", () => {
     stars.forEach((star, index2) => {
      
       index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
     });
   });
});


//mouseover with icons
document.addEventListener('DOMContentLoaded', () => {
    const prepTimeIcon = document.getElementById('prep-time');
    const prepTimeClue = document.getElementById('prep-time-clue');
    const cookTimeIcon = document.getElementById('cook-time');
    const cookTimeClue = document.getElementById('cook-time-clue');
    const servingIcon = document.getElementById('serving');
    const servingClue = document.getElementById('serving-clue');
  
    function showClue(clue) {
      clue.style.display = 'block';
    }
  
    function hideClue(clue) {
      clue.style.display = 'none';
    }
  
    prepTimeIcon.addEventListener('mouseover', () => {
      showClue(prepTimeClue);
    });
  
    prepTimeIcon.addEventListener('mouseout', () => {
      hideClue(prepTimeClue);
    });
  
    cookTimeIcon.addEventListener('mouseover', () => {
      showClue(cookTimeClue);
    });
  
    cookTimeIcon.addEventListener('mouseout', () => {
      hideClue(cookTimeClue);
    });
  
    servingIcon.addEventListener('mouseover', () => {
      showClue(servingClue);
    });
  
    servingIcon.addEventListener('mouseout', () => {
      hideClue(servingClue);
    });
});


//to top button
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}

window.addEventListener('scroll', function () {
  var scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (document.documentElement.scrollTop > 100) {
      scrollToTopBtn.style.display = 'block';
  } else {
      scrollToTopBtn.style.display = 'none';
  }
});




// Quiz
function showQuiz() {
  const app = document.querySelector('.app');
  app.style.display = 'block';
}

// Event listener for keypress
document.addEventListener('keydown', function (event) {
  const keyCombination = event.ctrlKey && event.shiftKey && event.key === 'Q';
  if (keyCombination) {
    showQuiz();
  }
});


const questions = [
  {
      question: "What are the key ingredients needed to make Belgian Waffles?", 
      answers: [
          { text: "Flour, eggs, milk, sugar, baking powder", correct: true},
          { text: "Rice, tomatoes, cheese, olives, olive oil", correct: false},
          { text: "Chicken, lettuce, mayo, bread, pickles", correct: false},
          { text: "Potatoes, onions, bell peppers, eggs, sausage", correct: false}, 
      ]
  },

  {
      question: "Which cuisine is Shakshuka originally from?", 
      answers: [
          { text: "Italian", correct: false},
          { text: "Indian", correct: false},
          { text: "Middle Eastern/North African", correct: true},
          { text: "Chinese", correct: false}, 
      ]
  },

  {
      question: "What are the main ingredients for making a Strawberry Banana Smoothie?", 
      answers: [
          { text: "Strawberries, bananas, spinach, yogurt, honey", correct: true},
          { text: "Chicken, rice, broccoli, tomatoes, orange juice", correct: false},
          { text: "Apples, carrots, kale, almond milk, maple syrup", correct: false},
          { text: "Strawberries, bananas, milk, honey, ice cream", correct: false}, 
      ]
  },

  {
      question: "Name a common topping or garnish for Belgian Waffles.", 
      answers: [
          { text: "Ketchup", correct: false},
          { text: "Whipped cream and berries", correct: true},
          { text: "Soy sauce", correct: false},
          { text: "Mustard", correct: false}, 
      ]
  },

  {
      question: "What are some possible side dishes or accompaniments for Shakshuka?", 
      answers: [
          { text: "French fries", correct: false},
          { text: "Toast or crusty bread", correct: true},
          { text: "Pasta", correct: false},
          { text: "Sushi", correct: false}, 
      ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn-ans");
      answerButtons.appendChild(button);
      if(answer.correct){
          button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
  })
}

function resetState() {
  nextButton.style.display = "none";
  while(answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if(isCorrect) {
      selectBtn.style.background = '#9aeabc';
      score++;
  } else {
      selectBtn.style.background = '#ff9393'; 
  }
  Array.from(answerButtons.children).forEach(button => {
      if(button.dataset.correct === "true") {
          button.classList.add("correct");
      }
      button.disabled = true;
  });
  nextButton.style.display = "block";
}


function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
      showQuestion();
  }else {
      showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
      handleNextButton();
  }else {
      startQuiz();
  }
})

startQuiz();
