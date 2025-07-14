export const settings = {
    paragraphElementSelector: '.monkey-paragraph',
    correctClass: 'correct',
    currentWordClass: 'active',
    errorClass: 'error',
    currentClass: 'current',
    timerId: 'timer',
    maxTime: 120,
    mainElementId: 'main',
    typeFormTemplateId: 'type-again-template',
    typedClass: 'typed',
    feedbackElementId: 'feedback',
    typedFormElementId: 'type-again__form',
    typedFormContainerElementId: 'type-again',
    getFeedback(correctLetter, errorLetter, totalword, time) {
        return `Vous avez tapé ${correctLetter} lettre${correctLetter > 1 ? 's' : ''} correcte${correctLetter > 1 ? 's' : ''} et ${errorLetter} mauvaise${errorLetter > 1 ? 's' : ''} lettre${errorLetter > 1 ? 's' : ''} sur un total de ${totalword} mot${totalword > 1 ? 's' : ''}. Endéans ${time} secondes.`;
    },
    isIgnorableKey(event) {
        return event.key === 'Shift' || event.key === 'Meta' || event.key === 'Alt' || event.key === 'Control' || event.key === 'CapsLock' || event.key === 'Tab' || event.key === 'Enter' || event.key === 'Escape' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown';
    },
};