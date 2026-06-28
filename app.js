/*
==================================================
Health AI
Version 0.1
app.js
==================================================
*/

const APP = {

    profile:{

        age:52,
        height:176,
        weight:85,
        bodyFat:20,
        muscleMass:38

    },

    today:{

        steps:6500,
        sleep:7.4,
        hrv:48,
        restingHR:58,
        spo2:98,
        stress:28

    }

};


/*
=========================================
DOM HELPERS
=========================================
*/

function $(id){

    return document.getElementById(id);

}


/*
=========================================
PAGE NAVIGATION
=========================================
*/

const pages=[

    "dashboardPage",
    "historyPage",
    "workoutPage",
    "settingsPage"

];

function hidePages(){

    pages.forEach(page=>{

        $(page).style.display="none";

    });

}

function openPage(page){

    hidePages();

    $(page).style.display="block";

}


/*
=========================================
BOTTOM NAVIGATION
=========================================
*/

function activateButton(buttonId){

    document
        .querySelectorAll(".navButton")
        .forEach(btn=>btn.classList.remove("active"));

    $(buttonId).classList.add("active");

}

$("navDashboard").onclick=function(){

    openPage("dashboardPage");

    activateButton("navDashboard");

};

$("navHistory").onclick=function(){

    openPage("historyPage");

    activateButton("navHistory");

    refreshHistory();

};

$("navWorkout").onclick=function(){

    openPage("workoutPage");

    activateButton("navWorkout");

};

$("navSettings").onclick=function(){

    openPage("settingsPage");

    activateButton("navSettings");

};


/*
=========================================
READ INPUTS
=========================================
*/

function readInputs(){

    APP.today.steps=
        Number($("stepsInput").value);

    APP.today.sleep=
        Number($("sleepInput").value);

    APP.today.hrv=
        Number($("hrvInput").value);

    APP.today.restingHR=
        Number($("hrInput").value);

    APP.profile.weight=
        Number($("weightInput").value);

    APP.profile.bodyFat=
        Number($("fatInput").value);

    APP.profile.muscleMass=
        Number($("muscleInput").value);

    APP.today.spo2=
        Number($("spo2Input").value);

    APP.today.stress=
        Number($("stressInput").value);

}/*
=========================================
HEALTH AI ENGINE
=========================================
*/

function clamp(value,min,max){

    return Math.max(min,Math.min(max,value));

}

function calculateScores(){

    const sleepScore=
        Math.round(
            clamp(
                (APP.today.sleep/8)*100,
                0,
                100
            )
        );

    const activityScore=
        Math.round(
            clamp(
                (APP.today.steps/10000)*100,
                0,
                100
            )
        );

    const hrvScore=
        Math.round(
            clamp(
                (APP.today.hrv/60)*100,
                0,
                100
            )
        );

    const heartScore=
        Math.round(
            clamp(
                100-
                ((APP.today.restingHR-50)*2),
                0,
                100
            )
        );

    const bodyFatScore=
        Math.round(
            clamp(
                100-
                ((APP.profile.bodyFat-15)*3),
                0,
                100
            )
        );

    const stressScore=
        Math.round(
            clamp(
                100-
                APP.today.stress,
                0,
                100
            )
        );

    const readiness=

        Math.round(

            sleepScore*0.25+

            activityScore*0.20+

            hrvScore*0.20+

            heartScore*0.15+

            stressScore*0.10+

            bodyFatScore*0.10

        );

    const longevity=

        Math.round(

            readiness*0.70+

            heartScore*0.15+

            hrvScore*0.15

        );

    const healthAge=

        (

            APP.profile.age

            -

            ((longevity-50)/20)

        ).toFixed(1);

    return{

        sleepScore,

        activityScore,

        readiness,

        longevity,

        healthAge

    };

}


/*
=========================================
UPDATE SCREEN
=========================================
*/

function updateDashboard(scores){

    $("healthAge").textContent=scores.healthAge;

    $("readiness").textContent=scores.readiness+"%";

    $("sleepScore").textContent=scores.sleepScore;

    $("activityScore").textContent=scores.activityScore;

    $("longevityScore").textContent=scores.longevity;

    $("ageDifference").textContent=

        (

            APP.profile.age

            -

            Number(scores.healthAge)

        ).toFixed(1)

        +" years younger";

}


/*
=========================================
AI COACH
=========================================
*/

function updateCoach(scores){

    let text="";

    if(scores.readiness>=90){

        text=
        "🔥 Outstanding recovery.<br><br>"+
        "<b>Workout:</b> Nova Gym Strength or T25 Gamma.";

    }

    else if(scores.readiness>=80){

        text=
        "💪 Good readiness.<br><br>"+
        "<b>Workout:</b> T25 Beta or Treadmill Intervals.";

    }

    else if(scores.readiness>=70){

        text=
        "🙂 Moderate recovery.<br><br>"+
        "<b>Workout:</b> Easy cardio and mobility.";

    }

    else{

        text=
        "😴 Recovery is low.<br><br>"+
        "<b>Workout:</b> Walking, stretching and recovery.";

    }

    $("coachMessage").innerHTML=text;

    $("workoutRecommendation").innerHTML=text;

}


/*
=========================================
ANALYZE BUTTON
=========================================
*/

function analyzeToday(){

    readInputs();

    const scores=

        calculateScores();

    updateDashboard(scores);

    updateCoach(scores);

    if(typeof saveToday==="function"){

        saveToday(scores);

    }

    if(typeof drawHealthChart==="function"){

        drawHealthChart(scores.healthAge);

    }

    if(typeof refreshHistory==="function"){

        refreshHistory();

    }

}

$("analyzeButton").onclick=

    analyzeToday;


/*
=========================================
STARTUP
=========================================
*/

window.onload=function(){

    openPage("dashboardPage");

    activateButton("navDashboard");

    analyzeToday();

};
