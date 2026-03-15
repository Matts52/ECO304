window.onload = function () {

  generateNavbar();

  /* add event listeners */
  const questionIds = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"];

  // Dynamically generate the questions
  const questions = [
    "Single Variable PDF",
    "Two Variable PDF",
    "Uniform Distribution",
    "Normal Distribution",
    "Sampling Mean",
    "Confidence Interval of the Mean",
    "Confidence Interval of the Variance",
    "Hypothesis Test of the Mean"
  ];

  const questionContainer = document.querySelector('.question-container');

  questions.forEach((question, index) => {
    const questionId = `Q${index + 1}`;
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("question-card");

    contentDiv.innerHTML = `
      <div class="question-card-header">
        <span class="q-badge">Q${index + 1}</span>
        <h2>${question}</h2>
      </div>
      <div class="question-body">
        <p id="${questionId}Text" class="question-prompt"></p>
        <table class="question" id="${questionId}Table"></table>
      </div>
      <div class="question-card-actions">
        <input class="button-68" type="button" id="gen${questionId}" value="Generate Question">
        <input class="button-68" type="button" id="ans${questionId}" value="Show Answer">
      </div>
      <div class="answer-block">
        <p id="${questionId}Ans1" class="q-answer hidden"></p>
        <p id="${questionId}Ans2" class="q-answer hidden"></p>
        <p id="${questionId}Ans3" class="q-answer hidden"></p>
        <p id="${questionId}Ans4" class="q-answer hidden"></p>
        <p id="${questionId}Ans5" class="q-answer hidden"></p>
      </div>
    `;

    questionContainer.appendChild(contentDiv);
  });


  // Add event listeners for generating questions
  questionIds.forEach((id) => {
    document.getElementById(`gen${id}`).addEventListener("click", () => generateQuestion(id));
  });

  // Add event listeners for showing answers
  questionIds.forEach((id) => {
    document.getElementById(`ans${id}`).addEventListener("click", () => showAns(id));
  });

};

/* Close window.onload */
