import uniqid from 'uniqid';

export default class Likes{
constructor(){
  this.likesList = [];
}

addToList(id,  title, auth, img){
  const likeItem = {
    id,
    img,
    auth,
    title
  }
  this.likesList.push(likeItem);
  return likeItem;
}

deleteFromList(id){
  const delIndex = this.likesList.findIndex(el => el.id = id);
  this.likesList.splice(delIndex, 1);
}

totalLikes(){
  return this.likesList.length;
}

isLiked(id){
    return this.likesList.findIndex(el => el.id === id) !== -1;
}

addToLocalStorage(){
  const string = JSON.stringify(this.likesList);
  localStorage.setItem("likes", string);
}

getParticularIndex(id){
  return this.likesList.findIndex(el => el.id === id)
}

getFromLocalStorage(){
  const likesArray = JSON.parse(localStorage.getItem("likes"));
  if (likesArray) this.likesList = likesArray;
}
}
