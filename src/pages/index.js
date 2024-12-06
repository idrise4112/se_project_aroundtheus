import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import ModalWithForm from "../components/ModalWithForm.js";
import { initialCards, config } from "../utils/constants.js";

import "./index.css";

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Elements                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-new-card-modal");
const addCardFormElement = addNewCardModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");

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

const previewImageModal = document.querySelector("#modal-preview");

const previewModalCloseButton =
  previewImageModal.querySelector(".modal__close");

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Event Handlers                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function handleProfileEditSubmit(e) {
  const nameInput = document.querySelector("#profile-title-input");
  const descriptionInput = document.querySelector("#profile-description-input");

  const userInfo = new UserInfo({
    nameSelector: "#profile-title-input",
    descriptionSelector: "#profile-description-input",
  });

  userInfo.setUserInfo({
    name: nameInput.value,
    job: descriptionInput.value,
  });
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const cardView = createCard(cardData);

  cardListEl.prepend(cardView);

  addModal.close();

  e.target.reset();
  addCardValidator.disableButton();
}

const nameInput = document.getElementById("add-card-form");
const linkInput = document.getElementById("profile-add-description-input");

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Event Listener                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const profileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileModal.setEventListeners();

const addModal = new ModalWithForm(
  "#add-new-card-modal",
  handleProfileEditSubmit
);
addModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileModal.open();
});

previewModalCloseButton.addEventListener("click", () => imageModal.close());

addNewCardButton.addEventListener("click", () => {
  addModal.open();
});

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

const imageModal = new ModalWithImage({ modalSelector: "#modal-preview" });
imageModal.setEventListeners();
function handleImageClick(cardData) {
  imageModal.open({ name: cardData.name, link: cardData.link });
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);

  return card.getView();
}

const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();
const editProfileValidator = new FormValidator(config, profileEditForm);
editProfileValidator.enableValidation();
