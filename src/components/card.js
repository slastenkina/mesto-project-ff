import {
  modalImage,
  modalImagePic,
  modalImageCaption,
} from '../components/constants.js';
import { openModal } from './modal.js';
import { cardTemplate } from './constants.js';

export const createCard = (cardInfo, deleteCard, addLike, openImage) => {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = card.querySelector('.card__image');

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardImage.textContent = cardInfo.name;

  cardImage.addEventListener('click', () => openImage(cardInfo));

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(card));

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', addLike);

  return card;
};

export const deleteCard = (card) => {
  card.remove();
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
