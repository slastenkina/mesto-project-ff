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

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const addModal = document.querySelector('.popup_type_new-card');

export const modalImage = document.querySelector('.popup_type_image');
export const modalImageCaption = modalImage.querySelector('.popup__caption');
export const modalImagePic = modalImage.querySelector('.popup__image');

const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const cardElement = document.forms['new-place'];
const placeInput = cardElement.querySelector('.popup__input_type_card-name');
const linkInput = cardElement.querySelector('.popup__input_type_url');

initialCards.forEach((cardInfo) => {
  const cards = createCard(cardInfo, deleteCard, addLike, openImage);
  cardsContainer.append(cards);
});

editButton.addEventListener('click', () => {
  openModal(editModal);
});

addButton.addEventListener('click', () => {
  openModal(addModal);
});

// форма редактирования профиля

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  const openedModal = document.querySelector('.popup_is-opened');
  closeModal(openedModal);
};
formElement.addEventListener('submit', handleFormSubmitProfile);

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

    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
 cardElement.addEventListener('submit', handleFormSubmitCard);




