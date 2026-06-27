/*
=========================================
Health AI Storage Engine
Sprint 1
=========================================
*/

const STORAGE_KEY = "healthAI_v1";

/*
Default profile
*/

const defaultProfile = {

    age:52,
    height:176,
    sex:"male",

    goal:"Lose Fat / Gain Muscle",

    created:new Date().toISOString(),

    history:[]

};


/*
Load complete database
*/

function loadDatabase(){

    let db=localStorage.getItem(STORAGE_KEY);

    if(!db){

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultProfile)
        );

        return structuredClone(defaultProfile);

    }

    return JSON.parse(db);

}


/*
Save database
*/

function saveDatabase(db){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(db)

    );

}


/*
Today's date
*/

function todayKey(){

    return new Date().toISOString().substring(0,10);

}


/*
Save today's health metrics

One entry per day.
If today's entry already exists,
replace it.
*/

function saveToday(scores){

    const db=loadDatabase();

    const today=todayKey();

    const record={

        date:today,

        healthAge:scores.healthAge,

        readiness:scores.readiness,

        sleep:scores.sleep,

        activity:scores.activity,

        steps:state.steps,

        sleepHours:state.sleepHours,

        hrv:state.hrv,

        restingHR:state.restingHR,

        weight:state.weight || 85,

        bodyFat:state.bodyFat || 20,

        muscleMass:state.muscleMass || 38

    };

    const index=db.history.findIndex(

        x=>x.date===today

    );

    if(index>=0){

        db.history[index]=record;

    }

    else{

        db.history.push(record);

    }

    saveDatabase(db);

}


/*
Return history
*/

function getHistory(){

    return loadDatabase().history;

}


/*
Return latest entry
*/

function latestRecord(){

    const h=getHistory();

    if(h.length===0) return null;

    return h[h.length-1];

}


/*
Average readiness
*/

function averageReadiness(days=7){

    const h=getHistory();

    if(h.length===0) return 0;

    const recent=h.slice(-days);

    const avg=

        recent.reduce(

            (a,b)=>a+b.readiness,

            0

        )/recent.length;

    return Math.round(avg);

}


/*
Average Health Age
*/

function averageHealthAge(days=7){

    const h=getHistory();

    if(h.length===0) return 0;

    const recent=h.slice(-days);

    const avg=

        recent.reduce(

            (a,b)=>a+b.healthAge,

            0

        )/recent.length;

    return avg.toFixed(1);

}


/*
Clear database

Useful during development.
*/

function clearDatabase(){

    localStorage.removeItem(

        STORAGE_KEY

    );

    location.reload();

}

console.log(

"Health AI Storage Ready"

);
