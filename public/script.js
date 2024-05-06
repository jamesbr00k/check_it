// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCmFC3y_n3uO6UvHOs43nM79l2azQa7F8A",
    authDomain: "check-it678696.firebaseapp.com",
    projectId: "check-it678696",
    storageBucket: "check-it678696.appspot.com",
    messagingSenderId: "5425361625",
    appId: "1:5425361625:web:30c2630a8f2fed06b704c8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
var db = firebase.firestore();

// Save a new card to Firestore
function saveCard(front, back) {
    db.collection("cards").add({
        front: front,
        back: back
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

// Get the input elements and the button
const cardTitle = document.getElementById('cardTitle');
const cardDescription = document.getElementById('cardDescription');
const button = document.querySelector('button');

// Add an event listener to the button
button.addEventListener('click', () => {
    // Call saveCard with the values of the input fields
    saveCard(cardTitle.value, cardDescription.value);

    // Clear the input fields
    cardTitle.value = '';
    cardDescription.value = '';
});

let cards = [];
async function getCards() {
    const querySnapshot = await db.collection("Cards").orderBy("order").get();
    querySnapshot.forEach((doc) => {
        // Add each card to the cards array
        cards.push(doc.data());
    });
}

let currentCardIndex = 0;
let isFront = true;
let viewMode = 'both'; // Default view mode

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

window.onload = async () => {
    await getCards();
    document.getElementById('content').innerText = cards[0].front;
    showNextDocument();
};