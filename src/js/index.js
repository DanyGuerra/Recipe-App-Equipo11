import 'bootstrap';
import './scss/app.scss';
import '../sass/styles.scss';

// Font Awesome
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const mealcontainer = document.querySelector('.meal-container')
let btnSearch = document.getElementById('search-btn');
const searcResults = document.querySelector('.search-result');


// Receta Random
let randomBtn = document.querySelector('.random-btn');
randomBtn.addEventListener('click',()=>{
    searcResults.innerHTML = ``
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then( result => result.json())
      .then( result => showMeal(result.meals[0]))

    });


const showMeal = (meal) => {


    mealcontainer.innerHTML=`
     <h1 class="m-5 meal-title"></h1>

    <section class="receta">
        <div class="receta-img">
        </div>
        <div class="ingredientes">
            <h2 class="ingredients-title"></h2>
            <div class="ingredientes-items row">
                <ul class="lista-ingredientes ingredientes-items">
                </ul>
            </div>
        </div>
    </section>

    <section class="procedimiento m-5"></section>
    `
    const mealTitle = document.querySelector('.meal-title');
    const recetaImg = document.querySelector('.receta-img');
    const ingredientes = document.querySelector(".lista-ingredientes");
    const procedimiento = document.querySelector(".procedimiento");
    const ingredientsTitle = document.querySelector(".ingredients-title");

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

    ingredientsTitle.innerHTML = `<h2>Ingredientes<h2>`
    ingredientes.innerHTML = ``
    ingredientesArray.forEach((elemento) => {
    ingredientes.innerHTML += `
    <div class="ingrediente">
    <img src="${elemento[2]}"></img>
    <il> ${elemento[0]} ${elemento[1]} </il>
    </div>`

    });

    procedimiento.innerHTML =`
    <h2>Procedimiento</h2>
    <p>${meal.strInstructions}</p>
  `
}


btnSearch.addEventListener("click", function () {

    mealcontainer.innerHTML = ``
    let inputSearch = document.getElementById('input-search');
    const inputTrim = inputSearch.value.trim();


    if(inputTrim){
        searcResults.innerHTML = ``
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + inputTrim, {method: 'GET'})
        .then(response => response.json())
        .then(data => {

            searcResults.innerHTML = ``
            console.log(data.meals)
            for (const meal of data.meals) {

                searcResults.innerHTML += `
                 <div class="food-item col-lg-2 col-md-3 col-sm-5">
                    <div class="food-image">
                        <a href="./index.html"></a>
                            <img class="img-fluid" src="${meal.strMealThumb}"alt="">

                        <div class="caption">
                            <div class="blur"></div>
                            <div class="caption-text">
                                <i class="fas fa-eye"></i>
                            </div>
                        </div>

                    </div>
                    <h4 class="food-name">${meal.strMeal}</h4>
                </div>
                `
            }
         });
    }else {
        alert('The input is empty')
    }
})
