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
    contentDiv.classList.add("content");

    contentDiv.innerHTML = `
      <h2>${question}</h2>
      <input class="button-68" type="button" id="gen${questionId}" value="Generate Question">
      <input class="button-68" type="button" id="ans${questionId}" value="Show Answer">
      <table class="question" id="${questionId}Text"></table>
      <p id="${questionId}Ans1"></p>
      <p id="${questionId}Ans2"></p>
      <p id="${questionId}Ans3"></p>
      <p id="${questionId}Ans4"></p>
      <p id="${questionId}Ans5"></p>
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
