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

// Asteapta sa dam click pe butonul "trimite". Asata se numeste eveniment
document.getElementById('ingredients-form').addEventListener('submit', async (event) => {
  //Nu da refresh la pagina, asa ca lista de ingrediente ramane in text box
  event.preventDefault();
  //variabila ingredientsInput contine tot ceea ce scriem in text box
  const ingredientsInput = document.getElementById('ingredients-input');
  // variabila ingredients(e vector sau lista defapt) desparte cuvintele din lista dupa virgula, iar map scoate caraterele
  // spatiu din elementele vectorului
  const ingredients = ingredientsInput.value.split(',').map(ingredient => ingredient.trim());
  //variabila recipes contine raspunsul primit de la serverul de node.js.
  // e o lista cu retete
  const recipes = await getRecipes(ingredients);

  // Tot codul de mai jos se ocupa de modul in care retetele sunt afisate in browser(la client, la mine pe pc)
  // fiecare reteta e adaugata intr-un tag <p></p> 
  // se creaza un singur sir de caractere [asta face join('') ]
  const recipesContainer = document.getElementById('recipes-container');
 recipesContainer.innerHTML = recipes.map(recipe => `<p>${recipe}</p>`).join('');
});
