let maxQNum = 30, // maximum number of questions
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
    <section id="form"></section>
    <section id="whole-question"></section>
    <section id="result"></section>
  </div>
</div>`;

// selectors
let htmlBackground = document.querySelector("#background"),
  htmlWholeQuestion = document.querySelector("#whole-question"),
  htmlResult = document.querySelector("#result");

// show the question on the page
function applyQuestion(qNum) {
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

    // show loading
    // let addLoading = document.createElement("div");
    // addLoading.setAttribute("id", "loading");
    // addLoading.innerHTML = `Loading..`;
    // htmlBackground.appendChild(addLoading)
    // htmlBackground.querySelector("#loading").style.display = "flex";
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
      addAnswers.setAttribute("onclick", "nextTest(" + qNum + ")");
      htmlAnswers.appendChild(addAnswers);
    }
  } else if (qNum > maxQNum) {
    // remove the question section
    htmlWholeQuestion.remove();

    // calcute the number of correct answers
    let answerCounter = 0,
      result;
    for (let i = 0; i <= maxQNum; i++) {
      if (userAnswers[i] == correctAnswers[i]) {
        answerCounter++; // number of correct answers
      }
    }

    // correct answers in percentage
    result = ((answerCounter / maxQNum) * 100).toFixed(2);

    // print the result
    htmlResult.innerHTML = `
    <p>Your score is:<br>
    ${result}% (${answerCounter}/${maxQNum})</p>`;
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
