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

/*Busqueda de recetas */
let inputSearch = document.getElementById("inputSearch");
let btnSearch = document.getElementById("btnSearch");

const app = document.getElementById('app');

        btnSearch.addEventListener("click", function (event) {

          document.getElementById('app').innerHTML = '';

           fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + inputSearch.value, {method: 'GET'})
           .then(response => response.json())
            .then(data => {

                for (const key of data.meals) {

                    const div = document.createElement('div');
                    div.className='col-md-3';

                    const divCard = document.createElement('div');
                    divCard.className='card mb-4 box-shadow';

                    const img = document.createElement('img');
    
                    img.className='card-img-top';
                    img.src = key.strMealThumb;
                    img.alt = key.strTags;

                    divCard.appendChild(img);

                    const divCardBody = document.createElement('div');
                    divCardBody.className='card-body';

                    const pText = document.createElement('p');
                    pText.className='card-text text-black';
                    pText.textContent= key.strMeal;

                    divCardBody.appendChild(pText);

                    const divCardFooter = document.createElement('div');
                    divCardFooter.className='d-flex justify-content-between align-items-center';

                    divCardBody.appendChild(divCardFooter);

                    const divCardFooterGroup = document.createElement('div');
                    divCardFooterGroup.className='btn-group';

                    divCardBody.appendChild(divCardFooterGroup);

                    const button = document.createElement('a');
                    button.className='btn btn-sm btn-outline-secondary';
                    button.textContent = 'Ver receta';
                    button.href = 'http://localhost:8080/paginaDetalles.html?ref=' + key.idMeal;

                    divCardBody.appendChild(button);

                    divCard.appendChild(divCardBody);
                    div.appendChild(divCard);
                    app.appendChild(div);
                }
            });
        })