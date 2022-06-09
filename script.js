let timeWasted, // time wasted before starting the test
  timeSpent, // time spent on the test
  maxQNum = 30, // maximum number of questions
  userAnswers = [], // answers that the user has chosen
  correctAnswers = [
    3, 1, 5, 5, 2, 1, 2, 2, 2, 6, 4, 1, 4, 7, 2, 3, 1, 6, 5, 8, 4, 4, 7, 6, 4,
    7, 7, 3, 2, 8,
  ]; // the correct answers to be compared with user's answers

// add html layout
document.querySelector("body").innerHTML = `
<div class="seperator"></div>
<div id="background">
  <div id="foreground">
    <section id="form">
      <a onclick="calcTimeWasted(); removeForm(); applyQuestion(1)" href="#">Start the test</a>
    </section>
    <section id="whole-question"></section>
    <section id="result"></section>
  </div>
</div>`;

// selectors
let htmlBackground = document.querySelector("#background"),
  htmlForm = document.querySelector("#form"),
  htmlWholeQuestion = document.querySelector("#whole-question"),
  htmlResult = document.querySelector("#result");

// show the question on the page
function applyQuestion(qNum) {
  // remove previous <img> tags
  if (qNum >= 2) {
    // select <img> in #question and #answers
    let htmlQuestionImg = document
        .querySelector("#question")
        .querySelector("img"),
      htmlAnswersImg = document
        .querySelector("#answers")
        .querySelectorAll("img");

    // remove previous question if it exists
    if (!!htmlQuestionImg) {
      htmlQuestionImg.remove();
    }
    // remove options for previous question if they exist
    if (!!htmlAnswersImg) {
      for (let i = htmlAnswersImg.length - 1; i >= 0; i--) {
        htmlAnswersImg[i].remove();
      }
    }
  }

  // qNum == question number
  if (qNum >= 1 && qNum <= maxQNum) {
    // add the overall layout
    htmlWholeQuestion.innerHTML = `
    <p>Please choose the right answer by clicking on it</p>
    <div id="question"></div>
    <p>Options:</p>
    <div id="answers"></div>`;

    // select #question and #answers
    let htmlQuestion = document.querySelector("#question"),
      htmlAnswers = document.querySelector("#answers");

    // add the question
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
      addAnswers.setAttribute(
        "onclick",
        "getUserChoice(); applyQuestion(" + (qNum + 1) + ")"
      );
      htmlAnswers.appendChild(addAnswers);
    }
  } else if (qNum > maxQNum) {
    // remove the question section
    htmlWholeQuestion.remove();

    // calcute the answers
    let answerCounter = 0, // number of correct answers
      resultScore, // correct answers in percentage
      result, // string = Passed or Failed
      resultGif; // a fun little gif 
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] == correctAnswers[i]) {
        answerCounter++;
      }
    }
    resultScore = ((answerCounter / maxQNum) * 100).toFixed(2);

    if (resultScore < 50) {
      resultGif = "./resultFailed.gif";
      result = "You failed";
    } else {
      resultGif = "./resultSuccess.gif";
      result = "You passed";
    }
    // show the result
    htmlResult.innerHTML = `
    <div>
    <span>Your score:</span>
    <p>${resultScore}% (${answerCounter}/${maxQNum})</p>
    </div>
    <div>
    <span>Time spent:</span>
    <p>${timeSpent}</p>
    </div>
    <div>
    <img src="${resultGif}">
    <p>${result}</p>
    </div>`;
  }
}

// the getUserChoice() function gets the user's choice, pushes it to
// an array called userAnswers and calculates the time spent on page.
function getUserChoice() {
  window.onclick = (e) => {
    // get the clicked element's ID
    userAnswers.push(e.target.id);

    // get the time spent on page so far
    let timeStamp = (e.timeStamp - timeWasted) / 1000;
    // timeStamp => human readable time in second(s)
    if (timeStamp <= 60) {
      timeSpent = timeStamp.toFixed(2) + " seconds";
    } else {
      timeSpent = (timeStamp / 60).toFixed(2) + " minute(s)";
    }
  };
}

// the calcTimeWasted() function calculates the time spent on page
// before starting the test; which is basically the wasted time.
function calcTimeWasted() {
  window.onclick = (e) => {
    // get the time spent on page so far
    timeWasted = e.timeStamp;
  };
}

function removeForm() {
  htmlForm.remove();
}
