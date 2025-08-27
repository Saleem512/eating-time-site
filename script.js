// --- Tabs ---
function showTab(tab) {
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(c => c.style.display = "none");
  document.getElementById(tab).style.display = "block";
}
showTab('health'); // default tab

// --- Health & Meal ---
const meals = {
  "Male":[
    {meal:"Breakfast",items:["3 eggs","2 slices bread","Milk 250ml"]},
    {meal:"Lunch",items:["200g chicken","150g rice","Salad"]},
    {meal:"Snack",items:["Apple","Nuts 30g"]},
    {meal:"Dinner",items:["200g fish","Veggies","Milkshake 200ml"]}
  ],
  "Female":[
    {meal:"Breakfast",items:["Oats 50g","1 egg","Green tea 200ml"]},
    {meal:"Lunch",items:["150g chicken","Veggies","Yogurt 100ml"]},
    {meal:"Snack",items:["Fruits","Almonds 20g"]},
    {meal:"Dinner",items:["Grilled chicken/fish 150g","Salad","Milkshake 200ml"]}
  ],
  "Child":[
    {meal:"Breakfast",items:["Milk 200ml","Cornflakes 50g","Banana"]},
    {meal:"Lunch",items:["Pasta 100g","Chicken 100g","Juice 150ml"]},
    {meal:"Snack",items:["Biscuits 30g","Milk 150ml"]},
    {meal:"Dinner",items:["Rice 100g","Veggies","Fish 100g"]}
  ]
};

function calculateSchedule(){
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;

  if(!age || !weight || !height){ alert("Fill all fields"); return; }

  let bmi = (weight / ((height/100)**2)).toFixed(2);
  let exercise = (gender==="Child")?"Light play & stretching":"Cardio & Strength training";

  document.getElementById("results").innerHTML = `
    <p><b>BMI:</b> ${bmi}</p>
    <p><b>Suggested Exercise:</b> ${exercise}</p>
    <p><b>Junk Food Warning:</b> Avoid burgers, fries, soda!</p>
  `;
  showMeals(gender);
}

function showMeals(gender){
  const container = document.getElementById("meal-plan");
  container.innerHTML="";
  meals[gender].forEach(m=>{
    container.innerHTML+=`<div class="meal-card"><b>${m.meal}:</b> ${m.items.join(", ")}</div>`;
  });
}

// --- IPv4 Calculator ---
function calculateIPv4(){
    let ip = document.getElementById("ip").value.trim();
    let mask = document.getElementById("subnet").value.trim();
    if(!ip || !mask){ alert("Fill IP & Mask"); return; }

    function ipToBinary(ip){
        return ip.split('.').map(octet => ("00000000" + parseInt(octet).toString(2)).slice(-8)).join('');
    }
    function binaryToIp(bin){
        let octets = [];
        for(let i=0;i<32;i+=8){
            octets.push(parseInt(bin.slice(i,i+8),2));
        }
        return octets.join('.');
    }

    let ipBin = ipToBinary(ip);
    let maskBin = ipToBinary(mask);

    // Network address: ip & mask
    let networkBin = "";
    for(let i=0;i<32;i++){
        networkBin += (ipBin[i]==="1" && maskBin[i]==="1") ? "1" : "0";
    }

    // Broadcast address: network | inverted mask
    let invertedMask = maskBin.split('').map(b => b==="1" ? "0" : "1").join('');
    let broadcastBin = "";
    for(let i=0;i<32;i++){
        broadcastBin += (networkBin[i]==="1" || invertedMask[i]==="1") ? "1" : "0";
    }

    // Count usable hosts
    let maskOnes = maskBin.split('1').length - 1;
    let usableHosts = Math.pow(2, 32 - maskOnes) - 2;

    document.getElementById("ipv4Results").innerHTML = `
        <p><b>Network Address:</b> ${binaryToIp(networkBin)}</p>
        <p><b>Broadcast Address:</b> ${binaryToIp(broadcastBin)}</p>
        <p><b>Usable Hosts:</b> ${usableHosts}</p>
    `;
}

// --- Age Calculator ---
function calculateAge(){
  let dob = new Date(document.getElementById("dob").value);
  if(!dob){ alert("Enter DOB"); return;}
  let diff = Date.now() - dob.getTime();
  let age_dt = new Date(diff);
  let years = age_dt.getUTCFullYear()-1970;
  document.getElementById("ageResult").innerHTML = `Age: ${years} years`;
}

// --- Tasks ---
let tasks = [];
function addTask(){
  let t = document.getElementById("taskInput").value;
  let time = document.getElementById("taskTime").value;
  if(!t || !time){ alert("Enter task and time"); return;}
  tasks.push({task:t,time:time});
  displayTasks();
  scheduleNotification(t,time);
  document.getElementById("taskInput").value="";
}

function displayTasks(){
  let ul = document.getElementById("taskList");
  ul.innerHTML="";
  tasks.forEach((tsk,i)=>{
    ul.innerHTML+=`<li>${tsk.task} at ${tsk.time} <button onclick="tasks.splice(${i},1);displayTasks()">Done</button></li>`;
  });
}

function scheduleNotification(task,time){
  let [hours,minutes] = time.split(":");
  let now = new Date();
  let notifTime = new Date();
  notifTime.setHours(hours,minutes,0,0);
  let delay = notifTime.getTime() - now.getTime();
  if(delay>0){
    setTimeout(()=>{ alert(`Reminder: ${task}`); },delay);
  }
}
