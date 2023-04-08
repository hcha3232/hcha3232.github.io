let answers = [
    //[asked_question, asked_answer]
];

const questionList = {
    anatomicLocation :
    {
        question: "What is the anatomic location of the uveitis?",
        options: [
            { label: "Anterior uveitis (only available)", nextQuestion: "course" },
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
        ${buttonModal('Sarcoidosis AU','Sarcoidosis Anterior Uveitis',null,'sarc')}
        ${buttonModal('JIA AU','Juvenile Idiopathic Arthritis Anterior Uveitis',null,'jia')}
        ${buttonModal('Drug-induced AU','Drug-induced Anterior Uveitis',null,'drug')}
        ${buttonModal('TINU','Tubulointerstitial Nephritis Uveitis',null,'tinu')}
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
        question: "Increased IOP in the absence of prior steroid treatment or iris atrophy/transillumination?",
        options: [
            { label: "Yes", nextQuestion: "viralAU_algorithm"},
            { label: "No", nextQuestion: "HLA_B27"},
        ]
    },
    fus_algorithm :
    {
        question: `Next step: <span style='font-weight:400'>FUS algorithm</span>\
        <br>\
        Differential diagnosis:
        ${buttonModal('FUS','Fuchs Uveitis Syndrom',null,'fus')}
        ${buttonModal('CMV','Cytomagalovirus Anterior Uveitis',null,'cmv')}`,
        options: [
        ]
    },
    viralAU_algorithm :
    {
        question: `Next step: <span style='font-weight:400'>Viral AU algorithm</span>\
        <br>\
        Differential diagnosis: 
        ${buttonModal('CMV AU','Cytomegalovirus Anterior Uveitis',null,'cmv')}
        ${buttonModal('HSV AU','Herpes Simplex Virus Anterior Uveitis',disDatabase('hsv'),'hsv')}
        ${buttonModal('VZV AU','Varicella Zoster Virus Anterior Uveitis',null,'vzv')}`,
        options: [
        ]
    },
    HLA_B27 :
    {
        question: `Suspected diagnosis: 
        ${buttonModal('HLA-B27 SpA AU','HLA-B27 Spondyloarthritis Anterior Uveitis',null,'hlab27')}
        <br>
        <span style='font-weight:400'>We recommend DUET algorithm</span>
        <br><br>
        <img src="/img/duet.png" class="img-fluid"></img>`,
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
        pastquestions();      
    }
    if(answers.length!=0 && back==false){
        pastquestions();
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

    //Create button Back and Next [Finish if no option left]
    if(questionList[currentQuestion].options.length==0){
        box.innerHTML += `
        <div style="margin-bottom:10px"></div>
        <button type='button' class='btn btn-primary' id='back-${currentQuestion}'>
            Back
        </button>
        <button type='button' class='btn btn-primary' id='submit-${currentQuestion}'>
            Finish
        </button>
        <div id='message-${currentQuestion}' style="color:red;"></div>
        `;
    }
    else {
        box.innerHTML += `
        <div style="margin-bottom:10px"></div>
        <button type='button' class='btn btn-primary' id='back-${currentQuestion}'>
            Back
        </button>
        <button type='button' class='btn btn-primary' id='submit-${currentQuestion}'>
            Next
        </button>
        <div id='message-${currentQuestion}' style="color:red;"></div>
        `;
    }
    

    //append everything into container
    document.getElementById("container").appendChild(box);

    //eventlistener to button
    let submitBtn = document.getElementById(`submit-${currentQuestion}`);
    submitBtn.addEventListener("click",function(){
        let selected = document.querySelector('input[name="flexRadioDefault"]:checked');

        //if the question reaches last => go to index, if the question has no answer, ask for a click
        if (selected === null && questionList[currentQuestion].options.length!=0) {
            document.getElementById(`message-${currentQuestion}`).innerHTML = "please select an option";
            return;
        }
        if (selected === null && questionList[currentQuestion].options.length==0){
            window.location.href = '/index.html'
            return;
        }
        //if the question is clicked propertly, next question is retrieved
        let selectedOption = selected.value;
        let nextQuestion = questionList[currentQuestion].options.find(option => option.label === selectedOption).nextQuestion;
        
        //Debugging
        console.log("Selected option: " + selectedOption);
        console.log("Next question: " + nextQuestion);

        //once submited, the original question is deleted
        //this is accessed by list of past answers being pushed in "answers"
        answers.push([currentQuestion,questionList[currentQuestion].question,selectedOption]);
        
        //Old question being deleted and getting new question box
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
        questionBoxes(answers[answers.length-1][0], back=true)
    })
}

questionBoxes("anatomicLocation");



function pastquestions(){
    //retrieve entire pastquestions and display
    let pq = ``;
    for(let i = 0; i < answers.length; i++){
        pq += `<div>${answers[i][1]} <br>&nbsp&nbsp<i>${answers[i][2]}</i></div>`
    }
    let exp = document.getElementById("exp-container");
    exp.innerHTML = pq;
}


function buttonModal(btnName,headerName,disName_database,disId){
    let btnModalHTML = 
    `
    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#${disId}"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            ${btnName}
    </button>

    <div class="modal" id="${disId}" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">${headerName}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${disName_database}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `
    return btnModalHTML;
}

function disDatabase(dis){
    database = {
        hsv : `
        <div class="container" id="main-article">
            <div>SUN Classification Criteria</div>
            <div class="main-table">
                <div style="font-weight: 400">Should satisfy #1 AND #2 AND #3</div>
                <br>
                <ol class="no-padding">
                    <li>Evidence of anterior uveitis
                        <ol type="a" style="font-weight:400;" class="no-padding">
                            <li>Anterior chamber cells</li>
                            <li>If anterior vitreous cells are present, severity is less than anterior chamber inflammation</li>
                            <li>No evidence of retinitis</li>
                        </ol>
                    </li>
                    <br>
                    <li>Unilateral uveitis (unless there is a positive aqueous PCR for herpes simplex virus)
                    </li>
                    <br>
                    <li>Evidence of herpes simplex infection in the eye
                        <ol type="a" style="font-weight:400;" class="no-padding">
                            <li>Aqueous humor PCR positive for herpes simplex virus OR</li>
                            <li>Sectoral iris atrophy in a patient ≤50 years of age OR</li>
                            <li>Herpes simplex keratitis</li>
                        </ol>
                    </li>
                </ol>
                <br>
                <div class="exclusion-box" id="exclusion-box">
                    <div class="exclusion-title">
                        <div style="font-weight:700">Exclude if any criterion below is fulfilled</div>
                    </div>
                    <br>
                    <ul style="font-weight:400;" class="no-padding">
                        <li>Concomitant dermatomal/cutaneous varicella zoster virus (unless aqueous specimen PCR positive for herpes simplex virus)</li>
                        <li>Positive serology for syphilis using a treponemal test</li>
                        <li>Evidence of sarcoidosis (either bilateral hilar adenopathy on chest imaging or tissue biopsy demonstrating non-caseating granulomata)</li>
                        <li>Aqeous specimen PCR positive for cytomegalovirus or varicella zoster virus</li>
                    </ul>
                </div>
            </div>
        </div>`
    }
    return database[dis]
}
