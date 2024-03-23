const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardInfo, callbackDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  cardElement.querySelector('.card__image').src = cardInfo.link;
  cardElement.querySelector('.card__image').alt = cardInfo.name;
  cardElement.querySelector('.card__title').textContent = cardInfo.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', callbackDelete);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const removeCard = event.target.closest('.card');
  removeCard.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardInfo) => {
  const card = addCard(cardInfo, deleteCard);
  cardsContainer.append(card);
});
