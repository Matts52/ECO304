window.onload = function () {

  generateNavbar();

  /* add event listeners */
  const questionIds = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"];

  // Add event listeners for generating questions
  questionIds.forEach((id) => {
    document.getElementById(`gen${id}`).addEventListener("click", () => generateQuestion(id));
  });

  // Add event listeners for showing answers
  questionIds.forEach((id) => {
    document.getElementById(`ans${id}`).addEventListener("click", () => showAns(id));
  });

}
/* Close window.onload */
