const hour = document.getElementById('clock-hour'),
      minutes = document.getElementById('clock-minutes'),
      seconds = document.getElementById('clock-seconds');

const textHour = document.getElementById('text-hour'),
      textMinutes = document.getElementById('text-minutes'),
      textAmPm = document.getElementById('text-ampm'),
      dateDay = document.getElementById('date-day'),
      dateMonth = document.getElementById('date-month'),
      dateYear = document.getElementById('date-year');

let elapsedTime = 0, // Time in milliseconds
    interval = null,
    stopwatchRunning = false;

// Function to update stopwatch UI
const updateStopwatch = () => {
    let totalSeconds = Math.floor(elapsedTime / 1000),
        hh = Math.floor(totalSeconds / 3600),
        mm = Math.floor((totalSeconds % 3600) / 60),
        ss = totalSeconds % 60;

    // Update clock hands
    let hRotation = hh * 30 + mm / 2,
        mRotation = mm * 6,
        sRotation = ss * 6;

        hour.style.transform = `rotateZ(${hRotation}deg)`;
        minutes.style.transform = `rotateZ(${mRotation}deg)`;
        seconds.style.transform = `rotateZ(${sRotation}deg)`;
        
        // Update text elements
        textHour.innerHTML = hh < 10 ? `0${hh}` : hh;
        textMinutes.innerHTML = mm < 10 ? `0${mm}` : mm;
        textAmPm.innerHTML = ss < 10 ? `0${ss}` : ss;
};




// Start the stopwatch
const startStopwatch = () => {
    if (!stopwatchRunning) {
        let startTime = Date.now() - elapsedTime;
        interval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateStopwatch();
        }, 1000);
        stopwatchRunning = true;
    }
};

// Stop the stopwatch
const stopStopwatch = () => {
    if (stopwatchRunning) {
        clearInterval(interval);
        stopwatchRunning = false;
    }
};

// Reset the stopwatch
const resetStopwatch = () => {
    clearInterval(interval);
    stopwatchRunning = false;
    elapsedTime = 0;
    updateStopwatch();
};

// Event listeners for Start, Stop, and Reset buttons
document.getElementById('start-button').addEventListener('click', startStopwatch);
document.getElementById('stop-button').addEventListener('click', stopStopwatch);
document.getElementById('reset-button').addEventListener('click', resetStopwatch);

// Dark/Light Theme Toggle
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bxs-sun';

// Get selected theme and icon from localStorage
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Set theme and icon based on previous selection
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme);
}

// Theme toggle functionality
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});