const chalk = require('chalk');
const yargs = require('yargs').pkgConf('notes');
const notes = require('./notes');
const log = console.log;
// add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demand: false,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demand: true,
            type: 'string',
        }
    },
    handler: function (argv) {
        let resp = notes.addNote(argv.title, argv.body);
        // console.log('resp from addNotes: ', resp)
        if (!resp) {
            console.log('Successfully added note');
            return;
        }
        console.error('Failure adding note');
    }
})
// list
yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler: function (argv) {
        log('Listing all notes: ', argv);
    },
})

// read
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Title of note to read',
            demand: true,
        },
    },
    handler: function (argv) {
        log('Reading note: ', argv);
    },
})

// remove
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title to remove',
            demand: true,
        }
    },
    handler: function (argv) {
       log('removing note');
    },
})
yargs.parse()