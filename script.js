const questions = [
  { question: "What is the capital of France?", answers: ["Paris", "Berlin", "Madrid", "Rome"], correct: "Paris" },
  { question: "Which planet is known as the Red Planet?", answers: ["Venus", "Mars", "Jupiter", "Mercury"], correct: "Mars" },
  { question: "What is 5 + 7?", answers: ["10", "11", "12", "13"], correct: "12" }
];

let currentIndex = null;
let previousIndex = null;
let score = 0;

const questionBtn = document.getElementById("get-question");
const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const questionArea = document.getElementById("question-area");
const prevBtn = document.getElementById("prev-question");
const nextBtn = document.getElementById("next-question");

questionBtn.addEventListener("click", showQuestion);
prevBtn.addEventListener("click", goBack);
nextBtn.addEventListener("click", showQuestion);

function showQuestion() {
  // Save previous question index for backtracking
  previousIndex = currentIndex;

  // Pick a random question different from the current one
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * questions.length);
  } while (randomIndex === currentIndex);

  currentIndex = randomIndex;
  const currentQuestion = questions[currentIndex];

  // Update UI
  questionArea.classList.remove("hidden");
  questionText.textContent = currentQuestion.question;
  answersDiv.innerHTML = "";
  feedback.textContent = "";
  prevBtn.classList.toggle("hidden", previousIndex === null);
  nextBtn.classList.add("hidden");

  // Create answer buttons
  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => checkAnswer(answer));
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const currentQuestion = questions[currentIndex];
  const buttons = answersDiv.querySelectorAll("button");

  buttons.forEach(btn => btn.disabled = true);

  if (selected === currentQuestion.correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `❌ Try again! The correct answer was ${currentQuestion.correct}.`;
    feedback.style.color = "red";
  }

  scoreDisplay.textContent = `Score: ${score}`;
  nextBtn.classList.remove("hidden");
}

function goBack() {
  if (previousIndex === null) return;
  const prevQuestion = questions[previousIndex];

  questionText.textContent = "(Review Only) " + prevQuestion.question;
  answersDiv.innerHTML = "";
  feedback.textContent = "Viewing previous question (answers disabled).";
  feedback.style.color = "#555";

  prevQuestion.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.disabled = true;
    if (answer === prevQuestion.correct) {
      btn.style.backgroundColor = "#b4f8c8";
    }
    answersDiv.appendChild(btn);
  });

  nextBtn.classList.remove("hidden");
}
