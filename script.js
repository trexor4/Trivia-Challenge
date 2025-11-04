// --- Simple Trivia Data ---
// (Later, this can come from a database or microservice)
const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "Berlin", "Madrid", "Rome"],
    correct: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Mercury"],
    correct: "Mars"
  },
  {
    question: "What is 5 + 7?",
    answers: ["10", "11", "12", "13"],
    correct: "12"
  }
];

let currentQuestion = null;
let score = 0;

// --- Select Elements ---
const questionBtn = document.getElementById("get-question");
const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const questionArea = document.getElementById("question-area");

// --- Event Listener for Button ---
questionBtn.addEventListener("click", showQuestion);

function showQuestion() {
  // Pick a random question
  const randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[randomIndex];

  // Update the UI
  questionText.textContent = currentQuestion.question;
  questionArea.classList.remove("hidden");

  // Clear old answers & feedback
  answersDiv.innerHTML = "";
  feedback.textContent = "";

  // Create answer buttons
  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => checkAnswer(answer));
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === currentQuestion.correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `❌ Try again! The correct answer was ${currentQuestion.correct}.`;
    feedback.style.color = "red";
  }

  // Update score display
  scoreDisplay.textContent = `Score: ${score}`;

  // Disable answer buttons after selection
  const buttons = answersDiv.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
}