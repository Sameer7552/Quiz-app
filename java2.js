
function alertfun() {
    let timerInterval;
    Swal.fire({
        title: "Times up!",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    })
}

let countdownDuration = 300;
const timerElement = document.getElementById('timer');
function updateTimer() {
    const minutes = Math.floor(countdownDuration / 60);
    let seconds = countdownDuration % 60;
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    timerElement.textContent = `${minutes}:${seconds}`;
    countdownDuration--;
    if (countdownDuration < 0) {
        clearInterval(timerInterval);
        timerElement.textContent = 'Time up!';
        alertfun()
        showresult()
    }
}

updateTimer();
const timerInterval = setInterval(updateTimer, 1000);


const questions = [
    {
        question: "What will the following code output?",
        code: "console.log(2 + '2' - 2);",
        choices: ["'22'", "20", "4", "'2'"],
        answer: "20"
    },
    {
        question: "What will the following code output?",
        code: "console.log([] + {});",
        choices: ["'[object Object]'", "{}", "Error", "0"],
        answer: "[object Object]"
    },
    {
        question: "What does the following code return?",
        code: "typeof 1;",
        choices: ["'number'", "'string'", "'object'", "'undefined'"],
        answer: "'string'"
    },
    {
        question: "What will the following code output?",
        code: "console.log('10' == 10);",
        choices: ["true", "false", "Error", "NaN"],
        answer: "true"
    },
    {
        question: "What is the result of the following code?",
        code: "function foo() { return bar; var bar = 10; } console.log(foo());",
        choices: ["10", "undefined", "Error", "ReferenceError"],
        answer: "undefined"
    },
    {
        question: "What is the value of x after the following code runs?",
        code: "let x = 0; function foo() { x += 1; } foo(); console.log(x);",
        choices: ["1", "0", "Error", "undefined"],
        answer: "1"
    },
    {
        question: "What will be the output of the following code?",
        code: "const arr = [1, 2, 3]; arr[10] = 10; console.log(arr.length);",
        choices: ["10", "3", "11", "Error"],
        answer: "11"
    },
    {
        question: "What will the following code output?",
        code: "console.log(Boolean([]));",
        choices: ["true", "false", "Error", "undefined"],
        answer: "true"
    },
    {
        question: "What is the value of x after the following code runs?",
        code: "let x = 0; x = x++; console.log(x);",
        choices: ["0", "1", "Error", "undefined"],
        answer: "0"
    },
    {
        question: "What will be the output of the following code?",
        code: "const a = {}; const b = { key: 'b' }; const c = { key: 'c' }; a[b] = 123; a[c] = 456; console.log(a[b]);",
        choices: ["123", "456", "undefined", "Error"],
        answer: "456"
    }
];


const remain = document.getElementById('remain');

const nextButton = document.getElementById('next-btn');
const questionElement = document.getElementById('question');
const questioncode = document.getElementById('code');

const opt1 = document.getElementById('option1');
const opt2 = document.getElementById('option2');
const opt3 = document.getElementById('option3');
const opt4 = document.getElementById('option4');

const form = document.getElementById('radioForm');

var array = randomchoice()
var array2 = randomquestion()

let count2 = 0;
let count = 1
let currentanswer = "";

var select = "";
const totalques = 10;
var totalcorrect = 0;
var index;

function displayNextQuestion() {
    array = randomchoice()
    for (var i = 0; i < 4; i++) {
        if (questions[array2[count2]].choices[array[i]] === questions[array2[count2]].answer) {
            index = i
        }
    }
    questionElement.textContent = questions[array2[count2]].question;
    questioncode.textContent = questions[array2[count2]].code;
    currentanswer.textContent = questions[array2[count2]].answer;
    opt1.textContent = questions[array2[count2]].choices[array[0]]
    opt2.textContent = questions[array2[count2]].choices[array[1]]
    opt3.textContent = questions[array2[count2]].choices[array[2]]
    opt4.textContent = questions[array2[count2]].choices[array[3]]
    remain.innerHTML = "Question No: " + count + " / 10 "
    count++
    count2++
}


displayNextQuestion();

function next() {
    document.getElementById('error').innerHTML = "";
    select = checkans();
    if (select == "none") {
        document.getElementById('error').innerHTML = "Please select the option.";
    }
    else {
        if (select == index) {
            totalcorrect++
        }
        if (count2 == 10) {
            showresult()
        }
        else {
            displayNextQuestion();
            if (count2 == 9) {
                document.getElementById('next-btn').innerHTML = "Submit"
            }
        }
    }

}

function showresult() {
    $(document).ready(function () {
        $("#myModal").modal('show');
    });
    document.getElementById('resultans').innerHTML = totalcorrect
    document.getElementById('totalques').innerHTML = totalques
    progress()
}

function checkans() {
    const ans = document.getElementsByName('opt');
    for (i = 0; i < ans.length; i++) {
        if (ans[i].checked) {
            form.reset()
            return ans[i].value
        }
    }
    return "none"
}

function randomchoice() {
    const choice = [];
    function existsInArray(number) {
        return choice.includes(number);
    }
    while (choice.length < 4) {
        const randomNumber = Math.floor(Math.random() * 4);

        if (!existsInArray(randomNumber)) {
            choice.push(randomNumber);
        }
    }
    return choice;
}

function randomquestion() {
    const ques = [];
    function existsInArray(number) {
        return ques.includes(number);
    }
    while (ques.length < 10) {
        const randomNumber = Math.floor(Math.random() * 10);

        if (!existsInArray(randomNumber)) {
            ques.push(randomNumber);
        }
    }

    return ques;
}


function perc() {
    return (totalcorrect / totalques) * 100
}

function progress() {
    var value = perc() / 100
    if (value >= 0.6) {
        var show = "#3acc00"
        document.getElementById("result-txt").style.color = "#3acc00";
        document.getElementById('result-txt').innerHTML = (value) * 100 + "% Passed";
    }
    else {
        var show = "#ec9a00"
        document.getElementById("result-txt").style.color = "#ec9a00";
        document.getElementById('result-txt').innerHTML = (value) * 100 + "% Failed";
    }
    var bar = new ProgressBar.Circle(container, {
        strokeWidth: 15,
        easing: 'easeInOut',
        duration: 1400,
        color: show,
        trailColor: '#eee',
        trailWidth: 15,
        svgStyle: null
    });


    bar.animate(value);
}
