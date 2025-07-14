import { getRandomParagraph } from "./helpers.js";

const pElement = document.querySelector('.monkey-paragraph');
const paragraphData = getRandomParagraph();


if (pElement && paragraphData) {
    // Svuota il container prima di renderizzare
    pElement.innerHTML = "";

    // Per ogni parola...
    paragraphData.forEach(wordObj => {
        const spanWord = document.createElement("span");

        // Per ogni lettera della parola...
        wordObj.letters.forEach(letterObj => {
            const spanLetter = document.createElement("span");
            spanLetter.textContent = letterObj.letter;
            spanWord.appendChild(spanLetter);
        });

        // Aggiunge uno spazio dopo la parola
        spanWord.appendChild(document.createTextNode(" "));
        pElement.appendChild(spanWord);
    });
}