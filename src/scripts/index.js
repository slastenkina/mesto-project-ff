import '../pages/index.css';
import { createCard, removeCard, setCardLike, removeCardLike } from '../components/card.js';
import { openModal, closeModal, setCloseModalByClickListeners } from '../components/modal.js';
import {
  cardsContainer,
  popupList,
  editButton,
  editModal,
  addButton,
  addModal,
  modalImage,
  modalImagePic,
  modalImageCaption,
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

const setProfileInfo = ({ name, job, avatar }) => {
  profileName.textContent = name;
  profileJob.textContent = job;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const setIsLoadingButtonText = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
};

// открыте изображения по клику

const openImage = (cardInfo) => {
  modalImagePic.src = cardInfo.link;
  modalImagePic.alt = cardInfo.name;
  modalImageCaption.textContent = cardInfo.name;

  openModal(modalImage);
};

//открытие попапа профиля

const openProfilePopup = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  clearValidation(formProfileElement, validationConfig);

  openModal(editModal);
};

// форма редактирования профиля

const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();

  setIsLoadingButtonText({
    buttonElement: profileSubmitButton,
    isLoading: true,
  });

  editProfile({
    name: nameInput.value,
    job: jobInput.value,
  })
    .then(({ name, about, avatar }) => {
      setProfileInfo({
        name,
        job: about,
        avatar,
      });

      closeModal(editModal);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoadingButtonText({
        buttonElement: profileSubmitButton,
        isLoading: false,
      });
    });
};

//форма редактирования аватара

const handleFormSubmitAvatar = (evt) => {
  evt.preventDefault();

  setIsLoadingButtonText({
    buttonElement: avatarSubmitButton,
    isLoading: true,
  });

  editAvatar(popupAvatarlink.value)
    .then(({ name, about, avatar }) => {
      setProfileInfo({
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
      setIsLoadingButtonText({
        buttonElement: avatarSubmitButton,
        isLoading: false,
      });
    });
};

//форма добавления карточки

const handleFormSubmitCard = (evt) => {
  evt.preventDefault();

  setIsLoadingButtonText({
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
          cardData.owner._id,
          cardData,
          handleDeleteCard,
          handleLikeCard,
          openImage
        )
      );
      formCardElement.reset();
      clearValidation(formCardElement, validationConfig);

      closeModal(addModal);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoadingButtonText({
        buttonElement: cardSubmitButton,
        isLoading: false,
      });
    });
};

//удаление карточки

const handleDeleteCard = ({ cardId, buttonElement, cardElement }) => {
  openModal(popupDelete);

  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    deleteCard(cardId)
      .then(() => {
        removeCard(cardElement);

        closeModal(popupDelete);
      })
      .catch((error) => {
        buttonElement.disabled = false;
        console.error(error);
      });
  };
};

// лайк карточки

const handleLikeCard = ({ cardId, buttonElement, counterElement, isLiked }) => {
  buttonElement.disabled = true;

  if (isLiked) {
    removeLike(cardId)
      .then(({ likes }) => {
        removeCardLike({ likes, buttonElement, counterElement });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  } else {
    addLike(cardId)
      .then(({ likes }) => {
        setCardLike({ likes, buttonElement, counterElement });
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
    setProfileInfo({
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

// слушатели: 

editButton.addEventListener('click', openProfilePopup);
formProfileElement.addEventListener('submit', handleFormSubmitProfile);
formProfileAvatar.addEventListener('submit', handleFormSubmitAvatar);
formCardElement.addEventListener('submit', handleFormSubmitCard);

// открытие попапа редактирования аватара

profileAvatarButton.addEventListener('click', () => {
  formProfileAvatar.reset();

  clearValidation(formProfileAvatar, validationConfig);

  openModal(modalProfileImage);
});

// открытие попапа добавления карточки

addButton.addEventListener('click', () => {
  openModal(addModal);
});

// закрытие попапа по клику

setCloseModalByClickListeners(popupList);
