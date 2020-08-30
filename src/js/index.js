import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as likesView from './views/likesView';

/*Global state of the system
- Object
- Result
- Shopping
- liked Recipes
*/

const state = {};
window.state = state;

const controlSearch = async () => {
  //1. get the query
  const query = searchView.getInput();

  if(query){
      //2. create new object and state
      state.search = new Search(query);
      //3. prepare the UI for results
      searchView.clearInput();
      searchView.clearResults();

      try{
        //4. Search for results
       await state.search.getResults();
        //5. Display results
       searchView.renderResults(state.search.result);
       console.log(state.search.result);
     }catch(error) {
       alert('Something went wrong with search!');
     }

  }


}

window.addEventListener('load', () => {

  if(!state.likes)  state.likes = new Likes();
  state.likes.getFromLocalStorage();
  likesView.toggleLikeMenu(state.likes.totalLikes());
  state.likes.likesList.forEach(e => likesView.renderLikeElement(e));

});

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

document.querySelector('.results-pages').addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage)
  }
});


const controlRecipe = async () => {
  // get id
  const id = window.location.hash.replace('#','');
  // create object
  state.recipe = new Recipe(id);
  //highlight
  recipeView.highlightSelected(id);

  try{
    //get recipe
    const res = await state.recipe.getRecipe(id);
    console.log(id);
    state.recipe.parseIngredients();
    state.recipe.calcTime();
    state.recipe.calcServings();
    //display recipe
    recipeView.clearRecipe();
    console.log('working');

    recipeView.renderRecipe(state.recipe, state.likes.isLiked(id).toString());
    //Check
        console.log(state.recipe);

  }catch(error) {
    alert(error);
  }
}

const controlShoppingList = () => {
  state.list = new ShoppingList;
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    shoppingListView.renderListItem(item);
  });
  console.log(state.list);

}

['hashchange'].forEach(event => addEventListener(event, controlRecipe));


document.querySelector('.recipe').addEventListener('click', e => {
  if(e.target.matches('.rec-servings-increase, rec-servings-increase * ')){
    state.recipe.updateServings('increase');
    recipeView.updateServingsUI(state.recipe);
  }
  else if(e.target.matches('.rec-servings-decrease, rec-servings-decrease *')){
if (state.recipe.servings > 1){
    state.recipe.updateServings('decrease');
    recipeView.updateServingsUI(state.recipe);
}
}
else if(e.target.matches('.add-to-cart-btn, add-to-cart-btn *')){
  controlShoppingList();
}
else if(e.target.matches('.like-btn')){
  controlLikesList();
}
});
document.querySelector('.shopping-list').addEventListener('click', e => {
  const id = e.target.closest('.shopping-list-element').dataset.itemid;
  console.log(id);
  if(e.target.matches('.list-del-btn')){
  shoppingListView.delItem(id);
  state.list.deleteItem(id);
  }
  else if(e.target.matches('.sh-ing-count')){
    const newVal = e.target.closest('.sh-ing-count').value;
    state.list.updateItem(id, parseInt(newVal, 10));
  }
});

// LIKES CONTROLLER


//add a class on pressing the add to like search__button
const controlLikesList = () => {
    const curID = state.recipe.id;

      if(!state.likes.isLiked(curID)){
        const newItem = state.likes.addToList(curID, state.recipe.title, state.recipe.author, state.recipe.img);
        likesView.toggleLikeBtn(state.likes.isLiked(curID));
        likesView.renderLikeElement(newItem);
        state.likes.addToLocalStorage();
      }else{
        state.likes.deleteFromList(curID);
        likesView.toggleLikeBtn(state.likes.isLiked(curID));
        likesView.delLikeElement(curID);
        state.likes.addToLocalStorage();
        likesView.toggleLikeMenu(state.likes.totalLikes());
      }
likesView.toggleLikeMenu(state.likes.totalLikes());
}
// likes delete button
document.querySelector('.likes').addEventListener('click', e => {
  const id = e.target.closest('.like-list-item').dataset.id;
  console.log(id)
  if(e.target.matches('.del-like-btn')){
    controlDeleteLike(id);
  }
});

const controlDeleteLike = (id) => {
  //1. delete it from the likesList
  state.likes.deleteFromList(id);
  //2. delete it from the UI
  likesView.delLikeElement(id);
  state.likes.addToLocalStorage();
  document.querySelector('.likes__list').classList.remove('like-list-visible');
  likesView.toggleLikeMenu(state.likes.totalLikes())
  likesView.toggleLikeBtn(state.likes.isLiked(state.recipe.id));// calling again to prevent the situation where one of the other
                                                      // likes is deleted and the present recipe gets unliked on the UI
};

document.querySelector('.likes-btn').addEventListener('mouseenter', () => {
document.querySelector('.likes__list').classList.add('like-list-visible');
});
document.querySelector('.likes').addEventListener('mouseleave', () => {
document.querySelector('.likes__list').classList.remove('like-list-visible');
});

//implementing local storage
