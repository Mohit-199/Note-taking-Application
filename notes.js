const { default: chalk } = require('chalk');
const fs = require('fs');

const loadNotes = () => {
    try{
        const dataNotes = fs.readFileSync('notes.json');
        const dataNotesJSON = dataNotes.toString();
        return JSON.parse(dataNotesJSON);
    }catch(e){
        return [];
    }
}

const listNotes = () =>{
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes'));
    notes.forEach((note) => {
        console.log(note.title);
    })
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}
const addNotes = (title,body) => {
    const notes = loadNotes();
    const findNote = notes.filter((note) => {
        return note.title===title;
    })
    if(findNote.length===0){                     //If this comes true implies No duplicated notes...
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New Note added!'));
    }else{
        console.log(chalk.red.inverse('Note title already exists!'));
    }
}

const removeNotes = (removetitle) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => {
        return note.title!==removetitle;
    })
    if(notes.length>newNotes.length){
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(newNotes);
    }else{
        console.log(chalk.red.inverse('No Note found!'));
    }
}
const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',notesJSON);

}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes:listNotes,
    readNotes:readNotes
}