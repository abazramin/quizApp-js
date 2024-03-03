// main varible /
let countSpan = document.querySelector(".count span");
let bullet = document.querySelector(".bullets");
let bulletsSpanConatiner = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-btn");
let theResultContainer = document.querySelector(".result");
let countDownSpan = document.querySelector(".countdown")

// set option 
let indexCount = 0;

// get data from josn folder
async function getQuistion() {
    const fetchData = await fetch("html_quiz.json")
    if (fetchData.ok) {
        const request = await fetchData.json()
        // calc how many quiztions 
        let quiztionCount = request.length;
        // set Quistions
        createBullets(quiztionCount)
        // 
        addQuestionData(request[indexCount], quiztionCount)
    } else {
        console.log("Error");
    }
}

// call function get questions
getQuistion()

// funcion innerHtml Count
const createBullets = (num) => {
    countSpan.innerHTML = num;

    // 
    for (i = 0; i < num; i++) {


        // create bulluts
        let theBullet = document.createElement("span");

        // check if its first span
        if (i === 0) {
            theBullet.className = "on";
        }
        // append bulltes to mine bullet container
        bulletsSpanConatiner.appendChild(theBullet)
    }
}

// 
const addQuestionData = (obj, count) => {
    // 
    let heading = document.createElement("h2")
    // 
    let textHeading = document.createTextNode(obj["title"]);
    // append text Heading to h2 elemetns
    heading.appendChild(textHeading);

    // add heading to quiz area 
    quizArea.appendChild(heading)

    for (i = 1; i <= 4; i++) {
        //
        let mainDiv = document.createElement("div");
        mainDiv.className = "answer";

        let theRadioInput = document.createElement("input");


        // add type + id  + Data-att + name
        theRadioInput.type = "radio";
        theRadioInput.name = "quistion";
        theRadioInput.id = `answer_${i}`;
        theRadioInput.dataset.answer = obj[`answer_${i}`];

        if (i === 1) {
            theRadioInputg.checked = true
        }
        // create label
        let lable = document.createElement("label");

        // 
        lable.htmlFor = `answer_${i}`;

        //
        thelableTextNode = document.createTextNode(obj[`answer_${i}`]);

        // add the text to lable
        lable.appendChild(thelableTextNode)

        // add input  to main div
        mainDiv.appendChild(theRadioInput);
        mainDiv.appendChild(lable);

        // add all divs to answer area
        answerArea.appendChild(mainDiv);

    }
}