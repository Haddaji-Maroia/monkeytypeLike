import { getRandomParagraph } from "./helpers.js";

const pElement = document.querySelector('.monkey-paragraph');
const paragraphData = getRandomParagraph();

// 🔽 Stato iniziale del gioco
let currentParagraph = 0;
let currentWord = 0;
let currentLetter = 0;
let correctLetters = 0;
let errorLetters = 0;

// (facoltativo, per il timer)
let startTime = null;
let elapsedTime = 0;
let intervalId = null;


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
