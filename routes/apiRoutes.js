const fs = require("fs");
const util = require("util");
const uuidv1 = require("uuid").v1;
const router = require("express").Router();
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

    //GET//
    router.get("/api/notes", (req, res) => {
        return readFileAsync("db/db.json", "utf8").then((notes) => {
            let parsedNotes;
      
            try {
              parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
              parsedNotes = [];
            }
      
            return parsedNotes; 
      });
    });


    //POST//
    router.post("/api/notes", (req, res) => {
        const { title, text } = req.body;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv1() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => writeFileAsync("db/db.json", JSON.stringify(note))(updatedNotes))
      .then(() => newNote);
      });
    
    

    //DELETE//
    router.delete("/notes/:id", (req, res) => {
        {
            return this.getNotes()
              .then((notes) => notes.filter((note) => note.id !== id))
              .then((filteredNotes) => writeFileAsync("db/db.json", JSON.stringify(note))(filteredNotes));
          }
      });

module.exports = router;
    