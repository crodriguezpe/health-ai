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

}
