let userAnswers = [],
  correctAnswers = [
    3, 1, 5, 5, 2, 1, 2, 2, 2, 6, 4, 1, 4, 7, 2, 3, 1, 6, 5, 8, 4, 4, 7, 6, 
    4, 7, 7, 3, 2, 8,
  ];

function userInput() {
  window.onclick = (e) => {
    userAnswers.push(e.target.id); // get the element ID
  };
}

document.querySelector("body").innerHTML = `
<section id="whole-question">
    <p>Please choose the right answer by clicking on it</p>
    <div id="question"></div>
    <div id="answers"></div>
</section>`;

let htmlWholeQuestion = document.querySelector("#whole-question"),
  htmlQuestion = document.querySelector("#question"),
  htmlAnswers = document.querySelector("#answers");

function applyQuestion(qNum) {
  // qNum == Question Number
  if (qNum >= 1) {
    let addQuestion = document.createElement("img");
    addQuestion.setAttribute(
      "src",
      "./Images/" + qNum + "/test" + qNum + ".png"
    );
    htmlQuestion.appendChild(addQuestion);

    for (let aNum = 1; aNum <= 6; aNum++) {
      // aNum == Answer Number
      let addAnswers = document.createElement("img");
      addAnswers.setAttribute("id", aNum);
      addAnswers.setAttribute(
        "src",
        "./Images/" + qNum + "/" + qNum + "-" + aNum + ".png"
      );
      addAnswers.addEventListener("click", userInput);
      htmlAnswers.appendChild(addAnswers);
    }
  }
}

applyQuestion(1);
