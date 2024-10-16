let isRecording = false;
let timerInterval;
let seconds = 0;

const startButton = document.getElementById('startButton');
const stopwatchDisplay = document.getElementById('stopwatch');
const transcriptionDisplay = document.getElementById('transcription');
const languageSelect = document.getElementById('languageSelect');

// Update transcription display based on selected language
function updateTranscriptionMessage() {
    const selectedLanguage = languageSelect.options[languageSelect.selectedIndex].text;
    transcriptionDisplay.textContent = `Transcribing in ${selectedLanguage}...`;
}

// Set up event listener for language change
languageSelect.addEventListener('change', updateTranscriptionMessage);

// Initial transcription message
updateTranscriptionMessage();

startButton.addEventListener('click', () => {
    if (!isRecording) {
        startRecording();
        startButton.textContent = 'Stop';
    } else {
        stopRecording();
        startButton.textContent = 'Start';
    }
});

function startRecording() {
    isRecording = true;
    startTimer();
    
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.interimResults = true;
    recognition.lang = languageSelect.value; // Set language based on selection
    
    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        transcriptionDisplay.textContent = transcript;
    };

    recognition.onend = () => {
        isRecording = false;
        stopTimer();
    };

    recognition.start();
}

function stopRecording() {
    isRecording = false;
    transcriptionDisplay.textContent += ' (Recording stopped)';
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 120;
        stopwatchDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}
