const chalk = require('chalk');
const yargs = require('yargs');

// list
yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler: function () {
        console.log('listing notes');
    },
})

// read
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('reading note');
    },
})

// remove
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
       console.log('removing note');
    },
})
yargs.parse()