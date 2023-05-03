async function getRecipes(ingredients) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
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

document.getElementById('ingredients-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const ingredientsInput = document.getElementById('ingredients-input');
  const ingredients = ingredientsInput.value.split(',').map(ingredient => ingredient.trim());
  const recipes = await getRecipes(ingredients);

  const recipesContainer = document.getElementById('recipes-container');
  recipesContainer.innerHTML = '<ul>' + recipes.map(recipe => `<li>${recipe}</li>`).join('') + '</ul>';
});
