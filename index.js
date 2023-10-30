const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(express.static('dist'))
app.use(cors());

app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    const apiKey = 'f7162ab5cc799c10e427d541a9494163e5ad4a68'; // Use your Giant Bomb API key
    
    try {
        const response = await fetch(`https://www.giantbomb.com/api/search/?api_key=${apiKey}&format=json&query=${query}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
