# DOM manipulation, Web storage and working with JSON data

## Building a Dynamic Content Generator with Advanced DOM Manipulation

### This project will provide hands-on experience with creating, modifying, and managing elements in the DOM, demonstrating the core capabilities of JavaScript for building interactive web pages.(script.js)

There will be an array of quote objects where each quote has a text and a category. User can use the show new quote button to display a random quote and add new quotes forms to add new quotes to the array.

## Implementing Web Storage and JSON Handling

### This project will use web storage mechanisms to store, retrieve, and manage data locally in the browser, and handle JSON data effectively within a web application.

This part of the code handles saving quotes array to local storage everytime a new quote is added. Ensure that the application loads existing quotes from local storage when initialized.
Demonstrate the use of session storage by temporarily storing user preferences or session-specific data, such as the last viewed quote.
(JSON Export): Provide a button that allows users to export their quotes to a JSON file. Use Blob and URL.createObjectURL to create a download link.
(JSON Import): Provide a file input to allow users to upload a JSON file containing quotes. Read the file and update the quotes array and local storage accordingly.

## Creating a Dynamic Content Filtering System Using Web Storage and JSON

### Implemente a dynamic content filtering system that allows users to filter quotes by categories stored in web storage. This task focuses on integrating interactive filtering capabilities that utilize web storage to enhance user experience.

Introduce a dropdown menu or a set of buttons that allow the user to select a category for filtering quotes.
Use the existing quotes array to extract unique categories and populate the dropdown menu.
A function to update the displayed quotes based on the selected category.
Use local storage to save the last selected category filter and restore it when the user revisits the page.
A function to also update the categories in the dropdown if a new category is introduced.
Ensure that changes in categories and filters are reflected in real-time and persisted across sessions.

## Syncing Data with Server and Implementing Conflict Resolution

### Implement functionality to sync the local data of your “Dynamic Quote Generator” with a server and handle potential conflicts due to simultaneous edits or updates.

Use JSONPlaceholder or a similar mock API to simulate fetching and posting data.
Implement periodic data fetching to simulate receiving updates from a server.
Add functionality to periodically check for new quotes from the server and update the local storage accordingly.
Implement a simple conflict resolution strategy where the server’s data takes precedence in case of discrepancies.
Add a UI element or notification system to inform users when data has been updated or if conflicts were resolved.
Provide an option for users to manually resolve conflicts if desired.
