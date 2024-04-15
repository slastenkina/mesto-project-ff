import '../pages/index.css';
import { initialCards } from '../components/cards.js';
import {
  createCard,
  openImage,
  addLike,
  deleteCard,
} from '../components/card.js';
import {
  openModal,
  closeModal,
} from '../components/modal.js';
import { 
  cardsContainer,
  editButton,
  editModal,
  addButton,
  addModal,
  formProfileElement,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  cardElement,
  placeInput,
  linkInput
} from '../components/constants.js'


initialCards.forEach((cardInfo) => {
  const cards = createCard(cardInfo, deleteCard, addLike, openImage);
  cardsContainer.append(cards);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openModal(editModal);
});

addButton.addEventListener('click', () => {
  openModal(addModal);
});

// форма редактирования профиля

const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  const openedModal = document.querySelector('.popup_is-opened');
  closeModal(openedModal);
};
formProfileElement.addEventListener('submit', handleFormSubmitProfile);

//форма добавления карточки

const handleFormSubmitCard = (evt) => {
  evt.preventDefault();

  const place = placeInput.value;
  const imegeLink = linkInput.value;

  const newCard = {
    name: place,
    link: imegeLink,
  };

  const addNewCard = (newCard) => {
    const cardNew = createCard(newCard, deleteCard, addLike, openImage);
    cardsContainer.prepend(cardNew);
  }
    addNewCard(newCard);

    cardElement.reset();

    closeModal(addModal);
  }
 cardElement.addEventListener('submit', handleFormSubmitCard);




