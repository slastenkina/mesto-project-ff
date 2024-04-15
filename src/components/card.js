import {
  modalImage,
  modalImagePic,
  modalImageCaption,
} from '../scripts/index.js';
import { openModal } from './modal.js';

export const createCard = (cardInfo, deleteCard, addLike, openImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  card.querySelector('.card__image').src = cardInfo.link;
  card.querySelector('.card__image').alt = cardInfo.name;
  card.querySelector('.card__title').textContent = cardInfo.name;

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', () => openImage(cardInfo));

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', addLike);

  return card;
};

export const deleteCard = (evt) => {
  const removeCard = evt.target.closest('.card');
  removeCard.remove();
};

export const addLike = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

export const openImage = (cardInfo) => {
  modalImagePic.src = cardInfo.link;
  modalImagePic.alt = cardInfo.name;
  modalImageCaption.textContent = cardInfo.name;

  openModal(modalImage);
};