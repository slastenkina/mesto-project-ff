import { cardTemplate } from './constants.js';

export const createCard = (
  userId,
  cardInfo,
  onDelete,
  onLike,
  onImageClick
) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  cardImage.alt = cardInfo.name;
  cardImage.src = cardInfo.link;

  card.querySelector('.card__title').textContent = cardInfo.name;

  cardImage.addEventListener('click', () => onImageClick(cardInfo));

  const deleteButton = card.querySelector('.card__delete-button');

  if (cardInfo.owner._id === userId) {
    deleteButton.classList.add('card__delete-button_is-active');
    deleteButton.addEventListener('click', () => {
      onDelete({
        cardId: cardInfo._id,
        cardElement: card,
        buttonElement: deleteButton,
      });
    });
  }

  const likeNum = card.querySelector('.card__like-num');
  

  if (cardInfo.likes.length) {
    likeNum.classList.add('card__like-num_is-active');
  }

  const likeButton = card.querySelector('.card__like-button');

  const isLiked = cardInfo.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeNum.textContent = cardInfo.likes.length;

  likeButton.addEventListener('click', () => {
    onLike({
      cardId: cardInfo._id,
      buttonElement: likeButton,
      counterElement: likeNum,
      isLiked: likeButton.classList.contains('card__like-button_is-active'),  //спасибо большое! я понимала в чём проблема, но никак не могла найти решение, чтобы именно лайк определялся
    });
  });

  return card;
};

export const setCardLike = ({ likes, buttonElement, counterElement }) => {
  buttonElement.classList.add('card__like-button_is-active');
  counterElement.classList.add('card__like-num_is-active');
  counterElement.textContent = likes.length;
};

export const removeCardLike = ({ likes, buttonElement, counterElement }) => {
  buttonElement.classList.remove('card__like-button_is-active');

  if (likes.length) {
    counterElement.classList.add('card__like-num_is-active');
    counterElement.textContent = likes.length;
  } else {
    counterElement.classList.remove('card__like-num_is-active');
    counterElement.textContent = '0';
  }
};

export const removeCard = (cardElement) => {
  cardElement.remove();
};
