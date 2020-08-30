import { Fraction } from 'fractional';

const formatCount = num => {
  const [int, dec] = num.toString().split('.').map(el => parseInt(el, 10)); // i = int d = dec
  // 2.5
  if (!dec)
  {
   return num;
 }


  if (int === 0) {
    const fr = new Fraction(num);
    return `${fr.numerator}/${fr.denominator}`;
  }else if (int > 0) {
    const fr = new Fraction(num);
    return `${int} ${fr.numerator}/${fr.denominator}`
    }
    return '?'
  }

const createIngredient = ingredient =>
    `
    <li class="ing-list-element">
      <span class="ing-count"> ${formatCount(ingredient.count)} </span>
      <span class="ing-unit"> ${ingredient.unit}</span>
      <span class="ing-name"> ${ingredient.ingredient}</span>
    </li>
  `;

export const clearRecipe = () => {
document.querySelector('.recipe').innerHTML = '';
};

export const renderRecipe = (recipe , isLiked) => {
  const idString = isLiked == 'true' ? 'added' : 'add';
const markup = `
  <figure class="recipe-fig">
    <img src="${recipe.img}" alt="" class="recipe-image">
  </figure>
  <div>
    <p class ="rec-title">${recipe.title}</p>
  </div>


  <div class="recipe-info">
    <div class="rec-time">
      <span class="time-number">${recipe.time}</span>
      <span>minutes</span>
    </div>
    <div class="rec-servings">
    <button class="rec-servings-increase">+</button>
    <button class="rec-servings-decrease">-</button>
      <span class="serving-number">${recipe.servings}</span>
      <span>servings</span>
    </div>
    <button title="${recipe.id}" class="like-btn" id="${idString}-to-like-btn">Add to Likes</button>
  </div>

  <div class="recipe-ingredients">
    <ul class="ingredients-list">
    ${recipe.ingredients.map(el => createIngredient(el)).join('')}
    </ul>
  </div>
  <button class="add-to-cart-btn">Add to Cart</button>
  `;
  document.querySelector('.recipe').insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsUI = (recipe) => {
  //Update Servings
  document.querySelector('.serving-number').textContent = recipe.servings;
  //update Ingredients
  const ingCounts = Array.from(document.querySelectorAll('.ing-count'));
  ingCounts.forEach((el, i) => {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};
//href="#${recipe.recipe_id}"
export const highlightSelected = id => {

  const resultArray = Array.from(document.querySelectorAll('.result-container'));
  resultArray.forEach(el => {
    el.classList.remove('result-container--active');
  });

  document.querySelector(`.result-container[href="#${id}"]`).classList.add('result-container--active');

};
