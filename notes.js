const fs = require('fs');

const getNotes = function() {
    const notes = loadNotes();
    return 'These are my notes: ' + notes;
}
const addNote = function(title, body) {
    const notes = loadNotes();
    const found = notes.filter((note) => note.title === title)
    if (!found.length) {
        notes.push({
            title,
            body
        })
        saveNotes(notes);
        return 0;
    } else {
        console.log('Duplicate title found!', found);
        return 1;
    }
}
const saveNotes = function(notes) {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}
const loadNotes = function() {
    try {
        const data = fs.readFileSync('notes.json').toString();
        return JSON.parse(data);
    } catch(err) {
        return [];
    }

}
module.exports = {
    getNotes,
    addNote
}