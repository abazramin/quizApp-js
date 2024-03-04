// main varible /
let countSpan = document.querySelector(".count span");
let bullet = document.querySelector(".bullets");
let bulletsSpanConatiner = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-btn");
let bulletArea = document.querySelector(".bullets");
let theResultContainer = document.querySelector(".result");
let countDownSpan = document.querySelector(".countdown")

// set option 
let indexCount = 0;
let theRightAnswer = 0;
let countDwonInterval;

// get data from josn folder
async function getQuistion() {
    const fetchData = await fetch("html_quiz.json");
    // check request is success
    if (fetchData.ok) {
        const request = await fetchData.json()
        // calc how many quiztions 
        let quiztionCount = request.length;
        // set Quistions
        createBullets(quiztionCount)
        // 
        addQuestionData(request[indexCount], quiztionCount)

        //
        countDwon(10, quiztionCount)
        // submit onclick
        submitButton.onclick = () => {
            // 
            let rightAnswer = request[indexCount].right_answer;
            // increase index count
            indexCount++;
            getCurrrentAnswer(rightAnswer, quiztionCount)
            // remove previous quistions
            quizArea.innerHTML = "";
            answerArea.innerHTML = "";
            // 
            addQuestionData(request[indexCount], quiztionCount)
            //
            handleClassBullets()
            //
            clearInterval(countDwonInterval)
            countDwon(10, quiztionCount)
            //
            showResult(quiztionCount)
        }
    }
}

const showResult = (count) => {
    let theResult;
    if (indexCount === count) {
        quizArea.remove();
        answerArea.remove();
        submitButton.remove();
        bulletArea.remove();
        if (theRightAnswer > (count / 2) && theRightAnswer < count) {
            //
            theResult = `<span class="good"> Good </span> , ${theRightAnswer} From ${count} `;
        } else if (theRightAnswer === count) {
            theResult = `<span class="perfect"> perfect </span> ,  All Answer IS Good`;
        } else {

            theResult = `<span class="bad"> Bad </span> , ${theRightAnswer} From ${count} `;
        }
        theResultContainer.innerHTML = theResult;
        theResultContainer.style.padding = "10px"
        theResultContainer.style.backgroundColor = '#777';
        theResultContainer.style.marginTop = '10px';
    }

}


const countDwon = (duration, count) => {
    if (indexCount < count) {
        let min, sec;

        countDwonInterval = setInterval(() => {
            min = parseInt(duration / 60)
            sec = parseInt(duration % 60)
            //
            min = min < 10 ? `0${min}` : min;
            sec = sec < 10 ? `0${sec}` : sec;
            // 
            countDownSpan.innerHTML = `${min}:${sec}`
            // 
            if (--duration < 0) {
                clearInterval(countDwonInterval)
                submitButton.click()
            }
        }, 1000)
    }
}

const getCurrrentAnswer = (rightAnswer, quizCount) => {
    let answers = document.getElementsByName("quistion");
    let thechoosenAnswer;

    for (i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            thechoosenAnswer = answers[i].dataset.answer;
        }
    }
    // 
    if (rightAnswer === thechoosenAnswer) {
        theRightAnswer++;
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
const handleClassBullets = () => {
    let allBulluetsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayBulluts = Array.from(allBulluetsSpans)

    arrayBulluts.forEach((value, index) => {
        if (indexCount === index) {
            value.className = "on";
        }
    });
}
// 
const addQuestionData = (obj, count) => {
    if (indexCount < count) {
        // 
        let heading = document.createElement("h2")
        // 
        let textHeading = document.createTextNode(obj["title"]);
        // append text Heading to h2 elemetns
        heading.appendChild(textHeading);
        // add heading to quiz area 
        quizArea.appendChild(heading)
        // add answers to answer area
        for (i = 1; i <= 4; i++) {
            // create main div
            let mainDiv = document.createElement("div");
            // add class to the div
            mainDiv.className = "answer";
            // create radio input
            let theRadioInput = document.createElement("input");
            // add type + id  + Data-att + name
            theRadioInput.type = "radio";
            theRadioInput.name = "quistion";
            theRadioInput.id = `answer_${i}`;
            theRadioInput.dataset.answer = obj[`answer_${i}`];
            // create label
            let lable = document.createElement("label");
            //lable for 
            lable.htmlFor = `answer_${i}`;
            // create text node of lable
            thelableTextNode = document.createTextNode(obj[`answer_${i}`]);
            // add the text to lable
            lable.appendChild(thelableTextNode)
            // add input  to main div
            mainDiv.appendChild(theRadioInput);
            mainDiv.appendChild(lable);
            // add all divs to answer area
            answerArea.appendChild(mainDiv);
            // add  checked to first answer
            if (i === 1) {
                theRadioInput.checked = true
            }
        }
    }
}