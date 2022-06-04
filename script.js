let maxQNum = 30, // maximum number of questions
userAnswers = [], // answers that the user has chosen
  correctAnswers = [
    3, 1, 5, 5, 2, 1, 2, 2, 2, 6, 4, 1, 4, 7, 2, 3, 1, 6, 5, 8, 4, 4, 7, 6,
    4, 7, 7, 3, 2, 8,
  ]; // the correct answers to be compared with user's answers

// add html layout
document.querySelector("body").innerHTML = `
<div class="seperator"></div>

<div id="background">
  <div id="foreground">
    <section id="form"></section>

    <section id="whole-question">
      <p>Please choose the right answer by clicking on it</p>
      <div id="question"></div>
      <p>Options:</p>
      <div id="answers"></div>
    </section>

    <section id="result"></section>
    </div>
  </div>`;

// selectors
let htmlWholeQuestion = document.querySelector("#whole-question"),
  htmlQuestion = document.querySelector("#question"),
  htmlAnswers = document.querySelector("#answers"),
  htmlResult = document.querySelector("#result");

// show the question on the page
function applyQuestion(qNum) {
  // remove previous question if it exists
  if (!!htmlQuestion.querySelector("img")) {
    htmlQuestion.querySelector("img").remove();
  }
  // remove options for previous question if they exist
  if (!!htmlAnswers.querySelectorAll("img")) {
    for (let i = htmlAnswers.querySelectorAll("img").length - 1; i >= 0; i--) {
      htmlAnswers.querySelectorAll("img")[i].remove();
    }
  }

  // qNum == question number
  if (qNum >= 1 && qNum <= maxQNum) {
    // add the next question
    let addQuestion = document.createElement("img");
    addQuestion.setAttribute(
      "src",
      "./Images/" + qNum + "/test" + qNum + ".png"
    );
    htmlQuestion.appendChild(addQuestion);
    let itemNum; // itemNum = number of items in the folder
    if (qNum >= 13) {
      itemNum = 9;
    } else {
      itemNum = 7;
    }
    // aNum = Number of answers
    for (let aNum = 1; aNum < itemNum; aNum++) {
      let addAnswers = document.createElement("img");
      addAnswers.setAttribute("id", aNum);
      addAnswers.setAttribute(
        "src",
        "./Images/" + qNum + "/" + qNum + "-" + aNum + ".png"
      );
      addAnswers.setAttribute("onclick", "nextTest(" + qNum + ")");
      htmlAnswers.appendChild(addAnswers);
    }
  } else if (qNum > maxQNum) {
    // remove the question section
    htmlWholeQuestion.remove()

    // calcute the number of correct answers
    let answerCounter = 0;
    for (let i = 0; i <= 30; i++) {
      if (userAnswers[i] == correctAnswers[i]) {
        answerCounter++;
      }
    }
    answerCounter = ((answerCounter / 30) * 100).toFixed(2)
    console.log(answerCounter);
    htmlResult.innerHTML = `
    <p>${answerCounter}%</p>`
  }
}

function nextTest(qNum) {
  // get the clicked element's ID
  window.onclick = (e) => {
    userAnswers.push(e.target.id);
  };

  // show next question
  applyQuestion(qNum + 1);
}

applyQuestion(1);
