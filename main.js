// 
let countSpan = document.querySelector(".count span");
let bullet = document.querySelector(".bullets");
let bulletsSpanConatiner = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-btn");
let theResultContainer = document.querySelector(".result");
let countDownSpan = document.querySelector(".countdown")

// Set Option
let currentIndex = 0;
let rightAnswer = 0;
let countDownInterval;


function getQuestion() {

    let myRequest = new XMLHttpRequest();


    myRequest.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {

            let questionObject = JSON.parse(this.responseText);

            let questionCount = questionObject.length;

            // console.log(questionCount);

            // Create Bullets + Set Quistions
            createBullets(questionCount);

            // Add Quistion Data
            addQuestionData(questionObject[currentIndex], questionCount);

            //  Start ContDown
            countDown(30, questionCount);

            // Click On Submit 
            submitButton.onclick = () => {
                // Get Right Answer
                let theRightAnswer = questionObject[currentIndex].right_answer;

                // Increase Index 
                currentIndex++;


                // Cheak The Answer
                checkAnswer(theRightAnswer, questionCount);


                // Remove Previous Quistion 
                quizArea.innerHTML = '';
                answerArea.innerHTML = '';


                // Add Quistion Data
                addQuestionData(questionObject[currentIndex], questionCount);

                // Handle Bullets Class
                handleBullets();

                // start CountDown
                clearInterval(countDownInterval);
                countDown(30, questionCount);

                // Show Result
                showResult(questionCount);

            };

        }

    }

    myRequest.open("GET", "html_quiz.json", true);

    myRequest.send();
}

getQuestion();

function createBullets(num) {

    countSpan.innerHTML = num;

    // Create Spans
    for (let i = 0; i < num; i++) {

        //  Create Span 
        let theBullet = document.createElement("span");

        // Cheak if Its First span
        if (i === 0) {
            theBullet.classList = "on";
        }

        // Append Bullets To Mine Bullet Container 
        bulletsSpanConatiner.appendChild(theBullet);

    }
}

function addQuestionData(obj, count) {

    if (currentIndex < count) {
        // Create H2 Quistion
        let quistonTitle = document.createElement("h2");

        // Create Quistion Text
        let questionText = document.createTextNode(obj['title']);

        //  Append Text To h2
        quistonTitle.appendChild(questionText);

        // Append H2 To the Quiz-area
        quizArea.appendChild(quistonTitle);

        // Create The Answers
        for (let i = 1; i <= 4; i++) {

            // Create Main Answer Div
            let mainDiv = document.createElement("div");

            // Add Class TO Main Div
            mainDiv.classList = 'answer';

            // Create Radio input 
            let radioInput = document.createElement("input");

            // Add Type + Name + ID + Data-Attribute
            radioInput.name = 'question';
            radioInput.type = 'radio';
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            // Make Frist Option Selected
            if (i == 1) {
                radioInput.checked = true;
            }

            //  Create Label
            let theLabel = document.createElement("label");

            // Add For Attribute
            theLabel.htmlFor = `answer_${i}`;

            // Create Label Text 
            let theLabelText = document.createTextNode(obj[`answer_${i}`]);

            // Add The Text To Label 
            theLabel.appendChild(theLabelText);

            // Add Input To Main To Div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);

            // Append All Divs To Answer  Area
            answerArea.appendChild(mainDiv);
        }
    }

}

function checkAnswer(rAnswer, count) {

    let answers = document.getElementsByName("question");

    let theChoosenAnswer;

    for (let i = 0; i < answers.length; i++) {

        if (answers[i].checked) {

            theChoosenAnswer = answers[i].dataset.answer;

        }

    }

    if (rAnswer === theChoosenAnswer) {
        rightAnswer++;

    }
}

function handleBullets() {

    let bulletsSpans = document.querySelector(".bullets .spans span");

    let arrayOfSpans = Array.from(bulletsSpans);

    arrayOfSpans.forEach((span, index) => {

        if (currentIndex === index) {

            span.className = 'on';

        }

    });

}

function showResult(count) {
    let theResult;
    if (currentIndex === count) {

        quizArea.remove();
        answerArea.remove();
        submitButton.remove();
        bullet.remove();



        if (rightAnswer > (count / 2) && rightAnswer < count) {

            theResult = `<span class="good">Good</span>,${rightAnswer} From ${count} `;

        } else if (rightAnswer === count) {

            theResult = `<span class="perfect">perfect</span>, All Answer IS Good`;
        } else {
            theResult = `<span class="bad">Bad</span>, ${rightAnswer} From ${count} `;
        }
        theResultContainer.innerHTML = theResult;
        theResultContainer.style.padding = '10px';
        theResultContainer.style.backgroundColor = 'white';
        theResultContainer.style.marginTop = '10px';
    }
}

function countDown(duration, count) {

    if (currentIndex < count) {

        let minutes, second;
        countDownInterval = setInterval(function () {

            minutes = parseInt(duration / 60);

            second = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes} ` : minutes;
            second = second < 10 ? `0${second} ` : second;

            countDownSpan.innerHTML = `${minutes}:${second}`

            if (--duration < 0) {
                clearInterval(countDownInterval);
                submitButton.click();
            }

        }, 1000)

    }

}


