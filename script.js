function calculateSchedule() {
    let age = document.getElementById('age').value;
    let gender = document.getElementById('gender').value;
    let weight = document.getElementById('weight').value;
    let height = document.getElementById('height').value;
    let wakeTime = document.getElementById('wakeTime').value;

    if(!age || !weight || !height){
        alert("Please fill all fields!");
        return;
    }

    let bmi = (weight / ((height/100)*(height/100))).toFixed(2);

    fetch('meal.json')
    .then(res => res.json())
    .then(mealsData => {
        let selectedMeals = mealsData.find(m => m.category === gender);
        fetch('exercise.json')
        .then(res => res.json())
        .then(exData => {
            let selectedExercises = exData.filter(e => e.category === gender);

            let html = `<p><strong>BMI:</strong> ${bmi}</p>`;
            html += `<p><strong>Suggested Exercise:</strong> ${selectedExercises.map(e => e.exercise + " (" + e.duration + ")").join(", ")}</p>`;
            html += `<p><strong>Suggested Meals Today:</strong></p>`;
            selectedMeals.meals.forEach(m => {
                html += `<p>${m.meal}: ${m.item} | Quantity: ${m.quantity} | Calories: ${m.calories} kcal</p>`;
            });

            document.getElementById('results').innerHTML = html;
        });
    });
}
