import '../sass/styles.scss';
import 'bootstrap';
import './scss/app.scss';
import './details.js'
// import paginaDetalles from "../paginaDetalles.html"

// Font Awesome
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


let randomBtn = document.querySelector('.random-btn');
randomBtn.addEventListener('click',()=>{
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then( result => result.json())
      .then( result => showMeal(result.meals[0]))

});

const showMeal = (meal) => {
  const mealTitle = document.querySelector('.meal-title');
  const recetaImg = document.querySelector('.receta-img');
  const ingredientes = document.querySelector(".ingredientes-items");

  mealTitle.innerHTML = `${meal.strMeal}`;
  recetaImg.innerHTML = `<img src="${meal.strMealThumb}" alt="photo">`;


  ingredientes.innerHTML = `
  <img class="ingrediente col" src="${a}" alt="">`;

}

