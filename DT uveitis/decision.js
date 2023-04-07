let answers = [];

const questionList = {
    anatomicLocation :
    {
        question: "What is the anatomic location of the uveitis?",
        options: [
            { label: "Anterior uveitis", nextQuestion: "course" },
            { label: "Intermediate uveitis", nextQuestion: "In_progress" },
            { label: "Posterior uveitis", nextQuestion: "In_progress" },
            { label: "Panuveitis", nextQuestion: "In_progress" }
        ],
    },
    course :
    {
        question: "What is the course of the uveitis?",
        options: [
            { label: "Acute, monophasic", nextQuestion: "laterality_m"},
            { label: "Acute, recurrent", nextQuestion: "laterality_r"},
            { label: "Chronic", nextQuestion: "laterality_c" }
        ],
    },
    laterality_m :
    {
        question: "What is the laterality of the uveitis?",
        options: [
            { label: "Unilateral", nextQuestion: "kp"},
            { label: "Bilateral", nextQuestion: "acute_bilateral_AU_algorithm" }
        ]
    },
    acute_bilateral_AU_algorithm :
    {
        question: `Next step: <span style='font-weight:400'>Acute bilateral uveitis algorithm</span>\
        <br>\
        Differential diagnosis: \
        <button type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            Sarcoidosis
        </button>
        <button type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            JIA
        </button>
        <button type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            Drug-induced
        </button>
        <button type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            TINU
        </button>
        `,
        options: [
        ]
    },
    laterality_r :
    {
        question: "What is the laterality of the uveitis?",
        options: [
            { label: "Unilateral", nextQuestion: "kp"},
            { label: "Unilateral, alternating", nextQuestion: "HLA_B27"},
            { label: "Bilateral", nextQuestion: "acute_bilateral_AU_algorithm" }
        ]
    },
    kp :
    {
        question: "What is the KP of the uveitis?",
        options: [
            { label: "Stellate", nextQuestion: "fus_algorithm"},
            { label: "Granulomatous", nextQuestion: "viralAU_algorithm"},
            { label: "Non-granulomatous", nextQuestion: "screenViralAU" }
        ]
    },
    screenViralAU :
    {
        question: "Increased IOP or iris atrophy/transillumination?",
        options: [
            { label: "yes", nextQuestion: "viralAU_algorithm"},
            { label: "no", nextQuestion: "HLA_B27"},
        ]
    },
    fus_algorithm :
    {
        question: `Next step: <span style='font-weight:400'>FUS algorithm</span>\
        <br>\
        Differential diagnosis:
        <button type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            FUS
        </button>
        <button type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            CMV
        </button>`,
        options: [
        ]
    },
    viralAU_algorithm :
    {
        question: `Next step: <span style='font-weight:400'>Viral AU algorithm</span>\
        <br>\
        Differential diagnosis: 
        <button type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            CMV
        </button>
        <button type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            HSV
        </button>
        <button type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            VZV
        </button>`,
        options: [
        ]
    },
    HLA_B27 :
    {
        question: `Suspected diagnosis: <button type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            HLA-B27/spondyloarthritis related AU
        </button>\
        <br>\
        <span style='font-weight:400'>We recommend DUET algorithm</span>`,
        options: [
        ]
    },
    laterality_c :
    {
        question: "What is the laterality of the uveitis?",
        options: [
            { label: "History of Alternating", nextQuestion: "HLA_B27"},
            { label: "Unilateral", nextQuestion: "In_progress"},
            { label: "Bilateral", nextQuestion: "In_progress" }
        ]
    },
    In_progress :
    {
        question: "In progress",
        options: [
        ]
    }
}

function questionBoxes(currentQuestion,back){
    if(answers.length!=0 && back==true){
        answers.pop();
    }

    let box = document.createElement('div');
    box.id= `box-${currentQuestion}`
    let questionBox = document.createElement('div'); 
    questionBox.id = `question-${currentQuestion}`;
    let optionsBox = document.createElement('div');
    optionsBox.id = `options-${currentQuestion}`;
    
    questionBox.innerHTML = `<h6>${questionList[currentQuestion].question}</h6>`;

    //options
    for (let i = 0; i < questionList[currentQuestion].options.length; i++){
        let div = document.createElement('div');
        div.class = "form-check";
        div.innerHTML = `
        <div class="form-check">
            <input class="form-check-input  border-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault${currentQuestion}${i}" value="${questionList[currentQuestion].options[i].label}">
            <label class="form-check-label" for="flexRadioDefault${currentQuestion}${i}">
                ${questionList[currentQuestion].options[i].label}
            </label>
        </div>`;
        optionsBox.appendChild(div)
    }

    //append question and options
    box.appendChild(questionBox);
    box.appendChild(optionsBox);

    //Create button
    box.innerHTML += `

    <button type='button' class='btn btn-outline-primary' id='back-${currentQuestion}'>
        Back
    </button>
    <button type='button' class='btn btn-outline-primary' id='submit-${currentQuestion}'>
        Next
    </button>
    <div id='message-${currentQuestion}'></div>`;

    //append everything into container
    document.getElementById("container").appendChild(box);

    //eventlistener to button
    let submitBtn = document.getElementById(`submit-${currentQuestion}`);
    submitBtn.addEventListener("click",function(){
        let selected = document.querySelector('input[name="flexRadioDefault"]:checked');

        if (selected === null) {
            document.getElementById(`message-${currentQuestion}`).innerHTML = "please select an option";
            return;
        }

        let selectedOption = selected.value;

        console.log("Selected option: " + selectedOption);
        let nextQuestion = questionList[currentQuestion].options.find(option => option.label === selectedOption).nextQuestion;
        console.log("Next question: " + nextQuestion);

        //once submited, the original question is deleted
        //this may be access by list being pushed
        answers.push(currentQuestion);
        document.getElementById("container").innerHTML = "";
        questionBoxes(nextQuestion, back=false);
    })

    let backBtn = document.getElementById(`back-${currentQuestion}`);
    backBtn.addEventListener("click",function(){
        //check if first question 
        if(answers.length == 0){
            document.getElementById(`message-${currentQuestion}`).innerHTML = "There is no previous question";
            return;
        }
        
        document.getElementById("container").innerHTML = "";
        questionBoxes(answers[answers.length-1], back=true)
    })
}

questionBoxes("anatomicLocation");



