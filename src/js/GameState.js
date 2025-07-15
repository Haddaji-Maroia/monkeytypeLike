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


