let userAnswers = [], // answers that the user has chosen
  correctAnswers = [
    3, 1, 5, 5, 2, 1, 2, 2, 2, 6, 4, 1, 4, 7, 2, 3, 1, 6, 5, 8, 4, 4, 7, 6, 4,
    7, 7, 3, 2, 8,
  ]; // the correct answers to be compared with user's

// add html layout
document.querySelector("body").innerHTML = `
<section id="form"></section>

<div id="background">
  <section id="whole-question">
    <p>Please choose the right answer by clicking on it</p>
    <div id="question"></div>
    <div id="answers"></div>
  </section>

  <section id="result"></section>
</div>`;

// selectors
let htmlWholeQuestion = document.querySelector("#whole-question"),
  htmlQuestion = document.querySelector("#question"),
  htmlAnswers = document.querySelector("#answers"),
  htmlResult = document.querySelector("#result");

// show the test on the page
function applyQuestion(qNum) {
  // remove previous test if it exists
  if (!!htmlQuestion.querySelector("img")) {
    htmlQuestion.querySelector("img").remove();
  }
  // remove options for previous test if they exist
  if (!!htmlAnswers.querySelectorAll("img")) {
    for (
      let prevANum = htmlAnswers.querySelectorAll("img").length - 1;
      prevANum >= 0;
      prevANum--
    ) {
      htmlAnswers.querySelectorAll("img")[prevANum].remove();
    }
  }

  // qNum == Question number
  if (qNum == 31) {
    htmlWholeQuestion.querySelector("p").remove();
  } else if (qNum >= 1) {
    // add the next test
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
      addAnswers.setAttribute("onclick", "nextTest(" + (qNum + 1) + ")");
      htmlAnswers.appendChild(addAnswers);
    }
  }
}

function nextTest(testNum) {
  // get the clicked element's ID
  window.onclick = (e) => {
    userAnswers.push(e.target.id);
  };

  applyQuestion(testNum);
}

applyQuestion(1);
