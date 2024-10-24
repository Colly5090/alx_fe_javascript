// Array to store quotes(text) and categories or load them from the localstorage
let quotes = JSON.parse(localStorage.getItem('myquotes')) || [
    {text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation"},
    {text: "Life is what happens when you're busy making other plans.", category: "Life"},
    {text: "The journey of a thousand miles begins with one step.", category: "Wisdom"},
    {text: "The love of animals lies in their owners.", category: "Nature"},
    {text: "The building block of life is physics.", category: "Sci-Fi"},
    {text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success"},
    {text: "The only impossible journey is the one you never begin.", category: "Adventure"},
    {text: "It is during our darkest moments that we must focus to see the light.", category: "Hope"},
    {text: "Happiness is not something ready-made. It comes from your own actions.", category: "Happiness"}
]

// Store extracted category as categories in quotes in an array that links to a quote
let categories = [...new Set(quotes.map(quote => quote.category))];

let selectedCategories = [];
// Populate categories in the dropdown
function populateCategories(){
    const filterCategory = document.getElementById('categoryFilter');

    // Clear the existing options
    filterCategory.innerHTML = '<option value="all">All Categories</option>';

    // Add categories dynamically
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category
        filterCategory.appendChild(option);
    });

    // Restore the last selected category from localStorage
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory){
        filterCategory.value = savedCategory;
        filterQuotes();
    }
}

function filterQuotes(){
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');

    // Save the selected category to localStorage
    localStorage.setItem('selectedCategory', selectedCategory);

    // Filter quotes by selected category
    let filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    // Show the first quote from the filtered list, if any
    if (filteredQuotes.length > 0){
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
        quoteDisplay.style.color = 'red';
        quoteDisplay.style.fontWeight = 'bold';
        quoteDisplay.style.fontSize = '16px';

        // Save the last viewed quote in session storage
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
    } else {
        quoteDisplay.textContent = 'No quotes available for the selected category.';
    }
}

function showRandomQuote(){
    // Filter quotes by selected categories
    const filteredQuotes = quotes.filter(quote => selectedCategories.includes(quote.category));

    // Get the remaining quotes that don't match the selected categories
    const otherQuotes = quotes.filter(quote => !selectedCategories.includes(quote.category));

    // Randomize the order of both filtered and remaining quotes
    const randomizedOtherQuotes = otherQuotes.sort(() => Math.random() - 0.5);
    const allQuotesToShow = [...filteredQuotes, ...randomizedOtherQuotes];

    if (allQuotesToShow.length > 0) {
        const randomQuote = allQuotesToShow[Math.floor(Math.random() * allQuotesToShow.length)];
        const displayMessages = document.getElementById('quoteDisplay');
        displayMessages.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
        displayMessages.style.color = 'red';
        displayMessages.style.fontWeight = 'bold';
        displayMessages.style.fontSize = '16px';

        // Save the last viewed quote in session storage
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
    }
}

function createAddQuoteForm(){
    const formContainer = document.createElement('div');
    formContainer.style.marginTop = "20px";
    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;

    document.body.appendChild(formContainer);
}

function addQuote(){
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotesToLocalStorage();

        // If a new category is introduced, update the dropdown
        if (!categories.includes(newQuoteCategory)){
            categories.push(newQuoteCategory);
            populateCategories();
        }

        // Clear input fields after submission
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        alert('New quote added successfully!');
    } else {
        alert('Please fill in both fields.');
    }
}

function saveQuotesToLocalStorage(){
    localStorage.setItem('myquotes', JSON.stringify(quotes));
}

function loadLastViewedQuote(){
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote){
        const recentQuotesContainer = document.createElement('div');
        recentQuotesContainer.style.border = '1px solid';
        recentQuotesContainer.style.padding = '10px';
        recentQuotesContainer.style.margin = '20px';
        recentQuotesContainer.style.borderRadius = '5px';
        recentQuotesContainer.style.backgroundColor = '#f9f9f9';
        recentQuotesContainer.style.maxWidth = '400px';

        const recentQuotesHeading = document.createElement('h2');
        recentQuotesHeading.textContent = 'Recent Viewed Quotes';
        recentQuotesHeading.style.textAlign = 'center';
        recentQuotesHeading.style.marginBottom = '15px';

        const recentQuoteDisplay = document.createElement('p');
        recentQuoteDisplay.textContent = `"${lastViewedQuote.text}" - ${lastViewedQuote.category}`;
        recentQuoteDisplay.style.textAlign = 'center';
        recentQuoteDisplay.style.color = '#333';
        recentQuoteDisplay.style.fontWeight = 'bold';
        recentQuoteDisplay.style.fontSize = '16px';

        recentQuotesContainer.appendChild(recentQuotesHeading);
        recentQuotesContainer.appendChild(recentQuoteDisplay);

        const lineBreak = document.createElement('br');
        document.body.appendChild(lineBreak); 

        document.body.appendChild(recentQuotesContainer);
    }

}

function loadQuotesFromLocalStorage(){
    const savedQuotes = JSON.parse(localStorage.getItem('myquotes'));
    if (savedQuotes){
        quotes = savedQuotes;
        categories = [...new Set(quotes.map(quote => quote.category))];
    }
}


function exportQuotesToJSON(){
    const data = JSON.stringify(quotes, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);

            if (Array.isArray(importedQuotes)) {
                // Validate the structure of the imported quotes
                const validQuotes = importedQuotes.every(quote => quote.text && quote.category);
                
                if (validQuotes) {
                    quotes.push(...importedQuotes);
                    saveQuotesToLocalStorage();
                    alert('Quotes imported successfully!');
                } else {
                    alert('Please ensure the file contains valid quotes.');
                }
            } else {
                alert('The file does not contain a valid array of quotes.');
            }
        } catch (error) {
            alert('Please ensure the file is a valid JSON.');
        }
    };

    fileReader.readAsText(event.target.files[0]);
}

// Function to save the updated quotes array to localStorage
function saveQuotesToLocalStorage(){
    localStorage.setItem('myquotes', JSON.stringify(quotes));
}

//SetUp server simulation with mock API like JSONplaceholder
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';

// Simulate server interaction to fetch quotes
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const serverQuotes = await response.json();
        return serverQuotes.map(quote => ({
            text: quote.title,
            category: 'server'
        }));
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
        return [];
    }
}

// Periodically fetch data from the server every 5 minutes
function periodicFetch(){
    setInterval(async () => {
        const serverQuotes = await fetchQuotesFromServer();
        syncWithLocalStorage(serverQuotes);
    }, 300000); //sync every 5minutes from the server
}

function syncWithLocalStorage(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem('myquotes')) || [];

    const mergeQuotes = [...serverQuotes];

    localQuotes.forEach(localQuote => {
        const existingQuote = mergeQuotes.find(quote => quote.text === localQuote.text);

        if (!existingQuote){
            mergeQuotes.push(localQuote);
        } else if (existingQuote.category !== localQuote.category){
            notifyConflict(existingQuote, localQuote);
        }
    });

    localStorage.setItem('myquotes', JSON.stringify(mergeQuotes));
    notifyUser('New quotes have been synced with the server.');
}

function notifyConflict(serverQuotes, localQuote){
    const conflictNotification = document.createElement('div');
    conflictNotification.innerHTML = `
        <p>Conflict detected for the quote:</p>
        <p>"${localQuote.text}"</p>
        <p>Local category: ${localQuote.category} | Server category: ${serverQuote.category}</p>
        <button onclick="resolveConflict('server', '${localQuote.text}')">Keep Server Version</button>
        <button onclick="resolveConflict('local', '${localQuote.text}')">Keep Local Version</button>
    `;
    document.body.appendChild(conflictNotification);
}

function resolveConflict(resolution, quoteText){
    const quotes = JSON.parse(localStorage.getItem('myquotes'));
    const quoteIndex = quotes.findIndex(quote => quote.text === quoteText);

    if (quoteIndex !== -1){
        if (resolution === 'server'){

        }else {
            const localQuote = quotes[quoteIndex];
            localQuote.category = localQuote.category;
        }
        localStorage.setItem('myquotes', JSON.stringify(quotes));

        notifyUser(`Conflict resolved: ${resolution === 'server' ? 'Server' : 'Local'} version kept.`);
    }
}

function notifyUser(message){
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.border = '1px solid #000';
    notification.style.backgroundColor = '#f0f0f0';
    notification.style.padding = '10px';
    notification.style.margin = '10px 0';
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    createAddQuoteForm();
    loadQuotesFromLocalStorage();
    loadLastViewedQuote();
    //addImportFileInput();
    periodicFetch()
    

    // Button to show a random quote
    document.getElementById("newQuote").addEventListener('click', showRandomQuote);
    document.getElementById("exportButton").addEventListener('click', exportQuotesToJSON);

});