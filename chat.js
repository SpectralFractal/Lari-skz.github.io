async function getRecipes(ingredients) {
  if (!ingredients || ingredients.length === 0) {
    return [];
  }

  const response = await fetch('https://foodcombat-ea00e6c8cd2a.herokuapp.com/getRecipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: ingredients
    })
  });

  const data = await response.json();

  console.log('API Response:', data);
  
  return data;
}

// Event listener for form submission
document.getElementById('ingredients-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const ingredientsInput = document.getElementById('ingredients-input');
  const ingredients = ingredientsInput.value.split(',').map(ingredient => ingredient.trim());
  const recipesResponse = await getRecipes(ingredients);
  const recipes = Object.values(recipesResponse)[0]
  const recipesContainer = document.getElementById('recipes-container');
  recipesContainer.innerHTML = recipes.map(recipe => 
    `<p>${recipe.replace(/\n/g, '<br>')}</p>` // Replace newline characters with <br> tags for HTML
  ).join('');
});
