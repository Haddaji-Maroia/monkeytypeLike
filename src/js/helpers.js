import {paragraphs} from "./paragraphs";

export function getRandomParagraph() {
    const idx = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[idx];
}
