async function getRecipes(ingredients) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      prompt: `Lista de ingrediente: ${ingredients.join(', ')}. Oferă o listă de posibile rețete folosind aceste ingrediente.`,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.8,
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim().split('\n');
}
