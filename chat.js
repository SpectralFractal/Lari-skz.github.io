async function getRecipes(ingredients) {
  if (!ingredients || ingredients.length === 0) {
    return [];
  }

  const response = await fetch('https://foodcombatchatgpt.herokuapp.com/getRecipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: ingredients
    })
  });

  const data = await response.json();
  return data;
}

document.getElementById('ingredients-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const ingredientsInput = document.getElementById('ingredients-input');
  const ingredients = ingredientsInput.value.split(',').map(ingredient => ingredient.trim());
  const recipes = await getRecipes(ingredients);

  const recipesContainer = document.getElementById('recipes-container');
  recipesContainer.innerHTML =  recipes.map(recipe => `${recipe}`).join('') ;
});
