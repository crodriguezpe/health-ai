// Health AI - Sprint 1
// app.js
const state = {
    age: 52,
    steps: 4000,
    sleepHours: 6.5,
    hrv: 40,
    restingHR: 60
};
function clamp(v, min = 0, max = 1) {
    return Math.max(min, Math.min(max, v));
}
function calculateScores() {
    const activity = Math.round(clamp(state.steps / 10000) * 100);
    const sleep = Math.round(
        clamp(1 - Math.abs(state.sleepHours - 7.5) / 3) * 100
    );
    const readiness = Math.round(
        activity * 0.35 +
        sleep * 0.30 +
        clamp(state.hrv / 60) * 20 +
        clamp(1 - (state.restingHR - 60) / 30) * 15
    );
    const healthAge = Math.round(
        state.age - ((readiness / 100 - 0.60) * 20)
    );
    return {
        activity,
        sleep,
        readiness,
        healthAge
    };
}
function updateDashboard() {
    state.steps =
Number(document.getElementById("stepsInput").value);

state.sleepHours =
Number(document.getElementById("sleepInput").value);

state.restingHR =
Number(document.getElementById("hrInput").value);

state.hrv =
Number(document.getElementById("hrvInput").value);

state.weight =
Number(document.getElementById("weightInput").value);

state.muscleMass =
Number(document.getElementById("muscleInput").value);

state.bodyFat =
Number(document.getElementById("fatInput").value);
    const scores = calculateScores();
    document.getElementById("healthAge").textContent =
        scores.healthAge;
    document.getElementById("readiness").textContent =
        scores.readiness;
    document.getElementById("sleepScore").textContent =
        scores.sleep;
    document.getElementById("activityScore").textContent =
        scores.activity;
    updateCoach(scores);
    if (typeof drawHealthChart === "function") {
        drawHealthChart(scores.healthAge);
    }
    if (typeof saveToday === "function") {
        saveToday(scores);
    }
}
function updateCoach(scores){
    let text="";
    if(scores.readiness>=85){
        text=
        "🔥 Excellent recovery.<br><br>" +
        "Today's recommendation:<br>" +
        "<b>T25 Gamma or Nova Gym Strength.</b>";
    }
    else if(scores.readiness>=70){
        text=
        "✅ Good recovery.<br><br>" +
        "Today's recommendation:<br>" +
        "<b>Treadmill + T25 Alpha.</b>";
    }
    else{
        text=
        "😴 Recovery is below your target.<br><br>" +
        "Today's recommendation:<br>" +
        "<b>Walking + Mobility + Stretching.</b>";
    }
    document.getElementById("coach").innerHTML=text;
}
document
.getElementById("analyzeButton")
.addEventListener("click",updateDashboard);
window.onload=updateDashboard;
