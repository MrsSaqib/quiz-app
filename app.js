var questions =
    var questions = [{
        question: "What is 2 + 2?",
        opt1: "3",
        opt2: "4",
        opt3: "5",
        opt4: "6",
        ans: "4",
    }, {
        question: "What is the capital of France?",
        opt1: "Rome",
        opt2: "Paris",
        opt3: "London",
        opt4: "Berlin",
        ans: "Paris",
    }, {
        question: "What is the largest planet in our solar system?",
        opt1: "Earth",
        opt2: "Mars",
        opt3: "Jupiter",
        opt4: "Saturn",
        ans: "Jupiter",
    }, {
        question: "Which element has the chemical symbol 'O'?",
        opt1: "Oxygen",
        opt2: "Nitrogen",
        opt3: "Ozone",
        opt4: "Carbon",
        ans: "Oxygen",
    }, {
        question: "Which of these animals is a mammal?",
        opt1: "Shark",
        opt2: "Whale",
        opt3: "Penguin",
        opt4: "Crocodile",
        ans: "Whale",
    }, ];

var index = 0;
var result = 0;

function renderQues() {
    var container = document.getElementById("container");
    var option = document.getElementsByName("option");

    // Check if a question is being rendered
    if (index > 0) {
        for (var i = 0; i < option.length; i++) {
            if (option[i].checked) {
                if (questions[index - 1].ans === option[i].value) {
                    result++;
                }
            }
        }
    }

    // No more questions
    if (!questions[index]) {
        calculateResult();
        document.getElementById("result-container").style.display = "block";
        container.style.display = "none";
        return;
    }

    // Render the current question
    container.innerHTML = `
        <h3 class="text-center text-body-secondary">JavaScript Quiz</h3>
        <p class="question">${index + 1}. ${questions[index].question}</p><hr/>
        <div class="options">
            <label><input type="radio" name="option" value="${questions[index].opt1}"> ${questions[index].opt1}</label>
        </div>
        <div class="options">
            <label><input type="radio" name="option" value="${questions[index].opt2}"> ${questions[index].opt2}</label>
        </div>
        <div class="options">
            <label><input type="radio" name="option" value="${questions[index].opt3}"> ${questions[index].opt3}</label>
        </div>
        <div class="options">
            <label><input type="radio" name="option" value="${questions[index].opt4}"> ${questions[index].opt4}</label>
        </div>
        <button id="prev" class="m-2 btn btn-primary" onclick="previousQuestion()">Previous</button>
        <button id="next" class="m-2 btn btn-success" onclick="nextQuestion()">Next</button>
    `;

    // Manage button states
    document.getElementById("prev").disabled = (index === 0);
    var nextButton = document.getElementById("next");
    if (index === questions.length - 1) {
        nextButton.innerHTML = "Submit";
        nextButton.classList.add("btn-danger");
    }
}

function nextQuestion() {
    var option = document.getElementsByName("option");
    var selected = Array.from(option).some(opt => opt.checked);
    if (!selected) {
        Swal.fire("Please select an answer before proceeding.");
        return;
    }
    index++;
    renderQues();
}

function previousQuestion() {
    if (index > 0) {
        index--;
        renderQues();
    }
}

function calculateResult() {
    var percentage = ((result / questions.length) * 100).toFixed(2);
    if (percentage >= 80) {
        Swal.fire({
            title: "Congratulations!",
            text: `You passed the test! You got ${result} out of ${questions.length} correct. Your score is ${percentage}%.`,
            icon: "success",
        });
    } else {
        Swal.fire({
            title: "Oops...",
            text: `You didn't pass. You got ${result} out of ${questions.length} correct. Your score is ${percentage}%.`,
            icon: "error",
        });
    }
}

// Initialize the quiz
renderQues();