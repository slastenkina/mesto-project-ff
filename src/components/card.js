import {
  modalImage,
  modalImagePic,
  modalImageCaption,
} from '../components/constants.js';
import { openModal } from './modal.js';
import { cardTemplate } from './constants.js';

export const createCard = (userId, cardInfo, onDelete, onLike, onImage) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  cardImage.alt = cardInfo.name;
  cardImage.src = cardInfo.link;

  card.querySelector('.card__title').textContent = cardInfo.name;

  cardImage.addEventListener('click', () => onImage(cardInfo));

  const deleteButton = card.querySelector('.card__delete-button');

  if (cardInfo.owner['_id'] === userId) {
    deleteButton.classList.add('card__delete-button_is-active');
    deleteButton.addEventListener('click', () => {
      onDelete({
        cardId: cardInfo['_id'],
        cardElement: card,
        buttonElement: deleteButton,
      });
    });
  }

  const likeNum = card.querySelector('.card__like-num');
  likeNum.textContent = '0';

  if (cardInfo.likes.length) {
    likeNum.classList.add('card__like-num_is-active');
    likeNum.textContent = cardInfo.likes.length;
  }

  const likeButton = card.querySelector('.card__like-button');

  if (cardInfo.likes.some((like) => like['_id'] === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', () => {
    onLike({
      cardId: cardInfo['_id'],
      buttonElement: likeButton,
      counterElement: likeNum,
    });
  });

  return card;
};

export const openImage = (cardInfo) => {
  modalImagePic.src = cardInfo.link;
  modalImagePic.alt = cardInfo.name;
  modalImageCaption.textContent = cardInfo.name;

  openModal(modalImage);
};
