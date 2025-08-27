function calculateSchedule() {
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const wakeTime = document.getElementById("wakeTime").value;

    if (!age || !weight || !height) {
        alert("Please fill all fields!");
        return;
    }

    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(2);

    let exercise = "";
    if (age < 18) {
        exercise = "Light play & stretching";
    } else if (bmi < 18.5) {
        exercise = "Moderate exercise";
    } else if (bmi < 25) {
        exercise = "Cardio + Strength";
    } else {
        exercise = "Low-impact cardio & stretching";
    }

    let meals = {
        breakfast: "Oats + Milk",
        lunch: "Chicken/Beef + Bulgur + Vegetables",
        snack: "Fruits / Nuts",
        dinner: "Soup + Salad + Grilled Meat"
    };

    const [wakeHour, wakeMin] = wakeTime.split(":").map(Number);

    function addTime(hour, min, addMinutes) {
        let total = hour*60 + min + addMinutes;
        let h = Math.floor(total/60)%24;
        let m = total%60;
        return (h<10?"0":"")+h + ":" + (m<10?"0":"")+m;
    }

    const schedule = `
    <h2>Results:</h2>
    <p><strong>BMI:</strong> ${bmi}</p>
    <p><strong>Suggested Exercise:</strong> ${exercise}</p>
    <h3>Daily Schedule:</h3>
    <table border="1" cellpadding="5">
        <tr><th>Time</th><th>Activity / Meal</th></tr>
        <tr><td>${wakeTime}</td><td>Wake up & Drink water</td></tr>
        <tr><td>${addTime(wakeHour,wakeMin,30)}</td><td>Breakfast: ${meals.breakfast}</td></tr>
        <tr><td>${addTime(wakeHour,wakeMin,180)}</td><td>Snack: ${meals.snack}</td></tr>
        <tr><td>${addTime(wakeHour,wakeMin,360)}</td><td>Lunch: ${meals.lunch}</td></tr>
        <tr><td>${addTime(wakeHour,wakeMin,540)}</td><td>Light Exercise / Stretching</td></tr>
        <tr><td>${addTime(wakeHour,wakeMin,600)}</td><td>Snack: ${meals.snack}</td></tr>
        <tr><td>${addTime(wakeHour,wakeMin,720)}</td><td>Dinner: ${meals.dinner}</td></tr>
        <tr><td>${addTime(wakeHour,wakeMin,870)}</td><td>Evening Light Exercise / Stretching</td></tr>
        <tr><td>${addTime(wakeHour,wakeMin,960)}</td><td>Sleep</td></tr>
    </table>
    `;

    document.getElementById("results").innerHTML = schedule;
}
