import { getRandomParagraph } from './helpers.js';

const pElement = document.getElementById('monkey-paragraph');
const paragraphData = getRandomParagraph();


// Prendi la prima lettera del primo array di letters
const firstLetter = paragraphData[0].letters[0].letter;
const firstWordLetters = paragraphData[0].letters;


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



