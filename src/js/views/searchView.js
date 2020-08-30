export const getInput = () => {
  return document.querySelector('.search-field').value;
};

export const clearInput = () => {
  document.querySelector('.search-field').value = '';
};

export const clearResults = () => {
  document.querySelector('.results-list').innerHTML = '';
  document.querySelector('.results-pages').innerHTML = '';

};
// this is the new title of a pizza recipe
//[this, is, the, new, ....]

export const fixTitle = (title, limit = 17) => {
  const newTitle = [];
  const titleArr = title.split(' ');
if(title.length > limit){
    titleArr.reduce((acc, cur) => {
        if(acc + cur.length <= limit){

          newTitle.push(cur);
        }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(' ')} ...`;
  }
    return title;
}

const renderRecipe = recipe => {
  const template = `<li class="result-element">
                        <a href="#${recipe.recipe_id}" class="result-container">
                          <figure class="all-results-image">
                            <img src="${recipe.image_url}" alt="" class='result-image'>
                          </figure>
                          <div class="results-data">
                            <h4 class="result-title">${fixTitle(recipe.title)}</h4>
                            <p class="result-publisher">${recipe.publisher}</p>
                          </div>
                        </a>
                      </li>`;

  document.querySelector('.results-list').insertAdjacentHTML('beforeend',template);
}

const createButton = (page, type) =>  `
      <button class="btn-inline btn-type-${type}" data-goto = ${type === 'next' ? page + 1 : page - 1}>
        <span>Page ${type === 'next' ? page + 1 : page - 1}</span>
        </button>
  `;

export const renderButtons = (page, resultsPerPage, totalResults) => {
const pages = Math.ceil(totalResults/resultsPerPage);
let button;
  if(page === 1 && pages > 1){
    //create 1 next button
    button = createButton(page, 'next');
  }else if(page === 2){
    // create both buttons
    button = `
    ${createButton(page, 'prev')}
    ${createButton(page, 'next')}
   `;

  }else if(page === 3){
    //create 1 prev button
    button = createButton(page, 'prev');
  }
document.querySelector('.results-pages').insertAdjacentHTML('afterbegin', button);
};


export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, resultsPerPage, recipes.length);
}
