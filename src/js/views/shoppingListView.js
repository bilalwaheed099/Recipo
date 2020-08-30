export const renderListItem = (el) => {
  const markup = `
      <li class="shopping-list-element" id="${el.id}" data-itemid=${el.id}>
        <input type="number" class="sh-ing-count" step="${el.count}" value="${el.count}" min="0">
        <span class="sh-ing-unit">${el.unit}</span>
        <span class="sh-ing-item">${el.ingredient}</span>
        <button class="list-del-btn">x</button>
      </li>

  `;
  document.querySelector('.shopping-list').insertAdjacentHTML('beforeend', markup);
}

export const delItem = id => {
  const delElement = document.querySelector(`[data-itemid=${id}]`);
  delElement.parentElement.removeChild(delElement);
}
