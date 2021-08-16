import 'bootstrap';
import './scss/app.scss';
import '../sass/styles.scss';

// Font Awesome
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

let randomBtn = document.querySelector('.random-btn');
randomBtn.addEventListener('click',()=>{
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then( result => result.json())
      .then( result => showMeal(result.meals[0]))

});


const showMeal = (meal) => {
  const mealTitle = document.querySelector('.meal-title');
  const recetaImg = document.querySelector('.receta-img');
  const ingredientes = document.querySelector(".lista-ingredientes");
  const procedimiento = document.querySelector(".procedimiento");

  mealTitle.innerHTML = `${meal.strMeal}`;
  recetaImg.innerHTML = `<img src="${meal.strMealThumb}" alt="photo">`;

  const ingredientesArray = [];
  for(let i=0; i<20; i++){
    let ingrediente = meal[`strIngredient${i}`];
    let cantidad = meal[`strMeasure${i}`];
    let imgIngrediente = `https://www.themealdb.com/images/ingredients/${ingrediente}.png`
    if(ingrediente){
      ingredientesArray.push([cantidad, ingrediente, imgIngrediente]);
    }
  }
  // console.log(ingredientesArray)
  ingredientes.innerHTML = ``
  ingredientesArray.forEach((elemento) => {
    ingredientes.innerHTML += `
    <div class="ingrediente">
<img src="${elemento[2]}"></img>
<il> ${elemento[0]} ${elemento[1]} </il>
</div>
`;

  });

  procedimiento.innerHTML =`
    <h2>Procedimiento</h2>
    <p>${meal.strInstructions}</p>
  `
}

