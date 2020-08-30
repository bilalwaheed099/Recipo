
import { fixTitle }  from './searchView';

export const toggleLikeMenu = numLikes => {
  document.querySelector('.likes-btn').style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const toggleLikeBtn = isLiked => {
  const classString = isLiked ? 'added' : 'add';
  document.querySelector('.like-btn').setAttribute('id', `${classString}-to-like-btn`);
};

export const renderLikeElement = (recipe) => {
  const markup = `<li class="like-list-item" data-id="${recipe.id}" >
                        <a href="#${recipe.id}" class="like-element">
                          <figure class="likes-results-image">
                            <img src="${recipe.img}" alt="" class='result-image'>
                          </figure>
                          <div class="likes-results-data">
                            <h4 class="result-title">${fixTitle(recipe.title)}</h4>
                            <p class="result-publisher">${recipe.auth}</p>
                          </div>
                        </a>
                        <span><button class="del-like-btn">x</button></span>
                      </li>
  `;
  document.querySelector('.likes__list').insertAdjacentHTML('beforeend', markup);
};

export const delLikeElement = id => {
  const delElement = document.querySelector(`.like-element[href="#${id}"]`).parentElement;
  delElement.parentElement.removeChild(delElement);
  const el = document.querySelector('.like-btn');
  if(el) el.setAttribute('id', 'add-to-like-btn')
};
