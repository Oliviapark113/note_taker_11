// Create an application that can be used to write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file.

// * The application frontend has already been created, it's your job to build the backend and connect the two.

const path = require('path')
const express = require('express')
const fs = require('fs')

const db = require('./db/db.json')


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

const PORT = process.env.PORT || 3000 
// * The following HTML routes should be created:

//-----------HTML ROUTE---------------(/home route .. /notes route)
//   * GET `*` - Should return the `index.html` file
app.get('/', (req , res)=>{
    
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

//   * GET `/notes` - Should return the `notes.html` file.
app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/notes.html'))
})

// * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.


app.get('/api/notes', (req, res)=>{
     //I have to read JSON file and send data to the server ... I am lost 
    fs.readFile('./db/db.json', 'utf8' ,(err, data)=>{
        if(err){
            throw err
          }
          console.log(JSON.parse(data))
          res.json(JSON.parse(data))      
    
        })
                
    
})


//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes/', (req, res)=>{
    const newNotes = req.body
    // console.log(req.body)
    const id = req.body.id
    // console.log(id)
    fs.readFile('./db/db.json', 'utf8' ,(err, note)=>{
        if(err){
            throw err
          }
          
         let notes= JSON.parse(note)
          notes.push(newNotes)
          notes.push(id) 
          
          
          fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
              if (err) throw err;
              console.log('Saved!');
              res.json(JSON.stringify(notes)) 
              console.log(notes)
            
  });
          
})

      

})

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)
})