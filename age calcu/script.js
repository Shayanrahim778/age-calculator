let interval;

function startLiveCounter() {
    clearInterval(interval);
    calculateAge();
    interval = setInterval(calculateAge, 1000); // Update every second
}

function calculateAge() {
    let birthdate = document.getElementById("birthdate").value;
    let birthHour = parseInt(document.getElementById("birth-hour").value) || 0;
    let birthMinute = parseInt(document.getElementById("birth-minute").value) || 0;
    let birthSecond = parseInt(document.getElementById("birth-second").value) || 0;

    if (!birthdate) {
        document.getElementById("result").innerHTML = "❗ Please enter your birthdate.";
        return;
    }

    // Create a Date object for birth date and time
    let birthDate = new Date(birthdate);
    birthDate.setHours(birthHour, birthMinute, birthSecond);

    let currentDate = new Date();

    // Calculate total time difference in milliseconds
    let timeDifference = currentDate - birthDate;

    if (timeDifference < 0) {
        document.getElementById("result").innerHTML = "❗ Birthdate cannot be in the future!";
        return;
    }

    // Convert difference to seconds, minutes, hours
    let totalSeconds = Math.floor(timeDifference / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);
    let totalHours = Math.floor(totalMinutes / 60);

    // Calculate exact age in years, months, days
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        let prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        ageDays += prevMonthDays;
        ageMonths--;
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    document.getElementById("result").innerHTML = `
        🎂 You are <b>${ageYears} years</b>, <b>${ageMonths} months</b>, and <b>${ageDays} days</b> old. <br>
        ⏳ That’s about <b>${totalHours} hours</b>, <b>${totalMinutes} minutes</b>, and <b>${totalSeconds} seconds</b>!  
    `;
}

// Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
