async function calculateSchedule() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseInt(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const wakeTime = document.getElementById('wakeTime').value;

    if (!age || !weight || !height) {
        alert("Please fill all fields!");
        return;
    }

    // BMI
    const bmi = (weight / ((height/100)**2)).toFixed(2);

    // Water
    const waterMl = weight*35;
    const waterGlasses = Math.round(waterMl/250);

    // Load meals & exercises
    const mealsResp = await fetch('meal.json');
    const mealsData = await mealsResp.json();
    const exercisesResp = await fetch('exercise.json');
    const exercisesData = await exercisesResp.json();

    const meals = mealsData.find(m => m.category === gender).meals;
    const exercises = exercisesData.filter(e => e.category === gender);

    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.remove('animate__fadeIn');
    void resultsDiv.offsetWidth; // trigger reflow
    resultsDiv.classList.add('animate__animated', 'animate__fadeIn');

    let html = `<h2>Results:</h2>`;
    html += `<p><strong>BMI:</strong> ${bmi}</p>`;
    html += `<p><strong>Daily Water:</strong> ${waterMl} ml (~${waterGlasses} glasses)</p>`;

    html += `<h3>Exercises:</h3><ul>`;
    exercises.forEach(e => {
        html += `<li><img src="${e.image}" width="50" alt="${e.exercise}"> ${e.exercise} - ${e.duration}</li>`;
    });
    html += `</ul>`;

    html += `<h3>Meals:</h3>`;
    meals.forEach(m => {
        html += `<div class="meal">
                    <img src="${m.image}" alt="${m.item}">
                    <div>
                        <strong>${m.meal}:</strong> ${m.item}<br>
                        <em>Quantity:</em> ${m.quantity}<br>
                        <em>Calories:</em> ${m.calories} kcal
                    </div>
                 </div>`;
    });

    html += `<p><strong>Note:</strong> Avoid junk food such as fries, sugary drinks, chips.</p>`;

    resultsDiv.innerHTML = html;
}
