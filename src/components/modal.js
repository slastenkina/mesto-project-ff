export const openModal = (popup) => {
    popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', closeByEsc);
};

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closeByEsc);
};

const closeByEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closeModal(openedPopup);
  }
};

const handleCloseModalByOverlayClick = (evt) => {
  if (evt.target.classList.contains('popup_is-opened')) {
    return closeModal(evt.target);
  }
};

export const setCloseModalByClickListeners = (popupList) => {
  popupList.forEach((popup) => {
    // находим кнопку закрытия попапа
    const closeButton = popup.querySelector('.popup__close');

    // вешаем обработчик закрытия на кнопку
    closeButton.addEventListener('click', () => closeModal(popup));;

    // вешаем обработчик закрытия на оверлей
    popup.addEventListener('click', handleCloseModalByOverlayClick);
  });
};