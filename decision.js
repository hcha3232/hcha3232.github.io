let answers = [
    //[asked_question, asked_answer]
];

const questionList = {
    anatomicLocation :
    {
        description: `
        <span style='font-weight:500'>Check SUN classification for </span> 
        ${buttonModal('Anatomic Location of Uveitis','Anatomic Location of Uveitis',disDatabase('anatLoc'),'anatLoc')}
        `,
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
        description: `
        <span style='font-weight:500'>Check SUN classification for </span> 
        ${buttonModal('Course of Uveitis','Course of Uveitis',disDatabase('course'),'course')}
        `,
        question: "What is the course of the uveitis?",
        options: [
            { label: "Acute, monophasic", nextQuestion: "laterality_m"},
            { label: "Acute, recurrent", nextQuestion: "laterality_r"},
            { label: "Chronic", nextQuestion: "laterality_c" }
        ],
    },
    laterality_m :
    {
        description: ``,
        question: "What is the laterality of the uveitis?",
        options: [
            { label: "Unilateral", nextQuestion: "heterochromia"},
            { label: "Bilateral", nextQuestion: "acute_bilateral_AU_algorithm" }
        ]
    },
    heterochromia : 
    {
        description: `Ophthalmic examination`,
        question: "Does the patient have heterochromia?",
        options: [
            { label: "Yes", nextQuestion: "fus_algorithm"},
            { label: "No", nextQuestion: "kp" }
        ]
    },
    acute_bilateral_AU_algorithm :
    {
        description: `
        <span style='font-weight:500'>Next step:</span> Acute bilateral uveitis algorithm<br>
        <span style='font-weight:500'>Differential diagnosis: </span>
        ${buttonModal('Sarcoidosis AU','Sarcoidosis Anterior Uveitis',null,'sarc')}
        ${buttonModal('Drug-induced AU','Drug-induced Anterior Uveitis',null,'drug')}
        ${buttonModal('TINU','Tubulointerstitial Nephritis Uveitis',disDatabase('tinu'),'tinu')}
        `,
        question: `Continue?`,
        options: [
            { label: "Yes", nextQuestion: "ABAUQ1"},
            { label: "No", nextQuestion: "finish"}
        ]
    },
    ABAUQ1 : 
    {
        description: `Ophthalmic examination`,
        question: "(under development) Does the patient have granulomatous KPs?",
        options: [
            { label: "Yes", nextQuestion: "sarcoidosis"},
            { label: "No", nextQuestion: "ABAUQ2" }
        ]
    },
    ABAUQ2 : 
    {
        description: `Ophthalmic examination`,
        question: "(under development) Does the patient have systemic symptoms? (anorexia, fever, weight loss, fatigue, and polyuria)",
        options: [
            { label: "Yes", nextQuestion: "TINU"},
            { label: "No", nextQuestion: "UAU" }
        ]
    },
    laterality_r :
    {
        description: ``,
        question: "What is the laterality of the uveitis?",
        options: [
            { label: "Unilateral", nextQuestion: "heterochromia"},
            { label: "Unilateral, alternating", nextQuestion: "HLA_B27"},
            { label: "Bilateral", nextQuestion: "acute_bilateral_AU_algorithm" }
        ]
    },
    kp :
    {
        description: ``,
        question: "What is the KP of the uveitis?",
        options: [
            { label: "Stellate", nextQuestion: "fus_algorithm"},
            { label: "Granulomatous", nextQuestion: "viralAU_algorithm"},
            { label: "Non-granulomatous", nextQuestion: "screenViralAU" }
        ]
    },
    screenViralAU :
    {
        description: `Ophthalmic examination`,
        question: "Increased IOP in the absence of prior steroid treatment or iris atrophy/transillumination?",
        options: [
            { label: "Yes", nextQuestion: "viralAU_algorithm"},
            { label: "No", nextQuestion: "HLA_B27"},
        ]
    },
    fus_algorithm :
    {
        description: `
        <span style='font-weight:500'>Next step:</span> FUS-like AU algorithm<br>
        <span style='font-weight:500'>Differential diagnosis: </span>
        ${buttonModal('FUS','Fuchs Uveitis Syndrom',disDatabase('fus'),'fus')}
        ${buttonModal('CMV','Cytomagalovirus Anterior Uveitis',disDatabase('cmv'),'cmv')}
        `,
        question: `Does the patient have endotheliitis or nodular, coin-shaped endothelial lesions?`,
        options: [
            { label: "Yes", nextQuestion: "CMV"},
            { label: "No", nextQuestion: "FUS"}
        ]
    },
    CMV : {
        description: `
        <span style='font-weight:500'>Suspected diagnosis:</span>
        ${buttonModal('CMV','Cytomagalovirus Anterior Uveitis',disDatabase('cmv'),'cmv')}
        `,
        question: ``,
        options: []
    },
    FUS : {
        description: `
        <span style='font-weight:500'>Suspected diagnosis:</span>
        ${buttonModal('FUS','Fuchs Uveitis Syndrom',disDatabase('fus'),'fus')}
        `,
        question: ``,
        options: []
    },
    viralAU_algorithm :
    {
        description: `
        <span style='font-weight:500'>Next step:</span> Viral AU algorithm <br>
        <span style='font-weight:500'>Differential diagnosis: </span>
        ${buttonModal('CMV AU','Cytomegalovirus Anterior Uveitis',disDatabase('cmv'),'cmv')}
        ${buttonModal('HSV AU','Herpes Simplex Virus Anterior Uveitis',disDatabase('hsv'),'hsv')}
        ${buttonModal('VZV AU','Varicella Zoster Virus Anterior Uveitis',disDatabase('vzv'),'vzv')}
        `,
        question: `Continue?`,
        options: [
            { label: "Yes", nextQuestion: "VIAUQ1"},
            { label: "No", nextQuestion: "finish"}
        ]
    },
    VIAUQ1 : {
        description: `Ophthalmic examination`,
        question: `Does the patient have dendritic keratitis?`,
        options: [
            { label: "Yes", nextQuestion: "HSV"},
            { label: "No", nextQuestion: "VIAUQ2"}
        ]
    },
    HSV : {
        description: `
        <span style='font-weight:500'>Suspected diagnosis:</span>
        ${buttonModal('HSV AU','Herpes Simplex Virus Anterior Uveitis',disDatabase('hsv'),'hsv')}
        `,
        question: ``,
        options: []
    },
    VIAUQ2 : {
        description: `Ophthalmic examination`,
        question: `Does the patient have concurrent or recent dermatomal Herpes Zoster?`,
        options: [
            { label: "Yes", nextQuestion: "VZV"},
            { label: "No", nextQuestion: "VIAUQ3"}
        ]
    },
    VZV : {
        description: `
        <span style='font-weight:500'>Suspected diagnosis:</span>
        ${buttonModal('VZV AU','Varicella Zoster Virus Anterior Uveitis',disDatabase('vzv'),'vzv')}
        `,
        question: ``,
        options: []
    },
    VIAUQ3 : {
        description: ``,
        question: `Which clinical feature is most similar to the patient's presentation`,
        options: [
            { label: "Hypertensive anterior uveitis with granulomatous KPs", nextQuestion: "HSVORVZV"},
            { label: "PSS-like anterior uveitis", nextQuestion: "PSSLIKE"},
        ]
    },
    HSVORVZV : {
        description: `
        <span style='font-weight:500'>Suspected diagnosis:</span>
        ${buttonModal('HSV AU','Herpes Simplex Virus Anterior Uveitis',disDatabase('hsv'),'hsv')}
        ${buttonModal('VZV AU','Varicella Zoster Virus Anterior Uveitis',disDatabase('vzv'),'vzv')}
        `,
        question: `Which clinical feature is most similar to the patient's presentation`,
        options: [
            { label: "Sectoral iris atrophy in a patient < 50 years of age", nextQuestion: "HSV"},
            { label: "Sectoral iris atrophy in a patient > 60 years of age", nextQuestion: "VZV"},
            { label: "None", nextQuestion: "In_progress"}
        ]
    },
    PSSLIKE : {
        description: `
        <span style='font-weight:500'>Suspected diagnosis:</span>
        ${buttonModal('CMV AU','Cytomegalovirus Anterior Uveitis',disDatabase('cmv'),'cmv')}
        `,
        question: `Does the patient have endotheliitis or nodular, coin-shaped endothelial lesions?`,
        options: [
            { label: "Yes", nextQuestion: "CMV"},
            { label: "No", nextQuestion: "UAU"}
        ]
    },
    HLA_B27 :
    {
        question: ``,
        description: `
        <span style='font-weight:500'>Suspected diagnosis:</span>
        ${buttonModal('HLA-B27 SpA AU','HLA-B27 Spondyloarthritis Anterior Uveitis',disDatabase('hlab27'),'hlab27')}
        <br>
        <span style='font-weight:400'>We recommend following DUET algorithm</span>
        <br><br>
        <img src="/img/duet.png" class="img-fluid"></img>`,
        options: [
        ]
    },
    laterality_c :
    {
        description: ``,
        question: "What is the laterality of the uveitis?",
        options: [
            { label: "History of Alternating", nextQuestion: "HLA_B27"},
            { label: "Unilateral", nextQuestion: "RO_children"},
            { label: "Bilateral", nextQuestion: "RO_chronic_granulomatous_AU" }
        ]
    },
    RO_chronic_granulomatous_AU : {
        description: ``,
        question: "Does it have granulomatous KPs?",
        options: [
            { label: "Yes", nextQuestion: "RO_sarcoidosis_after_chronic_bilaterl"},
            { label: "No", nextQuestion: "CCBAU"},
        ]
    },
    RO_sarcoidosis_after_chronic_bilaterl : 
    {
        description: ``,
        question: "(under development) Does the patient have sarcoidosis?",
        options: [
            { label: "Yes", nextQuestion: "sarcoidosis"},
            { label: "No", nextQuestion: "viralAU_algorithm"},
        ]
    },
    sarcoidosis :
    {
        description: `
        <span style='font-weight:500'>Suspected diagnosis:</span>
        ${buttonModal('Sarcoidosis AU','Sarcoidosis Anterior Uveitis',null,'sarc')}
        `,
        question: ``,
        options: []
    },
    RO_children :
    {
        description: ``,
        question: "Is patient's age < 16?",
        options: [
            //CCBAU => childrean chronic bilateral anterior uveitis
            { label: "Yes", nextQuestion: "CCBAU"},
            { label: "No", nextQuestion: "heterochromia_c"},
        ]
    },
    CCBAU : {
        description: `
        <span style='font-weight:500'>Next step:</span> Chronic anterior uveitis in young age algorithm <br>
        <span style='font-weight:500'>Differential diagnosis: </span>
        ${buttonModal('JIA AU','Juvenile Idiopathic Arthritis Anterior Uveitis',disDatabase('jia'),'jia')}
        ${buttonModal('TINU','Tubulointerstitial Nephritis Uveitis',disDatabase('tinu'),'tinu')}
        `,
        question: `Continue?`,
        options: [
            { label: "Yes", nextQuestion: "RO_JIA"},
            { label: "No", nextQuestion: "finish"}
        ]
    },
    RO_JIA: {
        description: ``,
        question: "(under development) Does the patient have diagnosed oligoarhtritis or RF-negative polyarthritis or juvenile psoriatic arthritis?",
        options: [
            //CCBAU => childrean chronic bilateral anterior uveitis
            { label: "Yes", nextQuestion: "JIA"},
            { label: "No", nextQuestion: "RO_TINU"},
        ]
    },
    JIA :
    {
        description: `
        Suspected diagnosis: 
        ${buttonModal('JIA AU','Juvenile Idiopathic Arthritis Anterior Uveitis',disDatabase('jia'),'jia')}
        `,
        question: `
        `,
        options: [
        ]
    },
    RO_TINU :
    {
        description: ``,
        question: "(under development) Does the patient have systemic symptoms? (anorexia, fever, weight loss, fatigue, and polyuria)",
        options: [
            //CCBAU => childrean chronic bilateral anterior uveitis
            { label: "Yes", nextQuestion: "TINU"},
            { label: "No", nextQuestion: "UAU"},
        ]
    },
    TINU :
    {
        description: `
        Suspected diagnosis: 
        ${buttonModal('TINU','Tubulointerstitial Nephritis Uveitis',disDatabase('tinu'),'tinu')}
        `,
        question: `
        `,
        options: [
        ]
    },
    heterochromia_c : 
    {
        description: `Ophthalmic examination`,
        question: "Does the patient have heterochromia?",
        options: [
            { label: "Yes", nextQuestion: "fus_algorithm"},
            { label: "No", nextQuestion: "kp_c" }
        ]
    },
    kp_c :
    {
        description: ``,
        question: "What is the KP of the uveitis?",
        options: [
            { label: "Stellate", nextQuestion: "fus_algorithm"},
            { label: "Granulomatous", nextQuestion: "viralAU_algorithm"},
            { label: "Non-granulomatous", nextQuestion: "viralAU_algorithm" }
        ]
    },
    In_progress :
    {
        description: ``,
        question: "In progress",
        options: [
        ]
    },
    finish :
    {
        description: ``,
        question: "Thank you",
        options: [
        ]
    },
    UAU :
    {
        description: `50% of the patients with uveitis have <span style='font-weight:500'>undifferentiated uveitis</span>`,
        question: `
        `,
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
    
    let descriptionBox = document.createElement('div');
    descriptionBox.id = `description-${currentQuestion}`
    descriptionBox.innerHTML = questionList[currentQuestion].description;

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
    box.appendChild(descriptionBox);
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
            window.location.href = '/'
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
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
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
        cmv : `
        <img src="/img/SUN-CMV.png" class="img-fluid container-gap"></img>
        `,
        hsv : `
        <img src="/img/SUN-HSV.png" class="img-fluid container-gap"></img>
        `,
        vzv : `
        <img src="/img/SUN-VZV.png" class="img-fluid container-gap"></img>
        `,
        fus : `
        <img src="/img/SUN-FUS.png" class="img-fluid container-gap"></img>
        `,
        jia : `
        <img src="/img/SUN-JIA.png" class="img-fluid container-gap"></img>
        <img src="/img/SUN-JIA-Category.png" class="img-fluid container-gap"></img>
        `,
        hlab27 : `
            <img src="/img/SUN-HLAB27.png" class="img-fluid container-gap"></img>
            <img src="/img/SUN-ASAS.png" class="img-fluid container-gap"></img>
            <img src="/img/SUN-ASAS2.png" class="img-fluid container-gap"></img>
        `,
        tinu : `
        <img src="/img/SUN-TINU.png" class="img-fluid container-gap"></img>
        `,

        //SUN table and images
        anatLoc : `
        <img src="/img/SUN-ANATOMIC-LOCATION.png" class="img-fluid container-gap"></img>
        `,
        course : `
        <img src="/img/SUN-COURSE.png" class="img-fluid container-gap"></img>
        `
    }
    return database[dis]
}
