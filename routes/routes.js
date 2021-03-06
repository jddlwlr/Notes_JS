const fs = require('fs');
const path = require('path');


const router = (app) => {

    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        let notes = JSON.parse(data);

        // notes post route
        app.post("/api/notes", function(req, res) {

            let newNote = req.body;
            notes.push(newNote);
            writeDb();
            console.log('Note Saved!')
            
        });

        // notes get route
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });


        // displays notes
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });


        // sends notes db
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // catches all other paths
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // delete notes
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            writeDb();
            console.log('Note Deleted!')
        });

        // re-writes db
        function writeDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}

module.exports = router;