function calculateSchedule() {
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const wakeTime = document.getElementById("wakeTime").value;

  let results = `<h2>Personalized Schedule</h2>`;
  
  // BMI calculation
  if (weight && height) {
    const bmi = (weight / ((height/100) ** 2)).toFixed(1);
    results += `<p><b>BMI:</b> ${bmi} (${bmiStatus(bmi)})</p>`;
  }

  // Meals (different for gender/child)
  results += `<h3>Recommended Meals</h3>`;
  if (gender === "Male") {
    results += `
      🍳 Breakfast: 3 boiled eggs + 2 bread slices + 1 glass milk<br>
      🍲 Lunch: 200g chicken + rice 150g + salad<br>
      🍎 Snack: Apple + handful nuts<br>
      🍛 Dinner: 200g fish + vegetables<br>
      💧 Water: 2.5L daily
    `;
  } else if (gender === "Female") {
    results += `
      🥣 Breakfast: Oats + 1 boiled egg + green tea<br>
      🥗 Lunch: 150g chicken + vegetables + yogurt<br>
      🍇 Snack: Fruits + almonds<br>
      🥘 Dinner: Grilled chicken/fish + salad<br>
      💧 Water: 2L daily
    `;
  } else {
    results += `
      🥛 Breakfast: Milk + cornflakes + banana<br>
      🍝 Lunch: Small portion pasta + chicken + juice<br>
      🍪 Snack: Biscuits + milk<br>
      🍲 Dinner: Rice + vegetables + fish<br>
      💧 Water: 1.5L daily
    `;
  }

  // Exercises
  results += `<h3>Suggested Exercises</h3>`;
  if (gender === "Male") {
    results += "🏋️ Pushups (3x15), Running 30min, Cycling 20min";
  } else if (gender === "Female") {
    results += "🧘 Yoga 30min, Walking 40min, Light Cardio";
  } else {
    results += "⚽ Outdoor games, Skipping, Running 15min";
  }

  document.getElementById("results").innerHTML = results;
}

function bmiStatus(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal";
  if (bmi < 29.9) return "Overweight";
  return "Obese";
}
