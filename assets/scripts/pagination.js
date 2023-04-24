import { pets } from "./pets.js";

let numPets = [];
const cardsContainer = document.querySelector('.cards_container');
const numPage = document.querySelector('#num_page');
const btnFirstPage = document.querySelector('#btn_first_page');
const btnLastPage = document.querySelector('#btn_last_page');
const btnNextPage = document.querySelector('#btn_next_page');
const btnPrevPage = document.querySelector('#btn_prev_page');

const cleanPage = () => {
    const cardsArr = document.querySelectorAll(".card");
    for (let card of cardsArr) {
        cardsContainer.removeChild(card);
    }
};

//Проверка кнопок
const buttonCheck = () => {
    let count = countPets();
    if (+numPage.textContent == 48 / count) {
        btnFirstPage.disabled = false;
        btnLastPage.disabled = true;
        btnNextPage.disabled = true;
        btnPrevPage.disabled = false;
    } else if (+numPage.textContent == 1) {
        btnFirstPage.disabled = true;
        btnLastPage.disabled = false;
        btnNextPage.disabled = false;
        btnPrevPage.disabled = true;
    } else {
        btnFirstPage.disabled = false;
        btnLastPage.disabled = false;
        btnNextPage.disabled = false;
        btnPrevPage.disabled = false;
    }
};

//Первая страница
const getFirstPage = () => {
    let count = countPets();
    cleanPage();
    createListCards(0, numPets, count, cardsContainer);
    numPage.textContent = '1';
    buttonCheck();
};

//Последняя страница
const getLastPage = () => {
    let count = countPets();
    cleanPage();
    createListCards(48 - count, numPets, count, cardsContainer);
    numPage.textContent = `${48 / count}`;
    buttonCheck();
};

//Следующая страница
const getNextPage = () => {
    let count = countPets();
    cleanPage();
    let startNum = +numPage.textContent * count;
    createListCards(startNum, numPets, count, cardsContainer);
    numPage.textContent = `${+numPage.textContent + 1}`;
    buttonCheck();
};

//Предыдущая страница
const getPrevPage = () => {
    let count = countPets();
    cleanPage();
    let startNum = +numPage.textContent * count - count * 2;
    createListCards(startNum, numPets, count, cardsContainer);
    numPage.textContent = `${+numPage.textContent - 1}`;
    buttonCheck();
};

btnFirstPage.addEventListener("click", getFirstPage);
btnLastPage.addEventListener("click", getLastPage);
btnNextPage.addEventListener("click", getNextPage);
btnPrevPage.addEventListener("click", getPrevPage);

//Получение массива
const getRandomNums = () => {
    let numArr = [];
    let numArrMin = [];
    let numArrMiddle = [];
    let numArrMax = [];
    while (numArr.length != 48) {
        let num = Math.floor(Math.random() * pets.length);
        if (numArr.length == 0) {
            numArr.push(num);
            numArrMin.push(num);
            numArrMiddle.push(num);
            numArrMax.push(num);
        }
        if (numArrMax.find(currentValue => currentValue == num) == undefined &&
            numArrMin.find(currentValue => currentValue == num) == undefined &&
            numArrMiddle.find(currentValue => currentValue == num) == undefined) {
            numArr.push(num);
            numArrMin.push(num);
            numArrMiddle.push(num);
            numArrMax.push(num);
        }
        if (numArrMin.length == 3) numArrMin.length = 0;
        if (numArrMiddle.length == 6) numArrMiddle.length = 0;
        if (numArrMax.length == 8) numArrMax.length = 0;
    }
    return numArr;
};


const createListCards = (j, numPets, count, item) => {
    for (let i = j; i < count + j; i++) {
        const card = createCardTemplate(numPets[i]);
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

/*Получение размера*/
const countPets = () => {
    let screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
        return 8;
    } else if (screenWidth >= 768) {
        return 6;
    } else {
        return 3;
    }
};

document.addEventListener("DOMContentLoaded", (event) => {
    numPets = getRandomNums();
    let count = countPets();
    createListCards(0, numPets, count, cardsContainer);
});

//Измение количества карточек при измении размера экрана
window.addEventListener(`resize`, event => {
    let count = countPets();
    cleanPage();
    let startNum;
    if (+numPage.textContent > 48 / count) {
        numPage.textContent = `${48 / count}`;
        startNum = 48 - count;
    } else {
        startNum = count * (+numPage.textContent - 1);
    }
    createListCards(startNum, numPets, count, cardsContainer);
    startNum = +numPage.textContent * count;
    buttonCheck();
}, false);



