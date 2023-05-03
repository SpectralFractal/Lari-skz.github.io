const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const API_KEY = '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';

app.post('/getRecipes', async (req, res) => {
  try {
    const ingredients = req.body.ingredients;
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Lista de ingrediente: ${ingredients.join(', ')}. Oferă o listă de posibile rețete folosind aceste ingrediente.`,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.8,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    res.json(response.data.choices[0].text.trim().split('\n'));
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
