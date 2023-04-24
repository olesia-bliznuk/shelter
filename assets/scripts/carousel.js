import { pets } from "./pets.js";

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");
const carousel = document.querySelector("#carousel");
const itemLeft = document.querySelector("#item-left");
const itemRight = document.querySelector("#item-right");
const itemActive = document.querySelector("#item-active");
let arrActive = [];
let arrLeft = [];
let arrRight = [];

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
};

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
};

/*Создание карты питомца*/
const createCardTemplate = (num) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("open_popup");
  const numPet = num;
  card.innerHTML = `<img class="open_popup" src="${pets[numPet].img}" alt="${pets[numPet].name}">
                    <h4 class="open_popup">${pets[numPet].name}</h4>
                    <button class="open_popup">Learn more</button>`;
  card.setAttribute("id", num);
  return card;
};

/*Генерация стартового экрана*/
document.addEventListener("DOMContentLoaded", (event) => {
  let numPets = getRandomNums([], 6);
  createListCards(0, numPets, itemLeft);
  arrLeft = numPets.slice(0, 3);
  createListCards(3, numPets, itemActive);
  numPets.splice(0, 3);
  arrActive = numPets.slice(0, 3);
  numPets = getRandomNums(numPets, 6);
  arrRight = numPets.slice(3, 6);
  createListCards(3, numPets, itemRight);
});

/*Стрелка влево*/
const moveLeft = () => {
  carousel.classList.add("transition-left");
  btnLeft.removeEventListener("click", moveLeft);
  btnRight.removeEventListener("click", moveRight);
};

/*Стрелка вправо*/
const moveRight = () => {
  carousel.classList.add("transition-right");
  btnLeft.removeEventListener("click", moveLeft);
  btnRight.removeEventListener("click", moveRight);
};

btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);

carousel.addEventListener("animationend", (animationEvent) => {
  let changedItem;
  let changedItem2;
  if (animationEvent.animationName === "move-left") {
    carousel.classList.remove("transition-left");
    changedItem = itemLeft;
    changedItem2 = itemRight;
    document.querySelector("#item-active").innerHTML = itemLeft.innerHTML;
    if (arrLeft.length != 0) {
      arrActive = arrLeft.slice(0, 3);
      arrLeft.length = 0;
      arrRight.length = 0;
    }
  } else {
    carousel.classList.remove("transition-right");
    changedItem = itemLeft;
    changedItem2 = itemRight;
    document.querySelector("#item-active").innerHTML = itemRight.innerHTML;
    if (arrRight.length != 0) {
      arrActive = arrRight.slice(0, 3);
      arrRight.length = 0;
      arrLeft.length = 0;
    }
  }
  changedItem.innerHTML = "";
  changedItem2.innerHTML = "";
  let numPets = getRandomNums(arrActive, 6);
  createListCards(3, numPets, changedItem);
  arrLeft = numPets.slice(3, 6);
  numPets = getRandomNums(arrActive, 6);
  createListCards(3, numPets, changedItem2);
  arrRight = numPets.slice(3, 6);
  btnLeft.addEventListener("click", moveLeft);
  btnRight.addEventListener("click", moveRight);
});