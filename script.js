// Tabs functionality
function showTab(tabId){
  document.querySelectorAll('.tab-content').forEach(tc=>tc.style.display='none');
  document.getElementById(tabId).style.display='block';
}

// Age Calculator
function calculateAge(){
    let dobInput = document.getElementById("dob");
    if(!dobInput.value){ alert("Enter DOB"); return; }

    let dob = new Date(dobInput.value);
    let now = new Date();

    let diffMs = now - dob;
    let diffDate = new Date(diffMs);

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();
    let hours = now.getHours() - dob.getHours();
    let minutes = now.getMinutes() - dob.getMinutes();
    let seconds = now.getSeconds() - dob.getSeconds();

    if(seconds<0){ seconds+=60; minutes--; }
    if(minutes<0){ minutes+=60; hours--; }
    if(hours<0){ hours+=24; days--; }
    if(days<0){ 
        let prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if(months<0){ months+=12; years--; }

    document.getElementById("ageResult").innerHTML = `
        Age: ${years} years, ${months} months, ${days} days,
        ${hours} hours, ${minutes} minutes, ${seconds} seconds
    `;
}

// IPv4 Enhanced
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
    let firstHost = networkNum +1;
    let lastHost = broadcastNum -1;
    let gateway = firstHost;

    document.getElementById("ipv4Results").innerHTML = `
        IP Address: ${ip}<br>
        Subnet Mask: ${numToIp(maskNum)}<br>
        Network: ${numToIp(networkNum)}<br>
        Broadcast: ${numToIp(broadcastNum)}<br>
        First Usable: ${numToIp(firstHost)}<br>
        Last Usable: ${numToIp(lastHost)}<br>
        Gateway: ${numToIp(gateway)}<br>
        Binary IP: ${ipToBinary(ip)}<br>
        Binary Mask: ${ipToBinary(numToIp(maskNum))}
    `;
}

// Health & Meal
function calculateSchedule(){
    let age = parseInt(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);

    if(!age || !weight || !height){ alert("Enter all fields"); return; }

    let bmi = (weight / ((height/100)**2)).toFixed(2);
    let exercise = "Light exercise";

    if(age<13) exercise="Play & Stretching";
    else if(age>=13 && age<=40) exercise="Cardio & Strength Training";
    else exercise="Light walk & Yoga";

    document.getElementById("results").innerHTML = `
        BMI: ${bmi}<br>
        Suggested Exercise: ${exercise}
    `;

    // Sample meals
    document.getElementById("meal-plan").innerHTML = `
        Breakfast: Oats + Milk (200ml)<br>
        Lunch: Chicken/Beef + Bulgur + Vegetables (300g)<br>
        Snack: Fruits/Nuts (150g)<br>
        Dinner: Soup + Salad + Grilled Meat (250g)
    `;
}

// Tasks
function addTask(){
  let task = document.getElementById("taskInput").value;
  let time = document.getElementById("taskTime").value;
  let email = document.getElementById("taskEmail").value;
  if(!task || !time){ alert("Enter task & time"); return; }
  let li = document.createElement("li");
  li.innerHTML = `${task} - ${time} <button onclick="this.parentNode.remove()">Done</button>`;
  document.getElementById("taskList").appendChild(li);
}
