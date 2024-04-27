import '../pages/index.css';
import { createCard, openImage } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
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
  profileSubmitButton,
  profileImage,
  profileAvatarButton,
  modalProfileImage,
  formProfileAvatar,
  popupAvatarlink,
  avatarSubmitButton,
  formCardElement,
  linkInput,
  placeInput,
  cardSubmitButton,
  popupDelete,
  popupConfirmButton,
} from '../components/constants.js';

import {
  validationConfig,
  clearValidation,
  enableValidation,
} from '../components/validation.js';

import {
  getUserInfo,
  getInitialCards,
  editProfile,
  editAvatar,
  createNewCard,
  deleteCard,
  addLike,
  removeLike,
} from '../components/api.js';

const onLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
};

//открытие попапа профиля

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  clearValidation(formProfileElement, validationConfig);

  openModal(editModal);
});

// открытие попапа редактирования аватара

profileAvatarButton.addEventListener('click', () => {
  formProfileAvatar.reset();

  clearValidation(formProfileAvatar, validationConfig);

  openModal(modalProfileImage);
});

// открытие попапа добавления карточки

addButton.addEventListener('click', () => {
  formCardElement.reset();

  clearValidation(formCardElement, validationConfig);

  openModal(addModal);
});

// форма редактирования профиля

const profile = ({ name, job, avatar }) => {
  profileName.textContent = name;
  profileJob.textContent = job;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();

  onLoading({
    buttonElement: profileSubmitButton,
    isLoading: true,
  });

  editProfile({
    name: nameInput.value,
    job: jobInput.value,
  })
    .then(({ name, about, avatar }) => {
      profile({
        name,
        job: about,
        avatar,
      });

      const openedModal = document.querySelector('.popup_is-opened');
      closeModal(openedModal);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      onLoading({
        buttonElement: profileSubmitButton,
        isLoading: false,
      });
    });
};
formProfileElement.addEventListener('submit', handleFormSubmitProfile);

//форма редактирования аватара

const handleFormSubmitAvatar = (evt) => {
  evt.preventDefault();

  onLoading({
    buttonElement: avatarSubmitButton,
    isLoading: true,
  });

  editAvatar(popupAvatarlink.value)
    .then(({ name, about, avatar }) => {
      profile({
        name,
        job: about,
        avatar,
      });

      closeModal(modalProfileImage);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      onLoading({
        buttonElement: avatarSubmitButton,
        isLoading: false,
      });
    });
};
formProfileAvatar.addEventListener('submit', handleFormSubmitAvatar);

//форма добавления карточки

const handleFormSubmitCard = (evt) => {
  evt.preventDefault();

  onLoading({
    buttonElement: cardSubmitButton,
    isLoading: true,
  });

  createNewCard({
    name: placeInput.value,
    link: linkInput.value,
  })
    .then((cardData) => {
      cardsContainer.prepend(
        createCard(
          cardData.owner['_id'],
          cardData,
          handleDeleteCard,
          handleLikeCard,
          openImage
        )
      );

      closeModal(addModal);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      onLoading({
        buttonElement: cardSubmitButton,
        isLoading: false,
      });
    });
};
formCardElement.addEventListener('submit', handleFormSubmitCard);

//удаление карточки

const handleDeleteCard = ({ cardId, buttonElement }) => {
  openModal(popupDelete);

  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    deleteCard(cardId)
      .then(() => {
        buttonElement.closest('.card').remove();

        closeModal(popupDelete);
      })
      .catch((error) => {
        buttonElement.disabled = false;
        console.error(error);
      });
  };
};

// лайк карточки

const handleLikeCard = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains('card__like-button_is-active')) {
    removeLike(cardId)
      .then(({ likes }) => {
        buttonElement.classList.remove('card__like-button_is-active');

        if (likes.length) {
          counterElement.classList.add('card__like-num_is-active');
          counterElement.textContent = likes.length;
        } else {
          counterElement.classList.remove('card__like-num_is-active');
          counterElement.textContent = '0';
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  } else {
    addLike(cardId)
      .then(({ likes }) => {
        buttonElement.classList.add('card__like-button_is-active');
        counterElement.classList.add('card__like-num_is-active');
        counterElement.textContent = likes.length;
      })

      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  }
};

// валидация

enableValidation(validationConfig);

//API

Promise.all([getUserInfo(), getInitialCards()])
  .then(([{ name, about, avatar, ['_id']: userId }, cardsData]) => {
    profile({
      name,
      job: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        createCard(
          userId,
          cardData,
          handleDeleteCard,
          handleLikeCard,
          openImage
        )
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
