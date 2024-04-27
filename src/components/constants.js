export const cardTemplate = document.querySelector('#card-template').content;
export const container = document.querySelector('.content');
export const cardsContainer = container.querySelector('.places__list');
export const editButton = document.querySelector('.profile__edit-button');
export const editModal = document.querySelector('.popup_type_edit');
export const addButton = document.querySelector('.profile__add-button');
export const addModal = document.querySelector('.popup_type_new-card');

export const modalImage = document.querySelector('.popup_type_image');
export const modalImageCaption = modalImage.querySelector('.popup__caption');
export const modalImagePic = modalImage.querySelector('.popup__image');

export const formProfileElement = document.forms['edit-profile'];
export const nameInput = formProfileElement.querySelector('.popup__input_type_name');
export const jobInput = formProfileElement.querySelector('.popup__input_type_description');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');
export const profileSubmitButton = formProfileElement.querySelector('.popup__button');

export const profileImage = document.querySelector('.profile__image');
export const profileAvatarButton = document.querySelector('.profile__avatar-edit');
export const modalProfileImage = document.querySelector('.popup_type_edit_avatar');

export const formProfileAvatar = document.forms['edit-avatar'];
export const popupAvatarlink = formProfileAvatar.querySelector('.popup__input_type_url');
export const avatarSubmitButton = formProfileAvatar.querySelector('.popup__button');

export const formCardElement = document.forms['new-place'];
export const placeInput = formCardElement.elements['place-name'];
export const linkInput = formCardElement.elements.link;
export const cardSubmitButton = formCardElement.querySelector('.popup__button');

export const popupDelete = document.querySelector('.popup_type_delete');
export const popupConfirmButton = popupDelete.querySelector('.popup__button');