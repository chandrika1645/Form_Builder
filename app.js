const path = require("path");
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const port = 2040 ; 

// fs.readFile('./templates/layout.html', (err, data) => {
//     if(err) throw err;
//     // console.log(data);
// });


const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/templates');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const saveTemplate = multer({storage: storage});

// const saveTemplate = multer({dest:__dirname + "/templates"});


const a = 12

//middelwares

app.use(express.urlencoded({extended: false}));
 
app.get('/', (req, res) => { 
    res.send('Hello again'); // Or render your HTML file here
});


// const filePath = '/saveTemplate';

app.post('/saveTemplate', saveTemplate.single("file") , (req, res) => {

    console.log(req.body);
    console.log(req.file);

  return res.status(200).send('File uploaded successfully.');
});

//server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



const filePath = './templates/layout.html';
const jsonData = {
    
};

function injectDataIntoScriptTag(filePath, jsonData) {
    
    const serializedData = JSON.stringify(jsonData, null, 4); // null, 4 for pretty formatting

    // Inject JSON data into script tag
    const scriptTagWithData = `<script>const data = ${serializedData};</script>\n`;

    // Open file 
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error opening file:', err);
            return;
        }

        // Write to the beginning of the file
        const headEndIndex = data.indexOf('</head>');
        if (headEndIndex === -1) {
            console.error('Head section not found in the HTML file.');
            return;
        }

        const modifiedData = data.slice(0, headEndIndex) + scriptTagWithData + data.slice(headEndIndex);

        fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }

            console.log("Data injected successfully into the <head> section!")
        });
    });
}


const searchText = '12/20/23';
const replacementText = '16/06/2001';

injectDataIntoScriptTag(filePath, jsonData);
