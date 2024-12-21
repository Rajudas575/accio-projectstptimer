const timeStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  fontSize: "30px",
  padding: "20px",
  letterSpacing: "10px",
  margin: "20px",
};

const colonStyle = {
  padding: "0 5px",
};

// Elements
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startButton = document.getElementById("start-timer");
const timerList = document.getElementById("timer-list");
const endSound = document.getElementById("end-sound");
const msg1 = document.getElementById("msg1");

// Array to store timers
let timers = [];

// Function to update the display of the active timers
function updateTimerDisplay() {
  timerList.innerHTML = "";
  timers.forEach((timer, index) => {
    const li = document.createElement("li");
    li.className = "timer";
    if (timer.isEnded) {
      li.classList.add("end");
    }

    li.innerHTML = `
            <div style="margin-top:20px; letterSpacing: 10px">Time Left: <span style="margin-left:40px; padding-left:10px"> ${formatTime(
              timer.timeRemaining
            )}</span>
            <button data-index="${index}" class="stop-timer" style="margin-left: 107px;">Delete</button>
            </div>
        `;
    timerList.appendChild(li);
  });
}

// Format time as HH:MM:SS
function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

// Start a new timer
function startTimer() {
  msg1.style.display = "none";
  let hours = parseInt(hoursInput.value) || 0;
  let minutes = parseInt(minutesInput.value) || 0;
  let seconds = parseInt(secondsInput.value) || 0;

  // Validate time input
  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please enter a valid time.");
    return;
  }

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  const timer = {
    timeRemaining: totalSeconds,
    intervalId: null,
    isEnded: false,
  };

  // Start the countdown
  timer.intervalId = setInterval(() => {
    if (timer.timeRemaining > 0) {
      timer.timeRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(timer.intervalId);
      timer.isEnded = true;
      endSound.play(); // Play sound when timer ends
      updateTimerDisplay();
    }
  }, 1000);

  timers.push(timer);
  updateTimerDisplay();
}

// Stop a timer
function stopTimer(event) {
  const index = event.target.getAttribute("data-index");
  const timer = timers[index];
  clearInterval(timer.intervalId);
  timers.splice(index, 1);
  updateTimerDisplay();
}

// Event Listeners
startButton.addEventListener("click", startTimer);

timerList.addEventListener("click", (event) => {
  if (event.target.classList.contains("stop-timer")) {
    stopTimer(event);
  }
});
