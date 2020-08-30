import uniqid  from 'uniqid';
export default class ShoppingList{
  constructor(){
    this.list = [];
  }

  addItem(count, unit, ingredient){
    const item = {
      id: uniqid(),
       count,
       unit,
       ingredient
    }
    this.list.push(item);
    return item;
  }

  deleteItem(id){
  const delIndex = this.list.findIndex(el => el.id === id);
  this.list.splice(delIndex, 1);
  }

  updateItem(id, newValue){
    const updateIndex = this.list.findIndex(el => el.id === id);
        this.list[updateIndex].count = newValue;

  }
  }
