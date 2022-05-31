// script

document.querySelector("body").innerHTML = `
<section id="whole-question">
    <p>Please choose the right answer by clicking on it</p>
    <div id="question"></div>
    <div id="answers"></div>
</section>`;

let htmlWholeQuestion = document.querySelector("#whole-question"),
  htmlQuestion = document.querySelector("#question"),
  htmlAnswers = document.querySelector("#answers");

function applyQuestion(questionNumber) {
  if (questionNumber >= 1) {
    let addQuestion = document.createElement("img");
    addQuestion.setAttribute(
      "src",
      "./Images/" + questionNumber + "/test" + questionNumber + ".png"
    );
    htmlQuestion.appendChild(addQuestion);

    for (let answerNumber = 1; answerNumber < 7; answerNumber++) {
      let addAnswers = document.createElement("img");
      addAnswers.setAttribute(
        "src",
        "./Images/" +
          questionNumber +
          "/" +
          questionNumber +
          "-" +
          answerNumber +
          ".png"
      );
      htmlAnswers.appendChild(addAnswers);
    }
  }
}

applyQuestion(1);
