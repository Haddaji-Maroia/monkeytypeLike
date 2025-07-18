import { settings } from './settings.js';

let gameStarted = false;
let remainingTime = 30;
let timerInterval = null;

function startTimer() {
    const timerElement = document.getElementById("timer");

    // Imposta il valore iniziale
    timerElement.textContent = `${remainingTime}s`;
    timerElement.setAttribute("datetime", `P${remainingTime}S`);

    timerInterval = setInterval(() => {
        remainingTime--;

        timerElement.textContent = `${remainingTime}s`;
        timerElement.setAttribute("datetime", `P${remainingTime}S`);

        // Quando scade il tempo, ferma tutto
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            // Qui puoi aggiungere logica per "fine gioco"
            // ✅ Usa le variabili globali
            showEndScreen(
                window.correctLetters,
                window.errorLetters,
                window.paragraphData.length
            );
        }
    }, 1000);

    gameStarted = true;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetGame() {
    stopTimer();
    gameStarted = false;
    remainingTime = 0;
    const timerElement = document.getElementById(settings.timerId);
    timerElement.textContent = "0s";
    timerElement.setAttribute("datetime", "P0S");
}

function isStarted() {
    return gameStarted;
}

export const GameState = {
    startTimer,
    resetGame,
    isStarted,
    getElapsedTime: () => remainingTime,
};


function showEndScreen(correctLetters, errorLetters, totalWords) {
    const template = document.getElementById(settings.typeFormTemplateId);
    const clone = template.content.cloneNode(true);
    const main = document.getElementById(settings.mainElementId);

    // ✅ Aggiungilo nel DOM
    main.innerHTML = ""; // pulisci prima!
    main.appendChild(clone);

    // ✅ Ora prendi il form (dopo che è stato aggiunto al DOM)
    const form = document.getElementById(settings.typedFormElementId);

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // ❌ Impedisce il ricaricamento della pagina
            location.reload();  // 🔁 Ricarica la pagina per ricominciare
        });
    }

    const feedback = document.getElementById(settings.feedbackElementId);
    const timeUsed = settings.maxTime - GameState.getElapsedTime();

    feedback.textContent = settings.getFeedback(
        correctLetters,
        errorLetters,
        totalWords,
        timeUsed
    );
}



