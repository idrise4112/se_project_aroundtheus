import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import "./index.css";
import Section from "../components/Section.js";
import Modal from "../components/Modal.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg ",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Elements                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-new-card-modal");
const addCardFormElement = addNewCardModal.querySelector(".modal__form");
const cardNameInput = document.querySelector(".modal__input_type_title");
const cardLinkInput = document.querySelector(".modal__input_type_url");
const addNewcardCloseButton = addNewCardModal.querySelector(".modal__close");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const modalImage = document.querySelector(".modal__image");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//create an instance of the section class
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Functions                                                                                                                                                */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// outside of getCardElement
//   select the preview image modal
//   and its child element
const previewImageModal = document.querySelector("#modal-preview");
const previewText = previewImageModal.querySelector(".modal__caption");
const previewModalCloseButton =
  previewImageModal.querySelector(".modal__close");

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });
//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });
//   cardImageEl.addEventListener("click", () => {
//     modalImage.src = cardData.link;
//     modalImage.alt = cardData.name;
//     previewText.textContent = cardData.name;
//     // previewImageModal.classList.add("modal_opened");
//     openModal(previewImageModal);
//   });
//   cardTitleEl.textContent = cardData.name;
//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   return cardElement;
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   this._modal.addEventListener("mousedown", this._handleCloseOverlay);
//   document.addEventListener("keydown", handleEscKeyPress);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   modal.removeEventListener("mousedown", handleCloseOverlay);
//   document.removeEventListener("keydown", handleEscKeyPress);
// }

// function handleEscKeyPress(evt) {
//   if (evt.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     if (openedModal) {
//       closeModal(openedModal);
//     }
//   }
// }

// function handleCloseOverlay(evt) {
//   if (evt.target.classList.contains("modal_opened")) {
//     closeModal(evt.target);
//   }
// }
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Event Handlers                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const nameInput = document.querySelector("#profile-title-input");
  const descriptionInput = document.querySelector("#profile-description-input");
  const userInfo = new UserInfo({
    nameSelector: "#profile-title-input",
    descriptionSelector: "#profile-description-input",
  });
  //const nameInput = document.getElementById("add-card-form");
  //const linkInput = document.getElementById("profile-add-description-input");

  const cardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const cardView = createCard(cardData);

  cardListEl.prepend(cardView);

  closeModal(addNewCardModal);

  e.target.reset();
  addCardValidator.disableButton();
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Event Listener                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const profileModal = new Modal({ modalSelector: "#profile-edit-modal" });
profileModal.setEventListeners();

const addModal = new Modal({ modalSelector: "#add-new-card-modal" });
addModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  // hideInputErrors();
  profileModal.open();
});

// Close button listeners will be in Modal.js
profileEditCloseButton.addEventListener("click", () => {
  profileModal.close();
});

previewModalCloseButton.addEventListener("click", () => imageModal.close());

// Submit listeners will go to ModalWithForm
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addNewCardButton.addEventListener("click", () => {
  addModal.open();
});
addNewcardCloseButton.addEventListener("click", () => {
  addModal.close();
});

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

const imageModal = new ModalWithImage({ modalSelector: "#modal-preview" });
imageModal.setEventListeners();

function handleImageClick(cardData) {
  imageModal.open({ name: cardData.name, link: cardData.link });
  // function handleImageClick(cardData) {
  // imageModal.src = cardData.link;
  // modalImage.alt = cardData.name;
  // previewText.textContent = cardData.name;
  //openModal(previewImageModal);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);

  return card.getView();
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();
const editProfileValidator = new FormValidator(config, profileEditForm);
editProfileValidator.enableValidation();
