const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercase = alphabets.filter(item => item === item.toLowerCase()).sort().pop() || null;

    res.json({
        is_success: true,
        user_id: "piyush_01012000",
        email: "ps1685@srmist.edu.in",
        roll_number: "RA2111047010152",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
