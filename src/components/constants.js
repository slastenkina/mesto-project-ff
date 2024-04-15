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

export const cardElement = document.forms['new-place'];
export const placeInput = cardElement.querySelector('.popup__input_type_card-name');
export const linkInput = cardElement.querySelector('.popup__input_type_url');