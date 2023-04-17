import { pets } from "./pets.js";

const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");
const ITEM_ACTIVE = document.querySelector("#item-active");
let arr_active = [];
let arr_left = [];
let arr_right = [];

/*Генерация массива*/
const getRandomNums = (numArr, count) => {
  while (numArr.length != count) {
    let num = Math.floor(Math.random() * pets.length);
    if (numArr.length == 0)
      numArr.push(num);
    if (numArr.find(currentValue => currentValue == num) == undefined)
      numArr.push(num);
  }
  return numArr;
}

const createListCards = (j, numPets, item) => {
  for (let i = j; i < j + 3; i++) {
    const card = createCardTemplate(numPets[i]);
    if (i == j + 1) {
      card.classList.add("second_card");
    }
    if (i == j + 2) {
      card.classList.add("third_card");
    }
    item.appendChild(card);
  }
}

/*Создание карты питомца*/
const createCardTemplate = (num) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("open_popup");
  const numPet = num;
  card.innerHTML = `<img class="open_popup" src="${pets[numPet].img}" alt="${pets[numPet].name}">
                    <h4 class="open_popup">${pets[numPet].name}</h4>
                    <button class="open_popup">Learn more</button>`;
  card.setAttribute("id", num)
  return card;
}

/*Генерация стартового экрана*/
document.addEventListener("DOMContentLoaded", (event) => {
  let numPets = getRandomNums([], 6);
  createListCards(0, numPets, ITEM_LEFT);
  arr_left = numPets.slice(0, 3);
  createListCards(3, numPets, ITEM_ACTIVE);

  numPets.splice(0, 3);
  arr_active = numPets.slice(0, 3);
  numPets = getRandomNums(numPets, 6);
  arr_right = numPets.slice(3, 6);
  createListCards(3, numPets, ITEM_RIGHT);
});


/*Стрелка влево*/
const moveLeft = () => {
  CAROUSEL.classList.add("transition-left");
  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

/*Стрелка вправо*/
const moveRight = () => {
  CAROUSEL.classList.add("transition-right");
  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

CAROUSEL.addEventListener("animationend", (animationEvent) => {
  let changedItem;
  let changedItem2;
  if (animationEvent.animationName === "move-left") {
    CAROUSEL.classList.remove("transition-left");
    changedItem = ITEM_LEFT;
    changedItem2 = ITEM_RIGHT;
    document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
    if (arr_left.length != 0) {
      arr_active = arr_left.slice(0, 3);
      arr_left.length = 0;
      arr_right.length = 0;
    }
  } else {
    CAROUSEL.classList.remove("transition-right");
    changedItem = ITEM_LEFT;
    changedItem2 = ITEM_RIGHT;
    document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
    if (arr_right.length != 0) {
      arr_active = arr_right.slice(0, 3);
      arr_right.length = 0;
      arr_left.length = 0;
    }
  }

  changedItem.innerHTML = "";
  changedItem2.innerHTML = "";
  let numPets = getRandomNums(arr_active, 6);
  createListCards(3, numPets, changedItem);
  arr_left = numPets.slice(3, 6);
  numPets = getRandomNums(arr_active, 6);
  createListCards(3, numPets, changedItem2);
  arr_right = numPets.slice(3, 6);

  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_RIGHT.addEventListener("click", moveRight);
})