const fs = require('fs');
const chalk = require('chalk');
const log = console.log;

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach((item) => log(chalk.white(item.title)));

}
const readNote = (title) => {
    const found = loadNotes().find((note) => note.title == title)
    // console.log(JSON.stringify(found))
    log('Title: ', chalk.yellow.inverse(found.title));
    log('Body: ', chalk.yellowBright(found.body))
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const found = notes.filter((note) => note.title === title)
    if (!found.length) {
        notes.push({
            title,
            body
        })
        saveNotes(notes);
        console.log(chalk.green('Note added.'));
    } else {
        console.log(chalk.red('Duplicate title found!\n'), chalk.white(JSON.stringify(found[0])));
    }
}

const removeNote = (title) => {
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

if (results.match.length == 0) { // intentional implicit coercion
    console.log(chalk.red('Note not found. Nothing to remove.'));
} else {
    console.log(chalk.green('Removing found note: '), chalk.white(JSON.stringify(results.match[0])));
    saveNotes(results.noMatch);
}
};

const saveNotes = function(notes) {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch(err) {
        return [];
    }

}
module.exports = {
    listNotes,
    readNote,
    addNote,
    removeNote
}