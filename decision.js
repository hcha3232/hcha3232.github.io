let answers = [
    //[asked_question, asked_answer]
];

let DDx = [];

const questionList = {
    anatomicLocation :
    {
        description: `
        `,
        question: "What is the anatomic location of the uveitis?",
        options: [
            { label: "Anterior uveitis (only available)", nextQuestion: "course" },
            { label: "Intermediate uveitis", nextQuestion: "In_progress" },
            { label: "Posterior uveitis", nextQuestion: "In_progress" },
            { label: "Panuveitis", nextQuestion: "In_progress" }
        ],
        footer: `${buttonModal('Anatomic Classification','Anatomic Classification',disDatabase('anatLoc'),'anatLoc')}`
    },
    course :
    {   
        description: ``,
        question: "What is the course of the uveitis?",
        options: [
            { label: "Acute, monophasic", nextQuestion: "laterality_m"},
            { label: "Acute, recurrent", nextQuestion: "laterality_r"},
            { label: "Chronic", nextQuestion: "laterality_c" }
        ],
        ddx : {
            most_likely: ``,
            possible: `${disButtonModal('cmv')} ${disButtonModal('hsv')}${disButtonModal('vzv')} ${disButtonModal('fus')}
            ${disButtonModal('hlab27')} ${disButtonModal('jia')}${disButtonModal('tinu')} ${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: ``
        },

        footer: `${buttonModal('Course','Course',disDatabase('course'),'course')}`
    },
    laterality_c : {
        description: ``,
        question: "What is the laterality of the uveitis?",
        options: [
            { label: "Unilateral", nextQuestion: "chronic_ul_kp"},
            { label: "Bilateral", nextQuestion: "chronic_bl_kp" },
            //history of alternating anterior uveitis will be asked same questions as recurrent alternating
            { label: "History of Alternating", nextQuestion: "acute_r_al_kp" }
        ]
    },
    chronic_bl_kp : {
        description: ``,
        question: "What is the KPs of the uveitis?",
        options: [
            { label: "Granulomatous", nextQuestion: "acute_m_bl_g_ddx"},
            //chronic granulomatous bilateral AU is just acute_m_bl_g_ddx
            { label: "Non-granulomatous", nextQuestion: "chronic_bl_ng_ddx" },
        ]
    },
    chronic_bl_ng_ddx : {
        description: `
        `,
        question: "Is the patient's age < 16 with insidious onset and mostly asymptomatic/minimally symptomatic history?",
        options: [
            { label: "Yes", nextQuestion: "is_it_jia"},
            { label: "No", nextQuestion: "chronic_bl_ng_not_jia"}
        ],
        ddx : {
            most_likely: ``,
            possible: `${disButtonModal('jia')}${disButtonModal('tinu')}${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')}${disButtonModal('vzv')}${disButtonModal('fus')} ${disButtonModal('hlab27')}`
        }   
    },
    chronic_bl_ng_not_jia : {
        description: ``,
        question: "(under development) Does the patient have systemic symptoms? (anorexia, fever, weight loss, fatigue, and polyuria)",
        options: [
            //CCBAU => childrean chronic bilateral anterior uveitis
            { label: "Yes", nextQuestion: "TINU"},
            { label: "No", nextQuestion: "NOT_TINU"},
        ]
    },
    NOT_TINU_c:{
        description: `
        `,
        question: `
        `,
        options: [
        ],
        ddx: {
            most_likely: ``,
            possible: `${disButtonModal('jia')}${disButtonModal('tinu')}${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')}${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')} ${disButtonModal('vzv')}
            ${disButtonModal('fus')}${disButtonModal('hlab27')}`
        }
    },
    chronic_ul_kp: {
        description: ``,
        question: "What is the KPs of the uveitis?",
        options: [
            { label: "Granulomatous", nextQuestion: "acute_m_ul_g_ddx"},
            //chronic granulomatous unilateral AU is viral algorithm
            { label: "Non-granulomatous", nextQuestion: "chronic_ul_ng_ddx" },
            { label: "Stellate", nextQuestion: "fus_algorithm"}
            //non-granulomatous alternating is HLA_B27
        ]
    },
    fus_algorithm : {
        description: `
        `,
        question: `Does the patient have endotheliitis or nodular, coin-shaped endothelial lesions?`,
        options: [
            { label: "Yes", nextQuestion: "CMV"},
            { label: "No", nextQuestion: "FUS"}
        ],
        ddx: {
            most_likely: ``,
            possible: `${disButtonModal('fus')}${disButtonModal('cmv')}
            ${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}
            `,
            less_likely: `${disButtonModal('hsv')}${disButtonModal('vzv')}
            ${disButtonModal('hlab27')}${disButtonModal('jia')} ${disButtonModal('tinu')}`
        }
    },
    chronic_ul_ng_ddx : {
        description: `
        `,
        question: "Does the patient have heterochromia",
        options: [
            { label: "Yes", nextQuestion: "fus_algorithm"},
            { label: "No", nextQuestion: "chronic_ul_ng_clinical_picture"}
        ],
        ddx : {
            most_likely: ``,
            possible: `${disButtonModal('cmv')} ${disButtonModal('hsv')}${disButtonModal('vzv')} ${disButtonModal('fus')}
            ${disButtonModal('hlab27')} ${disButtonModal('jia')}${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('tinu')}`
        }
    },
    chronic_ul_ng_clinical_picture :{
        description: `
        `,
        question: "Which clinical feature is most similar to the patient's presentation",
        options: [
            { label: "History of symptomatic attacks", nextQuestion: "acute_m_ul_ng_ddx"},
            //asking if it is viau or hlab27
            { label: "Age < 16 with insidious onset and mostly asymptomatic/minimally symptomatic history", nextQuestion: "is_it_jia"}
        ],
        ddx : {
            most_likely: ``,
            possible: `${disButtonModal('cmv')} ${disButtonModal('hsv')}${disButtonModal('vzv')} 
            ${disButtonModal('hlab27')} ${disButtonModal('jia')}${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('fus')} ${disButtonModal('tinu')}`
        }
    },
    is_it_jia: {
        description: `
        `,
        question: "Does the patient have diagnosed juvenile idiopathic arthritis?",
        options: [
            { label: "Yes", nextQuestion: "JIA"},
            { label: "No", nextQuestion: "NOT_DIAGNOSED_JIA"}
        ],
        ddx : {
            most_likely: ``,
            possible: `${disButtonModal('jia')}${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')}${disButtonModal('vzv')} ${disButtonModal('fus')}${disButtonModal('hlab27')}${disButtonModal('tinu')}`
        }
    },
    JIA :
    {
        description: ``,
        question: `
        `,
        options: [
        ],
        ddx : {
            most_likely: `${disButtonModal('jia')}`,
            possible: `${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')}${disButtonModal('vzv')} ${disButtonModal('fus')}${disButtonModal('hlab27')}${disButtonModal('tinu')}`
        }
    },
    NOT_DIAGNOSED_JIA : {
        description: `
        Consult with paediatrician
        `,
        question: `
        `,
        options: [
        ],
        ddx: {
            most_likely: `${disButtonModal('jia')}`,
            possible: `${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')} ${disButtonModal('vzv')}
            ${disButtonModal('fus')}${disButtonModal('hlab27')} ${disButtonModal('tinu')}`
        }
    },
    laterality_m :
    {
        description: ``,
        question: "What is the laterality of the uveitis?",
        options: [
            { label: "Unilateral", nextQuestion: "acute_m_ul_kp"},
            { label: "Bilateral", nextQuestion: "acute_m_bl_kp" }
        ]
    },
    laterality_r : {
        description: ``,
        question: "What is the laterality of the uveitis?",
        options: [
            { label: "Unilateral", nextQuestion: "acute_m_ul_kp"},
            { label: "Bilateral", nextQuestion: "acute_m_bl_kp" },
            //recurrent anterior uveitis will be asked with same questions as acute monophasic unilateral and bilateral
            { label: "Alternating", nextQuestion: "acute_r_al_kp" }
        ]
    },
    acute_r_al_kp:{
        description: ``,
        question: "What is the KPs of the uveitis?",
        options: [
            { label: "Granulomatous", nextQuestion: "acute_r_al_g_ddx"},
            { label: "Non-granulomatous", nextQuestion: "HLA_B27" }
            //non-granulomatous alternating is HLA_B27
        ]
    },
    acute_r_al_g_ddx :{
        description: `
        `,
        question: "",
        options: [
        ],
        ddx: {
            most_likely: ``,
            possible: `${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')} ${disButtonModal('vzv')}
            ${disButtonModal('fus')}${disButtonModal('hlab27')} ${disButtonModal('jia')}${disButtonModal('tinu')}`
        }
    },
    acute_m_ul_kp : {
        description: ``,
        question: "What is the KPs of the uveitis?",
        options: [
            { label: "Granulomatous", nextQuestion: "acute_m_ul_g_ddx"},
            { label: "Non-granulomatous", nextQuestion: "acute_m_ul_ng_ddx" }
        ]
    },
    acute_m_ul_g_ddx :
    {
        description: `
        `,
        question: `Does the patient have dendritic keratitis?`,
        options: [
            { label: "Yes", nextQuestion: "HSV"},
            { label: "No", nextQuestion: "viau_q2"}
        ],
        ddx: {
            most_likely: ``,
            possible: `${disButtonModal('cmv')} ${disButtonModal('hsv')}${disButtonModal('vzv')} 
            ${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('fus')}${disButtonModal('hlab27')} 
            ${disButtonModal('jia')}${disButtonModal('tinu')}`
        }
    },  
    HSV : {
        description: `
        `,
        question: ``,
        options: [],
        ddx: {
            most_likely: `${disButtonModal('hsv')}`,
            possible: `${disButtonModal('cmv')}${disButtonModal('vzv')} 
            ${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('fus')}${disButtonModal('hlab27')} 
            ${disButtonModal('jia')}${disButtonModal('tinu')}`    
        }
    },
    viau_q2 : {
        description: ``,
        question: `Does the patient have concurrent or recent dermatomal Herpes Zoster?`,
        options: [
            { label: "Yes", nextQuestion: "VZV"},
            { label: "No", nextQuestion: "viau_q3"}
        ]
    },
    VZV : {
        description: `
        `,
        question: ``,
        options: [],
        ddx: {
            most_likely: `${disButtonModal('vzv')}`,
            possible: `${disButtonModal('cmv')}${disButtonModal('hsv')} 
            ${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('fus')}${disButtonModal('hlab27')} 
            ${disButtonModal('jia')}${disButtonModal('tinu')}`    
        }
    },
    viau_q3 : {
        description: ``,
        question: `Which clinical feature is most similar to the patient's presentation`,
        options: [
            { label: "Granulomatous cluster of small and medium-sized KPs in Arlt's triangle [with or without corneal scars]", nextQuestion: "hsv_or_vzv"},
            { label: "PSS with few medium-sized KPs, minimal anterior chamber cells and extremely high IOP", nextQuestion: "pss_like_cmv"},
            { label: "None above", nextQuestion: "NO_VIRAL_PICTURE"}
        ]
    },
    NO_VIRAL_PICTURE : {
        description: `
        `,
        question: ``,
        options: [],
        ddx: {
            most_likely: ``,
            possible: `${disButtonModal('cmv')}${disButtonModal('hsv')} ${disButtonModal('vzv')} 
            ${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')}${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('fus')}${disButtonModal('hlab27')} 
            ${disButtonModal('jia')}${disButtonModal('tinu')}`    
        }
    },
    hsv_or_vzv : {
        description: `
        `,
        question: `Which clinical feature is most similar to the patient's presentation`,
        options: [
            { label: "Sectoral iris atrophy in a patient < 50 years of age", nextQuestion: "HSV"},
            { label: "Sectoral iris atrophy in a patient > 60 years of age", nextQuestion: "VZV"},
            { label: "None", nextQuestion: "NO_VIRAL_PICTURE"}
        ],
    },
    pss_like_cmv : {
        description: `
        To diagnose Cytomegalovirus anterior uveitis, a positive PCR should be obtained`,
        question: ``,
        options: [
        ],
        ddx: {
            most_likely: `${disButtonModal('cmv')}`,
            possible: `${disButtonModal('hsv')}${disButtonModal('vzv')} 
            ${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('fus')}${disButtonModal('hlab27')} 
            ${disButtonModal('jia')}${disButtonModal('tinu')}`    
        }
    },
    CMV : {
        description: `
        To diagnose Cytomegalovirus anterior uveitis, a positive PCR should be obtained`,
        question: ``,
        options: [
        ],
        ddx: {
            most_likely: `${disButtonModal('cmv')}`,
            possible: `${disButtonModal('fus')}
            ${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('hsv')}${disButtonModal('vzv')}${disButtonModal('hlab27')} 
            ${disButtonModal('jia')}${disButtonModal('tinu')}`
        }
    },
    FUS: {
        description: `
        `,
        question: ``,
        options: [],
        ddx: {
            most_likely: `${disButtonModal('fus')}`,
            possible: `${disButtonModal('cmv')}
            ${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('hsv')}${disButtonModal('vzv')}${disButtonModal('hlab27')} 
            ${disButtonModal('jia')}${disButtonModal('tinu')}`
        }
    },
    acute_m_ul_ng_ddx: {
        description: `
        `,
        question: `Increased IOP in the absence of prior steroid treatment or iris atrophy/transillumination?`,
        options: [
            { label: "Yes", nextQuestion: "acute_m_ul_g_ddx"},
            //going to acute_m_ul_g because it ask whether the user wants to do VIAU algorithm
            { label: "No", nextQuestion: "HLA_B27" }
        ],
        ddx: {
            most_likely: ``,
            possible: `${disButtonModal('cmv')}${disButtonModal('hsv')}${disButtonModal('vzv')}${disButtonModal('hlab27')}
            ${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('fus')}${disButtonModal('jia')}${disButtonModal('tinu')}`
        }
    },
    HLA_B27 :
    {
        description: `
        <span style='font-weight:400'>We recommend following DUET algorithm</span>
        <br>
        <img src="/img/duet.png" class="img-fluid"></img>`,
        question: ``,
        options: [
        ],
        ddx: {
            most_likely: `${disButtonModal('hlab27')}`,
            possible: `${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')}${disButtonModal('vzv')}${disButtonModal('fus')}${disButtonModal('jia')}${disButtonModal('tinu')}`
        }
    },
    acute_m_bl_kp: {
        description: ``,
        question: "What is the KPs of the uveitis?",
        options: [
            { label: "Granulomatous", nextQuestion: "acute_m_bl_g_ddx"},
            { label: "Non-granulomatous", nextQuestion: "acute_m_bl_ng_ddx" }
        ]
    },
    acute_m_bl_g_ddx :{
        description: ``,
        question: "",
        options: [
        ],
        ddx: {
            most_likely: ``,
            possible: `${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')} ${disButtonModal('vzv')}
            ${disButtonModal('fus')}${disButtonModal('hlab27')} ${disButtonModal('jia')}${disButtonModal('tinu')}`
        }
    },
    acute_m_bl_ng_ddx : {
        description: `
        `,
        question: "(under development) Does the patient have systemic symptoms? (anorexia, fever, weight loss, fatigue, and polyuria)",
        options: [
            { label: "Yes", nextQuestion: "TINU"},
            { label: "No", nextQuestion: "NOT_TINU_a" }
        ],
        ddx: {
            most_likely: ``,
            possible: `${disButtonModal('tinu')}${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')} ${disButtonModal('vzv')}
            ${disButtonModal('fus')}${disButtonModal('hlab27')} ${disButtonModal('jia')}`
        }
    },
    TINU : {
        description: `
        Consult with nephrologist
        `,
        question: `
        `,
        options: [
        ],
        ddx: {
            most_likely: `${disButtonModal('tinu')}`,
            possible: `${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')} ${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')} ${disButtonModal('vzv')}
            ${disButtonModal('fus')}${disButtonModal('hlab27')} ${disButtonModal('jia')}`
        }
    },
    NOT_TINU_a : {
        description: `
        `,
        question: `
        `,
        options: [
        ],
        ddx: {
            most_likely: ``,
            possible: ` ${disButtonModal('tinu')}${disButtonModal('syphilis')}${disButtonModal('sarcoidosis')}${disButtonModal('uau')}`,
            less_likely: `${disButtonModal('cmv')}${disButtonModal('hsv')} ${disButtonModal('vzv')}
            ${disButtonModal('fus')}${disButtonModal('hlab27')} ${disButtonModal('jia')}`
        }
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
    descriptionBox.classList = "lh-lg question-gap"
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

    if (questionList[currentQuestion].hasOwnProperty('footer')) {
        let footerBox = document.createElement('div');
        footerBox.classList = "container-gap"
        footerBox.id = `footer-${currentQuestion}`
        footerBox.innerHTML = '<br><br><span style="font-weight: 500">Note: </span>'
        footerBox.innerHTML += questionList[currentQuestion].footer;
        box.appendChild(footerBox);
    }

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

    if(questionList[currentQuestion].hasOwnProperty('ddx')){
        let ddxBox = document.createElement('div');
        ddxBox.classList = "container-gap container-gap-top border border-4 p-2 lh-lg";
        
        let mostlikely = questionList[currentQuestion].ddx.most_likely
        let possible = questionList[currentQuestion].ddx.possible
        let lesslikely = questionList[currentQuestion].ddx.less_likely
        ddxBox.innerHTML = `<span style="font-weight: 500">Differentials </span><br>`
        ddxBox.innerHTML += 'Most likely diagnosis<br>'
        ddxBox.innerHTML += mostlikely
        if(mostlikely != ''){
            ddxBox.innerHTML += '<br>'
        }
        ddxBox.innerHTML += 'Possible diagnosis<br>'
        ddxBox.innerHTML += possible
        ddxBox.innerHTML += '<br>Less likely diagnosis<br>'
        ddxBox.innerHTML += lesslikely
        box.appendChild(ddxBox)
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
        sarcoidosis : `
        <img src="/img/SUN-SARCOIDOSIS.png" class="img-fluid container-gap"></img>
        `,
        tb : `
            <img src="/img/SUN-TB.png" class="img-fluid container-gap"></img>
        `,
        syphilis : `
        <img src="/img/SUN-SYPHILIS.png" class="img-fluid container-gap"></img>
        <img src="/img/SUN-SYPHILIS-SCREENING.png" class="img-fluid container-gap"></img>
        `,
        uau : ``,
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

function disButtonModal(dis){
    if(dis==='cmv'){
        return buttonModal('CMV AU','Cytomegalovirus Anterior Uveitis',disDatabase('cmv'),'cmv')
    }
    if(dis==='hsv'){
        return buttonModal('HSV AU','Herpes Simplex Virus Anterior Uveitis',disDatabase('hsv'),'hsv')
    }
    if(dis==='vzv'){
        return buttonModal('VZV AU','Varicella Zoster Virus Anterior Uveitis',disDatabase('vzv'),'vzv')
    }
    if(dis==='fus'){
        return buttonModal('FUS','Fuchs Uveitis Syndrom',disDatabase('fus'),'fus')
    }
    if(dis==='hlab27'){
        return buttonModal('HLA-B27 SpA AU','HLA-B27 Spondyloarthritis Anterior Uveitis',disDatabase('hlab27'),'hlab27')
    }
    if(dis==='jia'){
        return buttonModal('JIA AU','Juvenile Idiopathic Arthritis Anterior Uveitis',disDatabase('jia'),'jia')
    }
    if(dis==='tinu'){
        return buttonModal('TINU','Tubulointerstitial Nephritis Uveitis',disDatabase('tinu'),'tinu')
    }
    if(dis==='sarcoidosis'){
        return buttonModal('Sarcoid AU','Sarcoid Uveitis',disDatabase('sarcoidosis'),'sarcoidosis')
    }
    if(dis==='syphilis'){
        return buttonModal('Syphilis','Syphilitic Uveitis',disDatabase('syphilis'),'syphilis')
    }
    if(dis==='uau'){
        return buttonModal('Undifferentiated anterior uveitis','Undifferentiated anterior uveitis',disDatabase('uau'),'uau')
    }
}
