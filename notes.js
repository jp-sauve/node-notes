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
    } else {
        console.log('Duplicate title found!', found);
    }
}
const removeNote = function(title) {
const notes = loadNotes();

const results = notes.reduce((acc, note) => {
    // Sort notes into 2 arrays keyed on an object, 'match' and 'noMatch'
    if (note.title != title) {
        acc.noMatch = acc.noMatch.concat([note]);
        return acc;
    } else {
        acc.match = acc.match.concat([note]);
        return acc;
    }
}, { match: [], noMatch:[] });

// console.log('res: ', JSON.stringify(results));

if (results.match.length == 0) {
    console.log('Note not found. Nothing to remove.');
} else {
    console.log('Removing found note: ', results.match[0]);
    saveNotes(results.noMatch);
}
};
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
    addNote,
    removeNote
}