# Note-App
/**

This script manages a simple web app that allows the user to create, edit, and delete notes.
The notes are stored in the user's local storage as an array of objects with "id" and "content" properties.
The app renders the notes as text areas with a "dblclick" listener to prompt the user to delete the note
and an "input" listener to update the note in local storage. A button with an "onclick" listener is provided
to allow the user to add new notes.
*/
// Get references to the button and app elements in the HTML
const btnEl = document.getElementById('btn');
const appEl = document.getElementById('app');

/**

Creates a new textarea element with the given id and content properties, and adds event listeners to

handle double-click deletion and input updates. Returns the new element.

@param {number} id - The id of the note.

@param {string} content - The content of the note.

@returns {HTMLElement} - A new textarea element representing the note.
*/
const createNoteEl = (id, content) => {
const element = document.createElement('textarea');
element.classList.add('notes');
element.placeholder = "Empty Note";
element.value = content;

// Add event listener to handle double-click deletion
element.addEventListener('dblclick', () => {
const warning = confirm('Do you want to delete note?')
if (warning) {
deleteNote(id, element);
}
})

// Add event listener to handle input updates
element.addEventListener('input', () => {
updateNote(id, element.value);
})

return element;
}

/**

Deletes the note with the given id from local storage and removes the corresponding element from the app.
@param {number} id - The id of the note to delete.
@param {HTMLElement} element - The HTML element representing the note to delete.
*/
const deleteNote = (id, element) => {
const notes = getNotes().filter((note) => note.id !== id);
saveNote(notes)
appEl.removeChild(element);
}
/**

Updates the content of the note with the given id in local storage.
@param {number} id - The id of the note to update.
@param {string} content - The new content of the note.
*/
const updateNote = (id, content) => {
const notes = getNotes();
const target = notes.filter((note) => note.id == id)[0];
target.content = content;
saveNote(notes);
}
/**

Generates a new note object with a random id and an empty content property, creates a new HTML element

representing the note using createNoteEl(), and adds it to the app before the add button. The new note

is also added to local storage.
*/
const addNote = () => {
const notes = getNotes();
const noteObj = {
id: Math.floor(Math.random() * 99999) + 1,
content: '',
};
const noteEl = createNoteEl(noteObj.id, noteObj.content);
appEl.insertBefore(noteEl, btnEl);

notes.push(noteObj);

saveNote(notes)
}

/**

Saves the given notes array to local storage as a stringified JSON object.
@param {array} notes - The array of note objects to save.
*/
const saveNote = (notes) => {
localStorage.setItem('note-app',JSON.stringify(notes))
}
/**

Retrieves the array of note objects from local storage, or returns an empty array if none are found.
@returns {array} - An array of note
