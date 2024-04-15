export const openModal = (popup) => {
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 100);
  popup.classList.add('popup_is-animated');

  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByClick);
};

export const closeModal = (popup) => {
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 600);
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByClick);
};

export const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};

export const closeByClick = (evt) => {
  if (evt.target.classList.contains('popup_is-opened')) {
    return closeModal(evt.target);
  }

  if (evt.target.closest('.popup__close')) {
    return closeModal(evt.target.closest('.popup'));
  }
};
