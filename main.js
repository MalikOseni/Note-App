const btnEl = document.getElementById('btn');
const appEl = document.getElementById('app');


const createNoteEl = (id, content) => {
    const element = document.createElement('textarea');
    element.classList.add('notes');
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener('dblclick', () => {
        const warning = confirm('Do you want to delete note?')
        if (warning) {
            deleteNote(id, element);
        }
    })
    element.addEventListener('input', () => {
        updateNote(id, element.value);
    })
    return element;
}

const deleteNote = (id,element) => {
    const notes = getNotes().filter((note) => note.id !== id);
    saveNote(notes)
    appEl.removeChild(element);
}

const updateNote = (id, content) => {
    const notes = getNotes();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNote(notes);
}

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

const saveNote = (notes) => {
    localStorage.setItem('note-app',JSON.stringify(notes))
}

const getNotes=()=> {
    return JSON.parse(localStorage.getItem('note-app') || '[]');
}
getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});
btnEl.addEventListener('click',addNote)