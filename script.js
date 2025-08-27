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

// Tasks
let tasks = [];
function addTask(){
    let t = document.getElementById("taskInput").value;
    let time = document.getElementById("taskTime").value;
    let email = document.getElementById("taskEmail").value;

    if(!t || !time){ alert("Enter task and time"); return;}

    tasks.push({task:t, time:time, email:email});
    displayTasks();
    scheduleNotification(t,time,email);

    document.getElementById("taskInput").value="";
    document.getElementById("taskTime").value="";
    document.getElementById("taskEmail").value="";
}

function displayTasks(){
    let ul = document.getElementById("taskList");
    ul.innerHTML="";
    tasks.forEach((tsk,i)=>{
        ul.innerHTML+=`
        <li>
            <b>${tsk.task}</b> at <i>${tsk.time}</i> 
            <span style="color:#555">Email: ${tsk.email||'Not provided'}</span>
            <button onclick="tasks.splice(${i},1);displayTasks()">Done</button>
        </li>`;
    });
}

function scheduleNotification(task,time,email){
    let [hours,minutes] = time.split(":");
    let now = new Date();
    let notifTime = new Date();
    notifTime.setHours(hours,minutes,0,0);
    let delay = notifTime.getTime() - now.getTime();
    if(delay>0){
        setTimeout(()=>{
            alert(`Reminder: ${task}`);
            if(email){
                console.log(`Simulated Email sent to ${email} for task: ${task}`);
            }
        }, delay);
    }
}

// Health & Meals placeholder
function calculateSchedule(){
    document.getElementById("results").innerHTML = "BMI: 22, Exercise: light, Meals: Balanced";
}
