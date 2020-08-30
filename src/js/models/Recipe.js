import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

    async getRecipe(){
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.title = res.data.recipe.title;
        this.author = res.data.recipe.publisher;
        this.img = res.data.recipe.image_url;
        this.url = res.data.recipe.source_url;
        this.ingredients = res.data.recipe.ingredients;
  };

  calcTime() {
    const numIngredients = this.ingredients.length;
    const periods = numIngredients/3;
    this.time = periods * 15;
  }

  calcServings(){
    this.servings = 4;
  }

  parseIngredients() {
    // ARRAYS
    const originalUnits = ['tablespoons', 'tablespoon', 'teaspoons',
    'teaspoon', 'ounces', 'ounce', 'pounds', 'cups'];
     const newUnits = ['tbsp', 'tbsp', 'tsp', 'tsp', 'oz', 'oz', 'pound', 'cup', 'gram', 'kg'];
     const newIngs = this.ingredients.map(el => {

       // UNIFORM UNITS
       let ingredient = el.toLowerCase();
       originalUnits.forEach((unit, i) => {
         ingredient = ingredient.replace(unit, newUnits[i]);
       });

       //REMOVE PARENTHESIS
       ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

       //MAKE ARRAY OF ingredient

       let ingArr = ingredient.split(' ');

       //ingredient object
       let ingObj;
       //PARSE INGREDIENT INTO COUNT, UNIT, AND INGREDIENT
       const unitIndex = ingArr.findIndex(el2 => newUnits.includes(el2));

       if(unitIndex > -1) {
         //index found
         const arrCount = ingArr.slice(0, unitIndex);

         let count;
         if(arrCount.length === 1){
           count = eval(ingArr[0].replace('-', '+'));
         }else {
           count = eval(ingArr.slice(0, unitIndex).join('+'));
         }
         ingObj = {
           count,
           unit: ingArr[unitIndex],
           ingredient: ingArr.slice(unitIndex + 1).join(' ')
         }
       } else if (unitIndex === -1 && parseInt(ingArr[0], 10)){
         //no unti found with first NUMBER
         ingObj = {
           count: parseInt(ingArr[0], 10),
           unit: '',
           ingredient: ingArr.slice(1).join(' ')
         }
       } else if (unitIndex === -1){
         ingObj = {
           count: 1,
           unit: '',
           ingredient: ingArr.join(' ')
         }
       }
       return ingObj;
     });
     this.ingredients = newIngs;
  };

  updateServings(type){
    //Servings
    const newServings = type === 'increase' ? this.servings + 1 : this.servings - 1;
    //ingredients
    this.ingredients.forEach(el => el.count = el.count * (newServings / this.servings));

    this.servings = newServings;
  };
}
