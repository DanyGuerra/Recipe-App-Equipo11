import 'bootstrap';
import './scss/app.scss';
import '../sass/styles.scss';

// Font Awesome
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const mealcontainer = document.querySelector('.meal-container');
let btnSearch = document.getElementById('search-btn');
const searchResults = document.querySelector('.search-result');
let mealsResults = [];

const error = document.querySelector(".error");
let isError = false;

// Receta Random
let randomBtn = document.querySelector('.random-btn');
randomBtn.addEventListener('click',()=>{
    error.style.display = "none";
    searchResults.innerHTML = ``
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then( result => result.json())
      .then( result => showMeal(result.meals[0]))

    });


const showMeal = (meal) => {

    searchResults.innerHTML = ``

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
        searchResults.innerHTML = ``
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + inputTrim, {method: 'GET'})
        .then(response => response.json())
        .then(data => {


            mealsResults = []
            searchResults.innerHTML = ``
            for (const meal of data.meals) {
                mealsResults.push(meal)
                searchResults.innerHTML += `
                 <div class="food-item col-lg-2 col-md-3 col-sm-5">
                    <div class="food-image">
                            <img class="img-fluid" src="${meal.strMealThumb}" alt="">

                        <div class="caption">
                            <div class="blur" ></div>
                            <div class="caption-text">
                                <i class="fas fa-eye"></i>
                            </div>
                        </div>

                    </div>
                    <h4 class="food-name">${meal.strMeal}</h4>
                </div>`
            }
            showMealSearch()

         })
         .catch (err => {
             console.log(err, )
             isError= true;
             if(isError) {
                error.style.display = "block";
                errorSearch()
             }
        }) 


    }else {
        alert('The input is empty')
    }

})


function showMealSearch(){
    isError=false
    if(isError === false){
        error.style.display = "none";
    }

    if(searchResults.innerHTML){
        const mealsSearch = document.querySelectorAll('.food-image')
        for(let i = 0; i < mealsSearch.length; i++){
            mealsSearch[i].addEventListener("click", function(){
                showMeal(mealsResults[i])
            })
        }
    }
}

function errorSearch () {
    error.innerHTML = `
    <i class="fas fa-utensils error-icon"></i>
    <p class="error-text" >I didn't find that food</p>
    <p class="error-text" >try another option</p>
    `
}
