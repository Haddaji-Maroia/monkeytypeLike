import { getRandomParagraph } from "./helpers.js";
import { settings } from "./settings.js";
import { GameState } from "./GameState.js";

const pElement = document.querySelector('.monkey-paragraph');
const paragraphData = getRandomParagraph();

// 🔽 Stato iniziale del gioco
let currentParagraph = 0;
let currentWord = 0;
let currentLetter = 0;
let correctLetters = 0;
let errorLetters = 0;


if (pElement && paragraphData) {
    // Svuota il container prima di renderizzare
    pElement.innerHTML = "";

    // Per ogni parola...
    paragraphData.forEach(wordObj => {
        const spanWord = document.createElement("span");
        // 1️⃣ Aggiungi qui la classe "word"
        spanWord.classList.add("word");
        wordObj.spanWordElement = spanWord; // ✅ salva riferimento al contenitore della parola


        // Per ogni lettera della parola...
        wordObj.letters.forEach(letterObj => {
            const spanLetter = document.createElement("span");
            spanLetter.textContent = letterObj.letter;

            letterObj.spanLetterElement = spanLetter; // ✅ salva riferimento al DOM
            spanWord.appendChild(spanLetter);
        });

        spanWord.appendChild(document.createTextNode(" "));
        pElement.appendChild(spanWord);
    });
}


function updateCursor() {
    //rimuovere le classi
    paragraphData.forEach(wordObj => {
        wordObj.spanWordElement.classList.remove("active");
        wordObj.letters.forEach(letterObj => {
            letterObj.spanLetterElement.classList.remove("current");
        });
    });


    // imposta la parola e la lettera correnti
    const wordObj = paragraphData[currentWord];
    const letterObj = wordObj.letters[currentLetter];

    // 2️⃣ la classe "current" sulla lettera
    letterObj.spanLetterElement.classList.add("current");
    // 3️⃣ la classe "active" sulla parola
    wordObj.spanWordElement.classList.add("active");
    
}
updateCursor();

//event keyboard
document.addEventListener("keydown", (event)=>{
    //filtra i tasti ignorati
    if (settings.isIgnorableKey(event)) {
        console.log("Ignoro:", event.key);
        return; // Non faccio nulla se è un tasto ignorabile
    }

    // Avvia il timer solo una volta
    if (!GameState.isStarted()) {
        GameState.startTimer();
    }


    // backspace gestione
    if (event.key === "Backspace") {
        // Se siamo all'inizio del primo word, non fare nulla
        if (currentWord === 0 && currentLetter === 0) return;

        // Se siamo all'inizio di una parola (non la prima), torna alla fine della parola precedente
        if (currentLetter === 0) {
            currentWord--;
            currentLetter = paragraphData[currentWord].letters.length;
        }

        // Altrimenti, semplicemente torna indietro di una lettera
        else {
            currentLetter--;
        }

        // Prendi l'elemento della lettera da cui stai tornando
        const letterToClear = paragraphData[currentWord].letters[currentLetter].spanLetterElement;

        // Rimuovi tutte le classi di stato
        letterToClear.classList.remove(
            settings.correctClass,
            settings.errorClass,
            settings.currentClass
        );

        // Aggiorna il cursore
        updateCursor();

        return; // Fermati qui, non processare altri tasti
    }


    //gestione space bar
    if (event.key === " ") {
        event.preventDefault(); // 👈 Impedisce lo scroll della pagina

        // 1. Aggiungi la classe "typed" alla parola attuale
        const currentWordObj = paragraphData[currentWord];
        currentWordObj.spanWordElement.classList.add(settings.typedClass);

        // 2. Vai alla parola successiva
        currentWord++;
        currentLetter = 0;

        // 3. Se c'è un'altra parola, aggiorna il cursore
        if (currentWord < paragraphData.length) {
            updateCursor();
        }

        return; // Esci: lo spazio ha già fatto il suo lavoro
    }


    //gestione tasti
    const currentWordElement = document.querySelectorAll(".word")[currentWord];
    const currentLetterElement = currentWordElement.querySelectorAll("span")[currentLetter];
    const expectedLetter = paragraphData[currentWord].letters[currentLetter].letter;

    if (event.key === expectedLetter) {
        currentLetterElement.classList.add(settings.correctClass);
        correctLetters++;
    } else {
        currentLetterElement.classList.add(settings.errorClass);
        errorLetters++;
    }

    currentLetterElement.classList.remove(settings.currentClass);
    currentLetter++;

    const nextLetterElement = currentWordElement.querySelectorAll("span")[currentLetter];
    if (nextLetterElement) {
        nextLetterElement.classList.add(settings.currentClass);
    }

});





