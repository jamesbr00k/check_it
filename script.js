let cards = [
    { front: 'Front of card 1', back: 'Back of card 1' },
    { front: 'Front of card 2', back: 'Back of card 2' },
    // Add more cards as needed
];

let currentCardIndex = 0;
let isFront = true;
let viewMode = 'front'; // Default view mode

function showNextDocument() {
    switch (viewMode) {
        case 'front':
            // Always show front of next card
            currentCardIndex = (currentCardIndex + 1) % cards.length;
            document.getElementById('content').innerText = cards[currentCardIndex].front;
            break;
        case 'back':
            // Always show back of next card
            currentCardIndex = (currentCardIndex + 1) % cards.length;
            document.getElementById('content').innerText = cards[currentCardIndex].back;
            break;
        case 'both':
            // Toggle between front and back, and move to next card when showing back
            if (isFront) {
                document.getElementById('content').innerText = cards[currentCardIndex].back;
            } else {
                currentCardIndex = (currentCardIndex + 1) % cards.length;
                document.getElementById('content').innerText = cards[currentCardIndex].front;
            }
            isFront = !isFront;
            break;
        case 'showBoth':
            // Always show both front and back of next card
            currentCardIndex = (currentCardIndex + 1) % cards.length;
            document.getElementById('content').innerText = `${cards[currentCardIndex].front}\n${cards[currentCardIndex].back}`;
            break;
    }
}

function setViewMode(mode) {
    viewMode = mode;
}

// Show the front of the first card initially
document.getElementById('content').innerText = cards[0].front;