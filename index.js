const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// index.js tetején (az app létrehozása után)
const path = require("path");

const PORT = 3000;

// Use the JSON body parser middleware
app.use(express.json());

// Statikus fájlok kiszolgálása a frontend mappából
app.use(express.static(path.join(__dirname, "frontend")));

let fours = [];
let nextId = 1;

function isValidFour(data) {
    return  (
        Array.isArray(data) &&
        data.length === 4 &&
        data.every(num => typeof num === 'number' && Number.isInteger(num) && num > -1)
    );
}

/**
 * GET /fours
 * Visszaadja az összes számnégyest
 */
app.get('/fours', (req, res) => {
    res.json(fours);
});

/**
 * GET /fours/:id
 * Visszaad egy számnégyest az index (id) alapján
 */
app.get('/fours/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const four = fours.find(f => f.id === id);

    if (!four) {
        return res.status(404).json({ error: 'Four not found' });
    }

    res.json(four);
});

/**
 * POST /fours
 * Új számnégyes hozzáadása
 * Body: [1, 2, 3, 4]
 */
app.post('/fours', (req, res) => {
    const data = req.body;

    if (!isValidFour(data)) {
        return res.status(400).json({ error: 'Invalid four format. Must be an array of four non-negative integers.' });
    }

    const exists = fours.some(f =>
        f.values.every((value, index) => value === data[index])
    );

    if (exists) {
        return res.status(409).json({ error: 'This four already exists' });
    }

    const newFour = { 
        id: nextId++,
        values: data 
    };

    fours.push(newFour);
    res.status(201).json(newFour);
});

/**
 * DELETE /fours/:id
 * Töröl egy számnégyest az index (id) alapján
 */
app.delete('/fours/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = fours.findIndex(f => f.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Four not found' });
    }
    fours.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});