const meals = {
  "Male": [
    { meal: "Breakfast", items: ["3 boiled eggs", "2 slices bread", "1 glass milk 250ml"] },
    { meal: "Lunch", items: ["200g chicken", "150g rice", "Salad"] },
    { meal: "Snack", items: ["Apple", "Handful nuts 30g"] },
    { meal: "Dinner", items: ["200g fish", "Vegetables", "Milkshake 200ml"] }
  ],
  "Female": [
    { meal: "Breakfast", items: ["Oats 50g", "1 boiled egg", "Green tea 200ml"] },
    { meal: "Lunch", items: ["150g chicken", "Vegetables", "Yogurt 100ml"] },
    { meal: "Snack", items: ["Fruits", "Almonds 20g"] },
    { meal: "Dinner", items: ["Grilled chicken/fish 150g", "Salad", "Milkshake 200ml"] }
  ],
  "Child": [
    { meal: "Breakfast", items: ["Milk 200ml", "Cornflakes 50g", "Banana"] },
    { meal: "Lunch", items: ["Small pasta portion 100g", "Chicken 100g", "Juice 150ml"] },
    { meal: "Snack", items: ["Biscuits 30g", "Milk 150ml"] },
    { meal: "Dinner", items: ["Rice 100g", "Vegetables", "Fish 100g"] }
  ]
};

function calculateSchedule() {
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  let wakeTime = document.getElementById("wakeTime").value;

  if (!age || !weight || !height) {
    alert("Please fill all fields");
    return;
  }

  let bmi = (weight / ((height/100) ** 2)).toFixed(2);
  let exercise;
  if (gender === "Child") exercise = "Light play & stretching";
  else exercise = "Cardio & Strength Training";

  document.getElementById("results").innerHTML = `
    <p><b>BMI:</b> ${bmi}</p>
    <p><b>Suggested Exercise:</b> ${exercise}</p>
    <p><b>Junk Food Warning:</b> Avoid Burgers, Fries, Soda. Choose healthy options!</p>
  `;

  showMeals(gender);
}

function showMeals(gender) {
  const container = document.getElementById("meal-plan");
  container.innerHTML = "";
  meals[gender].forEach(meal => {
    container.innerHTML += `<div class="meal-card"><b>${meal.meal}:</b> ${meal.items.join(", ")}</div>`;
  });
}
