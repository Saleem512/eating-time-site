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

// --- Age Calculator ---
function calculateAge(){
  let dobInput = document.getElementById("dob");
  if(!dobInput.value){ alert("Enter DOB"); return; }

  let dob = new Date(dobInput.value);
  let diff = Date.now() - dob.getTime();
  let age_dt = new Date(diff);
  let years = age_dt.getUTCFullYear()-1970;
  document.getElementById("ageResult").innerHTML = `Age: ${years} years`;
}

// --- IPv4 Enhanced Calculator ---
function calculateIPv4Enhanced(){
    let cidrInput = document.getElementById("ipCidr");
    if(!cidrInput.value.includes("/")) { alert("Enter CIDR like 192.168.1.2/23"); return; }

    let [ip, prefix] = cidrInput.value.split("/");
    prefix = parseInt(prefix);

    function ipToNum(ip){ return ip.split(".").reduce((acc,o)=>acc*256 + parseInt(o),0); }
    function numToIp(num){ return [num>>24 & 255, num>>16 & 255, num>>8 & 255, num & 255].join("."); }
    function ipToBinary(ip){ return ip.split('.').map(o=>("00000000"+parseInt(o).toString(2)).slice(-8)).join('.'); }

    let maskNum = (~0 << (32-prefix)) >>> 0;
    let mask = numToIp(maskNum);

    let ipNum = ipToNum(ip);
    let networkNum = ipNum & maskNum;
    let broadcastNum = networkNum | (~maskNum >>> 0);

    let firstUsable = (prefix>=31)? networkNum : networkNum +1;
    let lastUsable = (prefix>=31)? broadcastNum : broadcastNum-1;
    let usableHosts = (prefix>=31)? (prefix===31?2:1) : (broadcastNum - networkNum -1);
    let gateway = firstUsable;

    document.getElementById("ipv4Results").innerHTML = `
        <p><b>IP Address:</b> ${ip}</p>
        <p><b>Subnet Mask:</b> ${mask}</p>
        <p><b>Prefix:</b> /${prefix}</p>
        <p><b>Network Address:</b> ${numToIp(networkNum)} (${ipToBinary(numToIp(networkNum))})</p>
        <p><b>First Usable Address:</b> ${numToIp(firstUsable)} (${ipToBinary(numToIp(firstUsable))})</p>
        <p><b>Last Usable Address:</b> ${numToIp(lastUsable)} (${ipToBinary(numToIp(lastUsable))})</p>
        <p><b>Broadcast Address:</b> ${numToIp(broadcastNum)} (${ipToBinary(numToIp(broadcastNum))})</p>
        <p><b>Usable Hosts:</b> ${usableHosts}</p>
        <p><b>Suggested Gateway:</b> ${numToIp(gateway)}</p>
    `;
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

// --- Current Affairs ---
const currentAffairs = [
  {title:"BBC World",link:"https://www.bbc.com/news"},
  {title:"CNN",link:"https://www.cnn.com"},
  {title:"Al Jazeera",link:"https://www.aljazeera.com/news/"}
];
function showCurrentAffairs(){
  const container = document.getElementById("currentAffairs");
  container.innerHTML="";
  currentAffairs.forEach(c=>{
    container.innerHTML+=`<p><a href="${c.link}" target="_blank">${c.title}</a></p>`;
  });
}
showCurrentAffairs();

// --- Google Translate Widget ---
function addGoogleTranslate(){
  let gtDiv = document.createElement("div");
  gtDiv.id="google_translate_element";
  document.body.prepend(gtDiv);

  let script = document.createElement("script");
  script.src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);

  window.googleTranslateElementInit = function(){
    new google.translate.TranslateElement({pageLanguage:'en'},'google_translate_element');
  }
}
addGoogleTranslate();
