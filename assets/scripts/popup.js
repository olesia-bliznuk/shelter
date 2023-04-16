import { pets } from "./pets.js";
// Открыть модальное окно
let popup = document.querySelector('.popup');

const openPopup = (event) => {
    let petNum = event.target.parentElement.id;
  let pet = pets[petNum];

  popup.classList.add('open');
  document.body.classList.add('no-scroll');

  const imgPet = document.querySelector('.img_pet');
  const petName = document.querySelector('.pet_name');
  const petBreed = document.querySelector('.pet_breed');
  const petDescription = document.querySelector('.pet_description');
  const petAge = document.querySelector('#pet_age'); 

  const petInoculations = document.querySelector('#pet_inoculations'); 
  const petDiseases= document.querySelector('#pet_diseases'); 
  const petParasites = document.querySelector('#pet_parasites'); 


  imgPet.src = pet.img;
  petName.textContent = pet.name;
  petBreed.textContent = pet.breed;
  petDescription.textContent = pet.description;
  petAge.textContent = pet.age;


  petInoculations.textContent = pet.inoculations;
  petDiseases.textContent = pet.diseases;
  petParasites.textContent = pet.parasites;
}

// Закрыть модальное окно
document.querySelector(".button_close").addEventListener("click", function() {
    popup.classList.remove("open");
    document.body.classList.remove('no-scroll');
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        popup.classList.remove("open");
        document.body.classList.remove('no-scroll');
    }
  });

// Закрыть модальное окно при клике вне его
document.querySelector("#popup .modal_window").addEventListener('click', event => {
    event._isClickWithInModal = true;
  });
  popup.addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

// вызов попапа
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('open_popup')) {
        openPopup(event);
    }
  });
